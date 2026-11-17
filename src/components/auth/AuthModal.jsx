import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Key, 
  ShieldCheck, 
  GraduationCap, 
  Users, 
  Check, 
  Lock, 
  ArrowRight,
  Database,
  LogIn
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, role, setRole, users, setShowLoginPage } = useApp();
  const [selectedRole, setSelectedRole] = useState(role);

  if (!authModalOpen) return null;

  const handleSwitch = (newRole) => {
    setSelectedRole(newRole);
    setRole(newRole);
    setAuthModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAuthModalOpen(false)}
          className="fixed inset-0 bg-[#0B0D12]/80 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="relative w-full max-w-md rounded-2xl glass-modal z-10 overflow-hidden shadow-2xl border border-white/[0.14]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-semibold text-[#F1F5F9]">
                  Authentication & Persona Matrix
                </h3>
                <p className="text-[10px] font-mono-tabular text-[#94A3B8]">
                  OAuth2 / JWT Token Session
                </p>
              </div>
            </div>
            <button
              onClick={() => setAuthModalOpen(false)}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Persona Selection */}
          <div className="p-6 space-y-4">
            <p className="text-xs text-[#94A3B8]">
              Switch active authentication profile to verify role-based permissions (RBAC) and contextual views:
            </p>

            <div className="space-y-2.5">
              {[
                {
                  id: 'student',
                  user: users.student,
                  icon: GraduationCap,
                  accent: 'glacier',
                  desc: 'Owns milestone tasks, document submissions & AI execution'
                },
                {
                  id: 'mentor',
                  user: users.mentor,
                  icon: Users,
                  accent: 'emerald',
                  desc: 'Supervises capstone teams, reviews specs & signs off milestones'
                },
                {
                  id: 'admin',
                  user: users.admin,
                  icon: ShieldCheck,
                  accent: 'coral',
                  desc: 'Manages RBAC permission matrix, platform SLAs & audit logs'
                }
              ].map((item) => {
                const Icon = item.icon;
                const isCurrent = role === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSwitch(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-white/[0.08] border-[#38BDF8]/50 shadow-glacier-glow'
                        : 'glass-panel border-white/[0.08] hover:border-white/[0.2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.user.avatar}
                        alt={item.user.name}
                        className="w-10 h-10 rounded-lg object-cover border border-white/[0.12]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#F1F5F9]">
                            {item.user.name}
                          </span>
                          <Badge variant={isCurrent ? 'glacier' : 'slate'} size="xs">
                            {item.user.badge}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] mt-0.5 line-clamp-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {isCurrent ? (
                      <Check className="w-4 h-4 text-[#38BDF8] shrink-0" strokeWidth={2} />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-[#94A3B8] shrink-0" strokeWidth={1.5} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Full Sample Login Gateway Button */}
            <button
              onClick={() => {
                setAuthModalOpen(false);
                setShowLoginPage(true);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-[#F1F5F9] border border-white/[0.1] hover:border-[#38BDF8]/40 flex items-center justify-center gap-2 transition-all shadow-sm group"
            >
              <LogIn className="w-3.5 h-3.5 text-[#38BDF8] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span>Open Dedicated Full-Screen Sample Login Portals</span>
            </button>

            {/* Flask API Integration Hint */}
            <div className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] space-y-1.5 font-mono-tabular">
              <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Database className="w-3 h-3" />
                  Flask REST Service Adapter
                </span>
                <span className="text-xs text-white">READY</span>
              </div>
              <div className="text-[10px] text-[#94A3B8] truncate">
                Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
