import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkinQuizSection from "@/components/SkinQuizSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import NewServiceSection from "@/components/NewServiceSection";
import FeaturedProductSection from "@/components/FeaturedProductSection";
import BlogSection from "@/components/BlogSection";
import TrustBadges from "@/components/TrustBadges";
import LocationsSection from "@/components/LocationsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <SkinQuizSection />
        <ServicesSection />
        <ProductsSection />
        <NewServiceSection />
        <FeaturedProductSection />
        <TrustBadges />
        <BlogSection />
        <LocationsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
