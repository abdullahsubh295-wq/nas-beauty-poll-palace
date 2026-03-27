import { useState } from "react";
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
import BookingDialog from "@/components/BookingDialog";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookNow={() => setBookingOpen(true)} />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <SkinQuizSection />
        <ServicesSection onBookNow={() => setBookingOpen(true)} />
        <ProductsSection />
        <NewServiceSection onBookNow={() => setBookingOpen(true)} />
        <FeaturedProductSection />
        <TrustBadges />
        <BlogSection />
        <LocationsSection />
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
    </div>
  );
};

export default Index;
