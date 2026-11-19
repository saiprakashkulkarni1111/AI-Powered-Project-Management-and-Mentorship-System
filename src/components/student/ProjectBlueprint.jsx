import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bot,
  CheckCircle2,
  FileText,
  MessageSquare,
  Send,
  Sparkles,
  Target,
  TriangleAlert
} from 'lucide-react';
import { Badge } from '../common/Badge';

const agentStages = [
  'Feasibility Analysis Agent',
  'Scope Definition Agent',
  'Technology Stack Agent',
  'Milestone Planning Agent',
  'Risk Assessment Agent'
];

export const ProjectBlueprint = () => {
  const {
    studentProfile,
    saveStudentProfile,
    projectBlueprint,
    blueprintGenerating,
    generateProjectBlueprint,
    mentorMessages,
    sendMentorMessage,
    generatedReports,
    generateProjectReport
  } = useApp();

  const [idea, setIdea] = useState(projectBlueprint?.idea || '');
  const [profile, setProfile] = useState(studentProfile);
  const [mentorInput, setMentorInput] = useState('');
  const [activeStage, setActiveStage] = useState(null);
  const [error, setError] = useState('');

  const updateProfile = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    setError('');
    if (!idea.trim()) {
      setError('Enter a two- or three-line project idea before starting the pipeline.');
      return;
    }

    const updatedProfile = {
      ...profile,
      skills: profile.skills
        .map((skill) => skill.trim())
        .filter(Boolean)
    };
    saveStudentProfile(updatedProfile);
    setActiveStage(0);

    try {
      await generateProjectBlueprint(idea, updatedProfile);
      setActiveStage(agentStages.length);
    } catch (generationError) {
      setError(generationError.message);
      setActiveStage(null);
    }
  };

  const handleMentorMessage = async (event) => {
    event.preventDefault();
    if (!mentorInput.trim()) return;
    setError('');
    try {
      await sendMentorMessage(mentorInput);
      setMentorInput('');
    } catch (messageError) {
      setError(messageError.message);
    }
  };

  const handleReport = async (type) => {
    setError('');
    try {
      const report = await generateProjectReport(type);
      const blob = new Blob([report.content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = report.name;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (reportError) {
      setError(reportError.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 border-white/[0.08] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div>
            <Badge variant="amber" size="xs">MULTI-AGENT PROJECT BLUEPRINT</Badge>
            <h3 className="text-lg font-semibold text-[#F1F5F9] mt-2">
              Turn a rough idea into an actionable academic plan
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl">
              Complete your profile and submit a two- or three-line idea. The planning pipeline evaluates feasibility, defines scope, recommends technology, creates a week-wise plan, and flags risks.
            </p>
          </div>
          <Bot className="w-7 h-7 text-[#F59E0B]" strokeWidth={1.5} />
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[#94A3B8]">Academic level</span>
              <input
                value={profile.academicLevel}
                onChange={(event) => updateProfile('academicLevel', event.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg glass-input"
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-xs font-medium text-[#94A3B8]">Skills (comma separated)</span>
              <input
                value={profile.skills.join(', ')}
                onChange={(event) => updateProfile('skills', event.target.value.split(','))}
                className="w-full text-xs px-3 py-2 rounded-lg glass-input"
              />
            </label>
          </div>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[#94A3B8]">Project interests</span>
            <input
              value={profile.interests}
              onChange={(event) => updateProfile('interests', event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg glass-input"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-[#94A3B8]">Rough project idea *</span>
            <textarea
              rows={3}
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="Describe the problem, intended users, and expected outcome in 2-3 lines..."
              className="w-full text-xs px-3 py-2 rounded-lg glass-input resize-none"
            />
          </label>
          <button
            type="submit"
            disabled={blueprintGenerating}
            className="px-4 py-2 rounded-xl bg-[#F59E0B] text-[#0B0D12] text-xs font-bold disabled:opacity-60 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {blueprintGenerating ? 'Running planning agents...' : 'Generate complete blueprint'}
          </button>
        </form>

        {(blueprintGenerating || activeStage !== null) && (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {agentStages.map((stage, index) => {
              const isComplete = activeStage === agentStages.length || index < activeStage;
              return (
                <div key={stage} className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] text-[#94A3B8]">
                  <div className="flex items-center gap-1.5 mb-1">
                    {isComplete ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />}
                    <span>Agent {index + 1}</span>
                  </div>
                  {stage}
                </div>
              );
            })}
          </div>
        )}

        {error && <p className="text-xs text-[#F43F5E]">{error}</p>}
      </div>

      {projectBlueprint && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="glass-panel rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#38BDF8]" /> Feasibility & Scope
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-mono-tabular text-emerald-400">{projectBlueprint.feasibility.score}</span>
                <Badge variant="emerald" size="xs">{projectBlueprint.feasibility.verdict}</Badge>
              </div>
              <p className="text-xs text-[#94A3B8]">{projectBlueprint.feasibility.reasoning}</p>
              <p className="text-xs text-[#F1F5F9]">{projectBlueprint.scope.objective}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div><span className="text-emerald-400 block mb-1">In scope</span>{projectBlueprint.scope.inScope.map((item) => <p key={item} className="text-[#94A3B8] mb-1">• {item}</p>)}</div>
                <div><span className="text-[#F43F5E] block mb-1">Guardrails</span>{projectBlueprint.scope.outOfScope.map((item) => <p key={item} className="text-[#94A3B8] mb-1">• {item}</p>)}</div>
              </div>
            </section>

            <section className="glass-panel rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" /> Recommended Technology Stack
              </h4>
              {projectBlueprint.technologyStack.map((item) => (
                <div key={item.category} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <span className="text-[10px] text-[#F59E0B] font-mono-tabular">{item.category}</span>
                  <p className="text-xs text-[#F1F5F9] font-semibold">{item.recommendation}</p>
                  <p className="text-[11px] text-[#94A3B8]">{item.reasoning}</p>
                </div>
              ))}
            </section>
          </div>

          <section className="glass-panel rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-semibold text-[#F1F5F9]">Week-wise Milestone Plan</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {projectBlueprint.weeklyPlan.map((week) => (
                <div key={week.week} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="text-[10px] text-[#38BDF8] font-mono-tabular">WEEK {week.week}</span>
                  <p className="text-xs text-[#F1F5F9] font-semibold mt-1">{week.title}</p>
                  <p className="text-[11px] text-[#94A3B8] mt-1">{week.outcome}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-2xl p-5 space-y-3">
            <h4 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
              <TriangleAlert className="w-4 h-4 text-[#F43F5E]" /> Risks & Mitigation
            </h4>
            {projectBlueprint.risks.map((risk) => (
              <div key={risk.risk} className="flex flex-col sm:flex-row sm:items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-xs">
                <Badge variant={risk.level === 'High' ? 'coral' : 'amber'} size="xs">{risk.level}</Badge>
                <span className="text-[#F1F5F9] font-medium">{risk.risk}</span>
                <span className="text-[#94A3B8] sm:ml-auto">{risk.mitigation}</span>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <section className="glass-panel rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#38BDF8]" /> Conversational Mentor
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {mentorMessages.length === 0 && <p className="text-xs text-[#94A3B8]">Ask for guidance on your next milestone, blocker, or documentation section.</p>}
                {mentorMessages.map((message) => (
                  <div key={message.id} className={`p-2.5 rounded-lg text-xs ${message.role === 'mentor' ? 'bg-[#38BDF8]/10 text-[#F1F5F9]' : 'bg-white/[0.04] text-[#CBD5E1]'}`}>
                    <span className="text-[10px] font-mono-tabular text-[#94A3B8] block mb-1">{message.role === 'mentor' ? 'AI Mentor' : 'You'}</span>
                    {message.content}
                  </div>
                ))}
              </div>
              <form onSubmit={handleMentorMessage} className="flex gap-2">
                <input value={mentorInput} onChange={(event) => setMentorInput(event.target.value)} placeholder="Ask your mentor..." className="flex-1 text-xs px-3 py-2 rounded-lg glass-input" />
                <button className="px-3 rounded-lg bg-[#38BDF8] text-[#0B0D12]" aria-label="Send mentor message"><Send className="w-4 h-4" /></button>
              </form>
            </section>

            <section className="glass-panel rounded-2xl p-5 space-y-3">
              <h4 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> On-demand Documentation
              </h4>
              <p className="text-xs text-[#94A3B8]">Generate reusable project artifacts from the current blueprint.</p>
              <div className="flex flex-wrap gap-2">
                {['synopsis', 'methodology', 'progress'].map((type) => (
                  <button key={type} onClick={() => handleReport(type)} className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-[#F1F5F9] hover:border-[#38BDF8]/40">
                    Generate {type}
                  </button>
                ))}
              </div>
              {generatedReports.length > 0 && <p className="text-[11px] text-emerald-400">{generatedReports.length} report(s) generated and downloaded.</p>}
            </section>
          </div>
        </>
      )}
    </div>
  );
};
