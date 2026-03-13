import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import SocialMedia from "@/components/about/SocialMedia";

export const metadata = {
  title: "Portfolio Gallery | SKD Event Management",
  description: "Explore our portfolio of premium convocations, corporate events, and stage setups.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-white">
      <GalleryHero />
      <GalleryGrid />
        <SocialMedia />
    </main>
  );
}