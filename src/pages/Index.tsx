import { lazy, Suspense } from "react";
import Meta from "@/components/Meta";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import LogoCarouselSection from "@/components/landing/LogoCarouselSection";
import ServicesSection from "@/components/landing/ServicesSection";
import AboutSection from "@/components/landing/AboutSection";
import WhyChooseSection from "@/components/landing/WhyChooseSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import Footer from "@/components/landing/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const TestimonialsSection = lazy(() => import("@/components/landing/TestimonialsSection"));
const VideoSection = lazy(() => import("@/components/landing/VideoSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));

const SectionSkeleton = () => (
  <div className="py-16 container mx-auto px-4">
    <Skeleton className="h-8 w-64 mx-auto mb-8" />
    <Skeleton className="h-64 w-full rounded-xl" />
  </div>
);

const Index = () => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <LogoCarouselSection />
        <ServicesSection />
        <AboutSection />
        <WhyChooseSection />
        <HowItWorksSection />
        <Suspense fallback={<SectionSkeleton />}>
          <VideoSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </Suspense>
        <Footer />
      </div>
    </>
  );
};

export default Index;
