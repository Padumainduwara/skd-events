"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Maximize2 } from "lucide-react";

// Image Data mapping exact files from screenshots
const galleryData = [
  { id: 1, src: "/about/convocation.jpg", category: "Convocations", title: "Grand Convocation Ceremony" },
  { id: 2, src: "/services/stage.jpg", category: "Corporate", title: "Premium Corporate Stage" },
  { id: 3, src: "/services/lighting.jpg", category: "Stage & Tech", title: "Dynamic Lighting Setup" },
  { id: 4, src: "/services/photography.jpg", category: "Convocations", title: "Graduation Photography" },
  { id: 5, src: "/services/multimedia.jpg", category: "Corporate", title: "Multimedia & LED Screens" },
  { id: 6, src: "/services/backdrop.jpg", category: "Convocations", title: "Custom Themed Backdrop" },
  { id: 7, src: "/services/sound.jpg", category: "Stage & Tech", title: "Pro Audio & Engineering" },
  { id: 8, src: "/about/lighting.jpg", category: "Stage & Tech", title: "Atmospheric Stage Lighting" },
  { id: 9, src: "/about/stage.jpg", category: "Corporate", title: "Executive Event Setup" },
];

const categories = ["All", "Convocations", "Corporate", "Stage & Tech"];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic
  const filteredImages = galleryData.filter((item) => 
    activeCategory === "All" ? true : item.category === activeCategory
  );

  return (
    <section className="py-20 md:py-32 bg-white relative z-10 min-h-screen">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ==============================================
            FILTER BUTTONS
            ============================================== */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              /* PERFORMANCE FIX: Added transform-gpu to buttons so scaling is smooth */
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 shadow-sm transform-gpu ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[#a40049] to-[#4d002c] text-white shadow-[#a40049]/30 shadow-lg scale-105"
                  : "bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ==============================================
            MASONRY GRID LAYOUT
            ============================================== */}
        <motion.div 
          layout 
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredImages.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                /* PERFORMANCE FIX: GPU Acceleration for the filtering animation and card layout */
                className="relative break-inside-avoid rounded-3xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-100 transform-gpu will-change-[transform,opacity]"
              >
                {/* Image */}
                <img 
                  src={item.src} 
                  alt={item.title} 
                  decoding="async" 
                  /* PERFORMANCE FIX: Smart Loading. First 4 images download & cache instantly. Rest are lazy loaded to save RAM. */
                  loading={index < 4 ? "eager" : "lazy"} 
                  fetchPriority={index < 4 ? "high" : "auto"}
                  /* PERFORMANCE FIX: Added transform-gpu and will-change to the image for butter smooth hover zoom */
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-[800ms] transform-gpu will-change-transform"
                />
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu">
                  <span className="inline-block px-3 py-1 bg-[#a40049]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-2 w-max">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl font-extrabold leading-tight mb-1 flex items-center justify-between">
                    {item.title}
                    <Maximize2 className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fallback Empty State (Just in case) */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg font-medium">More amazing captures coming soon to this category!</p>
          </div>
        )}

      </div>
    </section>
  );
}