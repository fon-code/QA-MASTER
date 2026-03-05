import React from 'react';
import * as Icons from 'lucide-react';

const ProductRecallView = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Product Recall</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage product recalls and mock recall drills</p>
                </div>
                <button className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                    <Icons.AlertTriangle size={16} />
                    Initiate Recall
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-bold">Recall ID</th>
                            <th className="p-4 font-bold">Type</th>
                            <th className="p-4 font-bold">Date Initiated</th>
                            <th className="p-4 font-bold">Product / Batch</th>
                            <th className="p-4 font-bold">Reason</th>
                            <th className="p-4 font-bold">Status</th>
                            <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">REC-2511-001</td>
                            <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Mock Drill</span></td>
                            <td className="p-4 text-gray-600">15 Nov 2025</td>
                            <td className="p-4 text-gray-800">Smoked Frankfurters<br/><span className="text-xs text-gray-400">B251110-02</span></td>
                            <td className="p-4 text-gray-800">Traceability Test</td>
                            <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Completed (100%)</span></td>
                            <td className="p-4 text-center">
                                <button className="text-gray-400 hover:text-[#BF2A2A]"><Icons.Eye size={18} /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductRecallView;
