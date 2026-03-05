import React, { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as Icons from 'lucide-react';
import Swal from 'sweetalert2';
import Papa from 'papaparse';

const INITIAL_CATEGORIES: any = {
    MEAT: ['ALL', 'MEAT', 'FAT'],
    RM: ['ALL', 'FLOUR', 'INGREDIENTS', 'SPICES', 'ADDITIVES'],
    PKG: ['ALL', 'FG_BAG', 'FG_FILM', 'TRAY', 'CARTON', 'LABEL', 'STICKER', 'OTH'],
    OTH: ['ALL', 'WATER', 'ICE', 'SKEWER'],
    FG: ['ALL', 'SAUSAGE', 'MEATBALL', 'BURGER', 'SLICED']
};

const ITEM_MASTER = [
    { id: 'RM-ME-101', name: 'Chicken Breast Meat (Sliced)', type: 'MEAT', category: 'MEAT' },
    { id: 'RM-ME-205', name: 'Chicken Neck Skin', type: 'MEAT', category: 'FAT' },
    { id: 'RM-FL-001', name: 'Tapioca Flour', type: 'RM', category: 'FLOUR' },
    { id: 'RM-SP-005', name: 'Black Pepper Powder', type: 'RM', category: 'SPICES' },
    { id: 'RM-PK-101', name: 'Vacuum Bag 8x12', type: 'PKG', category: 'FG_BAG' },
    { id: 'RM-PK-202', name: 'Lidding Film (Easy Peel)', type: 'PKG', category: 'FG_FILM' },
    { id: 'RM-PK-303', name: 'Corrugated Box 5kg', type: 'PKG', category: 'CARTON' },
    { id: 'RM-OT-001', name: 'RO Water', type: 'OTH', category: 'WATER' },
    { id: 'RM-OT-002', name: 'Ice Tube', type: 'OTH', category: 'ICE' },
    { id: 'RM-OT-003', name: 'Bamboo Skewer 6"', type: 'OTH', category: 'SKEWER' },
    { id: 'FG-SA-501', name: 'Smoked Frankfurters', type: 'FG', category: 'SAUSAGE' },
    { id: 'FG-MB-102', name: 'Premium Beef Ball', type: 'FG', category: 'MEATBALL' }
];

const Icon = ({ name, size = 16, className = "", style, strokeWidth = 2 }: any) => {
    const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
    return <LucideIcon size={size} className={className} style={style} strokeWidth={strokeWidth} />;
};

const KPICard = ({ title, val, color, icon, desc }: any) => (
    <div className="bg-white rounded-2xl p-5 shadow-soft border border-gray-100 relative overflow-hidden group h-full">
        <div className="absolute -right-6 -bottom-6 opacity-[0.08] transform rotate-12 transition-all duration-500 pointer-events-none group-hover:scale-110">
            <Icon name={icon} size={110} style={{color: color}} />
        </div>
        <div className="relative z-10 flex justify-between items-start h-full">
            <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">{title}</p>
                <h4 className="text-2xl font-extrabold tracking-tight mt-1 font-mono" style={{color: color}}>{val}</h4>
                <p className="text-[9px] text-gray-500 mt-2 flex items-center gap-1 uppercase font-mono">
                    <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: color}}></span> {desc}
                </p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 border border-white transition-transform group-hover:scale-110" style={{backgroundColor: color + '10'}}>
                <Icon name={icon} size={20} style={{color: color}} />
            </div>
        </div>
    </div>
);

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }: any) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalItems === 0) return null;
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-3 border-t border-gray-100 bg-white/40 gap-4 sm:gap-0 mt-auto shrink-0 font-sans">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Show</span>
                    <div className="relative">
                        <select value={itemsPerPage} onChange={(e) => onItemsPerPageChange(Number(e.target.value))} className="appearance-none bg-white border border-gray-200 text-gray-700 text-xs rounded-lg py-1 pl-2 pr-6 focus:outline-none focus:border-[#BF2A2A] font-mono cursor-pointer shadow-sm">
                            {[5, 10, 20, 50].map(size => (<option key={size} value={size}>{size}</option>))}
                        </select>
                        <Icon name="ChevronDown" size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <span className="text-xs text-gray-500">entries</span>
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <span className="text-xs text-gray-500 font-medium">Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 text-gray-600 transition-colors"><Icon name="ChevronLeft" size={16} /></button>
                <span className="text-xs font-bold text-gray-600 font-mono px-2 min-w-[60px] text-center">Page {currentPage} / {totalPages}</span>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 text-gray-600 transition-colors"><Icon name="ChevronRight" size={16} /></button>
            </div>
        </div>
    );
};

