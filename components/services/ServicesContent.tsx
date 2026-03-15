"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutTemplate, Image as ImageIcon, AudioLines, Lightbulb, Rows3, ClipboardCheck, 
  Users, GraduationCap, ScrollText, Camera, UserCheck, Sparkles, 
  MonitorPlay, Coffee, ShieldCheck, Check, Plus, ShoppingBag, X, Send,
  Rotate3d, Aperture, Frame, Palette, Printer, Share2, UserCog
} from "lucide-react";

// --- DATA FROM PDF WITH UPDATED CONTEXTUAL ICONS ---
const mainServices = [
  { id: "S1", title: "Stage Setup", desc: "A professionally designed stage with podium, backdrop, lighting, and seating for dignitaries to ensure a formal and elegant ceremony.", icon: LayoutTemplate },
  { id: "S2", title: "Graduation Backdrop", desc: "A branded backdrop featuring the institution's name, logo, and convocation theme for official photographs.", icon: ImageIcon },
  { id: "S3", title: "Sound System", desc: "Clear audio equipment including microphones, speakers, and mixers to ensure speeches and music are heard properly.", icon: AudioLines },
  { id: "S4", title: "Lighting Setup", desc: "Focused stage lighting, ambient lights, and spotlights to enhance visibility and create a professional atmosphere.", icon: Lightbulb },
  { id: "S5", title: "Seating Arrangement", desc: "Comfortable and organized seating for graduates, faculty, VIPs, and guests with proper numbering.", icon: Rows3 },
  { id: "S6", title: "Registration Desk", desc: "A front desk for guest check-in, gown distribution, and verification of graduate details.", icon: ClipboardCheck },
  { id: "S7", title: "Convocation Procession", desc: "Coordinated entry of graduates, academic staff, and dignitaries, led by ceremonial music.", icon: Users },
  { id: "S8", title: "Academic Gowns & Hoods", desc: "Graduation gowns, hoods, and caps provided to students and staff according to the institutional colors.", icon: GraduationCap },
  { id: "S9", title: "Certificates & Folders", desc: "Official certificates, secure folders, and name lists prepared for accurate distribution.", icon: ScrollText },
  { id: "S10", title: "Photography & Videography", desc: "Professional photo and video coverage to capture stage moments, group photos, and event highlights.", icon: Camera },
  { id: "S11", title: "Guest Management", desc: "Welcoming, seating guidance, ushering, and crowd flow management to maintain order.", icon: UserCheck },
  { id: "S12", title: "Decor & Theming", desc: "Elegant décor, floral arrangements, banners, and thematic elements that reflect the institution's identity.", icon: Sparkles },
  { id: "S13", title: "Multimedia & Screens", desc: "LED screens or projectors to display names, live video feed, presentations, or ceremonial content.", icon: MonitorPlay },
  { id: "S14", title: "Refreshments Area", desc: "A designated space for guests and graduates to enjoy light snacks or beverages after the ceremony.", icon: Coffee },
  { id: "S15", title: "Safety & Protocol", desc: "Security personnel, first-aid support, emergency exits, and adherence to formal protocol for dignitaries.", icon: ShieldCheck },
];

const photoboothServices = [
  { id: "P1", title: "Standard Photobooth", desc: "Fully set-up photo station with backdrop, props, and instant printing for memorable keepsakes.", icon: Camera },
  { id: "P2", title: "360 Video Booth", desc: "Rotating camera platform capturing slow-motion videos, offering a modern, interactive experience.", icon: Rotate3d },
  { id: "P3", title: "DSLR Photobooth", desc: "Professional camera setup with lighting, backdrop, and on-site printing for high-quality photos.", icon: Aperture },
  { id: "P4", title: "Mirror Photobooth", desc: "Stylish, interactive touch-screen mirror booth guiding guests through poses with animations.", icon: Frame },
  { id: "P5", title: "Custom Backdrop & Props", desc: "Beautifully designed themed backdrops with matching props to suit the event style.", icon: Palette },
  { id: "P6", title: "Instant Printing Station", desc: "Fast, high-quality photo prints with custom branding—perfect for giveaways.", icon: Printer },
  { id: "P7", title: "Digital Sharing", desc: "Instantly receive photos/videos via QR code, email, or social media.", icon: Share2 },
  { id: "P8", title: "Photobooth Attendant", desc: "Trained assistant to manage the booth, guide guests, and ensure smooth operation.", icon: UserCog },
];

