import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { X, Plus, CheckSquare, Sparkles } from 'lucide-react';
import { Badge } from '../common/Badge';

export const CreateTaskModal = () => {
  const { createTaskModalOpen, setCreateTaskModalOpen, addTask, milestones, currentUser } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('P1');
  const [milestone, setMilestone] = useState(milestones[2]?.title || 'M3: Sub-20ms Edge Inference');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['Edge-AI', 'CUDA']);
  const [subtasks, setSubtasks] = useState([
    { id: 'st-temp-1', title: 'Write initial unit test', done: false }
  ]);
  const [subtaskInput, setSubtaskInput] = useState('');

  if (!createTaskModalOpen) return null;

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([
        ...subtasks,
        { id: `st-${Date.now()}`, title: subtaskInput.trim(), done: false }
      ]);
      setSubtaskInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'in_progress',
      milestone,
      assignee: currentUser,
      subtasks,
      tags
    });

    // Reset & Close
    setTitle('');
    setDescription('');
    setCreateTaskModalOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCreateTaskModalOpen(false)}
          className="fixed inset-0 bg-[#0B0D12]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="relative w-full max-w-lg rounded-2xl glass-modal z-10 overflow-hidden shadow-2xl border border-white/[0.12]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-[#F1F5F9]">
                Create Engineering Task
              </h3>
            </div>
            <button
              onClick={() => setCreateTaskModalOpen(false)}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94A3B8]">
                Task Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Optimize zero-copy CUDA memory buffer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#94A3B8]">
                Technical Description & Acceptance Criteria
              </label>
              <textarea
                rows={3}
                placeholder="Include benchmark targets, profiling constraints, or hardware IDs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#94A3B8]">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9]"
                >
                  <option value="P0" className="bg-[#11141C]">P0 - Blocker / Critical</option>
                  <option value="P1" className="bg-[#11141C]">P1 - Core Milestone</option>
                  <option value="P2" className="bg-[#11141C]">P2 - Nice to Have</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#94A3B8]">Milestone</label>
                <select
                  value={milestone}
                  onChange={(e) => setMilestone(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9]"
                >
                  {milestones.map((m) => (
                    <option key={m.id} value={m.title} className="bg-[#11141C]">
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subtasks */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-medium text-[#94A3B8]">
                Checklist / Subtasks
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add verifiable subtask..."
                  value={subtaskInput}
                  onChange={(e) => setSubtaskInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSubtask();
                    }
                  }}
                  className="flex-1 text-xs px-3 py-1.5 rounded-lg glass-input text-[#F1F5F9]"
                />
                <button
                  type="button"
                  onClick={handleAddSubtask}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] text-xs font-medium text-[#F1F5F9] hover:bg-white/[0.1] border border-white/[0.08]"
                >
                  Add
                </button>
              </div>

              <div className="space-y-1 max-h-24 overflow-y-auto">
                {subtasks.map((st) => (
                  <div key={st.id} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE]" />
                    <span>{st.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setCreateTaskModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-[#CBD5E1] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#00F2FE] text-[#06070B] text-xs font-bold hover:bg-[#38BDF8] transition-all shadow-[0_0_24px_rgba(0,242,254,0.55)] hover:shadow-[0_0_32px_rgba(0,242,254,0.75)]"
              >
                Deploy Task to Board
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
