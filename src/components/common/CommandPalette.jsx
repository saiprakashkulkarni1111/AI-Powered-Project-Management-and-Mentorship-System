import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  Users, 
  ShieldCheck, 
  Kanban, 
  Calendar, 
  Layers, 
  ArrowRight, 
  X,
  Cpu
} from 'lucide-react';
import { Badge } from './Badge';

export const CommandPalette = () => {
  const { 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    tasks, 
    documents, 
    setRole, 
    setActiveStudentView, 
    setActiveMentorView, 
    setActiveAdminView,
    setAiDrawerOpen,
    setAiActiveTab,
    setSelectedDocument,
    setCreateTaskModalOpen
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset query on open
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  // Command items registry
  const commands = useMemo(() => {
    const list = [
      // AI Tools
      {
        id: 'cmd-ai-roadmap',
        title: 'AI: Generate Capstone Sprint Roadmap',
        category: 'AI Intelligence',
        icon: Sparkles,
        accent: 'amber',
        action: () => {
          setAiActiveTab('roadmap');
          setAiDrawerOpen(true);
        }
      },
      {
        id: 'cmd-ai-rec',
        title: 'AI: Review Task Recommendations & Apply',
        category: 'AI Intelligence',
        icon: Sparkles,
        accent: 'amber',
        action: () => {
          setAiActiveTab('recommendations');
          setAiDrawerOpen(true);
        }
      },
      {
        id: 'cmd-ai-risk',
        title: 'AI: Run Real-time Hardware Risk & Thermal Scan',
        category: 'AI Intelligence',
        icon: Cpu,
        accent: 'amber',
        action: () => {
          setAiActiveTab('risk');
          setAiDrawerOpen(true);
        }
      },
      // Fast Actions
      {
        id: 'cmd-new-task',
        title: 'Create New Engineering Task',
        category: 'Actions',
        icon: CheckSquare,
        accent: 'glacier',
        action: () => {
          setCreateTaskModalOpen(true);
        }
      },
      // Role Switchers
      {
        id: 'cmd-role-student',
        title: 'Switch to Student Workspace (Execution Mode)',
        category: 'RBAC Switch',
        icon: Kanban,
        accent: 'slate',
        action: () => setRole('student')
      },
      {
        id: 'cmd-role-mentor',
        title: 'Switch to Faculty Advisor / Mentor View',
        category: 'RBAC Switch',
        icon: Users,
        accent: 'slate',
        action: () => setRole('mentor')
      },
      {
        id: 'cmd-role-admin',
        title: 'Switch to Department Admin View',
        category: 'RBAC Switch',
        icon: ShieldCheck,
        accent: 'slate',
        action: () => setRole('admin')
      },
      // Tasks
      ...tasks.map((t) => ({
        id: `task-${t.id}`,
        title: `${t.id}: ${t.title}`,
        category: 'Tasks',
        icon: CheckSquare,
        accent: t.priority === 'P0' ? 'coral' : 'glacier',
        action: () => {
          setRole('student');
          setActiveStudentView('kanban');
        }
      })),
      // Documents
      ...documents.map((d) => ({
        id: `doc-${d.id}`,
        title: `${d.name} (${d.version})`,
        category: 'Documents',
        icon: FileText,
        accent: 'slate',
        action: () => {
          setSelectedDocument(d);
        }
      }))
    ];

    if (!query.trim()) return list;
    return list.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, tasks, documents]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!commandPaletteOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setCommandPaletteOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (commands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + commands.length) % (commands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (commands[selectedIndex]) {
          commands[selectedIndex].action();
          setCommandPaletteOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, commands, selectedIndex]);

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCommandPaletteOpen(false)}
            className="fixed inset-0 bg-[#0B0D12]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="relative w-full max-w-2xl rounded-2xl glass-modal overflow-hidden z-10 shadow-2xl border border-white/[0.14]"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="w-5 h-5 text-[#38BDF8] shrink-0" strokeWidth={1.5} />
              <input
                autoFocus
                type="text"
                placeholder="Type a command, task, document, or AI prompt..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-[#F1F5F9] placeholder-[#94A3B8]/60 focus:outline-none"
              />
              <button
                onClick={() => setCommandPaletteOpen(false)}
                className="p-1 rounded-md text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Commands List */}
            <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/[0.02]">
              {commands.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#94A3B8]">
                  No matching commands or entities found for "{query}"
                </div>
              ) : (
                commands.map((cmd, idx) => {
                  const Icon = cmd.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => {
                        cmd.action();
                        setCommandPaletteOpen(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-white/[0.08] text-[#F1F5F9] border border-white/[0.1]'
                          : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-md shrink-0 ${
                            cmd.accent === 'amber'
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                              : cmd.accent === 'coral'
                              ? 'bg-[#F43F5E]/15 text-[#F43F5E]'
                              : 'bg-white/[0.05] text-[#38BDF8]'
                          }`}
                        >
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <span className="font-medium text-[#F1F5F9] truncate">
                          {cmd.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-white/[0.04] text-[#94A3B8] border border-white/[0.06]">
                          {cmd.category}
                        </span>
                        {isSelected && (
                          <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" strokeWidth={1.5} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Helper Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.06] bg-white/[0.01] text-[11px] font-mono-tabular text-[#94A3B8]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Dismiss</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#38BDF8]">
                <span>Aetheris Command Engine</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
