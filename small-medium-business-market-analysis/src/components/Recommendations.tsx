import React from 'react';
import { useAssessmentStore } from '../store/assessmentStore';
import { Database, Scale, Cpu, Rocket, TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react';

export function Recommendations() {
    const { totalScore, pillarScores, marketAnalysis } = useAssessmentStore();

    if (totalScore === 0) return null;

    const isExplorer = totalScore < 40;
    const isNavigator = totalScore >= 40 && totalScore <= 75;
    const isEvangelist = totalScore > 75;

    // Get top competitor from market analysis
    const topCompetitor = marketAnalysis?.competitors?.[0];
    const gapInsight = marketAnalysis?.comparison_insight;
    const criticalUpdates = marketAnalysis?.critical_updates || [];
    const recommendations = marketAnalysis?.recommendations || [];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">
                NASSCOM 2.0 Strategic Roadmap
            </h3>

            {/* Gap Analysis Section */}
            {topCompetitor && (
                <div className="glass-panel p-6 border-2 border-consultancy-accent/30 bg-gradient-to-r from-cyan-50/50 to-transparent dark:from-cyan-900/10 dark:to-transparent">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                        <Target className="h-5 w-5 text-consultancy-accent" />
                        Gap Analysis vs Top Performer
                    </h4>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm font-semibold text-consultancy-accent mb-1">🏆 Top Performer Reference:</p>
                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{topCompetitor.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Key Strategy: {topCompetitor.key_strategy}</p>
                        </div>
                        {gapInsight && (
                            <div>
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">📊 Your Gap:</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{gapInsight}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Status Highlight */}
            <div className={`p-4 rounded-xl border ${
                isExplorer ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800' :
                isNavigator ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800'
            }`}>
                <h4 className={`font-semibold mb-2 flex items-center ${
                    isExplorer ? 'text-amber-800 dark:text-amber-300' :
                    isNavigator ? 'text-blue-800 dark:text-blue-300' :
                    'text-emerald-800 dark:text-emerald-300'
                }`}>
                    <Rocket className="mr-2 h-5 w-5" /> 
                    {isExplorer ? 'Phase 1: Foundation Building' : 
                     isNavigator ? 'Phase 2: Scale & Optimization' : 
                     'Phase 3: Industry Leadership'}
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                    {isExplorer ? 'Prioritize Data Readiness and Ethical Guidelines before scaling GenAI.' :
                     isNavigator ? 'Focus on Hub-and-Spoke Operating Models and specialized GenAI integration.' :
                     'Leverage IndiaAI Compute Pillar and R&D grants to maintain Evangelist status.'}
                </p>
            </div>

            {/* Critical Updates (Dynamic) */}
            {criticalUpdates.length > 0 && (
                <div className="glass-panel p-6 border-l-4 border-l-red-500">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Critical Updates for Your Stage
                    </h4>
                    <div className="space-y-2">
                        {criticalUpdates.slice(0, 4).map((update, idx) => (
                            <div key={idx} className="flex gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 dark:text-slate-300">{update}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {/* Specific Dimension Advice */}
                <div className="glass-panel p-4 flex gap-4">
                    <Database className="h-6 w-6 text-consultancy-blue flex-shrink-0" />
                    <div>
                        <h5 className="font-semibold text-slate-900 dark:text-white">Data & Tech Readiness</h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {pillarScores.dataReadiness < 30 
                                ? 'Move from manual processing to a Centralized Data Lake to support model training.'
                                : 'Implement automated ML-Ops pipelines for continuous model deployment.'}
                        </p>
                    </div>
                </div>

                <div className="glass-panel p-4 flex gap-4">
                    <Scale className="h-6 w-6 text-consultancy-blue flex-shrink-0" />
                    <div>
                        <h5 className="font-semibold text-slate-900 dark:text-white">Ethics & Governance</h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {pillarScores.ethicsGovernance < 30
                                ? 'Establish manual review cycles for AI outputs to mitigate bias.'
                                : 'Deploy automated guardrails and real-time compliance monitoring.'}
                        </p>
                    </div>
                </div>

                {/* Dynamic Recommendations */}
                {recommendations.length > 0 && (
                    <div className="glass-panel p-4 flex gap-4">
                        <TrendingUp className="h-6 w-6 text-consultancy-accent flex-shrink-0" />
                        <div className="w-full">
                            <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Market-Driven Recommendations</h5>
                            <div className="space-y-2">
                                {recommendations.slice(0, 3).map((rec, idx) => (
                                    <p key={idx} className="text-sm text-slate-600 dark:text-slate-400">
                                        <span className="font-medium text-consultancy-blue">•</span> {rec}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {isEvangelist && (
                    <div className="space-y-4 pt-4">
                        <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-consultancy-accent" /> Advanced Opportunities
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="glass-panel p-5 border-l-4 border-l-consultancy-accent">
                                <h5 className="font-semibold text-slate-900 dark:text-white">IndiaAI Compute Pillar</h5>
                                <p className="text-sm text-slate-500 mt-2 mb-4">Qualify for GPU subsidies via NASSCOM's Evangelist track.</p>
                                <button className="text-xs font-bold text-consultancy-blue uppercase tracking-wider">Check Eligibility →</button>
                            </div>
                            <div className="glass-panel p-5 border-l-4 border-l-cyan-500">
                                <h5 className="font-semibold text-slate-900 dark:text-white">GenAI R&D Grants</h5>
                                <p className="text-sm text-slate-500 mt-2 mb-4">Access innovation funds for custom LLM fine-tuning projects.</p>
                                <button className="text-xs font-bold text-consultancy-blue uppercase tracking-wider">Explore Grants →</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
