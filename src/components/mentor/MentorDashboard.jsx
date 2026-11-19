import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MilestoneApprovalCenter } from './MilestoneApprovalCenter';
import { 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  GitCommit, 
  ArrowRight, 
  ShieldAlert, 
  ExternalLink,
  MessageSquare,
  Sparkles,
  Layers,
  Award
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const MentorDashboard = () => {
  const { 
    teams, 
    activeMentorView, 
    setActiveMentorView, 
    setSelectedDocument, 
    documents,
    setAiDrawerOpen,
    setAiActiveTab
  } = useApp();

  const [filter, setFilter] = useState('all'); // 'all' | 'high_risk' | 'in_review' | 'on_track'

  const filteredTeams = teams.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const highRiskCount = teams.filter(t => t.status === 'high_risk').length;
  const pendingApprovalsCount = teams.reduce((acc, t) => acc + t.pendingDeliverables, 0);

  return (
    <div className="space-y-6">
      
      {/* Mentor Overview Bento Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Bento: Faculty Director Summary (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between border-white/[0.08]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="glacier" size="xs">
                FACULTY SUPERVISORY COHORT 2026
              </Badge>
              <span className="text-xs text-[#94A3B8]">
                Department of Computer Science
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#F1F5F9] tracking-tight">
              Capstone Supervision & Multi-Team Health Matrix
            </h1>
            <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed">
              Real-time oversight across 4 autonomous capstone engineering clusters. Track hardware burn-in telemetry, milestone delivery SLA, and peer-reviewed thesis drafts.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-white/[0.06] text-xs font-mono-tabular">
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Monitored Teams</span>
              <span className="font-semibold text-[#F1F5F9]">
                4 Engineering Pods
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">High Risk / Blocked</span>
              <span className="font-semibold text-[#F43F5E] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                {highRiskCount} Team At Risk
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Pending Sign-offs</span>
              <span className="font-semibold text-[#F59E0B]">
                {pendingApprovalsCount} Deliverables
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#94A3B8] block">Mean Review SLA</span>
              <span className="font-semibold text-emerald-400">
                14.2 Hours Avg
              </span>
            </div>
          </div>
        </div>

        {/* Right Bento: Urgent Faculty Action Callout (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-panel flex flex-col justify-between border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#F1F5F9] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-[#F43F5E]" strokeWidth={1.5} />
              AI Risk Alert Flag
            </span>
            <Badge variant="coral" size="xs">
              Urgent
            </Badge>
          </div>

          <div className="p-3 rounded-xl bg-coral-500/10 border border-coral-500/20 text-xs text-[#F1F5F9] space-y-1.5 my-2">
            <span className="font-bold text-[#F43F5E] block">
              Team Beta: Cryocooler License Expired
            </span>
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
              Commit velocity dropped to 4 commits/wk. Milestone 2 is overdue by 8 days. Suggest immediate intervention.
            </p>
          </div>

          <button
            onClick={() => {
              setAiActiveTab('risk');
              setAiDrawerOpen(true);
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/25 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Launch AI Mentorship Intervention</span>
          </button>
        </div>
      </div>

      {/* Navigation Switcher between Multi-Team Grid and Approval Center */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] w-fit">
          {[
            { id: 'teams', label: 'Multi-Team Health Grid', icon: Layers },
            { id: 'approvals', label: 'Milestone Approval Center', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeMentorView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMentorView(tab.id)}
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

        {activeMentorView === 'teams' && (
          <div className="flex items-center gap-1.5 text-xs font-mono-tabular">
            <span className="text-[#94A3B8] text-[11px]">Filter:</span>
            {[
              { id: 'all', label: 'All Teams' },
              { id: 'high_risk', label: 'High Risk' },
              { id: 'in_review', label: 'In Review' },
              { id: 'on_track', label: 'On Track' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                  filter === f.id
                    ? 'bg-white/[0.1] text-[#F1F5F9] border border-white/[0.15]'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Render Selected View */}
      {activeMentorView === 'approvals' ? (
        <MilestoneApprovalCenter />
      ) : (
        /* Multi-Team Health Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTeams.map((tm) => {
            const isHighRisk = tm.status === 'high_risk';
            const isOnTrack = tm.status === 'on_track';

            return (
              <div
                key={tm.id}
                className={`glass-panel-interactive rounded-2xl p-5 space-y-4 border ${
                  isHighRisk 
                    ? 'border-coral-500/30 bg-coral-500/[0.02]' 
                    : 'border-white/[0.08]'
                }`}
              >
                {/* Team Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={tm.avatar}
                      alt={tm.lead}
                      className="w-10 h-10 rounded-xl object-cover border border-white/[0.12]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#F1F5F9]">
                          {tm.name}
                        </h3>
                      </div>
                      <span className="text-[11px] text-[#94A3B8] font-mono-tabular block">
                        Lead: {tm.lead} • {tm.membersCount} members
                      </span>
                    </div>
                  </div>

                  <Badge 
                    variant={isHighRisk ? 'coral' : isOnTrack ? 'emerald' : 'amber'} 
                    size="xs"
                  >
                    {isHighRisk ? 'High Risk' : isOnTrack ? 'On-Track' : 'In Review'}
                  </Badge>
                </div>

                {/* Health Metrics & Velocity Row */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/20 border border-white/[0.04] text-xs font-mono-tabular text-center">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] block">Health Score</span>
                    <span className={`text-sm font-bold ${
                      tm.health >= 85 ? 'text-emerald-400' : tm.health >= 70 ? 'text-[#F59E0B]' : 'text-[#F43F5E]'
                    }`}>
                      {tm.health}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] block">Commit Velocity</span>
                    <span className="text-[#F1F5F9] font-medium text-xs">
                      {tm.commitVelocity}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#94A3B8] block">Pending Reviews</span>
                    <span className={`font-semibold ${tm.pendingDeliverables > 0 ? 'text-[#F59E0B]' : 'text-[#94A3B8]'}`}>
                      {tm.pendingDeliverables}
                    </span>
                  </div>
                </div>

                {/* Current Milestone Progress */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8] text-[11px] truncate">
                      {tm.currentMilestone}
                    </span>
                    <span className="font-mono-tabular text-[#38BDF8] text-xs">
                      {tm.milestoneProgress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isHighRisk ? 'bg-[#F43F5E]' : 'bg-[#38BDF8]'}`}
                      style={{ width: `${tm.milestoneProgress}%` }}
                    />
                  </div>
                </div>

                {/* AI-generated passive monitoring summary */}
                <div className="p-3 rounded-xl bg-[#38BDF8]/[0.04] border border-[#38BDF8]/15">
                  <span className="text-[10px] font-mono-tabular text-[#38BDF8] uppercase">
                    AI Mentor Summary
                  </span>
                  <p className="text-[11px] text-[#CBD5E1] leading-relaxed mt-1">
                    {isHighRisk
                      ? `${tm.name} requires intervention: ${tm.riskFactors?.[0] || 'execution risk detected'}. Review the next milestone and mitigation plan.`
                      : `${tm.name} is ${tm.health >= 85 ? 'healthy and on track' : 'progressing with monitoring required'} at ${tm.milestoneProgress}% of its current milestone.`}
                  </p>
                </div>

                {/* Risk Factors if any */}
                {tm.riskFactors && tm.riskFactors.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono-tabular text-[#94A3B8] uppercase">
                      Risk Telemetry Flags:
                    </span>
                    {tm.riskFactors.map((rf, idx) => (
                      <div
                        key={idx}
                        className="text-[11px] text-[#F43F5E] flex items-start gap-1.5 bg-coral-500/5 p-2 rounded-lg border border-coral-500/15"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span>{rf}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono-tabular text-[#94A3B8]">
                    Last activity: {tm.lastActivity}
                  </span>

                  <button
                    onClick={() => setSelectedDocument(documents[0])}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-[#F1F5F9] hover:text-[#38BDF8] border border-white/[0.08] flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Review Submissions</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
