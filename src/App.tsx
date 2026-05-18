/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Shield, 
  FileText, 
  Activity, 
  User as UserIcon,
  Bell,
  Settings,
  PhoneCall,
  Menu,
  ChevronRight,
  Plus,
  ArrowRight,
  Heart,
  Car,
  Plane,
  Home as HomeIcon,
  CreditCard,
  Briefcase,
  Ship,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  MapPin,
  Clock,
  ArrowLeft,
  X,
  Search,
  Filter,
  ArrowUpRight,
  Download,
  Share2
} from 'lucide-react';
import { Screen } from './types';
import { MOCK_USER, MOCK_POLICIES, MOCK_CLAIMS, MOCK_CHALLENGES } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('login'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const navigateTo = (screen: Screen) => {
    setPrevScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen />;
      case 'login': return <LoginScreen onLogin={() => setCurrentScreen('dashboard')} />;
      case 'dashboard': return <DashboardScreen navigateTo={navigateTo} />;
      case 'policies': return <PoliciesScreen navigateTo={navigateTo} setSelectedPolicyId={setSelectedPolicyId} />;
      case 'policy-details': return <PolicyDetailsScreen policyId={selectedPolicyId} onBack={() => setCurrentScreen('policies')} />;
      case 'claims': return <ClaimsScreen navigateTo={navigateTo} setSelectedClaimId={setSelectedClaimId} />;
      case 'claim-details': return <ClaimDetailsScreen claimId={selectedClaimId} onBack={() => setCurrentScreen('claims')} />;
      case 'file-claim': return <FileClaimScreen onBack={() => setCurrentScreen('claims')} />;
      case 'wellness': return <WellnessScreen navigateTo={navigateTo} />;
      case 'profile': return <ProfileScreen navigateTo={navigateTo} />;
      default: return <DashboardScreen navigateTo={navigateTo} />;
    }
  };

  const showNav = !['splash', 'login'].includes(currentScreen);

  return (
    <div className="mobile-container flex flex-col shadow-2xl">
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {showNav && (
        <nav className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 pb-5 sticky bottom-0 z-50">
          <NavButton 
            active={currentScreen === 'dashboard'} 
            onClick={() => navigateTo('dashboard')} 
            icon={<Home size={24} />} 
            label="Home" 
          />
          <NavButton 
            active={currentScreen === 'policies' || currentScreen === 'policy-details'} 
            onClick={() => navigateTo('policies')} 
            icon={<Shield size={24} />} 
            label="Policies" 
          />
          <NavButton 
            active={currentScreen === 'claims' || currentScreen === 'file-claim'} 
            onClick={() => navigateTo('claims')} 
            icon={<FileText size={24} />} 
            label="Claims" 
          />
          <NavButton 
            active={currentScreen === 'wellness'} 
            onClick={() => navigateTo('wellness')} 
            icon={<Activity size={24} />} 
            label="Wellness" 
          />
          <NavButton 
            active={currentScreen === 'profile'} 
            onClick={() => navigateTo('profile')} 
            icon={<UserIcon size={24} />} 
            label="Profile" 
          />
        </nav>
      )}
    </div>
  );
}

