import HeroSection from "@/components/hero/HeroSection";
import TeamsSection from "@/components/teams/TeamsSection";
import UpcomingFixtures from "@/components/fixtures/UpcomingFixtures";
import LatestResults from "@/components/results/LatestResults";
import SponsorsSection from "@/components/sponsors/SponsorsSection";
import GallerySection from "@/components/gallery/GallerySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TeamsSection />
      <LatestResults />
      <UpcomingFixtures />
      
      <GallerySection />
      <SponsorsSection />
      {/* More sections later */}
    </>
  );
}
