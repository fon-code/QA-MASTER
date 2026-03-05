import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const CapaTrackingView = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">CAPA Tracking</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage Corrective and Preventive Actions</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                    <Icons.Plus size={16} />
                    New CAPA
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-bold">CAPA No.</th>
                            <th className="p-4 font-bold">Date Issued</th>
                            <th className="p-4 font-bold">Source</th>
                            <th className="p-4 font-bold">Root Cause</th>
                            <th className="p-4 font-bold">Assigned To</th>
                            <th className="p-4 font-bold">Due Date</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">CAPA-2603-001</td>
                            <td className="p-4 text-gray-600">03 Mar 2026</td>
                            <td className="p-4 text-gray-800">NCR-2603-001</td>
                            <td className="p-4 text-gray-600">Sensor calibration drift</td>
                            <td className="p-4 text-gray-800">Maintenance Dept</td>
                            <td className="p-4 text-gray-600">10 Mar 2026</td>
                            <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">In Progress</span></td>
                            <td className="p-4 text-center">
                                <button className="text-gray-400 hover:text-[#BF2A2A]"><Icons.Edit size={18} /></button>
                            </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">CAPA-2602-015</td>
                            <td className="p-4 text-gray-600">20 Feb 2026</td>
                            <td className="p-4 text-gray-800">Customer Complaint</td>
                            <td className="p-4 text-gray-600">Packaging seal weak</td>
                            <td className="p-4 text-gray-800">Production Dept</td>
                            <td className="p-4 text-gray-600">28 Feb 2026</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Verifying</span></td>
                            <td className="p-4 text-center">
                                <button className="text-gray-400 hover:text-[#BF2A2A]"><Icons.Edit size={18} /></button>
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
                                <Icons.Target size={18} className="text-[#BF2A2A]" />
                                Create New CAPA
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <Icons.X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Source Reference</label>
                                    <input type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="e.g. NCR-2603-001" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Assigned Department</label>
                                    <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                        <option>Production</option>
                                        <option>Maintenance</option>
                                        <option>Warehouse</option>
                                        <option>QA/QC</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Root Cause Analysis</label>
                                <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Describe the root cause..."></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Corrective Action Plan</label>
                                <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Steps to correct the issue..."></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Preventive Action Plan</label>
                                <textarea rows={2} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" placeholder="Steps to prevent recurrence..."></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Target Completion Date</label>
                                    <input type="date" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Status</label>
                                    <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                        <option>Open</option>
                                        <option>In Progress</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-white bg-[#BF2A2A] hover:bg-[#A02020] rounded-lg">Save CAPA</button>
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
};

export default CapaTrackingView;
