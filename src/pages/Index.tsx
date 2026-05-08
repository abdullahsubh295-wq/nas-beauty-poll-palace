import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkinQuizSection from "@/components/SkinQuizSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import NewServiceSection from "@/components/NewServiceSection";
import FeaturedProductSection from "@/components/FeaturedProductSection";
import TrustBadges from "@/components/TrustBadges";
import LocationsSection from "@/components/LocationsSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import BookingDialog from "@/components/BookingDialog";
import ReviewsPanel from "@/components/ReviewsPanel";


const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get("booking") === "true") {
      setBookingOpen(true);
      searchParams.delete("booking");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

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
        <LocationsSection />
        <MapSection />
      </main>
      <Footer />
      <BookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
      <ReviewsPanel />
      
    </div>
  );
};

export default Index;
