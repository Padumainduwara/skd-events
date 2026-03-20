"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardCheck, Rows3, Camera, Video, Mic, LayoutTemplate, 
  Music, Speaker, Printer, GraduationCap, Plus, Check, ShoppingBag, Send, ExternalLink, Trash2
} from "lucide-react";
import WhatsAppModal from "./WhatsAppModal"; 

const structuredServices = [
  {
    id: "C1", category: "Registration", icon: ClipboardCheck,
    desc: "A front desk for guest check-in, gown distribution, and verification of graduate details.",
    items: [
      "Student Seat Number Allocation", 
      "Distribution of Student Cloaks & Garlands", 
      "Distribution of Guest & Parent Entrance Passes", 
      "Distribution of Refreshment Tokens"
    ]
  },
  {
    id: "C2", category: "Seating Arrangements", icon: Rows3,
    desc: "Comfortable and organized seating for graduates, faculty, VIPs, and guests with proper numbering.",
    items: [
      "Student Procession (Perahara) Arrangement", 
      "Award Receiving Arrangements & Time Management"
    ],
    subCategories: [
      { 
        name: "Auditorium", 
        items: [
          "Student Seating Arrangement", 
          "Guest & Parent Seating Arrangement"
        ] 
      }
    ]
  },
  {
    id: "C3", category: "Event Photography", icon: Camera,
    desc: "Professional photo coverage to capture stage moments, group photos, and event highlights.",
    subCategories: [
      { name: "Event Coverage", items: ["Fully Edited Highlight Photos", "Stage Photos"] },
      { name: "Photobooth Coverage", items: ["Full & Bust Photos", "Family Photos", "Couple Photos", "Group Photos"] },
      { name: "Photo Backdrops", items: ["Custom Themed Photo Backdrop"] }
    ]
  },
  {
    id: "C4", category: "Event Videography", icon: Video,
    desc: "Professional video coverage, highlight videos, live streaming, and interactive 360 booths.",
    items: [
      "Fully Edited Event Coverage Video", "Fully Edited Highlight Video", 
      "Fully Edited Guest Speeches", "Live Streaming on Facebook & YouTube", 
      "Review & Testimonial Video Clips"
    ],
    subCategories: [
      { 
        name: "360 Video Booth", 
        items: [
          "04-Hour Package", 
          "Full-Day Package", 
          "7'x3' Matte Flex Print University & Campus Branding Boards"
        ] 
      }
    ]
  },
  {
    id: "C5", category: "Master of Ceremony & Compere", icon: Mic,
    desc: "Professional announcers and comperes to guide the event smoothly in multiple languages.",
    items: ["Sinhala Compere", "English Compere", "Tamil Compere"]
  },
  {
    id: "C6", category: "Stage Arrangements", icon: LayoutTemplate,
    desc: "A professionally designed stage with podium, backdrop, lighting, and floral decorations.",
    subCategories: [
      { name: "Stage Flower Decorations", items: ["Oil Lamp Decoration", "Podium Decoration", "Head Table Decoration", "Flower Garlands & Baskets"] },
      { name: "LED Video Wall", items: ["55' LED TV on Stage", "Digital Podium", "Welcome Panel LED Video Wall"] }
    ]
  },
  {
    id: "C7", category: "Entertainment", icon: Music,
    desc: "Cultural, traditional, and modern entertainment acts to captivate your audience.",
    items: ["Traditional Welcome Dance (Wes Dance)", "Sesath Holders", "Puja Dance (Girls)", "Comedian Act"],
    subCategories: [
      { name: "Girls' Dance Items", items: ["Solo Dance", "Latin Dance", "Belly Dance", "Indian Dance Act", "Mask Dance Act"] },
      { name: "Instrumental Items", items: ["Drum Orchestra", "Indian Doll Act with Dancers"] }
    ]
  },
  {
    id: "C8", category: "Sound & Lighting Systems", icon: Speaker,
    desc: "Clear audio equipment and atmospheric stage lighting to enhance visibility and atmosphere.",
    items: ["Professional Sound System Setup", "Dynamic Stage Lighting Setup"]
  },
  {
    id: "C9", category: "Printing & Certificates", icon: Printer,
    desc: "Official certificates, secure folders, flags, and promotional materials.",
    items: ["Promo Flag Printing", "Promo Flag Poles"],
    subCategories: [
      { name: "Stage Flag Printing", items: ["University Flag", "Campus Flag", "Department Flag"] }
    ]
  },
  {
    id: "C10", category: "Graduation Items", icon: GraduationCap,
    desc: "Premium graduation cloaks, ceremonial gowns, and beautiful garlands for your special day.",
    externalLink: "https://skdcloaks.com/",
    subCategories: [
      { name: "Graduation Cloak", items: ["Black", "Ash", "Blue", "Maroon", "Red"] },
      { name: "Ceremonial Cloak", items: ["Red", "Blue", "Maroon"] },
      { name: "Garlands", items: ["Purple", "Red", "Yellow", "Pink"] }
    ]
  }
];

