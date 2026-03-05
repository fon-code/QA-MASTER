import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import SpecificationView from './SpecificationView';
import IncomingQAView from './IncomingQAView';
import InProcessQCView from './InProcessQCView';
import SensoryTestView from './SensoryTestView';
import LabAnalysisView from './LabAnalysisView';
import ShelfLifeView from './ShelfLifeView';
import CoaGenerationView from './CoaGenerationView';
import PositiveReleaseView from './PositiveReleaseView';
import CustomerComplaintView from './CustomerComplaintView';
import ProductRecallView from './ProductRecallView';
import ReturnInspectionView from './ReturnInspectionView';
import IssueNcrView from './IssueNcrView';
import CapaTrackingView from './CapaTrackingView';
import HoldRejectView from './HoldRejectView';
import DailyQaReportView from './DailyQaReportView';
import TrendAnalysisView from './TrendAnalysisView';
import HomeView from './HomeView';

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

const SYSTEM_MODULES = [
    { id: 'dashboard', label: 'HOME', icon: 'Home' },
    {
        id: 'spec_management', label: 'SPECIFICATION', icon: 'FileText',
        subItems: [
            { id: 'meat_spec', label: 'MEAT SPECIFICATION' },
            { id: 'raw_material_spec', label: 'RM SPECIFICATION' },
            { id: 'packaging_spec', label: 'PM SPECIFICATION' },
            { id: 'finished_goods_spec', label: 'FG SPECIFICATION' },
            { id: 'other_spec', label: 'OTHER SPECIFICATION' },
        ]
    },
    {
        id: 'incoming', label: 'INCOMING QA', icon: 'ClipboardCheck',
        subItems: [
            { id: 'rm_inspection', label: 'RM INSPECTION' },
            { id: 'pm_inspection', label: 'PM INSPECTION' },
            { id: 'supplier_eval', label: 'SUPPLIER EVALUATION' },
        ]
    },
    {
        id: 'ipqc', label: 'IN-PROCESS QC', icon: 'Activity',
        subItems: [
            { id: 'control_plan', label: 'CONTROL PLAN' },
            { id: 'line_inspection', label: 'LINE INSPECTION' },
            { id: 'ccp_monitoring', label: 'CCP MONITORING' },
            { id: 'weight_control', label: 'WEIGHT CONTROL' },
        ]
    },
    {
        id: 'fg_qc', label: 'FINISHED GOODS QC', icon: 'PackageCheck',
        subItems: [
            { id: 'sensory_test', label: 'SENSORY TEST' },
            { id: 'lab_analysis', label: 'LAB ANALYSIS' },
            { id: 'shelf_life', label: 'SHELF LIFE' },
        ]
    },
    {
        id: 'release', label: 'PRODUCT RELEASE', icon: 'CheckCircle',
        subItems: [
            { id: 'coa_generation', label: 'COA GENERATION' },
            { id: 'positive_release', label: 'POSITIVE RELEASE' },
        ]
    },
    {
        id: 'return_recall', label: 'RETURN & RECALL', icon: 'RotateCcw',
        subItems: [
            { id: 'customer_complaint', label: 'CUSTOMER COMPLAINT' },
            { id: 'product_recall', label: 'PRODUCT RECALL' },
            { id: 'return_inspection', label: 'RETURN INSPECTION' },
        ]
    },
    {
        id: 'nc_management', label: 'NC & CAPA', icon: 'AlertTriangle',
        subItems: [
            { id: 'issue_ncr', label: 'ISSUE NCR' },
            { id: 'capa_tracking', label: 'CAPA TRACKING' },
            { id: 'hold_reject', label: 'HOLD / REJECT' },
        ]
    },
    {
        id: 'reports', label: 'QA REPORTS', icon: 'BarChart3',
        subItems: [
            { id: 'daily_qa_report', label: 'DAILY QA REPORT' },
            { id: 'trend_analysis', label: 'TREND ANALYSIS' },
        ]
    },
    {
        id: 'setting', label: 'SETTING', icon: 'Settings',
        subItems: [
            { id: 'user_permission', label: 'USER PERMISSIONS' },
            { id: 'system_config', label: 'SYSTEM CONFIG' }
        ]
    }
];

const Icon = ({ name, size = 16, className = "", style, strokeWidth = 2 }: any) => {
    const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
    return <LucideIcon size={size} className={className} style={style} strokeWidth={strokeWidth} />;
};

