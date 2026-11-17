import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Send, 
  CornerDownRight, 
  Highlighter, 
  Sparkles,
  ExternalLink,
  Tag
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DocumentAnnotationModal = () => {
  const { 
    selectedDocument, 
    setSelectedDocument, 
    addDocumentAnnotation, 
    resolveAnnotation,
    currentUser 
  } = useApp();

  const [highlightSelection, setHighlightSelection] = useState('');
  const [commentInput, setCommentInput] = useState('');
  const [filterResolved, setFilterResolved] = useState(false);

  if (!selectedDocument) return null;

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : '';
    if (text.length > 5) {
      setHighlightSelection(text);
    }
  };

  const handlePostAnnotation = () => {
    if (!commentInput.trim()) return;
    addDocumentAnnotation(selectedDocument.id, {
      highlightedText: highlightSelection || "Document section comment",
      comment: commentInput.trim()
    });
    setCommentInput('');
    setHighlightSelection('');
  };

  const annotations = selectedDocument.annotations || [];
  const displayedAnnotations = filterResolved 
    ? annotations.filter(a => !a.resolved) 
    : annotations;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedDocument(null)}
          className="fixed inset-0 bg-[#0B0D12]/85 backdrop-blur-md"
        />

        {/* Full Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-6xl h-[88vh] rounded-2xl glass-modal z-10 flex flex-col overflow-hidden shadow-2xl border border-white/[0.14]"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 border-b border-white/[0.08] bg-white/[0.02] shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08]">
                <FileText className="w-5 h-5 text-[#38BDF8]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-[#F1F5F9]">
                    {selectedDocument.name}
                  </h3>
                  <Badge variant="neutral" size="xs">
                    {selectedDocument.version}
                  </Badge>
                  <Badge 
                    variant={selectedDocument.status === 'Approved' ? 'emerald' : 'amber'} 
                    size="xs"
                  >
                    {selectedDocument.status}
                  </Badge>
                </div>
                <p className="text-[11px] font-mono-tabular text-[#94A3B8]">
                  Author: {selectedDocument.author} • Updated {new Date(selectedDocument.updatedAt).toLocaleDateString()} • {selectedDocument.size}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedDocument(null)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Split-Screen Workspace */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            
            {/* LEFT PANE: Document Content Viewer (7 cols) */}
            <div 
              className="lg:col-span-7 flex flex-col h-full overflow-hidden bg-black/20"
              onMouseUp={handleTextSelection}
            >
              {/* Document Subheader / Instruction */}
              <div className="px-6 py-2.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between text-xs text-[#94A3B8]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Highlighter className="w-3.5 h-3.5 text-[#38BDF8]" strokeWidth={1.5} />
                  Highlight any text passage to attach mentor feedback
                </span>
                <span className="font-mono-tabular text-[10px]">
                  PDF Renderer v4.8
                </span>
              </div>

              {/* Document Text Body */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-5 selection:bg-[#38BDF8]/30 selection:text-white">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#F1F5F9]">
                    <span>Abstract & Architectural Synopsis</span>
                    <span className="font-mono-tabular text-[10px] text-[#94A3B8]">Section 1.0</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    {selectedDocument.summary}
                  </p>
                </div>

                <div className="p-6 rounded-xl glass-panel space-y-4 font-mono-tabular text-xs text-[#F1F5F9] leading-relaxed whitespace-pre-wrap">
                  {selectedDocument.contentPreview}
                </div>

                {/* Highlight prompt pill if text selected */}
                {highlightSelection && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="sticky bottom-4 p-3 rounded-xl bg-[#0B0D12]/95 border border-[#38BDF8]/40 shadow-glacier-glow flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="truncate flex-1">
                      <span className="text-[#38BDF8] font-medium">Selected text: </span>
                      <span className="text-[#F1F5F9] italic">"{highlightSelection.slice(0, 50)}..."</span>
                    </div>
                    <button
                      onClick={() => {
                        const inputEl = document.getElementById('annotation-input');
                        if (inputEl) inputEl.focus();
                      }}
                      className="px-2.5 py-1 rounded bg-[#38BDF8] text-[#0B0D12] text-xs font-semibold shrink-0"
                    >
                      Annotate
                    </button>
                  </motion.div>
                )}
              </div>
            </div>

            {/* RIGHT PANE: Pinned Mentor Feedback Threads (5 cols) */}
            <div className="lg:col-span-5 flex flex-col h-full overflow-hidden bg-black/10">
              
              {/* Annotations Header */}
              <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#38BDF8]" strokeWidth={1.5} />
                  <h4 className="text-xs font-semibold text-[#F1F5F9]">
                    Mentor Feedback Threads ({annotations.length})
                  </h4>
                </div>
                <button
                  onClick={() => setFilterResolved(!filterResolved)}
                  className={`text-[11px] font-mono-tabular px-2 py-0.5 rounded transition-colors ${
                    filterResolved
                      ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  {filterResolved ? 'Showing Unresolved' : 'Show All'}
                </button>
              </div>

              {/* Feedback List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {displayedAnnotations.length === 0 ? (
                  <div className="py-12 text-center text-xs text-[#94A3B8]">
                    No feedback threads found. Highlight text on the left to pin advice.
                  </div>
                ) : (
                  displayedAnnotations.map((ann) => (
                    <div
                      key={ann.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        ann.resolved
                          ? 'bg-white/[0.01] border-white/[0.05] opacity-60'
                          : 'glass-panel border-white/[0.08] hover:border-[#38BDF8]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-[#F1F5F9]">
                            {ann.author}
                          </span>
                          <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-white/[0.05] text-[#94A3B8]">
                            {ann.role}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-tabular text-[#94A3B8]">
                          {new Date(ann.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {ann.highlightedText && (
                        <div className="p-2 rounded bg-black/30 border-l-2 border-[#38BDF8] text-[11px] text-[#94A3B8] italic mb-2 line-clamp-2">
                          "{ann.highlightedText}"
                        </div>
                      )}

                      <p className="text-xs text-[#F1F5F9] leading-relaxed mb-3">
                        {ann.comment}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                        <span className="text-[10px] font-mono-tabular text-[#94A3B8]">
                          {ann.resolved ? "Status: Resolved" : "Status: Open Action Item"}
                        </span>
                        {!ann.resolved && (
                          <button
                            onClick={() => resolveAnnotation(selectedDocument.id, ann.id)}
                            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                            Resolve Thread
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Annotation Input Bar */}
              <div className="p-4 border-t border-white/[0.08] bg-white/[0.02] space-y-2">
                {highlightSelection && (
                  <div className="text-[11px] text-[#38BDF8] truncate flex items-center justify-between">
                    <span>Pinning to: "{highlightSelection.slice(0, 36)}..."</span>
                    <button
                      onClick={() => setHighlightSelection('')}
                      className="text-[#94A3B8] hover:text-[#F1F5F9]"
                    >
                      Clear
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    id="annotation-input"
                    type="text"
                    placeholder="Write constructive faculty feedback or critique..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePostAnnotation()}
                    className="flex-1 text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9]"
                  />
                  <button
                    onClick={handlePostAnnotation}
                    disabled={!commentInput.trim()}
                    className="px-3 py-2 rounded-lg bg-[#38BDF8] text-[#0B0D12] text-xs font-semibold hover:bg-[#38BDF8]/90 disabled:opacity-50 transition-all flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Post</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
