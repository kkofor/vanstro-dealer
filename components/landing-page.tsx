'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CABINET_PRODUCTS,
  FAQS,
  CabinetProduct
} from './catalog-data';
import CabinetHotspots from './cabinet-hotspots';
import WarehouseMap from './warehouse-map';
import QuoteModal from './quote-modal';
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  Layers,
  Wrench,
  Sparkles,
  Truck,
  Box,
  Compass,
  FileText,
  Plus,
  ShoppingCart,
  Trash2,
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface LandingPageProps {
  onOpenQuoteModal?: (productName?: string) => void;
  isMobileMockup?: boolean;
}

export default function LandingPage({
  onOpenQuoteModal,
  isMobileMockup = false,
}: LandingPageProps) {
  // Quote modal state
  const [internalQuoteOpen, setInternalQuoteOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string | null>(null);

  // Catalog category filter state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'base' | 'wall' | 'tall' | 'vanity' | 'moulding_hardware'>('all');
  const [selectedFinishFilter, setSelectedFinishFilter] = useState<'all' | 'white' | 'grey'>('all');

  // Interactive estimate list
  const [estimateItems, setEstimateItems] = useState<{ product: CabinetProduct; qty: number }[]>([]);
  const [showEstimateDrawer, setShowEstimateDrawer] = useState(false);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const openQuote = (itemTitle?: string) => {
    if (onOpenQuoteModal) {
      onOpenQuoteModal(itemTitle);
    } else {
      setSelectedProductForQuote(itemTitle || null);
      setInternalQuoteOpen(true);
    }
  };

  const addToEstimate = (product: CabinetProduct) => {
    setEstimateItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setShowEstimateDrawer(true);
  };

  const removeFromEstimate = (productId: string) => {
    setEstimateItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setEstimateItems((prev) =>
      prev
        .map((i) => {
          if (i.product.id === productId) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as { product: CabinetProduct; qty: number }[]
    );
  };

  const estimateTotalCad = estimateItems.reduce(
    (sum, item) => sum + item.product.priceCad * item.qty,
    0
  );

  const filteredProducts = CABINET_PRODUCTS.filter((prod) => {
    if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="w-full min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Top Local Warehouse Logistics Banner */}
      <aside aria-label="Local pickup alert" className="bg-[#002a2a] text-stone-200 border-b border-teal-900 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#f28a0b]">Winnipeg Warehouse Pickup:</span>
            <span>856 Century Street</span>
            <span className="hidden sm:inline text-stone-500">·</span>
            <span className="hidden sm:inline text-stone-300">In-stock orders ready same-day or next-day</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-stone-300 hidden md:inline">Mon–Fri 9:00 AM – 5:00 PM</span>
            <a
              href="tel:18558267876"
              className="text-white hover:text-[#f28a0b] transition-colors font-bold inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#f28a0b]" />
              1-855-826-7876
            </a>
          </div>
        </div>
      </aside>

      {/* Top Bar Navigation (Strict 3-Zone Contract: Brand — 4-5 Links — 1 Primary Action) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single element Brand wordmark */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-tight text-[#003f3f] whitespace-nowrap shrink-0 group"
          >
            <span className="w-7 h-7 rounded-md bg-[#003f3f] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs group-hover:bg-[#f28a0b] transition-colors">
              V
            </span>
            <span>VanStro</span>
          </a>

          {/* Zone 2: 4-5 Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <a href="#cabinets" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              Kitchen Cabinets
            </a>
            <a href="#vanities" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              Bathroom Vanities
            </a>
            <a href="#construction" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              ¾&quot; Plywood Build
            </a>
            <a href="#how-it-works" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              How RTA Works
            </a>
            <a href="#pickup-location" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              Winnipeg Pickup
            </a>
            <a href="#faq" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              FAQ
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {estimateItems.length > 0 && (
              <button
                onClick={() => setShowEstimateDrawer(!showEstimateDrawer)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-stone-100 text-[#003f3f] hover:bg-stone-200 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 text-[#f28a0b]" />
                <span>Estimate ({estimateItems.reduce((a, c) => a + c.qty, 0)})</span>
              </button>
            )}
            <button
              onClick={() => openQuote()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#003f3f] hover:bg-[#002e2e] active:scale-98 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              Request 3D Design & Quote
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: High Impact Local Winnipeg Positioning */}
      <section id="hero" className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Local Value Proposition & Direct CTAs */}
            <div className="lg:col-span-6 space-y-6">
              {/* Unboxed editorial location kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#003f3f]">
                <span>Winnipeg Building Materials</span>
                <span aria-hidden="true">·</span>
                <span>856 Century Street Warehouse</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#f28a0b]">Same-Day & Next-Day Pickup</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003f3f] tracking-tight leading-[1.15] text-balance">
                RTA Kitchen Cabinets in Winnipeg. Solid Plywood. Pick Up Today.
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Ready-to-assemble kitchen cabinets and bathroom vanities built with <strong>¾&quot; furniture-grade plywood boxes</strong>, durable <strong>White & Light Grey Shaker doors</strong>, and silent soft-close hinges. Skip custom factory backorders—pick up your flat-pack boxes locally at 856 Century Street.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => openQuote()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] active:scale-98 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Get Free 3D Kitchen Design & Quote</span>
                </button>
                <a
                  href="#cabinets"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-sm font-semibold transition-colors"
                >
                  <span>Explore In-Stock Cabinets</span>
                  <ArrowRight className="w-4 h-4 text-stone-500" />
                </a>
              </div>

              {/* 4 Quantitative Proof Points / Trust Badges (Claim-to-Proof) */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-stone-200">
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">Box Construction</span>
                  <span className="text-sm font-bold text-stone-900">¾&quot; Solid Plywood</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">Door Profile</span>
                  <span className="text-sm font-bold text-stone-900">White / Grey Shaker</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">In-Stock Pickup</span>
                  <span className="text-sm font-bold text-[#003f3f]">Same or Next Day</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">Local Warranty</span>
                  <span className="text-sm font-bold text-stone-900">12-Month Coverage</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Anchor with Direct Overlay Badges */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 aspect-[16/10] sm:aspect-[16/10]">
                <Image
                  src="/src/assets/images/vanstro_hero_kitchen_1794345756202.jpg"
                  alt="VanStro RTA Kitchen Cabinets in White and Light Grey Shaker installed in Winnipeg residence"
                  fill
                  priority
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Real-World Proof Callout */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/60 shadow-lg flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#003f3f] text-white flex items-center justify-center shrink-0">
                      <Box className="w-5 h-5 text-[#f28a0b]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900">
                        Installed in Hundreds of Manitoba Homes
                      </p>
                      <p className="text-[11px] text-stone-600">
                        Contractor & homeowner direct pricing at 856 Century St
                      </p>
                    </div>
                  </div>
                  <a
                    href="#pickup-location"
                    className="shrink-0 text-xs font-bold text-[#003f3f] hover:text-[#f28a0b] inline-flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick 3-Step RTA Mechanism: How It Works */}
      <section id="how-it-works" className="py-14 sm:py-18 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f28a0b]">
              The RTA Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003f3f] tracking-tight mt-1">
              How Ready-to-Assemble Works in 3 Simple Steps
            </h2>
            <p className="text-stone-600 text-sm mt-2 leading-relaxed">
              Save thousands on middleman fabrication markups. Get premium ¾&quot; plywood cabinets into your Winnipeg home in days, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#003f3f] block">
                  01. CHOOSE & ESTIMATE
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Select Online or Send Measurements
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Browse our base, wall, and vanity sizes below, or send your kitchen floor plan for a <strong>free 3D layout & itemized quote</strong> prepared by a local dealer.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                <span>Free 3D Design Service</span>
                <span className="font-semibold text-[#003f3f]">24hr Quote</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#f28a0b] block">
                  02. LOCAL PICKUP OR DELIVERY
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Pick Up Flat-Packed at 856 Century St
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  In-stock orders are prepped for <strong>same-day or next-day pickup</strong>. Heavy-duty cartons fit in your SUV or pickup. Local delivery and installation can also be arranged through our certified dealer network.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                <span>Centrally located off Route 90</span>
                <span className="font-semibold text-emerald-600">Quick Drive-Up</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold text-[#003f3f] block">
                  03. EASY ASSEMBLY & INSTALL
                </span>
                <h3 className="text-lg font-bold text-stone-900">
                  Assemble at Home in 15 Minutes
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Every cabinet features precision pre-drilled dowel and cam-lock joinery with step-by-step instructions. Install yourself over a weekend or hire our local installation partners.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                <span>Dowel & Cam-Lock System</span>
                <span className="font-semibold text-stone-900">No Special Tools</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Quality & Cutaway: ¾" Plywood Construction */}
      <section id="construction" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003f3f]">
              Engineering Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Why VanStro Cabinets Are Built Tough for Manitoba
            </h2>
            <p className="text-stone-600 text-sm mt-2 leading-relaxed">
              Many budget cabinets sold in Winnipeg use particle board that sags under granite countertops and swells during seasonal humidity shifts. We build strictly with furniture-grade ¾&quot; plywood boxes.
            </p>
          </div>

          {/* Interactive Cutaway Hotspot Component */}
          <CabinetHotspots />
        </div>
      </section>

      {/* Product Catalog Section: Kitchen Cabinets, Vanities & Hardware */}
      <section id="cabinets" className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#f28a0b]">
                In-Stock Winnipeg Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003f3f] tracking-tight mt-1">
                Kitchen Cabinets, Bathroom Vanities & Hardware
              </h2>
              <p className="text-stone-600 text-sm mt-1">
                All models in stock are available for pickup at 856 Century Street or delivery through our dealer network.
              </p>
            </div>

            {/* Color Finish Selector */}
            <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-xl border border-stone-200 shrink-0">
              <span className="text-xs font-semibold text-stone-500 pl-2">Finish:</span>
              <button
                onClick={() => setSelectedFinishFilter('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedFinishFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Finishes
              </button>
              <button
                onClick={() => setSelectedFinishFilter('white')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedFinishFilter === 'white'
                    ? 'bg-white text-[#003f3f] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-white border border-stone-300" />
                Pure White Shaker
              </button>
              <button
                onClick={() => setSelectedFinishFilter('grey')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedFinishFilter === 'grey'
                    ? 'bg-white text-[#003f3f] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-stone-300 border border-stone-400" />
                Light Grey Shaker
              </button>
            </div>
          </div>

          {/* Category Tabs (Interactive Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-stone-200 scrollbar-none">
            {[
              { id: 'all', label: 'All Products (20+)' },
              { id: 'base', label: 'Base Cabinets' },
              { id: 'wall', label: 'Wall Cabinets' },
              { id: 'tall', label: 'Tall & Pantries' },
              { id: 'vanity', label: 'Bathroom Vanities (24"–66")' },
              { id: 'moulding_hardware', label: 'Mouldings & Hardware' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-[#003f3f] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-stone-200/90 hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden p-5 group"
              >
                <div className="space-y-3">
                  {/* Category and SKU quiet metadata */}
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-mono text-[11px] font-semibold text-stone-600">{prod.sku}</span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      In Stock Winnipeg
                    </span>
                  </div>

                  {/* Title and Dimensions */}
                  <div>
                    <h3 className="text-base font-bold text-stone-900 group-hover:text-[#003f3f] transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs font-mono text-stone-500 mt-1">
                      {prod.dimensions}
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Material & Feature highlights */}
                  <div className="pt-2 border-t border-stone-100 space-y-1 text-[11px] text-stone-600">
                    <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#003f3f] shrink-0" />
                      <span>{prod.boxMaterial}</span>
                    </div>
                    {prod.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-stone-500">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Area */}
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">VanStro Direct</span>
                    <span className="text-lg font-extrabold text-stone-900 tabular-nums">
                      ${prod.priceCad}{' '}
                      <span className="text-xs font-normal text-stone-500">CAD</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => addToEstimate(prod)}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
                      title="Add to running kitchen price estimate"
                    >
                      + Estimate
                    </button>
                    <button
                      onClick={() => openQuote(prod.name)}
                      className="px-3 py-1.5 rounded-lg bg-[#003f3f] text-white text-xs font-semibold hover:bg-[#002e2e] transition-colors"
                    >
                      Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vanity Showcase Callout */}
          <div id="vanities" className="mt-12 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative h-64 sm:h-72 rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/src/assets/images/vanstro_bathroom_vanity_1794345756747.jpg"
                  alt="VanStro 48 inch Contemporary Light Grey Shaker Bathroom Vanity"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003f3f]">
                  Bathroom Collections
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  Bathroom Vanities in Stock: 24&quot; up to 66&quot; Luxury Double Sink
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Upgrade powder rooms and master ensuites with identical ¾&quot; plywood moisture-sealed durability. Available in 24&quot;, 30&quot;, 36&quot;, 42&quot;, 48&quot;, 60&quot;, and 66&quot; configurations in both Pure White and Contemporary Light Grey Shaker.
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  {['24" Powder', '30" Single', '36" Drawer', '42" Single', '48" Deluxe', '60" Double', '66" Executive'].map((v) => (
                    <span key={v} className="bg-white text-stone-800 font-semibold px-2.5 py-1 rounded-md border border-stone-200">
                      {v}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => openQuote('Bathroom Vanity (24"-66")')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003f3f] hover:bg-[#002e2e] text-white text-xs font-bold transition-colors"
                  >
                    <span>Request Vanity Specs & Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whole Kitchen Planning & 3D Design Callout */}
      <section className="py-14 sm:py-20 bg-[#003f3f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl bg-[#002e2e] border border-teal-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-5">
              <span className="text-xs uppercase font-bold tracking-wider text-[#f28a0b]">
                Turnkey Kitchen Planning
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Planning a Whole Kitchen? Send Your Layout for a Free 3D Design.
              </h2>
              <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
                Whether you have an architect’s blueprint or a sketch on graph paper with rough measurements, send it to our Winnipeg team. We’ll generate a comprehensive <strong>photo-real 3D render</strong>, elevation drawings, and an itemized cabinet list through an authorized local dealer.
              </p>

              {/* Dealer Network Note (Requested in prompt) */}
              <div className="p-4 rounded-xl bg-[#003f3f]/90 border border-teal-700/60 text-xs text-stone-200 space-y-1.5">
                <p className="font-bold text-[#f28a0b]">Need Assembly or Turnkey Installation?</p>
                <p className="leading-relaxed">
                  Delivery and professional installation are seamlessly arranged through our certified local Winnipeg dealer network. From flat-pack pickup to full white-glove installation, we’ve got your project covered.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openQuote()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white text-sm font-bold shadow-md transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Send Measurements for Free 3D Layout</span>
                </button>
                <a
                  href="tel:18558267876"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-teal-700 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#f28a0b]" />
                  <span>Speak with Winnipeg Desk: 1-855-826-7876</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winnipeg Warehouse Location & Pickup Bay (856 Century Street) */}
      <section id="pickup-location" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003f3f]">
              Local Pickup Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              Convenient Winnipeg Pickup at 856 Century Street
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              Located on the Route 90 corridor, minutes from CF Polo Park and the Winnipeg Airport.
            </p>
          </div>

          {/* Interactive Warehouse Map & Protocol Card */}
          <WarehouseMap />
        </div>
      </section>

      {/* Short FAQ Section (Answers All 4 Specific Questions + Warranty & Delivery) */}
      <section id="faq" className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f28a0b]">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003f3f] tracking-tight mt-1">
              Everything You Need to Know About VanStro RTA
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              Clear answers regarding pickup speed, assembly, finishes, and delivery options in Winnipeg.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 overflow-hidden transition-colors bg-stone-50/50"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm sm:text-base hover:text-[#003f3f] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#f28a0b]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct contact link under FAQ */}
          <div className="mt-8 p-4 rounded-xl bg-stone-100 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
            <div>
              <span className="font-semibold text-stone-900">Have a specific question about your room dimensions?</span>
              <p className="text-stone-500">Call our Winnipeg counter directly or drop by Monday to Friday, 9am–5pm.</p>
            </div>
            <a
              href="tel:18558267876"
              className="px-4 py-2 rounded-lg bg-[#003f3f] text-white font-bold hover:bg-[#002e2e] transition-colors shrink-0"
            >
              Call 1-855-826-7876
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Running Estimate Drawer / Floating Widget */}
      {showEstimateDrawer && (
        <aside aria-label="Estimate breakdown" className="fixed bottom-4 right-4 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-300 p-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-[#f28a0b]" />
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Kitchen Cabinet Estimate ({estimateItems.reduce((a, c) => a + c.qty, 0)})
              </h4>
            </div>
            <button
              onClick={() => setShowEstimateDrawer(false)}
              className="text-stone-400 hover:text-stone-700 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="max-h-48 overflow-y-auto divide-y divide-stone-100 py-2">
            {estimateItems.length === 0 ? (
              <p className="text-xs text-stone-500 py-3 text-center">No cabinets added yet.</p>
            ) : (
              estimateItems.map((item) => (
                <div key={item.product.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="pr-2 truncate">
                    <p className="font-bold text-stone-800 truncate">{item.product.name}</p>
                    <p className="text-[10px] text-stone-500">${item.product.priceCad} ea</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.product.id, -1)}
                      className="w-5 h-5 rounded bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="font-bold tabular-nums text-xs">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, 1)}
                      className="w-5 h-5 rounded bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                    <span className="font-bold text-stone-900 tabular-nums w-14 text-right">
                      ${item.product.priceCad * item.qty}
                    </span>
                    <button
                      onClick={() => removeFromEstimate(item.product.id)}
                      className="text-stone-400 hover:text-red-600 pl-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500">Estimated Total (CAD):</span>
              <span className="text-base font-extrabold text-[#003f3f] tabular-nums">
                ${estimateTotalCad} <span className="text-xs font-normal text-stone-500">CAD</span>
              </span>
            </div>
            <button
              onClick={() => {
                const summary = estimateItems.map((i) => `${i.qty}x ${i.product.name} ($${i.product.priceCad * i.qty})`).join(', ');
                openQuote(`Custom Estimate: ${summary}`);
              }}
              className="w-full py-2.5 rounded-lg bg-[#f28a0b] hover:bg-[#d97706] text-white text-xs font-bold transition-colors shadow-xs"
            >
              Submit Estimate for Dealer 3D Design
            </button>
          </div>
        </aside>
      )}

      {/* Quiet Corporate Footer (Wordmark, Nav mirror, Hours, Contact details) */}
      <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <span className="w-6 h-6 rounded bg-[#f28a0b] text-white flex items-center justify-center font-serif text-sm font-bold">
                  V
                </span>
                <span>VanStro</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Winnipeg supplier of premium ready-to-assemble (RTA) kitchen cabinets, bathroom vanities, and building materials. Solid ¾&quot; plywood boxes with 12-month factory warranty.
              </p>
              <p className="text-[11px] text-stone-500">
                www.vanstro.ca · All Rights Reserved
              </p>
            </div>

            {/* Col 2: Winnipeg Warehouse Details */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                Winnipeg Pickup Facility
              </p>
              <div className="flex items-start gap-2 text-stone-300">
                <MapPin className="w-4 h-4 text-[#f28a0b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">856 Century Street</p>
                  <p>Winnipeg, MB R3H 0M5</p>
                  <p className="text-stone-400 mt-0.5">Off Route 90 (Near Polo Park & Airport)</p>
                </div>
              </div>
              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=856+Century+St,+Winnipeg,+MB+R3H+0M5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f28a0b] hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Get Directions in Google Maps →
                </a>
              </div>
            </div>

            {/* Col 3: Hours & Phone */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                Trade Hours & Contact
              </p>
              <div className="flex items-start gap-2 text-stone-300">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Monday to Friday</p>
                  <p>9:00 a.m. to 5:00 p.m. CST</p>
                  <p className="text-stone-400 mt-0.5">Saturday: By Appointment</p>
                </div>
              </div>
              <div className="pt-1 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f28a0b] shrink-0" />
                <a href="tel:18558267876" className="font-bold text-white hover:text-[#f28a0b]">
                  1-855-826-7876
                </a>
              </div>
            </div>

            {/* Col 4: Quick Navigation & Dealer Network */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                Product Catalog & Links
              </p>
              <ul className="space-y-1 text-stone-400">
                <li><a href="#cabinets" className="hover:text-white transition-colors">Base & Wall Cabinets</a></li>
                <li><a href="#vanities" className="hover:text-white transition-colors">Bathroom Vanities (24&quot;–66&quot;)</a></li>
                <li><a href="#construction" className="hover:text-white transition-colors">¾&quot; Plywood Specifications</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How RTA Works</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
                <li>
                  <button onClick={() => openQuote()} className="text-[#f28a0b] hover:underline font-bold mt-1 text-left">
                    Request 3D Design Quote →
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} VanStro Building Materials. Proudly supplying Winnipeg & Manitoba contractors and homeowners.</p>
            <div className="flex items-center gap-4 text-stone-400">
              <span>Pure White Shaker</span>
              <span>·</span>
              <span>Contemporary Light Grey</span>
              <span>·</span>
              <span>Soft-Close Standard</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Quote & 3D Design Modal */}
      <QuoteModal
        isOpen={internalQuoteOpen}
        onClose={() => setInternalQuoteOpen(false)}
        preselectedProduct={selectedProductForQuote}
      />
    </div>
  );
}
