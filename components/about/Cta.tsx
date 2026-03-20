"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, PhoneCall, Mail } from "lucide-react";

export default function Cta() {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-orb1 {
          0%, 100% { transform: scale(1) translate3d(0,0,0); opacity: 0.3; }
          50% { transform: scale(1.2) translate3d(0,0,0); opacity: 0.5; }
        }
        @keyframes pulse-orb2 {
          0%, 100% { transform: scale(1) translate3d(0,0,0); opacity: 0.2; }
          50% { transform: scale(1.5) translate3d(0,0,0); opacity: 0.4; }
        }
        .css-animated-orb1 {
          animation: pulse-orb1 8s ease-in-out infinite;
          will-change: transform, opacity;
        }
        .css-animated-orb2 {
          animation: pulse-orb2 10s ease-in-out infinite 1s;
          will-change: transform, opacity;
        }
      `}} />

       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-100 via-white to-white z-0 transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#050505] shadow-[0_20px_60px_-15px_rgba(164,0,73,0.4)] group transform-gpu will-change-[transform,opacity]"
        >
          {/* Animated Gradient Backgrounds & Orbs */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4d002c] via-[#050505] to-[#a40049] opacity-80" />
          
          {/* CSS Accelerated Orb 1 */}
          <div 
            className="css-animated-orb1 absolute top-[-20%] right-[-10%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-[#ff4d94] rounded-full blur-[120px] mix-blend-screen pointer-events-none transform-gpu" 
          />
          
          {/* CSS Accelerated Orb 2 */}
          <div 
            className="css-animated-orb2 absolute bottom-[-20%] left-[-10%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-[#a40049] rounded-full blur-[140px] pointer-events-none transform-gpu" 
          />

          {/* Grid Pattern Overlay for High-Tech feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

          {/* Content Container */}
          <div className="relative z-20 px-6 py-16 md:py-24 lg:px-20 flex flex-col items-center text-center">
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 mb-8 backdrop-blur-md transform-gpu"
            >
              <span className="text-xs font-bold tracking-widest text-white uppercase">
                Let's Work Together
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight max-w-4xl transform-gpu"
            >
              Ready to Create an <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d94] to-[#a40049]">Unforgettable Experience?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 font-medium leading-relaxed transform-gpu"
            >
              From conceptualization to flawless execution, we bring passion, innovation, and professionalism to every project. Book your event with us today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto transform-gpu"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto group relative px-10 py-5 bg-white rounded-full font-bold text-gray-900 text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                  Request a Quotation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 text-[#a40049]" />
                </button>
              </Link>

              <Link href="/services" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-white border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                  Explore Services
                </button>
              </Link>
            </motion.div>

            {/* Quick Contact Info at the bottom of CTA */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pt-8 border-t border-white/10 w-full max-w-3xl transform-gpu"
            >
              <a href="tel:+94112248181" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#a40049]/20 transition-colors">
                  <PhoneCall className="w-5 h-5 text-[#ff4d94]" />
                </div>
                <span className="font-semibold tracking-wide">+94 112 248 181</span>
              </a>
              
              <a href="mailto:info@skdevents.lk" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#a40049]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#ff4d94]" />
                </div>
                <span className="font-semibold tracking-wide">info@skdevents.lk</span>
              </a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}