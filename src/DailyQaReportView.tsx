import React from 'react';
import * as Icons from 'lucide-react';

const DailyQaReportView = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Daily QA Report</h2>
                    <p className="text-sm text-gray-500 mt-1">Summary of daily quality assurance activities</p>
                </div>
                <div className="flex gap-3">
                    <input type="date" defaultValue="2026-03-03" className="border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]" />
                    <button className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                        <Icons.Download size={16} />
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Incoming Inspections</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">12</h3>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Icons.Truck size={20} /></div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 flex gap-2">
                        <span className="text-green-600 font-bold">10 Pass</span>
                        <span className="text-red-600 font-bold">2 Reject</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">IPQC Checks</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">45</h3>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-lg text-purple-600"><Icons.Activity size={20} /></div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 flex gap-2">
                        <span className="text-green-600 font-bold">43 Normal</span>
                        <span className="text-yellow-600 font-bold">2 Warning</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Lab Tests</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">8</h3>
                        </div>
                        <div className="bg-teal-100 p-2 rounded-lg text-teal-600"><Icons.FlaskConical size={20} /></div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 flex gap-2">
                        <span className="text-green-600 font-bold">8 Pass</span>
                        <span className="text-red-600 font-bold">0 Fail</span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase">Active Holds</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">3</h3>
                        </div>
                        <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Icons.Lock size={20} /></div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 flex gap-2">
                        <span className="text-gray-600 font-bold">Pending Disposition</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Key Issues & Non-Conformances</h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 items-start">
                            <Icons.AlertCircle size={16} className="text-red-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-gray-800">High Receiving Temp (Raw Pork)</p>
                                <p className="text-xs text-gray-500">Lot L-260303-A rejected due to temp at 6.5°C (Spec &le; 4.0°C)</p>
                            </div>
                        </li>
                        <li className="flex gap-3 items-start">
                            <Icons.AlertTriangle size={16} className="text-yellow-500 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-gray-800">Core Temp Warning (Line 1)</p>
                                <p className="text-xs text-gray-500">Temp dropped to 74°C briefly. Adjusted oven settings. Back to normal.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Positive Release Summary</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-gray-800">Smoked Frankfurters (B260303-01)</p>
                                <p className="text-xs text-gray-500">All QC cleared</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Released</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-gray-800">Chicken Bologna (B260303-02)</p>
                                <p className="text-xs text-gray-500">Pending Micro Lab</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Pending</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DailyQaReportView;
