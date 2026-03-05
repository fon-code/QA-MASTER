import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Draggable from 'react-draggable';

const CoaGenerationView = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">COA Generation</h2>
                    <p className="text-sm text-gray-500 mt-1">Generate and manage Certificates of Analysis</p>
                </div>
                <button onClick={() => setShowModal(true)} className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                    <Icons.FileText size={16} />
                    Generate COA
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-bold">COA No.</th>
                            <th className="p-4 font-bold">Date</th>
                            <th className="p-4 font-bold">Product</th>
                            <th className="p-4 font-bold">Batch No.</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">COA-2603-001</td>
                            <td className="p-4 text-gray-600">03 Mar 2026</td>
                            <td className="p-4 text-gray-800">Smoked Frankfurters</td>
                            <td className="p-4 text-gray-600">B260303-01</td>
                            <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Generated</span></td>
                            <td className="p-4 text-center">
                                <button className="text-gray-400 hover:text-[#BF2A2A]"><Icons.Download size={18} /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Draggable handle=".modal-header">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                            <div className="modal-header p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 cursor-move">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <Icons.FileText size={18} className="text-[#BF2A2A]" />
                                Generate New COA
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <Icons.X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Product</label>
                                <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                    <option>Select Product...</option>
                                    <option>Smoked Frankfurters</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Batch / Lot No.</label>
                                <select className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-[#BF2A2A]">
                                    <option>Select Batch...</option>
                                    <option>B260303-01 (Passed All QC)</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-white bg-[#BF2A2A] hover:bg-[#A02020] rounded-lg">Generate COA</button>
                        </div>
                    </div>
                    </Draggable>
                </div>
            )}
        </div>
    );
};

export default CoaGenerationView;
