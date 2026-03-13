import ContactHero from "@/components/contact/ContactHero";
import ContactFormInfo from "@/components/contact/ContactFormInfo";
import ContactMap from "@/components/contact/ContactMap";
import SocialMedia from "@/components/about/SocialMedia";

export const metadata = {
  title: "Contact Us | SKD Event Management",
  description: "Get in touch with SKD Event Management for your next big event.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <ContactHero />
      <ContactFormInfo />
      <ContactMap />
      <SocialMedia />
    </main>
  );
}