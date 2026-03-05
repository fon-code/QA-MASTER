import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const Icon = ({ name, size = 16, className = "" }: any) => {
    const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
    return <LucideIcon size={size} className={className} />;
};

export default function SensoryTestView() {
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
                    <h2 className="text-2xl font-bold text-[#3F4859] uppercase tracking-tight">Sensory Test</h2>
                    <p className="text-xs text-[#BF2A2A] mt-1 font-bold uppercase tracking-widest">Finished Goods QC</p>
                </div>
                <button onClick={() => openModal('New Sensory Evaluation', 'new')} className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-md hover:bg-[#a4130d] transition-all flex items-center gap-2">
                    <Icon name="Plus" size={14} /> New Evaluation
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date/Time</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Lot No.</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Evaluator</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Score (Avg)</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Result</th>
                                <th className="px-4 py-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3"><div className="font-bold text-gray-700">12/01/2026</div><div className="text-[10px] text-gray-500">09:00 AM</div></td>
                                <td className="px-4 py-3"><div className="font-bold text-gray-800">Smoked Chicken Breast</div><div className="text-[10px] text-gray-500">FG-CB-201</div></td>
                                <td className="px-4 py-3 font-mono text-xs text-gray-600">L260112-01</td>
                                <td className="px-4 py-3 text-gray-600">Panel A (3 members)</td>
                                <td className="px-4 py-3 font-bold text-gray-700">4.8 / 5.0</td>
                                <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Accept</span></td>
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => openModal('View Evaluation Details', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3"><div className="font-bold text-gray-700">11/01/2026</div><div className="text-[10px] text-gray-500">14:30 PM</div></td>
                                <td className="px-4 py-3"><div className="font-bold text-gray-800">Spicy Beef Sausage</div><div className="text-[10px] text-gray-500">FG-BS-105</div></td>
                                <td className="px-4 py-3 font-mono text-xs text-gray-600">L260111-03</td>
                                <td className="px-4 py-3 text-gray-600">Panel B (5 members)</td>
                                <td className="px-4 py-3 font-bold text-gray-700">3.2 / 5.0</td>
                                <td className="px-4 py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-[9px] font-bold uppercase">Borderline</span></td>
                                <td className="px-4 py-3 text-center">
                                    <button onClick={() => openModal('View Evaluation Details', 'view')} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200 transition-all"><Icon name="Eye" size={14}/></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
                                <div className="space-y-6">
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
                                    
                                    <div className="border border-gray-200 overflow-hidden">
                                        <div className="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center">
                                            <h4 className="text-xs font-bold text-gray-700 uppercase">Evaluation Criteria vs Specification</h4>
                                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">Target Score &ge; 4.0</span>
                                        </div>
                                        <div className="p-4 space-y-4">
                                            {['Appearance', 'Color', 'Odor / Aroma', 'Flavor / Taste', 'Texture'].map(criteria => (
                                                <div key={criteria} className="flex items-center gap-4">
                                                    <div className="w-1/3 text-sm font-bold text-gray-700">{criteria}</div>
                                                    <div className="w-1/4 text-xs text-gray-500">Spec: Score 4-5</div>
                                                    <div className="flex-1 flex gap-2">
                                                        {[1, 2, 3, 4, 5].map(score => (
                                                            <label key={score} className="flex-1 flex items-center justify-center border border-gray-200 rounded-lg p-2 cursor-pointer hover:bg-gray-50">
                                                                <input type="radio" name={criteria} value={score} className="mr-2" />
                                                                <span className="text-sm">{score}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Overall Comments</label>
                                        <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Any specific off-flavors or texture issues?"></textarea>
                                    </div>
                                </div>
                            )}
                            {modalConfig.type === 'view' && (
                                <div className="space-y-4 text-sm text-gray-700">
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <p className="font-bold mb-2">Details for {modalConfig.title}</p>
                                        <p>This is a read-only view of the selected sensory evaluation. It would normally display a radar chart of the scores and individual panelist feedback.</p>
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
                                <button onClick={closeModal} className="px-6 py-2 bg-[#BF2A2A] text-white text-sm font-bold rounded-lg shadow-md hover:bg-[#a4130d] transition-all">Submit Evaluation</button>
                            )}
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
}
