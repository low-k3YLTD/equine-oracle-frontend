'use client';

import { useState } from 'react';
import axios from 'axios';
import { Trophy, Zap, TrendingUp, ArrowRight, Shield, BarChart3 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://equine-oracle-system-production.up.railway.app';

interface PredictionResult {
  prediction: number;
  confidence: number;
}

export default function Home() {
  const [formData, setFormData] = useState({
    distance: 1600,
    year: 2025,
    month: 12,
    day: 22,
    daysSinceLastRace: 14,
    prevRaceWon: 0,
    winStreak: 0,
    impliedProbability: 0.5,
    normalizedVolume: 0.5,
    marketActivityWindowHours: 24,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/api/predict`, {
        raceId: `race_${Date.now()}`,
        horseId: `horse_${Date.now()}`,
        features: {
          distance: formData.distance,
          distance_numeric: formData.distance,
          year: formData.year,
          month: formData.month,
          day: formData.day,
          day_of_week: new Date(formData.year, formData.month - 1, formData.day).getDay(),
          week_of_year: Math.ceil((new Date(formData.year, formData.month - 1, formData.day).getTime() - new Date(formData.year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000)),
          days_since_last_race: formData.daysSinceLastRace,
          PREV_RACE_WON: formData.prevRaceWon,
          WIN_STREAK: formData.winStreak,
          IMPLIED_PROBABILITY: formData.impliedProbability,
          NORMALIZED_VOLUME: formData.normalizedVolume,
          MARKET_ACTIVITY_WINDOW_HOURS: formData.marketActivityWindowHours,
        },
      });

      setResult(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'Failed to get prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950 pb-16 pt-24 lg:pb-32 lg:pt-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#0ea5e933,transparent)]" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-400 mb-8">
            <Zap className="h-4 w-4" />
            <span>Oracle Engine v2.0 Live</span>
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl mb-8">
            Predict the Track with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Unrivaled Precision
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10">
            The Equine Oracle uses advanced machine learning to analyze thousands of data points, 
            giving you the edge in New Zealand horse racing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => document.getElementById('predictor')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition-all hover:bg-cyan-400"
            >
              Start Predicting
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="rounded-full border border-slate-700 bg-slate-900/50 px-6 py-3 font-semibold transition-all hover:bg-slate-800">
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Predictor Section */}
      <section id="predictor" className="py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold sm:text-4xl">Oracle Predictor</h2>
              <p className="text-slate-400">
                Enter the race parameters below to generate a high-confidence prediction. 
                Our models consider distance, form, market activity, and historical streaks.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure Analysis</h3>
                    <p className="text-sm text-slate-400">Encrypted data processing</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Real-time Sync</h3>
                    <p className="text-sm text-slate-400">Live market updates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Distance (m)</label>
                    <input
                      type="number"
                      name="distance"
                      value={formData.distance}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Days Since Last Race</label>
                    <input
                      type="number"
                      name="daysSinceLastRace"
                      value={formData.daysSinceLastRace}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Win Streak</label>
                    <input
                      type="number"
                      name="winStreak"
                      value={formData.winStreak}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Implied Prob (0-1)</label>
                    <input
                      type="number"
                      name="impliedProbability"
                      value={formData.impliedProbability}
                      onChange={handleChange}
                      step="0.01"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-100 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-slate-950 transition-all hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Consulting Oracle...' : 'Generate Prediction'}
                </button>
              </form>

              {error && (
                <div className="mt-6 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
                  {error}
                </div>
              )}

              {result && (
                <div className="mt-8 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-2 text-cyan-400 mb-4">
                    <Trophy className="h-5 w-5" />
                    <span className="font-bold uppercase tracking-wider text-sm">Oracle Result</span>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs text-slate-400 uppercase mb-1">Win Probability</p>
                      <p className="text-4xl font-bold text-white">{(result.prediction * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase mb-1">Confidence</p>
                      <p className="text-4xl font-bold text-cyan-400">{(result.confidence * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-cyan-500" />
            <span className="text-xl font-bold">Equine Oracle</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Equine Oracle System. Powered by LightGBM & Railway.
          </p>
        </div>
      </footer>
    </div>
  );
}
