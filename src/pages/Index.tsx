import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoCarouselSection from "@/components/landing/LogoCarouselSection";
import ProblemsSection from "@/components/landing/ProblemsSection";
import CustomerJourneySection from "@/components/landing/CustomerJourneySection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import DifferentialsSection from "@/components/landing/DifferentialsSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <LogoCarouselSection />
      <ProblemsSection />
      <CustomerJourneySection />
      <SolutionSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DifferentialsSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
