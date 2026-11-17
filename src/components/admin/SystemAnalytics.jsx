import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Cpu, 
  Award, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const SystemAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Top Aggregate Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Active Capstone Teams",
            value: "48",
            meta: "192 Senior Researchers",
            change: "+8% YoY",
            positive: true,
            icon: Layers,
            accent: "glacier"
          },
          {
            title: "At-Risk Flagged Projects",
            value: "3",
            meta: "6.2% of cohort (Hardware delays)",
            change: "-2 from last sprint",
            positive: true,
            icon: AlertTriangle,
            accent: "coral"
          },
          {
            title: "Faculty Review SLA",
            value: "14.2h",
            meta: "Target benchmark: <24h",
            change: "Ahead by 9.8h",
            positive: true,
            icon: Clock,
            accent: "emerald"
          },
          {
            title: "AI Token Allocation",
            value: "1.42M",
            meta: "Gemini Pro / Claude 3.5 Sonnet",
            change: "68% of monthly pool",
            positive: false,
            icon: Sparkles,
            accent: "amber"
          }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="glass-panel rounded-2xl p-5 border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-[#94A3B8]">
                <span className="text-xs font-medium">{stat.title}</span>
                <div className={`p-1.5 rounded-lg ${
                  stat.accent === 'amber' ? 'bg-[#F59E0B]/15 text-[#F59E0B]' :
                  stat.accent === 'coral' ? 'bg-[#F43F5E]/15 text-[#F43F5E]' :
                  stat.accent === 'emerald' ? 'bg-emerald-500/15 text-emerald-400' :
                  'bg-[#38BDF8]/15 text-[#38BDF8]'
                }`}>
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </div>
              </div>

              <div>
                <span className="text-2xl font-bold font-mono-tabular text-[#F1F5F9]">
                  {stat.value}
                </span>
                <span className="text-[11px] text-[#94A3B8] block mt-0.5">
                  {stat.meta}
                </span>
              </div>

              <div className="pt-2 border-t border-white/[0.04] text-[11px] font-mono-tabular">
                <span className={stat.positive ? "text-emerald-400" : "text-[#F59E0B]"}>
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytical Breakdown Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Research Clusters Distribution (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border-white/[0.08] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h4 className="text-sm font-semibold text-[#F1F5F9]">
                Capstone Engineering Domain Allocation
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Distribution across department research specializations
              </p>
            </div>
            <span className="text-xs font-mono-tabular text-[#94A3B8]">Cohort 2026-F</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { name: "Intelligent Cyber-Physical & Edge Systems", count: 18, pct: 37.5, color: "bg-[#38BDF8]" },
              { name: "Distributed AI & Autonomous Robotics", count: 16, pct: 33.3, color: "bg-[#F59E0B]" },
              { name: "Post-Quantum Cryptography & Privacy Vaults", count: 8, pct: 16.7, color: "bg-emerald-400" },
              { name: "High-Throughput Bio-Inference Computing", count: 6, pct: 12.5, color: "bg-[#94A3B8]" },
            ].map((domain, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between font-mono-tabular">
                  <span className="text-[#F1F5F9]">{domain.name}</span>
                  <span className="text-[#94A3B8]">{domain.count} teams ({domain.pct}%)</span>
                </div>
                <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full ${domain.color}`} style={{ width: `${domain.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Completion Curve (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border-white/[0.08] space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div>
              <h4 className="text-sm font-semibold text-[#F1F5F9]">
                Milestone Compliance Index
              </h4>
              <p className="text-xs text-[#94A3B8]">
                Cohort tracking against scheduled IEEE review dates
              </p>
            </div>
            <Badge variant="emerald" size="xs">94.2%</Badge>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-black/20 border border-white/[0.04] space-y-2">
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#38BDF8]">Ahead of Schedule</span>
                <span className="text-[#F1F5F9] font-bold">20 Teams (41.7%)</span>
              </div>
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-emerald-400">On Track / Nominal</span>
                <span className="text-[#F1F5F9] font-bold">25 Teams (52.1%)</span>
              </div>
              <div className="flex justify-between text-xs font-mono-tabular">
                <span className="text-[#F43F5E]">Pending Revision / Overdue</span>
                <span className="text-[#F43F5E] font-bold">3 Teams (6.2%)</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#94A3B8] leading-relaxed">
              <span className="text-[#F1F5F9] font-medium block mb-1">Audit Policy Verification:</span>
              All 48 teams have cryptographic SHA-256 commit verification enabled. Faculty review response SLA is running 40% faster than Fall 2025 semester benchmark.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
