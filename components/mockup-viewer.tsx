'use client';

import React, { useState } from 'react';
import DealerLandingPage from './dealer-landing-page';
import LandingPage from './landing-page';
import BookingModal from './booking-modal';
import QuoteModal from './quote-modal';
import {
  Monitor,
  Smartphone,
  Columns,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Calendar,
  Sparkles,
  Phone,
  Ruler,
  Briefcase
} from 'lucide-react';

type ViewMode = 'split' | 'desktop' | 'mobile' | 'full';
type PageMode = 'dealer' | 'catalog';

export default function MockupViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [pageMode, setPageMode] = useState<PageMode>('dealer');
  const [desktopZoom, setDesktopZoom] = useState<number>(0.85);

  // Booking & Quote modals
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingInitialService, setBookingInitialService] = useState('Free In-Home Laser Measurement');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preselectedProduct, setPreselectedProduct] = useState<string | null>(null);

  const handleOpenBooking = (serviceTitle?: string) => {
    setBookingInitialService(serviceTitle || 'Free In-Home Laser Measurement');
    setBookingModalOpen(true);
  };

  const handleOpenQuote = (productName?: string) => {
    setPreselectedProduct(productName || null);
    setQuoteModalOpen(true);
  };

  const renderActivePage = (isMobile = false) => {
    if (pageMode === 'dealer') {
      return (
        <DealerLandingPage
          onOpenBookingModal={handleOpenBooking}
          isMobileMockup={isMobile}
        />
      );
    }
    return (
      <LandingPage
        onOpenQuoteModal={handleOpenQuote}
        isMobileMockup={isMobile}
      />
    );
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col">
      {/* Studio Presentation Bar */}
      <header className="sticky top-0 z-50 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Page Selector */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#003f3f] border border-teal-700/50 flex items-center justify-center font-bold text-[#f28a0b] text-sm">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">VanStro</span>
                <span className="text-stone-500">·</span>
                <span className="text-xs font-mono text-[#f28a0b]">Winnipeg Dealer Network</span>
              </div>
              <p className="text-[11px] text-stone-400 hidden sm:block">
                856 Century Street · 免费上门测量 · 3D设计 · 城内送装一条龙
              </p>
            </div>
          </div>

          {/* Page Type Selector: Dealer Services vs Main Catalog */}
          <div className="flex items-center p-1 bg-stone-900 rounded-xl border border-stone-800">
            <button
              onClick={() => setPageMode('dealer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                pageMode === 'dealer'
                  ? 'bg-[#f28a0b] text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="针对主站的经销商专页 (聚焦服务 + 酌情介绍商品)"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>经销商服务专页 (Dealer Services)</span>
            </button>

            <button
              onClick={() => setPageMode('catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                pageMode === 'catalog'
                  ? 'bg-[#003f3f] text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="主站 RTA 选购页面"
            >
              <span>主站商品页 (RTA Store)</span>
            </button>
          </div>

          {/* View Mode Switcher: Split / Desktop / Mobile / Full */}
          <div className="flex items-center p-1 bg-stone-900 rounded-xl border border-stone-800">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'split'
                  ? 'bg-[#003f3f] text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Side-by-side Desktop and Mobile Mockups"
            >
              <Columns className="w-3.5 h-3.5 text-[#f28a0b]" />
              <span className="hidden md:inline">Side-by-Side</span>
              <span className="md:hidden">Split</span>
            </button>

            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-[#003f3f] text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Desktop 1440px Mockup Frame"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-[#003f3f] text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Mobile iPhone 390px Mockup Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>

            <button
              onClick={() => setViewMode('full')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'full'
                  ? 'bg-[#003f3f] text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Native Responsive Browser View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Full Page</span>
              <span className="md:hidden">Full</span>
            </button>
          </div>

          {/* Quick Actions & Scale */}
          <div className="flex items-center gap-2">
            {(viewMode === 'desktop' || viewMode === 'split') && (
              <div className="hidden lg:flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-lg px-2 py-1 text-xs text-stone-400">
                <button
                  onClick={() => setDesktopZoom(Math.max(0.65, desktopZoom - 0.1))}
                  className="p-1 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] px-1 text-stone-300">
                  {Math.round(desktopZoom * 100)}%
                </span>
                <button
                  onClick={() => setDesktopZoom(Math.min(1.0, desktopZoom + 0.1))}
                  className="p-1 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              onClick={() => handleOpenBooking()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#f28a0b] hover:bg-[#d97706] text-white font-bold text-xs shadow-xs transition-colors shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>预约免费测量</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Mockup Canvas */}
      <main className="flex-1 flex flex-col overflow-x-hidden">
        {/* MODE 1: SPLIT MOCKUP VIEW (DESKTOP + MOBILE SIDE BY SIDE) */}
        {viewMode === 'split' && (
          <div className="py-8 px-4 sm:px-6 max-w-[1700px] mx-auto w-full space-y-6">
            <div className="flex flex-wrap items-center justify-between text-xs text-stone-400 border-b border-stone-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-white">
                  {pageMode === 'dealer'
                    ? '经销商服务专页：桌面端与移动端双模对比'
                    : 'VanStro RTA 主站商品页：双模对比'}
                </span>
                <span className="text-stone-600">|</span>
                <span>
                  针对温尼伯搜索 &quot;RTA kitchen cabinets in Winnipeg&quot; 以及寻找本地上门量尺、3D出图、安装一条龙服务的客户
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1 text-stone-300">
                  <Monitor className="w-3 h-3 text-[#f28a0b]" /> 桌面端: 1440px
                </span>
                <span className="flex items-center gap-1 text-stone-300">
                  <Smartphone className="w-3 h-3 text-[#f28a0b]" /> 移动端: 390px (iPhone 16 Pro)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Desktop Mockup Card (7-8 Cols) */}
              <div className="xl:col-span-8 flex flex-col">
                <div className="flex items-center justify-between pb-2 text-xs font-semibold text-stone-400">
                  <span>DESKTOP MOCKUP (1440 × 900)</span>
                  <span className="text-[11px] font-mono text-stone-500">
                    {pageMode === 'dealer'
                      ? 'vanstro.ca/dealer/winnipeg-services'
                      : 'vanstro.ca/winnipeg-rta-cabinets'}
                  </span>
                </div>

                {/* MacBook / iMac Browser Frame */}
                <div className="rounded-2xl border border-stone-700 bg-stone-950 shadow-2xl overflow-hidden flex flex-col">
                  {/* Browser Chrome Bar */}
                  <div className="bg-stone-900 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between gap-4 select-none">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    </div>

                    <div className="flex-1 max-w-md mx-auto bg-stone-950/80 rounded-md px-3 py-1 border border-stone-800 text-[11px] font-mono text-stone-400 flex items-center justify-center gap-2 truncate">
                      <span className="text-emerald-500 text-[10px]">🔒</span>
                      <span>
                        {pageMode === 'dealer'
                          ? 'https://www.vanstro.ca/dealer/winnipeg-turnkey-services'
                          : 'https://www.vanstro.ca/winnipeg-rta-kitchen-cabinets'}
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-500 font-mono">1440px</div>
                  </div>

                  {/* Desktop Scrollable Viewport */}
                  <div className="h-[750px] overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-stone-400">
                    {renderActivePage(false)}
                  </div>
                </div>
              </div>

              {/* Mobile Mockup Card (4-5 Cols) */}
              <div className="xl:col-span-4 flex flex-col items-center">
                <div className="w-full flex items-center justify-between pb-2 text-xs font-semibold text-stone-400">
                  <span>MOBILE MOCKUP (390 × 844)</span>
                  <span className="text-[11px] font-mono text-stone-500">Touch & Scroll Active</span>
                </div>

                {/* iPhone 16 Pro Device Frame */}
                <div className="relative w-[375px] sm:w-[390px] h-[780px] bg-stone-950 rounded-[50px] p-3 shadow-2xl border-[4px] border-stone-700 ring-1 ring-white/10 flex flex-col overflow-hidden">
                  {/* Speaker grille & Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
                  </div>

                  {/* Status Bar */}
                  <div className="h-8 bg-white text-stone-900 px-6 pt-1 flex items-center justify-between text-[11px] font-bold z-20 shrink-0 select-none">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5 text-stone-800 text-[10px]">
                      <span>5G</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Mobile Screen Body */}
                  <div className="flex-1 overflow-y-auto bg-white rounded-b-[38px] scrollbar-none relative">
                    {renderActivePage(true)}
                  </div>

                  {/* Home Swipe Indicator */}
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-700 rounded-full z-30" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: DESKTOP MOCKUP ONLY */}
        {viewMode === 'desktop' && (
          <div className="py-8 px-4 sm:px-8 max-w-[1540px] mx-auto w-full flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-stone-400 mb-3">
              <span className="font-bold text-white">
                {pageMode === 'dealer' ? '经销商服务专页 (Desktop 1440px)' : '主站商品页 (Desktop 1440px)'}
              </span>
              <span className="text-stone-400 font-mono text-[11px]">
                Scaled to {(desktopZoom * 100).toFixed(0)}%
              </span>
            </div>

            <div
              className="w-full rounded-2xl border border-stone-700 bg-stone-950 shadow-2xl overflow-hidden transition-all duration-200"
              style={{ maxWidth: `${Math.round(1440 * desktopZoom)}px` }}
            >
              {/* Chrome Top Bar */}
              <div className="bg-stone-900 px-4 py-3 border-b border-stone-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                <div className="flex-1 max-w-lg mx-auto bg-stone-950 rounded-lg px-3 py-1 border border-stone-800 text-xs font-mono text-stone-300 flex items-center justify-center gap-2 truncate">
                  <span className="text-emerald-400 text-xs">🔒</span>
                  <span>
                    {pageMode === 'dealer'
                      ? 'https://www.vanstro.ca/dealer/winnipeg-turnkey-services'
                      : 'https://www.vanstro.ca/winnipeg-rta-kitchen-cabinets'}
                  </span>
                </div>

                <div className="text-xs font-mono text-stone-400">1440 × 900</div>
              </div>

              {/* Viewport Frame */}
              <div className="h-[800px] overflow-y-auto bg-white">
                {renderActivePage(false)}
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: MOBILE MOCKUP ONLY */}
        {viewMode === 'mobile' && (
          <div className="py-10 px-4 flex flex-col items-center justify-center">
            <div className="text-center mb-6 space-y-1">
              <h2 className="text-lg font-bold text-white">
                {pageMode === 'dealer'
                  ? '经销商服务专页 · 移动端视图 (390 × 844)'
                  : '主站商品页 · 移动端视图 (390 × 844)'}
              </h2>
              <p className="text-xs text-stone-400">
                模拟智能手机访问：清晰展示免费上门测量、3D出图、城内配送与安装一条龙服务
              </p>
            </div>

            {/* Centered iPhone 16 Pro Frame */}
            <div className="relative w-[390px] h-[844px] bg-stone-950 rounded-[54px] p-3 shadow-2xl border-[5px] border-stone-700 ring-1 ring-white/10 flex flex-col overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-30 flex items-center justify-end px-3">
                <div className="w-3 h-3 rounded-full bg-stone-900 border border-stone-800" />
              </div>

              {/* Status Bar */}
              <div className="h-9 bg-white text-stone-900 px-6 pt-1 flex items-center justify-between text-xs font-bold z-20 shrink-0 select-none">
                <span>9:41</span>
                <div className="flex items-center gap-2 text-stone-800 text-[11px]">
                  <span>5G</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Screen Body */}
              <div className="flex-1 overflow-y-auto bg-white rounded-b-[42px] scrollbar-none relative">
                {renderActivePage(true)}
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1 bg-stone-700 rounded-full z-30" />
            </div>
          </div>
        )}

        {/* MODE 4: FULL NATIVE RESPONSIVE PAGE VIEW */}
        {viewMode === 'full' && (
          <div className="w-full flex-1 bg-white">
            {renderActivePage(false)}
          </div>
        )}
      </main>

      {/* Global Booking & Quote Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={bookingInitialService}
        isChinese={true}
      />

      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedProduct={preselectedProduct}
      />
    </div>
  );
}
