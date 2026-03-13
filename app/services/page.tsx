"use client";

const elements = [
  { id: 1, title: "Stage Setup", desc: "A professionally designed stage with podium, backdrop, lighting, and seating for dignitaries to ensure a formal and elegant ceremony." },
  { id: 2, title: "Graduation Backdrop", desc: "A branded backdrop featuring the institution's name, logo, and convocation theme for official photographs and stage presence." },
  { id: 3, title: "Sound System", desc: "Clear audio equipment including microphones, speakers, and mixers to ensure speeches, announcements, and music are heard properly." },
  { id: 4, title: "Lighting Setup", desc: "Focused stage lighting, ambient lights, and spotlights to enhance visibility and create a professional atmosphere." },
  { id: 5, title: "Seating Arrangement", desc: "Comfortable and organized seating for graduates, faculty, VIPs, and guests with proper numbering or designated sections." },
  { id: 6, title: "Registration Desk", desc: "A front desk for guest check-in, gown distribution, and verification of graduate details." },
  { id: 7, title: "Convocation Procession", desc: "Coordinated entry of graduates, academic staff, and dignitaries, led by ceremonial music or a traditional procession." },
  { id: 8, title: "Academic Gowns & Hoods", desc: "Graduation gowns, hoods, and caps provided to students and staff according to the academic level and institutional colors." },
  { id: 9, title: "Certificates & Folders", desc: "Official certificates, secure folders, and name lists prepared for accurate distribution during the ceremony." },
  { id: 10, title: "Photography & Videography", desc: "Professional photo and video coverage to capture stage moments, group photos, and highlights of the entire event." },
  { id: 11, title: "Guest Management", desc: "Welcoming, seating guidance, ushering, and crowd flow management to maintain order throughout the program." },
  { id: 12, title: "Decor & Theming", desc: "Elegant décor, floral arrangements, banners, and thematic elements that reflect the institution's identity." },
  { id: 13, title: "Multimedia & Screens", desc: "LED screens or projectors to display names, live video feed, presentations, or ceremonial content." },
  { id: 14, title: "Refreshments Area", desc: "A designated space for guests and graduates to enjoy light snacks or beverages after the ceremony." },
  { id: 15, title: "Safety & Protocol", desc: "Security personnel, first-aid support, emergency exits, and adherence to formal protocol for dignitaries." }
];

export default function Services() {
  return (
    <main className="min-h-screen bg-white pt-20 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-skdPrimary font-bold uppercase tracking-widest text-sm">Main Service</span>
          <h1 className="text-5xl font-extrabold text-gray-900 mt-2 mb-4">Convocation Events</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Orchestrating Distinguished Academic Celebrations with Precision and Prestige</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {elements.map((el) => (
            <div key={el.id} className="p-6 bg-gray-50 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-skdPrimary mb-2">{el.id}. {el.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{el.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#4d002c]/5 to-[#a40049]/10 border border-skdPrimary/20 rounded-3xl p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Premium Photobooth Arrangements</h2>
          <p className="text-gray-700 mb-8">Professional photography team with decades of professional service in convocations will fully manage the service.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900">Standard Photobooth</h4>
              <p className="text-sm text-gray-600">Fully set-up photo station with backdrop, props, and instant printing.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900">360 Video Booth</h4>
              <p className="text-sm text-gray-600">Rotating camera platform capturing slow-motion videos.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900">DSLR & Mirror Photobooths</h4>
              <p className="text-sm text-gray-600">Professional cameras & touch-screen mirrors with instant outputs.</p>
            </div>
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-gray-900">Instant Printing & Digital Sharing</h4>
              <p className="text-sm text-gray-600">Fast photo prints and instant QR code/email sharing.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}