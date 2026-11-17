import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Award, 
  FileText, 
  UserCheck 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const TimelineView = () => {
  const { milestones } = useApp();

  return (
    <div className="glass-panel rounded-2xl p-6 space-y-6 border-white/[0.08]">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div>
          <h3 className="text-sm font-semibold text-[#F1F5F9]">
            Capstone Milestone Execution Roadmap
          </h3>
          <p className="text-xs text-[#94A3B8]">
            Sequential academic deliverables vetted against IEEE Capstone Standards
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="glacier" size="sm">
            Sprint 4 Active
          </Badge>
        </div>
      </div>

      {/* Milestones Sequence */}
      <div className="space-y-4">
        {milestones.map((milestone, idx) => {
          const isApproved = milestone.status === 'approved';
          const isPending = milestone.status === 'pending_approval';
          const isInProgress = milestone.status === 'in_progress';

          return (
            <div
              key={milestone.id}
              className={`p-4 rounded-xl border transition-all ${
                isApproved
                  ? 'glass-panel border-white/[0.08]'
                  : isPending
                  ? 'bg-white/[0.04] border-[#F59E0B]/30'
                  : isInProgress
                  ? 'bg-white/[0.04] border-[#38BDF8]/30 shadow-glacier-glow'
                  : 'bg-white/[0.01] border-white/[0.04] opacity-60'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-xs font-mono-tabular font-bold text-[#F1F5F9]">
                      {milestone.title}
                    </span>
                    <Badge
                      variant={
                        isApproved
                          ? 'emerald'
                          : isPending
                          ? 'amber'
                          : isInProgress
                          ? 'glacier'
                          : 'slate'
                      }
                      size="xs"
                    >
                      {milestone.status.replace('_', ' ')}
                    </Badge>
                    {milestone.grade && milestone.grade.includes('(') && (
                      <span className="text-[11px] font-mono-tabular text-emerald-400 font-medium">
                        Grade: {milestone.grade}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    Deliverables: {milestone.deliverables}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs font-mono-tabular">
                  <div className="text-right">
                    <span className="text-[10px] text-[#94A3B8] block">Due Date</span>
                    <span className="text-[#F1F5F9] font-medium">{milestone.dueDate}</span>
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-[10px] text-[#94A3B8] block">Progress</span>
                    <span className="text-[#38BDF8] font-medium">{milestone.progress}%</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full transition-all duration-500 ${
                    isApproved
                      ? 'bg-emerald-400'
                      : isPending
                      ? 'bg-[#F59E0B]'
                      : 'bg-[#38BDF8]'
                  }`}
                  style={{ width: `${milestone.progress}%` }}
                />
              </div>

              {/* Feedback if any */}
              {milestone.feedback && (
                <div className="mt-3 p-2.5 rounded-lg bg-black/20 border border-white/[0.04] text-xs text-[#94A3B8] flex items-start gap-2">
                  <UserCheck className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <span className="font-semibold text-[#F1F5F9]">
                      {milestone.reviewedBy || 'Faculty Reviewer'}:{" "}
                    </span>
                    <span>{milestone.feedback}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
