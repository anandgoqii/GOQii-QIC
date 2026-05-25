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
  Share2,
  Sun,
  Moon,
  Zap,
  Award,
  Sparkles,
  MessageSquare,
  Check,
  Lock,
  Compass,
  FileCheck,
  Droplet,
  Smartphone,
  Eye,
  Key,
  Fingerprint
} from 'lucide-react';
import { Screen, Claim } from './types';
import { MOCK_USER, MOCK_POLICIES, MOCK_CLAIMS, MOCK_CHALLENGES } from './constants';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('light');
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-routing timer for Splash Screen
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

  const triggerConfetti = (message?: string) => {
    if (message) {
      setToastMessage(message);
      setTimeout(() => setToastMessage(null), 4000);
    }
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
    showToast(`Switched to Premium ${themeMode === 'dark' ? 'Light' : 'Dark'} Elegance`);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': 
        return <SplashScreen themeMode={themeMode} />;
      case 'login': 
        return <LoginScreen onLogin={() => {
          showToast("Biometric verification successful. Gained access.");
          setCurrentScreen('dashboard');
        }} themeMode={themeMode} />;
      case 'dashboard': 
        return <DashboardScreen navigateTo={navigateTo} themeMode={themeMode} toggleTheme={toggleTheme} triggerConfetti={triggerConfetti} showToast={showToast} />;
      case 'policies': 
        return <PoliciesScreen navigateTo={navigateTo} setSelectedPolicyId={setSelectedPolicyId} themeMode={themeMode} />;
      case 'policy-details': 
        return <PolicyDetailsScreen policyId={selectedPolicyId} onBack={() => setCurrentScreen('policies')} themeMode={themeMode} showToast={showToast} />;
      case 'claims': 
        return <ClaimsScreen navigateTo={navigateTo} setSelectedClaimId={setSelectedClaimId} themeMode={themeMode} />;
      case 'claim-details': 
        return <ClaimDetailsScreen claimId={selectedClaimId} onBack={() => setCurrentScreen('claims')} themeMode={themeMode} showToast={showToast} />;
      case 'file-claim': 
        return <FileClaimScreen onBack={() => setCurrentScreen('claims')} themeMode={themeMode} triggerConfetti={triggerConfetti} />;
      case 'wellness': 
        return <WellnessScreen navigateTo={navigateTo} themeMode={themeMode} triggerConfetti={triggerConfetti} />;
      case 'profile': 
        return <ProfileScreen navigateTo={navigateTo} themeMode={themeMode} triggerConfetti={triggerConfetti} showToast={showToast} toggleTheme={toggleTheme} />;
      default: 
        return <DashboardScreen navigateTo={navigateTo} themeMode={themeMode} toggleTheme={toggleTheme} triggerConfetti={triggerConfetti} showToast={showToast} />;
    }
  };

  const showNav = !['splash', 'login'].includes(currentScreen);

  return (
    <div className={`mobile-container flex flex-col font-sans transition-colors duration-500 shadow-2xl relative ${
      themeMode === 'dark' 
        ? 'bg-[#090D1A] text-[#E2E8F0]' 
        : 'bg-[#F4F6FC] text-[#1E293B]'
    }`}>
      
      {/* Toast Alert System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute left-6 right-6 top-4 z-[99] p-4 rounded-2xl glass-panel shadow-2xl flex items-center gap-3 border border-emerald-500/30"
            style={{ 
              background: themeMode === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              color: themeMode === 'dark' ? '#F8FAFC' : '#0F172A'
            }}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Sparkles size={16} />
            </div>
            <p className="text-xs font-bold font-sans flex-1">{toastMessage}</p>
            <button onClick={() => setToastMessage(null)} className="opacity-60 hover:opacity-100">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Animation Layer */}
      {showConfetti && (
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-[80] overflow-hidden">
          {[...Array(50)].map((_, i) => {
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const size = Math.random() * 8 + 6;
            const colors = ['#F4B400', '#2F80FF', '#1DB954', '#FF4D67', '#A855F7'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <motion.div
                key={i}
                initial={{ y: -20, x: `${left}%`, opacity: 1, rotate: 0 }}
                animate={{ 
                  y: '100vh', 
                  x: `${left + (Math.random() * 20 - 10)}%`, 
                  opacity: 0,
                  rotate: Math.random() * 360 
                }}
                transition={{ duration: Math.random() * 2 + 2, delay: delay, ease: "linear" }}
                className="absolute rounded-sm"
                style={{
                  width: `${size}px`,
                  height: `${size * 1.5}px`,
                  backgroundColor: color,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Primary Container View */}
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-full flex flex-col justify-between"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Bottom Floating Navigation Dock */}
      {showNav && (
        <div className="px-6 py-4 sticky bottom-0 z-50 pointer-events-none">
          <nav className={`h-16 rounded-[28px] pointer-events-auto flex items-center justify-around px-3 shadow-2xl transition-all duration-300 border ${
            themeMode === 'dark' 
              ? 'bg-[#111827]/85 backdrop-blur-xl border-white/10 shadow-black/50' 
              : 'bg-white/85 backdrop-blur-xl border-black/5 shadow-blue-900/10'
          }`}>
            <NavButton 
              active={currentScreen === 'dashboard'} 
              onClick={() => navigateTo('dashboard')} 
              icon={<Home size={20} />} 
              label="Home" 
              themeMode={themeMode}
            />
            <NavButton 
              active={currentScreen === 'policies' || currentScreen === 'policy-details'} 
              onClick={() => navigateTo('policies')} 
              icon={<Shield size={20} />} 
              label="Policies" 
              themeMode={themeMode}
            />
            <NavButton 
              active={currentScreen === 'claims' || currentScreen === 'file-claim' || currentScreen === 'claim-details'} 
              onClick={() => navigateTo('claims')} 
              icon={<FileText size={20} />} 
              label="Claims" 
              themeMode={themeMode}
            />
            <NavButton 
              active={currentScreen === 'wellness'} 
              onClick={() => navigateTo('wellness')} 
              icon={<Activity size={20} />} 
              label="Wellness" 
              themeMode={themeMode}
            />
            <NavButton 
              active={currentScreen === 'profile'} 
              onClick={() => navigateTo('profile')} 
              icon={<UserIcon size={20} />} 
              label="Profile" 
              themeMode={themeMode}
            />
          </nav>
        </div>
      )}
    </div>
  );
}

// NavButton wrapper with glowing state indicator
function NavButton({ active, onClick, icon, label, themeMode }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, themeMode: 'dark' | 'light' }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-300 relative px-3 py-1.5 rounded-2xl ${
        active 
          ? 'scale-105 font-bold' 
          : 'opacity-65 hover:opacity-100'
      }`}
      style={{
        color: active 
          ? (themeMode === 'dark' ? '#F4B400' : '#0B57D0') 
          : (themeMode === 'dark' ? '#94A3B8' : '#64748B')
      }}
    >
      {active && (
        <motion.div 
          layoutId="activeGlow"
          className={`absolute inset-0 rounded-[20px] -z-10 ${
            themeMode === 'dark' ? 'bg-white/5 border border-white/5' : 'bg-blue-50/70 border border-blue-500/10'
          }`}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className="relative">
        {icon}
        {active && (
          <span className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${themeMode === 'dark' ? 'bg-gold-500' : 'bg-primary-600'}`}></span>
        )}
      </div>
      <span className="text-[10px] tracking-tight font-medium uppercase font-display">{label}</span>
    </button>
  );
}

// --- Screens ---

function SplashScreen({ themeMode }: { themeMode: 'dark' | 'light' }) {
  const isDark = themeMode === 'dark';
  return (
    <div className={`h-screen w-full flex flex-col items-center justify-between p-8 relative overflow-hidden transition-all duration-500 ${
      isDark
        ? 'bg-gradient-to-b from-[#062D7A] via-[#090D1A] to-[#0F172A] text-white'
        : 'bg-[#F4F6FC] hover:bg-[#F0F2FB] text-slate-900'
    }`}>
      {/* Background ambient lighting effects */}
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl transition-all duration-500 ${
        isDark ? 'bg-blue-500/10' : 'bg-blue-600/10'
      }`}></div>
      <div className={`absolute bottom-1/4 left-1/3 w-60 h-60 rounded-full blur-3xl transition-all duration-500 ${
        isDark ? 'bg-gold-500/5' : 'bg-gold-500/10'
      }`}></div>

      <div className="my-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Layered luxury icon with gradient pulse */}
          <div className={`w-28 h-28 border-2 rounded-[36px] flex items-center justify-center mb-6 mx-auto relative group shadow-2xl transition-all duration-500 ${
            isDark 
              ? 'bg-gradient-to-tr from-[#0F172A] to-[#1E293B] border-gold-500/30' 
              : 'bg-white border-yellow-400/55'
          }`}>
            <Shield size={56} className="text-[#F4B400] drop-shadow-[0_2px_10px_rgba(244,180,0,0.4)]" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className={`absolute inset-0 rounded-[36px] border border-dashed m-1 ${
                isDark ? 'border-[#F4B400]/40' : 'border-[#0B57D0]/40'
              }`}
            />
          </div>
          
          <div className="flex items-center justify-center gap-3.5 mb-2.5">
            <img 
              src="https://appcdn.goqii.com/storeimg/12826_1779703474.png" 
              alt="GOQii" 
              className="h-10 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className={`text-4xl font-extrabold tracking-tighter bg-[#0B1F47] bg-clip-text text-transparent ${
              isDark 
                ? 'bg-gradient-to-r from-white to-[#F4B400]' 
                : 'bg-gradient-to-r from-[#0052CC] to-[#5B8CFF]'
            }`}>
              QIC
            </span>
          </div>
          <p className={`uppercase tracking-widest text-xs font-semibold ${
            isDark ? 'text-[#94A3B8]' : 'text-slate-500 font-display'
          }`}>
            Wellness & Financial Security
          </p>
        </motion.div>
      </div>

      <div className="w-full pb-10">
        <div className={`h-1 w-2/3 mx-auto rounded-full overflow-hidden ${
          isDark ? 'bg-white/10' : 'bg-slate-300'
        }`}>
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-[#F4B400]"
          />
        </div>
        <p className={`mt-4 text-center text-xs font-medium uppercase tracking-widest ${
          isDark ? 'text-[#94A3B8]/60' : 'text-slate-500/60'
        }`}>
          Securing your wellness empire...
        </p>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, themeMode }: { onLogin: () => void, themeMode: 'dark' | 'light' }) {
  const [faceIdStep, setFaceIdStep] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [typedPin, setTypedPin] = useState('');

  const triggerFaceID = () => {
    setFaceIdStep('scanning');
    setTimeout(() => {
      setFaceIdStep('success');
      setTimeout(() => {
        onLogin();
      }, 800);
    }, 1800);
  };

  const handleKeypad = (num: string) => {
    if (typedPin.length < 4) {
      const next = typedPin + num;
      setTypedPin(next);
      if (next.length === 4) {
        setTimeout(() => {
          onLogin();
        }, 300);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8 flex flex-col justify-between relative overflow-hidden bg-[linear-gradient(135deg,#F5F9FF_0%,#EEF5FF_35%,#EAFBF6_100%)] font-sans select-none">
      {/* Ambient background orbs for wellness glow */}
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0052CC]/12 to-[#5B8CFF]/8 blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute top-1/3 right-[-80px] w-96 h-96 rounded-full bg-gradient-to-br from-[#00C389]/10 to-[#DFF7F2]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-30px] w-96 h-96 rounded-full bg-gradient-to-tr from-[#5B8CFF]/8 to-[#00C389]/8 blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col h-full justify-between flex-1">
        
        {/* Header Section */}
        <div className="pt-4 mb-6">
          <div className="flex justify-between items-center">
            {/* Logo with circular gradient and glass effect */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-[#0052CC] to-[#5B8CFF] flex items-center justify-center text-white font-black text-lg shadow-[0_4px_16px_rgba(0,82,204,0.22)] border border-white/45 backdrop-blur-sm">
                Q
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-sm text-[#0B1F47] leading-none">GOQii QIC</span>
                <span className="text-[10px] text-[#5F6C8D] font-bold uppercase tracking-widest mt-0.5">Ecosystem</span>
              </div>
            </div>
            
            {/* Device Secured Chip */}
            <div className="px-3.5 py-1.5 bg-[#E7FFF5] border border-[rgba(0,195,137,0.25)] text-[#00A86B] rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C389] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A86B]"></span>
              </span>
              Secured
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-[28px] md:text-[34px] leading-[1.15] font-black tracking-tight text-[#0B1F47] mb-2 font-sans uppercase">
            Your Wellness <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0052CC] to-[#00C389]">Insurance</span> Ecosystem
          </h2>
          <p className="text-[#5F6C8D] text-xs md:text-sm font-semibold tracking-wide max-w-sm mx-auto md:mx-0">
            Unlock your secure biometric access or enter your secure PIN.
          </p>
        </div>

        {/* Biometric Scan Section */}
        <div className="flex flex-col items-center justify-center py-4 mb-4 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Scanner Pulsing Rings */}
            {faceIdStep === 'scanning' && (
              <>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute w-36 h-36 rounded-full border-2 border-[#00C389]/30"
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0.9 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute w-36 h-36 rounded-full border-2 border-[#0052CC]/30"
                />
              </>
            )}
          </div>

          <button 
            onClick={triggerFaceID}
            className={`w-32 h-32 rounded-full border flex flex-col items-center justify-center relative transition-all duration-500 overflow-hidden shadow-lg ${
              faceIdStep === 'scanning' 
                ? 'border-transparent bg-gradient-to-tr from-[#0052CC]/10 to-[#00C389]/10 scale-105 shadow-[0_0_40px_rgba(0,82,204,0.18)]'
                : faceIdStep === 'success'
                ? 'border-transparent bg-gradient-to-tr from-[#00C389]/15 to-emerald-400/20 scale-100 shadow-[0_0_40px_rgba(0,195,137,0.22)]'
                : 'border-white/60 bg-white/75 backdrop-blur-md hover:bg-white hover:scale-102 hover:shadow-xl active:scale-95'
            }`}
          >
            {faceIdStep === 'scanning' && (
              <motion.div 
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-[#0052CC] to-[#00C389] shadow-[0_0_15px_rgba(0,195,137,0.8)] opacity-80"
                animate={{ y: ['-50%', '350%', '-50%'] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            {faceIdStep === 'idle' && (
              <div className="flex flex-col items-center gap-2">
                <div className="p-3.5 bg-gradient-to-tr from-[#0052CC] to-[#5B8CFF] text-white rounded-full shadow-[0_4px_16px_rgba(0,82,204,0.25)] animate-pulse duration-1000">
                  <Fingerprint size={32} />
                </div>
              </div>
            )}

            {faceIdStep === 'scanning' && (
              <div className="flex flex-col items-center gap-2 text-center text-[#0052CC]">
                <Sparkles size={34} className="animate-spin text-[#00C389] duration-[3000ms]" />
              </div>
            )}

            {faceIdStep === 'success' && (
              <div className="flex flex-col items-center gap-2 text-center text-[#00C389]">
                <div className="p-3 bg-emerald-550 text-white rounded-full shadow-[0_4px_12px_rgba(0,195,137,0.3)] animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
              </div>
            )}
          </button>
          
          <span className="text-[11px] font-black uppercase tracking-widest text-[#0052CC] mt-3 hover:underline cursor-pointer transition-all active:scale-95 flex items-center gap-1.5" onClick={triggerFaceID}>
            Unlock With Face ID <ChevronRight size={14} className="animate-bounce" />
          </span>
        </div>

        {/* Floating AI Protection Active Widget */}
        <div className="mb-6">
          <div className="bg-white/72 backdrop-blur-[18px] border border-white/45 shadow-[0_12px_40px_rgba(0,82,204,0.08)] rounded-[24px] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E7FFF5] border border-[rgba(0,195,137,0.25)] text-[#00A86B] rounded-full flex items-center justify-center relative">
                <Shield size={20} className="animate-pulse" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#00A86B] border border-white rounded-full"></span>
              </div>
              <div className="text-left">
                <h4 className="text-xs font-extrabold text-[#0B1F47] uppercase tracking-wider">AI Protection Active</h4>
                <p className="text-[10px] text-[#5F6C8D] font-bold">Your insurance ecosystem is securely protected.</p>
              </div>
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#00A86B] bg-[#E7FFF5] px-2 py-0.5 rounded-lg border border-[#00C389]/20">Active</span>
          </div>
        </div>

        {/* PIN Indicators Section */}
        <div className="flex flex-col items-center mb-6">
          <span className="text-[9px] font-black uppercase tracking-widest text-[#5F6C8D] mb-3">ENTER SECURITY COMPLIANCE PIN</span>
          <div className="flex justify-center gap-5">
            {[0, 1, 2, 3].map(ind => {
              const active = typedPin.length > ind;
              return (
                <motion.div 
                  key={ind} 
                  animate={active ? { scale: [1, 1.3, 1.2] } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`w-5 h-5 rounded-full border transition-all duration-300 ${
                    active
                      ? 'bg-gradient-to-tr from-[#0052CC] to-[#00C389] border-transparent shadow-[0_0_15px_rgba(0,82,204,0.45)]'
                      : 'bg-white/50 border-slate-300 shadow-inner'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Premium Numeric Keypad Area with Glass System */}
        <div className="space-y-4 mb-2 bg-[rgba(255,255,255,0.7)] backdrop-blur-[20px] rounded-[36px] p-6 border border-white/60 shadow-[0_12px_45px_rgba(0,82,204,0.08)]">
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button 
                key={num}
                onClick={() => handleKeypad(num)}
                className="h-14 font-extrabold text-2xl rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm border border-slate-200/60 text-[#0B1F47] hover:bg-gradient-to-tr hover:from-white hover:to-slate-100 hover:border-slate-300 hover:shadow-md active:scale-95 transition-all shadow-sm duration-150"
              >
                {num}
              </button>
            ))}
            <button 
              onClick={() => setTypedPin('')}
              className="h-14 font-black text-xs uppercase rounded-2xl flex items-center justify-center bg-[#FFF1F3] border border-[#FF6B6B]/30 text-[#FF4D67] hover:bg-[#FFF1F3]/90 active:scale-95 transition-all shadow-sm shadow-red-100/50 duration-150"
            >
              Clear
            </button>
            <button 
              onClick={() => handleKeypad('0')}
              className="h-14 font-extrabold text-2xl rounded-2xl flex items-center justify-center bg-white/50 backdrop-blur-sm border border-slate-200/60 text-[#0B1F47] hover:bg-gradient-to-tr hover:from-white hover:to-slate-100 hover:border-slate-300 hover:shadow-md active:scale-95 transition-all shadow-sm duration-150"
            >
              0
            </button>
            <button 
              onClick={triggerFaceID}
              className="h-14 font-black text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center bg-gradient-to-tr from-[#0052CC] to-[#00C389] text-white hover:shadow-lg hover:brightness-110 active:scale-95 transition-all shadow-md gap-1 duration-150"
            >
              <Fingerprint size={16} />
              BIO
            </button>
          </div>
        </div>

        {/* Redesigned Premium Footer */}
        <div className="text-center pt-2 pb-2">
          <p className="text-xs text-[#5F6C8D] font-medium leading-relaxed">
            New to GOQii QIC?{' '}
            <button 
              onClick={onLogin}
              className="text-[#0052CC] font-black hover:underline inline-flex items-center gap-1 group transition-all"
            >
              Start your wellness & insurance journey 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// Global Help Advisor chatbot (AI Copilot widget) inside main applet
