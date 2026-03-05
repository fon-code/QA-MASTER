import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const Icon = ({ name, size = 16, className = "" }: any) => {
    const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
    return <LucideIcon size={size} className={className} />;
};

export default function ShelfLifeView() {
    const [activeTab, setActiveTab] = useState('ongoing'); // 'ongoing' or 'completed'
    const [modalConfig, setModalConfig] = useState<{isOpen: boolean, title: string, type: 'new' | 'view' | 'update' | null}>({ isOpen: false, title: '', type: null });

    const openModal = (title: string, type: 'new' | 'view' | 'update') => {
        setModalConfig({ isOpen: true, title, type });
    };

    const closeModal = () => {
        setModalConfig({ isOpen: false, title: '', type: null });
    };

    return (
        <div className="animate-fadeIn h-full flex flex-col">
            <div className="flex justify-between items-end mb-6 shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-[#3F4859] uppercase tracking-tight">Shelf Life Study</h2>
                    <p className="text-xs text-[#BF2A2A] mt-1 font-bold uppercase tracking-widest">Finished Goods QC</p>
                </div>
                <button onClick={() => openModal('Initiate New Study', 'new')} className="bg-[#BE9354] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#a67c42] transition-all flex items-center gap-2">
                    <Icon name="Plus" size={14} /> New Study
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200 mb-6 shrink-0">
                <button 
                    onClick={() => setActiveTab('ongoing')}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'ongoing' ? 'border-[#BF2A2A] text-[#BF2A2A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2"><Icon name="Timer" size={16} /> Ongoing Studies</div>
                </button>
                <button 
                    onClick={() => setActiveTab('completed')}
                    className={`pb-3 px-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${activeTab === 'completed' ? 'border-[#BF2A2A] text-[#BF2A2A]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    <div className="flex items-center gap-2"><Icon name="CheckCircle" size={16} /> Completed</div>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {activeTab === 'ongoing' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Study ID</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product / Lot No.</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Start Date</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Target Duration</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Next Test Date</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Progress</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-600">SLS-2601-01</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Premium Bacon</div><div className="text-[10px] text-gray-500">L260105-01</div></td>
                                        <td className="px-4 py-3 text-gray-600">05/01/2026</td>
                                        <td className="px-4 py-3 text-gray-600">30 Days</td>
                                        <td className="px-4 py-3 font-bold text-[#BF2A2A]">12/01/2026 (Day 7)</td>
                                        <td className="px-4 py-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-[#BE9354] h-2.5 rounded-full" style={{ width: '25%' }}></div>
                                            </div>
                                            <div className="text-[9px] text-gray-500 mt-1 text-right">25%</div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => openModal('Update Study Progress', 'update')} className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-all" title="Log Test Result"><Icon name="Edit3" size={14}/></button>
                                                <button onClick={() => openModal('View Study Details', 'view')} className="p-1.5 bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200 transition-all" title="View Details"><Icon name="Eye" size={14}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-600">SLS-2512-05</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Chicken Sausage</div><div className="text-[10px] text-gray-500">L251220-02</div></td>
                                        <td className="px-4 py-3 text-gray-600">20/12/2025</td>
                                        <td className="px-4 py-3 text-gray-600">60 Days</td>
                                        <td className="px-4 py-3 text-gray-600">19/01/2026 (Day 30)</td>
                                        <td className="px-4 py-3">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-[#3B590C] h-2.5 rounded-full" style={{ width: '40%' }}></div>
                                            </div>
                                            <div className="text-[9px] text-gray-500 mt-1 text-right">40%</div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => openModal('Update Study Progress', 'update')} className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-all" title="Log Test Result"><Icon name="Edit3" size={14}/></button>
                                                <button onClick={() => openModal('View Study Details', 'view')} className="p-1.5 bg-gray-100 text-gray-500 rounded-md hover:bg-gray-200 transition-all" title="View Details"><Icon name="Eye" size={14}/></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'completed' && (
                    <div className="space-y-6 animate-fadeIn">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Study ID</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product / Lot No.</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Start Date</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">End Date</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Determined Shelf Life</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-xs text-gray-600">SLS-2511-02</td>
                                        <td className="px-4 py-3"><div className="font-bold text-gray-800">Pork Meatball</div><div className="text-[10px] text-gray-500">L251101-01</div></td>
                                        <td className="px-4 py-3 text-gray-600">01/11/2025</td>
                                        <td className="px-4 py-3 text-gray-600">01/12/2025</td>
                                        <td className="px-4 py-3 font-bold text-gray-700">30 Days</td>
                                        <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Approved</span></td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => openModal('View Study Details', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
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
                        <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
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
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Product</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Select product..." />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Lot Number</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. L260112-01" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Start Date</label>
                                            <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Target Duration (Days)</label>
                                            <input type="number" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. 30" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Storage Condition</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                                <option>Chilled (0-4°C)</option>
                                                <option>Frozen (-18°C)</option>
                                                <option>Ambient</option>
                                                <option>Accelerated</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Testing Frequency</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                                <option>Every 7 Days</option>
                                                <option>Every 14 Days</option>
                                                <option>Every 30 Days</option>
                                                <option>Custom</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Parameters to Test</label>
                                        <div className="flex gap-4 mt-2">
                                            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Sensory</label>
                                            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Microbiological</label>
                                            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Chemical (e.g. TBA, TVB-N)</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {modalConfig.type === 'update' && (
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                                        <p className="font-bold text-sm">Logging Result for: SLS-2601-01 (Day 7)</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Test Date</label>
                                            <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Overall Status</label>
                                            <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                                <option>Acceptable</option>
                                                <option>Marginal</option>
                                                <option>Unacceptable (Terminate Study)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Sensory Score (1-5)</label>
                                        <input type="number" step="0.1" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. 4.5" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Micro/Chem Results Summary</label>
                                        <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Summarize lab findings..."></textarea>
                                    </div>
                                </div>
                            )}
                            {modalConfig.type === 'view' && (
                                <div className="space-y-4 text-sm text-gray-700">
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="font-bold mb-2">Details for {modalConfig.title}</p>
                                        <p>This is a read-only view of the shelf life study. It would normally display a timeline of all tests conducted, graphs of degradation over time, and final conclusions.</p>
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
                                <button onClick={closeModal} className="px-6 py-2 bg-[#BE9354] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#a67c42] transition-all">Save</button>
                            )}
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
}
