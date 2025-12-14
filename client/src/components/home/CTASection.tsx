import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Phone, ChevronRight } from "lucide-react";
import patternImage from "@assets/generated_images/islamic_geometric_pattern.png";

export function CTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-primary" />
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "300px" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Daftarkan Putra-Putri Anda Sekarang
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
          Berikan pendidikan terbaik untuk buah hati Anda dengan kurikulum Islami yang
          terintegrasi. Pendaftaran tahun ajaran baru telah dibuka!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/kontak">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground border-accent-border min-w-[200px]"
              data-testid="button-cta-daftar"
            >
              Formulir Pendaftaran
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <a href="tel:+6281234567890">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] bg-white/10 text-primary-foreground border-primary-foreground/30 hover:bg-white/20"
              data-testid="button-cta-telepon"
            >
              <Phone className="mr-2 h-4 w-4" />
              Hubungi Kami
            </Button>
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Biaya Terjangkau", desc: "Investasi terbaik untuk masa depan anak" },
            { label: "Proses Mudah", desc: "Pendaftaran cepat dan praktis" },
            { label: "Kuota Terbatas", desc: "Segera daftarkan sebelum penuh" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
            >
              <p className="text-primary-foreground font-semibold">{item.label}</p>
              <p className="text-primary-foreground/70 text-sm mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
