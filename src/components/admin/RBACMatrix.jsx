import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Unlock, 
  Check, 
  X, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const RBACMatrix = () => {
  const { rbacMatrix, togglePermission } = useApp();

  const permissionsList = [
    { key: 'readProject', label: 'Read Project', desc: 'Browse capstone proposals & telemetry' },
    { key: 'writeTasks', label: 'Write Tasks', desc: 'Create, update & transition Kanban cards' },
    { key: 'uploadDocuments', label: 'Upload Docs', desc: 'Submit deliverables & PDF architectures' },
    { key: 'approveMilestones', label: 'Sign Milestones', desc: 'Authorize academic milestone pass/fail' },
    { key: 'gradeDeliverables', label: 'Assign Grades', desc: 'Publish numerical scores (0-100)' },
    { key: 'triggerAIEngine', label: 'AI Copilot', desc: 'Run roadmap synthesis & token operations' },
    { key: 'viewAuditLogs', label: 'Audit Logs', desc: 'Access monospace compliance logs' },
    { key: 'mutateRBAC', label: 'RBAC Mutate', desc: 'Change permissions matrix dynamically' },
  ];

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border-white/[0.08] p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" strokeWidth={1.5} />
            Role-Based Access Control (RBAC) Governance Matrix
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Granular capability matrix enforced at API gateway boundary for Flask REST endpoints
          </p>
        </div>
        <Badge variant="emerald" size="xs">
          Enforcement: Active
        </Badge>
      </div>

      {/* Permissions Matrix Table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-black/20">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/[0.03] text-[#94A3B8] border-b border-white/[0.06] font-mono-tabular">
            <tr>
              <th className="py-3 px-4 font-semibold text-[#F1F5F9]">System Persona</th>
              {permissionsList.map((perm) => (
                <th key={perm.key} className="py-3 px-3 font-medium text-center" title={perm.desc}>
                  <span className="block text-[11px] whitespace-nowrap">{perm.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rbacMatrix.map((role) => (
              <tr key={role.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#F1F5F9] text-xs">
                      {role.name}
                    </span>
                    <span className="text-[10px] font-mono-tabular px-1.5 py-0.2 rounded bg-white/[0.05] text-[#94A3B8]">
                      {role.usersCount} users
                    </span>
                  </div>
                  <span className="text-[11px] text-[#94A3B8] block mt-0.5 max-w-xs truncate">
                    {role.description}
                  </span>
                </td>

                {permissionsList.map((perm) => {
                  const isGranted = role.permissions[perm.key];
                  return (
                    <td key={perm.key} className="py-3.5 px-3 text-center">
                      <button
                        onClick={() => togglePermission(role.id, perm.key)}
                        title={`Click to toggle ${perm.label} for ${role.name}`}
                        className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                          isGranted
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 shadow-sm'
                            : 'bg-white/[0.03] text-[#94A3B8]/40 border border-white/[0.06] hover:bg-white/[0.08] hover:text-[#94A3B8]'
                        }`}
                      >
                        {isGranted ? (
                          <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                        ) : (
                          <X className="w-3.5 h-3.5" strokeWidth={2} />
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#94A3B8] pt-2">
        <span className="flex items-center gap-1.5 font-mono-tabular text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
          Mutations immediately propagate to Redis Token Revocation Cache & Flask Auth Middleware
        </span>
        <span className="font-mono-tabular text-[11px]">
          5 Roles • 40 Granular Rule Nodes
        </span>
      </div>
    </div>
  );
};
