"use client";

import { motion } from "framer-motion";
import { MapPin, PhoneCall, Mail, Info, Send, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ContactFormInfo() {
  // States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Topics updated from PDF Context (Added Refund/Cancellation)
  const topics = [
    "Convocation Event",
    "Corporate Event / Launch",
    "Entertainment Event",
    "Refund / Cancellation Query",
    "Other Query"
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTopic) {
      alert("Please select a Topic / Event Type.");
      return;
    }
    if (!isPrivacyAccepted) {
      return; // Extra safety, button is disabled anyway
    }
    // Handle form submission logic here
    alert("Form submitted successfully!");
  };

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          
          {/* =========================================
              LEFT COLUMN: CONTACT INFO (BENTO GRID)
              ========================================= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Responsive Alignment added here: 
              flex-col items-center text-center for mobile
              lg:items-start lg:text-left for desktop 
            */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              /* PERFORMANCE FIX: GPU Acceleration */
              className="flex flex-col items-center text-center lg:items-start lg:text-left transform-gpu will-change-[transform,opacity]"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Contact Details</h2>
              <p className="text-gray-500 font-medium mb-4 lg:mb-8 leading-relaxed max-w-sm">
                Experience transparent communication and a client-first mindset. We are ready to listen.
              </p>
            </motion.div>

            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              /* PERFORMANCE FIX: GPU Acceleration */
              className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex gap-5 group hover:bg-white hover:shadow-xl hover:border-[#a40049]/20 transition-all duration-300 transform-gpu will-change-[transform,opacity]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049]/10 transition-colors transform-gpu">
                <MapPin className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Head Office</h4>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">No. L2-29, Reality Plaza,<br />Colombo Road, Ja-Ela,<br />Sri Lanka.</p>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              /* PERFORMANCE FIX: GPU Acceleration */
              className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex gap-5 group hover:bg-white hover:shadow-xl hover:border-[#a40049]/20 transition-all duration-300 transform-gpu will-change-[transform,opacity]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049]/10 transition-colors transform-gpu">
                <PhoneCall className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Direct Lines</h4>
                <p className="text-sm text-gray-600 font-medium hover:text-[#a40049] transition-colors cursor-pointer">+94 112 248 181 (Hotline)</p>
              </div>
            </motion.div>

            {/* Email Card (Updated with PDF Refund Info) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
              /* PERFORMANCE FIX: GPU Acceleration */
              className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex gap-5 group hover:bg-white hover:shadow-xl hover:border-[#a40049]/20 transition-all duration-300 transform-gpu will-change-[transform,opacity]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0 group-hover:bg-[#a40049]/10 transition-colors transform-gpu">
                <Mail className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Email Us</h4>
                <p className="text-sm text-gray-600 font-medium mb-1">General & Refunds:</p>
                <p className="text-sm text-[#a40049] font-bold">info@skdevents.lk</p>
                <p className="text-sm text-[#a40049] font-bold">thilina@skdevents.lk</p>
              </div>
            </motion.div>

            {/* PDF Extracted Guideline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
              /* PERFORMANCE FIX: GPU Acceleration */
              className="p-6 rounded-3xl bg-gradient-to-br from-[#a40049]/5 to-transparent border border-[#a40049]/20 flex gap-5 relative overflow-hidden transform-gpu will-change-[transform,opacity]"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#a40049]" />
              <div className="w-10 h-10 rounded-full bg-[#a40049]/10 flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 text-[#a40049]" />
              </div>
              <div>
                <h4 className="font-bold text-[#a40049] mb-1">Important Guideline</h4>
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
                  Quotations must be confirmed at least <strong className="text-gray-900">15 days</strong> prior to the event date to ensure flawless execution.
                </p>
              </div>
            </motion.div>

          </div>

          {/* =========================================
              RIGHT COLUMN: PREMIUM CONTACT FORM
              ========================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            /* PERFORMANCE FIX: Added GPU Acceleration to the heavy shadow container */
            className="lg:col-span-3 bg-white border border-gray-200 shadow-2xl shadow-gray-200/50 rounded-[2.5rem] p-6 sm:p-8 md:p-12 relative overflow-hidden transform-gpu will-change-[transform,opacity]"
          >
            {/* Form Top Decor */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#a40049] to-[#ff4d94]" />

            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">Send Us A Message</h3>

            {/* Form fields based on PDF requirements */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Your Name *</label>
                  <input type="text" required placeholder="e.g. Kasun Perera" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all" />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Email Address *</label>
                  <input type="email" required placeholder="name@company.com" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Custom Modern Dropdown for Topic */}
                <div className="space-y-2 relative" ref={dropdownRef}>
                  <label className="text-sm font-bold text-gray-700 ml-1">Topic | Event Type *</label>
                  
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-5 py-4 bg-gray-50 border ${isDropdownOpen ? 'border-[#a40049] ring-2 ring-[#a40049]/30' : 'border-gray-200'} rounded-2xl text-gray-900 cursor-pointer flex justify-between items-center transition-all`}
                  >
                    <span className={selectedTopic ? "text-gray-900" : "text-gray-400"}>
                      {selectedTopic || "Select an event type"}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 transform-gpu ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Dropdown Options List */}
                  {isDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      /* PERFORMANCE FIX: Added GPU Acceleration to the dropdown */
                      className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden transform-gpu will-change-[transform,opacity]"
                    >
                      {topics.map((topic) => (
                        <div 
                          key={topic}
                          onClick={() => { setSelectedTopic(topic); setIsDropdownOpen(false); }}
                          className="px-5 py-3 hover:bg-[#a40049]/5 hover:text-[#a40049] cursor-pointer text-gray-700 font-medium transition-colors"
                        >
                          {topic}
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {/* Hidden native input for validation purposes */}
                  <input type="hidden" required value={selectedTopic} />
                </div>

                {/* Min Students/Guests */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">Min. Student | Guest Count</label>
                  <input type="number" min="1" placeholder="e.g. 500" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all" />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Event Description & Requirements *</label>
                <textarea rows={5} required placeholder="Tell us more about your event date, location, and specific needs..." className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#a40049]/30 focus:border-[#a40049] transition-all resize-none"></textarea>
              </div>

              {/* Privacy Policy Checkbox (Controls Button state) */}
              <div className="flex items-start gap-3 mt-4">
                <div className="flex items-center h-5 mt-1">
                  <input 
                    id="privacy" 
                    type="checkbox" 
                    required 
                    checked={isPrivacyAccepted}
                    onChange={(e) => setIsPrivacyAccepted(e.target.checked)}
                    className="w-5 h-5 border-gray-300 rounded text-[#a40049] focus:ring-[#a40049] cursor-pointer accent-[#a40049]" 
                  />
                </div>
                <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed cursor-pointer font-medium">
                  I have read and agree to the {" "}
                  <Link href="/privacy-policy" className="text-[#a40049] font-bold hover:underline transition-all">
                    Privacy Policy
                  </Link>
                  {" "}regarding the collection and use of my data.
                </label>
              </div>

              {/* Submit Button (Dynamic State based on Checkbox) */}
              <button 
                type="submit" 
                disabled={!isPrivacyAccepted}
                className={`w-full group relative px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-500 transform-gpu
                  ${isPrivacyAccepted 
                    ? "bg-gray-900 text-white shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-[#a40049] hover:to-[#4d002c] cursor-pointer" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                Send Inquiry
                <Send className={`w-5 h-5 transition-transform duration-300 transform-gpu ${isPrivacyAccepted ? "group-hover:translate-x-1 group-hover:-translate-y-1" : ""}`} />
              </button>

            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
}