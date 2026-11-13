'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import B15SpecDossier from './b15-spec-dossier';
import B15WarrantyAccordion from './b15-warranty-accordion';
import {
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Check,
  Truck,
  Package,
  ShoppingCart,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Plus,
  Minus,
  X,
  Navigation,
  Star,
  Store,
  MessageSquarePlus
} from 'lucide-react';

interface B15ProductPageProps {
  onOpenQuoteModal?: (productName?: string) => void;
  onOpenBookingModal?: (serviceTitle?: string) => void;
  isMobileMockup?: boolean;
}

interface CartItem {
  id: string;
  sku: string;
  name: string;
  variant: string;
  dealerName: string;
  price: number;
  qty: number;
  image: string;
}

interface DealerLocation {
  id: string;
  city: string;
  name: string;
  address: string;
  stockNote: string;
  hours: string;
  isWinnipegHub?: boolean;
}

interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  roleType: 'contractor' | 'homeowner';
  rating: number;
  date: string;
  finishPurchased: string;
  title: string;
  body: string;
  verified: boolean;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DEALERS: DealerLocation[] = [
  {
    id: 'winnipeg',
    city: 'Winnipeg, MB',
    name: 'Yuan Construction Ltd. (Central Hub)',
    address: '856 Century Street, Winnipeg, MB R3H 0M5',
    stockNote: 'In Stock · Same-Day / Next-Day Pickup',
    hours: 'Mon–Fri 9:00 a.m. – 5:00 p.m.',
    isWinnipegHub: true,
  },
  {
    id: 'brandon',
    city: 'Brandon, MB',
    name: 'Westman Cabinet & Supply',
    address: '1420 Richmond Ave, Brandon, MB',
    stockNote: '2–3 Day Regional Dispatch',
    hours: 'Mon–Fri 8:30 a.m. – 5:00 p.m.',
  },
  {
    id: 'calgary',
    city: 'Calgary, AB',
    name: 'Chinook Millwork & VanStro Partner',
    address: '4120 11 St SE, Calgary, AB',
    stockNote: 'In Stock · Calgary Pickup',
    hours: 'Mon–Fri 9:00 a.m. – 5:00 p.m.',
  },
  {
    id: 'saskatoon',
    city: 'Saskatoon, SK',
    name: 'Prairie Crest Cabinetry',
    address: '815 Circle Dr E, Saskatoon, SK',
    stockNote: 'In Stock · Local Pickup',
    hours: 'Mon–Fri 9:00 a.m. – 5:00 p.m.',
  },
  {
    id: 'waterloo',
    city: 'Waterloo, ON',
    name: 'Grand River Kitchen Supply',
    address: '550 Weber St N, Waterloo, ON',
    stockNote: 'In Stock · Ontario Hub',
    hours: 'Mon–Fri 9:00 a.m. – 5:00 p.m.',
  },
];

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Marcus Hildebrand',
    role: 'General Contractor · Hildebrand Renovations',
    location: 'Winnipeg, MB',
    roleType: 'contractor',
    rating: 5,
    date: 'October 2026',
    finishPurchased: 'Pure White Shaker',
    title: 'True ¾" plywood back makes stud mounting effortless',
    body: 'We picked up two B15s and a full L-shape run from 856 Century Street for a River Heights remodel. Unlike big-box particle board boxes that flex when you anchor them, the full ¾" birch plywood frame holds heavy quartz with zero sag. DTC 6-way hinges dialed in cleanly in minutes.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Claire Desjardins',
    role: 'Homeowner',
    location: 'St. Vital, Winnipeg',
    roleType: 'homeowner',
    rating: 5,
    date: 'September 2026',
    finishPurchased: 'Light Grey Shaker',
    title: 'Fit right into the back of my SUV and assembled in 15 minutes',
    body: 'Used the B15 as a standalone coffee station base next to our pantry. Ordered before noon and picked it up at 3:30 p.m. the exact same day on Century St. The flat-pack carton slid straight into my CR-V, and the dovetail drawer glides feel solid and silent.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Trevor Bergen',
    role: 'Kitchen Installer · Red River Millwork',
    location: 'Steinbach, MB',
    roleType: 'contractor',
    rating: 5,
    date: 'August 2026',
    finishPurchased: 'Pure White Shaker',
    title: 'Zero winter joint cracking on the Shaker doors',
    body: 'Solid wood shaker doors always separate at the miter seams in Manitoba dry winters. VanStro’s dense MDF Shaker fronts stay dead flat year-round while keeping the ¾" plywood carcass strength inside. Great national pricing too.',
    verified: true,
  },
];