const GlassCard = ({ children, className = '', hoverEffect = true }: any) => (
    <div className={`rounded-3xl p-6 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-white/80 ${hoverEffect ? 'hover:-translate-y-1 transition-transform duration-300' : ''} ${className}`}
        style={{ backgroundColor: PALETTE.glassWhite }}>
        {children}
    </div>
);

const NavItem = ({ icon, label, active, onClick, isOpen, subItems, isExpanded, onToggleExpand }: any) => {
    const hasSubItems = subItems && subItems.length > 0;
    const isDirectActive = active && !hasSubItems;
    const isParentActive = active && hasSubItems;

    return (
        <div className="mb-1">
            <button
                onClick={hasSubItems ? onToggleExpand : onClick}
                className={`w-full flex items-center transition-all duration-500 group relative rounded-xl mx-auto overflow-hidden
                    ${isDirectActive
                        ? 'text-white shadow-glow-teal border border-brandTeal/30'
                        : isParentActive
                        ? 'text-brandTeal bg-brandTeal/10 border border-brandTeal/10'
                        : `text-[#8F9FBF] hover:text-brandTeal hover:bg-brandTeal/5` 
                    }
                    ${!isOpen ? 'justify-center w-12 px-0' : 'w-[90%] px-4 justify-start'} 
                    py-3
                `}
                style={isDirectActive ? { background: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.blue})` } : {}}
            >
                <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 pointer-events-none ${isDirectActive ? 'animate-shimmer' : 'group-hover:animate-shimmer'}`} />
                <Icon name={icon} size={20} strokeWidth={isDirectActive || isParentActive ? 2.5 : 2} className={`relative z-10 transition-transform duration-300 ${isDirectActive ? 'scale-110 text-white' : ''} ${isParentActive ? 'text-brandTeal' : ''}`} />
                <div className={`relative z-10 overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-between flex-1 ${isOpen ? 'w-auto opacity-100 ml-3' : 'w-0 opacity-0 ml-0'}`}>
                    <span className={`text-sm tracking-wide uppercase text-left ${isDirectActive || isParentActive ? 'font-bold' : 'font-medium group-hover:font-semibold'}`}>
                        {label}
                    </span>
                    {hasSubItems && (
                        <Icon name="ChevronDown" size={14} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded && isOpen ? 'max-h-[500px] opacity-100 mt-1 pl-4' : 'max-h-0 opacity-0'}`}>
                <div className="border-l-2 border-brandTeal/20 pl-2 space-y-0.5">
                {hasSubItems && subItems.map((sub: any, idx: number) => (
                    <button key={idx} onClick={(e) => { e.stopPropagation(); sub.onClick(); }}
                        className={`w-full flex items-center px-4 py-2 rounded-lg transition-all duration-300 text-[11px] font-medium uppercase relative overflow-hidden group/sub justify-start text-left
                            ${sub.active ? 'text-white font-bold' : 'text-[#8F9FBF] hover:text-brandTeal hover:bg-brandTeal/5'}
                        `}
                        style={sub.active ? { background: `linear-gradient(90deg, ${PALETTE.teal}, ${PALETTE.blue})` } : {}}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full bg-current mr-2 relative z-10 ${sub.active ? 'bg-white' : 'opacity-30'}`}></span>
                        <span className="relative z-10 text-left">{sub.label}</span>
                    </button>
                ))}
                </div>
            </div>
        </div>
    );
};

const GenericView = ({ title, icon, desc }: any) => (
    <div className="animate-fadeIn">
        <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-2xl font-bold text-[#3F4859] uppercase tracking-tight">{title}</h2>
                <p className="text-xs text-brandTeal mt-1 font-medium italic">{desc || 'QA Master Innovation Module'}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="flex flex-col items-center justify-center min-h-[400px] text-center border-brandTeal/10">
                <div className="p-10 bg-[#F2F0EB] rounded-[2rem] mb-6 shadow-inner border border-gray-200">
                    <Icon name={icon} size={64} className="text-brandOrange" />
                </div>
                <h3 className="text-xl font-bold text-[#3F4859] uppercase tracking-widest">{title} Interface Ready</h3>
                <p className="text-sm text-brandMuted max-w-sm mt-4 font-medium">
                    Welcome to the {title} management module. Full CRUD operations, data tables, and quality tracking will be initialized here.
                </p>
                <button className="mt-8 px-10 py-3 bg-brandDeepBlue text-white rounded-2xl text-xs font-bold uppercase hover:bg-brandTeal transition-all shadow-lg hover:-translate-y-1">
                    Access Database
                </button>
            </GlassCard>
        </div>
    </div>
);

export default function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [expandedMenus, setExpandedMenus] = useState<any>({});
    const [visitedTabs, setVisitedTabs] = useState(['dashboard']);
    
    const [currentUser, setCurrentUser] = useState({
        name: 'T-DCC Developer',
        email: 'tallintelligence.dcc@gmail.com',
        position: 'Lead Developer',
        avatar: 'https://drive.google.com/thumbnail?id=1Z_fRbN9S4aA7OkHb3mlim_t60wIT4huY&sz=w400'
    });

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!visitedTabs.includes(activeTab)) setVisitedTabs(prev => [...prev, activeTab]);
    }, [activeTab]);

    const toggleMenu = (menuKey: string) => {
        setExpandedMenus((prev: any) => ({ ...prev, [menuKey]: !prev[menuKey] }));
        if (!isSidebarOpen) setSidebarOpen(true);
    };

    const getTabContent = (tabId: string) => {
        const module = SYSTEM_MODULES.find(m => m.id === tabId || m.subItems?.some(s => s.id === tabId));
        let title = tabId.replace(/_/g, ' ').toUpperCase();
        let icon = 'Users';

        if (tabId === 'dashboard') return <HomeView />;
        if (tabId === 'meat_spec' || tabId === 'raw_material_spec' || tabId === 'packaging_spec' || tabId === 'finished_goods_spec' || tabId === 'other_spec') {
            return <SpecificationView specType={tabId} />;
        }
        if (tabId === 'incoming' || module?.id === 'incoming') {
            return <IncomingQAView activeSubTab={tabId === 'incoming' ? 'rm_inspection' : tabId} />;
        }
        if (tabId === 'ipqc' || module?.id === 'ipqc') {
            return <InProcessQCView activeSubTab={tabId === 'ipqc' ? 'control_plan' : tabId} />;
        }
        if (tabId === 'sensory_test' || module?.id === 'fg_qc' && tabId === 'fg_qc') {
            return <SensoryTestView />;
        }
        if (tabId === 'lab_analysis') {
            return <LabAnalysisView />;
        }
        if (tabId === 'shelf_life') {
            return <ShelfLifeView />;
        }
        if (tabId === 'coa_generation') {
            return <CoaGenerationView />;
        }
        if (tabId === 'positive_release') {
            return <PositiveReleaseView />;
        }
        if (tabId === 'customer_complaint') {
            return <CustomerComplaintView />;
        }
        if (tabId === 'product_recall') {
            return <ProductRecallView />;
        }
        if (tabId === 'return_inspection') {
            return <ReturnInspectionView />;
        }
        if (tabId === 'issue_ncr') {
            return <IssueNcrView />;
        }
        if (tabId === 'capa_tracking') {
            return <CapaTrackingView />;
        }
        if (tabId === 'hold_reject') {
            return <HoldRejectView />;
        }
        if (tabId === 'daily_qa_report') {
            return <DailyQaReportView />;
        }
        if (tabId === 'trend_analysis') {
            return <TrendAnalysisView />;
        }
        
        if (module) {
            const subItem = module.subItems?.find(s => s.id === tabId);
            title = subItem ? subItem.label : module.label;
            icon = module.icon;
        }

        return <GenericView title={title} icon={icon} />;
    };

    return (
        <div className="flex h-screen w-full font-sans overflow-hidden bg-bgPage text-textMain">
            
            {/* Sidebar */}
            <aside className={`flex-shrink-0 flex flex-col transition-all duration-500 z-30 shadow-grand relative bg-sidebarBg ${isSidebarOpen ? 'w-72' : 'w-24'}`}>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="absolute -right-3 top-10 w-6 h-6 bg-brandTeal text-white rounded-full flex items-center justify-center shadow-lg z-50 border-2 border-sidebarBg hover:bg-brandRed transition-colors">
                    <Icon name={isSidebarOpen ? "ChevronLeft" : "ChevronRight"} size={12} />
                </button>

                <div className="h-32 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#B31B26] flex items-center justify-center shadow-lg transform rotate-3 relative overflow-hidden group border border-white/10">
                            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
                            <div className="relative">
                                <Icon 
                                    name="ShieldCheck" 
                                    size={26} 
                                    style={{ color: '#6DA136' }} 
                                    strokeWidth={2.5} 
                                />
                                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#B31B26] shadow-glow animate-pulse"></div>
                            </div>
                        </div>

                        <div className={`transition-all duration-500 overflow-hidden flex flex-col ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0'}`}>
                            <h1 className="text-white font-brand text-xl tracking-widest whitespace-nowrap">
                                <span className="font-light">QA</span><span className="font-extrabold text-brandRed">MASTER</span>
                            </h1>
                            <p className="text-brandTeal font-brand text-[9px] font-bold uppercase tracking-[0.74em] mt-0.5 whitespace-nowrap">Quality Hub</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar py-4 relative z-10">
                    {SYSTEM_MODULES.map(module => (
                        <NavItem 
                            key={module.id} 
                            icon={module.icon} 
                            label={module.label} 
                            active={activeTab === module.id || module.subItems?.some(s => s.id === activeTab)} 
                            onClick={() => module.subItems ? toggleMenu(module.id) : setActiveTab(module.id)} 
                            isOpen={isSidebarOpen}
                            isExpanded={expandedMenus[module.id]}
                            onToggleExpand={() => toggleMenu(module.id)}
                            subItems={module.subItems?.map(sub => ({
                                label: sub.label,
                                active: activeTab === sub.id,
                                onClick: () => setActiveTab(sub.id)
                            }))}
                        />
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 bg-black/20">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
                        <div 
                            className="w-11 h-11 rounded-2xl border-2 border-brandTeal/30 bg-cover bg-center shrink-0 shadow-sm p-0.5" 
                        >
                            <img src={currentUser.avatar} className="w-full h-full object-cover rounded-xl" alt="user" />
                        </div>
                        {isSidebarOpen && (
                            <div className="overflow-hidden">
                                <p className="text-white text-sm font-bold truncate w-32">{currentUser.name}</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-brandTeal rounded-full animate-pulse"></span>
                                    <p className="text-[#8F9FBF] text-[10px] uppercase font-bold tracking-wider">Logged in</p>
                                </div>
                            </div>
                        )}
                        {isSidebarOpen && <Icon name="Settings" size={18} className="ml-auto text-brandMuted hover:text-white cursor-pointer transition-colors" />}
                    </div>
                </div>
            </aside>

            <main className="flex-1 relative overflow-hidden bg-bgPage">
                <header className="h-24 px-8 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white shadow-sm">
                        <Icon name="Search" size={16} className="text-brandTeal" />
                        <input type="text" placeholder="Search spec, lot number, NC..." className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-brandMuted" />
                    </div>
                    
                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex items-center gap-4 bg-white/70 rounded-2xl pl-5 pr-1 py-1.5 border border-brandTeal/10 backdrop-blur-sm shadow-sm">
                            <div className="flex flex-col items-end leading-none">
                                <span className="text-[10px] font-bold text-brandDeepBlue uppercase tracking-widest">{currentTime.toLocaleDateString('en-GB', { weekday: 'long' })}</span>
                                <span className="text-xs font-bold text-brandTeal">{currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-brandDeepBlue text-white px-4 py-2 rounded-xl text-sm shadow-inner tracking-widest font-bold">
                                <Icon name="Clock" size={14} className="animate-pulse text-brandGold"/>
                                {currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                        <button className="relative p-3 rounded-2xl bg-white/70 border border-white text-brandDeepBlue shadow-sm hover:bg-white transition-all">
                            <Icon name="Bell" size={18} />
                            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-brandRed rounded-full border-2 border-white shadow-glow-red"></span>
                        </button>
                    </div>
                </header>

                <div className="absolute inset-0 top-24 px-8 pb-4 custom-scrollbar overflow-y-auto flex flex-col">
                    <div className="flex-1">
                        {visitedTabs.map(tabId => (
                            <div key={tabId} style={{ display: activeTab === tabId ? 'block' : 'none' }}>
                                {getTabContent(tabId)}
                            </div>
                        ))}
                    </div>
                    <footer className="mt-4 py-3.5 text-center border-t border-brandTeal/10 shrink-0">
                        <div className="flex flex-col items-center justify-center gap-1.5">
                            <div className="flex items-center gap-2">
                                <Icon name="Sparkles" size={12} className="text-brandGold" />
                                <span className="text-[10px] font-bold text-brandDeepBlue uppercase tracking-[0.15em]">
                                    QA MASTER • THE FUTURE OF QUALITY & COMPLIANCE • EMPOWERING FOOD SAFETY
                                </span>
                            </div>
                            <p className="text-[9px] text-brandTeal font-mono font-medium tracking-tight">
                                System by <span className="font-bold text-brandDeepBlue">T All Intelligence</span> | 📞 082-5695654 | 📧 tallintelligence.ho@gmail.com
                            </p>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}
