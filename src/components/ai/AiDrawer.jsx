import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  Cpu, 
  Map, 
  Plus, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  ShieldAlert, 
  TrendingUp,
  FileCode,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const AiDrawer = () => {
  const { 
    aiDrawerOpen, 
    setAiDrawerOpen, 
    aiActiveTab, 
    setAiActiveTab,
    recommendations,
    applyRecommendationToBoard,
    addTask
  } = useApp();

  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);
  const [roadmapOutput, setRoadmapOutput] = useState(null);
  const [analyzingRisk, setAnalyzingRisk] = useState(false);
  const [riskScanDone, setRiskScanDone] = useState(false);
  const [appliedRecIds, setAppliedRecIds] = useState(new Set());
  const [customPrompt, setCustomPrompt] = useState('');
  const [streamingResponse, setStreamingResponse] = useState('');

  // Handle Apply to Board
  const handleApply = async (recId) => {
    setAppliedRecIds((prev) => new Set(prev).add(recId));
    await applyRecommendationToBoard(recId);
  };

  // Simulate Roadmap Generation
  const handleGenerateRoadmap = () => {
    setGeneratingRoadmap(true);
    setRoadmapOutput(null);
    setTimeout(() => {
      setRoadmapOutput({
        title: "Sprint 5 & 6 Synthetic Acceleration Roadmap",
        generatedAt: "2026-11-17T21:40:00Z",
        targetVelocity: "42 pts / sprint",
        phases: [
          {
            sprint: "Sprint 5 (Weeks 1-2)",
            focus: "Thermal Mitigations & Quantized INT8 Stress Test",
            items: [
              "Deploy PID duty-cycle daemon to tegrastats daemon",
              "Execute 10,000-frame Cityscapes night-vision inference validation",
              "Verify thermal dissipation maintains junction <= 82°C under 45°C ambient"
            ]
          },
          {
            sprint: "Sprint 6 (Weeks 3-4)",
            focus: "V2X Preemption Broadcast & IEEE Thesis Polish",
            items: [
              "Deploy Nakagami-m fading protocol to roadside DSRC radio unit",
              "Execute zero-copy EGLImage camera frame bridge benchmark",
              "Compile IEEE 12-page camera-ready manuscript with vector figures"
            ]
          }
        ]
      });
      setGeneratingRoadmap(false);
    }, 1400);
  };

  // Simulate Risk Analyzer
  const handleRunRiskScan = () => {
    setAnalyzingRisk(true);
    setRiskScanDone(false);
    setTimeout(() => {
      setAnalyzingRisk(false);
      setRiskScanDone(true);
    }, 1200);
  };

  // Simulate Custom AI Query
  const handleSendPrompt = () => {
    if (!customPrompt.trim()) return;
    const promptText = customPrompt;
    setCustomPrompt('');
    setStreamingResponse('Analyzing Capstone context, codebase telemetry, and IEEE requirements...');
    setTimeout(() => {
      setStreamingResponse(
        `Based on your current TensorRT 8.6 pipeline in branch main:\n\n` +
        `1. Recommendation: Utilize CUDA streams to decouple CSI frame ingestion from INT8 inference. This will recover ~3.2ms per frame.\n` +
        `2. Thermal Safeguard: Add a tegrastats monitor threshold at 80°C to drop non-critical secondary bounding box overlays before the OS forces frequency throttling.\n` +
        `3. Academic Reference: Cite 'TensorRT Embedded Optimization Patterns for Autonomous Roadway Nodes (IEEE Micro 2025)'.`
      );
    }, 1200);
  };

  return (
    <AnimatePresence>
      {aiDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAiDrawerOpen(false)}
            className="fixed inset-0 bg-[#0B0D12]/60 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] z-50 glass-modal border-l border-white/[0.12] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 shadow-amber-glow">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F1F5F9] flex items-center gap-2">
                    Aetheris AI Intelligence
                    <span className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                      SOLAR ENGINE
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#94A3B8]">
                    Real-time research telemetry & synthesis
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiDrawerOpen(false)}
                className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center px-4 py-2 border-b border-white/[0.06] bg-white/[0.01] gap-1">
              {[
                { id: 'recommendations', label: 'Tasks Engine', icon: Zap },
                { id: 'roadmap', label: 'Roadmap Gen', icon: Map },
                { id: 'risk', label: 'Risk Telemetry', icon: ShieldAlert },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = aiActiveTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setAiActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 shadow-sm'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* TAB 1: TASK RECOMMENDATION ENGINE */}
              {aiActiveTab === 'recommendations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-[#F1F5F9]">
                        Synthesized Engineering Tasks
                      </h4>
                      <p className="text-[11px] text-[#94A3B8]">
                        High-leverage tasks derived from current blockers & commits
                      </p>
                    </div>
                    <Badge variant="amber" size="xs">
                      {recommendations.length} available
                    </Badge>
                  </div>

                  {recommendations.length === 0 ? (
                    <div className="p-8 text-center rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" strokeWidth={1.5} />
                      <p className="text-xs text-[#F1F5F9] font-medium">All recommendations applied!</p>
                      <p className="text-[11px] text-[#94A3B8] mt-1">
                        Your sprint backlog is fully aligned with AI telemetry.
                      </p>
                    </div>
                  ) : (
                    recommendations.map((rec) => {
                      const isApplied = appliedRecIds.has(rec.id);
                      return (
                        <div
                          key={rec.id}
                          className="p-4 rounded-xl glass-panel space-y-3 relative group border-white/[0.08] hover:border-[#F59E0B]/40 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant={rec.priority === 'P0' ? 'p0' : 'p1'} size="xs">
                                  {rec.priority}
                                </Badge>
                                <span className="text-[10px] font-mono-tabular text-[#94A3B8]">
                                  ~{rec.estimatedHours}h est.
                                </span>
                              </div>
                              <h5 className="text-xs font-semibold text-[#F1F5F9] leading-snug">
                                {rec.title}
                              </h5>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#94A3B8] leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/[0.04]">
                            <span className="text-[#F59E0B] font-medium">Telemetry Rationale: </span>
                            {rec.reasoning}
                          </p>

                          <div className="flex items-center justify-between pt-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {rec.tags.map((t) => (
                                <span
                                  key={t}
                                  className="text-[10px] font-mono-tabular px-1.5 py-0.5 rounded bg-white/[0.04] text-[#94A3B8] border border-white/[0.06]"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>

                            <button
                              onClick={() => handleApply(rec.id)}
                              disabled={isApplied}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                isApplied
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border border-[#F59E0B]/40 shadow-sm'
                              }`}
                            >
                              {isApplied ? (
                                <>
                                  <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                                  <span>Applied to Board</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                                  <span>Apply to Board</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* TAB 2: ROADMAP GENERATOR */}
              {aiActiveTab === 'roadmap' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-[#F1F5F9]">
                      Project Roadmap Generator
                    </h4>
                    <p className="text-[11px] text-[#94A3B8]">
                      Synthesizes remaining sprint goals based on project thesis specifications
                    </p>
                  </div>

                  <div className="p-4 rounded-xl glass-panel space-y-3 border-white/[0.08]">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-medium text-[#94A3B8]">
                        Capstone Focus Parameter
                      </label>
                      <input
                        type="text"
                        defaultValue="Jetson Orin Nano TensorRT INT8 Real-Time Pipeline"
                        className="w-full text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9]"
                      />
                    </div>
                    <button
                      onClick={handleGenerateRoadmap}
                      disabled={generatingRoadmap}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border border-[#F59E0B]/40 text-xs font-medium transition-all shadow-sm"
                    >
                      {generatingRoadmap ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" strokeWidth={1.5} />
                          <span>Synthesizing Sprint Graph...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Generate Dynamic Roadmap</span>
                        </>
                      )}
                    </button>
                  </div>

                  {generatingRoadmap && (
                    <div className="space-y-3 p-4 rounded-xl glass-panel animate-pulse">
                      <div className="h-4 bg-white/[0.06] rounded w-3/4" />
                      <div className="h-3 bg-white/[0.04] rounded w-full" />
                      <div className="h-3 bg-white/[0.04] rounded w-5/6" />
                    </div>
                  )}

                  {roadmapOutput && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl glass-panel space-y-4 border-[#F59E0B]/30 bg-[#F59E0B]/[0.02]"
                    >
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                        <div>
                          <h5 className="text-xs font-semibold text-[#F1F5F9]">
                            {roadmapOutput.title}
                          </h5>
                          <span className="text-[10px] font-mono-tabular text-[#F59E0B]">
                            Target: {roadmapOutput.targetVelocity}
                          </span>
                        </div>
                        <Badge variant="amber" size="xs">
                          Validated
                        </Badge>
                      </div>

                      {roadmapOutput.phases.map((phase, pIdx) => (
                        <div key={pIdx} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                            <h6 className="text-xs font-semibold text-[#F1F5F9]">
                              {phase.sprint}
                            </h6>
                          </div>
                          <p className="text-[10px] font-mono-tabular text-[#94A3B8] pl-3.5">
                            Focus: {phase.focus}
                          </p>
                          <ul className="space-y-1.5 pl-3.5">
                            {phase.items.map((item, iIdx) => (
                              <li
                                key={iIdx}
                                className="text-[11px] text-[#94A3B8] flex items-start gap-2"
                              >
                                <span className="text-[#38BDF8] mt-1 text-[10px]">›</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>
              )}

              {/* TAB 3: PROGRESS & RISK ANALYZER */}
              {aiActiveTab === 'risk' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-[#F1F5F9]">
                      Automated Risk & Telemetry Analyzer
                    </h4>
                    <p className="text-[11px] text-[#94A3B8]">
                      Deep scan across git commit velocity, hardware thermals & milestone buffer
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl glass-panel text-center">
                      <span className="text-[10px] font-mono-tabular text-[#94A3B8]">
                        System Risk Index
                      </span>
                      <div className="text-xl font-bold font-mono-tabular text-emerald-400 mt-1">
                        14 / 100
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">Nominal (Low Risk)</span>
                    </div>
                    <div className="p-3.5 rounded-xl glass-panel text-center">
                      <span className="text-[10px] font-mono-tabular text-[#94A3B8]">
                        Milestone Buffer
                      </span>
                      <div className="text-xl font-bold font-mono-tabular text-[#38BDF8] mt-1">
                        +4.2 Days
                      </div>
                      <span className="text-[10px] text-[#94A3B8]">Ahead of schedule</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl glass-panel space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
                        <h5 className="text-xs font-semibold text-[#F1F5F9]">
                          Detected Bottlenecks (1)
                        </h5>
                      </div>
                      <Badge variant="amber" size="xs">
                        Monitor
                      </Badge>
                    </div>

                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Jetson Orin Nano telemetry logs indicate junction temperature peaks at 78.4°C during 50-batch continuous inference. Without duty cycling, hardware thermal throttle could trigger during outdoor roadside testing.
                    </p>

                    <button
                      onClick={handleRunRiskScan}
                      disabled={analyzingRisk}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-[#F1F5F9] border border-white/[0.08] transition-all"
                    >
                      {analyzingRisk ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" strokeWidth={1.5} />
                          <span>Querying Hardware Telemetry...</span>
                        </>
                      ) : (
                        <>
                          <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Re-scan Telemetry Nodes</span>
                        </>
                      )}
                    </button>

                    {riskScanDone && (
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                        <span>Telemetry updated: Fan duty cycle healthy at 65%.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Interactive Ask AI Assistant Prompt Box */}
              <div className="pt-2 border-t border-white/[0.06] space-y-2">
                <label className="text-[11px] font-semibold text-[#F1F5F9] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#F59E0B]" strokeWidth={1.5} />
                  Ask AI Mentorship Assistant
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. How to structure section 4.2 in LaTeX?"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
                    className="flex-1 text-xs px-3 py-2 rounded-lg glass-input text-[#F1F5F9]"
                  />
                  <button
                    onClick={handleSendPrompt}
                    className="px-3 py-2 rounded-lg bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-[#F59E0B] border border-[#F59E0B]/40 text-xs font-medium transition-all"
                  >
                    Ask
                  </button>
                </div>

                {streamingResponse && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 rounded-lg bg-white/[0.03] border border-[#F59E0B]/30 text-xs text-[#94A3B8] whitespace-pre-wrap leading-relaxed font-mono-tabular"
                  >
                    {streamingResponse}
                  </motion.div>
                )}
              </div>

            </div>

            {/* Footer Status */}
            <div className="px-5 py-3 border-t border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[11px] font-mono-tabular text-[#94A3B8]">
              <span>Tokens: 1,420,891 used</span>
              <span className="text-[#F59E0B] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Model: Gemini 1.5 Pro Edge
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