const B15_FAQS = [
  {
    q: 'How does selecting a local dealer work when buying on vanstro.ca?',
    a: 'VanStro maintains a consistent national price ($308.21 CAD for the B15) across Canada. Selecting your local dealer on this page routes your order directly to that partner—such as our Winnipeg hub at 856 Century Street—so they can confirm local inventory, stage your flat-packed box for pickup, or arrange local delivery and installation.',
  },
  {
    q: 'How fast can I pick up the Base Cabinet B15 in Winnipeg?',
    a: 'When in stock at 856 Century Street, orders placed before 12:00 PM Monday–Friday are typically ready for same-day afternoon pickup, or the next business day at the latest.',
  },
  {
    q: 'Does the B15 come assembled or flat-packed, and will it fit in my vehicle?',
    a: 'It ships flat-packed in a reinforced corrugated carton measuring 36" × 25" × 5" (approx. 48 lbs). It easily fits inside a standard hatchback, SUV, minivan, or sedan back seat. Assembly takes roughly 15 minutes with basic household tools.',
  },
  {
    q: 'Are the soft-close hinges and drawer slides included in the $308.21 price?',
    a: 'Yes. Every B15 includes DTC 6-way adjustable soft-close concealed door hinges, full-extension undermount soft-close drawer slides, and one ¾" adjustable birch plywood interior shelf.',
  },
  {
    q: 'Can I reverse the door swing (Left vs. Right) during assembly?',
    a: 'Yes. The symmetrical ¾" frameless face and pre-bored door hinge cups allow you to mount the door for either a Left-Hand or Right-Hand swing on-site.',
  },
  {
    q: 'What if I am ordering a full kitchen and need delivery or installation?',
    a: 'If you are planning a whole kitchen, click "Request Kitchen Quote & 3D Design" to send your layout and measurements. Your selected local dealer will prepare a free 3D design and can arrange curbside delivery and professional installation.',
  },
];

const GALLERY_IMAGES = [
  {
    id: 'white',
    label: 'Pure White',
    caption: 'Pure White Matte Shaker · 15" W × 34½" H × 24" D',
    src: '/src/assets/images/b15_white_shaker_front_toekick_1794585495119.jpg',
    alt: 'VanStro Base Cabinet B15 in Pure White Shaker front view',
  },
  {
    id: 'grey',
    label: 'Light Grey',
    caption: 'Contemporary Light Grey · Recessed Toe Kick',
    src: '/src/assets/images/b15_grey_shaker_front_1794585481437.jpg',
    alt: 'VanStro Base Cabinet B15 in Contemporary Light Grey Shaker',
  },
  {
    id: 'interior',
    label: '¾" Plywood Core',
    caption: 'Solid Birch Plywood Box · Soft-Close DTC Hinges',
    src: '/src/assets/images/b15_interior_joinery_1794585481775.jpg',
    alt: 'VanStro B15 interior showing 3/4 inch birch plywood and dovetail drawer',
  },
  {
    id: 'flatpack',
    label: 'Flat-Pack Box',
    caption: 'Reinforced Carton (36" × 25" × 5") · Fits Any SUV',
    src: '/src/assets/images/b15_flatpack_box_1794585482048.jpg',
    alt: 'VanStro B15 flat-packed carton ready for pickup at 856 Century Street Winnipeg',
  },
];

const COMPANION_ITEMS = [
  {
    id: 'sb-36',
    sku: '011720165',
    name: 'Sink Base Cabinet 36" (SB36)',
    dims: '36"W × 34½"H × 24"D',
    price: 340.00,
    image: '/src/assets/images/b15_white_shaker_front_toekick_1794585495119.jpg',
  },
  {
    id: 'w-1530',
    sku: '011720215',
    name: 'Wall Cabinet 15" × 30" (W1530)',
    dims: '15"W × 30"H × 12"D',
    price: 195.00,
    image: '/src/assets/images/b15_grey_shaker_front_1794585481437.jpg',
  },
  {
    id: 'hw-mb10',
    sku: 'VS-HW-MB10',
    name: 'Matte Black Bar Pulls (10-Pack)',
    dims: '160mm Center-to-Center',
    price: 45.00,
    image: '/src/assets/images/b15_interior_joinery_1794585481775.jpg',
  },
  {
    id: 'tk-96',
    sku: 'VS-TK96',
    name: 'Matching Toe Kick Trim (8 ft)',
    dims: '96"L × 4.5"H × 0.25"D',
    price: 28.00,
    image: '/src/assets/images/b15_flatpack_box_1794585482048.jpg',
  },
];