export default function SpecificationView({ specType }: { specType: string }) {
    // Map specType from menu to internal activeTab
    const typeMap: any = {
        'meat_spec': 'MEAT',
        'raw_material_spec': 'RM',
        'packaging_spec': 'PKG',
        'finished_goods_spec': 'FG',
        'other_spec': 'OTH'
    };
    const activeTab = typeMap[specType] || 'RM';

    const [activeCategory, setActiveCategory] = useState('ALL');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [categoryMap, setCategoryMap] = useState(INITIAL_CATEGORIES);
    
    // --- Modal & Drag States ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeModalTab, setActiveModalTab] = useState('general');
    const [form, setForm] = useState<any>({});
    const [printSpec, setPrintSpec] = useState<any | null>(null);
    
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging) {
            setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isModalOpen) setPosition({ x: 0, y: 0 });
    }, [isModalOpen]);

    const handleCharChange = (type: string, index: number, field: string, value: string) => {
        const newChars = [...(form[type] || [{}])];
        newChars[index] = { ...newChars[index], [field]: value };
        setForm({ ...form, [type]: newChars });
    };

    const addCharRow = (type: string) => {
        const newChars = [...(form[type] || [])];
        newChars.push({});
        setForm({ ...form, [type]: newChars });
    };

    const removeCharRow = (type: string, index: number) => {
        const newChars = [...(form[type] || [])];
        newChars.splice(index, 1);
        setForm({ ...form, [type]: newChars });
    };

    const renderCharTable = (title: string, type: string) => {
        const rows = form[type] || [{}, {}, {}];
        return (
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h5 className="text-[10px] font-bold text-gray-500 uppercase">{title}</h5>
                    <button onClick={() => addCharRow(type)} className="text-[9px] bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded font-bold flex items-center gap-1"><Icon name="Plus" size={10}/> Add Row</button>
                </div>
                <div className="border border-gray-200 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-2 py-1.5 text-[9px] text-gray-500 font-bold uppercase w-[25%]">Parameter</th>
                                <th className="px-2 py-1.5 text-[9px] text-gray-500 font-bold uppercase w-[25%]">Criteria</th>
                                <th className="px-2 py-1.5 text-[9px] text-gray-500 font-bold uppercase w-[25%]">Frequency</th>
                                <th className="px-2 py-1.5 text-[9px] text-gray-500 font-bold uppercase w-[20%]">Note</th>
                                <th className="px-2 py-1.5 text-[9px] text-gray-500 font-bold uppercase w-[5%] text-center">Act</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rows.map((row: any, idx: number) => (
                                <tr key={idx}>
                                    <td className="p-1"><input value={row.parameter || ''} onChange={e => handleCharChange(type, idx, 'parameter', e.target.value)} className="w-full border border-gray-200 rounded p-1.5 text-[11px] outline-none focus:border-[#BF2A2A]" placeholder="Parameter" /></td>
                                    <td className="p-1"><input value={row.criteria || ''} onChange={e => handleCharChange(type, idx, 'criteria', e.target.value)} className="w-full border border-gray-200 rounded p-1.5 text-[11px] outline-none focus:border-[#BF2A2A]" placeholder="Criteria" /></td>
                                    <td className="p-1"><input value={row.frequency || ''} onChange={e => handleCharChange(type, idx, 'frequency', e.target.value)} className="w-full border border-gray-200 rounded p-1.5 text-[11px] outline-none focus:border-[#BF2A2A]" placeholder="Frequency" /></td>
                                    <td className="p-1"><input value={row.note || ''} onChange={e => handleCharChange(type, idx, 'note', e.target.value)} className="w-full border border-gray-200 rounded p-1.5 text-[11px] outline-none focus:border-[#BF2A2A]" placeholder="Note" /></td>
                                    <td className="p-1 text-center"><button onClick={() => removeCharRow(type, idx)} className="text-red-400 hover:text-red-600 p-1"><Icon name="Trash2" size={12}/></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const openEditor = (item: any = null) => {
        let initialRef = [{ topic: '', detail: '' }];
        if (item && item.ref) { 
            if (Array.isArray(item.ref)) { initialRef = item.ref; } 
            else { initialRef = [{ topic: 'Reference', detail: item.ref }]; } 
        }
        setForm(item ? { ...item, ref: initialRef } : { 
            id: '', name: '', type: activeTab, category: (categoryMap[activeTab]||[])[1], 
            status: 'Draft', version: '1.0', issueDate: new Date().toLocaleDateString('en-GB'), 
            bio: [], chem: [], phys: [], packSize: '', packType: '', storage: '', 
            shelfLife: '', allergens: '', ingredients: '', origin: 'Thailand', 
            handling: '', ref: initialRef, desc: '', intendedUse: '', history: [],
            consumerTarget: '', mayContain: '', physicalChars: '', chemicalChars: '', microChars: '',
            secondaryPackaging: '', handlingRequirements: '', referenceDocs: ''
        });
        setActiveModalTab('general');
        setIsModalOpen(true);
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        let reason = "";
        if(newStatus === 'Wait Revise') { 
            const { value } = await Swal.fire({ title: 'Revision Required', input: 'textarea', inputPlaceholder: 'ระบุรายละเอียดการแก้ไข...', showCancelButton: true, confirmButtonColor: '#BF2A2A' }); 
            if(!value) return; 
            reason = value; 
        }
        setSpecs(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, reviseReason: reason } : s));
        Swal.fire('Updated', `Status changed to ${newStatus}`, 'success');
    };
    // ----------------------------

    const [specs, setSpecs] = useState<any[]>([
        { id: 'FG-SA-501', name: 'Smoked Frankfurters', category: 'SAUSAGE', type: 'FG', status: 'Approved', version: '2.1', issueDate: '11/01/2026', storage: '0-4°C', shelfLife: '45 Days', packSize: '200g / Pack', packType: 'Vacuum PE/PA Bag', origin: 'Thailand', allergens: 'Soy, Gluten', ingredients: 'Pork 80%, Ice 10%, Spices 10%', desc: 'Premium smoked sausage.', image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?w=150&q=80', history: [{ date: '11/01/2026 08:30', user: 'QC Admin', action: 'Approved', note: 'Ready for release.' }, { date: '10/01/2026 14:00', user: 'R&D Officer', action: 'Created', note: 'Initial setup.' }] },
        { id: 'RM-ME-101', name: 'Chicken Breast Meat', category: 'MEAT', type: 'MEAT', status: 'Wait Verify', version: '1.0', issueDate: '11/01/2026', storage: '0-4°C', shelfLife: '5 Days', packSize: '25kg', image: 'https://images.unsplash.com/photo-1604544525951-1c1bd2252c1f?w=150&q=80', history: [] },
        { id: 'RM-ME-205', name: 'Chicken Neck Skin', category: 'FAT', type: 'MEAT', status: 'Approved', version: '1.0', issueDate: '11/01/2026', storage: '0-4°C', shelfLife: '3 Days', packSize: '20kg', history: [] },
        { id: 'RM-FL-001', name: 'Tapioca Flour', category: 'FLOUR', type: 'RM', status: 'Approved', version: '1.0', issueDate: '12/01/2026', storage: 'AMB', shelfLife: '1 Year', history: [] },
        { id: 'RM-SP-005', name: 'Black Pepper Powder', category: 'SPICES', type: 'RM', status: 'Wait Approve', version: '1.5', issueDate: '10/01/2026', storage: 'AMB', shelfLife: '2 Years', history: [] },
        { id: 'RM-PK-101', name: 'Vacuum Bag 8x12', category: 'FG_BAG', type: 'PKG', status: 'Approved', version: '1.0', issueDate: '05/01/2026', storage: 'AMB', shelfLife: '3 Years', history: [] },
        { id: 'RM-PK-202', name: 'Lidding Film (Easy Peel)', category: 'FG_FILM', type: 'PKG', status: 'Wait Verify', version: '1.0', issueDate: '06/01/2026', storage: 'AMB', shelfLife: '2 Years', history: [] },
        { id: 'RM-OT-001', name: 'RO Water', category: 'WATER', type: 'OTH', status: 'Approved', version: '1.0', issueDate: '01/01/2026', storage: 'AMB', shelfLife: '-', history: [] },
        { id: 'RM-OT-002', name: 'Ice Tube', category: 'ICE', type: 'OTH', status: 'Approved', version: '1.0', issueDate: '02/01/2026', storage: '-18°C', shelfLife: '6 Months', history: [] },
        { id: 'RM-OT-003', name: 'Bamboo Skewer 6"', category: 'SKEWER', type: 'OTH', status: 'Wait Verify', version: '1.0', issueDate: '03/01/2026', storage: 'AMB', shelfLife: '2 Years', history: [] },
        { id: 'FG-MB-102', name: 'Beef Meatball', category: 'MEATBALL', type: 'FG', status: 'Wait Revise', version: '1.1', issueDate: '09/01/2026', storage: '0-4°C', shelfLife: '30 Days', reviseReason: 'Update allergen info.' }
    ]);

    // --- CSV Import States ---
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [csvPreview, setCsvPreview] = useState<any[]>([]);
    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [isCsvDragging, setIsCsvDragging] = useState(false);
    const [csvPosition, setCsvPosition] = useState({ x: 0, y: 0 });
    const [csvDragStart, setCsvDragStart] = useState({ x: 0, y: 0 });
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCsvMouseDown = (e: React.MouseEvent) => {
        setIsCsvDragging(true);
        setCsvDragStart({ x: e.clientX - csvPosition.x, y: e.clientY - csvPosition.y });
    };

    const handleCsvMouseMove = (e: React.MouseEvent) => {
        if (isCsvDragging) {
            setCsvPosition({ x: e.clientX - csvDragStart.x, y: e.clientY - csvDragStart.y });
        }
    };

    const handleCsvMouseUp = () => setIsCsvDragging(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setCsvFile(file);
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                setCsvHeaders(results.meta.fields || []);
                setCsvPreview(results.data.slice(0, 5)); // Preview top 5
            }
        });
    };

    const confirmCsvImport = () => {
        if (!csvFile) return;
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const newSpecs = results.data.map((row: any) => ({
                    id: row.id || row.SKU || `NEW-${Math.floor(Math.random()*1000)}`,
                    name: row.name || row.Product || 'Unknown Product',
                    type: activeTab,
                    category: row.category || (categoryMap[activeTab]||[])[1],
                    status: 'Draft',
                    version: row.version || row.Rev || '1.0',
                    issueDate: row.issueDate || new Date().toLocaleDateString('en-GB'),
                    storage: row.storage || row.Storage || '',
                    shelfLife: row.shelfLife || row['Shelf Life'] || '',
                    packSize: row.packSize || row['Pack Size'] || '',
                    packType: row.packType || row['Packaging'] || '',
                    image: row.image || row.IMG || '',
                    history: []
                }));
                setSpecs(prev => [...newSpecs, ...prev]);
                Swal.fire('Imported!', `${newSpecs.length} specifications imported successfully.`, 'success');
                setIsCsvModalOpen(false);
                setCsvFile(null);
                setCsvPreview([]);
            }
        });
    };
    // ----------------------------

    const handleItemsPerPageChange = (newSize: number) => { setItemsPerPage(newSize); setCurrentPage(1); };
    
    const filteredSpecs = useMemo(() => specs.filter(s => s.type === activeTab && (activeCategory === 'ALL' || s.category === activeCategory) && (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase()))), [specs, activeTab, activeCategory, search]);
    const paginatedSpecs = useMemo(() => filteredSpecs.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage), [filteredSpecs, currentPage, itemsPerPage]);
    
    const catCounts: any = useMemo(() => {
        const counts: any = {};
        (categoryMap[activeTab] || []).forEach((cat: string) => { counts[cat] = specs.filter(s => s.type === activeTab && (cat === 'ALL' || s.category === cat)).length; });
        return counts;
    }, [specs, activeTab, categoryMap]);

    const getTempColor = (storage: string) => { if (!storage) return '#64748B'; const s = storage.toLowerCase(); if (s.includes('-18')) return '#4A86E8'; if (s.includes('0-4')) return '#4A86E8'; return '#8C6746'; };
    const getStatusStyle = (status: string) => { 
        switch(status.toUpperCase()) { 
            case 'APPROVED': return 'bg-[#E6F4EA] text-[#34A853] border-[#34A853]/30'; 
            case 'WAIT VERIFY': return 'bg-[#DCEBFF] text-[#4A86E8] border-[#4A86E8]/30'; 
            case 'WAIT APPROVE': return 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/30'; 
            case 'WAIT REVISE': return 'bg-[#FEE2E2] text-[#DC2626] border-[#DC2626]/30'; 
            default: return 'bg-gray-100 text-gray-500 border-gray-200'; 
        } 
    };

    useEffect(() => { setActiveCategory('ALL'); setCurrentPage(1); }, [activeTab]);

    return (
        <div className="animate-fadeIn">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#3F4859] uppercase tracking-tight">{specType.replace(/_/g, ' ')}</h2>
                    <p className="text-xs text-brandTeal mt-1 font-medium italic">Manage and review product specifications</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0 relative z-10 mb-8">
                <KPICard title="Total Specs" val={specs.filter(s => s.type === activeTab).length} color="#323640" icon="Layers" desc="Database" />
                <KPICard title="Waiting Review" val={specs.filter(s=>s.type === activeTab && s.status.includes('Wait')).length} color="#BF2A2A" icon="Clock" desc="Pending Approval" />
                <KPICard title="ISO Compliance" val="98.5%" color="#3B590C" icon="CheckCircle" desc="Food Safety Plan" />
                <KPICard title="Testing Pending" val="12" color="#BE9354" icon="Microscope" desc="Lab Queue" />
            </div>

            <div className="bg-white border border-gray-200 shadow-sm rounded-xl relative z-10 flex flex-col overflow-hidden">
                <div className="px-6 py-3 border-b border-gray-100 bg-[#F9FAFB] flex flex-col lg:flex-row items-center justify-between gap-4 font-sans">
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
                        {(categoryMap[activeTab] || []).map((cat: string) => (
                            <button key={cat} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }} 
                                className={`px-4 py-2 text-[10px] font-bold uppercase rounded-lg transition-all flex items-center gap-2 whitespace-nowrap
                                    ${activeCategory === cat ? 'bg-[#E69A8D] text-[#141A26]' : 'bg-[#F4EBEA] text-[#8C939D] hover:bg-[#E69A8D]/50'}
                                `}>
                                {cat} <span className="bg-white/50 px-1.5 rounded text-[9px] text-[#141A26]">{catCounts[cat] || 0}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                        <button onClick={() => { setIsCsvModalOpen(true); setCsvPosition({x:0, y:0}); }} className="bg-[#4A7023] hover:bg-[#3B590C] text-white px-6 h-[38px] rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-2 transition-all">
                            <Icon name="Upload" size={14} /> IMPORT
                        </button>
                        <button onClick={() => openEditor()} className="bg-[#DF5A4C] hover:bg-[#BF2A2A] text-white px-6 h-[38px] rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-sm flex items-center gap-2 transition-all">
                            NEW SPEC
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left font-mono whitespace-nowrap">
                        <thead>
                            <tr className="bg-[#A5A9AB] border-b-2 border-[#D14933]">
                                <th className="text-[10px] uppercase tracking-wider text-white px-6 py-4 font-bold">IMG</th>
                                <th className="text-[10px] uppercase tracking-wider text-white px-6 py-4 font-bold">Product (SKU/Name)</th>
                                <th className="text-[10px] uppercase tracking-wider text-white px-6 py-4 font-bold">Rev / Issue Date</th>
                                <th className="text-[10px] uppercase tracking-wider text-white px-6 py-4 font-bold">Shelf Life / Storage</th>
                                <th className="text-[10px] uppercase tracking-wider text-white px-6 py-4 font-bold">Packaging</th>
                                <th className="text-[10px] uppercase tracking-wider text-white px-6 py-4 font-bold text-center">Status</th>
                                <th className="text-[10px] uppercase tracking-wider text-white px-6 py-4 font-bold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {paginatedSpecs.length > 0 ? paginatedSpecs.map((item: any) => (
                                <tr key={item.id} onClick={() => openEditor(item)} className="hover:bg-gray-50 transition-all cursor-pointer">
                                    <td className="px-6 py-3">
                                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                                            {item.image ? <img src={item.image} alt={item.id} className="w-full h-full object-cover" /> : <Icon name="Image" size={16} className="text-gray-300" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex flex-col">
                                            <span className="text-[#D14933] font-bold text-[10px] uppercase mb-0.5">{item.id}</span>
                                            <span className="text-gray-800 font-bold text-xs font-sans">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-700 text-[11px]">Rev: {item.version}</span>
                                            <span className="text-[10px] text-gray-500">{item.issueDate}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-700 uppercase text-[11px] mb-0.5">{item.shelfLife}</span>
                                            <span className="text-[10px] font-medium" style={{color: getTempColor(item.storage)}}>{item.storage}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[11px] text-gray-700 font-sans mb-0.5">{item.packSize || '-'}</span>
                                            <span className="text-[10px] text-gray-500 font-sans">{item.packType || '-'}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase border ${getStatusStyle(item.status)}`}>{item.status}</span>
                                    </td>
                                    <td className="px-6 py-3" onClick={(e)=>e.stopPropagation()}>
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => openEditor(item)} className="p-1 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                            {item.status.toUpperCase() === 'APPROVED' && <button onClick={() => setPrintSpec(item)} className="p-1 bg-[#FFF8E1] text-[#F5B041] rounded-md hover:bg-[#FDEBD0] transition-all"><Icon name="Printer" size={14}/></button>}
                                        </div>
                                    </td>
                                </tr>
                            )) : (<tr><td colSpan={6} className="p-8 text-center text-gray-400 font-sans italic">No specifications found in this category.</td></tr>)}
                        </tbody>
                    </table>
                </div>
                <Pagination currentPage={currentPage} totalItems={filteredSpecs.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} onItemsPerPageChange={handleItemsPerPageChange} />
            </div>

            {/* Modal Overlay */}
            {isModalOpen && createPortal(
                <div 
                    className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#141A26]/80 backdrop-blur-sm"
                    onMouseMove={handleMouseMove} 
                    onMouseUp={handleMouseUp} 
                    onMouseLeave={handleMouseUp}
                >
                    <div 
                        className="bg-white rounded-xl shadow-2xl w-[98%] max-w-6xl max-h-[96vh] flex flex-col overflow-hidden border-t-8 border-[#BF2A2A]"
                        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
                    >
                        <div 
                            className="p-4 bg-[#141A26] text-white flex justify-between items-center shrink-0 cursor-move"
                            onMouseDown={handleMouseDown}
                        >
                            <div className="flex items-center gap-3 pointer-events-none">
                                <div className="w-10 h-10 bg-[#BF2A2A]/20 flex items-center justify-center border border-[#BF2A2A]/40 text-[#BF2A2A] shadow-glow rounded-xl">
                                    <Icon name="FileEdit" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold uppercase tracking-tight font-sans">Full Specification Editor</h3>
                                    <p className="text-[#BE9354] font-bold uppercase tracking-widest text-[9px]">ISO 22000 Quality Management Form</p>
                                </div>
                            </div>
                            <button onClick={()=>setIsModalOpen(false)} className="text-white/40 hover:text-white transition-all cursor-pointer z-10"><Icon name="X" size={20} /></button>
                        </div>
                        <div className="flex-1 flex overflow-hidden">
                            {/* Sidebar Navigation */}
                            <div className="w-64 bg-gray-50/80 border-r border-gray-100 p-4 space-y-1.5 shrink-0 font-sans overflow-y-auto custom-scrollbar">
                                {[{ id: 'general', label: 'Description', icon: 'Info' }, { id: 'use', label: 'Intended Use', icon: 'Activity' }, { id: 'ingredients', label: 'Ingredient Listing', icon: 'FlaskConical' }, { id: 'allergy', label: 'Allergy Information', icon: 'AlertTriangle' }, { id: 'characteristics', label: 'Product Characteristics', icon: 'Microscope' }, { id: 'packaging', label: 'Packaging', icon: 'Package' }, { id: 'storage', label: 'Shelf Life & Storage', icon: 'Thermometer' }, { id: 'origin', label: 'Country of Origin', icon: 'Globe' }, { id: 'handling', label: 'Handling', icon: 'Truck' }, { id: 'ref', label: 'Ref.', icon: 'Link' }, { id: 'history', label: 'History Log', icon: 'History' }].map(tab => (
                                    <button key={tab.id} onClick={()=>setActiveModalTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] font-bold rounded-xl transition-all text-left ${activeModalTab===tab.id ? 'bg-[#141A26] text-[#BE9354] shadow-md' : 'text-gray-500 hover:bg-white hover:text-[#141A26]'}`}><Icon name={tab.icon} size={16} /> {tab.label}</button>
                                ))}
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-[#F2F0EB] font-sans">
                                <div className="max-w-4xl mx-auto space-y-6">
                                    {activeModalTab === 'general' && <div className="animate-fadeIn space-y-4">
                                        <div className="grid grid-cols-4 gap-4">
                                            <div className="col-span-2"><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Product Dropdown Selection</label>
                                                <select value={form.id || ''} onChange={e=>{const it=ITEM_MASTER.find(i=>i.id===e.target.value); if(it) setForm({...form, id:it.id, name:it.name, category:it.category})}} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-bold focus:border-[#BF2A2A] outline-none transition-all"><option value="">-- Select Master Product --</option>{ITEM_MASTER.filter(i=>i.type===activeTab).map(i=><option key={i.id} value={i.id}>{i.id} - {i.name}</option>)}</select>
                                            </div>
                                            <div><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Revision (Rev)</label><input value={form.version || ''} onChange={e=>setForm({...form, version:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-bold focus:border-[#BF2A2A] outline-none font-mono" /></div>
                                            <div><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Issue Date</label><input type="text" value={form.issueDate || ''} readOnly className="w-full border border-gray-200 rounded-lg p-2.5 text-sm bg-gray-50 font-bold outline-none font-mono cursor-default" /></div>
                                        </div>
                                        <div><label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Product Image URL</label><input value={form.image || ''} onChange={e=>setForm({...form, image:e.target.value})} placeholder="https://..." className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" /></div>
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm"><h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest flex items-center gap-2">Physical Description</h4><textarea value={form.desc || ''} onChange={e=>setForm({...form, desc:e.target.value})} className="w-full border border-gray-200 p-3 text-sm h-28 outline-none focus:ring-1 focus:ring-[#BF2A2A]/20 rounded-lg" placeholder="Physical appearance, color, sensory details..."></textarea></div>
                                    </div>}

                                    {activeModalTab === 'use' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Intended Use & Target Consumer</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Intended Use (e.g., Cook thoroughly before consumption)</label>
                                                    <textarea value={form.intendedUse || ''} onChange={e=>setForm({...form, intendedUse:e.target.value})} className="w-full border border-gray-200 p-3 text-sm h-20 outline-none focus:ring-1 focus:ring-[#BF2A2A]/20 rounded-lg"></textarea>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Consumer Target (e.g., General public, excluding infants)</label>
                                                    <input value={form.consumerTarget || ''} onChange={e=>setForm({...form, consumerTarget:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'ingredients' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Ingredient Listing</h4>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Ingredients (in descending order of weight)</label>
                                                <textarea value={form.ingredients || ''} onChange={e=>setForm({...form, ingredients:e.target.value})} className="w-full border border-gray-200 p-3 text-sm h-32 outline-none focus:ring-1 focus:ring-[#BF2A2A]/20 rounded-lg" placeholder="e.g., Pork (80%), Water (10%), Spices (5%)..."></textarea>
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'allergy' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Allergy Information</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Contains Allergens</label>
                                                    <input value={form.allergens || ''} onChange={e=>setForm({...form, allergens:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., Soy, Wheat, Milk" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">May Contain (Cross-contamination risk)</label>
                                                    <input value={form.mayContain || ''} onChange={e=>setForm({...form, mayContain:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., Nuts, Egg" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'characteristics' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Product Characteristics</h4>
                                            <div className="space-y-4">
                                                {renderCharTable('Physical & Organoleptic (Color, Odor, Flavor, Texture)', 'physicalCharsData')}
                                                {renderCharTable('Chemical (pH, Aw, Moisture, etc.)', 'chemicalCharsData')}
                                                {renderCharTable('Microbiological (APC, E.coli, Salmonella, etc.)', 'microCharsData')}
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'packaging' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Packaging Details</h4>
                                            <div className="space-y-4 grid grid-cols-2 gap-4">
                                                <div className="col-span-2">
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Primary Packaging (Food Contact)</label>
                                                    <input value={form.packType || ''} onChange={e=>setForm({...form, packType:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., Vacuum PE/PA Bag" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Secondary Packaging</label>
                                                    <input value={form.secondaryPackaging || ''} onChange={e=>setForm({...form, secondaryPackaging:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., Corrugated Carton" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Net Weight / Pack Size</label>
                                                    <input value={form.packSize || ''} onChange={e=>setForm({...form, packSize:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., 200g / Pack" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'storage' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Shelf Life & Storage</h4>
                                            <div className="space-y-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Storage Conditions</label>
                                                    <input value={form.storage || ''} onChange={e=>setForm({...form, storage:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., Chilled 0-4°C" />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Shelf Life</label>
                                                    <input value={form.shelfLife || ''} onChange={e=>setForm({...form, shelfLife:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., 45 Days" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'origin' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Country of Origin</h4>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Country of Origin</label>
                                                <input value={form.origin || ''} onChange={e=>setForm({...form, origin:e.target.value})} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-[#BF2A2A] outline-none" placeholder="e.g., Thailand" />
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'handling' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">Handling & Transportation</h4>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Handling Requirements</label>
                                                <textarea value={form.handlingRequirements || ''} onChange={e=>setForm({...form, handlingRequirements:e.target.value})} className="w-full border border-gray-200 p-3 text-sm h-20 outline-none focus:ring-1 focus:ring-[#BF2A2A]/20 rounded-lg" placeholder="e.g., Transport in temperature-controlled vehicles at 0-4°C. Handle with care to avoid packaging damage."></textarea>
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'ref' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">References</h4>
                                            <div>
                                                <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Reference Documents / Standards</label>
                                                <textarea value={form.referenceDocs || ''} onChange={e=>setForm({...form, referenceDocs:e.target.value})} className="w-full border border-gray-200 p-3 text-sm h-20 outline-none focus:ring-1 focus:ring-[#BF2A2A]/20 rounded-lg" placeholder="e.g., ISO 22000:2018, Codex Alimentarius..."></textarea>
                                            </div>
                                        </div>
                                    </div>}

                                    {activeModalTab === 'history' && <div className="animate-fadeIn space-y-4">
                                        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <h4 className="text-[11px] font-black text-[#BF2A2A] mb-4 border-b pb-2 uppercase tracking-widest">History Log</h4>
                                            <div className="space-y-4">
                                                {form.history && form.history.length > 0 ? (
                                                    <div className="border border-gray-200 overflow-hidden">
                                                        <table className="w-full text-left text-sm">
                                                            <thead className="bg-gray-50 border-b border-gray-200">
                                                                <tr>
                                                                    <th className="px-4 py-2 text-gray-500 font-bold">Date</th>
                                                                    <th className="px-4 py-2 text-gray-500 font-bold">User</th>
                                                                    <th className="px-4 py-2 text-gray-500 font-bold">Action</th>
                                                                    <th className="px-4 py-2 text-gray-500 font-bold">Note</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-100">
                                                                {form.history.map((h: any, i: number) => (
                                                                    <tr key={i}>
                                                                        <td className="px-4 py-2 text-gray-700">{h.date}</td>
                                                                        <td className="px-4 py-2 text-gray-700">{h.user}</td>
                                                                        <td className="px-4 py-2 text-gray-700">{h.action}</td>
                                                                        <td className="px-4 py-2 text-gray-700">{h.note}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-500 italic text-center py-4">No history available for this specification.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-4 shrink-0 shadow-lg font-sans">
                            <button onClick={()=>setIsModalOpen(false)} className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest text-[#141A26] hover:text-[#BF2A2A] transition-all">Discard</button>
                            <button onClick={()=>{ handleStatusChange(form.id, 'Wait Verify'); setIsModalOpen(false); }} className="bg-[#141A26] text-[#BE9354] px-10 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-md hover:bg-[#BF2A2A] hover:text-white transition-all border-2 border-[#BE9354]/20">Submit Specification</button>
                        </div>
                    </div>
                </div>
            , document.body)}

            {/* CSV Import Modal */}
            {isCsvModalOpen && createPortal(
                <div 
                    className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#141A26]/80 backdrop-blur-sm"
                    onMouseMove={handleCsvMouseMove} 
                    onMouseUp={handleCsvMouseUp} 
                    onMouseLeave={handleCsvMouseUp}
                >
                    <div 
                        className="bg-white rounded-xl shadow-2xl w-[95%] max-w-4xl flex flex-col overflow-hidden border-t-8 border-[#4A7023]"
                        style={{ transform: `translate(${csvPosition.x}px, ${csvPosition.y}px)` }}
                    >
                        <div 
                            className="p-6 bg-[#141A26] text-white flex justify-between items-center shrink-0 cursor-move"
                            onMouseDown={handleCsvMouseDown}
                        >
                            <div className="flex items-center gap-4 pointer-events-none">
                                <div className="w-12 h-12 bg-[#4A7023]/20 flex items-center justify-center border border-[#4A7023]/40 text-[#6DA136] shadow-glow rounded-xl">
                                    <Icon name="UploadCloud" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold uppercase tracking-tight font-sans">Import Specifications (CSV)</h3>
                                    <p className="text-[#BE9354] font-bold uppercase tracking-widest text-[10px]">Fast Bulk Upload</p>
                                </div>
                            </div>
                            <button onClick={()=>setIsCsvModalOpen(false)} className="text-white/40 hover:text-white transition-all cursor-pointer z-10"><Icon name="X" size={24} /></button>
                        </div>
                        <div className="p-8 bg-[#F2F0EB] font-sans flex-1 overflow-y-auto max-h-[70vh]">
                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
                                <h4 className="text-sm font-bold text-[#141A26] mb-2 flex items-center gap-2"><Icon name="Info" size={16} className="text-[#4A7023]" /> CSV Format Instructions</h4>
                                <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                                    Upload a CSV file. The system is flexible but recommends the following headers for best mapping:
                                    <br/><code className="bg-gray-100 px-1 py-0.5 rounded text-[#BF2A2A] font-mono mt-2 inline-block">id, name, category, version, issueDate, storage, shelfLife, packSize, packType, image</code>
                                </p>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Icon name="FileSpreadsheet" size={32} className="text-gray-400 mb-2" />
                                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500">CSV file only</p>
                                        </div>
                                        <input type="file" accept=".csv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                                    </label>
                                </div>
                                {csvFile && <p className="mt-3 text-sm font-bold text-[#4A7023] text-center">Selected: {csvFile.name}</p>}
                            </div>

                            {csvPreview.length > 0 && (
                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h4 className="text-sm font-bold text-[#141A26] mb-4 flex items-center gap-2"><Icon name="Eye" size={16} className="text-[#BE9354]" /> Data Preview (Top 5 Rows)</h4>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left font-mono whitespace-nowrap text-xs">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                    {csvHeaders.map(h => <th key={h} className="px-3 py-2 text-gray-500 font-bold">{h}</th>)}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {csvPreview.map((row, i) => (
                                                    <tr key={i}>
                                                        {csvHeaders.map(h => <td key={h} className="px-3 py-2 text-gray-700 truncate max-w-[150px]">{row[h]}</td>)}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-gray-200 bg-white flex justify-end gap-4 shrink-0 shadow-lg font-sans">
                            <button onClick={()=>{setIsCsvModalOpen(false); setCsvFile(null); setCsvPreview([]);}} className="px-8 py-2.5 text-xs font-bold uppercase tracking-widest text-[#141A26] hover:text-[#BF2A2A] transition-all">Cancel</button>
                            <button onClick={confirmCsvImport} disabled={!csvFile} className="bg-[#4A7023] text-white px-10 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-widest shadow-md hover:bg-[#3B590C] transition-all disabled:opacity-50 disabled:cursor-not-allowed">Confirm Import</button>
                        </div>
                    </div>
                </div>
            , document.body)}

            {/* Print View Overlay */}
            {printSpec && createPortal(
                <div className="fixed inset-0 z-[999999] bg-gray-50 overflow-y-auto print:static print:bg-white print:z-auto">
                    <style>{`
                        @media print {
                            body * { visibility: hidden; }
                            #print-section, #print-section * { visibility: visible; }
                            #print-section { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
                            .no-print { display: none !important; }
                        }
                    `}</style>
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm no-print z-10">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setPrintSpec(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                                <Icon name="ArrowLeft" size={20} />
                            </button>
                            <h2 className="text-lg font-bold text-gray-800">Print Preview: {printSpec.id}</h2>
                        </div>
                        <button onClick={() => window.print()} className="bg-[#4A7023] text-white px-6 py-2 rounded-lg font-bold shadow-md hover:bg-[#3B590C] transition-all flex items-center gap-2">
                            <Icon name="Printer" size={18} /> Print Document
                        </button>
                    </div>

                    <div id="print-section" className="max-w-[210mm] mx-auto bg-white my-8 p-[10mm] shadow-xl print:shadow-none print:m-0 print:w-full print:max-w-none">
                        {/* Header */}
                        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-[#BF2A2A] rounded-lg flex items-center justify-center text-white">
                                    <Icon name="ShieldCheck" size={28} />
                                </div>
                                <div>
                                    <h1 className="text-xl font-black text-gray-900 tracking-tight uppercase">Product Specification</h1>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">ISO 22000 Quality Management System</p>
                                </div>
                            </div>
                            <div className="text-right text-xs">
                                <table className="border-collapse border border-gray-300">
                                    <tbody>
                                        <tr><td className="border border-gray-300 px-2 py-1 font-bold bg-gray-50 text-gray-600">Doc No.</td><td className="border border-gray-300 px-2 py-1 font-mono">{printSpec.id}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1 font-bold bg-gray-50 text-gray-600">Rev.</td><td className="border border-gray-300 px-2 py-1 font-mono">{printSpec.version || '1.0'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1 font-bold bg-gray-50 text-gray-600">Effective Date</td><td className="border border-gray-300 px-2 py-1 font-mono">{printSpec.issueDate}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="space-y-6 text-xs text-gray-800 font-sans">
                            
                            {/* 1. General Info */}
                            <section>
                                <h3 className="text-xs font-black text-[#BF2A2A] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">1. General Information</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-3">
                                        <table className="w-full border-collapse border border-gray-300">
                                            <tbody>
                                                <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50 w-1/3">Product Name</td><td className="border border-gray-300 px-2 py-1.5 font-bold text-sm">{printSpec.name}</td></tr>
                                                <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Category</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.category}</td></tr>
                                                <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Country of Origin</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.origin || '-'}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-span-1 border border-gray-300 flex items-center justify-center p-1 bg-gray-50">
                                        {printSpec.image ? <img src={printSpec.image} alt={printSpec.name} className="max-w-full max-h-24 object-contain" /> : <div className="text-gray-400 text-[10px] text-center"><Icon name="Image" size={24} className="mx-auto mb-1 opacity-20" />No Image</div>}
                                    </div>
                                </div>
                            </section>

                            {/* 2. Product Description & Use */}
                            <section>
                                <h3 className="text-xs font-black text-[#BF2A2A] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">2. Description & Intended Use</h3>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50 w-1/4">Physical Description</td><td className="border border-gray-300 px-2 py-1.5 whitespace-pre-wrap">{printSpec.desc || '-'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Intended Use</td><td className="border border-gray-300 px-2 py-1.5 whitespace-pre-wrap">{printSpec.intendedUse || '-'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Consumer Target</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.consumerTarget || '-'}</td></tr>
                                    </tbody>
                                </table>
                            </section>

                            {/* 3. Ingredients & Allergens */}
                            <section>
                                <h3 className="text-xs font-black text-[#BF2A2A] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">3. Ingredients & Allergens</h3>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50 w-1/4">Ingredients</td><td className="border border-gray-300 px-2 py-1.5 whitespace-pre-wrap">{printSpec.ingredients || '-'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Contains Allergens</td><td className="border border-gray-300 px-2 py-1.5 font-bold text-[#BF2A2A]">{printSpec.allergens || 'None'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">May Contain</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.mayContain || 'None'}</td></tr>
                                    </tbody>
                                </table>
                            </section>

                            {/* 4. Characteristics */}
                            <section>
                                <h3 className="text-xs font-black text-[#BF2A2A] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">4. Product Characteristics</h3>
                                
                                <div className="mb-3">
                                    <h4 className="text-[10px] font-bold text-gray-700 uppercase mb-1">Physical & Organoleptic</h4>
                                    <table className="w-full border-collapse border border-gray-300 text-[10px]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Parameter</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Criteria</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Frequency</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {printSpec.physicalCharsData && printSpec.physicalCharsData.length > 0 ? printSpec.physicalCharsData.map((row: any, i: number) => (
                                                <tr key={i}>
                                                    <td className="border border-gray-300 px-2 py-1">{row.parameter || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.criteria || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.frequency || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.note || '-'}</td>
                                                </tr>
                                            )) : <tr><td colSpan={4} className="border border-gray-300 px-2 py-1 text-center text-gray-400 italic">No data</td></tr>}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mb-3">
                                    <h4 className="text-[10px] font-bold text-gray-700 uppercase mb-1">Chemical</h4>
                                    <table className="w-full border-collapse border border-gray-300 text-[10px]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Parameter</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Criteria</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Frequency</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {printSpec.chemicalCharsData && printSpec.chemicalCharsData.length > 0 ? printSpec.chemicalCharsData.map((row: any, i: number) => (
                                                <tr key={i}>
                                                    <td className="border border-gray-300 px-2 py-1">{row.parameter || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.criteria || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.frequency || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.note || '-'}</td>
                                                </tr>
                                            )) : <tr><td colSpan={4} className="border border-gray-300 px-2 py-1 text-center text-gray-400 italic">No data</td></tr>}
                                        </tbody>
                                    </table>
                                </div>

                                <div>
                                    <h4 className="text-[10px] font-bold text-gray-700 uppercase mb-1">Microbiological</h4>
                                    <table className="w-full border-collapse border border-gray-300 text-[10px]">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Parameter</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Criteria</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Frequency</th>
                                                <th className="border border-gray-300 px-2 py-1 w-1/4 text-left">Note</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {printSpec.microCharsData && printSpec.microCharsData.length > 0 ? printSpec.microCharsData.map((row: any, i: number) => (
                                                <tr key={i}>
                                                    <td className="border border-gray-300 px-2 py-1">{row.parameter || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.criteria || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.frequency || '-'}</td>
                                                    <td className="border border-gray-300 px-2 py-1">{row.note || '-'}</td>
                                                </tr>
                                            )) : <tr><td colSpan={4} className="border border-gray-300 px-2 py-1 text-center text-gray-400 italic">No data</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            {/* 5. Packaging & Storage */}
                            <section>
                                <h3 className="text-xs font-black text-[#BF2A2A] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">5. Packaging & Storage</h3>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50 w-1/4">Primary Packaging</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.packType || '-'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Secondary Packaging</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.secondaryPackaging || '-'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Net Weight / Size</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.packSize || '-'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Storage Conditions</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.storage || '-'}</td></tr>
                                        <tr><td className="border border-gray-300 px-2 py-1.5 font-bold bg-gray-50">Shelf Life</td><td className="border border-gray-300 px-2 py-1.5">{printSpec.shelfLife || '-'}</td></tr>
                                    </tbody>
                                </table>
                            </section>

                            {/* 6. Handling */}
                            <section>
                                <h3 className="text-xs font-black text-[#BF2A2A] uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">6. Handling & Transportation</h3>
                                <p className="px-2 py-1.5 border border-gray-300 whitespace-pre-wrap bg-white">{printSpec.handlingRequirements || '-'}</p>
                            </section>

                        </div>

                        {/* Footer Signatures */}
                        <div className="mt-10 pt-6 border-t-2 border-gray-800 grid grid-cols-3 gap-6 text-center text-xs">
                            <div>
                                <div className="border-b border-gray-400 h-12 mb-2"></div>
                                <p className="font-bold text-gray-800">Prepared By</p>
                                <p className="text-gray-500 text-xs">QA/QC Department</p>
                                <p className="text-gray-500 text-xs mt-1">Date: _______________</p>
                            </div>
                            <div>
                                <div className="border-b border-gray-400 h-12 mb-2"></div>
                                <p className="font-bold text-gray-800">Reviewed By</p>
                                <p className="text-gray-500 text-xs">QA/QC Manager</p>
                                <p className="text-gray-500 text-xs mt-1">Date: _______________</p>
                            </div>
                            <div>
                                <div className="border-b border-gray-400 h-12 mb-2"></div>
                                <p className="font-bold text-gray-800">Approved By</p>
                                <p className="text-gray-500 text-xs">Plant Manager</p>
                                <p className="text-gray-500 text-xs mt-1">Date: _______________</p>
                            </div>
                        </div>
                        
                        <div className="mt-8 text-center text-xs text-gray-400 font-mono">
                            Printed on: {new Date().toLocaleString('en-GB')} | System Generated Document
                        </div>
                    </div>
                </div>
            , document.body)}
        </div>
    );
}
