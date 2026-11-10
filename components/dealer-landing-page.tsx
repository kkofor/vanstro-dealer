'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  DEALER_SERVICES,
  SERVICE_PACKAGES,
  DEALER_FAQS,
  DealerService
} from './dealer-services-data';
import {
  CABINET_PRODUCTS,
  CabinetProduct
} from './catalog-data';
import CabinetHotspots from './cabinet-hotspots';
import WarehouseMap from './warehouse-map';
import BookingModal from './booking-modal';
import QuoteModal from './quote-modal';
import {
  Ruler,
  Layout,
  Calculator,
  Truck,
  Wrench,
  Sparkles,
  Zap,
  ShieldCheck,
  Check,
  CheckCircle2,
  ArrowRight,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  Layers,
  Box,
  Compass,
  FileText,
  Languages,
  Calendar,
  Hammer
} from 'lucide-react';

interface DealerLandingPageProps {
  onOpenBookingModal?: (serviceTitle?: string) => void;
  isMobileMockup?: boolean;
}

export default function DealerLandingPage({
  onOpenBookingModal,
  isMobileMockup = false,
}: DealerLandingPageProps) {
  // Bilingual state (toggle between English & Chinese)
  const [isChinese, setIsChinese] = useState<boolean>(true);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingService, setBookingService] = useState('Free In-Home Laser Measurement');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<string | null>(null);

  // Selected Service Tab for in-depth inspection
  const [activeServiceId, setActiveServiceId] = useState<string>('measurement');

  // Product category filter for selective product showcase
  const [productCategory, setProductCategory] = useState<'base' | 'wall' | 'vanity'>('base');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleBook = (serviceName?: string) => {
    const title = serviceName || (isChinese ? '免费上门测量' : 'Free In-Home Laser Measurement');
    if (onOpenBookingModal) {
      onOpenBookingModal(title);
    } else {
      setBookingService(title);
      setBookingModalOpen(true);
    }
  };

  const handleOpenProductQuote = (prodName: string) => {
    setSelectedProductForQuote(prodName);
    setQuoteModalOpen(true);
  };

  const activeService = DEALER_SERVICES.find((s) => s.id === activeServiceId) || DEALER_SERVICES[0];

  const showcaseProducts = CABINET_PRODUCTS.filter((p) => p.category === productCategory).slice(0, 4);

  return (
    <div className="w-full min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Top Dealer Status & Central Hub Notice */}
      <aside
        aria-label="Dealer service bulletin"
        className="bg-[#002a2a] text-stone-200 border-b border-teal-900 text-xs py-2 px-4 select-none"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#f28a0b]">
              {isChinese ? 'VanStro 认证本地经销商服务中心' : 'VanStro Authorized Local Dealer Network'}
            </span>
            <span className="text-stone-500">·</span>
            <span>
              {isChinese
                ? '温尼伯全城免费上门量尺 · 免费3D设计成图 · 送货上门专业安装'
                : 'Winnipeg Free In-Home Measure · 3D Design · Turnkey Install'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="hidden md:inline text-stone-300">
              {isChinese ? '中心总仓：856 Century Street' : 'Central Warehouse: 856 Century St'}
            </span>
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

      {/* Top Bar Navigation (Strict 3-Zone Contract: Brand — Links — 1 Primary Action + Lang Switch) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-6">
          {/* Zone 1: Single element Brand wordmark with Dealer Badge */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-[#003f3f] whitespace-nowrap shrink-0 group"
          >
            <span className="w-7 h-7 rounded-md bg-[#003f3f] text-white flex items-center justify-center font-serif text-base font-bold shadow-xs group-hover:bg-[#f28a0b] transition-colors">
              V
            </span>
            <div className="flex flex-col">
              <span className="leading-tight">VanStro</span>
              <span className="text-[10px] font-semibold text-[#f28a0b] tracking-wider uppercase">
                {isChinese ? '认证经销商中心' : 'Authorized Dealer'}
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
            <a href="#dealer-services" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              {isChinese ? '经销商八大服务' : 'Dealer Services'}
            </a>
            <a href="#turnkey-process" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              {isChinese ? '一条龙落地流程' : 'Turnkey Flow'}
            </a>
            <a href="#products-foundation" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              {isChinese ? '甄选橱柜基石' : 'Cabinet Products'}
            </a>
            <a href="#service-packages" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              {isChinese ? '服务方案套餐' : 'Service Packages'}
            </a>
            <a href="#faq" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
              {isChinese ? '常见问题 FAQ' : 'FAQ'}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Language Switcher */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Language Toggle Button */}
            <button
              onClick={() => setIsChinese(!isChinese)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors"
              title="切换语言 / Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-[#003f3f]" />
              <span>{isChinese ? 'EN' : '中文'}</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleBook()}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-[#003f3f] hover:bg-[#002e2e] active:scale-98 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              {isChinese ? '预约免费上门量尺' : 'Book Free In-Home Measure'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Centered on Dealer Turnkey Services & Rapid Response */}
      <section id="hero" className="relative overflow-hidden bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Dealer Turnkey Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed editorial location kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#003f3f]">
                <span>{isChinese ? '温尼伯本地专业经销商' : 'Winnipeg Local Certified Dealer'}</span>
                <span aria-hidden="true">·</span>
                <span>{isChinese ? '一条龙管家式全托管' : 'Turnkey Full-Service Renovation'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#f28a0b]">{isChinese ? '免费量尺 · 极速出图' : 'Free Measure · 24hr Design'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003f3f] tracking-tight leading-[1.18] text-balance">
                {isChinese
                  ? '温尼伯橱柜一条龙全包服务 · 免费上门测量 · 免费3D设计成图 · 专业送装'
                  : 'Turnkey Kitchen Cabinet Services in Winnipeg. Free In-Home Measure, 3D Design & Pro Install.'}
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                {isChinese
                  ? '告别多方协调与工期延误！VanStro 认证本地经销商为您提供专业一条龙服务：免费上门激光测尺、24小时极速 3D 效果图与明细报价、温尼伯城内直派送货、持证资深师傅精准挂墙安装及完善售后保障。依托 856 Century Street 中心仓充足现货，现货最快隔天即可发货安装。'
                  : 'Say goodbye to contractor stress. Our authorized local dealer delivers complete turnkey excellence: free laser in-home measurement, photorealistic 3D CAD renders, transparent itemized quotes, scheduled city-wide delivery from 856 Century St, and licensed carpenter installation with 12-month warranty.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => handleBook(isChinese ? '免费上门测量 (全城预约)' : 'Free In-Home Laser Measurement')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] active:scale-98 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>{isChinese ? '立即预约免费上门测量' : 'Book Free In-Home Measurement'}</span>
                </button>
                <a
                  href="#service-packages"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-sm font-semibold transition-colors"
                >
                  <span>{isChinese ? '查看服务套餐与报价' : 'Explore Service Packages'}</span>
                  <ArrowRight className="w-4 h-4 text-stone-500" />
                </a>
              </div>

              {/* 5 Core Dealer Guarantees Strip */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-stone-200">
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">{isChinese ? '测量服务' : 'Measurement'}</span>
                  <span className="text-sm font-bold text-stone-900">{isChinese ? '100% 免费上门' : '100% Free Laser'}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">{isChinese ? '3D设计' : '3D Design'}</span>
                  <span className="text-sm font-bold text-[#003f3f]">{isChinese ? '24-48h 免费出图' : 'Free Photoreal CAD'}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">{isChinese ? '落地安装' : 'Installation'}</span>
                  <span className="text-sm font-bold text-stone-900">{isChinese ? '持证专业木工' : 'Certified Carpenters'}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs text-stone-500">{isChinese ? '本地支持' : 'Local Support'}</span>
                  <span className="text-sm font-bold text-[#f28a0b]">{isChinese ? '856 Century 仓储' : 'Winnipeg Central Hub'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Proof Carrier (In-Home Measurement & 3D Render Inspection) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 aspect-[4/3] sm:aspect-[4/3]">
                <Image
                  src="/src/assets/images/vanstro_dealer_measuring_1794347664270.jpg"
                  alt="VanStro Certified Dealer conducting in-home laser measurement and 3D iPad design consultation in Winnipeg"
                  fill
                  priority
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Real-World Proof Callout */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/60 shadow-lg">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#003f3f] text-white flex items-center justify-center shrink-0">
                        <Ruler className="w-5 h-5 text-[#f28a0b]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-900">
                          {isChinese ? '红外激光精准测绘 + 现场 3D 演示' : 'Precision Laser Measure & On-Site 3D'}
                        </p>
                        <p className="text-[11px] text-stone-600">
                          {isChinese ? '严丝合缝规避误差 · 免费上门无消费压力' : 'Zero sizing mistakes · 100% Free Consultation'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBook()}
                      className="shrink-0 text-xs font-bold text-[#003f3f] hover:text-[#f28a0b] inline-flex items-center gap-1"
                    >
                      <span>{isChinese ? '立即约' : 'Book'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core Dealer Services Showcase (八大经销商专属服务体系) */}
      <section id="dealer-services" className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f28a0b]">
              {isChinese ? '专业经销商核心价值' : 'Authorized Dealer Capabilities'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003f3f] tracking-tight mt-1">
              {isChinese ? '经销商八大省心服务体系' : '8 Comprehensive Dealer Services'}
            </h2>
            <p className="text-stone-600 text-sm mt-2 leading-relaxed">
              {isChinese
                ? '作为 VanStro 温尼伯本地认证经销商，我们不仅供应优质的实木多层板橱柜，更提供从设计量尺到落地安装的管家级全链条服务。'
                : 'As VanStro certified Winnipeg dealers, we combine solid ¾" plywood cabinet products with master-level turnkey execution and post-install care.'}
            </p>
          </div>

          {/* Grid of 8 Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEALER_SERVICES.map((srv, idx) => {
              const isSelected = srv.id === activeServiceId;
              return (
                <div
                  key={srv.id}
                  onClick={() => setActiveServiceId(srv.id)}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#003f3f] bg-teal-50/40 shadow-md ring-1 ring-[#003f3f]'
                      : 'border-stone-200 hover:border-stone-300 hover:shadow-sm bg-white'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Tag and Number */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] font-bold text-stone-400">
                        0{idx + 1}.
                      </span>
                      <span className="text-[11px] font-semibold text-[#f28a0b] bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                        {isChinese ? srv.tagZh : srv.tagEn}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base font-bold text-stone-900 group-hover:text-[#003f3f] transition-colors">
                        {isChinese ? srv.titleZh : srv.titleEn}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {isChinese ? srv.subtitleZh : srv.subtitleEn}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {isChinese ? srv.descZh : srv.descEn}
                    </p>

                    {/* Highlights bullet list */}
                    <div className="pt-2 border-t border-stone-100 space-y-1.5">
                      {(isChinese ? srv.highlightsZh : srv.highlightsEn).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-stone-600">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500">
                      {isChinese ? '了解详情' : 'Inspect Details'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBook(isChinese ? srv.titleZh : srv.titleEn);
                      }}
                      className="text-xs font-bold text-[#003f3f] hover:text-[#f28a0b] inline-flex items-center gap-1"
                    >
                      <span>{isChinese ? '预约安排' : 'Book'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Highlight Spotlight for Currently Selected Service */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-stone-900 text-white border border-stone-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f28a0b]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f28a0b]">
                    {isChinese ? '当前选中服务重点展示' : 'Service Feature Spotlight'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isChinese ? activeService.titleZh : activeService.titleEn} ·{' '}
                  <span className="text-stone-300 font-normal">
                    {isChinese ? activeService.subtitleZh : activeService.subtitleEn}
                  </span>
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                  {isChinese ? activeService.descZh : activeService.descEn}
                </p>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  {(isChinese ? activeService.highlightsZh : activeService.highlightsEn).map((h, i) => (
                    <span
                      key={i}
                      className="bg-stone-800 text-stone-200 px-3 py-1 rounded-lg border border-stone-700 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <button
                  onClick={() => handleBook(isChinese ? activeService.titleZh : activeService.titleEn)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white font-bold text-xs shadow-md transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isChinese ? `立即预约 ${activeService.titleZh}` : `Schedule ${activeService.titleEn}`}
                  </span>
                </button>
                <a
                  href="tel:18558267876"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-stone-700 hover:bg-stone-800 text-stone-300 text-xs font-semibold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#f28a0b]" />
                  <span>{isChinese ? '电话咨询: 1-855-826-7876' : 'Call Desk: 1-855-826-7876'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turnkey One-Stop Flow (一条龙服务 6 步落地方案) */}
      <section id="turnkey-process" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003f3f]">
              {isChinese ? '高效施工落地流程' : 'The Turnkey Workflow'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              {isChinese ? '一条龙管家服务 6 步无忧交付' : '6 Steps from Concept to Installed Kitchen'}
            </h2>
            <p className="text-stone-600 text-sm mt-2 leading-relaxed">
              {isChinese
                ? '我们把复杂的厨房翻新工序标准化，从上门量尺、方案构想到成品安装，每一步都有专人把控质量。'
                : 'A standardized, transparent process ensuring your kitchen renovation finishes on schedule, on budget, and built to perfection.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                titleZh: '预约上门激光量尺',
                titleEn: 'In-Home Laser Measurement',
                descZh: '专业师傅携带激光测距仪上门，详细测绘空间尺寸、水电管线走向与障碍物，免上门服务费。',
                descEn: 'Our specialist conducts precision laser mapping of walls, ceiling heights, plumbing, and appliance gaps.',
                badgeZh: '100% 免费',
                badgeEn: '100% Free',
              },
              {
                step: '02',
                titleZh: '3D 方案与精准报价',
                titleEn: '3D CAD Layout & Quote',
                descZh: '24-48小时内出具多角度高清 3D 渲染图与立面图，列出一柜一价清单，不满意免费无限次修改。',
                descEn: 'Receive a photorealistic 3D render and transparent cabinet cost breakdown within 24–48 hours.',
                badgeZh: '24h 极速响应',
                badgeEn: '24-48hr Turnaround',
              },
              {
                step: '03',
                titleZh: 'Century St 仓库备货',
                titleEn: 'Warehouse Staging',
                descZh: '从 856 Century St 本地中心仓即刻分拣 ¾" 实木多层板柜体、门板与阻尼五金，无需苦等数月海外海运。',
                descEn: 'Boxes and doors are staged immediately from local Winnipeg stock. No 8-12 week factory backorders.',
                badgeZh: '本地现货直发',
                badgeEn: 'In-Stock Local',
              },
              {
                step: '04',
                titleZh: '城内专车安全送达',
                titleEn: 'Scheduled City Delivery',
                descZh: '专用厢式货车准时配送上门，专业搬运团队平整码放入室或车库，运输磕碰损耗全程包换。',
                descEn: 'Direct dispatch to your home or garage with careful handling and transit damage guarantee.',
                badgeZh: '入室码放',
                badgeEn: 'Careful Handling',
              },
              {
                step: '05',
                titleZh: '专业师傅挂墙安装',
                titleEn: 'Master Carpenter Install',
                descZh: '持证资深木工上门，采用激光水平校准挂装，精切封口条与顶线，阻尼铰链微调，完工清扫现场。',
                descEn: 'Laser-level mounting, custom filler scribing, crown moulding trim, and door alignment by certified pros.',
                badgeZh: '精湛工艺',
                badgeEn: 'Master Joinery',
              },
              {
                step: '06',
                titleZh: '验收交付与质保无忧',
                titleEn: 'Final Inspection & Warranty',
                descZh: '同业主逐一开合验收，交付 12 个月官方质保书；后续需调校五金，本地师傅快速上门服务。',
                descEn: 'Walkthrough quality inspection with the homeowner, backed by 12-Month VanStro warranty and local support.',
                badgeZh: '12个月售后保障',
                badgeEn: '12-Mo Warranty',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-extrabold font-mono text-[#003f3f]">
                      {st.step}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {isChinese ? st.badgeZh : st.badgeEn}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-stone-900">
                    {isChinese ? st.titleZh : st.titleEn}
                  </h4>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {isChinese ? st.descZh : st.descEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>{isChinese ? '标准化品控' : 'Certified Quality'}</span>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Installation Craftsmanship Showcase Photo */}
          <div className="mt-10 rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
              <div className="lg:col-span-5 relative h-72 sm:h-80 bg-stone-900">
                <Image
                  src="/src/assets/images/vanstro_dealer_installation_1794347664218.jpg"
                  alt="Certified Carpenter using spirit level and drill installing VanStro solid plywood Shaker cabinet in Winnipeg"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#003f3f]">
                  {isChinese ? '持证专业木工安装实力' : 'Installation Craftsmanship Standards'}
                </span>
                <h3 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                  {isChinese
                    ? '拒绝野蛮拼装：红外激光精调，收口平整，严丝合缝'
                    : 'Precision Leveling, Tight Scribes, and Laser-Straight Alignment'}
                </h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {isChinese
                    ? '安装是橱柜最终品质的生命线。我们的专业安装师傅具备多年温尼伯民宅结构改造经验，精通旧房墙体不平的修切工艺、重型石英石承重加固、下水管及抽油烟机开孔走线。安装完毕后彻底清理现场，交付即可使用。'
                    : 'Cabinet longevity relies heavily on installation precision. Our carpenters bring years of Canadian residential renovation experience, handling wall-stud structural fastening, laser plumb adjustments, custom filler scribes, and spotless job site cleanup.'}
                </p>

                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  {[
                    isChinese ? '红外激光水平仪' : 'Laser Leveling',
                    isChinese ? '寻龙骨膨胀加固' : 'Wall-Stud Fastening',
                    isChinese ? '无缝冠线倒角' : 'Mitered Crown Moulding',
                    isChinese ? '六向阻尼静音精校' : '6-Way Hinge Tuning',
                    isChinese ? '全场包装清运' : 'Debris Removal Included',
                  ].map((chip) => (
                    <span
                      key={chip}
                      className="bg-stone-100 text-stone-700 px-2.5 py-1 rounded-md border border-stone-200 font-medium"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleBook(isChinese ? '专业安装预约咨询' : 'Installation Booking Consultation')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#003f3f] hover:bg-[#002e2e] text-white text-xs font-bold transition-colors"
                  >
                    <span>{isChinese ? '预约专业安装师傅' : 'Book Certified Installation'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selectively Introduce Products (酌情介绍商品 — 强大的产品基石) */}
      <section id="products-foundation" className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#f28a0b]">
                {isChinese ? '卓越服务背后的实木基石' : 'The Product Foundation'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003f3f] tracking-tight mt-1">
                {isChinese ? '为什么安装师傅坚定选择 VanStro 橱柜？' : 'Why Our Installers Recommend VanStro Cabinets'}
              </h2>
              <p className="text-stone-600 text-sm mt-1 max-w-2xl">
                {isChinese
                  ? '好工艺离不开好基材。VanStro 全系列采用 ¾" 实木多层板（Plywood）箱体与耐潮高分子 Shaker 门板，承重强、不变形、抗温差，是高品质安装的前提。'
                  : 'Superior installation requires an unyielding cabinet foundation. Solid ¾" birch plywood boxes hold heavy stone countertops with zero sagging and thrive in Manitoba climate extremes.'}
              </p>
            </div>

            {/* Category switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 shrink-0">
              <button
                onClick={() => setProductCategory('base')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  productCategory === 'base' ? 'bg-[#003f3f] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isChinese ? '地柜 Base' : 'Base Cabinets'}
              </button>
              <button
                onClick={() => setProductCategory('wall')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  productCategory === 'wall' ? 'bg-[#003f3f] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isChinese ? '吊柜 Wall' : 'Wall Cabinets'}
              </button>
              <button
                onClick={() => setProductCategory('vanity')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  productCategory === 'vanity' ? 'bg-[#003f3f] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {isChinese ? '卫浴柜 Vanities' : 'Vanities (24"-66")'}
              </button>
            </div>
          </div>

          {/* Interactive Cabinet Cutaway & Hotspots */}
          <CabinetHotspots />

          {/* Selective Product Grid */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl border border-stone-200 p-5 hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>{prod.sku}</span>
                    <span className="text-emerald-700 font-semibold">{isChinese ? '本地现货' : 'In Stock'}</span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 leading-snug">
                    {prod.name}
                  </h4>
                  <p className="text-xs font-mono text-stone-500">{prod.dimensions}</p>

                  <p className="text-xs text-stone-600 line-clamp-2">
                    {prod.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600 space-y-1">
                    <div className="font-semibold text-stone-800 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#003f3f]" />
                      <span>{prod.boxMaterial}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 block">{isChinese ? '直采价' : 'Direct'}</span>
                    <span className="text-base font-extrabold text-stone-900 tabular-nums">
                      ${prod.priceCad} <span className="text-xs font-normal text-stone-500">CAD</span>
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenProductQuote(prod.name)}
                    className="px-3 py-1.5 rounded-lg bg-[#003f3f] text-white text-xs font-semibold hover:bg-[#002e2e] transition-colors"
                  >
                    {isChinese ? '询价/设计' : 'Quote'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-stone-500">
            <span>
              {isChinese
                ? '全部柜体支持纯白（Pure White）与现代浅灰（Light Grey）双色现货，配齐顶线、踢脚板与静音五金。'
                : 'All cabinets available in Pure White & Light Grey Shaker with full mouldings and hardware.'}
            </span>
          </div>
        </div>
      </section>

      {/* Service Packages Section (三大服务套餐方案) */}
      <section id="service-packages" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003f3f]">
              {isChinese ? '透明透明无套路' : 'Flexible Service Tiers'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              {isChinese ? '选择最适合您的经销商落地方案' : 'Choose Your Ideal Turnkey Package'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              {isChinese
                ? '无论是省心全包的一条龙管家，还是自提 DIY，我们都提供同等品质的实木多层板橱柜与 3D 设计支持。'
                : 'From full turnkey white-glove installation to contractor direct pickup, choose the exact level of support you need.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {SERVICE_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-7 flex flex-col justify-between transition-all ${
                  pkg.highlight
                    ? 'bg-white border-2 border-[#f28a0b] shadow-xl relative scale-102 z-10'
                    : 'bg-white border border-stone-200 shadow-xs hover:border-stone-300'
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f28a0b] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {isChinese ? pkg.badgeZh : pkg.badgeEn}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {isChinese ? pkg.nameZh : pkg.nameEn}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 font-medium">
                      {isChinese ? pkg.idealForZh : pkg.idealForEn}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-100 space-y-2.5">
                    {(isChinese ? pkg.featuresZh : pkg.featuresEn).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700 leading-relaxed">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            pkg.highlight ? 'text-[#f28a0b]' : 'text-emerald-600'
                          }`}
                        />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100">
                  <button
                    onClick={() => handleBook(isChinese ? pkg.nameZh : pkg.nameEn)}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-colors shadow-xs ${
                      pkg.highlight
                        ? 'bg-[#f28a0b] hover:bg-[#d97706] text-white'
                        : 'bg-[#003f3f] hover:bg-[#002e2e] text-white'
                    }`}
                  >
                    {isChinese ? pkg.ctaZh : pkg.ctaEn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warehouse Hub Connection: 856 Century Street */}
      <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#003f3f]">
              {isChinese ? '经销商仓储后盾' : 'Local Distribution Hub'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
              {isChinese
                ? '依托温尼伯 856 Century Street 中心总仓'
                : 'Backed by VanStro Central Hub at 856 Century Street'}
            </h2>
            <p className="text-stone-600 text-sm mt-1">
              {isChinese
                ? '地处 Route 90 交通主干道，距温尼伯机场与 Polo Park 仅 5 分钟，现货常备，极速出货。'
                : 'Centrally located on Route 90 corridor, enabling fast dispatch, warehouse pickup, and rapid replacement parts.'}
            </p>
          </div>

          <WarehouseMap />
        </div>
      </section>

      {/* Dealer FAQ Section */}
      <section id="faq" className="py-14 sm:py-20 bg-stone-100 border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f28a0b]">
              {isChinese ? '业主与客户常见解答' : 'Frequently Asked Questions'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#003f3f] tracking-tight mt-1">
              {isChinese ? '关于经销商服务的疑问与解答' : 'Questions About Dealer Services'}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2">
              {isChinese
                ? '清晰透明解答关于免费测量、3D出图速度、安装工艺与质保条款的细节。'
                : 'Clear answers on measurement booking, 3D renderings, installation process, and local warranty.'}
            </p>
          </div>

          <div className="space-y-3">
            {DEALER_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-stone-200 overflow-hidden transition-colors bg-white shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm sm:text-base hover:text-[#003f3f] transition-colors"
                  >
                    <span>{isChinese ? faq.questionZh : faq.questionEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#f28a0b]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 bg-stone-50/50">
                      {isChinese ? faq.answerZh : faq.answerEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-700">
            <div>
              <span className="font-bold text-stone-900">
                {isChinese ? '需要安排本周上门测量或咨询厨房户型？' : 'Ready to schedule your in-home measurement this week?'}
              </span>
              <p className="text-stone-500">
                {isChinese
                  ? '欢迎随时致电温尼伯服务专线，或在线登记您的房屋地址。'
                  : 'Call our Winnipeg dealer desk or book online anytime.'}
              </p>
            </div>
            <button
              onClick={() => handleBook()}
              className="px-4 py-2 rounded-lg bg-[#f28a0b] text-white font-bold hover:bg-[#d97706] transition-colors shrink-0"
            >
              {isChinese ? '立即预约免费测量' : 'Book Free Measure'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer: Quiet Corporate Footer */}
      <footer className="bg-stone-950 text-stone-300 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xl font-bold text-white">
                <span className="w-6 h-6 rounded bg-[#f28a0b] text-white flex items-center justify-center font-serif text-sm font-bold">
                  V
                </span>
                <span>VanStro</span>
                <span className="text-[10px] text-[#f28a0b] uppercase font-mono tracking-wider border border-[#f28a0b]/40 px-1.5 py-0.5 rounded">
                  {isChinese ? '认证经销商' : 'Dealer'}
                </span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {isChinese
                  ? 'VanStro 认证温尼伯本地经销商服务中心。提供实木多层板 RTA 橱柜、卫浴柜的免费上门测量、3D 方案设计、城内配送、专业安装与一条龙交钥匙工程。'
                  : 'VanStro Authorized Winnipeg Dealer Service Center. Specializing in turnkey in-home measurement, photoreal 3D layouts, city-wide delivery, and certified cabinet installation.'}
              </p>
              <p className="text-[11px] text-stone-500">
                www.vanstro.ca · Winnipeg, Manitoba
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                {isChinese ? '服务区域与总仓' : 'Winnipeg Central Hub'}
              </p>
              <div className="flex items-start gap-2 text-stone-300">
                <MapPin className="w-4 h-4 text-[#f28a0b] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">856 Century Street</p>
                  <p>Winnipeg, MB R3H 0M5</p>
                  <p className="text-stone-400 mt-0.5">
                    {isChinese ? '全城社区均可免费上门测量' : 'Covering all Winnipeg neighbourhoods'}
                  </p>
                </div>
              </div>
            </div>

            {/* Col 3 */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                {isChinese ? '服务时间与热线' : 'Hours & Inquiries'}
              </p>
              <div className="flex items-start gap-2 text-stone-300">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">{isChinese ? '周一至周五' : 'Monday to Friday'}</p>
                  <p>9:00 a.m. – 5:00 p.m. CST</p>
                  <p className="text-stone-400 mt-0.5">{isChinese ? '周末量尺可提前预约' : 'Weekend measuring by appt'}</p>
                </div>
              </div>
              <div className="pt-1 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#f28a0b] shrink-0" />
                <a href="tel:18558267876" className="font-bold text-white hover:text-[#f28a0b]">
                  1-855-826-7876
                </a>
              </div>
            </div>

            {/* Col 4 */}
            <div className="space-y-2 text-xs">
              <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                {isChinese ? '核心服务直达' : 'Dealer Services'}
              </p>
              <ul className="space-y-1 text-stone-400">
                <li>
                  <button onClick={() => handleBook('免费上门测量')} className="hover:text-white transition-colors text-left">
                    {isChinese ? '• 免费上门激光量尺' : '• Free In-Home Measurement'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleBook('免费3D设计成图')} className="hover:text-white transition-colors text-left">
                    {isChinese ? '• 免费 3D 效果图设计' : '• Free 3D Photoreal CAD'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleBook('城内送货服务')} className="hover:text-white transition-colors text-left">
                    {isChinese ? '• 温尼伯专车直达送货' : '• City-Wide Delivery'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleBook('持证专业上门安装')} className="hover:text-white transition-colors text-left">
                    {isChinese ? '• 持证师傅挂墙安装' : '• Master Carpenter Install'}
                  </button>
                </li>
                <li>
                  <button onClick={() => handleBook('一条龙全包服务')} className="text-[#f28a0b] hover:underline font-bold mt-1 text-left">
                    {isChinese ? '• 预约一条龙管家服务 →' : '• Turnkey One-Stop Solution →'}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-stone-800 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              © {new Date().getFullYear()} VanStro Authorized Dealer Network (Winnipeg, Canada). All rights reserved.
            </p>
            <div className="flex items-center gap-3 text-stone-400 text-[11px]">
              <span>免费测量</span>
              <span>·</span>
              <span>免费3D成图</span>
              <span>·</span>
              <span>城内送装</span>
              <span>·</span>
              <span>12个月质保</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={bookingService}
        isChinese={isChinese}
      />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={selectedProductForQuote}
      />
    </div>
  );
}
