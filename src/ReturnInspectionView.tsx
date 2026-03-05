import React from 'react';
import * as Icons from 'lucide-react';

const ReturnInspectionView = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Return Inspection</h2>
                    <p className="text-sm text-gray-500 mt-1">Inspect and disposition returned products</p>
                </div>
                <button className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                    <Icons.Plus size={16} />
                    Log Return
                </button>
            </div>

            <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                        <tr>
                            <th className="p-4 font-bold">Return ID</th>
                            <th className="p-4 font-bold">Date</th>
                            <th className="p-4 font-bold">Customer</th>
                            <th className="p-4 font-bold">Product / Batch</th>
                            <th className="p-4 font-bold">Qty Returned</th>
                            <th className="p-4 font-bold">Disposition</th>
                            <th className="p-4 font-bold text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        <tr className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-[#BF2A2A]">RET-2603-001</td>
                            <td className="p-4 text-gray-600">02 Mar 2026</td>
                            <td className="p-4 text-gray-800">Retail Chain A</td>
                            <td className="p-4 text-gray-600">Smoked Frankfurters<br/><span className="text-xs text-gray-400">B260228-01</span></td>
                            <td className="p-4 text-gray-800">50 kg</td>
                            <td className="p-4"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Scrap / Destroy</span></td>
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

export default ReturnInspectionView;