export default function B15ProductPage({
  onOpenQuoteModal,
  isMobileMockup = false,
}: B15ProductPageProps) {
  // Product configuration state
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState<'Pure White Shaker' | 'Light Grey Shaker'>('Pure White Shaker');
  const [hingeSide, setHingeSide] = useState<'Left Hinge' | 'Right Hinge'>('Left Hinge');
  const [quantity, setQuantity] = useState(1);

  // Local Dealer Selector state
  const [selectedDealerId, setSelectedDealerId] = useState<string>('winnipeg');
  const [isDealerPickerOpen, setIsDealerPickerOpen] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'contractor' | 'homeowner'>('all');
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRevName, setNewRevName] = useState('');
  const [newRevLocation, setNewRevLocation] = useState('Winnipeg, MB');
  const [newRevTitle, setNewRevTitle] = useState('');
  const [newRevBody, setNewRevBody] = useState('');
  const [newRevRating, setNewRevRating] = useState(5);

  // FAQ state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Interactive Cart Drawer state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'pickup' | 'dealer_delivery'>('pickup');
  const [reserveName, setReserveName] = useState('');
  const [reservePhone, setReservePhone] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const selectedDealer = DEALERS.find((d) => d.id === selectedDealerId) || DEALERS[0];
  const unitPrice = 308.21;
  const totalAddPrice = (unitPrice * quantity).toFixed(2);

  const handleFinishSelect = (finish: 'Pure White Shaker' | 'Light Grey Shaker') => {
    setSelectedFinish(finish);
    setActiveGalleryIdx(finish === 'Pure White Shaker' ? 0 : 1);
  };

  const handleAddToCart = () => {
    const variantStr = `${selectedFinish} · RTA Flat-Pack · ${hingeSide}`;
    const itemId = `b15-${selectedFinish}-${hingeSide}-${selectedDealer.id}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, qty: i.qty + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          sku: '011720130',
          name: 'Base Cabinet B15 (15"W × 34½"H × 24"D)',
          variant: variantStr,
          dealerName: `${selectedDealer.city} — ${selectedDealer.name}`,
          price: unitPrice,
          qty: quantity,
          image:
            selectedFinish === 'Pure White Shaker'
              ? GALLERY_IMAGES[0].src
              : GALLERY_IMAGES[1].src,
        },
      ];
    });
    setOrderSubmitted(false);
    setIsCartOpen(true);
  };

  const handleAddCompanion = (item: (typeof COMPANION_ITEMS)[number]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [
        ...prev,
        {
          id: item.id,
          sku: item.sku,
          name: item.name,
          variant: `${selectedFinish} · RTA Flat-Pack`,
          dealerName: `${selectedDealer.city} — ${selectedDealer.name}`,
          price: item.price,
          qty: 1,
          image: item.image,
        },
      ];
    });
    setOrderSubmitted(false);
    setIsCartOpen(true);
  };

  const updateCartQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRevName.trim() || !newRevTitle.trim() || !newRevBody.trim()) return;
    const item: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newRevName.trim(),
      role: 'Verified Buyer',
      location: newRevLocation.trim() || 'Winnipeg, MB',
      roleType: 'homeowner',
      rating: newRevRating,
      date: 'November 2026',
      finishPurchased: selectedFinish,
      title: newRevTitle.trim(),
      body: newRevBody.trim(),
      verified: true,
    };
    setReviews([item, ...reviews]);
    setNewRevName('');
    setNewRevTitle('');
    setNewRevBody('');
    setShowWriteReview(false);
  };

  const filteredReviews = reviews.filter((r) =>
    reviewFilter === 'all' ? true : r.roleType === reviewFilter
  );

  const avgRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reserveName.trim() || !reservePhone.trim()) return;
    setOrderSubmitted(true);
  };

  const activePhoto = GALLERY_IMAGES[activeGalleryIdx] || GALLERY_IMAGES[0];

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full min-h-screen bg-[#faf9f6] font-sans text-stone-900 pb-20 md:pb-0">
        {/* Slim Top Brand Logistics Bar */}
        <aside className="bg-[#002a2a] text-stone-200 border-b border-teal-900/70 text-xs py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#f28a0b]">Winnipeg Pickup</span>
              <span className="text-stone-400">·</span>
              <span>856 Century St</span>
              <span className="hidden sm:inline text-stone-500">·</span>
              <span className="hidden sm:inline text-stone-300">
                In-stock RTA cabinets ready same-day or next-day
              </span>
            </div>
            <div className="flex items-center gap-4 font-medium">
              <span className="hidden md:inline text-stone-300">Mon–Fri 9 a.m. – 5 p.m.</span>
              <a
                href="tel:18558267876"
                className="text-white hover:text-[#f28a0b] transition-colors font-semibold inline-flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#f28a0b]" />
                <span className="tabular-nums">1-855-826-7876</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Top Navigation (Strict 3-Zone Contract: Brand — 5 Links — 1 Primary Action) */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
            <a
              href="#pdp-top"
              className="flex items-center gap-2.5 text-xl font-extrabold tracking-tight text-[#003f3f] whitespace-nowrap shrink-0"
            >
              <span className="w-7 h-7 rounded-md bg-[#003f3f] text-white flex items-center justify-center font-serif text-base font-bold">
                V
              </span>
              <span>VanStro</span>
            </a>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
              <a href="#pdp-top" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
                Kitchen Cabinets
              </a>
              <a href="#specs-section" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
                Specifications
              </a>
              <a href="#companion-bundle" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
                Matching Units
              </a>
              <a href="#reviews-section" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
                Reviews
              </a>
              <a href="#faq-section" className="hover:text-[#003f3f] transition-colors whitespace-nowrap shrink-0">
                FAQ
              </a>
            </nav>

            <div className="flex items-center shrink-0">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#003f3f] hover:bg-[#002e2e] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <ShoppingCart className="w-4 h-4 text-[#f28a0b]" />
                <span>Cart ({cartCount})</span>
                {cartSubtotal > 0 && (
                  <span className="hidden sm:inline text-stone-300 font-mono tabular-nums">
                    · ${cartSubtotal.toFixed(2)}
                  </span>
                )}
              </motion.button>
            </div>
          </div>
        </header>

        {/* Quiet Breadcrumb Trail */}
        <div id="pdp-top" className="bg-white border-b border-stone-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
            <span className="hover:text-[#003f3f] cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="hover:text-[#003f3f] cursor-pointer transition-colors">Kitchen Cabinets</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="hover:text-[#003f3f] cursor-pointer transition-colors">Base Cabinets</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="font-semibold text-stone-800">Base Cabinet B15 (15&quot;)</span>
          </div>
        </div>

        {/* Main Balanced 2-Column Purchase Module */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN (7 cols): Gallery + Thumbnails + Proof Strip + What's in the Carton */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-4">
                {/* Primary Image Frame */}
                <div className="relative aspect-[4/3] bg-stone-100 rounded-2xl overflow-hidden border border-stone-200/90">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhoto.id}
                      initial={{ opacity: 0.35, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.35 }}
                      transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activePhoto.src}
                        alt={activePhoto.alt}
                        fill
                        priority
                        className="object-cover"
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Minimalist Caption Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 bg-stone-950/75 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 flex items-center justify-between text-xs text-white z-10">
                    <span className="font-medium truncate">{activePhoto.caption}</span>
                    <span className="font-mono text-[11px] text-[#f28a0b] shrink-0 ml-3">
                      Model B15-PWMS
                    </span>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {GALLERY_IMAGES.map((img, idx) => {
                    const isActive = idx === activeGalleryIdx;
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => {
                          setActiveGalleryIdx(idx);
                          if (img.id === 'white') setSelectedFinish('Pure White Shaker');
                          if (img.id === 'grey') setSelectedFinish('Light Grey Shaker');
                        }}
                        className={`relative group text-left rounded-xl overflow-hidden border transition-all bg-white ${
                          isActive
                            ? 'border-[#003f3f]'
                            : 'border-stone-200/80 hover:border-stone-300 opacity-75 hover:opacity-100'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="b15-gallery-active-ring"
                            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                            className="absolute inset-0 border-2 border-[#003f3f] rounded-xl pointer-events-none z-10"
                          />
                        )}
                        <div className="relative aspect-[4/3] bg-stone-100">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                            sizes="150px"
                          />
                        </div>
                        <div className="px-2 py-1.5 text-[11px] font-semibold text-stone-700 truncate text-center">
                          {img.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Balanced Lower-Left Stack: 3 Core Specs + What's in the Box */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 text-center space-y-0.5">
                    <span className="block text-[11px] text-stone-500">Cabinet Box</span>
                    <span className="block text-xs sm:text-sm font-bold text-[#003f3f]">¾&quot; Birch Plywood</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 text-center space-y-0.5">
                    <span className="block text-[11px] text-stone-500">Hardware Included</span>
                    <span className="block text-xs sm:text-sm font-bold text-stone-900">DTC Soft-Close</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 text-center space-y-0.5">
                    <span className="block text-[11px] text-stone-500">VanStro Warranty</span>
                    <span className="block text-xs sm:text-sm font-bold text-stone-900">12-Month Full</span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-stone-200/90 p-5 space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-200/80">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#003f3f]" />
                      <h2 className="text-xs font-bold text-stone-900">
                        Included in Every Flat-Packed B15 Carton
                      </h2>
                    </div>
                    <span className="text-[11px] font-mono text-stone-500 tabular-nums">
                      36&quot; × 25&quot; × 5&quot; · 48 lbs (Fits SUV)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-stone-600">
                    {[
                      '¾" Birch plywood sides, floor & full back',
                      '5-piece MDF Shaker door & drawer front',
                      '⅝" solid birch French dovetail drawer',
                      'DTC 6-way soft-close hinges & glides',
                      '1 × ¾" adjustable interior plywood shelf',
                      'Cam-lock hardware & assembly guide',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (5 cols): Brand Purchase Module with Select Dealer */}
            <div className="lg:col-span-5 lg:sticky lg:top-20 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 space-y-5">
              <div className="space-y-5">
                {/* Unboxed Metadata + Rating Link */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-stone-700 font-semibold">SKU 011720130</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold">In Stock</span>
                  </div>
                  <a href="#reviews-section" className="inline-flex items-center gap-1 text-stone-700 hover:text-[#003f3f] transition-colors">
                    <Star className="w-3.5 h-3.5 fill-[#f28a0b] text-[#f28a0b]" />
                    <span className="font-bold tabular-nums">{avgRating}</span>
                    <span className="text-stone-400">({reviews.length} reviews)</span>
                  </a>
                </div>

                {/* Product Headline & Core Dimensions */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#003f3f] tracking-tight leading-[1.15] text-balance">
                    Base Cabinet B15 — 15&quot; Shaker Single Door &amp; Drawer
                  </h1>
                  <p className="text-sm font-mono font-semibold text-stone-600 tabular-nums">
                    15.0&quot; W × 34.5&quot; H × 24.0&quot; D · Frameless European RTA
                  </p>
                  <p className="text-sm text-stone-600 leading-relaxed pt-0.5">
                    Ready-to-assemble 15-inch base cabinet built with solid ¾&quot; plywood boxes, a French dovetail drawer, and a crisp MDF Shaker front.
                  </p>
                </div>

                {/* National Consistent Price & Volume Quote Funnel */}
                <div className="pt-4 border-t border-stone-200/80 flex items-baseline justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-stone-900 tabular-nums tracking-tight">
                        ${unitPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">CAD / ea</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      Consistent national price · Flat-packed
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal?.('Whole Kitchen Bundle Quote (Base B15)')}
                    className="text-xs font-bold text-[#f28a0b] hover:underline text-right shrink-0"
                  >
                    Ordering 10+ cabinets?
                    <span className="block text-[11px] font-normal text-stone-500">Ask for kitchen quote →</span>
                  </button>
                </div>

                {/* Variant 1: Door Finish Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">1. Shaker Colour</span>
                    <span className="font-semibold text-[#003f3f]">{selectedFinish}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        name: 'Pure White Shaker' as const,
                        swatch: 'bg-white border-stone-300',
                        sub: 'Crisp Matte Finish',
                      },
                      {
                        name: 'Light Grey Shaker' as const,
                        swatch: 'bg-stone-300 border-stone-400',
                        sub: 'Contemporary Grey',
                      },
                    ].map((opt) => {
                      const active = selectedFinish === opt.name;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => handleFinishSelect(opt.name)}
                          className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                            active
                              ? 'border-[#003f3f] bg-teal-50/40 ring-1 ring-[#003f3f]'
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full border shrink-0 ${opt.swatch}`} />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-stone-900 truncate">{opt.name.replace(' Shaker', '')}</p>
                            <p className="text-[10px] text-stone-500 truncate">{opt.sub}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Variant 2: Hinge Swing */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">2. Door Hinge Orientation</span>
                    <span className="text-[11px] text-stone-500">Field-reversible DTC soft-close</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {(['Left Hinge', 'Right Hinge'] as const).map((side) => (
                      <button
                        key={side}
                        type="button"
                        onClick={() => setHingeSide(side)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                          hingeSide === side
                            ? 'border-[#003f3f] bg-[#003f3f] text-white'
                            : 'border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        {side}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Select Local Dealer for Order Fulfillment & Pickup */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">
                      3. Select Local Dealer (Pickup / Fulfillment)
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsDealerPickerOpen(!isDealerPickerOpen)}
                      className="font-bold text-[#003f3f] hover:text-[#f28a0b] transition-colors"
                    >
                      {isDealerPickerOpen ? 'Done' : 'Change Dealer'}
                    </button>
                  </div>

                  {/* Selected Dealer Card */}
                  <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/70 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Store className="w-4 h-4 text-[#003f3f] shrink-0" />
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {selectedDealer.city} — {selectedDealer.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 shrink-0">
                        {selectedDealer.isWinnipegHub ? 'Same/Next Day' : 'Active'}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 pl-6 truncate">
                      {selectedDealer.address} · {selectedDealer.hours}
                    </p>
                  </div>

                  {/* Expandable Dealer Selection List */}
                  <AnimatePresence>
                    {isDealerPickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <div className="p-2 rounded-xl border border-stone-200 bg-white space-y-1 max-h-44 overflow-y-auto">
                          {DEALERS.map((dealer) => {
                            const active = dealer.id === selectedDealerId;
                            return (
                              <button
                                key={dealer.id}
                                type="button"
                                onClick={() => {
                                  setSelectedDealerId(dealer.id);
                                  setIsDealerPickerOpen(false);
                                }}
                                className={`w-full p-2.5 rounded-lg text-left transition-colors flex items-center justify-between gap-2 ${
                                  active
                                    ? 'bg-teal-50/70 text-[#003f3f]'
                                    : 'hover:bg-stone-50 text-stone-700'
                                }`}
                              >
                                <div className="min-w-0">
                                  <p className="text-xs font-bold truncate">
                                    {dealer.city} — {dealer.name}
                                  </p>
                                  <p className="text-[10px] text-stone-500 truncate">{dealer.address}</p>
                                </div>
                                <span className="text-[10px] font-medium text-emerald-700 shrink-0">
                                  {dealer.stockNote.split(' · ')[0]}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quantity & Primary Add to Cart CTA */}
                <div className="pt-1 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 h-12 px-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-bold text-sm tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Increase quantity"
                        className="w-9 h-9 flex items-center justify-center text-stone-600 hover:text-stone-900 rounded-lg hover:bg-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.985 }}
                      onClick={handleAddToCart}
                      className="flex-1 h-12 px-6 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span className="tabular-nums">Add to Cart · ${totalAddPrice}</span>
                    </motion.button>
                  </div>

                  {/* Secondary Whole-Kitchen Funnel */}
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal?.(`Whole Kitchen Quote & 3D Design (${selectedFinish})`)}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#003f3f]/20 bg-teal-50/40 hover:bg-teal-50/80 text-[#003f3f] text-xs font-bold transition-colors flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#f28a0b]" />
                      <span>Planning a whole kitchen? Get a quote &amp; free 3D design</span>
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Compact Brand Fulfillment & Warranty Notes */}
              <div className="pt-3 border-t border-stone-200/80 space-y-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#f28a0b] shrink-0 mt-0.5" />
                  <p className="text-stone-600 leading-snug">
                    <strong className="text-stone-900">Delivery &amp; Installation:</strong> Arranged through your selected local dealer on request.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-stone-600 leading-snug">
                    <strong className="text-stone-900">12-Month VanStro Warranty:</strong> Local support on box joinery, finish &amp; soft-close hardware.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Award-Tier Architectural Spec Dossier & Interactive CAD Plate */}
          <B15SpecDossier />

          {/* SECTION 2B: 12-Month Warranty Terms Accordion & Local Claims Contact */}
          <B15WarrantyAccordion />

          {/* SECTION 3: Cross-Sell Funnel ("Complete Your Kitchen Run") */}
          <section id="companion-bundle" className="mt-16 sm:mt-20 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <p className="text-xs font-mono font-semibold text-[#f28a0b]">
                  Complete Your Kitchen Run
                </p>
                <h2 className="text-2xl font-extrabold text-[#003f3f] tracking-tight mt-0.5">
                  Frequently Paired With Base Cabinet B15
                </h2>
              </div>
              <span className="text-xs text-stone-500">
                Matching in {selectedFinish} · Available at {selectedDealer.city}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {COMPANION_ITEMS.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                  className="bg-white rounded-2xl border border-stone-200/90 p-4 hover:border-stone-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-stone-500">{item.sku}</p>
                      <h3 className="text-sm font-bold text-stone-900 mt-0.5 leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-xs font-mono text-stone-500 mt-0.5 tabular-nums">{item.dims}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                    <span className="text-base font-extrabold text-stone-900 tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAddCompanion(item)}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-[#003f3f] text-[#003f3f] hover:text-white text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      + Add to Order
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* SECTION 4: Verified Customer & Contractor Reviews */}
          <section id="reviews-section" className="mt-16 sm:mt-20 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200/80">
              <div className="space-y-2">
                <p className="text-xs font-mono font-semibold text-[#f28a0b]">
                  Verified Field Feedback
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-extrabold text-[#003f3f] tracking-tight">
                    Customer &amp; Contractor Reviews
                  </h2>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-stone-900">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className="w-4 h-4 fill-[#f28a0b] text-[#f28a0b]" />
                      ))}
                    </div>
                    <span className="tabular-nums">{avgRating} / 5.0</span>
                    <span className="text-xs font-normal text-stone-500">({reviews.length} verified reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Filter Segment */}
                <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'contractor', label: 'Contractors' },
                    { id: 'homeowner', label: 'Homeowners' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setReviewFilter(tab.id as any)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        reviewFilter === tab.id
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowWriteReview(!showWriteReview)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#003f3f] text-[#003f3f] hover:bg-[#003f3f] hover:text-white text-xs font-bold transition-colors whitespace-nowrap"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>{showWriteReview ? 'Cancel' : 'Write a Review'}</span>
                </button>
              </div>
            </div>

            {/* Collapsible Write a Review Form */}
            <AnimatePresence>
              {showWriteReview && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
                  onSubmit={handleReviewSubmit}
                  className="overflow-hidden"
                >
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-stone-900">Share Your Experience With Base Cabinet B15</h3>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRevRating(star)}
                            className="p-0.5"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                star <= newRevRating
                                  ? 'fill-[#f28a0b] text-[#f28a0b]'
                                  : 'text-stone-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        value={newRevName}
                        onChange={(e) => setNewRevName(e.target.value)}
                        placeholder="Your Name *"
                        className="text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                      <input
                        type="text"
                        value={newRevLocation}
                        onChange={(e) => setNewRevLocation(e.target.value)}
                        placeholder="City / Province (e.g. Winnipeg, MB)"
                        className="text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                      <input
                        type="text"
                        required
                        value={newRevTitle}
                        onChange={(e) => setNewRevTitle(e.target.value)}
                        placeholder="Review Headline *"
                        className="text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                      />
                    </div>

                    <textarea
                      rows={3}
                      required
                      value={newRevBody}
                      onChange={(e) => setNewRevBody(e.target.value)}
                      placeholder="Tell others about build quality, assembly time, or pickup experience..."
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-stone-300 bg-white focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-[#003f3f] text-white text-xs font-bold hover:bg-[#002e2e] transition-colors"
                      >
                        Publish Review
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-3.5 h-3.5 ${
                              n <= rev.rating ? 'fill-[#f28a0b] text-[#f28a0b]' : 'text-stone-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-stone-900 leading-snug">
                      {rev.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {rev.body}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200/80 text-xs">
                    <p className="font-bold text-stone-900">{rev.author}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {rev.role} · {rev.location}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-1">
                      Verified Purchase · {rev.finishPurchased}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: Product & Pickup FAQ Accordion */}
          <section id="faq-section" className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-xs font-mono font-semibold text-[#f28a0b]">
                Product &amp; Logistics FAQ
              </p>
              <h2 className="text-2xl font-extrabold text-[#003f3f] tracking-tight text-balance">
                Common Questions About Base Cabinet B15
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Quick answers on selecting a local dealer, same-day Winnipeg pickup at 856 Century St, vehicle fit, and RTA hardware.
              </p>
              <div className="pt-2">
                <a
                  href="tel:18558267876"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#003f3f] hover:text-[#f28a0b] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#f28a0b]" />
                  <span>Need sizing help? Call 1-855-826-7876</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {B15_FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-stone-200/90 bg-white overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm hover:text-[#003f3f] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#f28a0b]' : ''
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
                          <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 6: VanStro Brand Whole-Kitchen Funnel */}
          <section
            id="whole-kitchen-funnel"
            className="mt-16 sm:mt-20 rounded-3xl bg-[#003f3f] text-white p-8 sm:p-12 border border-teal-800/80"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs font-mono font-semibold text-[#f28a0b]">
                  VanStro Whole-Kitchen Planning
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-balance">
                  Planning a Whole Kitchen? Send Your Layout &amp; Measurements.
                </h2>
                <p className="text-stone-200 text-sm leading-relaxed max-w-2xl">
                  Send your room dimensions to VanStro for an itemized cabinet quote and a free 3D design from a local dealer. Pick up your flat-packed boxes in Winnipeg at 856 Century Street, or have delivery and installation arranged through a local dealer.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-3">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.985 }}
                  onClick={() => onOpenQuoteModal?.(`Whole Kitchen Quote & Free 3D Design (${selectedFinish})`)}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Kitchen Quote &amp; 3D Design</span>
                </motion.button>
                <a
                  href="https://maps.google.com/?q=856+Century+St,+Winnipeg,+MB+R3H+0M5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-5 rounded-xl border border-teal-600 hover:bg-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Navigation className="w-4 h-4 text-[#f28a0b]" />
                  <span>Get Directions to 856 Century St</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* Quiet Brand Footer */}
        <footer id="pickup-details" className="bg-stone-950 text-stone-300 border-t border-stone-800 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <span className="w-5 h-5 rounded bg-[#f28a0b] text-white flex items-center justify-center font-serif text-xs">
                  V
                </span>
                <span>VanStro Building Materials</span>
              </div>
              <p className="text-stone-400">
                856 Century Street, Winnipeg, MB R3H 0M5 · Mon–Fri 9:00 a.m. – 5:00 p.m. · 1-855-826-7876
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-stone-400">
              <span className="font-mono">SKU 011720130 (B15)</span>
              <span>·</span>
              <span>¾&quot; Solid Plywood</span>
              <span>·</span>
              <span>12-Month Warranty</span>
            </div>
          </div>
        </footer>

        {/* Sticky Mobile Buy Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-lg flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-stone-500 block leading-none truncate max-w-[160px]">
              B15 · {selectedDealer.city}
            </span>
            <span className="text-base font-extrabold text-[#003f3f] tabular-nums">
              ${totalAddPrice} <span className="text-[11px] font-normal text-stone-500">CAD</span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="px-5 py-2.5 rounded-xl bg-[#f28a0b] text-white font-bold text-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart ({quantity})</span>
          </button>
        </div>

        {/* Interactive Slide-Over Cart & Dealer Pickup Reservation Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.24, ease: EASE_OUT_EXPO }}
                className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
              >
                {/* Drawer Header */}
                <div className="px-6 py-4 bg-[#003f3f] text-white flex items-center justify-between shrink-0">
                  <div>
                    <h3 className="text-base font-bold">Your VanStro Order ({cartCount})</h3>
                    <p className="text-[11px] text-stone-300 truncate max-w-[260px]">
                      Fulfilled via {selectedDealer.city} — {selectedDealer.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    aria-label="Close cart"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Cart Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-5">
                  {orderSubmitted ? (
                    <div className="text-center py-10 space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl font-bold text-[#003f3f]">
                        Order Reserved, {reserveName}!
                      </h4>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        Your {cartCount} item(s) totaling <strong>${cartSubtotal.toFixed(2)} CAD</strong> have been routed to{' '}
                        <strong>{selectedDealer.name} ({selectedDealer.city})</strong> for{' '}
                        <strong>
                          {fulfillmentMethod === 'pickup'
                            ? `Pickup at ${selectedDealer.address}`
                            : 'Delivery & Installation Quote'}
                        </strong>
                        . Confirmation will be sent to {reservePhone}.
                      </p>
                      <button
                        onClick={() => {
                          setCart([]);
                          setOrderSubmitted(false);
                          setIsCartOpen(false);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-[#003f3f] text-white text-xs font-bold"
                      >
                        Done
                      </button>
                    </div>
                  ) : cart.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <ShoppingCart className="w-10 h-10 text-stone-300 mx-auto" />
                      <p className="text-sm font-semibold text-stone-700">Your cart is currently empty.</p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold text-[#003f3f] underline"
                      >
                        Continue configuring Base Cabinet B15
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="divide-y divide-stone-200">
                        {cart.map((item) => (
                          <div key={item.id} className="py-3.5 flex gap-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                referrerPolicy="no-referrer"
                                sizes="64px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                              <p className="text-[11px] text-stone-500 mt-0.5">{item.variant}</p>
                              <p className="text-[10px] text-[#003f3f] font-medium mt-0.5 truncate">
                                Dealer: {item.dealerName}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => updateCartQty(item.id, -1)}
                                    className="w-6 h-6 rounded border border-stone-300 flex items-center justify-center text-xs font-bold hover:bg-stone-100"
                                  >
                                    -
                                  </button>
                                  <span className="text-xs font-bold tabular-nums w-5 text-center">
                                    {item.qty}
                                  </span>
                                  <button
                                    onClick={() => updateCartQty(item.id, 1)}
                                    className="w-6 h-6 rounded border border-stone-300 flex items-center justify-center text-xs font-bold hover:bg-stone-100"
                                  >
                                    +
                                  </button>
                                </div>
                                <span className="text-xs font-extrabold text-stone-900 tabular-nums">
                                  ${(item.price * item.qty).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-2 border-t border-stone-200">
                        <span className="text-xs font-semibold text-stone-700 block">
                          Fulfillment via {selectedDealer.city}
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFulfillmentMethod('pickup')}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                              fulfillmentMethod === 'pickup'
                                ? 'border-[#003f3f] bg-teal-50/50 font-bold text-[#003f3f]'
                                : 'border-stone-200 text-stone-600'
                            }`}
                          >
                            Dealer Pickup
                            <span className="block text-[10px] font-normal text-emerald-700 mt-0.5">
                              {selectedDealer.isWinnipegHub ? 'Free · Same/Next Day' : 'Free Local Pickup'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setFulfillmentMethod('dealer_delivery')}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                              fulfillmentMethod === 'dealer_delivery'
                                ? 'border-[#003f3f] bg-teal-50/50 font-bold text-[#003f3f]'
                                : 'border-stone-200 text-stone-600'
                            }`}
                          >
                            Arrange Delivery
                            <span className="block text-[10px] font-normal text-stone-500 mt-0.5">
                              Quote via dealer
                            </span>
                          </button>
                        </div>
                      </div>

                      <form id="cart-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-3 pt-2 border-t border-stone-200">
                        <span className="text-xs font-semibold text-stone-700 block">
                          Order &amp; Pickup Contact
                        </span>
                        <input
                          type="text"
                          required
                          value={reserveName}
                          onChange={(e) => setReserveName(e.target.value)}
                          placeholder="Full Name *"
                          className="w-full text-xs px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                        />
                        <input
                          type="tel"
                          required
                          value={reservePhone}
                          onChange={(e) => setReservePhone(e.target.value)}
                          placeholder="Phone Number (e.g. 204-555-0192) *"
                          className="w-full text-xs px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#003f3f]"
                        />
                      </form>
                    </>
                  )}
                </div>

                {cart.length > 0 && !orderSubmitted && (
                  <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-3 shrink-0">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-stone-600">Subtotal (CAD)</span>
                      <span className="text-xl font-extrabold text-[#003f3f] tabular-nums">
                        ${cartSubtotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="submit"
                      form="cart-checkout-form"
                      className="w-full py-3 rounded-xl bg-[#f28a0b] hover:bg-[#d97706] text-white font-bold text-sm transition-colors"
                    >
                      {fulfillmentMethod === 'pickup'
                        ? `Reserve Pickup at ${selectedDealer.city}`
                        : 'Submit Order & Arrange Delivery'}
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
