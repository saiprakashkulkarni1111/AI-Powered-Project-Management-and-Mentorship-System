import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GitCommit, 
  Calendar, 
  CheckSquare, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  MoreVertical,
  Check,
  Tag
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const TaskCard = ({ task }) => {
  const { moveTask, deleteTask, toggleSubtask } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const subtasks = task.subtasks || [];
  const completedSubtasks = subtasks.filter((st) => st.done).length;
  const subtaskPercentage = subtasks.length > 0 ? (completedSubtasks / subtasks.length) * 100 : 0;

  const nextStatus = {
    backlog: 'in_progress',
    in_progress: 'in_review',
    in_review: 'completed',
    completed: 'backlog'
  };

  const prevStatus = {
    completed: 'in_review',
    in_review: 'in_progress',
    in_progress: 'backlog',
    backlog: 'completed'
  };

  return (
    <div className="glass-panel-interactive rounded-xl p-3.5 space-y-3 relative group">
      {/* Top Meta Line: Priority, Task ID & Milestone */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge 
            variant={task.priority === 'P0' ? 'p0' : task.priority === 'P1' ? 'p1' : 'p2'} 
            size="xs"
          >
            {task.priority}
          </Badge>
          <span className="text-[11px] font-mono-tabular text-[#94A3B8]">
            {task.id}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {task.status !== 'backlog' && (
            <button
              onClick={() => moveTask(task.id, prevStatus[task.status])}
              title={`Move to ${prevStatus[task.status].replace('_', ' ')}`}
              className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-[#F1F5F9] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          )}

          {task.status !== 'completed' && (
            <button
              onClick={() => moveTask(task.id, nextStatus[task.status])}
              title={`Advance to ${nextStatus[task.status].replace('_', ' ')}`}
              className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          )}

          <button
            onClick={() => deleteTask(task.id)}
            title="Delete task"
            className="p-1 rounded bg-white/[0.04] hover:bg-coral-500/20 text-[#94A3B8] hover:text-[#F43F5E] transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-white leading-snug group-hover:text-[#00F2FE] transition-colors">
          {task.title}
        </h4>
        {task.description && (
          <p className="text-[11px] text-[#CBD5E1] leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Subtasks Checklist */}
      {subtasks.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-white/[0.04]">
          <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#CBD5E1]">
            <span>Checklist</span>
            <span>{completedSubtasks}/{subtasks.length}</span>
          </div>

          {/* Progress track */}
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00F2FE] transition-all duration-300"
              style={{ width: `${subtaskPercentage}%` }}
            />
          </div>

          <div className="space-y-1 pt-0.5">
            {subtasks.map((st) => (
              <div
                key={st.id}
                onClick={() => toggleSubtask(task.id, st.id)}
                className="flex items-center gap-2 text-[11px] text-[#CBD5E1] hover:text-white cursor-pointer transition-colors"
              >
                {/* Checkbox: Luminous cyan when checked, dark gray border when unchecked */}
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors shrink-0 ${
                  st.done 
                    ? 'bg-[#00F2FE]/25 border-[#00F2FE] text-[#00F2FE] shadow-sm shadow-[#00F2FE]/30' 
                    : 'border-[#334155] bg-black/20 hover:border-white/[0.4]'
                }`}>
                  {st.done && <Check className="w-2.5 h-2.5 stroke-[2.5]" />}
                </div>
                <span className={`truncate ${st.done ? 'line-through opacity-60 text-[#CBD5E1]' : 'text-[#CBD5E1]'}`}>
                  {st.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer: Tags, Commit, Assignee & Due Date */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.04] text-[10px] font-mono-tabular text-[#CBD5E1]">
        <div className="flex items-center gap-2">
          {task.commitHash && (
            <span className="flex items-center gap-1 text-[#00F2FE] hover:text-[#38BDF8]">
              <GitCommit className="w-3 h-3 text-[#00F2FE]" strokeWidth={1.5} />
              <span>{task.commitHash}</span>
            </span>
          )}
          {task.dueDate && (
            <span className="flex items-center gap-1 text-[#CBD5E1]">
              <Calendar className="w-3 h-3 text-[#CBD5E1]" strokeWidth={1.5} />
              <span>{task.dueDate}</span>
            </span>
          )}
        </div>

        {task.assignee && (
          <img
            src={task.assignee.avatar}
            alt={task.assignee.name}
            title={task.assignee.name}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-[#00F2FE] border border-[#00F2FE]/40"
          />
        )}
      </div>
    </div>
  );
};
