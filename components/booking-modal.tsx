'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Phone, ShieldCheck, ArrowRight, Clock, Sparkles } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  isChinese?: boolean;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService = 'Free In-Home Laser Measurement',
  isChinese = false,
}: BookingModalProps) {
  const [serviceType, setServiceType] = useState(initialService);
  const [preferredTime, setPreferredTime] = useState('Flexible / ASAP (24hr Dispatch)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg(isChinese ? '请填写您的姓名、电话和电子邮箱。' : 'Please provide your name, phone number, and email.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#003f3f] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#f28a0b]">
                {isChinese ? 'VanStro 认证本地经销商' : 'VanStro Authorized Local Dealer'}
              </span>
              <span className="text-teal-400">·</span>
              <span className="text-xs text-stone-300">856 Century Street Hub</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              {isChinese ? '预约免费上门测量 & 3D 设计报价' : 'Book Free In-Home Measurement & 3D Design'}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-stone-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#003f3f]">
                {isChinese ? `感谢您的预约，${name}！` : `Thank You, ${name}!`}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed max-w-md mx-auto">
                {isChinese
                  ? '您的免费测量与一条龙服务需求已直接同步至温尼伯经销商服务中心。专属项目顾问将在 2 小时内（工作时间）与您致电确认上门时间。'
                  : 'Your in-home measurement and turnkey service request has been assigned to our certified Winnipeg dealer desk. A specialist will call you within 2 hours to confirm your scheduled visit.'}
              </p>

              {/* Confirmation Details Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs text-stone-700">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">{isChinese ? '服务项目' : 'Selected Service'}:</span>
                  <span className="font-bold text-[#003f3f]">{serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">{isChinese ? '服务区域' : 'Location'}:</span>
                  <span className="font-semibold">{address || 'Winnipeg Metro Area'}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">{isChinese ? '期望时段' : 'Preferred Slot'}:</span>
                  <span className="font-semibold">{preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">{isChinese ? '服务承诺' : 'Dealer Guarantee'}:</span>
                  <span className="font-bold text-emerald-600">{isChinese ? '100% 免费测量 + 免费3D设计' : '100% Free · Zero Obligation'}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:18558267876"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#003f3f] text-white text-xs font-bold hover:bg-[#002e2e] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#f28a0b]" />
                  {isChinese ? '直接致电: 1-855-826-7876' : 'Call Direct: 1-855-826-7876'}
                </a>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-lg border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors"
                >
                  {isChinese ? '关闭并浏览服务' : 'Close Window'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {isChinese ? '需要安排的经销商服务' : 'Select Dealer Service Required'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    {
                      en: 'Free In-Home Laser Measurement',
                      zh: '免费上门测量 (激光高精度)',
                    },
                    {
                      en: 'Turnkey: Design + Delivery + Install',
                      zh: '一条龙全包 (设计+送货+安装)',
                    },
                    {
                      en: 'Free 3D Design Layout & Quote',
                      zh: '免费 3D 效果图与明细报价',
                    },
                    {
                      en: 'Supply + City-Wide Delivery Only',
                      zh: '材料供应 + 城内专车直达',
                    },
                  ].map((s) => {
                    const isSelected = serviceType === s.en || serviceType === s.zh;
                    return (
                      <button
                        key={s.en}
                        type="button"
                        onClick={() => setServiceType(isChinese ? s.zh : s.en)}
                        className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-[#003f3f] bg-teal-50/60 text-[#003f3f] font-bold shadow-xs'
                            : 'border-stone-200 hover:border-stone-300 text-stone-700'
                        }`}
                      >
                        {isChinese ? s.zh : s.en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isChinese ? '您的称呼 / 姓名 *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isChinese ? '例如：张先生 / David' : 'e.g. David Friesen'}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isChinese ? '联系电话 *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="204-xxx-xxxx"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isChinese ? '电子邮箱 *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.ca"
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {isChinese ? '房屋地址 / 社区 / 邮编' : 'Winnipeg Address / Neighbourhood'}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={isChinese ? '例如：Bridgwater / St. James / R3H' : 'e.g. River Heights, Tuxedo, R3H'}
                    className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                  />
                </div>
              </div>

              {/* Time slot preference */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {isChinese ? '期望上门测量时段' : 'Preferred Measurement Time Window'}
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f] bg-white"
                >
                  <option value="Flexible / ASAP (24hr Dispatch)">
                    {isChinese ? '越快越好 / 极速派工 (24小时内安排)' : 'Flexible / ASAP (24hr Dispatch)'}
                  </option>
                  <option value="Weekday Morning (9:00 AM – 12:00 PM)">
                    {isChinese ? '工作日上午 (9:00 – 12:00)' : 'Weekday Morning (9:00 AM – 12:00 PM)'}
                  </option>
                  <option value="Weekday Afternoon (1:00 PM – 5:00 PM)">
                    {isChinese ? '工作日下午 (13:00 – 17:00)' : 'Weekday Afternoon (1:00 PM – 5:00 PM)'}
                  </option>
                  <option value="Weekend / Saturday Appointment">
                    {isChinese ? '周六预约时段 (需提前排期)' : 'Weekend / Saturday Appointment'}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {isChinese ? '厨房情况或特殊需求说明' : 'Kitchen Condition or Specific Notes'}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    isChinese
                      ? '例如：老厨房拆除重做，喜欢白色 Shaker 配灰色岛台，计划下个月开工...'
                      : 'e.g. Full kitchen remodel, White Shaker with Grey Island, ready for install next month...'
                  }
                  className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                />
              </div>

              {/* Trust banner */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {isChinese ? (
                    <>
                      <strong>免费承诺与服务保障：</strong>
                      上门测量及首轮 3D 设计全景方案均为 100% 免费提供，绝无隐藏费用。安装由持证专业师傅执工，享 12 个月官方质保。
                    </>
                  ) : (
                    <>
                      <strong>Dealer Guarantee:</strong> In-home laser measurement and full 3D rendering package are 100% free with zero obligation. Certified installation backed by VanStro 12-Month Factory Warranty.
                    </>
                  )}
                </p>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-500 hover:text-stone-800"
                >
                  {isChinese ? '取消' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
                >
                  {isSubmitting
                    ? (isChinese ? '正在安排师傅...' : 'Scheduling...')
                    : (isChinese ? '确认提交 · 免费预约测量' : 'Confirm & Book Free In-Home Measure')}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer info */}
        <div className="bg-stone-100 border-t border-stone-200 px-6 py-3 flex items-center justify-between text-[11px] text-stone-600 shrink-0">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#003f3f]" />
            <span>856 Century St, Winnipeg, MB R3H 0M5</span>
          </div>
          <div className="flex items-center gap-1 text-[#003f3f] font-bold">
            <Phone className="w-3.5 h-3.5 text-[#f28a0b]" />
            <span>1-855-826-7876</span>
          </div>
        </div>
      </div>
    </div>
  );
}
