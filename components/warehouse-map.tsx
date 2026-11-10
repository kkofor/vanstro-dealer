'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Clock, Phone, Truck, CheckCircle, ExternalLink, Package } from 'lucide-react';

export default function WarehouseMap() {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left: Warehouse photo & simulated aerial landmark map */}
        <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[380px] bg-stone-900 flex flex-col justify-between overflow-hidden">
          <Image
            src="/src/assets/images/vanstro_winnipeg_warehouse_1794345757833.jpg"
            alt="VanStro Winnipeg Trade Counter & Pickup Bays at 856 Century Street"
            fill
            className="object-cover"
            referrerPolicy="no-referrer"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />

          {/* Top badge */}
          <div className="relative z-10 p-5 flex items-center justify-between">
            <div className="bg-[#003f3f]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-teal-600/30 text-white text-xs font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f28a0b]" />
              <span>Direct Trade & Public Pickup Facility</span>
            </div>
            <span className="text-[11px] font-mono bg-black/60 text-stone-300 px-2.5 py-1 rounded-md backdrop-blur-sm">
              Bay 3 & Will Call
            </span>
          </div>

          {/* Bottom landmark tags & quick directions */}
          <div className="relative z-10 p-5 space-y-3">
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="bg-black/70 backdrop-blur-md text-stone-200 px-2.5 py-1 rounded-md border border-white/10">
                Route 90 Corridor
              </span>
              <span className="bg-black/70 backdrop-blur-md text-stone-200 px-2.5 py-1 rounded-md border border-white/10">
                4 mins from CF Polo Park
              </span>
              <span className="bg-black/70 backdrop-blur-md text-stone-200 px-2.5 py-1 rounded-md border border-white/10">
                5 mins from Winnipeg Airport
              </span>
            </div>

            <div className="bg-stone-950/80 backdrop-blur-md p-3.5 rounded-xl border border-stone-700/60 text-xs text-stone-200 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">856 Century Street, Winnipeg, MB</p>
                <p className="text-[11px] text-stone-400">Easy drive-up loading dock · Forklift assistance on pallet orders</p>
              </div>
              <a
                href="https://maps.google.com/?q=856+Century+St,+Winnipeg,+MB+R3H+0M5"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f28a0b] text-white font-bold text-xs hover:bg-[#d97706] transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                GPS Map
              </a>
            </div>
          </div>
        </div>

        {/* Right: Hours, Contact, and Pickup Protocol */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-stone-50">
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#003f3f]">
                Local Order Logistics
              </span>
              <h4 className="text-2xl font-bold text-stone-900 mt-1">
                Pick Up in Winnipeg at 856 Century Street
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                Skip 8-to-12 week factory wait times. Our Winnipeg warehouse keeps base cabinets, wall cabinets, vanities, mouldings, and hardware in stock for immediate job-site supply.
              </p>
            </div>

            {/* Quick logistical perks */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#003f3f] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-900">Same-Day & Next-Day Turnaround</h5>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    In-stock items ordered by 12:00 PM are prepped and staged for same-day afternoon pickup or next morning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-[#f28a0b] flex items-center justify-center shrink-0 mt-0.5">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-900">Fits in Your SUV, Minivan, or Truck</h5>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Heavy-duty flat-packed corrugated cartons fit comfortably in passenger vehicles. No need to rent an expensive trailer.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-[#003f3f] flex items-center justify-center shrink-0 mt-0.5">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-stone-900">Dealer Delivery & Installation Available</h5>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                    Prefer turnkey service? Our certified local Winnipeg dealer network provides curbside/inside delivery and professional installation.
                  </p>
                </div>
              </div>
            </div>

            {/* Hours and phone */}
            <div className="pt-4 border-t border-stone-200/80 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Operating Hours:</span>
                <span className="font-bold text-stone-900 block mt-0.5">Monday to Friday</span>
                <span className="text-stone-600">9:00 AM – 5:00 PM CST</span>
              </div>
              <div>
                <span className="text-stone-500 block">Warehouse Phone:</span>
                <a
                  href="tel:18558267876"
                  className="font-bold text-[#003f3f] hover:underline block mt-0.5 text-sm"
                >
                  1-855-826-7876
                </a>
                <span className="text-[11px] text-stone-500">Toll-Free Direct Line</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200">
            <a
              href="https://maps.google.com/?q=856+Century+St,+Winnipeg,+MB+R3H+0M5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#003f3f] text-white font-semibold text-xs hover:bg-[#002e2e] transition-colors"
            >
              <Navigation className="w-4 h-4 text-[#f28a0b]" />
              Open Driving Directions in Google Maps
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
