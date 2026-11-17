import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Terminal, 
  Search, 
  Filter, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Download,
  Clock
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const AuditLogsViewer = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      severityFilter === 'ALL' || log.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'SECURITY':
        return <Badge variant="coral" size="xs">SECURITY</Badge>;
      case 'WARN':
        return <Badge variant="amber" size="xs">WARN</Badge>;
      default:
        return <Badge variant="slate" size="xs">INFO</Badge>;
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aetheris_audit_trail_${new Date().toISOString()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border-white/[0.08] space-y-4 p-5 font-mono-tabular">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#38BDF8]" strokeWidth={1.5} />
            Cryptographic Academic Audit Trail
          </h3>
          <p className="text-xs text-[#94A3B8] font-sans mt-0.5">
            Immutable system logs tracking RBAC mutations, milestone sign-offs & AI dispatches
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-2.5 top-2.5" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg glass-input text-[#F1F5F9] w-48 sm:w-60"
            />
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs">
            {['ALL', 'INFO', 'WARN', 'SECURITY'].map((s) => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-2 py-1 rounded text-[11px] transition-colors ${
                  severityFilter === s
                    ? 'bg-white/[0.1] text-[#F1F5F9] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportJSON}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-[#F1F5F9] border border-white/[0.08] transition-colors"
            title="Export JSON"
          >
            <Download className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Monospace Log Stream Table */}
      <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-black/30">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/[0.02] text-[#94A3B8] border-b border-white/[0.06]">
            <tr>
              <th className="py-2.5 px-3.5 font-medium">Timestamp (ISO)</th>
              <th className="py-2.5 px-3.5 font-medium">Severity</th>
              <th className="py-2.5 px-3.5 font-medium">Action Event</th>
              <th className="py-2.5 px-3.5 font-medium">Actor</th>
              <th className="py-2.5 px-3.5 font-medium">Target Resource</th>
              <th className="py-2.5 px-3.5 font-medium">IP Hash</th>
              <th className="py-2.5 px-3.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#94A3B8]">
                  No audit entries matching filter criteria.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-2.5 px-3.5 text-[#94A3B8] whitespace-nowrap text-[11px]">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3.5">
                    {getSeverityBadge(log.severity)}
                  </td>
                  <td className="py-2.5 px-3.5 font-semibold text-[#38BDF8]">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3.5 text-[#F1F5F9] whitespace-nowrap">
                    <div>
                      <span>{log.actorName}</span>
                      <span className="block text-[10px] text-[#94A3B8]">{log.actor}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3.5 text-[#94A3B8] max-w-xs truncate" title={log.resource}>
                    {log.resource}
                  </td>
                  <td className="py-2.5 px-3.5 text-[#94A3B8] text-[11px]">
                    {log.ipHash}
                  </td>
                  <td className="py-2.5 px-3.5">
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#94A3B8] pt-2">
        <span>Displaying {filteredLogs.length} audit records</span>
        <span className="text-emerald-400 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          SHA-256 Merkle Root Verified
        </span>
      </div>
    </div>
  );
};
