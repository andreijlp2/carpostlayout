import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoCarouselSection from "@/components/landing/LogoCarouselSection";
import ProblemsSection from "@/components/landing/ProblemsSection";
import SolutionSection from "@/components/landing/SolutionSection";
import VideoSection from "@/components/landing/VideoSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CounterStatsSection from "@/components/landing/CounterStatsSection";
import DifferentialsSection from "@/components/landing/DifferentialsSection";
import CustomerJourneySection from "@/components/landing/CustomerJourneySection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoCarouselSection />
      <ProblemsSection />
      <SolutionSection />
      <VideoSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CounterStatsSection />
      <DifferentialsSection />
      <CustomerJourneySection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
