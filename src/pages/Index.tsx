import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoCarouselSection from "@/components/landing/LogoCarouselSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AboutSection from "@/components/landing/AboutSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import VideoSection from "@/components/landing/VideoSection";
import CTASection from "@/components/landing/CTASection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <LogoCarouselSection />
      <ServicesSection />
      <AboutSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <VideoSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
