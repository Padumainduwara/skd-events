import AboutHero from "@/components/about/AboutHero";
import AboutDetails from "@/components/about/AboutDetails";
import AboutMission from "@/components/about/AboutMission";
import Cta from "@/components/about/Cta";// Home page eke use karapu CTA eka
import SocialMedia from "@/components/about/SocialMedia";

export const metadata = {
  title: "About Us | SKD Event Management",
  description: "Where creativity meets precision to deliver exceptional events.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      <AboutHero />
      <AboutDetails />
      <AboutMission />
      <Cta />
      <SocialMedia />
    </main>
  );
}