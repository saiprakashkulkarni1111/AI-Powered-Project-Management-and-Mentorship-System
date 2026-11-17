import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Award, 
  ExternalLink, 
  Clock, 
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const MilestoneApprovalCenter = () => {
  const { milestones, approveMilestone, requestRevision, setSelectedDocument, documents } = useApp();
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [approvingId, setApprovingId] = useState(null);

  const pendingMilestones = milestones.filter(m => m.status === 'pending_approval');
  const approvedMilestones = milestones.filter(m => m.status === 'approved');

  const handleApprove = async (mId) => {
    setApprovingId(mId);
    await approveMilestone(mId, feedbackNotes || "Deliverables verified against IEEE Capstone Benchmark Standard.");
    setFeedbackNotes('');
    setApprovingId(null);
  };

  const handleRevision = async (mId) => {
    if (!feedbackNotes.trim()) {
      alert("Please provide specific feedback notes for the students prior to requesting revisions.");
      return;
    }
    await requestRevision(mId, feedbackNotes);
    setFeedbackNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Pending Approvals Section */}
      <div className="glass-panel rounded-2xl p-6 border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div>
            <h3 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
              Pending Faculty Milestone Approvals
              <span className="text-[10px] font-mono-tabular px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                {pendingMilestones.length} ACTION REQUIRED
              </span>
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Verify student engineering deliverables, thermal benchmarks, and assign formal grades
            </p>
          </div>
        </div>

        {pendingMilestones.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" strokeWidth={1.5} />
            <h4 className="text-xs font-semibold text-[#F1F5F9]">All pending milestones verified</h4>
            <p className="text-xs text-[#94A3B8] mt-1">
              No outstanding deliverables require faculty committee review at this time.
            </p>
          </div>
        ) : (
          pendingMilestones.map((milestone) => (
            <div
              key={milestone.id}
              className="p-5 rounded-xl bg-white/[0.03] border border-[#F59E0B]/30 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="amber" size="xs">
                      Awaiting Sign-off
                    </Badge>
                    <span className="text-xs font-mono-tabular font-bold text-[#F1F5F9]">
                      {milestone.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    Submitted Deliverables: <span className="text-[#F1F5F9]">{milestone.deliverables}</span>
                  </p>
                </div>
                <div className="text-right font-mono-tabular text-xs text-[#94A3B8]">
                  <span>Target Due: {milestone.dueDate}</span>
                  <span className="block text-[#38BDF8] font-semibold">{milestone.progress}% complete</span>
                </div>
              </div>

              {/* Related Submitted Artifact */}
              <div className="p-3.5 rounded-lg bg-black/30 border border-white/[0.06] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#38BDF8]" strokeWidth={1.5} />
                  <div>
                    <span className="font-semibold text-[#F1F5F9]">
                      System_Architecture_Spec_v2.4.pdf
                    </span>
                    <span className="block text-[10px] text-[#94A3B8] font-mono-tabular">
                      DeepStream buffer allocations & thermal mitigation graph
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedDocument(documents[0])}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-medium text-[#F1F5F9] border border-white/[0.08] inline-flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Inspect Spec & Annotate</span>
                </button>
              </div>

              {/* Feedback and Approval Actions */}
              <div className="space-y-3 pt-2 border-t border-white/[0.06]">
                <textarea
                  rows={2}
                  placeholder="Enter optional faculty commendations, grade rationale, or revision notes..."
                  value={feedbackNotes}
                  onChange={(e) => setFeedbackNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9] resize-none"
                />

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => handleRevision(milestone.id)}
                    className="px-4 py-2 rounded-lg bg-white/[0.04] hover:bg-coral-500/10 text-xs font-medium text-[#F43F5E] border border-white/[0.08] hover:border-coral-500/30 transition-all"
                  >
                    Request Revisions
                  </button>

                  <button
                    onClick={() => handleApprove(milestone.id)}
                    disabled={approvingId === milestone.id}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#0B0D12] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    {approvingId === milestone.id ? (
                      <span>Signing & Issuing Grade...</span>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" strokeWidth={2} />
                        <span>One-Click Approve (Grade: 96 / 100 A)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Historical Approved Milestones */}
      <div className="glass-panel rounded-2xl p-6 border-white/[0.08] space-y-4">
        <h4 className="text-xs font-semibold text-[#F1F5F9] flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" strokeWidth={1.5} />
          Approved & Signed-Off Milestones Archive
        </h4>

        <div className="divide-y divide-white/[0.04]">
          {approvedMilestones.map((m) => (
            <div key={m.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#F1F5F9]">{m.title}</span>
                  <Badge variant="emerald" size="xs">Grade: {m.grade}</Badge>
                </div>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Signed off by {m.reviewedBy} on {new Date(m.approvedAt).toLocaleDateString()}
                </p>
                {m.feedback && (
                  <p className="text-[11px] text-[#94A3B8] italic mt-1 bg-white/[0.02] p-2 rounded">
                    "{m.feedback}"
                  </p>
                )}
              </div>
              <span className="text-xs font-mono-tabular text-emerald-400 font-semibold shrink-0">
                100% Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
