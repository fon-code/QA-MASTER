import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const Icon = ({ name, size = 16, className = "" }: any) => {
    const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
    return <LucideIcon size={size} className={className} />;
};

export default function LabAnalysisView() {
    const [activeTab, setActiveTab] = useState('micro'); // 'micro' or 'chem'
    const [modalConfig, setModalConfig] = useState<{isOpen: boolean, title: string, type: 'new' | 'view' | null}>({ isOpen: false, title: '', type: null });

    const openModal = (title: string, type: 'new' | 'view') => {
        setModalConfig({ isOpen: true, title, type });
    };

    const closeModal = () => {
        setModalConfig({ isOpen: false, title: '', type: null });
    };

    return (
        <div className="animate-fadeIn h-full flex flex-col">
            <div className="flex justify-between items-end mb-6 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-[#3F4859] uppercase tracking-tight">Lab Analysis</h2>
                    <p className="text-xs text-[#BF2A2A] mt-1 font-bold uppercase tracking-widest">Finished Goods QC</p>
                </div>
                <button onClick={() => openModal('Log New Lab Result', 'new')} className="bg-[#3B590C] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#2c4209] transition-all flex items-center gap-2">
                    <Icon name="Plus" size={14} /> Log Result
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6 shrink-0">
                <button 
                    onClick={() => setActiveTab('micro')}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'micro' ? 'border-[#BF2A2A] text-[#BF2A2A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2"><Icon name="Microscope" size={16} /> Microbiological</div>
                </button>
                <button 
                    onClick={() => setActiveTab('chem')}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'chem' ? 'border-[#BF2A2A] text-[#BF2A2A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2"><Icon name="FlaskConical" size={16} /> Chemical & Physical</div>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {activeTab === 'micro' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sample ID</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product / Lot No.</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Test Parameter</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Result</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Specification</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-600">LAB-2601-001</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Smoked Sausage</div><div className="text-[10px] text-gray-500">L260112-01</div></td>
                                        <td className="px-4 py-3 text-gray-600">Salmonella spp.</td>
                                        <td className="px-4 py-3 font-bold text-gray-700">Not Detected / 25g</td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">Not Detected / 25g</td>
                                        <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Pass</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => openModal('View Lab Result', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-600">LAB-2601-002</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Beef Meatball</div><div className="text-[10px] text-gray-500">L260111-03</div></td>
                                        <td className="px-4 py-3 text-gray-600">E. coli</td>
                                        <td className="px-4 py-3 font-bold text-red-600">&gt; 100 CFU/g</td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">&lt; 10 CFU/g</td>
                                        <td className="px-4 py-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Fail</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => openModal('View Lab Result', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'chem' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sample ID</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product / Lot No.</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Test Parameter</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Result</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Specification</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-600">LAB-2601-015</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Chicken Bologna</div><div className="text-[10px] text-gray-500">L260110-02</div></td>
                                        <td className="px-4 py-3 text-gray-600">Moisture Content</td>
                                        <td className="px-4 py-3 font-bold text-gray-700">62.5 %</td>
                                        <td className="px-4 py-3 text-gray-500 text-xs">60.0 - 65.0 %</td>
                                        <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Pass</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => openModal('View Lab Result', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
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
                            {modalConfig.type === 'new' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Sample ID</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Auto-generated or Manual" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Test Category</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                                <option>Microbiological</option>
                                                <option>Chemical</option>
                                                <option>Physical</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Product</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Select product..." />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Lot Number</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. L260112-01" />
                                        </div>
                                    </div>
                                    
                                    <div className="border border-gray-200 overflow-hidden mt-4">
                                        <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-gray-700 uppercase">Test Parameters vs Specification</h4>
                                            <button className="text-[10px] text-[#BF2A2A] font-bold uppercase tracking-wider hover:underline">+ Add Parameter</button>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex gap-3 items-center">
                                                <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Parameter (e.g. Salmonella)" />
                                                <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Spec Limit (e.g. ND/25g)" />
                                                <input type="text" className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Actual Result" />
                                                <select className="w-24 border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]">
                                                    <option>Pass</option>
                                                    <option>Fail</option>
                                                </select>
                                                <button className="text-red-400 hover:text-red-600"><Icon name="Trash2" size={16}/></button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Analyst Comments</label>
                                        <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Any deviations or notes..."></textarea>
                                    </div>
                                </div>
                            )}
                            {modalConfig.type === 'view' && (
                                <div className="space-y-4 text-sm text-gray-700">
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="font-bold mb-2">Details for {modalConfig.title}</p>
                                        <p>This is a read-only view of the selected lab result. It would normally display the full Certificate of Analysis (COA) or internal lab report.</p>
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
                                <button onClick={closeModal} className="px-6 py-2 bg-[#3B590C] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#2c4209] transition-all">Save Result</button>
                            )}
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
}
