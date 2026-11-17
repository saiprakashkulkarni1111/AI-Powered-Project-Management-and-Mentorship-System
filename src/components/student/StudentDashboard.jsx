import React from 'react';
import { useApp } from '../../context/AppContext';
import { KanbanBoard } from './KanbanBoard';
import { TimelineView } from './TimelineView';
import { DocumentManager } from './DocumentManager';
import { 
  GitBranch, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Calendar,
  Plus,
  Compass,
  FileText
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const StudentDashboard = () => {
  const { 
    project, 
    activeStudentView, 
    setActiveStudentView, 
    setCreateTaskModalOpen,
    setAiDrawerOpen,
    setAiActiveTab
  } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Asymmetric Bento Header: Capstone Context + Progress Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Bento: Project Identity & Sprint Status (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl glass-panel relative overflow-hidden flex flex-col justify-between border-white/[0.08]">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[11px] font-mono-tabular px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/25 font-semibold">
                {project.code}
              </span>
              <span className="text-xs text-[#94A3B8]">
                {project.department}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h1>

            <p className="text-xs text-[#CBD5E1] max-w-2xl leading-relaxed">
              Autonomous roadside vision edge compute cluster. Utilizing TensorRT quantized INT8 neural inference, zero-copy unified memory buffers, and 5.9GHz DSRC emergency preemption broadcasting.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 mt-5 border-t border-white/[0.06] text-xs">
            <div>
              <span className="text-[10px] font-mono-tabular text-[#CBD5E1] block">Current Sprint</span>
              <span className="font-bold text-white font-mono-tabular">
                Sprint 4 of 6
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono-tabular text-[#CBD5E1] block">Days Remaining</span>
              <span className="font-semibold text-[#00F2FE] font-mono-tabular">
                12 Days ({project.sprint.targetDate})
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono-tabular text-[#CBD5E1] block">Git Master Branch</span>
              <span className="font-semibold text-[#00F2FE] font-mono-tabular flex items-center gap-1">
                <GitBranch className="w-3.5 h-3.5 text-[#00F2FE]" strokeWidth={1.5} />
                main : {project.repository.lastCommit}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono-tabular text-[#CBD5E1] block">Faculty Director</span>
              <span className="font-semibold text-white truncate block">
                {project.mentor.name}
              </span>
            </div>
          </div>
        </div>

        {/* Right Bento: Tactile Circular Progress Ring & Risk Meter (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-panel flex flex-col justify-between border-white/[0.08]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white">
              Milestone Velocity & Health
            </span>
            <Badge variant="teal" size="xs">
              On Track
            </Badge>
          </div>

          <div className="flex items-center justify-center py-3 gap-5">
            {/* SVG Circular Progress Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-white/[0.06]"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress Ring (Confident Teal) */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-[#14B8A6] transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * project.progress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                {/* 68% in Vibrant Green */}
                <span className="text-2xl font-bold font-mono-tabular text-[#10B981]">
                  {project.progress}%
                </span>
                <span className="text-[9px] font-mono-tabular text-[#CBD5E1] uppercase tracking-wider">
                  Complete
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="space-y-2 text-xs font-mono-tabular">
              <div>
                <span className="text-[10px] text-[#CBD5E1] block">Sprint Velocity</span>
                <span className="text-[#10B981] font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  +38 pts/wk
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#CBD5E1] block">Hardware Risk Index</span>
                <span className="text-[#14B8A6] font-semibold">
                  14 / 100 (Nominal)
                </span>
              </div>
            </div>
          </div>

          {/* Quick AI Trigger */}
          <button
            onClick={() => {
              setAiActiveTab('recommendations');
              setAiDrawerOpen(true);
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF8533] border border-[#FF6B00]/30 text-xs font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" strokeWidth={1.5} />
            <span>AI Copilot: 3 tasks recommended</span>
          </button>
        </div>

      </div>

      {/* View Switcher Controls & Glowing Neon Cyan CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] w-fit">
          {[
            { id: 'kanban', label: 'Kanban Board', icon: Layers },
            { id: 'timeline', label: 'Milestone Timeline', icon: Calendar },
            { id: 'documents', label: 'Document Library', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeStudentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveStudentView(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/[0.08] text-[#00F2FE] border border-[#00F2FE]/40 shadow-sm shadow-[#00F2FE]/20'
                    : 'text-[#CBD5E1] hover:text-[#00F2FE] hover:bg-white/[0.02]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00F2FE]' : 'text-[#CBD5E1]'}`} strokeWidth={1.5} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeStudentView === 'kanban' && (
          <button
            onClick={() => setCreateTaskModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#00F2FE] text-[#06070B] text-xs font-bold hover:bg-[#38BDF8] transition-all flex items-center gap-2 shadow-[0_0_24px_rgba(0,242,254,0.55)] hover:shadow-[0_0_32px_rgba(0,242,254,0.75)] w-fit"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span>Create Task</span>
          </button>
        )}
      </div>

      {/* Render Active View */}
      {activeStudentView === 'kanban' && <KanbanBoard />}
      {activeStudentView === 'timeline' && <TimelineView />}
      {activeStudentView === 'documents' && <DocumentManager />}

    </div>
  );
};
