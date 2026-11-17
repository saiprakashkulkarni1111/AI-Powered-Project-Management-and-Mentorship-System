import React from 'react';
import { useApp } from '../../context/AppContext';
import { RBACMatrix } from './RBACMatrix';
import { SystemAnalytics } from './SystemAnalytics';
import { AuditLogsViewer } from './AuditLogsViewer';
import { 
  ShieldCheck, 
  Terminal, 
  BarChart3, 
  Lock, 
  Layers, 
  Server, 
  Key,
  FileCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const AdminDashboard = () => {
  const { activeAdminView, setActiveAdminView } = useApp();

  return (
    <div className="space-y-6">
      {/* Admin Bento Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Bento: Admin Governance Header (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="coral" size="xs">
                GOVERNANCE & SYSTEM SECURITY CONSOLE
              </Badge>
              <span className="text-xs text-[#94A3B8]">
                School of Computing
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F1F5F9] tracking-tight">
              Academic Security & RBAC Governance Operations
            </h1>
            <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed">
              Enforce least-privilege role matrices, monitor compute cluster utilization, and inspect cryptographic audit trails across all 48 Capstone research teams.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-white/[0.06] text-xs font-mono-tabular">
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Policy Engine</span>
              <span className="font-semibold text-emerald-400">
                Active (Zero-Trust)
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">RBAC Roles</span>
              <span className="font-semibold text-[#F1F5F9]">
                5 Defined Personas
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Total Monitored Users</span>
              <span className="font-semibold text-[#38BDF8]">
                222 Registered
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Audit Integrity</span>
              <span className="font-semibold text-emerald-400">
                SHA-256 Validated
              </span>
            </div>
          </div>
        </div>

        {/* Right Bento: API Gateway Telemetry (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-panel flex flex-col justify-between border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#F1F5F9] flex items-center gap-1.5">
              <Server className="w-4 h-4 text-[#38BDF8]" strokeWidth={1.5} />
              API Gateway State
            </span>
            <Badge variant="glacier" size="xs">
              Flask 3.0 REST
            </Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-black/20 border border-white/[0.04] space-y-2 text-xs font-mono-tabular my-2">
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">CORS Policy:</span>
              <span className="text-emerald-400">Strict (Origin Whitelist)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">JWT Secret Expiry:</span>
              <span className="text-[#F1F5F9]">86,400s (Rolling)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94A3B8]">Audit Merkle Depth:</span>
              <span className="text-[#38BDF8]">Level 16 Tree</span>
            </div>
          </div>

          <div className="text-[11px] font-mono-tabular text-[#94A3B8] text-center pt-1">
            System uptime: 99.98% • Latency: 24ms p99
          </div>
        </div>
      </div>

      {/* Admin View Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] w-fit">
        {[
          { id: 'matrix', label: 'RBAC Permission Matrix', icon: ShieldCheck },
          { id: 'analytics', label: 'Platform Analytics', icon: BarChart3 },
          { id: 'audit', label: 'Monospace Audit Trail', icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeAdminView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminView(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-white/[0.08] text-[#F1F5F9] border border-white/[0.12] shadow-sm'
                  : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.02]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`} strokeWidth={1.5} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active View */}
      {activeAdminView === 'matrix' && <RBACMatrix />}
      {activeAdminView === 'analytics' && <SystemAnalytics />}
      {activeAdminView === 'audit' && <AuditLogsViewer />}

    </div>
  );
};
