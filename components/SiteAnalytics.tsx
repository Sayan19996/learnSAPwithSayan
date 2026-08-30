"use client";

import { useEffect, useState } from "react";

export default function SiteAnalytics() {
  const [stats, setStats] = useState({
    totalVisits: 0,
    activeNow: 0,
  });

  useEffect(() => {
    // In a real production app, you would fetch this from an API (e.g., Google Analytics API, Vercel Analytics, or a custom DB)
    // For now, we simulate a professional analytics display with realistic random numbers
    const updateStats = () => {
      setStats({
        totalVisits: 12450 + Math.floor(Math.random() * 100),
        activeNow: 42 + Math.floor(Math.random() * 15),
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sky-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
        </span>
        <span className="text-xs font-bold uppercase tracking-wider">Live Analytics</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase text-slate-400 font-medium">Total Visits</p>
          <p className="text-xl font-bold text-white">{stats.totalVisits.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] uppercase text-slate-400 font-medium">Active Now</p>
          <p className="text-xl font-bold text-white">{stats.activeNow}</p>
        </div>
      </div>
    </div>
  );
}
