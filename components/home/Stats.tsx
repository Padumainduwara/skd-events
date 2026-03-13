"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Building2, CalendarCheck, HeartHandshake } from "lucide-react";

// Zero-Lag Smooth Counter Component
const SmoothCounter = ({ target, duration = 2, suffix = "" }: { target: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(easeOut * target));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

// Extracted & Strategized Stats based on PDF data
const stats = [
  {
    id: 1,
    icon: Award,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    desc: "In the event industry",
  },
  {
    id: 2,
    icon: Building2,
    value: 50,
    suffix: "+",
    label: "Corporate Clients",
    desc: "Premier institutions & brands",
  },
  {
    id: 3,
    icon: CalendarCheck,
    value: 100,
    suffix: "+",
    label: "Successful Events",
    desc: "Flawlessly executed moments",
  },
  {
    id: 4,
    icon: HeartHandshake,
    value: 100,
    suffix: "%",
    label: "Client Commitment",
    desc: "Unforgettable experiences",
  },
];

export default function Stats() {
  return (
    <section className="py-12 md:py-16 bg-white relative z-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Premium Floating Glassmorphic Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[2rem] md:rounded-[3rem] bg-[#050505] p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_-15px_rgba(164,0,73,0.4)] overflow-hidden"
        >
          
          {/* Ambient Inner Glows */}
          <div className="absolute top-0 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-[#a40049]/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-[#ff4d94]/10 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Subtle Border Gradient */}
          <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] border border-white/10 pointer-events-none" />

          {/* RESPONSIVE GRID SYSTEM:
            Mobile: grid-cols-2 (2x2 layout)
            Desktop: lg:grid-cols-4 (1x4 layout)
          */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 sm:gap-x-8 lg:gap-12">
            
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.id} 
                  className="flex flex-col items-center text-center group px-1 sm:px-0"
                >
                  
                  {/* Glowing Icon - Auto scales on mobile */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 sm:mb-6 shadow-inner group-hover:bg-[#a40049]/20 transition-colors duration-500">
                    <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-[#ff4d94] group-hover:scale-110 transition-transform duration-500" />
                  </div>

                  {/* Animated Counter - Auto scales on mobile */}
                  <div className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-1 sm:mb-2 tracking-tight">
                    <SmoothCounter target={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Labels - Auto scales on mobile */}
                  <h3 className="text-[13px] sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white mb-1 leading-tight">
                    {stat.label}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-400 font-medium max-w-[120px] sm:max-w-[200px] leading-snug hidden sm:block">
                    {stat.desc}
                  </p>
                  
                </div>
              );
            })}

          </div>

        </motion.div>
      </div>

    </section>
  );
}