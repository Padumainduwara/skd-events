"use client";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Quote() {
  return (
    <main className="min-h-screen bg-white pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Request a <span className="text-transparent bg-clip-text bg-skd-gradient">Quotation</span></h1>
          <p className="text-gray-600 text-lg mb-8">
            <b>Note:</b> Quotations should be confirmed 15 days prior to the event.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="text-skdPrimary w-6 h-6 mt-1" />
              <div><h3 className="font-bold text-gray-900">Company Location</h3><p className="text-gray-600">No. L2-29, Reality Plaza, Colombo Road, Ja-Ela</p></div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-skdPrimary w-6 h-6 mt-1" />
              <div><h3 className="font-bold text-gray-900">Hotline</h3><p className="text-gray-600">+94 112 248 181</p></div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-skdPrimary w-6 h-6 mt-1" />
              <div><h3 className="font-bold text-gray-900">Email</h3><p className="text-gray-600">info@skdevents.lk</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm">
          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label><input type="text" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-skdPrimary" /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-2">Contact Person Name</label><input type="text" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-skdPrimary" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label><input type="email" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-skdPrimary" /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label><input type="tel" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-skdPrimary" /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-sm font-bold text-gray-700 mb-2">Event Name & Location</label><input type="text" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-skdPrimary" /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-2">Guest / Student Count</label><input type="number" className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-skdPrimary" /></div>
            </div>
            <button type="button" className="w-full py-4 mt-6 bg-skd-gradient rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}