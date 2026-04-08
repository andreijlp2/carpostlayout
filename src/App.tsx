import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorBoundary from "@/components/ErrorBoundary";
import SEO from "@/components/SEO";
import Analytics from "@/components/Analytics";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const TestimonialSubmit = lazy(() => import("./pages/TestimonialSubmit"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Skeleton className="h-8 w-8 animate-pulse rounded-full" />
  </div>
);

const App = () => (
  <SEO>
    <ErrorBoundary>
      <Analytics />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/depoimento/:token" element={<TestimonialSubmit />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ErrorBoundary>
  </SEO>
);

export default App;
