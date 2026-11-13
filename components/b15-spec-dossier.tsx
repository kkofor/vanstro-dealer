'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Copy,
  Check,
  ShieldCheck,
  Navigation,
  Phone,
  Layers,
  Wrench,
  Package,
  ArrowUpRight,
  FileText,
  Download,
  Eye,
  X,
  Ruler
} from 'lucide-react';

type SpecTab = 'specs' | 'manuals' | 'compare' | 'assembly' | 'pickup';
type CadView = 'front' | 'side' | 'plan';
type UnitMode = 'in' | 'mm';
type HighlightZone = 'drawer' | 'door' | 'box' | 'toekick' | null;

interface TechnicalDocument {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  format: 'PDF' | 'CAD / DXF';
  size: string;
  updated: string;
  highlights: string[];
  body: string[];
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const B15_DOCUMENTS: TechnicalDocument[] = [
  {
    id: 'assembly-manual',
    code: 'DOC-B15-ASM',
    title: 'B15 Assembly & Cam-Lock Manual',
    subtitle: 'Step-by-step RTA joinery, dovetail drawer build & DTC hinge tuning',
    format: 'PDF',
    size: '2.4 MB',
    updated: 'Rev 2026.2',
    highlights: [
      'Estimated build time: 15 minutes with #2 Phillips driver & PVA wood glue',
      'Panel inventory check: Left/Right ¾" side walls, ¾" bottom floor, ¾" back frame',
      '6-way DTC concealed hinge camber, depth & vertical reveal adjustment',
    ],
    body: [
      'Step 1 — Lay left and right ¾" birch plywood side panels flat on a clean drop cloth with cam-lock pockets facing upward.',
      'Step 2 — Insert wooden dowels and apply a thin bead of PVA wood glue along dado grooves before seating the ¾" full back panel and floor deck.',
      'Step 3 — Lock quarter-turn metal cam fasteners clockwise until flush; verify squareness diagonally before attaching front toe-kick cleats.',
      'Step 4 — Assemble the ⅝" solid birch French dovetail drawer box, snap onto DTC full-extension undermount glides, and clip on the Shaker door.',
    ],
  },
  {
    id: 'spec-cut-sheet',
    code: 'DOC-B15-SPEC',
    title: 'Architectural Spec & Cut Sheet',
    subtitle: 'Imperial/metric clearances, stud-anchoring load chart & swing arc',
    format: 'PDF',
    size: '1.1 MB',
    updated: 'Rev 2026.1',
    highlights: [
      'Nominal Envelope: 15.0" W × 34.5" H × 24.0" D (381 × 876 × 610 mm)',
      'Finished Countertop Height: 36.0" (914 mm) with standard 1½" slab overhang',
      'Recessed Toe Kick: 4.5" H × 3.0" D · Adjustable Shelf Rating: 200 lbs static',
    ],
    body: [
      'Carcass Construction: ¾" (18 mm) A/B furniture-grade multi-ply birch plywood box with full ¾" structural back (zero ¼" hardboard).',
      'Door & Drawer Fronts: 5-piece high-density MDF Shaker stiles and rails finished in baked Pure White or Light Grey matte enamel.',
      'Hardware Schedule: DTC 110° clip-on 6-way soft-close hinges (100,000-cycle ANSI/KCMA rated) and full-extension undermount drawer runners.',
      'Flat-Pack Shipping Carton: 36" × 25" × 5" (48 lbs / 21.8 kg) — engineered to fit standard SUVs, hatchbacks, and contractor vans.',
    ],
  },
  {
    id: 'cad-library',
    code: 'DOC-B15-CAD',
    title: '2020 Design & CAD Floorplan Pack',
    subtitle: 'Elevations & 3D cabinet block for contractors and kitchen designers',
    format: 'CAD / DXF',
    size: '4.8 MB',
    updated: '2026 Release',
    highlights: [
      'Includes 2D DXF front/side/plan elevations and 3D millwork catalog geometry',
      'Matches VanStro SKU 011720130 frameless 32mm European bore spacing',
      'Ready for direct import into 2020 Design, AutoCAD, and SketchUp Pro',
    ],
    body: [
      'Package Contents: B15_Front_Elev.dxf, B15_Section_Side.dxf, B15_Plan_Swing95.dxf, and VanStro_Shaker_Catalog.skp.',
      'Bore & Reveal Tolerances: Standard 3 mm exterior door-to-drawer reveal; left or right field-reversible hinge cup boring on vertical stiles.',
      'Contractor Tip: Combine with SB36 Sink Base and W1530 Wall Unit blocks when preparing municipal permit drawings or client 3D renders.',
    ],
  },
  {
    id: 'warranty-care',
    code: 'DOC-B15-WRT',
    title: '12-Month Warranty & Finish Care Guide',
    subtitle: 'Winnipeg coverage terms, humidity guidance & baked enamel cleaning',
    format: 'PDF',
    size: '680 KB',
    updated: '2026 Policy',
    highlights: [
      '12-Month Local VanStro Warranty covering box joinery, finish & soft-close hardware',
      'Direct replacement claims handled locally through 856 Century Street, Winnipeg',
      'Zero abrasive cleaners required — damp microfiber cloth preserves matte sheen',
    ],
    body: [
      'Warranty Coverage: VanStro warrants Base Cabinet B15 (SKU 011720130) against manufacturing defects in ¾" plywood joinery, MDF Shaker finish adhesion, and DTC soft-close hardware for 12 months from date of pickup.',
      'Care Instructions: Wipe matte White or Light Grey Shaker surfaces promptly with a soft damp microfiber cloth and mild dish soap. Dry excess moisture immediately around sink bases.',
      'Claim Process: Present your original VanStro order number or call 1-855-826-7876 for fast local part swap at 856 Century St, Winnipeg.',
    ],
  },
];

export default function B15SpecDossier() {
  const [activeTab, setActiveTab] = useState<SpecTab>('specs');
  const [unit, setUnit] = useState<UnitMode>('in');
  const [cadView, setCadView] = useState<CadView>('front');
  const [hoverZone, setHoverZone] = useState<HighlightZone>(null);
  const [copied, setCopied] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<TechnicalDocument | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const dims =
    unit === 'in'
      ? {
          w: '15.0"',
          h: '34.5"',
          d: '24.0"',
          counterH: '36.0"',
          kickH: '4.5"',
          kickD: '3.0"',
          boxThick: '¾" (18mm)',
          drawerSide: '⅝" Solid Birch',
          carton: '36" × 25" × 5"',
          weight: '48 lbs',
        }
      : {
          w: '381 mm',
          h: '876 mm',
          d: '610 mm',
          counterH: '914 mm',
          kickH: '114 mm',
          kickD: '76 mm',
          boxThick: '18 mm (¾")',
          drawerSide: '16 mm Birch',
          carton: '914 × 635 × 127 mm',
          weight: '21.8 kg',
        };

  const handleCopySpecs = () => {
    const text = `VanStro Base Cabinet B15 (SKU: 011720130) | ${dims.w} W × ${dims.h} H × ${dims.d} D | ${dims.boxThick} Birch Plywood Box | 5-Piece MDF Shaker | DTC 6-Way Soft-Close | Pickup: 856 Century St, Winnipeg`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleDownloadDoc = (doc: TechnicalDocument) => {
    if (typeof window !== 'undefined') {
      const fileText = [
        `VANSTRO BUILDING MATERIALS — TECHNICAL DOCUMENTATION`,
        `Document Code: ${doc.code} (${doc.updated})`,
        `Product: Base Cabinet B15 (SKU: 011720130 | Model: B15-PWMS)`,
        `Title: ${doc.title}`,
        `Dimensions (${unit.toUpperCase()}): ${dims.w} W × ${dims.h} H × ${dims.d} D`,
        `Carton: ${dims.carton} (${dims.weight})`,
        `------------------------------------------------------------`,
        ``,
        `KEY HIGHLIGHTS:`,
        ...doc.highlights.map((h) => `• ${h}`),
        ``,
        `TECHNICAL NOTES:`,
        ...doc.body,
        ``,
        `------------------------------------------------------------`,
        `Winnipeg Distribution Hub: 856 Century Street, Winnipeg, MB R3H 0M5`,
        `Phone: 1-855-826-7876 | Hours: Mon–Fri, 9:00 a.m. – 5:00 p.m.`,
      ].join('\n');

      const blob = new Blob([fileText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `VanStro-${doc.code}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setDownloadedId(doc.id);
    setTimeout(() => {
      setDownloadedId((curr) => (curr === doc.id ? null : curr));
    }, 2000);
  };

  return (
    <section
      id="specs-section"
      className="mt-16 bg-white rounded-2xl border border-stone-200/90 overflow-hidden"
    >
      {/* Top Architectural Tab Rail */}
      <div className="bg-stone-50/80 border-b border-stone-200/90 px-4 sm:px-8 pt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'specs', label: 'Engineering & Dimensions' },
            { id: 'manuals', label: 'Manuals & Documents' },
            { id: 'compare', label: '¾" Plywood vs. Particle Board' },
            { id: 'assembly', label: '15-Min RTA Assembly' },
            { id: 'pickup', label: 'Pickup & Warranty' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as SpecTab)}
                className={`relative px-3.5 py-3 text-xs sm:text-[13px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  isActive ? 'text-[#003f3f]' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="b15-spec-tab-indicator"
                    transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003f3f]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Utility Micro-Actions: Copy Spec + Unit Toggle */}
        {activeTab === 'specs' && (
          <div className="flex items-center gap-2.5 pb-3 sm:pb-2 shrink-0">
            <button
              type="button"
              onClick={handleCopySpecs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white hover:border-stone-300 text-xs font-medium text-stone-700 transition-colors whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Specs Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-400" />
                  <span>Copy Spec</span>
                </>
              )}
            </button>

            <div className="flex items-center p-0.5 bg-stone-200/70 rounded-lg">
              {(['in', 'mm'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setUnit(mode)}
                  className={`relative px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    unit === mode ? 'text-stone-900' : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  {unit === mode && (
                    <motion.span
                      layoutId="b15-unit-pill"
                      transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                      className="absolute inset-0 bg-white rounded-md shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{mode === 'in' ? 'IN' : 'MM'}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tab Content Area */}
      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {activeTab === 'specs' && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
            >
              {/* LEFT (7 cols): Structured 3-Tier Architectural Engineering Dossier */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-7">
                {/* Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-stone-200">
                  <div>
                    <p className="text-xs font-mono text-[#f28a0b] font-semibold">
                      Engineering Dossier · SKU 011720130
                    </p>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#003f3f] tracking-tight mt-0.5">
                      Technical Specifications — Model B15
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-stone-500 tabular-nums">
                    Rev 2026 · ±0.5 mm tolerance
                  </span>
                </div>

                {/* Group 01: Primary Spatial Envelope (Clean 4-Cell Metric Strip) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-stone-900 tracking-tight">
                      01. Spatial Envelope &amp; Clearances
                    </h3>
                    <span className="text-[11px] font-mono text-stone-400 tabular-nums">
                      Countertop height reaches {dims.counterH}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-stone-200 border border-stone-200 rounded-xl overflow-hidden">
                    {[
                      { label: 'Cabinet Width', val: dims.w, zone: 'box' as HighlightZone },
                      { label: 'Cabinet Height', val: dims.h, zone: 'box' as HighlightZone },
                      { label: 'Box Depth', val: dims.d, zone: 'box' as HighlightZone },
                      { label: 'Toe Kick', val: `${dims.kickH} × ${dims.kickD}`, zone: 'toekick' as HighlightZone },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        onMouseEnter={() => setHoverZone(metric.zone)}
                        onMouseLeave={() => setHoverZone(null)}
                        className={`p-3.5 sm:p-4 bg-stone-50/70 hover:bg-white transition-colors cursor-default ${
                          hoverZone === metric.zone ? 'bg-white' : ''
                        }`}
                      >
                        <span className="block text-[11px] text-stone-500 font-medium">
                          {metric.label}
                        </span>
                        <span className="block text-base sm:text-lg font-extrabold font-mono text-[#003f3f] tabular-nums mt-1">
                          {metric.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Group 02: Structural Carcass & Millwork (Clean Two-Column Spec Matrix) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-900 tracking-tight">
                    02. Structural Carcass &amp; Millwork
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: 'Box Carcass',
                        spec: `${dims.boxThick} Birch Plywood`,
                        detail: 'Furniture-grade multi-ply sides, floor & stretchers. Zero particle board.',
                        zone: 'box' as HighlightZone,
                      },
                      {
                        title: 'Back Panel Frame',
                        spec: '¾" Solid Plywood',
                        detail: 'Full-thickness structural back for direct stud anchoring.',
                        zone: 'box' as HighlightZone,
                      },
                      {
                        title: 'Shaker Door & Front',
                        spec: '5-Piece MDF Enamel',
                        detail: 'High-density core resists Manitoba dry-winter joint cracking.',
                        zone: 'door' as HighlightZone,
                      },
                      {
                        title: 'Drawer Box Joinery',
                        spec: `${dims.drawerSide} Dovetail`,
                        detail: 'Interlocking French dovetail corners with ¼" captured bottom.',
                        zone: 'drawer' as HighlightZone,
                      },
                    ].map((card) => {
                      const highlighted = hoverZone === card.zone;
                      return (
                        <div
                          key={card.title}
                          onMouseEnter={() => setHoverZone(card.zone)}
                          onMouseLeave={() => setHoverZone(null)}
                          className={`p-4 rounded-xl border transition-all cursor-default ${
                            highlighted
                              ? 'border-[#003f3f] bg-teal-50/30'
                              : 'border-stone-200/80 bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-xs text-stone-500 font-medium">{card.title}</span>
                            <span className="text-xs font-mono font-bold text-stone-900 tabular-nums">
                              {card.spec}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-relaxed mt-1.5">
                            {card.detail}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Group 03: Kinetic Hardware & Logistics Strip */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-stone-900 tracking-tight">
                    03. Kinetic Hardware &amp; Flat-Pack Logistics
                  </h3>

                  <div className="divide-y divide-stone-200/80 border border-stone-200/80 rounded-xl bg-stone-50/40 px-4 text-xs">
                    {[
                      {
                        k: 'Door Hinges',
                        v: 'DTC 6-Way Adjustable Soft-Close',
                        meta: '100,000-cycle rated · Included',
                        zone: 'door' as HighlightZone,
                      },
                      {
                        k: 'Drawer Slides',
                        v: 'Full-Extension Undermount Soft-Close',
                        meta: 'Concealed steel tracks',
                        zone: 'drawer' as HighlightZone,
                      },
                      {
                        k: 'Interior Shelf',
                        v: '1 × ¾" Adjustable Birch Plywood',
                        meta: '200 lb static load rating',
                        zone: 'box' as HighlightZone,
                      },
                      {
                        k: 'Flat-Pack Carton',
                        v: `${dims.carton} (${dims.weight})`,
                        meta: 'Fits any SUV, minivan or trunk',
                        zone: null,
                      },
                    ].map((row) => (
                      <div
                        key={row.k}
                        onMouseEnter={() => setHoverZone(row.zone)}
                        onMouseLeave={() => setHoverZone(null)}
                        className="py-3 grid grid-cols-12 gap-2 items-center"
                      >
                        <span className="col-span-4 sm:col-span-3 text-stone-500 font-medium">
                          {row.k}
                        </span>
                        <span className="col-span-8 sm:col-span-5 font-bold text-stone-900 tabular-nums">
                          {row.v}
                        </span>
                        <span className="hidden sm:block sm:col-span-4 text-right text-[11px] font-mono text-stone-500">
                          {row.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT (5 cols): Balanced Stack — Interactive CAD Plate + Manuals & Documents */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-5">
                {/* 1. Bespoke Architectural CAD Drafting Plate */}
                <div className="bg-[#002626] text-stone-100 rounded-2xl border border-teal-900/80 p-5 sm:p-6 space-y-4">
                  {/* CAD Plate Header & View Switcher */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono text-[#f28a0b] font-semibold block">
                        CAD Plate · B15
                      </span>
                      <span className="text-xs font-semibold text-white">
                        Interactive Millwork Blueprint
                      </span>
                    </div>

                    {/* CAD View Segmented Control */}
                    <div className="flex items-center p-0.5 bg-black/30 rounded-lg border border-teal-800/60 shrink-0">
                      {([
                        { id: 'front', label: 'Front' },
                        { id: 'side', label: 'Side' },
                        { id: 'plan', label: 'Plan' },
                      ] as const).map((v) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setCadView(v.id)}
                          className={`relative px-2.5 py-1 text-[11px] font-mono font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                            cadView === v.id ? 'text-white' : 'text-teal-300/70 hover:text-white'
                          }`}
                        >
                          {cadView === v.id && (
                            <motion.span
                              layoutId="b15-cad-view-pill"
                              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                              className="absolute inset-0 bg-[#004d4d] border border-teal-500/40 rounded-md"
                            />
                          )}
                          <span className="relative z-10">{v.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CAD Drafting Canvas with Subtle Blueprint Grid */}
                  <div
                    className="relative rounded-xl border border-teal-800/70 bg-[#001d1d] p-4 min-h-[290px] flex items-center justify-center overflow-hidden"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {cadView === 'front' && (
                        <motion.svg
                          key="front"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                          viewBox="0 0 280 310"
                          className="w-full max-w-[235px] h-auto select-none"
                          role="img"
                          aria-label="Front elevation blueprint of Base Cabinet B15"
                        >
                          {/* Top Width Witness Lines */}
                          <line x1="65" y1="22" x2="65" y2="38" stroke="#5eead4" strokeWidth="0.75" strokeOpacity="0.6" />
                          <line x1="205" y1="22" x2="205" y2="38" stroke="#5eead4" strokeWidth="0.75" strokeOpacity="0.6" />
                          <line x1="65" y1="28" x2="205" y2="28" stroke="#f28a0b" strokeWidth="1" />
                          <circle cx="65" cy="28" r="2" fill="#f28a0b" />
                          <circle cx="205" cy="28" r="2" fill="#f28a0b" />
                          <text x="135" y="18" textAnchor="middle" fill="#f28a0b" fontSize="11" fontFamily="monospace" fontWeight="700">
                            {dims.w} W
                          </text>

                          {/* Main Cabinet Outer Frame */}
                          <rect
                            x="65"
                            y="42"
                            width="140"
                            height="245"
                            fill={hoverZone === 'box' ? 'rgba(242,138,11,0.12)' : 'rgba(255,255,255,0.03)'}
                            stroke={hoverZone === 'box' ? '#f28a0b' : '#99f6e4'}
                            strokeWidth="1.5"
                            onMouseEnter={() => setHoverZone('box')}
                            onMouseLeave={() => setHoverZone(null)}
                            className="cursor-pointer transition-colors"
                          />

                          {/* Top Drawer */}
                          <rect
                            x="69"
                            y="46"
                            width="132"
                            height="48"
                            fill={hoverZone === 'drawer' ? 'rgba(242,138,11,0.22)' : 'rgba(255,255,255,0.04)'}
                            stroke={hoverZone === 'drawer' ? '#f28a0b' : '#5eead4'}
                            strokeWidth="1.2"
                            onMouseEnter={() => setHoverZone('drawer')}
                            onMouseLeave={() => setHoverZone(null)}
                            className="cursor-pointer transition-colors"
                          />
                          <rect
                            x="81"
                            y="56"
                            width="108"
                            height="28"
                            fill="none"
                            stroke="#5eead4"
                            strokeWidth="0.75"
                            strokeOpacity="0.55"
                            pointerEvents="none"
                          />
                          <circle cx="135" cy="70" r="2.5" fill="#e2e8f0" pointerEvents="none" />

                          {/* Lower Shaker Door */}
                          <rect
                            x="69"
                            y="99"
                            width="132"
                            height="152"
                            fill={hoverZone === 'door' ? 'rgba(242,138,11,0.22)' : 'rgba(255,255,255,0.04)'}
                            stroke={hoverZone === 'door' ? '#f28a0b' : '#5eead4'}
                            strokeWidth="1.2"
                            onMouseEnter={() => setHoverZone('door')}
                            onMouseLeave={() => setHoverZone(null)}
                            className="cursor-pointer transition-colors"
                          />
                          {/* Recessed Shaker Panel */}
                          <rect
                            x="83"
                            y="113"
                            width="104"
                            height="124"
                            fill="none"
                            stroke="#5eead4"
                            strokeWidth="0.75"
                            strokeOpacity="0.55"
                            pointerEvents="none"
                          />
                          {/* Dashed Hidden Interior Shelf */}
                          <line
                            x1="72"
                            y1="175"
                            x2="198"
                            y2="175"
                            stroke="#5eead4"
                            strokeWidth="0.8"
                            strokeDasharray="4 3"
                            strokeOpacity="0.45"
                            pointerEvents="none"
                          />
                          {/* Hinge Swing Dashed Lines */}
                          <line x1="70" y1="101" x2="199" y2="175" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="3 3" strokeOpacity="0.22" pointerEvents="none" />
                          <line x1="70" y1="249" x2="199" y2="175" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="3 3" strokeOpacity="0.22" pointerEvents="none" />
                          <circle cx="192" cy="112" r="2.5" fill="#e2e8f0" pointerEvents="none" />

                          {/* Toe Kick */}
                          <rect
                            x="65"
                            y="255"
                            width="140"
                            height="32"
                            fill={hoverZone === 'toekick' ? 'rgba(242,138,11,0.25)' : 'rgba(0,0,0,0.35)'}
                            stroke={hoverZone === 'toekick' ? '#f28a0b' : '#5eead4'}
                            strokeWidth="1.2"
                            onMouseEnter={() => setHoverZone('toekick')}
                            onMouseLeave={() => setHoverZone(null)}
                            className="cursor-pointer transition-colors"
                          />
                          <text x="135" y="275" textAnchor="middle" fill="#99f6e4" fontSize="9.5" fontFamily="monospace" pointerEvents="none">
                            TOE KICK ({dims.kickH})
                          </text>

                          {/* Right Side Height Dimension Line */}
                          <line x1="215" y1="42" x2="232" y2="42" stroke="#5eead4" strokeWidth="0.75" strokeOpacity="0.6" />
                          <line x1="215" y1="287" x2="232" y2="287" stroke="#5eead4" strokeWidth="0.75" strokeOpacity="0.6" />
                          <line x1="226" y1="42" x2="226" y2="287" stroke="#f28a0b" strokeWidth="1" />
                          <circle cx="226" cy="42" r="2" fill="#f28a0b" />
                          <circle cx="226" cy="287" r="2" fill="#f28a0b" />
                          <text
                            x="244"
                            y="165"
                            textAnchor="middle"
                            fill="#f28a0b"
                            fontSize="11"
                            fontFamily="monospace"
                            fontWeight="700"
                            transform="rotate(90 244 165)"
                          >
                            {dims.h} H
                          </text>
                        </motion.svg>
                      )}

                      {cadView === 'side' && (
                        <motion.svg
                          key="side"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                          viewBox="0 0 280 310"
                          className="w-full max-w-[235px] h-auto select-none"
                          role="img"
                          aria-label="Side section blueprint of Base Cabinet B15"
                        >
                          {/* Top Depth Dimension */}
                          <line x1="48" y1="22" x2="48" y2="38" stroke="#5eead4" strokeWidth="0.75" strokeOpacity="0.6" />
                          <line x1="208" y1="22" x2="208" y2="38" stroke="#5eead4" strokeWidth="0.75" strokeOpacity="0.6" />
                          <line x1="48" y1="28" x2="208" y2="28" stroke="#f28a0b" strokeWidth="1" />
                          <text x="128" y="18" textAnchor="middle" fill="#f28a0b" fontSize="11" fontFamily="monospace" fontWeight="700">
                            {dims.d} D
                          </text>

                          {/* Side Carcass Polygon with Toe-Kick Notch */}
                          <path
                            d="M 48 42 L 208 42 L 208 255 L 188 255 L 188 287 L 48 287 Z"
                            fill="rgba(255,255,255,0.03)"
                            stroke="#99f6e4"
                            strokeWidth="1.5"
                          />
                          {/* 3/4" Back Panel Cutout */}
                          <rect x="48" y="42" width="7" height="245" fill="rgba(242,138,11,0.3)" stroke="#f28a0b" strokeWidth="0.8" />
                          {/* Front Shaker Door + Drawer Profile */}
                          <rect x="208" y="46" width="6" height="48" fill="rgba(94,234,212,0.25)" stroke="#5eead4" strokeWidth="1" />
                          <rect x="208" y="99" width="6" height="152" fill="rgba(94,234,212,0.25)" stroke="#5eead4" strokeWidth="1" />
                          {/* Interior Dovetail Drawer */}
                          <rect x="64" y="52" width="136" height="36" fill="rgba(242,138,11,0.12)" stroke="#f28a0b" strokeWidth="1" strokeDasharray="3 2" />
                          {/* Adjustable Shelf */}
                          <rect x="55" y="172" width="146" height="6" fill="rgba(153,246,228,0.25)" stroke="#5eead4" strokeWidth="0.9" />

                          {/* Labels */}
                          <text x="130" y="74" textAnchor="middle" fill="#fed7aa" fontSize="9" fontFamily="monospace">
                            DOVETAIL DRAWER
                          </text>
                          <text x="130" y="164" textAnchor="middle" fill="#99f6e4" fontSize="9" fontFamily="monospace">
                            ¾&quot; ADJ. SHELF
                          </text>
                          <text x="198" y="275" textAnchor="start" fill="#f28a0b" fontSize="9" fontFamily="monospace">
                            {dims.kickD} RECESS
                          </text>
                        </motion.svg>
                      )}

                      {cadView === 'plan' && (
                        <motion.svg
                          key="plan"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                          viewBox="0 0 280 310"
                          className="w-full max-w-[235px] h-auto select-none"
                          role="img"
                          aria-label="Top plan view blueprint of Base Cabinet B15"
                        >
                          {/* Top Width */}
                          <line x1="75" y1="30" x2="205" y2="30" stroke="#f28a0b" strokeWidth="1" />
                          <text x="140" y="20" textAnchor="middle" fill="#f28a0b" fontSize="11" fontFamily="monospace" fontWeight="700">
                            {dims.w} W
                          </text>

                          {/* Box Top Outline */}
                          <rect x="75" y="46" width="130" height="170" fill="rgba(255,255,255,0.03)" stroke="#99f6e4" strokeWidth="1.5" />
                          {/* 3/4" Side & Back Walls */}
                          <rect x="82" y="53" width="116" height="156" fill="none" stroke="#5eead4" strokeWidth="0.75" strokeDasharray="3 2" />
                          {/* Front Door Swing Arc (95 deg) */}
                          <line x1="75" y1="216" x2="75" y2="292" stroke="#f28a0b" strokeWidth="1.5" />
                          <path d="M 205 216 A 130 130 0 0 1 75 292" fill="none" stroke="#f28a0b" strokeWidth="1" strokeDasharray="4 3" />

                          <text x="140" y="135" textAnchor="middle" fill="#99f6e4" fontSize="10" fontFamily="monospace">
                            {dims.d} BOX DEPTH
                          </text>
                          <text x="155" y="260" textAnchor="middle" fill="#fed7aa" fontSize="9.5" fontFamily="monospace">
                            DOOR SWING CLEARANCE
                          </text>
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Interactive Legend Footer */}
                  <div className="flex items-center justify-between text-[11px] text-teal-200/80">
                    <span>Hover blueprint or specs to cross-highlight</span>
                    <span className="font-mono text-[#f28a0b]">All-Plywood Spec</span>
                  </div>
                </div>

                {/* 2. Integrated Manuals & Documents Module (Balances right column bottom-to-bottom) */}
                <div className="flex-1 rounded-2xl border border-stone-200/90 bg-stone-50/70 p-5 flex flex-col justify-between gap-4">
                  <div className="flex items-baseline justify-between gap-2 pb-2.5 border-b border-stone-200/80">
                    <div>
                      <p className="text-[11px] font-mono font-semibold text-[#f28a0b]">
                        Downloadable Package
                      </p>
                      <h3 className="text-sm font-extrabold text-[#003f3f] tracking-tight">
                        Manuals and Documents
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('manuals')}
                      className="text-[11px] font-bold text-[#003f3f] hover:text-[#f28a0b] transition-colors whitespace-nowrap shrink-0"
                    >
                      Open Library →
                    </button>
                  </div>

                  <div className="divide-y divide-stone-200/80 text-xs">
                    {B15_DOCUMENTS.map((doc) => {
                      const isDone = downloadedId === doc.id;
                      return (
                        <div
                          key={doc.id}
                          className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={() => setPreviewDoc(doc)}
                              className="font-bold text-stone-900 hover:text-[#003f3f] transition-colors text-left truncate block max-w-full"
                            >
                              {doc.title}
                            </button>
                            <p className="text-[11px] font-mono text-stone-500 tabular-nums mt-0.5">
                              {doc.format} · {doc.size} · {doc.updated}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => setPreviewDoc(doc)}
                              aria-label={`Preview ${doc.title}`}
                              className="p-1.5 rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-[#003f3f] hover:border-stone-300 transition-colors"
                              title="Preview Document"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDownloadDoc(doc)}
                              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap shrink-0 ${
                                isDone
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-[#003f3f] hover:bg-[#002e2e] text-white'
                              }`}
                            >
                              {isDone ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>Saved</span>
                                </>
                              ) : (
                                <>
                                  <Download className="w-3 h-3 text-[#f28a0b]" />
                                  <span>Get</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'manuals' && (
            <motion.div
              key="manuals"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              className="space-y-8"
            >
              {/* Manuals Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-stone-200">
                <div className="max-w-2xl">
                  <p className="text-xs font-mono font-semibold text-[#f28a0b]">
                    Technical Library · SKU 011720130
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#003f3f] tracking-tight mt-0.5">
                    Manuals and Documents — Base Cabinet B15
                  </h2>
                  <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                    Architectural cut sheets, RTA assembly manuals, 2020/CAD cabinet blocks, and Winnipeg 12-month warranty documentation for homeowners and contractors.
                  </p>
                </div>
                <div className="text-xs font-mono text-stone-500 tabular-nums shrink-0">
                  4 verified files · Instant access
                </div>
              </div>

              {/* Balanced 2x2 Document Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {B15_DOCUMENTS.map((doc) => {
                  const isDone = downloadedId === doc.id;
                  return (
                    <div
                      key={doc.id}
                      className="rounded-2xl border border-stone-200/90 bg-stone-50/50 p-6 flex flex-col justify-between gap-5 hover:border-stone-300 transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-[#003f3f] text-white flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4 text-[#f28a0b]" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[11px] font-mono text-stone-500 tabular-nums">
                                {doc.code} · {doc.format} · {doc.size}
                              </p>
                              <h3 className="text-base font-bold text-stone-900 leading-snug">
                                {doc.title}
                              </h3>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-stone-400 shrink-0">
                            {doc.updated}
                          </span>
                        </div>

                        <p className="text-xs text-stone-600 leading-relaxed">
                          {doc.subtitle}
                        </p>

                        <ul className="space-y-1.5 pt-2 border-t border-stone-200/70 text-xs text-stone-700">
                          {doc.highlights.map((pt) => (
                            <li key={pt} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(doc)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-800 transition-colors whitespace-nowrap shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#003f3f]" />
                          <span>Preview Spec</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadDoc(doc)}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#003f3f] hover:bg-[#002e2e] text-white'
                          }`}
                        >
                          {isDone ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Downloaded</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5 text-[#f28a0b]" />
                              <span>Download {doc.format}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {activeTab === 'compare' && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              className="space-y-6"
            >
              <div className="max-w-2xl">
                <p className="text-xs font-mono font-semibold text-[#f28a0b]">
                  Material Benchmark
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#003f3f] tracking-tight mt-0.5">
                  VanStro B15 vs. Big-Box Particle Board Cabinets
                </h2>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                  Why Winnipeg contractors and homeowners specify solid ¾&quot; birch plywood carcasses over big-box MDF or particle board boxes.
                </p>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50 text-stone-500">
                      <th className="py-3.5 px-4 font-semibold">Component</th>
                      <th className="py-3.5 px-4 font-bold text-[#003f3f] bg-teal-50/60">
                        VanStro Base B15 ($308.21)
                      </th>
                      <th className="py-3.5 px-4 font-semibold">Typical Big-Box Cabinet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-stone-700">Box Side &amp; Back Thickness</td>
                      <td className="py-3.5 px-4 font-bold text-[#003f3f] bg-teal-50/30">¾&quot; Solid Birch Plywood</td>
                      <td className="py-3.5 px-4 text-stone-500">½&quot; Particle Board + ¼&quot; Hardboard</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-stone-700">Manitoba Climate Stability</td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-700 bg-teal-50/30">Moisture-resistant · Crack-free MDF Shaker</td>
                      <td className="py-3.5 px-4 text-stone-500">Swells near sinks · Splits in dry winter</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-stone-700">Drawer Joinery &amp; Slides</td>
                      <td className="py-3.5 px-4 font-semibold text-stone-900 bg-teal-50/30">French Dovetail Birch + Undermount Soft-Close</td>
                      <td className="py-3.5 px-4 text-stone-500">Stapled particle board + side rollers</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-stone-700">Soft-Close Hinges</td>
                      <td className="py-3.5 px-4 font-semibold text-stone-900 bg-teal-50/30">DTC 6-Way Adjustable (Included)</td>
                      <td className="py-3.5 px-4 text-stone-500">Often an extra-cost upgrade</td>
                    </tr>
                    <tr>
                      <td className="py-3.5 px-4 font-medium text-stone-700">Winnipeg Availability</td>
                      <td className="py-3.5 px-4 font-bold text-[#f28a0b] bg-teal-50/30">Same-Day / Next-Day at 856 Century St</td>
                      <td className="py-3.5 px-4 text-stone-500">4–10 Weeks Special Order</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'assembly' && (
            <motion.div
              key="assembly"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                {
                  num: '01',
                  icon: Package,
                  title: 'Unbox & Stage Panels',
                  body: 'Every B15 carton ships flat with pre-drilled birch plywood panels, dovetail drawer pieces, DTC soft-close hardware, and illustrated instructions.',
                },
                {
                  num: '02',
                  icon: Wrench,
                  title: 'Lock Cam-Pins in 15 Mins',
                  body: 'Using only a Phillips screwdriver and wood glue, snap the rigid ¾" plywood carcass together cleanly—zero specialized jigs required.',
                },
                {
                  num: '03',
                  icon: Layers,
                  title: 'Mount or Arrange Local Install',
                  body: 'Anchor cleanly to wall studs through the ¾" solid plywood frame—or ask VanStro to arrange delivery and installation through a local dealer.',
                },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-6 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#003f3f]">{step.num}.</span>
                      <Icon className="w-4 h-4 text-[#f28a0b]" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900">{step.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{step.body}</p>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'pickup' && (
            <motion.div
              key="pickup"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#003f3f]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>12-Month Local Winnipeg Replacement Warranty</span>
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 tracking-tight">
                  856 Century Street Trade &amp; Public Pickup
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Centrally located off Route 90 near Polo Park and Winnipeg Airport. In-stock orders placed before 12:00 PM Monday–Friday are staged for same-day afternoon pickup. Our bay team loads flat-pack cartons directly into your SUV, minivan, or truck.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://maps.google.com/?q=856+Century+St,+Winnipeg,+MB+R3H+0M5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#003f3f] text-white text-xs font-bold hover:bg-[#002e2e] transition-colors whitespace-nowrap"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#f28a0b]" />
                    <span>Directions to 856 Century St</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </a>
                  <a
                    href="tel:18558267876"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-50 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#003f3f]" />
                    <span>1-855-826-7876</span>
                  </a>
                </div>
              </div>

              <div className="md:col-span-5 p-5 rounded-2xl bg-stone-50 border border-stone-200 divide-y divide-stone-200 text-xs">
                <div className="py-2.5 flex justify-between gap-2">
                  <span className="text-stone-500">Address</span>
                  <span className="font-semibold text-stone-900 text-right">856 Century St, Winnipeg, MB R3H 0M5</span>
                </div>
                <div className="py-2.5 flex justify-between gap-2">
                  <span className="text-stone-500">Hours</span>
                  <span className="font-semibold text-stone-900">Mon–Fri, 9:00 a.m. – 5:00 p.m.</span>
                </div>
                <div className="py-2.5 flex justify-between gap-2">
                  <span className="text-stone-500">B15 Box Size</span>
                  <span className="font-mono font-semibold text-stone-900 tabular-nums">{dims.carton} ({dims.weight})</span>
                </div>
                <div className="py-2.5 flex justify-between gap-2">
                  <span className="text-stone-500">Warranty</span>
                  <span className="font-bold text-emerald-700">12-Month Local Exchange</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setPreviewDoc(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden"
            >
              <div className="bg-[#003f3f] text-white px-6 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono text-[#f28a0b] font-semibold">
                    {previewDoc.code} · {previewDoc.format} · {previewDoc.size}
                  </p>
                  <h3 className="text-base font-bold mt-0.5">{previewDoc.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  aria-label="Close document preview"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1.5 font-mono text-stone-700">
                    <Ruler className="w-3.5 h-3.5 text-[#f28a0b]" />
                    Model B15 ({dims.w} × {dims.h} × {dims.d})
                  </span>
                  <span className="font-mono">{previewDoc.updated}</span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-900">Key Specifications</h4>
                  <ul className="space-y-1.5 text-xs text-stone-700 bg-stone-50 p-4 rounded-xl border border-stone-200/80">
                    {previewDoc.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-stone-900">Document Excerpt</h4>
                  <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
                    {previewDoc.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
                <span className="text-[11px] text-stone-500">
                  Pickup &amp; Tech Support: 856 Century St · 1-855-826-7876
                </span>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc(previewDoc)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  {downloadedId === previewDoc.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download {previewDoc.format}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
