"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Activity, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function CryptoDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/crypto').then(r => r.json()).then(setData);
  }, []);

  if (!data) {
    return <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"/></div>;
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 font-sans selection:bg-blue-500/30 pb-20">
      
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-wide text-white">CryptoLens</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <span className="text-white">Portfolio</span>
            <span className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">Markets</span>
            <span className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">Arbitrage</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-[#151924] rounded-3xl p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
              <Wallet className="w-96 h-96 -mt-32 -mr-32" />
            </div>
            
            <p className="text-sm font-medium text-slate-500 mb-1">Total Net Worth</p>
            <div className="flex items-end gap-4 mb-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                ${data.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h1>
              <div className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md text-sm font-medium mb-1.5">
                <TrendingUp className="w-4 h-4" /> +12.4%
              </div>
            </div>

            <div className="h-[280px] w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.portfolioHistory}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Stats / Arbitrage Signals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg"><ArrowRightLeft className="w-5 h-5 text-indigo-400" /></div>
                <h3 className="font-semibold text-white">Arbitrage Signals</h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">SOL/USDT spread detected across Binance and Kraken.</p>
              <div className="text-2xl font-bold text-indigo-400">1.2% Spread</div>
            </div>
            
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg"><ShieldAlert className="w-5 h-5 text-red-400" /></div>
                <h3 className="font-semibold text-white">Risk Exposure</h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">High volatility detected in Altcoin sector. Consider hedging.</p>
              <div className="text-2xl font-bold text-red-400">Moderate</div>
            </div>
          </div>
        </div>

        {/* Sidebar: Assets */}
        <div className="lg:col-span-1">
          <div className="bg-[#151924] rounded-3xl p-6 border border-white/5 h-full">
            <h2 className="text-lg font-bold text-white mb-6">Your Assets</h2>
            
            <div className="space-y-4">
              {data.assets.map((asset: any) => (
                <div key={asset.id} className="p-4 rounded-2xl bg-[#0B0E14] border border-white/5 hover:border-blue-500/30 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-sm text-white">
                        {asset.symbol[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white leading-tight">{asset.name}</h3>
                        <p className="text-xs text-slate-500">{asset.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-white">${asset.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                      <p className={cn(
                        "text-xs font-medium flex items-center justify-end gap-1 mt-0.5",
                        asset.change24h >= 0 ? "text-emerald-400" : "text-red-400"
                      )}>
                        {asset.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(asset.change24h)}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="h-10 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={asset.chart}>
                        <defs>
                          <linearGradient id={`grad-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={asset.change24h >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0.2}/>
                            <stop offset="95%" stopColor={asset.change24h >= 0 ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke={asset.change24h >= 0 ? "#10b981" : "#ef4444"} 
                          strokeWidth={2} 
                          fillOpacity={1} 
                          fill={`url(#grad-${asset.id})`} 
                          isAnimationActive={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/5 flex justify-between text-sm">
                    <span className="text-slate-500">Holdings</span>
                    <span className="text-slate-300 font-medium">{asset.balance} {asset.symbol}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