function AiAssistantWidget({ themeMode }: { themeMode: 'dark' | 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'ai' | 'user', text: string }>>([
    { sender: 'ai', text: "Hello! I am your luxury GOQii QIC Smart AI Insurance Assistant. How can I protect you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSuggest = (text: string, response: string) => {
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Sparkly AI Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-24 z-50 w-14 h-14 bg-gradient-to-tr from-[#2F80FF] via-[#0B57D0] to-[#8B5CF6] text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(47,128,255,0.4)] hover:scale-105 active:scale-95 transition-transform border border-white/20"
      >
        <Sparkles size={24} className="animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed inset-x-6 bottom-24 z-50 p-6 rounded-[32px] border shadow-2xl flex flex-col gap-4 max-h-[420px] ${
              themeMode === 'dark' 
                ? 'bg-[#111827] border-white/10 text-slate-100 shadow-black' 
                : 'bg-white border-slate-200 text-slate-900 shadow-blue-900/10'
            }`}
          >
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4 className="font-bold text-xs">GOQii QIC AI Copilot</h4>
                  <p className="text-[9px] text-[#2F80FF] uppercase tracking-widest font-bold">ACTIVE ASSIST</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-60 hover:opacity-100">
                <X size={20} />
              </button>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 hide-scrollbar max-h-[220px]">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed max-w-[85%] ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : (themeMode === 'dark' ? 'bg-white/5 text-slate-200 rounded-tl-none' : 'bg-slate-100 text-slate-800 rounded-tl-none')
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 bg-white/5 text-[#94A3B8] rounded-2xl rounded-tl-none text-[10px] animate-pulse">
                    AI Agent typing...
                  </div>
                </div>
              )}
            </div>

            {/* Help suggestions chip buttons */}
            <div className="space-y-1.5 pt-2 border-t border-white/5">
              <p className="text-[9px] text-[#A855F7] uppercase tracking-widest font-bold block ml-1">Featured Guidance</p>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  onClick={() => handleSuggest("Explain Water Damage CLM2024004", "Claim CLM2024004 is currently in Submitted status for water damage. Your policy covers up to AED 15,000 for local flooding with 0% liability. Rest assured, our supervisor is approving this within 24 hours.")}
                  className="px-2.5 py-1.5 rounded-full text-[9px] font-bold bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10"
                >
                  Water Damage CLM2024004
                </button>
                <button 
                  onClick={() => handleSuggest("Recommend policies", "Based on your strong active steps (7,200 steps daily) and family profile, we recommend adding our 'Bio-Shield Wellness Plus' rider which rewards step checkpoints with 15% cashback on family medical premiums.")}
                  className="px-2.5 py-1.5 rounded-full text-[9px] font-bold bg-white/5 border border-white/5 text-slate-300 hover:bg-white/10"
                >
                  Recommended Booster Riders
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DashboardScreen({ navigateTo, themeMode, toggleTheme, triggerConfetti, showToast }: { navigateTo: (s: Screen) => void, themeMode: 'dark' | 'light', toggleTheme: () => void, triggerConfetti: (msg?: string) => void, showToast: (msg: string) => void }) {
  const [showSosSlider, setShowSosSlider] = useState(false);
  const [sosProgress, setSosProgress] = useState(0);

  const handleSosTrigger = () => {
    triggerConfetti("SOS Emergency Broadcast Sent to UAE Emergency Medical Systems & Dubai Police.");
    setShowSosSlider(false);
    setSosProgress(0);
  };

  return (
    <div className="pb-8 relative">
      <AiAssistantWidget themeMode={themeMode} />

      {/* Header with avatar and control controls */}
      <header className="p-6 pb-2">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img 
                src={MOCK_USER.avatar} 
                alt="Avatar" 
                className="w-12 h-12 rounded-[22px] object-cover ring-2 ring-[#F4B400]/40 shadow-xl"
              />
              <span className={`absolute -bottom-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 ${themeMode === 'dark' ? 'border-[#090D1A]' : 'border-[#F4F6FC]'} flex items-center justify-center text-[8px] font-bold text-white`}>✓</span>
            </div>
            <div>
              <p className={`text-[10px] uppercase tracking-wider font-bold ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Private Member</p>
              <h3 className={`font-extrabold text-lg font-display transition-colors ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-[#062D7A]'}`}>{MOCK_USER.name}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                themeMode === 'dark' ? 'bg-white/5 text-amber-400 border border-white/5' : 'bg-slate-200/60 text-slate-800'
              }`}
            >
              {themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => showToast("Emergency response telephone connected at +971-4-GOQii-QIC.")}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                themeMode === 'dark' ? 'bg-white/5 text-slate-300 border border-white/5' : 'bg-slate-250 text-slate-800'
              }`}
            >
              <PhoneCall size={18} />
            </button>
            <button 
              onClick={() => showToast("Push notifications cleared. Your device health is optimized.")}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 relative transition-all ${
                themeMode === 'dark' ? 'bg-white/5 border border-white/5' : 'bg-blue-50/70 border border-slate-200'
              }`}
            >
              <Bell size={18} />
              <span className={`absolute top-2 right-2 w-2.5 h-2.5 bg-[#FF4D67] rounded-full border-2 ${themeMode === 'dark' ? 'border-[#090D1A]' : 'border-[#F4F6FC]'}`}></span>
            </button>
          </div>
        </div>

        {/* Premium Dynamic Hero Coverage Card */}
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          <div className="min-w-[290px] bg-gradient-to-tr from-[#062D7A] to-[#2F80FF] rounded-[32px] p-6 text-white relative overflow-hidden snap-center glow-blue">
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-4 right-4 text-white/10"><Shield size={100} /></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-1">
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Active Total Coverage</p>
                <span className="bg-white/10 px-2 py-0.5 rounded text-[8px] font-bold text-[#F4B400]">SUPER PREMIUM</span>
              </div>
              <h4 className="text-3xl font-extrabold mb-4 font-mono">AED 825,000</h4>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-blue-200 font-medium mb-1 uppercase">Active Health + Auto Policies</p>
                  <p className="text-lg font-extrabold font-mono">03 Active</p>
                </div>
                <div className="flex items-center gap-1 bg-white/15 px-3 py-1.5 rounded-full text-[10px] font-bold border border-white/10">
                  <TrendingUp size={12} className="text-green-400" />
                  +12.5% Payout Boost
                </div>
              </div>
            </div>
          </div>

          <div className={`min-w-[290px] rounded-[32px] p-6 relative overflow-hidden snap-center border transition-all duration-500 ${
            themeMode === 'dark'
              ? 'bg-gradient-to-tr from-[#111827] to-[#1F2937] text-white border-white/10 shadow-2xl shadow-black/50'
              : 'bg-white text-slate-900 border-slate-200 shadow-xl shadow-blue-900/5'
          }`}>
            <div className={`absolute bottom-2 right-2 transition-opacity ${themeMode === 'dark' ? 'opacity-5 text-white' : 'opacity-10 text-[#0B57D0]'}`}><Award size={110} /></div>
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-[10px] font-bold uppercase tracking-widest font-sans ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-blue-600'}`}>Wellness Vault Balance</p>
                  <span className="text-xs">🔥</span>
                </div>
                <h4 className={`text-3xl font-extrabold mb-4 font-mono ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-[#0B57D0]'}`}>4,250 <span className={`text-xs ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>PTS</span></h4>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className={`text-[9px] mb-1 font-bold uppercase tracking-wider ${themeMode === 'dark' ? 'text-[#94A3B8]' : 'text-slate-500'}`}>Current Activity Streak</p>
                  <p className={`text-base font-bold ${themeMode === 'dark' ? 'text-white' : 'text-slate-800'}`}>12 Days Unbroken</p>
                </div>
                <button 
                  onClick={() => triggerConfetti("Redeemed 500 points for AED 50 Careem Ride Voucher!")}
                  className="bg-[#F4B400] hover:bg-yellow-500 text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-extrabold transition-transform active:scale-95"
                >
                  REDEEM
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Action Tiles Redesign */}
      <section className="px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm tracking-widest uppercase opacity-85">Digital Command Hub</h3>
          <button onClick={() => showToast("Already showing ultimate layout.")} className="text-[#2F80FF] text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/10 px-3 py-1 rounded-full">Pro Panel</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {/* Animated emergency SOS ring pulse */}
          <button 
            onClick={() => setShowSosSlider(true)}
            className="flex flex-col items-center gap-2 group relative"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-rose-500 text-white transition-transform group-active:scale-95 pulse-glow-sos">
              <Plus size={24} className="animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <span className="text-[10px] font-extrabold text-rose-500 tracking-wider">SOS HELPDESK</span>
          </button>
          
          <ActionItem 
            icon={<Shield size={22} />} 
            color={themeMode === 'dark' ? 'bg-[#111827] text-[#2F80FF] border border-white/10' : 'bg-white text-blue-600 border border-slate-200'} 
            label="CLAIM PORTAL" 
            onClick={() => navigateTo('claims')} 
          />
          <ActionItem 
            icon={<CreditCard size={22} />} 
            color={themeMode === 'dark' ? 'bg-[#111827] text-purple-400 border border-white/10' : 'bg-white text-purple-600 border border-slate-200'} 
            label="PAY PORTAL" 
            onClick={() => triggerConfetti("Premium payment confirmed. 12% health bonus multiplier activated.")} 
          />
          <ActionItem 
            icon={<MapPin size={22} />} 
            color={themeMode === 'dark' ? 'bg-[#111827] text-emerald-400 border border-white/10' : 'bg-white text-green-600 border border-slate-200'} 
            label="CLINIC MAPS" 
            onClick={() => showToast("Loaded 12 local GOQii QIC Premium Care partners in Dubai Marina.")} 
          />
        </div>
      </section>

      {/* Swipeable Products Showcase */}
      <section className="px-6 py-4">
        <h3 className="font-bold text-sm tracking-widest uppercase opacity-85 mb-4">Ecosystem Insurance Suites</h3>
        <div className="grid grid-cols-2 gap-4">
          <ProductCard 
            icon={<Car size={26} className="text-[#2F80FF]" />} 
            title="Motor Shield" 
            desc="Dynamic smart road telemetry & camera verify" 
            className={themeMode === 'dark' 
              ? 'bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white border-white/5' 
              : 'bg-white border-slate-200 text-slate-800 shadow-xl shadow-blue-900/5'
            }
            themeMode={themeMode}
            onClick={() => navigateTo('policies')}
          />
          <ProductCard 
            icon={<Heart size={26} className="text-[#FF4D67]" />} 
            title="Premium Health" 
            desc="Family health coverage synced to premium bio-rings" 
            className={themeMode === 'dark' 
              ? 'bg-gradient-to-br from-[#1C1917] to-[#0F172A] text-white border-white/5' 
              : 'bg-white border-slate-200 text-slate-800 shadow-xl shadow-blue-900/5'
            }
            themeMode={themeMode}
            onClick={() => navigateTo('policies')}
          />
          <ProductCard 
            icon={<Plane size={26} className="text-purple-400" />} 
            title="Global Travel" 
            desc="Worldwide lounge support & flight delays" 
            className={themeMode === 'dark' 
              ? 'bg-gradient-to-br from-[#2D1B4E] to-[#0F172A] text-white border-white/5' 
              : 'bg-white border-slate-200 text-slate-800 shadow-xl shadow-blue-900/5'
            }
            themeMode={themeMode}
            onClick={() => navigateTo('policies')}
          />
          <ProductCard 
            icon={<HomeIcon size={26} className="text-amber-400" />} 
            title="Estate Protect" 
            desc="Ultimate water damage & safety contents cover" 
            className={themeMode === 'dark' 
              ? 'bg-gradient-to-br from-[#2A1D08] to-[#0F172A] text-white border-white/5' 
              : 'bg-white border-slate-200 text-slate-800 shadow-xl shadow-blue-900/5'
            }
            themeMode={themeMode}
            onClick={() => navigateTo('policies')}
          />
        </div>
      </section>

      {/* Wellness Insight Rings - Fitbit / Whoop layout */}
      <section className="px-6 py-4">
        <div className={`rounded-[32px] p-6 flex items-center justify-between border transition-all duration-500 ${
          themeMode === 'dark'
            ? 'bg-slate-900 text-white border-white/10 glow-green'
            : 'bg-white text-slate-900 border-slate-200 shadow-xl shadow-green-500/5'
        }`}>
          <div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-1">
              <Zap size={10} /> Syncing Whoop & Apple Health
            </div>
            <h4 className="font-extrabold text-lg">Ecosystem Wellness Score</h4>
            <p className={`text-[11px] mt-1 mb-4 ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Alexandra, you are 2,800 steps away from hitting today's booster XP!</p>
            <button 
              onClick={() => navigateTo('wellness')}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider"
            >
              ACCELERATE HUB
            </button>
          </div>
          <div className="w-20 h-20 relative flex-shrink-0">
             {/* Beautiful nested background circles */}
             <svg className="w-full h-full -rotate-90">
               <circle cx="40" cy="40" r="32" stroke={themeMode === 'dark' ? '#1E293B' : '#E2E8F0'} strokeWidth="6" fill="transparent" />
               <circle 
                 cx="40" cy="40" r="32" stroke="#1DB954" strokeWidth="6" fill="transparent" 
                 strokeDasharray="201" strokeDashoffset="44" 
                 className={themeMode === 'dark' ? 'drop-shadow-[0_0_8px_#1DB954]' : ''}
               />
               <circle cx="40" cy="40" r="24" stroke={themeMode === 'dark' ? '#1E293B' : '#E2E8F0'} strokeWidth="6" fill="transparent" />
               <circle 
                 cx="40" cy="40" r="24" stroke="#F4B400" strokeWidth="6" fill="transparent" 
                 strokeDasharray="150" strokeDashoffset="30"
               />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className={`text-[14px] font-black ${themeMode === 'dark' ? 'text-white' : 'text-slate-800'}`}>78%</span>
               <span className={`text-[8px] font-bold uppercase ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>FIT</span>
             </div>
          </div>
        </div>
      </section>

      {/* Emergency SOS Slide To Dispatch bottom sheet tray */}
      <AnimatePresence>
        {showSosSlider && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-end justify-center pointer-events-auto">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-[440px] bg-[#0F172A] border-t border-rose-500/30 rounded-t-[40px] p-8 text-white text-center pb-12"
            >
              <div className="w-12 h-1.5 bg-slate-800 rounded-full mx-auto mb-6"></div>
              <div className="w-20 h-20 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <AlertCircle size={44} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Active SOS Command</h3>
              <p className="text-slate-400 text-xs mt-2 mb-8 leading-relaxed px-6">
                Accidental trigger? Slide the visual dispatch path standard below to alert GOQii QIC Roadside Rescue & local paramedics directly.
              </p>

              {/* Slider track button */}
              <div className="w-full h-18 bg-white/5 border border-white/10 rounded-[32px] relative flex items-center justify-between px-2 overflow-hidden mb-6">
                <motion.div 
                  drag="x"
                  dragConstraints={{ left: 0, right: 220 }}
                  onDrag={(e, info) => {
                    const percent = Math.min((info.point.x / 300) * 100, 100);
                    setSosProgress(Math.min(Math.round(percent), 100));
                  }}
                  onDragEnd={(e, info) => {
                    if (info.offset.x > 180) {
                      handleSosTrigger();
                    } else {
                      setSosProgress(0);
                    }
                  }}
                  className="w-14 h-14 bg-gradient-to-r from-rose-600 to-[#FF4D67] rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-rose-900/40 relative z-10"
                >
                  <ArrowRight size={24} />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-rose-300 font-bold uppercase tracking-wider text-[11px]">
                  {sosProgress > 80 ? 'RELEASE TO CONFIRM SOS' : `SLIDE TO INITIATE ALERT (${sosProgress}%)`}
                </div>
              </div>

              <button 
                onClick={() => {
                  setShowSosSlider(false);
                  setSosProgress(0);
                }} 
                className="text-slate-400 font-bold hover:text-white uppercase tracking-wider text-xs"
              >
                Dismiss Command
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionItem({ icon, color, label, onClick }: { icon: React.ReactNode, color: string, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group flex-1">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg transition-transform group-active:scale-95 duration-200`}>
        {icon}
      </div>
      <span className="text-[9px] font-extrabold tracking-widest text-[#94A3B8] uppercase text-center">{label}</span>
    </button>
  );
}

function ProductCard({ icon, title, desc, className, themeMode, onClick }: { icon: React.ReactNode, title: string, desc: string, className: string, themeMode: 'dark' | 'light', onClick: () => void }) {
  const isDark = themeMode === 'dark';
  return (
    <button 
      onClick={onClick}
      className={`${className} p-5 rounded-[28px] text-left flex flex-col justify-between gap-6 border hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[160px]`}
    >
      <div className={`p-3 w-fit rounded-2xl border shadow-lg ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200/60'}`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-extrabold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>{title}</h4>
        <p className={`text-[10px] leading-normal ${isDark ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>{desc}</p>
      </div>
    </button>
  );
}

function PoliciesScreen({ navigateTo, setSelectedPolicyId, themeMode }: { navigateTo: (s: Screen) => void, setSelectedPolicyId: (id: string) => void, themeMode: 'dark' | 'light' }) {
  const [activeTab, setActiveTab] = useState<'Active' | 'Review' | 'History'>('Active');

  return (
    <div className="pb-8">
      <header className="p-6 sticky top-0 backdrop-blur-xl z-20 border-b"
        style={{ 
          background: themeMode === 'dark' ? 'rgba(9, 13, 26, 0.9)' : 'rgba(244, 246, 252, 0.9)',
          borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigateTo('dashboard')} 
            className={`p-2 rounded-xl transition-colors ${
              themeMode === 'dark' ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-slate-100 border border-slate-250 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Active Policies</h2>
            <p className="text-[11px] text-[#A855F7] tracking-widest uppercase font-bold">Encrypted Vault Protection</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className={`flex p-1 rounded-2xl ${themeMode === 'dark' ? 'bg-white/5' : 'bg-slate-200'}`}>
          {(['Active', 'Review', 'History'] as const).map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab 
                  ? (themeMode === 'dark' ? 'bg-[#111827] text-[#F4B400] shadow-2xl border border-white/5' : 'bg-white text-blue-600 shadow-sm') 
                  : (themeMode === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600')
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Policies list with high premium contrast */}
      <div className="px-6 space-y-4 py-4">
        {MOCK_POLICIES.map((policy) => (
          <div 
            key={policy.id} 
            onClick={() => {
              setSelectedPolicyId(policy.id);
              navigateTo('policy-details');
            }}
            className={`p-6 rounded-[32px] border transition-all cursor-pointer group flex flex-col justify-between min-h-[170px] ${
              themeMode === 'dark' 
                ? 'bg-gradient-to-br from-[#111827] to-[#0F172A] border-white/10 hover:border-[#2F80FF]/40 shadow-black' 
                : 'bg-white border-slate-200 hover:border-blue-300 shadow-blue-900/5 shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  policy.type === 'Health' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                  policy.type === 'Motor' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border border-gold-500/10'
                }`}>
                  {policy.type === 'Health' ? <Heart size={22} /> : policy.type === 'Motor' ? <Car size={22} /> : <HomeIcon size={22} />}
                </div>
                <div>
                  <h4 className={`font-extrabold text-sm uppercase tracking-wide ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-slate-900'}`}>{policy.type} Super Protection</h4>
                  <p className="text-[10px] text-slate-400 font-mono tracking-widest">{policy.policyNumber}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                policy.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-[#F4B400]'
              }`}>
                {policy.status}
              </div>
            </div>
            
            <div className={`grid grid-cols-2 gap-4 pt-4 border-t ${themeMode === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
              <div>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1">Total Insured value</p>
                <p className="text-sm font-extrabold font-mono text-emerald-400">AED {policy.coverage.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-1 font-sans">Expiry Matrix</p>
                <p className="text-sm font-extrabold font-mono text-rose-400">{policy.expiryDate}</p>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={() => navigateTo('file-claim')}
          className={`w-full py-5 border-2 border-dashed rounded-3xl flex items-center justify-center gap-2 font-bold transition-all ${
            themeMode === 'dark'
              ? 'border-slate-700 text-[#F4B400] hover:border-[#F4B400] bg-white/2'
              : 'border-slate-300 text-blue-600 hover:border-blue-500 bg-slate-150'
          }`}
        >
          <Plus size={20} />
          File Claim Policy Booster
        </button>
      </div>
    </div>
  );
}

function PolicyDetailsScreen({ policyId, onBack, themeMode, showToast }: { policyId: string | null, onBack: () => void, themeMode: 'dark' | 'light', showToast: (msg: string) => void }) {
  const policy = MOCK_POLICIES.find(p => p.id === policyId) || MOCK_POLICIES[0];

  return (
    <div className={`flex flex-col h-full ${themeMode === 'dark' ? 'bg-[#090D1A]' : 'bg-[#F4F6FC]'}`}>
      <div className="p-6 pb-12 bg-gradient-to-b from-[#062D7A] to-[#090D1A] text-white relative">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="p-2 bg-white/10 rounded-xl">
            <ArrowLeft size={20} />
          </button>
          <h3 className="font-extrabold text-sm uppercase tracking-widest text-[#F4B400]">Secured Policy Data</h3>
          <button onClick={() => showToast("Configuration lock active.")} className="p-2 bg-white/10 rounded-xl">
            <Settings size={20} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#F4B400] mb-4 shadow-xl">
             {policy.type === 'Health' ? <Heart size={32} /> : policy.type === 'Motor' ? <Car size={32} /> : <HomeIcon size={32} />}
          </div>
          <h2 className="text-2xl font-black tracking-tight">{policy.type} Premium Protection</h2>
          <p className="font-mono text-blue-300 text-sm mt-1">{policy.policyNumber}</p>
          
          <div className="mt-8 grid grid-cols-2 w-full gap-8 px-4">
            <div>
              <p className="text-[10px] text-blue-200 uppercase font-bold mb-1">Vault Status</p>
              <p className="font-bold flex items-center justify-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                {policy.status}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-blue-200 uppercase font-bold mb-1">Maturity Countdown</p>
              <p className="font-bold text-xs">AED {policy.premium.toLocaleString()} premium</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`-mt-8 rounded-t-[40px] flex-1 p-8 space-y-8 ${
        themeMode === 'dark' ? 'bg-[#111827] border-t border-white/5 text-white' : 'bg-white text-slate-900 shadow-inner'
      }`}>
        <section>
          <h4 className="font-bold text-sm tracking-widest uppercase mb-4 opacity-70">Coverage matrix parameters</h4>
          <div className="space-y-4">
            <SummaryRow label="Aggregate Insured Cap" value={`AED ${(policy.coverage * 3.67).toLocaleString()} (AED)`} themeMode={themeMode} />
            <SummaryRow label="Base Premium Rate" value={`AED ${(policy.premium * 3.67).toLocaleString()} / year`} themeMode={themeMode} />
            <SummaryRow label="Issue Protocol Date" value="Jan 12, 2024" themeMode={themeMode} />
            <SummaryRow label="Beneficiary Trust Details" value="John Sterling, Emily Sterling" themeMode={themeMode} />
          </div>
        </section>

        <section>
          <h4 className="font-bold text-sm tracking-widest uppercase mb-4 opacity-70">Secured Documents</h4>
          <div className="grid grid-cols-2 gap-4">
            <ActionCard icon={<FileText size={20} />} label="Insurance Certificate" themeMode={themeMode} />
            <ActionCard icon={<Shield size={20} />} label="Claims Policy Handbook" themeMode={themeMode} />
          </div>
        </section>

        <button 
          onClick={() => showToast(`Initiated renewal order for Policy ${policy.policyNumber}`)}
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold active:scale-[0.98] transition-transform shadow-xl shadow-blue-900/10"
        >
          RENEW POLICY WITH SMART WALLET
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, themeMode }: { label: string, value: string, themeMode?: 'dark' | 'light' }) {
  const isDark = themeMode !== 'light';
  return (
    <div className={`flex justify-between items-center py-2.5 border-b ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
      <span className={`text-xs font-medium font-sans uppercase tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</span>
      <span className={`text-xs font-bold font-mono ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{value}</span>
    </div>
  );
}

function ActionCard({ icon, label, themeMode }: { icon: React.ReactNode, label: string, themeMode?: 'dark' | 'light' }) {
  const isDark = themeMode !== 'light';
  return (
    <button className={`p-4 rounded-2xl border flex flex-col gap-3 items-start transition-all text-left w-full ${
      isDark 
        ? 'bg-white/5 border-white/5 hover:border-[#F4B400]/40' 
        : 'bg-slate-50 border-slate-200 hover:border-blue-500/40'
    }`}>
      <div className={`p-2 rounded-lg border ${
        isDark 
          ? 'bg-white/5 text-[#F4B400] border-white/5' 
          : 'bg-white text-blue-600 border-slate-200'
      }`}>{icon}</div>
      <span className={`text-[11px] font-bold uppercase tracking-tight leading-tight ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{label}</span>
    </button>
  );
}

function ClaimsScreen({ navigateTo, setSelectedClaimId, themeMode }: { navigateTo: (s: Screen) => void, setSelectedClaimId: (id: string) => void, themeMode: 'dark' | 'light' }) {
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
    { label: 'Total Claims', value: MOCK_CLAIMS.length, color: 'grad-cyan-blue' },
    { label: 'Submitted', value: MOCK_CLAIMS.filter(c => c.status === 'Submitted').length, color: 'bg-orange-500/80' },
    { label: 'Under Review', value: MOCK_CLAIMS.filter(c => c.status === 'Under Review').length, color: 'bg-amber-500/80 glow-gold' },
    { label: 'Approved', value: MOCK_CLAIMS.filter(c => c.status === 'Approved').length, color: 'bg-green-500/80' },
    { label: 'Paid', value: MOCK_CLAIMS.filter(c => c.status === 'Paid').length, color: 'grad-emerald-teal glow-green' },
  ];

  return (
    <div className="pb-8">
      {/* Top Nav Bar */}
      <header className="p-6 sticky top-0 backdrop-blur-xl z-20 border-b"
        style={{ 
          background: themeMode === 'dark' ? 'rgba(9, 13, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('dashboard')} className="p-2 bg-slate-500/10 rounded-xl text-slate-400">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className={`text-base font-black tracking-widest font-display ${themeMode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>GOQii QIC Claims</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Audit, Payout & Process logs</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-xl text-slate-400 ${themeMode === 'dark' ? 'bg-slate-500/10' : 'bg-slate-150'}`}><PhoneCall size={18} /></button>
            <button className={`p-2 rounded-xl text-slate-400 ${themeMode === 'dark' ? 'bg-slate-500/10' : 'bg-slate-150'}`}><Bell size={18} /></button>
            <button className={`p-2 rounded-xl text-slate-400 ${themeMode === 'dark' ? 'bg-slate-500/10' : 'bg-slate-150'}`}><Settings size={18} /></button>
          </div>
        </div>
        
        {/* Direct Submissions CTA */}
        <button 
          onClick={() => navigateTo('file-claim')}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-[#2F80FF] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform text-xs uppercase tracking-widest"
        >
          <Plus size={16} />
          File New Medical / Motor Claim
        </button>
      </header>

      {/* Summary Cards */}
      <section className="px-6 py-6 overflow-x-auto hide-scrollbar flex gap-4 snap-x">
        {summaryStats.map((stat, i) => (
          <div key={i} className={`min-w-[140px] p-5 rounded-[28px] text-white snap-center shadow-lg uppercase relative overflow-hidden ${stat.color}`}>
            <h4 className="text-3xl font-extrabold mb-1 font-mono tracking-tight">{stat.value}</h4>
            <p className="text-[9px] font-bold opacity-80 uppercase tracking-wider leading-tight">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Search & Filter */}
      <section className="px-6 pb-6">
        <div className="flex gap-3">
          <div className={`flex-1 h-12 rounded-2xl flex items-center px-4 gap-3 focus-within:ring-2 focus-within:ring-blue-500/25 transition-all border ${
            themeMode === 'dark' ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'
          }`}>
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search claims by ID or type..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent border-none outline-none text-xs w-full font-semibold ${
                themeMode === 'dark' ? 'text-slate-200 placeholder:text-slate-500' : 'text-slate-850 placeholder:text-slate-400'
              }`}
            />
          </div>
          <div className="relative group">
            <button className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all border ${
              themeMode === 'dark' ? 'bg-white/5 border-white/5 text-slate-350 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
            }`}>
              <Filter size={18} />
            </button>
            <div className={`absolute right-0 top-14 w-48 rounded-2xl shadow-2xl overflow-hidden z-30 opacity-0 pointer-events-none group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition-all border ${
              themeMode === 'dark' ? 'bg-[#111827] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              {['All Status', 'Submitted', 'Under Review', 'Approved', 'Paid', 'Rejected'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`w-full px-5 py-3 text-left text-xs font-bold transition-colors ${
                    activeFilter === filter 
                      ? (themeMode === 'dark' ? 'text-[#F4B400] bg-white/5' : 'text-blue-600 bg-blue-50') 
                      : (themeMode === 'dark' ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50')
                  }`}
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
              className={`p-6 border rounded-[32px] hover:border-[#2F80FF]/40 shadow-xl transition-all active:scale-[0.99] group cursor-pointer ${
                themeMode === 'dark' 
                  ? 'bg-[#111827] border-white/5' 
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className={`text-[10px] font-bold font-mono tracking-widest mb-1 uppercase ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-blue-600'}`}>Claim #{claim.id}</h4>
                  <h3 className={`font-bold text-sm transition-colors ${themeMode === 'dark' ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-blue-600'}`}>{claim.type} Insurance - {claim.category}</h3>
                  <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider mt-1">Submitted {claim.date}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  claim.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' :
                  claim.status === 'Approved' ? 'bg-green-500/10 text-green-400' :
                  claim.status === 'Under Review' ? 'bg-amber-500/10 text-[#F4B400]' :
                  claim.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {claim.status}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Claim Settled Value</p>
                  <p className={`text-xl font-extrabold font-mono ${themeMode === 'dark' ? 'text-slate-100' : 'text-slate-900'}`}>AED {claim.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Process Matrix</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#2F80FF] font-mono">{claim.progress}% Verified</span>
                  </div>
                </div>
              </div>

              <div className={`h-1.5 rounded-full overflow-hidden mb-4 border ${themeMode === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${claim.progress}%` }}
                  className={`h-full ${claim.status === 'Rejected' ? 'bg-red-500' : 'bg-gradient-to-r from-blue-600 to-emerald-400'}`}
                />
              </div>

              {/* Progress timeline checkpoints */}
              <div className="flex justify-between items-center px-1 mb-3">
                {['Received', 'Review', 'Approved', 'Paid'].map((stage, i) => {
                  const isActive = (i === 0 && claim.timeline.received) || 
                                   (i === 1 && claim.timeline.review) || 
                                   (i === 2 && claim.timeline.approved) || 
                                   (i === 3 && claim.timeline.paid);
                  return (
                    <div key={stage} className="flex flex-col items-center gap-1.5">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 ${
                        isActive 
                          ? `bg-[#2F80FF] ${themeMode === 'dark' ? 'border-[#090D1A]' : 'border-white'} scale-125 shadow-lg shadow-blue-500/50` 
                          : (themeMode === 'dark' ? 'bg-slate-800 border-transparent' : 'bg-slate-250 border-transparent')
                      }`}></div>
                      <span className={`text-[8px] font-bold uppercase tracking-wider ${isActive ? 'text-[#2F80FF]' : 'text-slate-550'}`}>{stage}</span>
                    </div>
                  );
                })}
              </div>

              {claim.description && (
                <div className={`mt-5 p-3.5 rounded-2xl border flex items-start gap-2 ${
                  themeMode === 'dark' ? 'bg-white/3 border-white/5' : 'bg-blue-50/50 border-blue-100'
                }`}>
                  <div className="p-1 bg-yellow-500/10 text-[#F4B400] rounded-lg mt-0.5"><Sparkles size={12} /></div>
                  <p className={`text-[10px] leading-normal font-sans ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
                    <span className={`font-black mr-1 uppercase ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-blue-700'}`}>AI Insured Note:</span> {claim.description}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={`py-20 flex flex-col items-center justify-center text-center px-12 border rounded-[40px] shadow-2xl ${
            themeMode === 'dark' ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-blue-900/5'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-bounce border ${
              themeMode === 'dark' ? 'bg-white/5 border-white/10 text-[#F4B400]' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              <FileText size={32} />
            </div>
            <h4 className={`text-base font-bold uppercase tracking-widest ${themeMode === 'dark' ? 'text-slate-100' : 'text-slate-850'}`}>No claims match filter</h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">No claims matched details on record. Launch standard filing wizard for instant processing.</p>
            <button 
              onClick={() => navigateTo('file-claim')}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold font-sans text-xs uppercase tracking-wider shadow-lg"
            >
              File Premium Claim
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function ClaimDetailsScreen({ claimId, onBack, themeMode, showToast }: { claimId: string | null, onBack: () => void, themeMode: 'dark' | 'light', showToast: (msg: string) => void }) {
  const claim = MOCK_CLAIMS.find(c => c.id === claimId) || MOCK_CLAIMS[0];

  return (
    <div className={`flex flex-col h-full ${themeMode === 'dark' ? 'bg-[#090D1A]' : 'bg-[#F4F6FC]'}`}>
      <header className={`p-6 border-b flex items-center justify-between transition-colors ${
        themeMode === 'dark' ? 'bg-[#111827] border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className={`p-2 rounded-xl transition-colors ${
            themeMode === 'dark' ? 'bg-white/5 border border-white/10 text-white' : 'bg-slate-100 border border-slate-200 text-slate-700'
          }`}>
            <ArrowLeft size={18} />
          </button>
          <h2 className={`text-sm font-black uppercase tracking-widest ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-blue-600'}`}>Claim Vaulted Matrix</h2>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => showToast("Secured QR Receipt downloaded.")} className={`p-2 transition-colors ${themeMode === 'dark' ? 'text-[#94A3B8] hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}><Share2 size={20} /></button>
          <button onClick={() => showToast("Device clearance credentials updated.")} className={`p-2 transition-colors ${themeMode === 'dark' ? 'text-[#94A3B8] hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}><Settings size={20} /></button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <section className={`p-6 border rounded-[36px] shadow-2xl relative overflow-hidden transition-all duration-350 ${
          themeMode === 'dark' ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-blue-900/5'
        }`}>
          <div className="absolute top-0 right-0 p-4 opacity-5"><Shield size={120} /></div>
          
          <div className={`flex justify-between items-start mb-6 pb-6 border-b ${themeMode === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest font-mono ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-blue-600'}`}>Claim ID: {claim.id}</p>
              <h3 className={`text-lg font-black uppercase tracking-tight mt-1 ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>{claim.type} Super Protection</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{claim.category}</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
              claim.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
            }`}>
              {claim.status}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 py-2">
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Encrypted Settlement Amount</p>
              <p className={`text-xl font-black font-mono ${themeMode === 'dark' ? 'text-white' : 'text-slate-900'}`}>AED {(claim.amount).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">Filing Timestamp</p>
              <p className={`text-sm font-bold tracking-wide ${themeMode === 'dark' ? 'text-white' : 'text-slate-800'}`}>{claim.date}</p>
            </div>
          </div>

          {/* Visual vertical step tracker */}
          <div className={`pt-8 mt-6 border-t ${themeMode === 'dark' ? 'border-white/5' : 'border-slate-100'}`}>
            <p className="text-[9px] text-[#2F80FF] font-black uppercase tracking-widest mb-6 text-center">Visual Progress Logs</p>
            <div className="flex justify-between relative px-2">
              <div className={`absolute top-4 left-8 right-8 h-0.5 z-0 ${themeMode === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
              {['Received', 'Review', 'Approved', 'Paid'].map((stage, i) => {
                const isActive = (i === 0 && claim.timeline.received) || 
                                 (i === 1 && claim.timeline.review) || 
                                 (i === 2 && claim.timeline.approved) || 
                                 (i === 3 && claim.timeline.paid);
                return (
                  <div key={stage} className="flex flex-col items-center gap-3 z-10">
                    <div className={`w-9 h-9 rounded-full border-4 flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-[#2F80FF] border-blue-500/20 shadow-lg shadow-blue-500/30 scale-110' 
                        : (themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200')
                    }`}>
                      {isActive ? <Check size={14} className="text-white" /> : <Lock size={12} className="text-slate-400" />}
                    </div>
                    <span className={`text-[9px] font-extrabold uppercase tracking-widest ${isActive ? 'text-[#2F80FF]' : 'text-slate-400'}`}>{stage}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Uploaded evidence documents */}
        <section>
          <h4 className={`text-xs font-bold mb-4 px-2 tracking-widest uppercase ${themeMode === 'dark' ? 'text-[#F4B400]' : 'text-slate-900'}`}>TRUSTED PROOF ATTACHMENTS</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 border rounded-2xl flex flex-col gap-3 shadow-md hover:border-blue-500/30 transition-all text-left ${
              themeMode === 'dark' ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-blue-900/5'
            }`}>
              <div className={`p-2 rounded-lg text-[#2F80FF] w-fit border ${themeMode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-blue-50 border-blue-100/40'}`}><FileText size={20} /></div>
              <div>
                <p className={`text-[10px] font-bold truncate ${themeMode === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Incident_Report.pdf</p>
                <p className="text-[8px] text-slate-400 font-mono">1.2 MB • SECURE HASH</p>
              </div>
              <button onClick={() => showToast("Downloaded Incident_Report.pdf")} className="flex items-center gap-1.5 text-[#2F80FF] text-[9px] font-bold uppercase tracking-wider">
                <Download size={12} /> SAVE TO STACK
              </button>
            </div>

            <div className={`p-4 border rounded-2xl flex flex-col gap-3 shadow-md hover:border-blue-500/30 transition-all text-left ${
              themeMode === 'dark' ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-blue-900/5'
            }`}>
              <div className={`p-2 rounded-lg text-rose-450 w-fit border ${themeMode === 'dark' ? 'bg-white/5 border-white/10' : 'bg-rose-50 border-rose-100/40'}`}><CreditCard size={20} /></div>
              <div>
                <p className={`text-[10px] font-bold truncate ${themeMode === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>Medical_Bill_01.jpg</p>
                <p className="text-[8px] text-slate-400 font-mono">4.8 MB • AES KEY</p>
              </div>
              <button onClick={() => showToast("Downloaded Medical_Bill_01.jpg")} className="flex items-center gap-1.5 text-[#2F80FF] text-[9px] font-bold uppercase tracking-wider">
                <Download size={12} /> SAVE TO STACK
              </button>
            </div>
          </div>
        </section>

        {/* Professional Support advisor cards */}
        <section className={`p-6 border rounded-[36px] transition-all duration-300 ${
          themeMode === 'dark' 
            ? 'bg-gradient-to-tr from-[#1E293B] to-[#0F172A] text-white border-white/10' 
            : 'bg-gradient-to-tr from-blue-950 to-slate-900 text-white border-transparent shadow-xl'
        }`}>
          <h4 className="font-extrabold text-sm uppercase tracking-wide text-[#F4B400] mb-1">Ecosystem Claims Advisor</h4>
          <p className="text-slate-450 text-xs mb-6 leading-relaxed">Our Dubai-based supreme financial concierge is ready to handle queries regarding claim ID {claim.id}.</p>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => showToast("Direct connection dialled for Advisor Alexandra.")}
              className="flex-1 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all uppercase tracking-wider text-[10px]"
            >
              <PhoneCall size={14} /> CALL ADVISOR
            </button>
            <button 
              onClick={() => showToast("Gained chat connection with Claims AI Agent.")}
              className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-all uppercase tracking-wider text-[10px]"
            >
              <ArrowUpRight size={14} /> LIVE CONSULT
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function FileClaimScreen({ onBack, themeMode, triggerConfetti }: { onBack: () => void, themeMode: 'dark' | 'light', triggerConfetti: (msg?: string) => void }) {
  const [step, setStep] = useState(1);
  const [selectedIncident, setSelectedIncident] = useState('Accident');
  const isDark = themeMode === 'dark';

  return (
    <div className={`h-screen flex flex-col relative transition-colors duration-300 ${isDark ? 'bg-[#090D1A] text-white' : 'bg-[#F4F6FC] text-slate-800'}`}>
      <header className={`p-6 flex items-center justify-between border-b ${
        isDark ? 'border-white/5 bg-[#111827] text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className={`p-2 rounded-xl border ${
            isDark ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200'
          }`}><X size={20} /></button>
          <h3 className={`font-extrabold text-xs uppercase tracking-widest ${isDark ? 'text-[#F4B400]' : 'text-blue-600'}`}>Secured Claims Filing</h3>
        </div>
        <div className={`px-3.5 py-1.5 border rounded-xl text-[10px] font-black uppercase tracking-widest animate-pulse ${
          isDark 
            ? 'bg-[#F4B400]/10 border-[#F4B400]/35 text-[#F4B400]' 
            : 'bg-blue-50 border-blue-200 text-blue-600'
        }`}>
          STAGE {step} / 5
        </div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className={`text-xl font-black uppercase tracking-tight ${isDark ? 'text-[#F4B400]' : 'text-[#062D7A]'}`}>Step 1 — Choose Policy</h4>
                  <p className="text-xs text-slate-405">Which active dynamic policy does this incident register under?</p>
                </div>
                <div className="space-y-3">
                  {MOCK_POLICIES.map(p => (
                    <button 
                      key={p.id} 
                      className={`w-full p-5 border rounded-3xl flex items-center justify-between hover:border-blue-500/40 text-left group transition-all ${
                        isDark ? 'bg-[#111827]/80 border-white/5' : 'bg-white border-slate-200 shadow-sm shadow-blue-900/5'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl border transition-colors ${
                          isDark ? 'bg-white/5 text-slate-300 border-white/5 group-hover:text-[#F4B400]' : 'bg-slate-50 text-slate-700 border-slate-200/60 group-hover:text-blue-600'
                        }`}>
                           {p.type === 'Health' ? <Heart size={20} /> : p.type === 'Motor' ? <Car size={20} /> : <HomeIcon size={20} />}
                        </div>
                        <div>
                          <p className={`font-bold uppercase text-xs tracking-wider ${isDark ? 'text-white' : 'text-slate-800'}`}>{p.type} Protect</p>
                          <p className="text-[10px] text-[#2F80FF] font-mono tracking-widest">{p.policyNumber}</p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center group-hover:border-[#F4B400] group-hover:bg-[#F4B400] hover:text-slate-900 transition-all">
                        <Check size={12} className="opacity-0 group-hover:opacity-100" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className={`text-xl font-black uppercase tracking-tight ${isDark ? 'text-[#F4B400]' : 'text-[#062D7A]'}`}>Step 2 — Incident Categorization</h4>
                  <p className="text-xs text-slate-405">Identify the crash or medical incident below.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <IncidentType icon={<Car size={32} />} label="Accident" active={selectedIncident === 'Accident'} themeMode={themeMode} onClick={() => setSelectedIncident('Accident')} />
                   <IncidentType icon={<Shield size={32} />} label="Theft" active={selectedIncident === 'Theft'} themeMode={themeMode} onClick={() => setSelectedIncident('Theft')} />
                   <IncidentType icon={<Heart size={32} />} label="Medical" active={selectedIncident === 'Medical'} themeMode={themeMode} onClick={() => setSelectedIncident('Medical')} />
                   <IncidentType icon={<AlertCircle size={32} />} label="Water Damage" active={selectedIncident === 'Water Damage'} themeMode={themeMode} onClick={() => setSelectedIncident('Water Damage')} />
                   <IncidentType icon={<X size={32} />} label="Trip Cancellation" active={selectedIncident === 'Trip Cancellation'} themeMode={themeMode} onClick={() => setSelectedIncident('Trip Cancellation')} />
                   <IncidentType icon={<Plus size={32} />} label="Other" active={selectedIncident === 'Other'} themeMode={themeMode} onClick={() => setSelectedIncident('Other')} />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className={`text-xl font-black uppercase tracking-tight ${isDark ? 'text-[#F4B400]' : 'text-[#062D7A]'}`}>Step 3 — Incident Details</h4>
                  <p className="text-xs text-slate-405">We require exact coordinates, date timestamps and damage estimates for biometric clearance.</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="Incident Date" placeholder="May 25, 2026" icon={<Clock size={16} />} themeMode={themeMode} />
                    <FormInput label="Incident Time" placeholder="10:00 AM GST" icon={<Clock size={16} />} themeMode={themeMode} />
                  </div>
                  <FormInput label="Location (GPS coordinates)" placeholder="Dubai Marina, UAE" icon={<MapPin size={16} />} themeMode={themeMode} />
                  <FormInput label="Estimated Damage" placeholder="AED 12,850" icon={<TrendingUp size={16} />} themeMode={themeMode} />
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2 block ml-1 font-sans">Evidence Summary Description</label>
                    <textarea 
                      rows={4} 
                      placeholder="My car was clipped by a delivery motorcycle on the Dubai Marina bypass..."
                      className={`w-full border rounded-[28px] p-5 text-xs focus:outline-none transition-all font-semibold ${
                        isDark 
                          ? 'bg-[#111827] border-white/5 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[#F4B400]/20' 
                          : 'bg-white border-slate-200 text-slate-805 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                      }`}
                    ></textarea>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div>
                  <h4 className={`text-xl font-black uppercase tracking-tight ${isDark ? 'text-[#F4B400]' : 'text-[#062D7A]'}`}>Step 4 — Upload Evidence Proof</h4>
                  <p className="text-xs text-slate-450">Photos, videos, and billing receipts speed up our direct payout verification cycles.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                   <UploadZone label="Camera instant Capture" desc="Supports live photo or video file" icon={<Car size={24} />} themeMode={themeMode} />
                   <UploadZone label="Device Gallery selection" desc="Import and encrypt jpeg, png, mp4" icon={<Plus size={24} />} themeMode={themeMode} />
                   <UploadZone label="Scan Document receipts" desc="Direct PDF support for receipts and bills" icon={<FileText size={24} />} themeMode={themeMode} />
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`text-center py-8 px-6 border rounded-[40px] shadow-2xl ${
                isDark ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-blue-900/5'
              }`}>
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto mb-6 shadow-inner animate-pulse">
                  <FileCheck size={40} />
                </div>
                <h4 className={`text-2xl font-black uppercase tracking-tight ${isDark ? 'text-[#F4B400]' : 'text-blue-600'}`}>Secured Verification</h4>
                <p className="text-slate-405 text-xs my-4 leading-relaxed font-semibold">
                  By tapping submit, you agree to GOQii QIC Smart Blockchain verification standards. An AI insurance adjuster processes payouts instantly.
                </p>
                <div className={`p-5 border rounded-3xl text-left mb-6 space-y-2 ${
                  isDark ? 'bg-[#090D1A] border-white/5' : 'bg-slate-50 border-slate-205'
                }`}>
                  <p className="text-[9px] text-slate-500 font-extrabold uppercase mb-2 tracking-wider">Parameters Checklist</p>
                  <SummaryRow label="Policy Trust ID" value="Motor Protect #POL-MT-7721" themeMode={themeMode} />
                  <SummaryRow label="Incident Classification" value={selectedIncident} themeMode={themeMode} />
                  <SummaryRow label="Active GPS Location" value="Dubai Marina, UAE" themeMode={themeMode} />
                  <SummaryRow label="Encrypted Proof Stack" value="03 Media files validated" themeMode={themeMode} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <footer className={`p-6 border-t flex gap-4 ${isDark ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200'}`}>
        {step > 1 && (
          <button 
            onClick={() => setStep(s => s - 1)}
            className={`h-14 w-20 rounded-2xl font-bold flex items-center justify-center transition-all ${
              isDark ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-700'
            }`}
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <button 
          onClick={() => {
            if (step < 5) {
              setStep(s => s + 1);
            } else {
              triggerConfetti("Smart Claim submitted. CLM2026090 created. Estimating payout within hours.");
              onBack();
            }
          }}
          className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-[#F4B400] text-slate-900 font-extrabold tracking-widest uppercase rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-transform text-xs"
          style={{ color: '#090D1A' }}
        >
          {step < 5 ? 'NEXT PARAMETER' : 'TRANSMIT SECURED CLAIM'}
        </button>
      </footer>
    </div>
  );
}

function FormInput({ label, placeholder, icon, themeMode }: { label: string, placeholder: string, icon: React.ReactNode, themeMode?: 'dark' | 'light' }) {
  const isDark = themeMode !== 'light';
  return (
    <div className="space-y-1.5 text-left">
      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className={`h-14 border rounded-2xl flex items-center px-4 gap-4 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all ${
        isDark ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-205'
      }`}>
        <div className={isDark ? 'text-[#F4B400]' : 'text-blue-600'}>{icon}</div>
        <input 
          type="text" 
          placeholder={placeholder}
          className={`bg-transparent border-none outline-none text-xs w-full font-bold ${
            isDark ? 'text-slate-200 placeholder:text-slate-600' : 'text-slate-800 placeholder:text-slate-400'
          }`}
        />
      </div>
    </div>
  );
}

function UploadZone({ label, desc, icon, themeMode }: { label: string, desc: string, icon: React.ReactNode, themeMode?: 'dark' | 'light' }) {
  const isDark = themeMode !== 'light';
  return (
    <button className={`p-5 border-2 border-dashed rounded-3xl flex items-center gap-5 text-left transition-all group active:scale-[0.98] ${
      isDark 
        ? 'border-slate-800 bg-[#111827]/40 hover:border-[#F4B400] hover:bg-white/5' 
        : 'border-slate-300 bg-white hover:border-blue-500 hover:bg-slate-50'
    }`}>
      <div className={`w-14 h-14 border rounded-2xl flex items-center justify-center transition-all ${
        isDark 
          ? 'bg-white/5 border-white/10 text-slate-400 group-hover:bg-white/5 group-hover:text-[#F4B400]' 
          : 'bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
      }`}>
        {icon}
      </div>
      <div>
        <h5 className={`font-extrabold text-sm mb-0.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{label}</h5>
        <p className="text-[10px] text-slate-400 font-medium leading-tight">{desc}</p>
      </div>
    </button>
  );
}

function IncidentType({ icon, label, active = false, themeMode, onClick }: { icon: React.ReactNode, label: string, active?: boolean, themeMode?: 'dark' | 'light', onClick?: () => void }) {
  const isDark = themeMode !== 'light';
  return (
    <button 
      onClick={onClick}
      className={`p-5 rounded-[32px] border flex flex-col items-center gap-3 transition-all text-center ${
        active 
          ? (isDark ? 'border-[#F4B400] bg-[#F4B400]/10 shadow-[0_0_20px_rgba(244,180,0,0.15)] scale-105' : 'border-blue-500 bg-blue-500/10 shadow-sm scale-105') 
          : (isDark ? 'border-white/5 bg-[#111827]/40 hover:border-slate-700' : 'border-slate-200 bg-white hover:border-blue-400')
      }`}
    >
      <div className={`transition-transform duration-300 ${active ? (isDark ? 'text-[#F4B400]' : 'text-blue-600') : 'text-slate-400'}`}>{icon}</div>
      <span className={`text-[10px] font-black uppercase tracking-wider ${active ? (isDark ? 'text-[#F4B400]' : 'text-blue-700') : 'text-slate-500'}`}>{label}</span>
    </button>
  );
}

function WellnessScreen({ navigateTo, themeMode, triggerConfetti }: { navigateTo: (s: Screen) => void, themeMode: 'dark' | 'light', triggerConfetti: (msg?: string) => void }) {
  const isDark = themeMode === 'dark';
  return (
    <div className="pb-8">
      <header className={`p-6 pb-12 border-b shadow-2xl relative overflow-hidden transition-all duration-300 ${
        isDark 
          ? 'bg-[#0F172A] text-white border-white/5' 
          : 'bg-gradient-to-tr from-blue-950 to-slate-900 text-white border-transparent shadow-md'
      }`}>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="flex items-center justify-between mb-8 relative z-10">
           <div>
             <h2 className="text-2xl font-black uppercase tracking-tight">Wellness Hub</h2>
             <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Active Biotech Tracking</p>
           </div>
           <div 
             onClick={() => triggerConfetti("Streak milestone hit! Claimed 250 bonus health points.")}
             className="flex items-center gap-2 bg-gradient-to-r from-gold-500/10 to-gold-500/20 border border-gold-500/30 px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition-transform"
           >
             <div className="w-5 h-5 bg-[#F4B400] rounded-full flex items-center justify-center">
               <Shield size={12} className="text-[#090D1A]" />
             </div>
             <span className="text-xs font-black text-[#F4B400]">{MOCK_USER.points.toLocaleString()} PTS</span>
           </div>
        </div>

        <div className={`border rounded-3xl p-6 relative z-10 glow-green ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1">Dubai Heat Recovery Streak</p>
              <h4 className="text-2xl font-black text-emerald-400">12 Days 🔥</h4>
            </div>
            <div className="text-right">
              <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-1">Global Gym Leader</p>
              <h4 className="text-xl font-bold font-mono text-[#F4B400]">#1,204</h4>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black uppercase ${
                  i < 5 
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-900 shadow-md' 
                    : 'bg-white/10 text-slate-305'
                }`}>
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
      
      <div className="px-6 -mt-8 space-y-6 relative z-10">
        <section className="grid grid-cols-2 gap-4">
          <WellnessAction icon={<Activity size={24} className="text-emerald-400" />} color="bg-emerald-500/10 border border-emerald-500/20" label="Book Session" themeMode={themeMode} />
          <WellnessAction icon={<PhoneCall size={24} className="text-rose-400" />} color="bg-rose-500/10 border border-rose-500/20" label="Teleconsult" themeMode={themeMode} />
          <WellnessAction icon={<Heart size={24} className="text-sky-400" />} color="bg-sky-500/10 border border-sky-500/20" label="Pharmacy Delivery" themeMode={themeMode} />
          <WellnessAction icon={<CheckCircle2 size={24} className="text-purple-400" />} color="bg-purple-500/10 border border-purple-500/20" label="Health Vault" themeMode={themeMode} />
        </section>

        {/* Gamified Whoop Style Challenges */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-extrabold text-sm tracking-widest uppercase ${isDark ? 'text-slate-305' : 'text-slate-800'}`}>ACTIVE OUTDOOR CHALLENGES</h3>
            <span className="text-emerald-500 text-[10px] font-black uppercase tracking-wider animate-pulse">Earn 500+ XP</span>
          </div>
          <div className="space-y-3">
            {MOCK_CHALLENGES.map(challenge => (
               <div key={challenge.id} className={`p-5 rounded-3xl shadow-xl flex flex-col justify-between border transition-all ${
                 isDark ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-blue-900/5'
               }`}>
                 <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl ${
                        challenge.type === 'Steps' 
                          ? 'bg-orange-500/15 text-orange-400 border border-orange-500/20' 
                          : 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                      }`}>
                        {challenge.type === 'Steps' ? <Activity size={18} /> : <Droplet size={18} />}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-805'}`}>{challenge.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">TARGET: {challenge.goal}</p>
                      </div>
                   </div>
                   <div className="text-right">
                     <span className={`text-[11px] font-extrabold ${isDark ? 'text-[#F4B400]' : 'text-blue-600'}`}>+{challenge.reward} Pts</span>
                   </div>
                 </div>
                 {/* Progress Slider Bar */}
                 <div className="space-y-1">
                    <div className={`h-2 border rounded-full overflow-hidden ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-205'}`}>
                       <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" style={{ width: `${(challenge.progress / 10000) * 100}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>{challenge.progress} current</span>
                      <span>{(challenge.reward * 200)} maximum limit</span>
                    </div>
                 </div>
               </div>
            ))}
          </div>
        </section>

        {/* Premium Upgrade Booster */}
        <section className={`border rounded-[40px] p-8 text-white text-center relative overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-b from-[#0F172A] to-[#090D1A] border-white/10' 
            : 'bg-gradient-to-b from-blue-950 to-slate-900 border-transparent shadow-xl'
        }`}>
            <div className="absolute top-0 right-0 p-3 text-gold-500 opacity-10"><Sparkles size={80} /></div>
            <h3 className="text-2xl font-black tracking-tight text-[#F4B400] mb-2">GOQii QIC Premium</h3>
            <p className="text-slate-350 text-xs mb-6 px-4 leading-relaxed">Upgrade to unlock advanced bio-tracking, 0% claim deductibles, and direct premium cashbacks.</p>
            <button 
              onClick={() => triggerConfetti("Congratulations! Requested high premium executive program upgrade.")}
              className="w-full h-14 bg-gradient-to-r from-gold-500 to-[#F4B400] hover:scale-105 active:scale-95 transition-transform text-slate-900 font-black tracking-widest rounded-2xl text-xs"
              style={{ color: '#090D1A' }}
            >
              UPGRADE PLATINUM STACK
            </button>
        </section>
      </div>
    </div>
  );
}

function WellnessAction({ icon, color, label, themeMode }: { icon: React.ReactNode, color: string, label: string, themeMode?: 'dark' | 'light' }) {
  const isDark = themeMode !== 'light';
  return (
    <button className={`p-5 rounded-[28px] flex flex-col gap-4 shadow-xl transition-all text-left border ${
      isDark 
        ? 'bg-[#111827] border-white/5 hover:border-[#F4B400]/40' 
        : 'bg-white border-slate-200 hover:border-blue-500 shadow-blue-900/5'
    }`}>
      <div className={`p-3 rounded-2xl w-fit ${color}`}>
        {icon}
      </div>
      <span className={`text-[11px] font-black uppercase tracking-wide leading-tight ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{label}</span>
    </button>
  );
}

function ProfileScreen({ navigateTo, themeMode, triggerConfetti, showToast, toggleTheme }: { navigateTo: (s: Screen) => void, themeMode: 'dark' | 'light', triggerConfetti: (msg?: string) => void, showToast: (msg: string) => void, toggleTheme: () => void }) {
  const [deviceTrustLevel, setDeviceTrustLevel] = useState('Maximum Encryption');
  const [useEncryptedStorage, setUseEncryptedStorage] = useState(true);
  const isDark = themeMode === 'dark';

  const performAuditLog = () => {
    triggerConfetti("Security audit confirmed: 0 exploits detected. 256-bit encryption active.");
  };

  return (
    <div className="pb-8">
      <header className="p-8 pb-4 flex flex-col items-center text-center relative">
        {/* Toggle Theme in profile */}
        <div className="absolute top-6 right-6">
          <button 
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              isDark ? 'bg-white/5 border border-white/10 text-white' : 'bg-white border border-slate-200 text-slate-750 shadow-sm'
            }`}
          >
            {isDark ? <Sun size={18} className="text-[#F4B400]" /> : <Moon size={18} className="text-blue-600" />}
          </button>
        </div>

        <div className="relative mb-4">
           <img 
            src={MOCK_USER.avatar} 
            alt="User" 
            className="w-24 h-24 rounded-[40px] object-cover ring-4 ring-[#F4B400]/30 shadow-2xl"
          />
          <div className={`absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 border-4 rounded-full flex items-center justify-center text-white shadow-lg ${
            isDark ? 'border-[#090D1A]' : 'border-[#F4F6FC]'
          }`}>
            <Check size={14} className="text-white" />
          </div>
        </div>
        <h2 className={`text-2xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{MOCK_USER.name}</h2>
        <p className="text-xs text-[#F4B400] font-black uppercase tracking-widest mt-1">EMIRATES PREMIUM INVESTOR</p>
      </header>

      <div className="px-6 space-y-6">
        <section className="grid grid-cols-2 gap-4">
          <div className={`p-5 rounded-3xl text-center border ${
            isDark ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-sm shadow-blue-900/5'
          }`}>
            <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">AGGREGATE CLAIMS FILED</p>
            <p className="text-xl font-black text-rose-500 font-display">AED 27,220</p>
          </div>
          <div className={`p-5 rounded-3xl text-center border ${
            isDark ? 'bg-[#111827] border-white/5' : 'bg-white border-slate-200 shadow-sm shadow-blue-900/5'
          }`}>
            <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">CUMULATIVE REWARD VOUCHERS</p>
            <p className="text-xl font-black text-emerald-400 font-display">AED 1,180</p>
          </div>
        </section>

        {/* Security Controls card */}
        <section className={`p-5 border rounded-3xl space-y-4 ${
          isDark 
            ? 'bg-gradient-to-r from-red-500/5 to-transparent border-rose-500/10' 
            : 'bg-white border-red-200 shadow-sm'
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-[#FF4D67]" />
              <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Device Trust Security level</span>
            </div>
            <span className="text-[9px] font-extrabold text-[#F4B400] uppercase tracking-wider">{deviceTrustLevel}</span>
          </div>

          <div className={`flex justify-between items-center pt-2 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
            <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-slate-400' : 'text-slate-550'}`}>Encrypted local cache storage</span>
            <button 
              onClick={() => {
                setUseEncryptedStorage(!useEncryptedStorage);
                showToast(`Encrypted claimed files cache ${!useEncryptedStorage ? 'Enabled' : 'Disabled'}`);
              }}
              className={`w-9 h-5 rounded-full transition-colors relative ${useEncryptedStorage ? 'bg-emerald-500' : 'bg-slate-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${useEncryptedStorage ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>
        </section>

        {/* Profile general settings */}
        <section className="space-y-2">
          <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-3">TRUST CLEARANCES</h3>
          <ProfileLink icon={<UserIcon size={20} />} label="Personal Information stack" themeMode={themeMode} onClick={() => showToast("Loaded secure KYC details.")} />
          <ProfileLink icon={<CreditCard size={20} />} label="Apple Pay Premium wallet" themeMode={themeMode} onClick={() => showToast("Ready for Apple Pay transactions.")} />
          <ProfileLink icon={<Bell size={20} />} label="Emergency priority notifications" badge="3" themeMode={themeMode} onClick={() => showToast("Cleared 3 system updates.")} />
          <ProfileLink icon={<Lock size={20} />} label="FIDO Biometrics Audit" themeMode={themeMode} onClick={performAuditLog} />
        </section>

        <section className="space-y-2">
          <h3 className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-4 mb-3">Support Services</h3>
          <ProfileLink icon={<PhoneCall size={20} />} label="Concierge Helpdesk" themeMode={themeMode} onClick={() => showToast("Calling private concierge support...")} />
          <ProfileLink icon={<FileText size={20} />} label="Encrypted Privacy Policy" themeMode={themeMode} onClick={() => showToast("Loaded privacy policy ledger.")} />
        </section>

        <button 
          onClick={() => {
            showToast("Securely signed out from local keychain.");
            navigateTo('login');
          }}
          className="w-full h-15 border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/15 text-rose-500 rounded-[28px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 mt-8 active:scale-98 transition-all"
        >
          Key Sign Out
        </button>
      </div>
    </div>
  );
}

function ProfileLink({ icon, label, badge, themeMode, onClick }: { icon: React.ReactNode, label: string, badge?: string, themeMode?: 'dark' | 'light', onClick?: () => void }) {
  const isDark = themeMode !== 'light';
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 border rounded-2xl transition-colors ${
      isDark ? 'bg-[#111827] border-white/5 hover:border-slate-705' : 'bg-white border-slate-200 hover:border-blue-400 shadow-sm shadow-blue-900/5'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 border rounded-xl flex items-center justify-center ${
          isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          {icon}
        </div>
        <span className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge && (
          <span className="bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-tighter">{badge}</span>
        )}
        <ChevronRight size={18} className="text-slate-500" />
      </div>
    </button>
  );
}
