'use client';

import { useState } from 'react';
import axios from 'axios';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🏇 Equine Oracle</h1>
          <p className="text-xl text-gray-300">AI-Powered Horse Racing Predictions</p>
          <p className="text-sm text-gray-400 mt-2">Powered by Railway ML API</p>
        </header>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Distance (meters)
                </label>
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Days Since Last Race
                </label>
                <input
                  type="number"
                  name="daysSinceLastRace"
                  value={formData.daysSinceLastRace}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Previous Race Won (0 or 1)
                </label>
                <input
                  type="number"
                  name="prevRaceWon"
                  value={formData.prevRaceWon}
                  onChange={handleChange}
                  min="0"
                  max="1"
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Win Streak
                </label>
                <input
                  type="number"
                  name="winStreak"
                  value={formData.winStreak}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Implied Probability (0-1)
                </label>
                <input
                  type="number"
                  name="impliedProbability"
                  value={formData.impliedProbability}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="1"
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Normalized Volume (0-1)
                </label>
                <input
                  type="number"
                  name="normalizedVolume"
                  value={formData.normalizedVolume}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="1"
                  className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Predicting...' : 'Get Prediction'}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-lg">
              <h3 className="text-2xl font-bold text-white mb-4">Prediction Result</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 text-sm">Win Probability</p>
                  <p className="text-4xl font-bold text-green-400">
                    {(result.prediction * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Confidence</p>
                  <p className="text-4xl font-bold text-blue-400">
                    {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center mt-12 text-gray-400">
          <p>Powered by LightGBM ML Model • Railway Backend • Next.js Frontend</p>
        </footer>
      </div>
    </div>
  );
}
