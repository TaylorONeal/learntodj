import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
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
  </QueryClientProvider>
);

export default App;
