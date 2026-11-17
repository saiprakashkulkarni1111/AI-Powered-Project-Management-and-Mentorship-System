import React from 'react';
import { useApp } from '../../context/AppContext';
import { TaskCard } from './TaskCard';
import { Plus, CircleDot, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

export const KanbanBoard = () => {
  const { tasks, setCreateTaskModalOpen } = useApp();

  const columns = [
    {
      id: 'backlog',
      title: 'Backlog',
      icon: CircleDot,
      accent: 'slate',
      description: 'Prioritized technical objectives'
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      icon: Clock,
      accent: 'glacier',
      description: 'Active sprint execution'
    },
    {
      id: 'in_review',
      title: 'In Review',
      icon: AlertCircle,
      accent: 'amber',
      description: 'Awaiting mentor verification'
    },
    {
      id: 'completed',
      title: 'Completed',
      icon: CheckCircle2,
      accent: 'emerald',
      description: 'Signed off & merged'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((col) => {
        const Icon = col.icon;
        const columnTasks = tasks.filter((t) => t.status === col.id);

        return (
          <div
            key={col.id}
            className="flex flex-col rounded-xl glass-panel p-3 border-white/[0.08] min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Icon 
                  className={`w-4 h-4 ${
                    col.accent === 'glacier' 
                      ? 'text-[#00F2FE]' 
                      : col.accent === 'amber' 
                      ? 'text-[#FF8533]' 
                      : col.accent === 'emerald'
                      ? 'text-[#14B8A6]'
                      : 'text-[#CBD5E1]'
                  }`} 
                  strokeWidth={1.5} 
                />
                <h3 className="text-xs font-semibold text-white">
                  {col.title}
                </h3>
                <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-white/[0.05] text-[#CBD5E1]">
                  {columnTasks.length}
                </span>
              </div>

              {col.id === 'backlog' && (
                <button
                  onClick={() => setCreateTaskModalOpen(true)}
                  className="p-1 rounded-md text-[#CBD5E1] hover:text-[#00F2FE] hover:bg-white/[0.04] transition-colors"
                  title="Add Task to Backlog"
                >
                  <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Tasks Container */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {columnTasks.length === 0 ? (
                <div className="h-32 flex flex-col items-center justify-center border border-dashed border-white/[0.06] rounded-xl text-center p-4">
                  <p className="text-[11px] text-[#94A3B8]">No tasks in {col.title.toLowerCase()}</p>
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
