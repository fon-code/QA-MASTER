import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const HoldRejectView = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Hold / Reject Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Track and disposition non-conforming products</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                    <Icons.Lock size={16} />
                    New Hold Record
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-bold">Record ID</th>
                            <th className="p-4 font-bold">Date</th>
                            <th className="p-4 font-bold">Product / Material</th>
                            <th className="p-4 font-bold">Batch / Lot No.</th>
                            <th className="p-4 font-bold">Quantity</th>
                            <th className="p-4 font-bold">Reason</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">HLD-2603-001</td>
                            <td className="p-4 text-gray-600">03 Mar 2026</td>
                            <td className="p-4 text-gray-800">Raw Pork Meat</td>
                            <td className="p-4 text-gray-600">L-260303-A</td>
                            <td className="p-4 text-gray-800">500 kg</td>
                            <td className="p-4 text-gray-600">High receiving temp</td>
                            <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">On Hold</span></td>
                            <td className="p-4 text-center">
                                <button className="text-gray-400 hover:text-[#BF2A2A]"><Icons.Edit size={18} /></button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">REJ-2602-012</td>
                            <td className="p-4 text-gray-600">28 Feb 2026</td>
                            <td className="p-4 text-gray-800">Plastic Film</td>
                            <td className="p-4 text-gray-600">PF-005-B</td>
                            <td className="p-4 text-gray-800">10 Rolls</td>
                            <td className="p-4 text-gray-600">Torn packaging</td>
                            <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Rejected</span></td>
                            <td className="p-4 text-center">
                                <button className="text-gray-400 hover:text-[#BF2A2A]"><Icons.Eye size={18} /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Draggable handle=".modal-header">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
                            <div className="modal-header p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 cursor-move">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                    <Icons.Lock size={18} className="text-[#BF2A2A]" />
                                    Create Hold / Reject Record
                                </h3>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                    <Icons.X size={20} />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Date</label>
                                    <input type="date" defaultValue="2026-03-03" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Type</label>
                                    <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                        <option>Hold</option>
                                        <option>Reject</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Product / Material</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Item name" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Batch / Lot No.</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Batch number" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Quantity</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. 500 kg" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Location</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. Warehouse A, Zone 2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Reason for Hold / Reject</label>
                                <textarea rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Describe why the item is being held or rejected..."></textarea>
                            </div>
                        </div>
                            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-white bg-[#BF2A2A] hover:bg-[#A02020] rounded-lg">Save Record</button>
                            </div>
                        </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
};

export default HoldRejectView;
