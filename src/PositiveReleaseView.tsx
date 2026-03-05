import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const PositiveReleaseView = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Positive Release</h2>
                    <p className="text-sm text-gray-500 mt-1">Review and approve batches for shipment</p>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-bold">Batch No.</th>
                            <th className="p-4 font-bold">Product</th>
                            <th className="p-4 font-bold">Production Date</th>
                            <th className="p-4 font-bold text-center">IPQC</th>
                            <th className="p-4 font-bold text-center">Lab</th>
                            <th className="p-4 font-bold text-center">Sensory</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-800">B260303-01</td>
                            <td className="p-4 text-gray-600">Smoked Frankfurters</td>
                            <td className="p-4 text-gray-600">03 Mar 2026</td>
                            <td className="p-4 text-center"><Icons.CheckCircle size={16} className="text-green-500 mx-auto" /></td>
                            <td className="p-4 text-center"><Icons.CheckCircle size={16} className="text-green-500 mx-auto" /></td>
                            <td className="p-4 text-center"><Icons.CheckCircle size={16} className="text-green-500 mx-auto" /></td>
                            <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending Release</span></td>
                            <td className="p-4 text-center">
                                <button onClick={() => setShowModal(true)} className="text-[#BF2A2A] hover:underline font-bold text-xs uppercase">Review</button>
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
                                <Icons.CheckSquare size={18} className="text-[#BF2A2A]" />
                                Positive Release Approval
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <Icons.X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Batch No.</p>
                                    <p className="font-bold text-gray-800">B260303-01</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Product</p>
                                    <p className="font-bold text-gray-800">Smoked Frankfurters</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-800 mb-3 border-b pb-2">QC Clearance Checklist</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Icons.CheckCircle size={20} className="text-green-600" />
                                            <div>
                                                <p className="text-sm font-bold text-green-800">In-Process QC (IPQC)</p>
                                                <p className="text-xs text-green-600">All CCPs and CPs passed</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">Cleared</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Icons.CheckCircle size={20} className="text-green-600" />
                                            <div>
                                                <p className="text-sm font-bold text-green-800">Lab Analysis (Micro & Chem)</p>
                                                <p className="text-xs text-green-600">Results within specification</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">Cleared</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-green-200 bg-green-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Icons.CheckCircle size={20} className="text-green-600" />
                                            <div>
                                                <p className="text-sm font-bold text-green-800">Sensory Evaluation</p>
                                                <p className="text-xs text-green-600">Score 4.5/5.0 (Pass)</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-bold text-green-700 bg-green-200 px-2 py-1 rounded">Cleared</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Release Decision</label>
                                <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A] font-bold">
                                    <option className="text-green-600">Approve for Release</option>
                                    <option className="text-red-600">Reject / Hold</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2">
                                <Icons.Check size={16} />
                                Confirm Release
                            </button>
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
};

export default PositiveReleaseView;
