import React from 'react';
import * as Icons from 'lucide-react';

const PALETTE = {
    bgMain: '#F2F0EB', 
    glassWhite: 'rgba(255, 255, 255, 0.90)',
    red: '#a4130d',
    orange: '#C2613A',
    gold: '#BE9354',
    teal: '#BF2A2A', // Cadet Red (Apple)
    blue: '#3B590C', // Army Green (Apple Leaf)
    sidebar: '#141A26',
    text: '#3F4859', 
};

const MOCK_DATA = {
    stats: [
        { label: 'Total Inspections', value: '145', sub: 'Today', icon: 'ClipboardCheck', color: '#BF2A2A' }, // Cadet Red
        { label: 'Pass Rate', value: '98.5%', sub: 'Quality Score', icon: 'ShieldCheck', color: '#3B590C' }, // Army Green
        { label: 'Pending Release', value: '12', sub: 'Lots waiting', icon: 'Clock', color: '#BE9354' }, // Apple Pie Gold
        { label: 'Active NC', value: '3', sub: 'Requires Action', icon: 'AlertTriangle', color: '#a4130d' }, // Strawberry Red
    ],
    recentInspections: [
        { name: 'RM-Sugar-001', pos: 'Passed', dept: 'Incoming QA', time: '10:30 AM', avatar: 'https://www.finedininglovers.com/sites/default/files/body_images/types-of-sugar-white-sugar%C2%A9iStock.jpg' },
        { name: 'FG-Nugget-012', pos: 'Pending Lab', dept: 'FG QA', time: '11:15 AM', avatar: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=150&q=80' },
        { name: 'PM-Box-005', pos: 'Passed', dept: 'Incoming QA', time: '11:45 AM', avatar: 'https://images.unsplash.com/photo-1606859191214-25806e8e2423?w=150&q=80' },
    ],
    ccpAlerts: [
        { name: 'Metal Detector L1', dept: 'Processing', date: 'In 15 mins', avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&q=80' },
        { name: 'Pasteurizer Temp', dept: 'Cooking', date: 'In 30 mins', avatar: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&q=80' },
    ],
    approvals: [
        { id: 'NC-2024-003', type: 'NCR Approval', requester: 'QA Line 2', detail: 'Underweight Issue', status: 'Pending', icon: 'AlertTriangle' },
        { id: 'REL-2024-015', type: 'Positive Release', requester: 'QA Manager', detail: 'Lot FG-012', status: 'In Review', icon: 'CheckCircle' },
        { id: 'SPEC-2024-002', type: 'Spec Update', requester: 'R&D Dept', detail: 'New RM Spec', status: 'Processing', icon: 'FileText' },
    ],
};

const Icon = ({ name, size = 16, className = "", style, strokeWidth = 2 }: any) => {
    const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
    return <LucideIcon size={size} className={className} style={style} strokeWidth={strokeWidth} />;
};

const KPICard = ({ title, val, color, icon, desc }: any) => (
    <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100/80 relative overflow-hidden group h-full">
        <div className="absolute -right-6 -bottom-6 opacity-[0.1] transform rotate-12 group-hover:scale-110 transition-all duration-500 pointer-events-none z-0">
            <Icon name={icon} size={120} style={{color: color}} />
        </div>
        <div className="relative z-10 flex justify-between items-start">
            <div className="flex-1 min-w-0 flex flex-col gap-1">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest opacity-90 truncate">{title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h4 className="text-3xl font-extrabold tracking-tight leading-tight truncate" style={{color: color}}>{val}</h4>
                </div>
                {desc && (
                    <p className="text-[10px] text-gray-500 font-medium mt-2 flex items-center gap-1 truncate">
                        <span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor: color}}></span>
                        {desc}
                    </p>
                )}
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-white" style={{backgroundColor: color + '15'}}>
                <Icon name={icon} size={24} style={{color: color}} />
            </div>
        </div>
    </div>
);

const GlassCard = ({ children, className = '', hoverEffect = true }: any) => (
    <div className={`rounded-3xl p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-white/80 ${hoverEffect ? 'hover:-translate-y-1 transition-transform duration-300' : ''} ${className}`}
        style={{ backgroundColor: PALETTE.glassWhite }}>
        {children}
    </div>
);

const StatusBadge = ({ status }: any) => {
    const styles: any = {
        'Pending': { bg: '#FEF3C7', text: '#D97706' },
        'In Review': { bg: '#E0F2FE', text: '#0284C7' },
        'Approved': { bg: '#DCFCE7', text: '#16A34A' },
        'Rejected': { bg: '#FEE2E2', text: '#DC2626' },
        'Processing': { bg: '#F3E8FF', text: '#9333EA' },
    };
    const currentStyle = styles[status] || { bg: '#F1F5F9', text: '#475569' };
    return (
        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border border-white/50"
            style={{ backgroundColor: currentStyle.bg, color: currentStyle.text }}>
            {status}
        </span>
    );
};

export default function HomeView() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-3xl font-bold text-[#3F4859] uppercase tracking-tight">SAWASDEE, QA TEAM!</h1>
                    <p className="text-brandTeal text-sm font-medium">Quality Assurance Hub • <span className="text-brandOrange animate-pulse font-bold uppercase">Production Active</span></p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white/80 text-brandTeal px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm hover:bg-white transition-all flex items-center gap-2 border border-white">
                        <Icon name="Home" size={16} /> Factory Overview
                    </button>
                    <button className="bg-brandRed text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform flex items-center gap-2 hover:shadow-glow-red">
                        <Icon name="AlertCircle" size={16} /> Report NC
                    </button>
                </div>
            </div>

            {/* Banner & Slogan Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-soft border border-white/50 group">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10"></div>
                <img 
                    src="https://hfe.ae/wp-content/uploads/2024/10/Farm-Banner.jpg" 
                    alt="Farm Banner" 
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1 h-8 bg-brandOrange rounded-full"></div>
                        <h2 className="text-white text-2xl font-bold tracking-wide drop-shadow-md">FOOD SAFETY FIRST</h2>
                    </div>
                    <p className="text-white/90 text-lg font-medium italic drop-shadow-md max-w-2xl">
                        “A small mistake in food safety can have huge consequences.” <span className="text-brandGold font-bold not-italic">— WHO</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_DATA.stats.map((stat, idx) => (
                    <KPICard key={idx} title={stat.label} val={stat.value} color={stat.color} icon={stat.icon} desc={stat.sub} />
                ))}
            </div>

            {/* Shift Handover / Alert Board */}
            <div className="bg-gradient-to-r from-brandRed/10 via-brandOrange/5 to-white border-l-4 border-brandRed rounded-2xl p-5 shadow-sm relative overflow-hidden flex items-center gap-6">
                <div className="absolute -right-10 -top-10 text-brandRed opacity-5 transform rotate-12 pointer-events-none">
                    <Icon name="AlertOctagon" size={150} />
                </div>
                <div className="bg-brandRed text-white p-4 rounded-2xl shadow-glow-red shrink-0 relative z-10">
                    <Icon name="Megaphone" size={32} className="animate-pulse" />
                </div>
                <div className="flex-1 relative z-10">
                    <h3 className="text-xl font-bold text-brandRed uppercase tracking-tight flex items-center gap-2">
                        Shift Handover Alert
                        <span className="bg-brandRed text-white text-[9px] px-2 py-0.5 rounded-full animate-bounce">URGENT</span>
                    </h3>
                    <p className="text-sm text-[#3F4859] font-medium mt-1">
                        <strong className="text-brandRed">Previous Shift Issue:</strong> Metal detector on Line 2 rejected 5 packs of FG-Nugget-012 due to high sensitivity. 
                        <br/>
                        <span className="text-brandOrange font-bold">Action Required:</span> Current shift QC must recalibrate Line 2 detector and monitor every 30 mins.
                    </p>
                </div>
                <div className="shrink-0 relative z-10 hidden md:block text-right">
                    <p className="text-[10px] text-brandMuted font-bold uppercase">Reported By</p>
                    <p className="text-sm font-bold text-[#3F4859]">Night Shift Supervisor</p>
                    <p className="text-[10px] text-brandRed font-bold">06:00 AM</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="lg:col-span-2 relative overflow-hidden group bg-gradient-to-br from-white to-brandTeal/5 border-brandTeal/20">
                    <div className="absolute -bottom-10 -right-10 text-brandTeal opacity-5 transform -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Icon name="ClipboardCheck" size={240} />
                    </div>
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-xl font-bold text-[#3F4859] flex items-center gap-2 uppercase">
                            <Icon name="ShieldCheck" size={20} className="text-brandTeal" /> 
                            Recent Inspections
                        </h2>
                        <span className="text-[10px] text-brandTeal font-bold bg-brandTeal/10 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-brandTeal/10">Live Updates</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                        {MOCK_DATA.recentInspections.map((item, idx) => (
                            <div key={idx} className="p-4 bg-white/60 rounded-2xl border border-white/60 hover:bg-white hover:shadow-md transition-all text-center">
                                <div className="relative inline-block mb-3">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-brandTeal/30 shadow-sm mx-auto p-0.5">
                                        <img src={item.avatar} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 bg-brandTeal text-white p-1 rounded-lg border-2 border-white">
                                        <Icon name="Sparkles" size={10} />
                                    </div>
                                </div>
                                <h4 className="text-sm font-bold text-[#3F4859]">{item.name}</h4>
                                <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${item.pos === 'Passed' ? 'text-green-600' : 'text-brandOrange'}`}>{item.pos}</p>
                                <p className="text-[9px] text-brandMuted mt-0.5">{item.dept}</p>
                                <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between items-center px-1">
                                    <span className="text-[9px] text-brandMuted">Time</span>
                                    <span className="text-[9px] font-bold text-[#3F4859]">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="relative overflow-hidden group bg-gradient-to-br from-white to-brandGold/5 border-brandGold/20">
                    <div className="absolute -bottom-6 -right-6 text-brandGold opacity-10 transform rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Icon name="Activity" size={120} />
                    </div>
                    <h2 className="text-xl font-bold text-[#3F4859] mb-6 flex items-center gap-2 uppercase relative z-10">
                        <Icon name="AlertTriangle" size={20} className="text-brandOrange" /> 
                        CCP Alerts
                    </h2>
                    <div className="space-y-4 relative z-10">
                        {MOCK_DATA.ccpAlerts.map((alert, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 bg-white/70 rounded-2xl border border-white/80 hover:scale-[1.02] transition-transform shadow-sm">
                                <div className="w-10 h-10 rounded-full border-2 border-brandOrange/50 overflow-hidden shrink-0">
                                    <img src={alert.avatar} alt={alert.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-[#3F4859] truncate">{alert.name}</h4>
                                    <p className="text-[9px] text-brandMuted">{alert.dept}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[11px] font-bold text-brandOrange">{alert.date}</p>
                                    <div className="flex gap-1 justify-end">
                                        <span className="w-1 h-1 rounded-full bg-brandGold animate-ping"></span>
                                        <span className="w-1 h-1 rounded-full bg-brandOrange animate-ping delay-75"></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-3 mt-2 bg-gradient-to-r from-brandOrange to-brandGold text-white text-[10px] font-bold uppercase rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                            <Icon name="Send" size={12} /> Acknowledge All
                        </button>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="lg:col-span-2 relative overflow-hidden group bg-gradient-to-br from-white to-brandBlue/5 border-brandDeepBlue/10">
                    <div className="absolute -bottom-10 -right-10 text-brandBlue opacity-5 transform rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Icon name="ClipboardCheck" size={240} />
                    </div>
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h2 className="text-xl font-bold text-[#3F4859] flex items-center gap-2 uppercase">
                            <Icon name="CheckCircle" size={20} className="text-brandOrange" /> 
                            Pending Approvals
                        </h2>
                        <span className="text-xs text-brandBlue font-bold bg-brandBlue/10 px-3 py-1 rounded-full border border-brandBlue/10 shadow-sm uppercase tracking-tight">Requires Action</span>
                    </div>
                    <div className="space-y-3 relative z-10">
                        {MOCK_DATA.approvals.map((req, idx) => (
                            <div key={idx} className="flex items-center p-3 bg-white/70 rounded-2xl border border-white hover:bg-white transition-colors cursor-pointer group shadow-sm">
                                <div className="h-12 w-12 rounded-xl bg-[#F2F0EB] flex items-center justify-center text-[#3F4859] group-hover:scale-110 transition-transform shadow-inner border border-gray-200">
                                    <Icon name={req.icon} size={20} />
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between mb-1">
                                        <h4 className="font-bold text-[#3F4859] text-sm">{req.requester}</h4>
                                        <span className="text-[10px] font-bold text-brandTeal">{req.id}</span>
                                    </div>
                                    <p className="text-[10px] text-brandMuted uppercase font-bold">{req.type} • {req.detail}</p>
                                </div>
                                <div className="ml-4">
                                    <StatusBadge status={req.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="bg-gradient-to-b from-white/95 to-brandRed/5 border-brandRed/10 relative overflow-hidden group">
                    <div className="absolute -bottom-6 -right-6 text-brandRed opacity-5 transform -rotate-12 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Icon name="Bell" size={120} />
                    </div>
                    <h2 className="text-xl font-bold text-[#3F4859] mb-4 flex items-center gap-2 uppercase relative z-10">
                        <Icon name="AlertCircle" size={20} className="text-brandRed" />
                        Quality Alert
                    </h2>
                    <div className="space-y-4 relative z-10">
                        <div className="p-4 bg-brandRed/5 rounded-2xl border border-brandRed/10 flex gap-3 items-start hover:bg-white transition-all">
                            <div className="bg-white/90 p-1.5 rounded-full text-brandRed shadow-sm"><Icon name="Calendar" size={14}/></div>
                            <div>
                                <p className="text-xs font-bold text-brandRed">External Audit Next Week</p>
                                <p className="text-[10px] text-brandRed/80 mt-1 font-medium">GMP/HACCP audit starts Monday. Ensure all records are up to date.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-brandBlue/5 rounded-2xl border border-brandBlue/10 flex gap-3 items-start hover:bg-white transition-all">
                            <div className="bg-white/90 p-1.5 rounded-full text-brandBlue shadow-sm"><Icon name="Info" size={14}/></div>
                            <div>
                                <p className="text-xs font-bold text-brandBlue">New Spec Update</p>
                                <p className="text-[10px] text-brandBlue/80 mt-1 font-medium">Packaging spec for product A has been updated. Please review.</p>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
