import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const Icon = ({ name, size = 16, className = "" }: any) => {
    const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
    return <LucideIcon size={size} className={className} />;
};

export default function IncomingQAView({ activeSubTab }: { activeSubTab: string }) {
    const [activeTab, setActiveTab] = useState('wi'); // 'wi' or 'record'
    const [modalConfig, setModalConfig] = useState<{isOpen: boolean, title: string, type: 'wi' | 'record' | 'view' | null}>({ isOpen: false, title: '', type: null });

    const openModal = (title: string, type: 'wi' | 'record' | 'view') => {
        setModalConfig({ isOpen: true, title, type });
    };

    const closeModal = () => {
        setModalConfig({ isOpen: false, title: '', type: null });
    };

    const getTitle = () => {
        switch(activeSubTab) {
            case 'rm_inspection': return 'Raw Material Inspection';
            case 'pm_inspection': return 'Packaging Material Inspection';
            case 'supplier_eval': return 'Supplier Evaluation';
            default: return 'Incoming QA';
        }
    };

    return (
        <div className="animate-fadeIn h-full flex flex-col">
            <div className="flex justify-between items-end mb-6 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-[#3F4859] uppercase tracking-tight">{getTitle()}</h2>
                    <p className="text-xs text-[#BF2A2A] mt-1 font-bold uppercase tracking-widest">Quality Assurance Module</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6 shrink-0">
                <button 
                    onClick={() => setActiveTab('wi')}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'wi' ? 'border-[#BF2A2A] text-[#BF2A2A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2"><Icon name="FileText" size={16} /> WI วิธีการตรวจรับ</div>
                </button>
                <button 
                    onClick={() => setActiveTab('record')}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'record' ? 'border-[#BF2A2A] text-[#BF2A2A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2"><Icon name="ClipboardEdit" size={16} /> บันทึกข้อมูล (Record)</div>
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {activeTab === 'wi' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-gray-800">Work Instruction (WI) Setup</h3>
                            <button onClick={() => openModal('Create New WI', 'wi')} className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#a4130d] transition-all flex items-center gap-2">
                                <Icon name="Plus" size={14} /> Create New WI
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-xl p-5 hover:border-[#BF2A2A]/30 transition-all bg-gray-50/50">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#BF2A2A]/10 text-[#BF2A2A] rounded-lg"><Icon name="FileCheck" size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">WI-QA-IN-001</h4>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Meat Receiving Inspection</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Active</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-4 line-clamp-2">Standard procedure for inspecting incoming meat shipments including temperature checks, visual inspection, and microbiological sampling.</p>
                                <div className="flex gap-2">
                                    <button onClick={() => openModal('View WI Details', 'view')} className="flex-1 bg-white border border-gray-200 text-gray-600 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all">View Details</button>
                                    <button onClick={() => openModal('Edit WI', 'wi')} className="flex-1 bg-white border border-gray-200 text-gray-600 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all">Edit</button>
                                </div>
                            </div>
                            
                            <div className="border border-gray-200 rounded-xl p-5 hover:border-[#BF2A2A]/30 transition-all bg-gray-50/50">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#BF2A2A]/10 text-[#BF2A2A] rounded-lg"><Icon name="FileCheck" size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">WI-QA-IN-002</h4>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Packaging Material Inspection</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Active</span>
                                </div>
                                <p className="text-xs text-gray-600 mb-4 line-clamp-2">Guidelines for checking incoming packaging materials against approved specifications and artwork.</p>
                                <div className="flex gap-2">
                                    <button onClick={() => openModal('View WI Details', 'view')} className="flex-1 bg-white border border-gray-200 text-gray-600 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all">View Details</button>
                                    <button onClick={() => openModal('Edit WI', 'wi')} className="flex-1 bg-white border border-gray-200 text-gray-600 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'record' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-bold text-gray-800">Inspection Records</h3>
                            <button onClick={() => openModal('New Inspection Record', 'record')} className="bg-[#3B590C] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#2c4209] transition-all flex items-center gap-2">
                                <Icon name="Plus" size={14} /> New Record
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date/Time</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">PO Number</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Item/Material</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Supplier</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Inspector</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3"><div className="font-bold text-gray-700">12/01/2026</div><div className="text-[10px] text-gray-500">08:30 AM</div></td>
                                        <td className="px-4 py-3 font-mono text-xs">PO-2601-001</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Chicken Breast Meat</div><div className="text-[10px] text-gray-500">RM-ME-101</div></td>
                                        <td className="px-4 py-3 text-gray-600">CPF Thailand</td>
                                        <td className="px-4 py-3 text-gray-600">Somchai K.</td>
                                        <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Passed</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => openModal('View Record Details', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3"><div className="font-bold text-gray-700">12/01/2026</div><div className="text-[10px] text-gray-500">10:15 AM</div></td>
                                        <td className="px-4 py-3 font-mono text-xs">PO-2601-005</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Vacuum Bag 8x12</div><div className="text-[10px] text-gray-500">RM-PK-101</div></td>
                                        <td className="px-4 py-3 text-gray-600">PackCorp Ltd.</td>
                                        <td className="px-4 py-3 text-gray-600">Wipa S.</td>
                                        <td className="px-4 py-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Rejected</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => openModal('View Record Details', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Generic Modal */}
            {modalConfig.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
                    <Draggable handle=".modal-header">
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                            <div className="modal-header flex justify-between items-center p-5 border-b border-gray-100 bg-gray-50 cursor-move">
                                <h3 className="font-bold text-lg text-gray-800 uppercase tracking-tight">{modalConfig.title}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Icon name="X" size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            {modalConfig.type === 'wi' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">WI Document Number</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. WI-QA-IN-001" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Title</label>
                                        <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Procedure Title" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Description / Steps</label>
                                        <textarea rows={4} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Enter instructions here..."></textarea>
                                    </div>
                                </div>
                            )}
                            {modalConfig.type === 'record' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Date</label>
                                            <input type="date" defaultValue="2026-03-03" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Time</label>
                                            <input type="time" defaultValue="08:30" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">PO Number</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. PO-2603-001" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Supplier</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]">
                                                <option>Select Supplier...</option>
                                                <option>ABC Meat Co., Ltd.</option>
                                                <option>Thai Packaging Inc.</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Material / Item</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]">
                                                <option>Select Item...</option>
                                                <option>RM-001: Raw Pork Meat</option>
                                                <option>PM-005: Plastic Film</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Lot No.</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Enter lot number" />
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 overflow-hidden mt-2">
                                        <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-gray-700 uppercase">Inspection Parameters vs Specification</h4>
                                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">Auto-loaded from Spec</span>
                                        </div>
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-gray-50 border-b border-gray-200 text-[10px] text-gray-500 uppercase">
                                                <tr>
                                                    <th className="p-2 pl-4">Parameter</th>
                                                    <th className="p-2">Spec Limit</th>
                                                    <th className="p-2">Actual Result</th>
                                                    <th className="p-2 text-center">Eval</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                <tr>
                                                    <td className="p-2 pl-4 font-medium text-gray-800">Receiving Temp.</td>
                                                    <td className="p-2 text-gray-500 text-xs">&le; 4.0 &deg;C</td>
                                                    <td className="p-2"><input type="text" className="border border-gray-200 rounded p-1.5 w-full text-xs outline-none focus:border-[#BF2A2A]" placeholder="e.g. 3.5" /></td>
                                                    <td className="p-2 text-center"><select className="border border-gray-200 rounded p-1.5 text-xs outline-none focus:border-[#BF2A2A]"><option>Pass</option><option>Fail</option></select></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 pl-4 font-medium text-gray-800">Packaging Integrity</td>
                                                    <td className="p-2 text-gray-500 text-xs">Intact, No Leaks, Clean</td>
                                                    <td className="p-2"><input type="text" className="border border-gray-200 rounded p-1.5 w-full text-xs outline-none focus:border-[#BF2A2A]" placeholder="Visual check result" /></td>
                                                    <td className="p-2 text-center"><select className="border border-gray-200 rounded p-1.5 text-xs outline-none focus:border-[#BF2A2A]"><option>Pass</option><option>Fail</option></select></td>
                                                </tr>
                                                <tr>
                                                    <td className="p-2 pl-4 font-medium text-gray-800">Color & Odor</td>
                                                    <td className="p-2 text-gray-500 text-xs">Typical of fresh meat, no off-odor</td>
                                                    <td className="p-2"><input type="text" className="border border-gray-200 rounded p-1.5 w-full text-xs outline-none focus:border-[#BF2A2A]" placeholder="Sensory check result" /></td>
                                                    <td className="p-2 text-center"><select className="border border-gray-200 rounded p-1.5 text-xs outline-none focus:border-[#BF2A2A]"><option>Pass</option><option>Fail</option></select></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Overall Decision</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A] font-bold">
                                                <option className="text-green-600">Pass / Accept</option>
                                                <option className="text-red-600">Fail / Reject</option>
                                                <option className="text-yellow-600">Hold / Conditional</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Remarks / Action Taken</label>
                                            <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Any observations..."></textarea>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalConfig.type === 'view' && (
                                <div className="space-y-4 text-sm text-gray-700">
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="font-bold mb-2">Details for {modalConfig.title}</p>
                                        <p>This is a read-only view of the selected item. In a full application, this would display all the associated data fields, history, and attachments.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Icon name="Info" size={14} />
                                        <span>Last updated by System Admin on {new Date().toLocaleDateString()}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                            <button onClick={closeModal} className="px-4 py-2 text-sm font-bold text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
                            {modalConfig.type !== 'view' && (
                                <button onClick={closeModal} className="px-6 py-2 bg-[#BF2A2A] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#a4130d] transition-all">Save</button>
                            )}
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
}