// --- Components ---

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-blue-600' : 'text-gray-400'}`}
    >
      <div className={`p-1 rounded-lg ${active ? 'bg-blue-50' : 'transparent'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

// --- Screens ---

function SplashScreen() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-primary-900 text-white p-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-gold-500 rounded-3xl flex items-center justify-center shadow-2xl mb-4 mx-auto">
          <Shield size={48} className="text-primary-900" />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter mb-2">GOQii QIC</h1>
        <p className="text-blue-200 uppercase tracking-widest text-xs font-medium">Wellness & Insurance</p>
      </motion.div>
      <div className="absolute bottom-12 w-full px-12">
        <div className="h-1 bg-primary-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-full bg-gold-500"
          />
        </div>
        <p className="mt-4 text-blue-300 text-xs font-medium">Securing your financial future...</p>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="h-full p-8 flex flex-col pt-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500">Sign in to manage your protection</p>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5 ml-1">Email or Mobile</label>
          <input 
            type="text" 
            placeholder="alexandra@nexus.com" 
            className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1.5 ml-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
          />
        </div>
        <div className="flex justify-end">
          <button className="text-blue-600 text-sm font-semibold">Forgot Password?</button>
        </div>
      </div>

      <button 
        onClick={onLogin}
        className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
      >
        Sign In
        <ArrowRight size={20} />
      </button>

      <div className="mt-8 flex items-center gap-4 text-gray-400">
        <div className="h-px flex-1 bg-gray-100"></div>
        <span className="text-xs font-medium">Or continue with</span>
        <div className="h-px flex-1 bg-gray-100"></div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <button className="h-14 border border-gray-200 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">f</div>
          <span className="text-sm font-semibold">Facebook</span>
        </button>
        <button className="h-14 border border-gray-200 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">G</div>
          <span className="text-sm font-semibold">Google</span>
        </button>
      </div>

      <div className="mt-auto pb-8 text-center">
        <p className="text-sm text-gray-500">
          New to GOQii QIC? <button className="text-blue-600 font-bold">Apply Now</button>
        </p>
      </div>
    </div>
  );
}

function DashboardScreen({ navigateTo }: { navigateTo: (s: Screen) => void }) {
  return (
    <div className="pb-8">
      {/* Header */}
      <header className="p-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img 
              src={MOCK_USER.avatar} 
              alt="Avatar" 
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white shadow-md"
            />
            <div>
              <p className="text-xs text-gray-500 font-medium tracking-wide">Hello,</p>
              <h3 className="font-bold text-gray-900">{MOCK_USER.name}</h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
              <PhoneCall size={20} />
            </button>
            <button className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-blue-50"></span>
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          <div className="min-w-[280px] bg-primary-900 rounded-3xl p-6 text-white relative overflow-hidden snap-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Active Coverage</p>
              <h4 className="text-2xl font-bold mb-4">$825,000</h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-blue-300 mb-1">Active Policies</p>
                  <p className="text-lg font-bold">04</p>
                </div>
                <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-bold">
                  <TrendingUp size={12} className="text-green-400" />
                  +12.5%
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-[280px] bg-gold-500 rounded-3xl p-6 text-white relative overflow-hidden snap-center">
             <div className="relative z-10">
              <p className="text-yellow-100 text-xs font-semibold uppercase tracking-wider mb-1">Wellness Points</p>
              <h4 className="text-2xl font-bold mb-4">4,250</h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-yellow-100 mb-1">Current Streak</p>
                  <p className="text-lg font-bold">12 Days</p>
                </div>
                <button className="bg-white/20 px-3 py-1.5 rounded-full text-[10px] font-bold">Redeem</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <section className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Quick Actions</h3>
          <button className="text-blue-600 text-xs font-bold px-2 py-1 bg-blue-50 rounded-lg">View All</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <ActionItem icon={<Plus size={24} />} color="bg-rose-500 text-white shadow-lg shadow-rose-200" label="SOS" onClick={() => {}} />
          <ActionItem icon={<Shield size={24} />} color="bg-white text-blue-600 border border-gray-100 shadow-sm" label="Claim" onClick={() => navigateTo('file-claim')} />
          <ActionItem icon={<CreditCard size={24} />} color="bg-white text-purple-600 border border-gray-100 shadow-sm" label="Pay" onClick={() => {}} />
          <ActionItem icon={<MapPin size={24} />} color="bg-white text-green-600 border border-gray-100 shadow-sm" label="Find" onClick={() => {}} />
        </div>
      </section>

      {/* Insurance Products */}
      <section className="px-6 py-6">
        <h3 className="font-bold text-gray-900 mb-4">Our Products</h3>
        <div className="grid grid-cols-2 gap-4">
          <ProductCard 
            icon={<Car size={24} />} 
            title="Motor" 
            desc="Vehicle dynamic protection" 
            className="bg-slate-50"
            onClick={() => navigateTo('policies')}
          />
          <ProductCard 
            icon={<Heart size={24} />} 
            title="Health" 
            desc="Family medical cover" 
            className="bg-rose-50"
            onClick={() => navigateTo('policies')}
          />
          <ProductCard 
            icon={<Plane size={24} />} 
            title="Travel" 
            desc="Global trip security" 
            className="bg-sky-50"
            onClick={() => navigateTo('policies')}
          />
          <ProductCard 
            icon={<HomeIcon size={24} />} 
            title="Home" 
            desc="Property & contents" 
            className="bg-amber-50"
            onClick={() => navigateTo('policies')}
          />
        </div>
      </section>

      {/* Wellness Insight */}
      <section className="px-6 mt-2">
        <div className="bg-slate-900 rounded-3xl p-6 text-white flex items-center justify-between">
          <div>
            <h4 className="font-bold mb-1">Wellness Pulse</h4>
            <p className="text-gray-400 text-xs mb-4">You're 2,100 steps away from goals</p>
            <button 
              onClick={() => navigateTo('wellness')}
              className="px-4 py-2 bg-blue-600 rounded-xl text-xs font-bold"
            >
              Check Hub
            </button>
          </div>
          <div className="w-20 h-20 relative">
             <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
             <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent -rotate-45"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-lg font-bold">78%</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionItem({ icon, color, label, onClick }: { icon: React.ReactNode, color: string, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} transition-transform group-active:scale-95`}>
        {icon}
      </div>
      <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tighter">{label}</span>
    </button>
  );
}

