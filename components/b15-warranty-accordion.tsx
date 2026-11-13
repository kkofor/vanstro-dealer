'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  Navigation,
  ArrowUpRight,
  Layers,
  Wrench,
  Sparkles,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

interface WarrantyClause {
  id: string;
  category: string;
  term: string;
  title: string;
  summary: string;
  details: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const WARRANTY_CLAUSES: WarrantyClause[] = [
  {
    id: 'plywood-boxes',
    category: 'Structural Carcass',
    term: '12 Months',
    title: '¾" Birch Plywood Boxes & Dovetail Joinery',
    summary:
      'Covers structural delamination, core voids, cam-lock machining faults, and dimensional warping across all furniture-grade plywood panels.',
    details: [
      'Protected components: ¾" (18 mm) multi-ply birch side walls, bottom floor deck, ¾" full structural back panel, recessed toe kick, and 1 × ¾" adjustable interior shelf (rated to 200 lbs static load).',
      'Drawer box coverage: ⅝" solid birch French dovetail corners and ¼" captured plywood bottom panel against joint separation under standard kitchen utensil loads.',
      'Requirement: Unit must be assembled flush using included cam-locks and PVA wood glue per the B15 Assembly Manual and stored/installed in a climate-controlled interior.',
    ],
    icon: Layers,
  },
  {
    id: 'hardware',
    category: 'Mechanical Hardware',
    term: '12 Months',
    title: 'DTC Soft-Close Hinges & Undermount Drawer Slides',
    summary:
      'Covers hydraulic damper failure, soft-close tension loss, spring fatigue, and concealed track binding on factory-supplied hardware.',
    details: [
      'Door hardware: DTC 110° clip-on 6-way adjustable concealed soft-close hinges (ANSI/KCMA 100,000-cycle rated) against premature hydraulic leak or hinge plate fracture.',
      'Drawer hardware: Full-extension undermount soft-close steel runners and locking clips against bearing seizure or self-closing mechanism failure.',
      'Fast local swap: Replacement DTC hinges, mounting plates, and drawer glides are stocked directly at 856 Century Street for immediate over-the-counter exchange.',
    ],
    icon: Wrench,
  },
  {
    id: 'finishes',
    category: 'Doors & Enamel Finish',
    term: '12 Months',
    title: '5-Piece MDF Shaker Doors & Baked Enamel Finishes',
    summary:
      'Covers factory finish peeling, blistering, flaking, and abnormal batch discoloration on Pure White and Light Grey Shaker fronts.',
    details: [
      'Protected surfaces: Multi-coat baked matte enamel over high-density 5-piece MDF Shaker door and top drawer fronts engineered for Manitoba’s dry winters.',
      'Coverage condition: Applies under normal household interior relative humidity (30%–55% RH) with gentle, non-abrasive damp microfiber cleaning.',
      'Finish exclusions: Surface scratches from impact, edge swelling from standing water left un-wiped, chemical solvents, steam cleaners, or heat exposure above 85°C near unshielded appliances.',
    ],
    icon: Sparkles,
  },
  {
    id: 'claims-process',
    category: 'Winnipeg Support',
    term: 'Same / Next Day',
    title: 'How Local Warranty Claims & Replacements Work',
    summary:
      'All warranty evaluations and replacement parts are handled locally through our Winnipeg distribution counter—zero cross-border wait times.',
    details: [
      'Step 1 — Call our Winnipeg warranty & claims line at 1-855-826-7876 (Mon–Fri, 9:00 a.m. – 5:00 p.m.) with your SKU (011720130), invoice number, and brief description.',
      'Step 2 — Share clear photos or bring the affected door, drawer box, or hinge directly to 856 Century Street, Winnipeg, MB R3H 0M5 for counter inspection.',
      'Step 3 — Approved in-stock replacements are typically handed over same-day or next business day at the Century St loading bay at zero part cost.',
    ],
    icon: FileCheck2,
  },
  {
    id: 'exclusions',
    category: 'Scope & Care',
    term: 'Standard Policy',
    title: 'What Is Excluded (Site Storage, Modifications & Labour)',
    summary:
      'Outlines standard commercial exclusions including improper job-site storage, field-cut modifications, and third-party labour.',
    details: [
      'Excludes damage resulting from unheated/damp garage storage prior to assembly, overloaded shelves exceeding 200 lbs, or plumbing leaks around cut sink openings.',
      'This product warranty covers replacement of qualifying VanStro parts/components; removal, re-installation, or countertop detachment labour is not covered under the parts warranty.',
      'If installation was arranged through a local authorized VanStro dealer, contact your dealer or call 1-855-826-7876 so we can coordinate the replacement part.',
    ],
    icon: AlertCircle,
  },
];

export default function B15WarrantyAccordion() {
  const [openIds, setOpenIds] = useState<string[]>(['plywood-boxes']);

  const toggleClause = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allExpanded = openIds.length === WARRANTY_CLAUSES.length;

  const handleToggleAll = () => {
    setOpenIds(allExpanded ? [] : WARRANTY_CLAUSES.map((c) => c.id));
  };

  return (
    <section
      id="warranty-terms"
      aria-labelledby="warranty-heading"
      className="mt-10 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN (5 cols): Overview & Prominent Local Claims Contact Desk */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-mono font-semibold text-[#f28a0b]">
              12-Month Local Warranty · Model B15
            </p>
            <h2
              id="warranty-heading"
              className="text-xl sm:text-2xl font-extrabold text-[#003f3f] tracking-tight text-balance"
            >
              Warranty Terms &amp; Local Claims Coverage
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Every VanStro Base Cabinet B15 is backed by a full 12-month limited replacement warranty covering ¾&quot; plywood structural boxes, DTC soft-close hardware, and factory Shaker finishes—supported directly in Winnipeg.
            </p>
          </div>

          {/* Prominent Local Warranty Claims Desk Card */}
          <div className="rounded-2xl bg-[#003f3f] text-white p-6 border border-teal-900/80 space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002a2a] border border-teal-700/60 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#f28a0b]" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#f28a0b] font-semibold block">
                  Winnipeg Claims Desk
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  Direct Local Part Support &amp; Inspection
                </h3>
              </div>
            </div>

            <div className="divide-y divide-teal-800/70 text-xs border-y border-teal-800/70">
              <div className="py-3 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#f28a0b] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-teal-200/80 text-[11px]">Claims &amp; Exchange Counter</span>
                  <span className="font-bold text-white block mt-0.5">
                    856 Century Street, Winnipeg, MB R3H 0M5
                  </span>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#f28a0b] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-teal-200/80 text-[11px]">Warranty Support Phone</span>
                  <a
                    href="tel:18558267876"
                    className="font-mono font-extrabold text-sm text-white hover:text-[#f28a0b] transition-colors inline-block mt-0.5 tabular-nums"
                  >
                    1-855-826-7876
                  </a>
                </div>
              </div>

              <div className="py-3 flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#f28a0b] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-teal-200/80 text-[11px]">Desk &amp; Bay Hours</span>
                  <span className="font-semibold text-white block mt-0.5 tabular-nums">
                    Monday – Friday, 9:00 a.m. – 5:00 p.m.
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href="tel:18558267876"
                className="py-2.5 px-4 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Claims Desk</span>
              </a>
              <a
                href="https://maps.google.com/?q=856+Century+St,+Winnipeg,+MB+R3H+0M5"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl border border-teal-600/80 hover:bg-white/10 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Navigation className="w-3.5 h-3.5 text-[#f28a0b]" />
                <span>Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (7 cols): Accordion Breakdown of Plywood Boxes, Hardware & Finishes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-200/80">
            <span className="text-xs font-semibold text-stone-700">
              Coverage Schedule — Select a category to view full 12-month terms
            </span>
            <button
              type="button"
              onClick={handleToggleAll}
              className="text-xs font-bold text-[#003f3f] hover:text-[#f28a0b] transition-colors whitespace-nowrap shrink-0"
            >
              {allExpanded ? 'Collapse All' : 'Expand All Terms'}
            </button>
          </div>

          <div className="space-y-3">
            {WARRANTY_CLAUSES.map((clause) => {
              const isOpen = openIds.includes(clause.id);
              const Icon = clause.icon;
              return (
                <div
                  key={clause.id}
                  className={`rounded-xl border transition-colors overflow-hidden ${
                    isOpen
                      ? 'border-[#003f3f]/40 bg-stone-50/70'
                      : 'border-stone-200/90 bg-white hover:border-stone-300'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleClause(clause.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isOpen
                            ? 'bg-[#003f3f] text-white'
                            : 'bg-stone-100 text-[#003f3f]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-stone-500">
                          <span className="font-semibold text-[#f28a0b]">{clause.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{clause.term}</span>
                        </div>
                        <h3 className="text-sm sm:text-[15px] font-bold text-stone-900 mt-0.5 leading-snug">
                          {clause.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#003f3f]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-2 border-t border-stone-200/80 space-y-3">
                          <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
                            {clause.summary}
                          </p>
                          <ul className="space-y-2 text-xs text-stone-600 leading-relaxed">
                            {clause.details.map((detail, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="font-mono text-[11px] font-bold text-[#003f3f] shrink-0 mt-0.5 tabular-nums">
                                  0{idx + 1}.
                                </span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
