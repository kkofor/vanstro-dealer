'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, UploadCloud, MapPin, Phone, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string | null;
}

export default function QuoteModal({ isOpen, onClose, preselectedProduct }: QuoteModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [kitchenLayout, setKitchenLayout] = useState('L-Shape with Island');
  const [finish, setFinish] = useState('White Shaker');
  const [fulfillment, setFulfillment] = useState('Warehouse Pickup (856 Century St)');
  const [dimensions, setDimensions] = useState('approx 12ft x 14ft');
  const [notes, setNotes] = useState(preselectedProduct ? `Interested in: ${preselectedProduct}` : '');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg('Please fill in your name, phone number, and email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#003f3f] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#f28a0b]">Winnipeg Dealer Network</span>
              <span className="text-stone-300">·</span>
              <span className="text-xs text-stone-200">856 Century Street</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Request Free 3D Kitchen Design & Cabinet Quote
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#003f3f]">Thank you, {name}!</h4>
              <p className="text-stone-600 max-w-md mx-auto text-sm leading-relaxed">
                Your 3D design request and measurement details have been logged with our Winnipeg kitchen team at <strong>856 Century Street</strong>.
              </p>
              
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-stone-700">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Selected Style:</span>
                  <span className="font-semibold">{finish}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Room Layout:</span>
                  <span className="font-semibold">{kitchenLayout}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Fulfillment Method:</span>
                  <span className="font-semibold">{fulfillment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Target Response:</span>
                  <span className="font-semibold text-[#f28a0b]">Within 24 Hours (Mon–Fri)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:18558267876"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#003f3f] text-white text-sm font-semibold hover:bg-[#002e2e] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#f28a0b]" />
                  Call Winnipeg Desk: 1-855-826-7876
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-sm font-medium hover:bg-stone-100 transition-colors"
                >
                  Close & Explore Products
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Step indicator */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 text-xs text-stone-500">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-[#003f3f] text-white' : 'bg-emerald-600 text-white'}`}>
                    1
                  </span>
                  <span className={step === 1 ? 'font-semibold text-stone-900' : ''}>Kitchen Specs & Layout</span>
                </div>
                <span className="text-stone-300">———</span>
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-[#003f3f] text-white' : 'bg-stone-200 text-stone-600'}`}>
                    2
                  </span>
                  <span className={step === 2 ? 'font-semibold text-stone-900' : ''}>Contact & Pickup Preference</span>
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-4">
                  {/* Layout selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Kitchen / Room Layout Shape
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'L-Shape with Island',
                        'U-Shape Kitchen',
                        'Straight Galley',
                        'Single Wall Run',
                        'L-Shape (No Island)',
                        'Bathroom Vanity Project',
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setKitchenLayout(item)}
                          className={`px-3 py-2 text-xs font-medium rounded-lg text-left border transition-all ${
                            kitchenLayout === item
                              ? 'border-[#003f3f] bg-teal-50/50 text-[#003f3f] shadow-xs'
                              : 'border-stone-200 hover:border-stone-300 text-stone-700'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Finish selector */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Cabinet Finish Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: 'White Shaker', note: 'Pure White Enamel', color: 'bg-white border-stone-300' },
                        { name: 'Light Grey Shaker', note: 'Modern Grey Enamel', color: 'bg-stone-200 border-stone-400' },
                        { name: 'Two-Tone Kitchen', note: 'White Wall + Grey Base', color: 'bg-gradient-to-r from-white to-stone-300 border-stone-300' },
                      ].map((style) => (
                        <button
                          key={style.name}
                          type="button"
                          onClick={() => setFinish(style.name)}
                          className={`p-2.5 rounded-lg border text-left flex items-start gap-2.5 transition-all ${
                            finish === style.name
                              ? 'border-[#f28a0b] ring-1 ring-[#f28a0b] bg-amber-50/30'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded-full border shrink-0 mt-0.5 ${style.color}`} />
                          <div>
                            <p className="text-xs font-semibold text-stone-900">{style.name}</p>
                            <p className="text-[10px] text-stone-500">{style.note}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions & Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Approximate Dimensions (Walls / Runs)
                      </label>
                      <input
                        type="text"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        placeholder="e.g. 10ft × 12ft with 8ft ceiling"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Timeline / Target Installation
                      </label>
                      <select className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f] bg-white">
                        <option>Ready now (Same-day / This week)</option>
                        <option>Within 2–4 weeks</option>
                        <option>Next month (Roughing-in phase)</option>
                        <option>Early planning & budgeting</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Kitchen Notes or Cabinet Specifics
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Need 36 inch sink base, 30 inch pantry, crown moulding, and island with 3 drawer banks..."
                      className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#003f3f] text-white text-xs font-semibold hover:bg-[#002e2e] transition-colors"
                    >
                      Next: Contact & Pickup Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Fulfillment preference */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Fulfillment & Pickup Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        {
                          title: 'Warehouse Pickup',
                          subtitle: '856 Century St (Same / Next Day)',
                          value: 'Warehouse Pickup (856 Century St)',
                        },
                        {
                          title: 'Local Dealer Delivery',
                          subtitle: 'Curbside or Inside Winnipeg & MB',
                          value: 'Winnipeg Local Delivery',
                        },
                        {
                          title: 'Assembly & Install',
                          subtitle: 'Full Turnkey by Dealer Network',
                          value: 'Dealer Assembly & Installation',
                        },
                      ].map((f) => (
                        <button
                          key={f.value}
                          type="button"
                          onClick={() => setFulfillment(f.value)}
                          className={`p-2.5 rounded-lg border text-left transition-all ${
                            fulfillment === f.value
                              ? 'border-[#003f3f] bg-teal-50/50 shadow-xs'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <p className="text-xs font-semibold text-stone-900">{f.title}</p>
                          <p className="text-[10px] text-stone-500 mt-0.5">{f.subtitle}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. David Friesen"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 204-555-0192"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. david@example.ca"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Winnipeg Area / Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="e.g. R3H, St. James, Tuxedo"
                        className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                    </div>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-stone-600 leading-relaxed">
                      <strong>Free 3D Layout & Dealer Pricing Guarantee:</strong> You will receive a high-resolution 3D rendering of your cabinet layout, elevation views, and itemized flat-pack pricing with ¾&quot; plywood specs from an authorized local Winnipeg dealer. No obligation.
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                    >
                      ← Back to Specs
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#f28a0b] hover:bg-[#d97706] text-white text-xs font-bold shadow-sm transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Calculating & Sending...' : 'Submit for Free 3D Design & Quote'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>

        {/* Footer info strip */}
        <div className="bg-stone-100 border-t border-stone-200 px-6 py-3 flex flex-wrap items-center justify-between text-[11px] text-stone-600 shrink-0 gap-2">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#003f3f]" />
            <span>856 Century St, Winnipeg, MB R3H 0M5</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-500" /> Mon–Fri 9am–5pm
            </span>
            <a href="tel:18558267876" className="text-[#003f3f] font-semibold hover:underline">
              1-855-826-7876
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