export default function ServicesContent() {
  const [cart, setCart] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDockConfirm, setShowDockConfirm] = useState(false); 

  useEffect(() => {
    const savedCart = localStorage.getItem("skd_services_cart");
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error("Error parsing cart"); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("skd_services_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleCart = (itemFullString: string) => {
    setCart(prev => prev.includes(itemFullString) ? prev.filter(i => i !== itemFullString) : [...prev, itemFullString]);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("skd_services_cart");
    setShowDockConfirm(false);
  };

  const SelectablePill = ({ label, categoryName }: { label: string, categoryName: string }) => {
    const fullString = `${categoryName}: ${label}`;
    const isSelected = cart.includes(fullString);
    
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => toggleCart(fullString)}
        className={`flex items-start sm:items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border transform-gpu text-left w-full sm:w-auto h-auto ${
          isSelected 
            ? "bg-[#a40049] text-white border-[#a40049] shadow-md" 
            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
        }`}
      >
        <div className="shrink-0 mt-0.5 sm:mt-0">
          {isSelected ? <Check className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-gray-400" />}
        </div>
        <span className="leading-snug break-words">{label}</span>
      </motion.button>
    );
  };

  return (
    <>
      <section className="pb-24 md:pb-40 py-16 bg-white relative">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">

         <div className="columns-1 lg:columns-2 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
            {structuredServices.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  key={cat.id} 
                  className="relative group rounded-[2rem] sm:rounded-[2.5rem] p-[2px] transition-all duration-500 hover:-translate-y-2 transform-gpu shadow-md hover:shadow-[0_20px_40px_-15px_rgba(164,0,73,0.3)] break-inside-avoid inline-block w-full"
                >
                  <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-gray-200 to-gray-100 group-hover:from-[#ff4d94] group-hover:to-[#a40049] transition-colors duration-500" />
                  
                  <div className="relative bg-white rounded-[1.9rem] sm:rounded-[2.4rem] px-6 py-8 sm:p-8 md:p-10 flex flex-col h-full">
                    <div className="mb-6 sm:mb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#a40049]/10 to-[#ff4d94]/5 border border-[#a40049]/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#a40049]" />
                          </div>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">{cat.category}</h3>
                        </div>
                        
                        {cat.externalLink && (
                          <a 
                            href={cat.externalLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center self-start sm:self-auto gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-bold hover:bg-[#a40049] transition-colors shrink-0"
                          >
                            <span>Visit Store</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      {cat.desc && <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">{cat.desc}</p>}
                    </div>

                    <div className="flex-grow space-y-6">
                      {cat.items && (
                        <div className="flex flex-wrap gap-2.5">
                          {cat.items.map(item => (
                            <SelectablePill key={item} label={item} categoryName={cat.category} />
                          ))}
                        </div>
                      )}

                      {cat.subCategories && (
                        <div className="space-y-4 mt-4">
                          {cat.subCategories.map(sub => (
                            <div key={sub.name} className="bg-[#FAFAFA] border border-gray-200/60 p-4 sm:p-5 rounded-2xl">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-4 bg-[#a40049] rounded-full shrink-0" />
                                <h4 className="text-xs sm:text-sm font-extrabold text-gray-800 uppercase tracking-wide">{sub.name}</h4>
                              </div>
                              <div className="flex flex-wrap gap-2.5">
                                {sub.items.map(item => (
                                  <SelectablePill key={item} label={item} categoryName={`${cat.category} - ${sub.name}`} />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-40 transform-gpu"
            >
              <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full p-2 sm:p-3 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 pl-2 sm:pl-4 overflow-hidden">
                  <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-[#a40049]/10 rounded-full shrink-0">
                    <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-[#a40049]" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-extrabold text-gray-900 leading-none">Services Added</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Ready for quotation</p>
                  </div>
                  <div className="sm:hidden px-3 py-1.5 bg-white border border-gray-200 text-[#a40049] text-xs font-extrabold rounded-full shadow-sm whitespace-nowrap shrink-0">
                    {cart.length} Items
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => setShowDockConfirm(true)} 
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors hidden sm:block shrink-0"
                    title="Clear All"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)} 
                    className="flex-shrink-0 px-5 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#a40049] to-[#4d002c] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm sm:text-base transform-gpu whitespace-nowrap"
                  >
                    Review Quote
                    <Send className="w-4 h-4 shrink-0" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDockConfirm && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                onClick={() => setShowDockConfirm(false)} 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }} 
                animate={{ opacity: 1, scale: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-sm w-full text-center z-10"
              >
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-extrabold text-gray-900 mb-2">Clear Package?</h4>
                <p className="text-sm text-gray-500 mb-6 font-medium">Are you sure you want to remove all selected items? This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowDockConfirm(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors">Cancel</button>
                  <button onClick={clearCart} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">Yes, Clear</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>

      <WhatsAppModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cart={cart}
        toggleCart={toggleCart}
        clearCart={clearCart} 
      />
    </>
  );
}