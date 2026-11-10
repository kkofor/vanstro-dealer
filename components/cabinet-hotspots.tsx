'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Check, Layers, Wrench, Sparkles, ChevronRight } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  badge: string;
  description: string;
  advantage: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'plywood',
    x: 28,
    y: 35,
    title: '¾" Furniture-Grade Plywood Boxes',
    badge: 'Structural Core',
    description: 'Every VanStro cabinet box—sides, top, bottom, and back—is constructed from heavy ¾" furniture-grade birch plywood. No flimsy ¼" backs and zero particle board.',
    advantage: 'Won’t sag under heavy granite/quartz countertops and resists Winnipeg winter-summer moisture fluctuations.',
  },
  {
    id: 'hinges',
    x: 48,
    y: 33,
    title: '6-Way Adjustable Soft-Close Hinges',
    badge: 'Hardware Standard',
    description: 'Concealed European-style clip-on hinges with integrated hydraulic dampers for silent, gentle door closing every single time.',
    advantage: 'Rated for 100,000 cycles with quick 3D cam screwdriver adjustment for laser-straight door alignment.',
  },
  {
    id: 'shaker-finish',
    x: 72,
    y: 28,
    title: 'MDF 5-Piece Shaker Door (Pure White & Light Grey)',
    badge: 'Surface & Finish',
    description: 'Precision-routed high-density MDF core coated with a durable, multi-stage baked enamel finish in Pure White or Contemporary Light Grey.',
    advantage: 'Unlike solid wood that cracks at miter joints during prairie dry freezes, MDF Shaker remains perfectly flat and crack-free.',
  },
  {
    id: 'drawers',
    x: 65,
    y: 68,
    title: 'Dovetail Drawers & Undermount Glides',
    badge: 'Storage Joinery',
    description: 'Solid natural birch drawer sides with interlocking French dovetail corners, paired with concealed undermount soft-close glides.',
    advantage: '100lb load rating per drawer—built for cast iron pans, heavy small appliances, and daily family use.',
  },
];

export default function CabinetHotspots() {
  const [activeId, setActiveId] = useState<string>('plywood');
  const activeSpot = HOTSPOTS.find((h) => h.id === activeId) || HOTSPOTS[0];

  return (
    <div className="bg-stone-900 text-white rounded-2xl overflow-hidden border border-stone-800 shadow-xl">
      {/* Top Banner */}
      <div className="px-6 py-4 bg-stone-950/80 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-[#f28a0b]">
            Architectural Engineering
          </span>
          <h3 className="text-lg font-bold text-white">
            Anatomy of a VanStro Cabinet: ¾&quot; Solid Plywood Construction
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Backed by 12-Month Local Winnipeg Warranty</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Interactive Image with clickable markers */}
        <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[420px] bg-stone-950 flex items-center justify-center p-4">
          <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl overflow-hidden shadow-inner">
            <Image
              src="/src/assets/images/vanstro_cabinet_craftsmanship_1794345756645.jpg"
              alt="VanStro 3/4 inch solid plywood cabinet box cutaway with soft close hinge and dovetail drawer"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Dark gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/30 pointer-events-none" />

            {/* Clickable Hotspot Pins */}
            {HOTSPOTS.map((spot) => {
              const isActive = spot.id === activeId;
              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveId(spot.id)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  aria-label={`Inspect ${spot.title}`}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-transform ${
                    isActive ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isActive ? 'bg-[#f28a0b]' : 'bg-white/40'
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center border-2 shadow-md transition-colors ${
                        isActive
                          ? 'bg-[#f28a0b] border-white text-white font-bold text-xs'
                          : 'bg-[#003f3f] border-white/80 text-white font-semibold text-xs'
                      }`}
                    >
                      +
                    </span>
                  </span>
                </button>
              );
            })}

            {/* Bottom image overlay prompt */}
            <div className="absolute bottom-3 left-3 right-3 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-800 text-[11px] text-stone-300 flex items-center justify-between">
              <span>Click any pin to inspect structural joinery & materials</span>
              <span className="text-stone-400 font-mono text-[10px]">100% Plywood Core</span>
            </div>
          </div>
        </div>

        {/* Right: Technical Inspector Breakdown */}
        <div className="lg:col-span-5 p-6 bg-stone-900 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-800">
          <div className="space-y-4">
            {/* Pill tabs for fast switching */}
            <div className="grid grid-cols-2 gap-1.5">
              {HOTSPOTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium text-left truncate transition-colors ${
                    s.id === activeId
                      ? 'bg-[#f28a0b] text-white font-semibold'
                      : 'bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700'
                  }`}
                >
                  {s.badge}
                </button>
              ))}
            </div>

            {/* Selected Spec Card */}
            <div className="pt-2">
              <span className="inline-block text-[11px] font-mono uppercase tracking-wider text-[#f28a0b] mb-1">
                {activeSpot.badge} Specification
              </span>
              <h4 className="text-xl font-bold text-white tracking-tight leading-snug">
                {activeSpot.title}
              </h4>
              <p className="mt-2 text-stone-300 text-sm leading-relaxed">
                {activeSpot.description}
              </p>
            </div>

            {/* Prairie Advantage box */}
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#f28a0b]">
                <Sparkles className="w-4 h-4" />
                <span>The Winnipeg & Manitoba Advantage</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {activeSpot.advantage}
              </p>
            </div>

            {/* Quality Comparison vs Big Box Stores */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Cabinet Box Material:</span>
                <span className="font-semibold text-emerald-400">¾&quot; Solid Plywood</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Big Box Standard:</span>
                <span className="text-stone-500 line-through">½&quot; Particle Board / MDF core</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-stone-800">
                <span className="text-stone-400">Door Hardware:</span>
                <span className="font-semibold text-emerald-400">Concealed Soft-Close Included</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-stone-400">Local Pickup:</span>
                <span className="font-semibold text-white">856 Century St (Same / Next Day)</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800 text-xs text-stone-400 flex items-center justify-between">
            <span>Inspect samples in person at 856 Century St</span>
            <span className="font-semibold text-[#f28a0b]">Mon–Fri 9am–5pm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
