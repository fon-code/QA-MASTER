import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const CustomerComplaintView = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Customer Complaints</h2>
                    <p className="text-sm text-gray-500 mt-1">Log and track customer complaints and feedback</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                    <Icons.Plus size={16} />
                    Log Complaint
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-bold">Complaint ID</th>
                            <th className="p-4 font-bold">Date Received</th>
                            <th className="p-4 font-bold">Customer</th>
                            <th className="p-4 font-bold">Product / Batch</th>
                            <th className="p-4 font-bold">Issue Type</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">CMP-2603-001</td>
                            <td className="p-4 text-gray-600">01 Mar 2026</td>
                            <td className="p-4 text-gray-800">Retail Chain A</td>
                            <td className="p-4 text-gray-600">Smoked Frankfurters<br/><span className="text-xs text-gray-400">B260228-01</span></td>
                            <td className="p-4 text-gray-800">Foreign Object (Plastic)</td>
                            <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Open - Investigating</span></td>
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
                                <Icons.AlertCircle size={18} className="text-[#BF2A2A]" />
                                Log New Complaint
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <Icons.X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Date Received</label>
                                    <input type="date" defaultValue="2026-03-03" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Customer / Complainant</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Customer name" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Product</label>
                                    <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                        <option>Select Product...</option>
                                        <option>Smoked Frankfurters</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Batch / Lot No.</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Enter batch number" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Issue Category</label>
                                <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                    <option>Foreign Object</option>
                                    <option>Spoilage / Quality</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Complaint Details</label>
                                <textarea rows={4} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Describe the issue in detail..."></textarea>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-white bg-[#BF2A2A] hover:bg-[#A02020] rounded-lg">Submit Complaint</button>
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
};

export default CustomerComplaintView;
