"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ShoppingBag, CheckCircle2, Trash2 } from "lucide-react";

// මේ තියෙන්නේ Types ටික (මේක අනිවාර්යයෙන්ම තියෙන්න ඕනෙ)
interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: string[];
  toggleCart: (item: string) => void;
  clearCart: () => void;
}

type ParsedItem = { original: string; item: string };
type SubCatGroup = { [subCat: string]: ParsedItem[] };
type MainCatGroup = { [mainCat: string]: SubCatGroup };

export default function WhatsAppModal({ isOpen, onClose, cart, toggleCart, clearCart }: WhatsAppModalProps) {
  const [mounted, setMounted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: "", address: "", email: "", contactPerson: "", 
    contactNumber: "", whatsappNumber: "", eventName: "", 
    eventDate: "", eventLocation: "", guestCount: ""
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // BACKGROUND SCROLL LOCK
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClearCart = () => {
    if(window.confirm("Are you sure you want to clear your entire package?")) {
      clearCart(); 
      localStorage.removeItem("skd_services_cart"); 
      onClose(); 
    }
  };

  const groupedCart = useMemo(() => {
    return cart.reduce((acc: MainCatGroup, originalString: string) => {
      const [catPart, itemPart] = originalString.split(": ");
      if (!catPart || !itemPart) return acc; 

      let mainCat = catPart;
      let subCat = "General"; 

      if (catPart.includes(" - ")) {
        const parts = catPart.split(" - ");
        mainCat = parts[0];
        subCat = parts[1];
      }

      if (!acc[mainCat]) acc[mainCat] = {};
      if (!acc[mainCat][subCat]) acc[mainCat][subCat] = [];

      acc[mainCat][subCat].push({ original: originalString, item: itemPart });
      return acc;
    }, {});
  }, [cart]);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Please select at least one service before requesting a quotation.");
      return;
    }

    let formattedCartText = "";
    Object.entries(groupedCart).forEach(([mainCat, subCats]) => {
      formattedCartText += `\n📦 *${mainCat.toUpperCase()}*\n`;
      Object.entries(subCats).forEach(([subCat, items]) => {
        if (subCat !== "General") {
          formattedCartText += `  🔸 _${subCat}_\n`;
        }
        items.forEach(i => {
          formattedCartText += `    ✅ ${i.item}\n`;
        });
      });
    });

    const text = `🌟 *PREMIUM QUOTATION REQUEST* 🌟

📋 *SELECTED EVENT PACKAGE:*${formattedCartText}

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
    window.open(`https://wa.me/94718869555?text=${encodedText}`, '_blank');
    onClose();
  };

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6" style={{ zIndex: 999999 }}>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transform-gpu will-change-opacity" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-[1100px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh] transform-gpu will-change-[transform,opacity]"
          >
            {/* Header */}
            <div className="px-6 sm:px-10 py-5 sm:py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20 shadow-sm shrink-0">
              <div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900">Request Quotation</h3>
                <p className="text-xs sm:text-sm text-[#a40049] font-bold mt-1">Review your customized package and submit your details</p>
              </div>
              <button onClick={onClose} className="p-2.5 sm:p-3 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors group transform-gpu shrink-0">
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 group-hover:text-red-500" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-0 sm:p-2 scroll-smooth flex-grow bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
                
                {/* LEFT COLUMN: CART */}
                <div className="lg:col-span-5 order-1 bg-gray-50/50 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-200 lg:border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#a40049]/10 flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5 text-[#a40049]" /> 
                      </div>
                      <h4 className="text-sm sm:text-base font-extrabold text-gray-900 uppercase tracking-wider">Your Package</h4>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-white border border-gray-200 text-[#a40049] text-xs font-extrabold rounded-full shadow-sm whitespace-nowrap shrink-0">
                        {cart.length} Items
                      </span>
                      {cart.length > 0 && (
                        <button 
                          onClick={handleClearCart}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors whitespace-nowrap shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Clear All
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    {cart.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
                        <ShoppingBag className="w-12 h-12 text-gray-200 mb-3" />
                        <p className="text-sm text-gray-400 font-medium">No services selected yet.<br/>Please close this window and select items.</p>
                      </div>
                    ) : (
                      Object.entries(groupedCart).map(([mainCat, subCats]) => (
                        <div key={mainCat} className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden group">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#a40049] to-[#ff4d94]" />
                          <h5 className="font-extrabold text-[#a40049] text-sm sm:text-base mb-4 uppercase tracking-wide pl-2">{mainCat}</h5>
                          
                          <div className="space-y-4 pl-2">
                            {Object.entries(subCats).map(([subCat, items]) => (
                              <div key={subCat}>
                                {subCat !== "General" && (
                                  <h6 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-50 pb-1 inline-block">
                                    {subCat}
                                  </h6>
                                )}
                                <ul className="space-y-2.5">
                                  {items.map((i) => (
                                    <li key={i.original} className="flex items-start justify-between gap-3 group/item">
                                      <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        <span className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug">
                                          {i.item}
                                        </span>
                                      </div>
                                      <button 
                                        onClick={() => toggleCart(i.original)} 
                                        className="opacity-100 lg:opacity-0 lg:group-hover/item:opacity-100 transition-opacity p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                                        title="Remove Item"
                                      >
                                        <X className="w-3.5 h-3.5" />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* RIGHT COLUMN: FORM */}
                <div className="lg:col-span-7 order-2 p-6 sm:p-8 lg:p-10 pt-8 sm:pt-10">
                  <form id="whatsappForm" onSubmit={handleWhatsAppSubmit} className="space-y-6 sm:space-y-8 max-w-2xl mx-auto">
                    
                    <div>
                      <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-2">
                        <span className="w-7 h-7 rounded-full bg-[#a40049] flex items-center justify-center text-xs font-bold text-white shadow-sm">1</span>
                        Customer Details
                      </h4>
                      <p className="text-[11px] sm:text-xs text-gray-500 font-medium ml-10">We need this information to process your request.</p>
                      
                      <div className="grid grid-cols-1 gap-4 sm:gap-5 mt-5 ml-0 sm:ml-9">
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Company Name <span className="text-red-500">*</span></label>
                          <input required minLength={2} type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Contact Person <span className="text-red-500">*</span></label>
                          <input required minLength={2} type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Company Address <span className="text-red-500">*</span></label>
                          <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address <span className="text-red-500">*</span></label>
                          <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Contact Number <span className="text-red-500">*</span></label>
                          <input required type="tel" pattern="[0-9+\-\s()]+" title="Please enter a valid phone number" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">WhatsApp Number <span className="text-gray-400 normal-case font-normal">(Optional)</span></label>
                          <input type="tel" pattern="[0-9+\-\s()]+" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all placeholder:text-gray-300" placeholder="+94 77 123 4567"/>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 mt-8 border-t border-gray-100">
                      <h4 className="text-lg sm:text-xl font-extrabold text-gray-900 flex items-center gap-2.5 mb-2">
                        <span className="w-7 h-7 rounded-full bg-[#a40049] flex items-center justify-center text-xs font-bold text-white shadow-sm">2</span>
                        Event Details
                      </h4>
                      <div className="grid grid-cols-1 gap-4 sm:gap-5 mt-5 ml-0 sm:ml-9">
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Event Name <span className="text-red-500">*</span></label>
                          <input required type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Event Date <span className="text-red-500">*</span></label>
                          <input required type="date" name="eventDate" value={formData.eventDate} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Event Location <span className="text-red-500">*</span></label>
                          <input required type="text" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[11px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Guest / Student Count <span className="text-red-500">*</span></label>
                          <input required type="number" min="1" name="guestCount" value={formData.guestCount} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] outline-none transition-all"/>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-6 sm:px-10 py-5 sm:py-6 border-t border-gray-100 bg-white shrink-0">
              <div className="max-w-sm mx-auto">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  form="whatsappForm" 
                  disabled={cart.length === 0}
                  className={`w-full py-4 rounded-xl sm:rounded-2xl font-extrabold flex items-center justify-center gap-3 transition-all transform-gpu ${
                    cart.length > 0 
                      ? "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] hover:-translate-y-1" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send className="w-5 h-5 shrink-0" />
                  <span className="text-sm sm:text-base tracking-wide">Send via WhatsApp</span>
                </motion.button>
                <p className="text-[10px] sm:text-xs text-center text-gray-400 mt-3 font-medium">
                  Your WhatsApp will open securely with a pre-filled quotation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}