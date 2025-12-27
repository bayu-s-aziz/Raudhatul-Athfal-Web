import { Link } from "wouter";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import logoImage from "@assets/logo_ra.png";

const quickLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil Sekolah" },
  { href: "/program", label: "Program Pendidikan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Hubungi Kami" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImage}
                alt="Logo RA Al-Islam"
                className="h-14 w-14 object-contain bg-white rounded-full p-1"
              />
              <div>
                <h3 className="font-semibold text-lg">Raudhatul Athfal</h3>
                <p className="text-primary-foreground/80 text-sm">Al-Islam</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Membentuk generasi Islami yang cerdas, berakhlak mulia, dan siap menghadapi
              masa depan dengan pondasi iman yang kuat.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Tautan Cepat</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80 text-sm">
                  Dusun Sirnagalih, Kec. Sindangkasih,
                  <br />
                  Kab. Ciamis, Jawa Barat 46268
                </span>
              </li>
                            <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-primary-foreground/80 text-sm">
                  info@ra-alislam.sch.id
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Jam Operasional</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                <div className="text-sm">
                  <p className="text-primary-foreground font-medium">Senin - Jumat</p>
                  <p className="text-primary-foreground/80">06:30 - 10:30 WIB</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent" />
                <div className="text-sm">
                  <p className="text-primary-foreground font-medium">Sabtu</p>
                  <p className="text-primary-foreground/80">Ekstrakurikuler</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Raudhatul Athfal Al-Islam. Hak Cipta
              Dilindungi.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Gunungcupu Sindangkasih Ciamis
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
