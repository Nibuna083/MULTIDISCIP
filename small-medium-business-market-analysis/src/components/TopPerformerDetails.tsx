import React from 'react';
import { Trophy, TrendingUp, Target, Zap, AlertCircle } from 'lucide-react';

export interface TopPerformerDetailsProps {
  topPerformer: {
    name: string;
    website: string;
    description: string;
    bestPractices: string[];
    successRatio: string;
    keyStrengths: string[];
    marketPosition: string;
  };
  userMaturity: string;
  userScore: number;
}

export function TopPerformerDetailsComponent({ topPerformer, userMaturity, userScore }: TopPerformerDetailsProps) {
  if (!topPerformer) return null;

  // Calculate gap percentage (simplified)
  const topPerformerScore = 90; // Assumption: Top performers score around 90
  const gapPercentage = Math.round(((topPerformerScore - userScore) / topPerformerScore) * 100);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Performer Header */}
      <div className="glass-panel p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 rounded-lg">
              <Trophy className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{topPerformer.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{topPerformer.marketPosition}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-amber-600 dark:text-amber-400">{topPerformer.successRatio}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Success Ratio</p>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mb-4">{topPerformer.description}</p>
        <a
          href={topPerformer.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-amber-600 dark:text-amber-400 font-semibold hover:underline"
        >
          Visit Company →
        </a>
      </div>

      {/* Gap Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Position vs Theirs */}
        <div className="glass-panel p-6 border-l-4 border-l-red-500 bg-red-50/50 dark:bg-red-900/20">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h4 className="font-bold text-slate-900 dark:text-white">Maturity Gap</h4>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-300">Your Maturity</span>
                <span className="font-bold text-slate-900 dark:text-white">{userScore}/100</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${userScore}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-300">Industry Leader</span>
                <span className="font-bold text-slate-900 dark:text-white">90/100</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>

            <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded-lg mt-4 border border-red-200 dark:border-red-800">
              <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                Gap: <span className="text-lg">{gapPercentage}%</span>
              </p>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                Time to close: ~{Math.ceil(gapPercentage / 10)} years at current pace
              </p>
            </div>
          </div>
        </div>

        {/* What They're Good At */}
        <div className="glass-panel p-6 border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-slate-900 dark:text-white">Their Key Strengths</h4>
          </div>
          <div className="space-y-2">
            {topPerformer.keyStrengths.map((strength, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-700/50"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400 flex-shrink-0"></div>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="glass-panel p-6 border-t-4 border-t-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          <h4 className="font-bold text-slate-900 dark:text-white">Best Practices You Should Adopt</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topPerformer.bestPractices.map((practice, idx) => (
            <div
              key={idx}
              className="p-4 bg-cyan-100/50 dark:bg-cyan-900/30 rounded-lg border border-cyan-200 dark:border-cyan-700/50 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-cyan-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{practice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Differences Summary */}
      <div className="glass-panel p-6 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h4 className="font-bold text-slate-900 dark:text-white">Key Differences & Action Items</h4>
        </div>
        <div className="space-y-3">
          <div className="p-4 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border-l-4 border-l-blue-500">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              🎯 Strategic Execution
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              They prioritize implementation over planning. Your organization should move from planning to execution phase within the next quarter.
            </p>
          </div>

          <div className="p-4 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border-l-4 border-l-blue-500">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              📊 Data Infrastructure
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              You lack robust data pipelines. Invest in building a centralized data lake with proper governance as your first initiative.
            </p>
          </div>

          <div className="p-4 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border-l-4 border-l-blue-500">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              👥 Team Capabilities
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Build specialized AI/ML teams. Top performers have dedicated teams working on each capability area independently.
            </p>
          </div>

          <div className="p-4 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg border-l-4 border-l-blue-500">
            <p className="text-sm font-medium text-slate-900 dark:text-white mb-2">
              🚀 Speed to Value
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Start with POC projects. Quick wins build momentum and organizational buy-in for larger AI initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
