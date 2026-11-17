import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Search, 
  Bell, 
  Layers, 
  ChevronDown
} from 'lucide-react';
import { NotificationPopover } from './NotificationPopover';
import { ProfilePopover } from './ProfilePopover';

export const TopNavigation = () => {
  const { 
    role, 
    currentUser, 
    notifications, 
    setCommandPaletteOpen, 
    aiDrawerOpen, 
    setAiDrawerOpen
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-white/[0.08] bg-[#0B0D12]/70 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand & Platform Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] shadow-inner group">
            <Layers className="w-4 h-4 text-[#00F2FE] transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} />
            <div className="absolute inset-0 rounded-lg bg-[#00F2FE]/15 blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono-tabular text-sm font-bold tracking-wider text-white">
                Aetheris OS
              </span>
              <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-white/[0.06] text-[#CBD5E1] border border-white/[0.08]">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-[#CBD5E1] tracking-tight hidden sm:block">
              Adaptive Research Governance & AI Mentorship
            </p>
          </div>
        </div>

        {/* Center: Contextual Active Workspace Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono-tabular">
          <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
          <span className="text-[#CBD5E1]">Workspace:</span>
          <span className="font-semibold text-white">
            {role === 'student' && "Student Capstone Execution"}
            {role === 'mentor' && "Faculty Advisory & Oversight"}
            {role === 'admin' && "Department Governance Console"}
          </span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#00F2FE] font-medium">{currentUser.badge}</span>
        </div>

        {/* Right Action Suite */}
        <div className="flex items-center gap-2.5">
          {/* Quick Command Palette Launcher */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.16] text-xs text-[#94A3B8] transition-all group"
            title="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors" strokeWidth={1.5} />
            <span className="font-normal text-xs text-[#94A3B8]">Search or action...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono-tabular text-[#94A3B8] border border-white/[0.08]">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </button>

          {/* AI Intelligence Drawer Trigger (Warm Gold/Orange) */}
          <button
            onClick={() => setAiDrawerOpen(!aiDrawerOpen)}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              aiDrawerOpen 
                ? 'bg-[#FF6B00]/15 text-[#FF8533] border border-[#FF6B00]/40 shadow-warm-orange' 
                : 'bg-[#FF6B00]/10 hover:bg-[#FF6B00]/15 text-[#FF8533] border border-[#FF6B00]/25 hover:border-[#FF6B00]/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" strokeWidth={1.5} />
            <span className="hidden sm:inline text-white">AI Copilot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.14] text-[#CBD5E1] hover:text-white transition-all"
              title="Notifications"
            >
              <Bell className="w-4 h-4" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00F2FE] text-[#06070B] text-[10px] font-mono-tabular font-bold flex items-center justify-center shadow-sm shadow-[#00F2FE]/50">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationPopover
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          </div>

          {/* User Profile Section with Cyan Highlighted Border */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className={`flex items-center gap-2.5 p-1 pl-2.5 rounded-xl transition-all group text-left ${
                profileOpen
                  ? 'bg-white/[0.08] border border-[#00F2FE]/50 shadow-neon-cyan'
                  : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#00F2FE]/30'
              }`}
            >
              <div className="hidden lg:block text-right">
                <div className="text-xs font-semibold text-white leading-tight group-hover:text-[#00F2FE] transition-colors">
                  {currentUser.name}
                </div>
                <div className="text-[10px] font-mono-tabular text-[#00F2FE] leading-none mt-0.5">
                  {currentUser.badge}
                </div>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover ring-2 ring-[#00F2FE] border border-[#00F2FE]/50 shadow-sm shadow-[#00F2FE]/30"
              />
              <ChevronDown className={`w-3.5 h-3.5 text-[#CBD5E1] transition-transform duration-200 ${profileOpen ? 'rotate-180 text-[#00F2FE]' : 'group-hover:text-white'}`} strokeWidth={1.5} />
            </button>

            <ProfilePopover
              isOpen={profileOpen}
              onClose={() => setProfileOpen(false)}
            />
          </div>
        </div>

      </div>
    </header>
  );
};
