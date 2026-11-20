import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Key, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ShieldAlert,
  Smartphone,
  Fingerprint,
  ChevronRight,
  X
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const LoginPage = ({ onClose }) => {
  const { loginAs, role, users, showLoginPage, setShowLoginPage } = useApp();

  const [portalType, setPortalType] = useState(role || 'student'); // 'student' | 'mentor' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states initialized with sample data for each role
  const sampleCredentials = {
    student: {
      email: "alex.mercer@student.edu",
      id: "STUDENT-ID: 2026-CS-8901",
      password: "••••••••••••",
      meta: "Senior Fall Capstone (Cohort Alpha) • Project: Edge-AI Traffic Telemetry",
      user: users.student
    },
    mentor: {
      email: "elena.vance@mit.edu",
      id: "FACULTY-ID: CS-FAC-4019",
      password: "••••••••••••",
      meta: "Associate Professor of Distributed Systems • 4 Supervised Engineering Pods",
      user: users.mentor
    },
    admin: {
      email: "marcus.thorne@admin.edu",
      id: "ADMIN-UPN: sec-root-0028",
      password: "••••••••••••",
      meta: "Academic Systems & RBAC Governance • Zero-Trust Policy Engine",
      user: users.admin
    }
  };

  const currentCreds = sampleCredentials[portalType];

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      loginAs(portalType);
    }, 450);
  };

  const portals = [
    {
      id: 'student',
      label: 'Student Portal',
      icon: GraduationCap,
      accent: 'glacier',
      badge: 'Student Researcher',
      description: 'Access Kanban boards, sprint telemetry, and AI Copilot'
    },
    {
      id: 'mentor',
      label: 'Faculty & Mentor Portal',
      icon: Users,
      accent: 'amber',
      badge: 'Faculty Advisor',
      description: 'Supervise multi-team health, grade deliverables & sign off milestones'
    },
    {
      id: 'admin',
      label: 'Department Admin Console',
      icon: ShieldCheck,
      accent: 'coral',
      badge: 'System Admin',
      description: 'Zero-trust RBAC policy engine, cluster SLA & audit trail'
    }
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between py-8 px-4 sm:px-6">
      
      {/* Top Header */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.1] shadow-inner">
            <Layers className="w-5 h-5 text-[#00F2FE]" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono-tabular text-sm font-bold tracking-wider text-white">
                Aetheris OS
              </span>
              <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-white/[0.06] text-[#CBD5E1] border border-white/[0.08]">
                AUTH GATEWAY v2.4
              </span>
            </div>
            <p className="text-[11px] text-[#CBD5E1]">
              Academic Research Governance & AI Mentorship System
            </p>
          </div>
        </div>

        {/* Back to Workspace button if authenticated */}
        {showLoginPage && (
          <button
            onClick={() => setShowLoginPage(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-white border border-white/[0.08] hover:border-[#00F2FE]/40 transition-colors"
          >
            <span>Return to Workspace</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#00F2FE]" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Main Authentication Container */}
      <div className="max-w-4xl w-full mx-auto my-6">
        
        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6 p-1.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
          {portals.map((p) => {
            const Icon = p.icon;
            const isSelected = portalType === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPortalType(p.id)}
                className={`relative flex flex-col p-3.5 rounded-xl text-left transition-all ${
                  isSelected
                    ? 'bg-white/[0.08] border border-white/[0.14] shadow-glass-panel'
                    : 'hover:bg-white/[0.03] border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${
                      p.accent === 'amber' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' :
                      p.accent === 'coral' ? 'bg-[#F43F5E]/15 text-[#F43F5E]' :
                      'bg-[#38BDF8]/15 text-[#38BDF8]'
                    }`}>
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-semibold text-[#F1F5F9]">
                      {p.label}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#38BDF8] shadow-sm shadow-[#38BDF8]/50" />
                  )}
                </div>
                <p className="text-[11px] text-[#94A3B8] leading-tight">
                  {p.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Portal-Specific Login Card */}
        <div className="glass-modal rounded-3xl p-6 sm:p-10 border border-white/[0.12] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Glow for active role */}
          <div 
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] pointer-events-none opacity-20"
            style={{
              backgroundColor: portalType === 'student' ? '#38BDF8' : portalType === 'mentor' ? '#F59E0B' : '#F43F5E'
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant={portalType === 'student' ? 'glacier' : portalType === 'mentor' ? 'amber' : 'coral'} 
                    size="sm"
                  >
                    {currentCreds.user.badge}
                  </Badge>
                  <span className="text-xs text-[#94A3B8] font-mono-tabular">
                    Institutional SSO Enabled
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#F1F5F9] tracking-tight">
                  {portalType === 'student' && "Student Capstone Sign In"}
                  {portalType === 'mentor' && "Faculty Advisory & Oversight Sign In"}
                  {portalType === 'admin' && "Department Governance Console Sign In"}
                </h2>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  {currentCreds.meta}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4">
                
                {/* Email / Username Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94A3B8] flex items-center justify-between">
                    <span>
                      {portalType === 'student' && "Academic Email or Student NetID"}
                      {portalType === 'mentor' && "Institutional Faculty Email"}
                      {portalType === 'admin' && "Administrator Principal UPN"}
                    </span>
                    <span className="text-[10px] font-mono-tabular text-[#38BDF8]">
                      Sample Credentials Loaded
                    </span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" strokeWidth={1.5} />
                    <input
                      type="email"
                      readOnly
                      value={currentCreds.email}
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl glass-input text-[#F1F5F9] font-mono-tabular"
                    />
                  </div>
                </div>

                {/* ID or Secondary Auth */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#94A3B8]">
                    {portalType === 'student' && "Capstone Cohort Registration ID"}
                    {portalType === 'mentor' && "Duo 2FA Security Token / Faculty Code"}
                    {portalType === 'admin' && "Hardware Security Key (FIDO2 / U2F Pin)"}
                  </label>
                  <div className="relative">
                    {portalType === 'student' ? (
                      <GraduationCap className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" strokeWidth={1.5} />
                    ) : portalType === 'mentor' ? (
                      <Smartphone className="w-4 h-4 text-[#F59E0B] absolute left-3 top-3" strokeWidth={1.5} />
                    ) : (
                      <Fingerprint className="w-4 h-4 text-[#F43F5E] absolute left-3 top-3" strokeWidth={1.5} />
                    )}
                    <input
                      type="text"
                      readOnly
                      value={currentCreds.id}
                      className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl glass-input text-[#F1F5F9] font-mono-tabular"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-[#94A3B8]">
                      Secure Password
                    </label>
                    <span className="text-[11px] text-[#38BDF8] hover:underline cursor-pointer">
                      Forgot credentials?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3 top-3" strokeWidth={1.5} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      readOnly
                      value="CapstonePass2026!"
                      className="w-full text-xs pl-9 pr-10 py-2.5 rounded-xl glass-input text-[#F1F5F9] font-mono-tabular"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-[#94A3B8] hover:text-[#F1F5F9]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" strokeWidth={1.5} /> : <Eye className="w-4 h-4" strokeWidth={1.5} />}
                    </button>
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                    portalType === 'student'
                      ? 'bg-[#00F2FE] text-[#06070B] hover:bg-[#38BDF8] shadow-neon-cyan hover:shadow-neon-cyan-lg'
                      : portalType === 'mentor'
                      ? 'bg-[#FF6B00] text-[#06070B] hover:bg-[#FF8533] shadow-warm-orange'
                      : 'bg-[#FF007F] text-white hover:bg-[#FF2E93] shadow-neon-pink'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Authenticating & Loading Workspace...
                    </span>
                  ) : (
                    <>
                      <span>Enter as {currentCreds.user.name} ({currentCreds.user.badge})</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </form>

              {/* Institutional Single Sign-On Alternates */}
              <div className="pt-2 border-t border-white/[0.06] space-y-2.5">
                <span className="text-[10px] font-mono-tabular text-[#94A3B8] uppercase block">
                  Federated Identity Providers:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-tabular">
                  <button
                    onClick={handleLogin}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-[#F1F5F9] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="text-[#38BDF8]">InCommon</span> SSO
                  </button>
                  <button
                    onClick={handleLogin}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-[#F1F5F9] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="text-emerald-400">Eduroam</span> Federation
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Persona Card & Academic Bio (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl glass-panel border-white/[0.08] bg-black/30 space-y-5">
              
              <div className="flex items-center gap-3.5">
                <img
                  src={currentCreds.user.avatar}
                  alt={currentCreds.user.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-white/[0.14] shadow-md"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#F1F5F9]">
                    {currentCreds.user.name}
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] font-mono-tabular">
                    {currentCreds.user.title}
                  </p>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono-tabular">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Academic Identity
                  </span>
                </div>
              </div>

              {/* Persona Context Highlights */}
              <div className="space-y-2.5 text-xs">
                <span className="text-[10px] font-mono-tabular text-[#94A3B8] uppercase">
                  Workspace Scope & Authorizations:
                </span>

                {portalType === 'student' && (
                  <ul className="space-y-2 text-[#94A3B8] text-[11px]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38BDF8] mt-0.5">›</span>
                      <span>Assigned to <strong>Capstone: Edge-AI Traffic Telemetry</strong> (Lead Architect)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38BDF8] mt-0.5">›</span>
                      <span>Kanban sprint task authoring & commit binding permissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38BDF8] mt-0.5">›</span>
                      <span>Access to Gemini 1.5 Pro Edge AI Copilot & LaTeX drafting tools</span>
                    </li>
                  </ul>
                )}

                {portalType === 'mentor' && (
                  <ul className="space-y-2 text-[#94A3B8] text-[11px]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F59E0B] mt-0.5">›</span>
                      <span>Supervises 4 Senior Capstone pods (Team Alpha, Beta, Gamma, Delta)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F59E0B] mt-0.5">›</span>
                      <span>Authority to sign off milestones (M1 to M6) and issue official grades</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F59E0B] mt-0.5">›</span>
                      <span>Split-screen inline feedback annotation on submitted PDF architectures</span>
                    </li>
                  </ul>
                )}

                {portalType === 'admin' && (
                  <ul className="space-y-2 text-[#94A3B8] text-[11px]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#F43F5E] mt-0.5">›</span>
                      <span>Department-level RBAC rule mutation and user role matrix administration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F43F5E] mt-0.5">›</span>
                      <span>System-wide compute cluster telemetry & SLA analytics monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F43F5E] mt-0.5">›</span>
                      <span>Cryptographic SHA-256 audit log inspection and export rights</span>
                    </li>
                  </ul>
                )}
              </div>

              {/* Security Policy Badge */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono-tabular text-[#94A3B8] space-y-1">
                <div className="flex justify-between">
                  <span>Session Policy:</span>
                  <span className="text-emerald-400">OAuth2.0 / JWT Rolling</span>
                </div>
                <div className="flex justify-between">
                  <span>Token Validity:</span>
                  <span className="text-[#F1F5F9]">86,400s (24 Hours)</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Footer Info */}
      <div className="max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-tabular text-[#94A3B8]">
        <div>
          <span>AETHERIS Academic OS • Secure Identity Federation</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Gateway: 18ms latency • TLS 1.3
          </span>
          <span>InCommon ID: #8849-ACAD</span>
        </div>
      </div>

    </div>
  );
};