export default function ServicesContent() {
  const [cart, setCart] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "", address: "", email: "", contactPerson: "", contactNumber: "", whatsappNumber: "", eventName: "", eventDate: "", eventLocation: "", guestCount: ""
  });

  // Load Cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("skd_services_cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Error parsing cart"); }
    }
  }, []);

  // Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("skd_services_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = (title: string) => {
    setCart(prev => prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // WhatsApp Submission Handler - formatted beautifully for easy reading
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Please select at least one service before requesting a quotation.");
      return;
    }

    const text = `🌟 *NEW QUOTATION REQUEST* 🌟

📋 *SELECTED SERVICES:*
${cart.map((s, i) => `${i + 1}. ${s}`).join('\n')}

🏢 *CUSTOMER DETAILS:*
• *Company:* ${formData.companyName}
• *Contact Person:* ${formData.contactPerson}
• *Address:* ${formData.address}

📞 *CONTACT INFO:*
• *Email:* ${formData.email}
• *Phone:* ${formData.contactNumber}
• *WhatsApp:* ${formData.whatsappNumber || 'N/A'}

🎉 *EVENT DETAILS:*
• *Event Name:* ${formData.eventName}
• *Date:* ${formData.eventDate}
• *Location:* ${formData.eventLocation}
• *Expected Guests:* ${formData.guestCount}

─────────────────────
Sent via SKD Event Management Website`;
    
    const encodedText = encodeURIComponent(text);
    // Sri Lanka Phone Number
    window.open(`https://wa.me/94718869555?text=${encodedText}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <section className="pb-24 md:pb-40 py-8 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        
        {/* =========================================
            SECTION 1: MAIN CONVOCATION SERVICES
            ========================================= */}
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-l-4 border-[#a40049] pl-4">Core Event Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainServices.map((service) => {
              const isSelected = cart.includes(service.title);
              const Icon = service.icon;
              return (
                <div key={service.id} className={`relative p-6 rounded-3xl border transition-all duration-300 transform-gpu ${isSelected ? 'bg-[#a40049]/5 border-[#a40049]/40 shadow-md scale-[1.02]' : 'bg-white border-gray-200 hover:shadow-lg hover:-translate-y-1'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isSelected ? 'bg-[#a40049] text-white' : 'bg-gray-100 text-[#a40049]'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <button onClick={() => toggleCart(service.title)} className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${isSelected ? 'bg-[#a40049] text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-900'}`}>
                      {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isSelected ? 'text-[#a40049]' : 'text-gray-900'}`}>{service.title}</h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================
            SECTION 2: PREMIUM PHOTOBOOTH
            ========================================= */}
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 border-l-4 border-[#4d002c] pl-4">Premium Photobooth & Media</h2>
          <p className="text-gray-600 mb-8 font-medium pl-5">Decades of professional service, fully managed by our expert photography team.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {photoboothServices.map((service) => {
              const isSelected = cart.includes(service.title);
              const Icon = service.icon;
              return (
                <div key={service.id} className={`relative p-5 rounded-2xl border transition-all duration-300 transform-gpu flex flex-col ${isSelected ? 'bg-[#4d002c]/5 border-[#4d002c]/40 shadow-md' : 'bg-white border-gray-200 hover:shadow-md hover:-translate-y-1'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-[#4d002c] text-white' : 'bg-gray-100 text-[#4d002c]'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className={`text-sm font-bold leading-tight ${isSelected ? 'text-[#4d002c]' : 'text-gray-900'}`}>{service.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4 flex-grow">{service.desc}</p>
                  
                  <button onClick={() => toggleCart(service.title)} className={`w-full py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${isSelected ? 'bg-[#4d002c] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {isSelected ? <><Check className="w-4 h-4"/> Added</> : <><Plus className="w-4 h-4"/> Add to Quote</>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* =========================================
          DYNAMIC ISLAND / FLOATING GLASS DOCK
          ========================================= */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 transform-gpu"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full p-2 sm:p-3 flex items-center justify-between gap-4">
              
              <div className="flex items-center gap-3 pl-2 sm:pl-4">
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#a40049]/10 rounded-full">
                  <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#a40049]" />
                  <motion.span 
                    key={cart.length}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff4d94] text-white text-xs font-bold flex items-center justify-center rounded-full shadow-sm"
                  >
                    {cart.length}
                  </motion.span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-extrabold text-gray-900 leading-none">Services Added</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">Ready for quotation</p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)} 
                className="flex-shrink-0 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#a40049] to-[#4d002c] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center gap-2 text-sm sm:text-base transform-gpu"
              >
                Review Quote
                <Send className="w-4 h-4" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          MODERN WHATSAPP QUOTATION MODAL
          ========================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsModalOpen(false)} 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] transform-gpu will-change-[transform,opacity]"
            >
              {/* Header */}
              <div className="px-6 sm:px-10 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Request Quotation</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">Please fill in your details to proceed</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors group">
                  <X className="w-6 h-6 text-gray-500 group-hover:text-red-500" />
                </button>
              </div>

              {/* Scrollable Form Content */}
              <div className="overflow-y-auto p-6 sm:p-10 scroll-smooth bg-gray-50/50">
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Side: Selected Items */}
                  <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-0">
                      <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-[#a40049]" /> Your List ({cart.length})
                      </h4>
                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {cart.map(item => (
                          <div key={item} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <span className="text-xs sm:text-sm font-bold text-gray-700">{item}</span>
                            <button onClick={() => toggleCart(item)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: The Form */}
                  <div className="lg:col-span-2">
                    <form id="whatsappForm" onSubmit={handleWhatsAppSubmit} className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Company Name *</label><input required type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Contact Person *</label><input required type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2 sm:col-span-2"><label className="text-xs font-bold text-gray-600 ml-1">Company Address *</label><input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Email Address *</label><input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Contact Number *</label><input required type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">WhatsApp Number</label><input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Event Name *</label><input required type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Event Date *</label><input required type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Event Location *</label><input required type="text" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                        <div className="space-y-2"><label className="text-xs font-bold text-gray-600 ml-1">Guest / Student Count *</label><input required type="number" name="guestCount" value={formData.guestCount} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/></div>
                      </div>
                    </form>
                  </div>
                </div>

              </div>

              {/* Footer Action */}
              <div className="px-6 sm:px-10 py-6 border-t border-gray-100 bg-white">
                <button 
                  type="submit" 
                  form="whatsappForm" 
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all transform transform-gpu ${
                    cart.length > 0 
                      ? "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5" />
                  Send Request via WhatsApp
                </button>
                <p className="text-xs text-center text-gray-400 mt-4 font-medium">
                  Your WhatsApp application will open with the pre-filled quotation request.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}