function ProductCard({ icon, title, desc, className, onClick }: { icon: React.ReactNode, title: string, desc: string, className: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`${className} p-5 rounded-3xl text-left flex flex-col gap-4 border border-white hover:border-blue-200 transition-all`}
    >
      <div className="p-3 bg-white w-fit rounded-xl shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-sm text-gray-900">{title}</h4>
        <p className="text-[10px] text-gray-500 leading-tight">{desc}</p>
      </div>
    </button>
  );
}

function PoliciesScreen({ navigateTo, setSelectedPolicyId }: { navigateTo: (s: Screen) => void, setSelectedPolicyId: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<'Active' | 'Under Review' | 'Expired'>('Active');

  return (
    <div className="pb-8">
      <header className="p-6 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Policies</h2>
        <div className="flex bg-gray-100 p-1.5 rounded-2xl">
          {(['Active', 'Review', 'History'] as const).map(tab => (
            <button 
              key={tab}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${tab === 'Active' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="px-6 space-y-4">
        {MOCK_POLICIES.map((policy) => (
          <div 
            key={policy.id} 
            onClick={() => {
              setSelectedPolicyId(policy.id);
              navigateTo('policy-details');
            }}
            className="p-5 border border-gray-100 rounded-3xl hover:border-blue-200 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${
                  policy.type === 'Health' ? 'bg-rose-50 text-rose-600' : 
                  policy.type === 'Motor' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {policy.type === 'Health' ? <Heart size={20} /> : policy.type === 'Motor' ? <Car size={20} /> : <HomeIcon size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{policy.type} Insurance</h4>
                  <p className="text-xs text-gray-500 font-mono">{policy.policyNumber}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                policy.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {policy.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Total Coverage</p>
                <p className="text-sm font-bold text-gray-900">${policy.coverage.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Expires On</p>
                <p className="text-sm font-bold text-gray-900">{policy.expiryDate}</p>
              </div>
            </div>
          </div>
        ))}

        <button className="w-full py-5 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center gap-2 text-gray-400 font-bold hover:border-blue-400 hover:text-blue-500 transition-colors">
          <Plus size={20} />
          New Policy
        </button>
      </div>
    </div>
  );
}

function PolicyDetailsScreen({ policyId, onBack }: { policyId: string | null, onBack: () => void }) {
  const policy = MOCK_POLICIES.find(p => p.id === policyId) || MOCK_POLICIES[0];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 pb-12 bg-primary-900 text-white relative">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="p-2 bg-white/10 rounded-xl">
            <ArrowLeft size={20} />
          </button>
          <h3 className="font-bold">Policy Details</h3>
          <button className="p-2 bg-white/10 rounded-xl">
            <Settings size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-900 mb-4 shadow-xl">
             {policy.type === 'Health' ? <Heart size={32} /> : policy.type === 'Motor' ? <Car size={32} /> : <HomeIcon size={32} />}
          </div>
          <h2 className="text-2xl font-bold">{policy.type} Super Protect</h2>
          <p className="font-mono text-blue-300 text-sm mt-1">{policy.policyNumber}</p>
          
          <div className="mt-8 grid grid-cols-2 w-full gap-8 px-4">
            <div>
              <p className="text-[10px] text-blue-200 uppercase font-bold mb-1">Status</p>
              <p className="font-bold flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {policy.status}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-blue-200 uppercase font-bold mb-1">Renewal</p>
              <p className="font-bold">120 Days left</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white -mt-8 rounded-t-[40px] flex-1 p-8 space-y-8">
        <section>
          <h4 className="font-bold text-gray-900 mb-4">Summary</h4>
          <div className="space-y-4">
            <SummaryRow label="Coverage" value={`$${policy.coverage.toLocaleString()}`} />
            <SummaryRow label="Premium" value={`$${policy.premium.toLocaleString()} / year`} />
            <SummaryRow label="Issue Date" value="Jan 12, 2024" />
            <SummaryRow label="Beneficiaries" value="John S, Emily S" />
          </div>
        </section>

        <section>
          <h4 className="font-bold text-gray-900 mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-4">
            <ActionCard icon={<FileText size={20} />} label="View Certificate" />
            <ActionCard icon={<Shield size={20} />} label="File a Claim" />
          </div>
        </section>

        <button className="w-full h-14 bg-primary-600 text-white rounded-2xl font-bold">
          Renew Policy Now
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-gray-500 font-medium">{label}</span>
      <span className="text-sm text-gray-900 font-bold">{value}</span>
    </div>
  );
}

function ActionCard({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-3 items-start hover:border-blue-200 transition-all">
      <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">{icon}</div>
      <span className="text-xs font-bold text-gray-700">{label}</span>
    </button>
  );
}

function ClaimsScreen({ navigateTo, setSelectedClaimId }: { navigateTo: (s: Screen) => void, setSelectedClaimId: (id: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Status');

  const filteredClaims = MOCK_CLAIMS.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          claim.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          claim.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All Status' || claim.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const summaryStats = [
    { label: 'Total Claims', value: MOCK_CLAIMS.length, color: 'bg-primary-600' },
    { label: 'Submitted', value: MOCK_CLAIMS.filter(c => c.status === 'Submitted').length, color: 'bg-orange-500' },
    { label: 'Under Review', value: MOCK_CLAIMS.filter(c => c.status === 'Under Review').length, color: 'bg-amber-500' },
    { label: 'Approved', value: MOCK_CLAIMS.filter(c => c.status === 'Approved').length, color: 'bg-green-500' },
    { label: 'Paid', value: MOCK_CLAIMS.filter(c => c.status === 'Paid').length, color: 'bg-emerald-600' },
  ];

  return (
    <div className="pb-8">
      {/* Top Nav Bar */}
      <header className="p-6 sticky top-0 bg-white/90 backdrop-blur-md z-20 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('dashboard')} className="p-2 bg-gray-50 rounded-xl">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-display">GOQii QIC Claims Management</h2>
              <p className="text-[10px] text-gray-400 font-medium tracking-tight">Track and manage your insurance claims</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-50 rounded-xl text-gray-600"><PhoneCall size={18} /></button>
            <button className="p-2 bg-gray-50 rounded-xl text-gray-600"><Bell size={18} /></button>
            <button className="p-2 bg-gray-50 rounded-xl text-gray-600"><Settings size={18} /></button>
          </div>
        </div>
        <button 
          onClick={() => navigateTo('file-claim')}
          className="w-full h-12 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
        >
          <Plus size={20} />
          File New Claim
        </button>
      </header>

      {/* Summary Cards */}
      <section className="px-6 py-6 overflow-x-auto hide-scrollbar flex gap-4 snap-x">
        {summaryStats.map((stat, i) => (
          <div key={i} className={`min-w-[140px] ${stat.color} p-5 rounded-3xl text-white snap-center shadow-lg shadow-black/5`}>
            <h4 className="text-2xl font-bold mb-1">{stat.value}</h4>
            <p className="text-[10px] font-bold opacity-90 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Search & Filter */}
      <section className="px-6 pb-6">
        <div className="flex gap-3">
          <div className="flex-1 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
            <Search size={18} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search claims by ID or type..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full font-medium"
            />
          </div>
          <div className="relative group">
            <button className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter size={18} />
            </button>
            <div className="absolute right-0 top-14 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden z-30 opacity-0 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all">
              {['All Status', 'Submitted', 'Under Review', 'Approved', 'Paid', 'Rejected'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`w-full px-5 py-3 text-left text-xs font-bold hover:bg-blue-50 transition-colors ${activeFilter === filter ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Claims Listing */}
      <section className="px-6 space-y-4">
        {filteredClaims.length > 0 ? (
          filteredClaims.map((claim) => (
            <div 
              key={claim.id} 
              onClick={() => {
                setSelectedClaimId(claim.id);
                navigateTo('claim-details');
              }}
              className="p-5 bg-white border border-gray-100 rounded-[32px] hover:border-blue-200 shadow-sm transition-all active:scale-[0.99] group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 font-mono tracking-wider mb-1 uppercase">Claim #{claim.id}</h4>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{claim.type} Insurance - {claim.category}</h3>
                  <p className="text-[10px] text-gray-400 font-medium uppercase mt-1">Submitted {claim.date}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  claim.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
                  claim.status === 'Approved' ? 'bg-green-50 text-green-600' :
                  claim.status === 'Under Review' ? 'bg-amber-50 text-amber-600' :
                  claim.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {claim.status}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Claim Amount</p>
                  <p className="text-lg font-bold text-gray-900 font-mono">AED {claim.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Progress</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-600 font-mono">{claim.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${claim.progress}%` }}
                  className={`h-full ${claim.status === 'Rejected' ? 'bg-red-500' : 'bg-blue-600'}`}
                />
              </div>

              <div className="flex justify-between items-center px-1">
                {['Received', 'Review', 'Approved', 'Paid'].map((stage, i) => {
                  const isActive = (i === 0 && claim.timeline.received) || 
                                   (i === 1 && claim.timeline.review) || 
                                   (i === 2 && claim.timeline.approved) || 
                                   (i === 3 && claim.timeline.paid);
                  return (
                    <div key={stage} className="flex flex-col items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full border-2 ${isActive ? 'bg-blue-600 border-blue-100 scale-125' : 'bg-gray-100 border-transparent'}`}></div>
                      <span className={`text-[8px] font-bold uppercase ${isActive ? 'text-blue-600' : 'text-gray-300'}`}>{stage}</span>
                    </div>
                  );
                })}
              </div>

              {claim.description && (
                <div className="mt-5 p-3 bg-blue-50 rounded-2xl border border-blue-100/30">
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                    <span className="text-blue-600 font-bold mr-1 italic underline">Message:</span> {claim.description}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center px-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
              <FileText size={40} />
            </div>
            <h4 className="text-lg font-bold text-gray-900">No claims found</h4>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or file a new claim for assistance.</p>
            <button 
              onClick={() => navigateTo('file-claim')}
              className="mt-6 px-8 py-3 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20"
            >
              File New Claim
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function ClaimDetailsScreen({ claimId, onBack }: { claimId: string | null, onBack: () => void }) {
  const claim = MOCK_CLAIMS.find(c => c.id === claimId) || MOCK_CLAIMS[0];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="p-6 bg-white flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-gray-50 rounded-xl">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Claim Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600"><Share2 size={20} /></button>
          <button className="p-2 text-gray-600"><Settings size={20} /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section className="p-6 bg-white rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 font-mono">Claim #{claim.id}</p>
              <h3 className="text-xl font-bold text-gray-900">{claim.type} Super Protect</h3>
              <p className="text-xs text-gray-500 font-medium mt-1">{claim.category}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
              claim.status === 'Paid' ? 'bg-emerald-50 text-emerald-600' :
              claim.status === 'Approved' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {claim.status}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 py-6 border-t border-gray-50">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Claim Amount</p>
              <p className="text-xl font-bold text-gray-900 font-mono">AED {claim.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Submission Date</p>
              <p className="text-sm font-bold text-gray-900">{claim.date}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-50">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-4 tracking-wider">Visual Progress Tracker</p>
            <div className="flex justify-between relative px-2">
              <div className="absolute top-3.5 left-8 right-8 h-0.5 bg-gray-100 z-0"></div>
              {['Received', 'Review', 'Approved', 'Paid'].map((stage, i) => {
                const isActive = (i === 0 && claim.timeline.received) || 
                                 (i === 1 && claim.timeline.review) || 
                                 (i === 2 && claim.timeline.approved) || 
                                 (i === 3 && claim.timeline.paid);
                return (
                  <div key={stage} className="flex flex-col items-center gap-3 z-10">
                    <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all ${isActive ? 'bg-blue-600 border-blue-100 shadow-lg scale-110' : 'bg-white border-gray-50 shadow-sm'}`}>
                      {isActive && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-tight ${isActive ? 'text-primary-600' : 'text-gray-300'}`}>{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-sm font-bold text-gray-900 mb-4 px-2 tracking-wide uppercase">Uploaded Documents</h4>
          <div className="grid grid-cols-2 gap-4">
            <DocumentItem icon={<FileText size={20} />} label="Incident_Report.pdf" size="1.2 MB" />
            <DocumentItem icon={<CreditCard size={20} />} label="Medical_Bill_01.jpg" size="4.8 MB" />
          </div>
        </section>

        <section className="p-6 bg-slate-900 rounded-[32px] text-white">
          <h4 className="font-bold mb-1">Need Assistance?</h4>
          <p className="text-gray-400 text-xs mb-6">Our dedicated claims advisor is ready to help you with this case.</p>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex-1 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all">
              <PhoneCall size={16} /> Contact Advisor
            </button>
            <button className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all">
              <ArrowUpRight size={16} /> Live Chat
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function DocumentItem({ icon, label, size }: { icon: React.ReactNode, label: string, size: string }) {
  return (
    <div className="p-4 bg-white border border-gray-100 rounded-2xl flex flex-col gap-3 shadow-sm group hover:border-blue-200 transition-all">
      <div className="p-2 bg-gray-50 rounded-lg text-blue-600 w-fit group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-800 truncate mb-1">{label}</p>
        <p className="text-[9px] text-gray-400 font-bold uppercase">{size}</p>
      </div>
      <button className="mt-1 flex items-center gap-2 text-blue-600 text-[10px] font-bold">
        <Download size={14} /> Download
      </button>
    </div>
  );
}

function FileClaimScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [selectedIncident, setSelectedIncident] = useState('Accident');

  return (
    <div className="h-full flex flex-col bg-white">
      <header className="p-6 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-gray-50 rounded-xl"><X size={20} className="text-gray-600" /></button>
          <h3 className="font-bold text-gray-900">File New Claim</h3>
        </div>
        <div className="px-3 py-1 bg-blue-50 rounded-lg text-blue-600 text-xs font-bold">
          Step {step}/5
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Select Policy</h4>
                  <p className="text-sm text-gray-500">Which policy would you like to file a claim for?</p>
                </div>
                <div className="space-y-3">
                  {MOCK_POLICIES.map(p => (
                    <button key={p.id} className="w-full p-5 bg-white border border-gray-100 rounded-3xl flex items-center justify-between hover:border-blue-200 hover:bg-blue-50/10 transition-all text-left group">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-50 rounded-2xl text-primary-900 group-hover:bg-white group-hover:shadow-sm">
                           {p.type === 'Health' ? <Heart size={20} /> : p.type === 'Motor' ? <Car size={20} /> : <HomeIcon size={20} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{p.type} Protect</p>
                          <p className="text-xs text-gray-400 font-mono">#{p.policyNumber}</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <CheckCircle2 size={12} className="opacity-0 group-hover:opacity-100" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Incident Type</h4>
                  <p className="text-sm text-gray-500">Help us categorize your claim for faster processing.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <IncidentType icon={<Car size={28} />} label="Accident" active={selectedIncident === 'Accident'} onClick={() => setSelectedIncident('Accident')} />
                   <IncidentType icon={<Shield size={28} />} label="Theft" active={selectedIncident === 'Theft'} onClick={() => setSelectedIncident('Theft')} />
                   <IncidentType icon={<Heart size={28} />} label="Medical" active={selectedIncident === 'Medical'} onClick={() => setSelectedIncident('Medical')} />
                   <IncidentType icon={<AlertCircle size={28} />} label="Damage" active={selectedIncident === 'Damage'} onClick={() => setSelectedIncident('Damage')} />
                   <IncidentType icon={<X size={28} />} label="Cancellation" active={selectedIncident === 'Cancellation'} onClick={() => setSelectedIncident('Cancellation')} />
                   <IncidentType icon={<Plus size={28} />} label="Other" active={selectedIncident === 'Other'} onClick={() => setSelectedIncident('Other')} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Claim Details</h4>
                  <p className="text-sm text-gray-500">Provide specific information about the incident.</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Date" placeholder="Select Date" icon={<Clock size={18} />} />
                    <FormInput label="Time" placeholder="Select Time" icon={<Clock size={18} />} />
                  </div>
                  <FormInput label="Location" placeholder="Enter location or auto-detect" icon={<MapPin size={18} />} />
                  <FormInput label="Estimated Damage" placeholder="AED 0.00" icon={<TrendingUp size={18} />} />
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block ml-1">Incident Description</label>
                    <textarea 
                      rows={5} 
                      placeholder="Describe the incident in detail..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-[28px] p-5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium"
                    ></textarea>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Upload Evidence</h4>
                  <p className="text-sm text-gray-500">Photos, videos, and documents help speed up your claim.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                   <UploadZone label="Capture Photo/Video" desc="Open camera to capture incident" icon={<Car size={24} />} />
                   <UploadZone label="Upload from Gallery" desc="Select files from your device" icon={<Plus size={24} />} />
                   <UploadZone label="Scan Document" desc="Medical bills, reports, or police report" icon={<FileText size={24} />} />
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center py-12 px-6">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-8 shadow-inner shadow-green-100">
                  <CheckCircle2 size={48} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Submit?</h4>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                  By submitting, you agree to Nexus terms of service. An advisor will review your case and update you within 24 hours.
                </p>
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 text-left mb-8">
                  <p className="text-[10px] text-gray-400 font-bold uppercase mb-4">Review Summary</p>
                  <SummaryRow label="Policy" value="Motor Protect #POL-MT-7721" />
                  <SummaryRow label="Category" value={selectedIncident} />
                  <SummaryRow label="Location" value="Dubai Marina, UAE" />
                  <SummaryRow label="Evidence" value="03 Files Attached" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className="p-6 pt-2 bg-white border-t border-gray-100">
        <div className="flex gap-4">
          {step > 1 && step < 5 && (
            <button 
              onClick={() => setStep(s => s - 1)}
              className="h-14 w-20 bg-gray-50 text-gray-600 rounded-2xl font-bold flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button 
            onClick={() => step < 5 ? setStep(s => s + 1) : onBack()}
            className="flex-1 h-14 bg-primary-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform"
          >
            {step < 5 ? 'Continue' : 'Submit Claim'}
          </button>
        </div>
      </footer>
    </div>
  );
}

function FormInput({ label, placeholder, icon }: { label: string, placeholder: string, icon: React.ReactNode }) {
  return (
    <div className="space-y-1.5 focus-within:z-10">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center px-4 gap-4 focus-within:ring-2 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
        <div className="text-gray-400">{icon}</div>
        <input 
          type="text" 
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm w-full font-medium text-gray-800 placeholder:text-gray-300"
        />
      </div>
    </div>
  );
}

function UploadZone({ label, desc, icon }: { label: string, desc: string, icon: React.ReactNode }) {
  return (
    <button className="p-6 border-2 border-dashed border-gray-100 rounded-3xl flex items-center gap-5 text-left hover:border-blue-500 hover:bg-blue-50/30 transition-all group active:scale-[0.98]">
      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-blue-600 group-hover:shadow-sm transition-all">
        {icon}
      </div>
      <div>
        <h5 className="font-bold text-gray-900 mb-1">{label}</h5>
        <p className="text-[10px] text-gray-400 font-medium">{desc}</p>
      </div>
    </button>
  );
}

function IncidentType({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-6 rounded-[32px] border flex flex-col items-center gap-3 transition-all ${active ? 'border-blue-500 bg-blue-50 shadow-inner' : 'border-gray-50 bg-gray-50/50 hover:border-blue-200'}`}
    >
      <div className={`transition-transform duration-300 ${active ? 'text-blue-600 scale-110' : 'text-gray-300'}`}>{icon}</div>
      <span className={`text-[11px] font-bold uppercase tracking-tight ${active ? 'text-blue-700' : 'text-gray-400'}`}>{label}</span>
    </button>
  );
}

function WellnessScreen({ navigateTo }: { navigateTo: (s: Screen) => void }) {
  return (
    <div className="pb-8">
      <header className="p-6 bg-slate-900 text-white pb-12">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold">Wellness Hub</h2>
           <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
             <div className="w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">
               <Shield size={12} className="text-primary-900" />
             </div>
             <span className="text-xs font-bold">{MOCK_USER.points.toLocaleString()}</span>
           </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1">Weekly Streak</p>
              <h4 className="text-2xl font-bold">12 Days 🔥</h4>
            </div>
            <div className="text-right">
              <p className="text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-1">Global Rank</p>
              <h4 className="text-xl font-bold font-mono">#1,204</h4>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold ${i < 5 ? 'bg-blue-600 text-white' : 'bg-white/10 text-white'}`}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
      
      <div className="px-6 -mt-8 space-y-6">
        <section className="grid grid-cols-2 gap-4">
          <WellnessAction icon={<Activity size={24} />} color="text-green-600 bg-green-50" label="Book Session" />
          <WellnessAction icon={<PhoneCall size={24} />} color="text-rose-600 bg-rose-50" label="Teleconsult" />
          <WellnessAction icon={<Heart size={24} />} color="text-sky-600 bg-sky-50" label="Pharmacy" />
          <WellnessAction icon={<CheckCircle2 size={24} />} color="text-purple-600 bg-purple-50" label="Records" />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">Daily Challenges</h3>
            <span className="text-blue-600 text-xs font-bold tracking-tight">Earn 500+ XP</span>
          </div>
          <div className="space-y-3">
            {MOCK_CHALLENGES.map(challenge => (
               <div key={challenge.id} className="p-4 bg-white border border-gray-100 rounded-3xl shadow-sm">
                 <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${challenge.type === 'Steps' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                        {challenge.type === 'Steps' ? <Activity size={18} /> : <Heart size={18} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{challenge.title}</h4>
                        <p className="text-[10px] text-gray-500 font-medium">Goal: {challenge.goal}</p>
                      </div>
                   </div>
                   <div className="text-right">
                     <span className="text-[10px] font-bold text-orange-600">+{challenge.reward} Pts</span>
                   </div>
                 </div>
                 <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${(challenge.progress / 10000) * 100}%` }}></div>
                 </div>
               </div>
            ))}
          </div>
        </section>

        <section className="bg-primary-900 rounded-[40px] p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-2 font-display">GOQii QIC Premier</h3>
            <p className="text-blue-200 text-sm mb-6">Upgrade to unlock advanced bio-tracking and 0% deductible claims.</p>
            <button className="w-full h-14 bg-gold-500 text-primary-900 font-bold rounded-2xl shadow-xl shadow-gold-500/20">
              Upgrade Now
            </button>
        </section>
      </div>
    </div>
  );
}

function WellnessAction({ icon, color, label }: { icon: React.ReactNode, color: string, label: string }) {
  return (
    <button className="bg-white border border-gray-100 p-5 rounded-3xl flex flex-col gap-4 shadow-sm hover:border-blue-100 transition-all">
      <div className={`p-3 rounded-2xl w-fit ${color}`}>
        {icon}
      </div>
      <span className="text-xs font-bold text-gray-900">{label}</span>
    </button>
  );
}

function ProfileScreen({ navigateTo }: { navigateTo: (s: Screen) => void }) {
  return (
    <div className="pb-8">
      <header className="p-8 pb-4 flex flex-col items-center text-center">
        <div className="relative mb-4">
           <img 
            src={MOCK_USER.avatar} 
            alt="User" 
            className="w-24 h-24 rounded-[40px] object-cover ring-4 ring-blue-50 shadow-2xl"
          />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 border-4 border-white rounded-full flex items-center justify-center text-white">
            <CheckCircle2 size={12} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{MOCK_USER.name}</h2>
        <p className="text-sm text-gray-500 font-medium">Premium Member since 2021</p>
      </header>

      <div className="px-6 space-y-6">
        <section className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-3xl text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Expences</p>
            <p className="text-lg font-bold text-rose-600">$4.2k</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-3xl text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Savings</p>
            <p className="text-lg font-bold text-green-600">$1.1k</p>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 mb-3">General</h3>
          <ProfileLink icon={<UserIcon size={20} />} label="Personal Information" />
          <ProfileLink icon={<CreditCard size={20} />} label="Payment Methods" />
          <ProfileLink icon={<Bell size={20} />} label="Notifications" badge="3" />
          <ProfileLink icon={<Shield size={20} />} label="Security & Biometry" />
        </section>

        <section className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4 mb-3">Support</h3>
          <ProfileLink icon={<PhoneCall size={20} />} label="Help Center" />
          <ProfileLink icon={<FileText size={20} />} label="Privacy Policy" />
        </section>

        <button 
          onClick={() => navigateTo('login')}
          className="w-full h-16 border border-red-100 bg-red-50 text-red-600 rounded-[30px] font-bold flex items-center justify-center gap-2 mt-8"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

function ProfileLink({ icon, label, badge }: { icon: React.ReactNode, label: string, badge?: string }) {
  return (
    <button className="w-full flex items-center justify-between p-4 bg-white border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
          {icon}
        </div>
        <span className="text-sm font-bold text-gray-800">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>
        )}
        <ChevronRight size={18} className="text-gray-300" />
      </div>
    </button>
  );
}
