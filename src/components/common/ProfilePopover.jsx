import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  LogOut, 
  Key, 
  Check, 
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';
import { Badge } from './Badge';

export const ProfilePopover = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    role, 
    loginAs, 
    logout, 
    users 
  } = useApp();

  const popoverRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const portals = [
    {
      id: 'student',
      label: 'Student Portal Login',
      user: users.student,
      icon: GraduationCap,
      accent: 'glacier',
      desc: 'Alex Mercer • Capstone Lead'
    },
    {
      id: 'mentor',
      label: 'Faculty & Mentor Portal Login',
      user: users.mentor,
      icon: Users,
      accent: 'amber',
      desc: 'Dr. Elena Vance • Faculty Advisor'
    },
    {
      id: 'admin',
      label: 'Admin Console Login',
      user: users.admin,
      icon: ShieldCheck,
      accent: 'coral',
      desc: 'Marcus Thorne • System Admin'
    }
  ];

  const handlePortalSwitch = (targetRole) => {
    loginAs(targetRole);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popoverRef}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute right-0 top-12 w-80 rounded-2xl glass-modal z-50 overflow-hidden shadow-2xl border border-white/[0.14]"
        >
          {/* User Profile Header */}
          <div className="p-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#00F2FE] border border-[#00F2FE]/50 shadow-sm shadow-[#00F2FE]/30"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white truncate">
                    {currentUser.name}
                  </h4>
                  <Badge variant="cyan" size="xs">
                    {currentUser.badge}
                  </Badge>
                </div>
                <p className="text-[11px] text-[#CBD5E1] font-mono-tabular truncate mt-0.5">
                  {currentUser.email}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#CBD5E1] pt-3 mt-3 border-t border-white/[0.04]">
              <span className="flex items-center gap-1 text-[#14B8A6]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
                Active Session: OAuth2 JWT
              </span>
              <span>86.4k TTL</span>
            </div>
          </div>

          {/* Sample Login Portals Section */}
          <div className="p-3 space-y-1.5 border-b border-white/[0.06]">
            <span className="text-[10px] font-mono-tabular text-[#CBD5E1] uppercase px-2 block">
              Sample Login Portals:
            </span>

            {portals.map((p) => {
              const Icon = p.icon;
              const isCurrent = role === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePortalSwitch(p.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-all ${
                    isCurrent
                      ? 'bg-white/[0.08] text-white border border-[#00F2FE]/40 shadow-sm shadow-[#00F2FE]/20'
                      : 'text-[#CBD5E1] hover:text-white hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${
                      p.accent === 'amber' ? 'bg-[#FF6B00]/15 text-[#FF8533]' :
                      p.accent === 'coral' ? 'bg-[#FF007F]/15 text-[#FF2E93]' :
                      'bg-[#00F2FE]/15 text-[#00F2FE]'
                    }`}>
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="font-semibold text-xs block leading-tight text-white">
                        {p.label}
                      </span>
                      <span className="text-[10px] text-[#CBD5E1] font-mono-tabular">
                        {p.desc}
                      </span>
                    </div>
                  </div>

                  {isCurrent && (
                    <Check className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" strokeWidth={2} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sign Out Button */}
          <div className="p-2.5 bg-white/[0.01]">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#FF2E93] hover:bg-[#FF007F]/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Log Out to Login Gateway</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
