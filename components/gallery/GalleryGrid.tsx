"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import { Maximize2, Image as ImageIcon, Filter, PlayCircle, ChevronDown, ChevronRight, X, SlidersHorizontal } from "lucide-react";

// --- DYNAMIC CATEGORIES WITH OPTIONAL SUB-CATEGORIES ---
const categoriesConfig = [
  { name: "All" },
  { name: "Registration" },
  { 
    name: "Seating Arrangements", 
    subCategories: ["Auditorium", "Procession (Perahara)", "Award Receiving"] 
  },
  { name: "Event Photography" },
  { name: "Event Videography" },
  { name: "Master of Ceremony & Compere" },
  { 
    name: "Stage Arrangements",
    subCategories: ["Stage Flower Decorations", "LED Video Wall", "Oil Lamps Decorations", "Podium Decorations", "Welcome Wall", "55_ LED TV", "Head Table Decorations", "Flower Garlands & Baskets"] 
  },
  { name: "Entertainment" },
  { name: "Sound & Lighting Systems" },
  { name: "Printing & Certificates" },
  { name: "Graduation Items" }
];

// --- GALLERY DATA (Perfect Squares Only) ---
// PERFORMANCE FIX: Strict unique IDs & Fixed Case-Sensitive Paths for Vercel
const galleryData = [
  { id: "reg-1", src: "/gallery/registration/1.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-2", src: "/gallery/registration/2.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-3", src: "/gallery/registration/3.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-4", src: "/gallery/registration/4.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-5", src: "/gallery/registration/5.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-6", src: "/gallery/registration/6.jpg", category: "Registration", title: "VIP Guest Check-in Area" },
  { id: "reg-7", src: "/gallery/registration/7.jpg", category: "Registration", title: "VIP Guest Check-in Area" },

  // Seating Arrangements
  { id: "seat-1", src: "/gallery/seating/seating/1.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-2", src: "/gallery/seating/seating/2.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-3", src: "/gallery/seating/seating/3.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-4", src: "/gallery/seating/seating/4.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-5", src: "/gallery/seating/seating/5.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-6", src: "/gallery/seating/seating/6.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-7", src: "/gallery/seating/seating/7.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-8", src: "/gallery/seating/seating/8.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-9", src: "/gallery/seating/seating/9.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-10", src: "/gallery/seating/seating/10.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-11", src: "/gallery/seating/seating/11.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },
  { id: "seat-12", src: "/gallery/seating/seating/12.jpg", category: "Seating Arrangements", subCategory: "Auditorium", title: "Premium Auditorium Seating" },

  // Award Receiving
  { id: "award-1", src: "/gallery/seating/award/1.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-2", src: "/gallery/seating/award/2.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-3", src: "/gallery/seating/award/3.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-4", src: "/gallery/seating/award/4.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-5", src: "/gallery/seating/award/5.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },
  { id: "award-6", src: "/gallery/seating/award/6.jpg", category: "Seating Arrangements", subCategory: "Award Receiving", title: "Award Receiving Management" },

  // Procession - FIXED: Capital 'P' changed to simple 'p' to match Vercel/Linux folder structure
  { id: "proc-1", src: "/gallery/seating/procession/1.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-2", src: "/gallery/seating/procession/2.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-3", src: "/gallery/seating/procession/3.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-4", src: "/gallery/seating/procession/4.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-6", src: "/gallery/seating/procession/6.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-7", src: "/gallery/seating/procession/7.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-8", src: "/gallery/seating/procession/8.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-9", src: "/gallery/seating/procession/9.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },
  { id: "proc-10", src: "/gallery/seating/procession/10.jpg", category: "Seating Arrangements", subCategory: "Procession (Perahara)", title: "Traditional Procession Setup" },

  // Other Placeholders for testing
  { id: "photo-1", src: "/gallery/photography/1.jpg", category: "Event Photography", title: "Graduation Group Photo" },
  { id: "video-1", src: "/gallery/videography/1.jpg", category: "Event Videography", title: "360 Video Booth Setup" },
  { id: "compere-1", src: "/gallery/compere/1.jpg", category: "Master of Ceremony & Compere", title: "Professional Compere on Stage" },
  
  // Stage Arrangements 
  { id: "stg-vid-1", src: "/gallery/stage/videowall/1.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-2", src: "/gallery/stage/videowall/2.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-3", src: "/gallery/stage/videowall/3.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-4", src: "/gallery/stage/videowall/4.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },
  { id: "stg-vid-5", src: "/gallery/stage/videowall/5.jpg", category: "Stage Arrangements", subCategory: "LED Video Wall", title: "Massive LED Video Wall" },

  { id: "stg-oil-1", src: "/gallery/stage/oillampdeco/1.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-2", src: "/gallery/stage/oillampdeco/2.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-3", src: "/gallery/stage/oillampdeco/3.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-4", src: "/gallery/stage/oillampdeco/4.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },
  { id: "stg-oil-5", src: "/gallery/stage/oillampdeco/5.jpg", category: "Stage Arrangements", subCategory: "Oil Lamps Decorations", title: "Oil Lamps Decorations" },

  { id: "stg-pod-1", src: "/gallery/stage/podium/1.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-2", src: "/gallery/stage/podium/2.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-3", src: "/gallery/stage/podium/3.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-4", src: "/gallery/stage/podium/4.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-5", src: "/gallery/stage/podium/5.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },
  { id: "stg-pod-6", src: "/gallery/stage/podium/6.jpg", category: "Stage Arrangements", subCategory: "Podium Decorations", title: "Podiums Decorations" },

  { id: "stg-wel-1", src: "/gallery/stage/welcome/1.jpg", category: "Stage Arrangements", subCategory: "Welcome Wall", title: "Welcome Signage" },
  { id: "stg-wel-2", src: "/gallery/stage/welcome/2.jpg", category: "Stage Arrangements", subCategory: "Welcome Wall", title: "Welcome Signage" },

  { id: "stg-tv-1", src: "/gallery/stage/tv/1.jpg", category: "Stage Arrangements", subCategory: "55_ LED TV", title: "55_ LED TV" },
  { id: "stg-tv-2", src: "/gallery/stage/tv/2.jpg", category: "Stage Arrangements", subCategory: "55_ LED TV", title: "55_ LED TV" },

  { id: "stg-flw-1", src: "/gallery/stage/stageflowerdeco/1.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-2", src: "/gallery/stage/stageflowerdeco/2.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-3", src: "/gallery/stage/stageflowerdeco/3.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-4", src: "/gallery/stage/stageflowerdeco/4.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },
  { id: "stg-flw-5", src: "/gallery/stage/stageflowerdeco/5.jpg", category: "Stage Arrangements", subCategory: "Stage Flower Decorations", title: "Stage Flower Decorations" },

  { id: "stg-hd-1", src: "/gallery/stage/headtabledeco/1.jpg", category: "Stage Arrangements", subCategory: "Head Table Decorations", title: "Head Table Decorations" },
  { id: "stg-hd-2", src: "/gallery/stage/headtabledeco/2.jpg", category: "Stage Arrangements", subCategory: "Head Table Decorations", title: "Head Table Decorations" },

  // Garlands - FIXED: 'garlends' typo changed to 'garlands' to match the actual folder name
  { id: "stg-gar-1", src: "/gallery/stage/garlands/1.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },
  { id: "stg-gar-2", src: "/gallery/stage/garlands/2.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },
  { id: "stg-gar-3", src: "/gallery/stage/garlands/3.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },
  { id: "stg-gar-4", src: "/gallery/stage/garlands/4.jpg", category: "Stage Arrangements", subCategory: "Flower Garlands & Baskets", title: "Flower Garlands & Baskets" },

  { id: "ent-1", src: "/gallery/entertainment/1.jpg", category: "Entertainment", title: "Traditional Wes Dance Performance" },
  { id: "snd-1", src: "/gallery/sound/1.jpg", category: "Sound & Lighting Systems", title: "Dynamic Concert Lighting" },
  { id: "prt-1", src: "/gallery/printing/1.jpg", category: "Printing & Certificates", title: "Custom Graduation Folders" },
  { id: "grad-1", src: "/gallery/graduation/1.jpg", category: "Graduation Items", title: "Premium Graduation Cloaks" }
];

// --- CATEGORY TO YOUTUBE VIDEO MAPPING ---
const categoryVideos: Record<string, string> = {
  "Stage Arrangements": "wkGEiVu_duQ",
  "Seating Arrangements": "wkGEiVu_duQ",
  "Registration": "wkGEiVu_duQ"
};

// ============================================================================
// PERFORMANCE FIX: Smart Video Player Component (Autoplays only when visible)
// ============================================================================
const AmbientVideoPlayer = ({ videoId, categoryName }: { videoId: string, categoryName: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "100px 0px 100px 0px" });
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-10 sm:mt-14 w-full"
    >
      <div className="flex items-center gap-3 mb-6 px-2 lg:px-0">
        <div className="w-10 h-10 rounded-full bg-[#a40049]/10 flex items-center justify-center shrink-0">
          <PlayCircle className="w-5 h-5 text-[#a40049] fill-[#a40049]/20" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-gray-900">{categoryName} Highlights</h3>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">Experience our world-class execution in motion.</p>
        </div>
      </div>

      <div className="relative w-full rounded-[1rem] sm:rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 bg-gray-900 aspect-video group">
        
        <AnimatePresence>
          {!isVideoLoaded && (
            <motion.div 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gray-900 z-10 flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 border-4 border-gray-700 border-t-[#a40049] rounded-full animate-spin mb-4" />
              <p className="text-gray-400 text-sm font-bold tracking-widest uppercase animate-pulse">Loading Cinematic Experience...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {isInView && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080`}
            title={`${categoryName} Video Showcase`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={() => setIsVideoLoaded(true)}
            className={`absolute inset-[-10%] w-[120%] h-[120%] object-cover pointer-events-none transform scale-[1.05] transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`} 
            style={{ border: 'none' }}
          />
        )}
        
        <div className="absolute inset-0 border-[8px] sm:border-[16px] border-black pointer-events-none opacity-5" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};


export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // NEW STATE: Track Selected Image for Lightbox Popup
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);

  // Prevent Body Scroll when Mobile Menu or Lightbox is Open
  useEffect(() => {
    if (isMobileFilterOpen || selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileFilterOpen, selectedImage]);

  const handleCategoryChange = (catName: string) => {
    setActiveCategory(catName);
    setActiveSubCategory("All"); 
    
    const catConfig = categoriesConfig.find(c => c.name === catName);
    if (!catConfig?.subCategories) {
      setIsMobileFilterOpen(false);
    }
  };

  const currentCatConfig = categoriesConfig.find(c => c.name === activeCategory);
  const availableSubCategories = currentCatConfig?.subCategories || [];

  // ====================================================================
  // EXACT FILTERING LOGIC
  // ====================================================================
  const filteredImages = useMemo(() => {
    return galleryData.filter((item) => {
      if (activeCategory === "All") return true;

      const isMainCategoryMatch = item.category === activeCategory;
      if (!isMainCategoryMatch) return false;

      if (activeSubCategory === "All") return true;

      return item.subCategory === activeSubCategory;
    });
  }, [activeCategory, activeSubCategory]);

  const activeVideoId = categoryVideos[activeCategory];

  // Reusable Sidebar Content
  const SidebarContent = () => (
    <div className="flex flex-col space-y-1.5">
      {categoriesConfig.map((cat) => {
        const isActive = activeCategory === cat.name;
        const hasSubCategories = cat.subCategories && cat.subCategories.length > 0;

        return (
          <div key={cat.name} className="flex flex-col">
            <button
              onClick={() => handleCategoryChange(cat.name)}
              className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group flex items-center justify-between ${
                isActive 
                  ? "bg-[#a40049]/5 text-[#a40049]" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#a40049] rounded-r-full" />
              )}
              <span className={`relative z-10 ${isActive ? "pl-2" : ""}`}>{cat.name}</span>
              
              {hasSubCategories && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isActive ? "rotate-180 text-[#a40049]" : "text-gray-400"}`} />
              )}
            </button>

            <AnimatePresence>
              {isActive && hasSubCategories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden ml-4 pl-4 border-l border-gray-100 mt-1 space-y-1"
                >
                  <button
                    onClick={() => {
                      setActiveSubCategory("All");
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
                      activeSubCategory === "All" ? "text-[#a40049] bg-gray-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronRight className={`w-3 h-3 shrink-0 ${activeSubCategory === "All" ? "text-[#a40049]" : "opacity-0"}`} />
                    <span className="leading-snug">All {cat.name}</span>
                  </button>

                  {cat.subCategories.map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => {
                        setActiveSubCategory(subCat);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
                        activeSubCategory === subCat ? "text-[#a40049] bg-gray-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight className={`w-3 h-3 shrink-0 ${activeSubCategory === subCat ? "text-[#a40049]" : "opacity-0"}`} />
                      <span className="leading-snug">{subCat}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="bg-[#FAFAFA] min-h-screen pt-8 pb-20">
      
      {/* ==============================================
          MOBILE STICKY FILTER BAR (FIXED LAYOUT)
          ============================================== */}
      <div className="lg:hidden sticky top-[70px] z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 py-3 px-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 max-w-full">
          
          {/* Main Category Scroll Row */}
          <div className="flex-1 overflow-x-auto custom-scrollbar-hide flex gap-2 snap-x items-center py-1">
             {categoriesConfig.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 snap-start shrink-0 border ${
                    activeCategory === cat.name
                      ? "bg-[#a40049]/10 text-[#a40049] border-[#a40049]/30 shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
          </div>

          {/* Filter Drawer Trigger Button */}
          <div className="shrink-0 pl-2 border-l border-gray-200">
            <button 
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center justify-center w-10 h-10 bg-gray-900 text-white rounded-xl shadow-md hover:bg-gray-800 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Optional Secondary Sub-Category Row for Mobile */}
        <AnimatePresence>
           {availableSubCategories.length > 0 && (
             <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 pt-2 border-t border-gray-100 flex overflow-x-auto gap-2 custom-scrollbar-hide snap-x"
             >
                <button
                  onClick={() => setActiveSubCategory("All")}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 snap-start shrink-0 border ${
                    activeSubCategory === "All"
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  All {activeCategory}
                </button>
                {availableSubCategories.map((subCat) => (
                  <button
                    key={subCat}
                    onClick={() => setActiveSubCategory(subCat)}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-300 snap-start shrink-0 border ${
                      activeSubCategory === subCat
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {subCat}
                  </button>
                ))}
             </motion.div>
           )}
        </AnimatePresence>
      </div>

      {/* ==============================================
          MOBILE SLIDE-BAR (DRAWER)
          ============================================== */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] lg:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white z-[101] lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <h3 className="text-gray-900 font-extrabold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#a40049]" /> 
                  Advanced Filters
                </h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)} 
                  className="p-2 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto flex-1">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10 mt-6 lg:mt-12">
        
        {/* ==============================================
            DESKTOP SIDEBAR
            ============================================== */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-32 bg-white rounded-3xl p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100">
            <h3 className="text-gray-900 font-extrabold text-lg mb-6 flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#a40049]" /> 
              Filter Gallery
            </h3>
            <SidebarContent />
          </div>
        </aside>

        {/* ==============================================
            MAIN CONTENT AREA
            ============================================== */}
        <main className="flex-1 flex flex-col">
          
          <div className="mb-8 hidden lg:flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {activeSubCategory !== "All" ? activeSubCategory : activeCategory} Portfolio
              </h2>
              <p className="text-gray-500 font-medium text-sm mt-1">Showing {filteredImages.length} extraordinary moments.</p>
            </div>
          </div>

          {/* --- PERFORMANCE OPTIMIZED GRID --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[50vh]">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-300 bg-white transform-gpu will-change-[transform,opacity]"
                >
                  <div className="w-full aspect-square bg-gray-100 relative">
                    
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      decoding="async" 
                      loading="lazy" 
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[800ms] transform-gpu will-change-transform"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Fixed pointer-events so button inside is clickable */}
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform-gpu">
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3 pointer-events-none">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                          {item.category}
                        </span>
                        {item.subCategory && (
                          <span className="inline-block px-3 py-1 bg-[#a40049]/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                            {item.subCategory}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-white text-lg sm:text-xl font-extrabold leading-tight flex items-center justify-between pointer-events-none">
                        <span className="line-clamp-2 pr-4">{item.title}</span>
                        
                        {/* LIGHTBOX TRIGGER BUTTON */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(item);
                          }}
                          className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#a40049] backdrop-blur-sm flex items-center justify-center shrink-0 pointer-events-auto transition-colors duration-300 shadow-lg"
                        >
                          <Maximize2 className="w-4 h-4 text-white" />
                        </button>

                      </h3>
                      
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Fallback Empty State */}
          {filteredImages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-center py-32 px-4 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 border-dashed mt-6"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">No Portfolio Items Yet</h3>
              <p className="text-gray-500 text-sm font-medium max-w-md leading-relaxed">
                We are currently organizing our premium captures for <strong>{activeSubCategory !== "All" ? activeSubCategory : activeCategory}</strong>. Coming soon!
              </p>
            </motion.div>
          )}

          {/* YOUTUBE AMBIENT VIDEO SHOWCASE */}
          <AnimatePresence mode="wait">
            {activeVideoId && activeSubCategory === "All" && (
              <AmbientVideoPlayer key={activeVideoId} videoId={activeVideoId} categoryName={activeCategory} />
            )}
          </AnimatePresence>

        </main>
      </div>
      
      {/* ==============================================
          BEAUTIFUL GLASSMORPHIC LIGHTBOX (POPUP) - CLEAN VERSION
          ============================================== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-white/60 backdrop-blur-2xl p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking inside
              className="relative max-w-6xl w-full flex items-center justify-center group"
            >
              {/* Close Button - Only visible on hover or mobile */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 sm:top-4 sm:right-4 z-10 w-10 h-10 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-900 shadow-xl transition-all border border-gray-200 opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Clean Image Container - No Text, No Background Box */}
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}