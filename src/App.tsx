import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { NativeNavigation } from "./components/NativeNavigation";
import PracticePage from "./pages/PracticePage";
import Index from "./pages/Index";
import IntroHub from "./pages/IntroHub";
import PrepPage from "./pages/PrepPage";
import PlayingPage from "./pages/PlayingPage";
import TrackFlowsPage from "./pages/TrackFlowsPage";
import EffectsLoopsPage from "./pages/EffectsLoopsPage";
import RemixesPage from "./pages/RemixesPage";
import DevicesPage from "./pages/DevicesPage";
import GenreChecklist from "./pages/GenreChecklist";
import NotFound from "./pages/NotFound";

const App = () => (
  <AppErrorBoundary>
    <MotionConfig reducedMotion="user">
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NativeNavigation />
        <Routes>
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/" element={<Index />} />
          <Route path="/intro" element={<IntroHub />} />
          <Route path="/intro/prep" element={<PrepPage />} />
          <Route path="/intro/playing" element={<PlayingPage />} />
          <Route path="/intro/flows" element={<TrackFlowsPage />} />
          <Route path="/intro/effects" element={<EffectsLoopsPage />} />
          <Route path="/intro/remixes" element={<RemixesPage />} />
          <Route path="/intro/devices" element={<DevicesPage />} />
          <Route path="/genre/:genreId" element={<GenreChecklist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </MotionConfig>
  </AppErrorBoundary>
);

export default App;
