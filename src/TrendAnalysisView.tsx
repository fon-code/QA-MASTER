import React from 'react';
import * as Icons from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const dataPassRate = [
  { name: 'Jan', ipqc: 98, incoming: 95 },
  { name: 'Feb', ipqc: 97, incoming: 96 },
  { name: 'Mar', ipqc: 99, incoming: 94 },
  { name: 'Apr', ipqc: 98, incoming: 97 },
  { name: 'May', ipqc: 99, incoming: 98 },
  { name: 'Jun', ipqc: 99, incoming: 99 },
];

const dataDefects = [
  { name: 'Foreign Obj', count: 12 },
  { name: 'Temp Out', count: 8 },
  { name: 'Packaging', count: 15 },
  { name: 'Weight', count: 5 },
  { name: 'Sensory', count: 3 },
];

const TrendAnalysisView = () => {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Trend Analysis</h2>
                    <p className="text-sm text-gray-500 mt-1">Visualize QA metrics and historical trends</p>
                </div>
                <div className="flex gap-3">
                    <select className="border border-gray-200 rounded-lg p-2 text-sm outline-none focus:border-[#BF2A2A]">
                        <option>Last 6 Months</option>
                        <option>Last 12 Months</option>
                        <option>Year to Date</option>
                    </select>
                    <button className="bg-[#BF2A2A] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#A02020] flex items-center gap-2">
                        <Icons.Download size={16} />
                        Export Data
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Pass Rate Trends (%)</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataPassRate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                <YAxis domain={[90, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dx={-10} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                <Line type="monotone" dataKey="ipqc" name="IPQC Pass Rate" stroke="#BF2A2A" strokeWidth={3} dot={{ r: 4, fill: '#BF2A2A' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="incoming" name="Incoming Pass Rate" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Top Non-Conformances (YTD)</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dataDefects} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dx={-10} />
                                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="count" name="Incidents" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4">Key Insights</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Icons.TrendingUp size={18} className="text-green-600" />
                            <h4 className="font-bold text-green-800">IPQC Stability</h4>
                        </div>
                        <p className="text-sm text-green-700">IPQC pass rate has remained above 98% for the last 3 months, indicating stable production processes.</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Icons.AlertTriangle size={18} className="text-red-600" />
                            <h4 className="font-bold text-red-800">Packaging Defects</h4>
                        </div>
                        <p className="text-sm text-red-700">Packaging integrity issues account for the highest number of defects. Recommend reviewing sealing equipment.</p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Icons.CheckCircle size={18} className="text-blue-600" />
                            <h4 className="font-bold text-blue-800">Supplier Quality</h4>
                        </div>
                        <p className="text-sm text-blue-700">Incoming QA pass rate improved by 5% since April following the new supplier audit program.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendAnalysisView;
