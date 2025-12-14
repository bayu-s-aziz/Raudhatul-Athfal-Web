import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, MapPin } from "lucide-react";
import heroImage from "@assets/generated_images/islamic_kindergarten_school_building.png";
import patternImage from "@assets/generated_images/islamic_geometric_pattern.png";
import logoImage from "@assets/logo_ra.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "400px" }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <img
              src={logoImage}
              alt="Logo RA Al-Islam"
              className="h-20 w-20 md:h-28 md:w-28 object-contain"
              data-testid="img-hero-logo"
            />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Raudhatul Athfal
          <span className="block text-accent mt-2">Al-Islam</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4 font-medium">
          Membentuk Generasi Islami yang Cerdas dan Berakhlak Mulia
        </p>

        <div className="flex items-center justify-center gap-2 text-white/80 mb-8">
          <MapPin className="h-4 w-4" />
          <p className="text-sm sm:text-base">
            Gunungcupu Sindangkasih Ciamis, Jawa Barat
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/kontak">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground border-accent-border min-w-[180px]"
              data-testid="button-hero-daftar"
            >
              Daftar Sekarang
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/profil">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[180px] bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20"
              data-testid="button-hero-tentang"
            >
              Tentang Kami
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { value: "15+", label: "Tahun Pengalaman" },
            { value: "500+", label: "Alumni" },
            { value: "10+", label: "Guru Profesional" },
            { value: "100%", label: "Kurikulum Islami" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
              data-testid={`stat-${index}`}
            >
              <p className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
              <p className="text-white/80 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
