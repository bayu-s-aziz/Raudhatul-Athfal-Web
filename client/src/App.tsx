import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "@/pages/Home";
import Profil from "@/pages/Profil";
import Program from "@/pages/Program";
import Galeri from "@/pages/Galeri";
import Kontak from "@/pages/Kontak";
import NotFound from "@/pages/not-found";

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
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
