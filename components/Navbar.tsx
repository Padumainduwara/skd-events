"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
  ];

  return (
    <>
      {/* =========================================
          DESKTOP & TABLET FLOATING NAVBAR
          ========================================= */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        /* PERFORMANCE FIX: Added will-change-transform for smooth scrolling without repaint lag */
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 transform-gpu will-change-transform ${
          isScrolled ? "py-2 sm:py-4" : "py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative flex items-center justify-between px-4 sm:px-6 transition-all duration-500 rounded-full ${
              isScrolled
                ? "py-2.5 sm:py-3 bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(164,0,73,0.15)] border border-white/40"
                : "py-3 sm:py-4 bg-white/90 backdrop-blur-md shadow-sm border border-gray-100/50"
            }`}
          >
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 relative z-20 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
              {/* PERFORMANCE FIX: Added eager loading, high priority, and async decoding so logo caches instantly */}
              <img 
                src="/logo.png" 
                alt="SKD Event Management" 
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-8 sm:h-10 md:h-12 w-auto object-contain transform-gpu" 
              />
            </Link>

            {/* Desktop Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="relative px-3 lg:px-4 py-2 rounded-full text-sm lg:text-base font-bold transition-colors group"
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-[#a40049]" : "text-gray-600 group-hover:text-gray-900"}`}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-pill"
                        /* PERFORMANCE FIX: GPU accelerated active pill animation */
                        className="absolute inset-0 bg-[#a40049]/10 rounded-full transform-gpu will-change-transform"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-4 relative z-20 shrink-0">
              {/* Desktop CTA Button */}
              <Link href="/contact" className="hidden md:block">
                <button className="group relative px-5 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-[#a40049] to-[#4d002c] text-white rounded-full font-bold shadow-lg hover:shadow-[#a40049]/30 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 transform-gpu">
                  <span className="text-sm lg:text-base">Get a Quote</span>
                </button>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors focus:outline-none transform-gpu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

     {/* =========================================
          FULL-SCREEN MOBILE MENU OVERLAY
          ========================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            /* PERFORMANCE FIX: GPU acceleration for heavy backdrop blur */
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-2xl md:hidden overflow-y-auto transform-gpu will-change-[transform,opacity]"
          >
            {/* FIXED: Changed to min-h-[100dvh] and reduced excessive top/bottom paddings */}
            <div className="flex flex-col min-h-[100dvh] px-6 pt-24 pb-8">
              
              {/* Mobile Links */}
              <div className="flex flex-col gap-3 sm:gap-6 mt-2 sm:mt-6">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      /* PERFORMANCE FIX: GPU accelerate staggered links */
                      className="transform-gpu will-change-[transform,opacity]"
                    >
                      <Link
                        href={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        /* FIXED: Auto-adjusting font size and padding */
                        className={`flex items-center justify-between text-xl sm:text-3xl font-extrabold pb-3 sm:pb-4 border-b ${
                          isActive ? "text-[#a40049] border-[#a40049]/20" : "text-gray-900 border-gray-100"
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={`w-6 h-6 sm:w-8 sm:h-8 ${isActive ? "text-[#a40049]" : "text-gray-300"}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                /* FIXED: Adjusted top margin for perfect fit. PERFORMANCE FIX: Added GPU tags */
                className="mt-auto pt-8 sm:pt-12 transform-gpu will-change-[transform,opacity]"
              >
                <div className="p-5 sm:p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center shadow-sm">
                  <h3 className="text-gray-900 font-bold mb-1 sm:mb-2 text-sm sm:text-base">Ready to plan your event?</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">Let us craft an unforgettable experience.</p>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#a40049] to-[#4d002c] text-white rounded-2xl font-bold shadow-lg shadow-[#a40049]/20 flex items-center justify-center gap-2 text-sm sm:text-base transform-gpu">
                      Get a Quote
                    </button>
                  </Link>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}