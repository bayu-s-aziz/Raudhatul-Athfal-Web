import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import Profil from "@/pages/Profil";
import Program from "@/pages/Program";
import Galeri from "@/pages/Galeri";
import Kontak from "@/pages/Kontak";
import NotFound from "@/pages/not-found";

// Scroll to top ketika route berubah
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profil" component={Profil} />
      <Route path="/program" component={Program} />
      <Route path="/galeri" component={Galeri} />
      <Route path="/kontak" component={Kontak} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
