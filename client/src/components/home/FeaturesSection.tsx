import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Heart, Users, Award, Star, Shield } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Pendidikan Islami",
    description:
      "Pembelajaran Al-Quran, hadits, dan nilai-nilai Islam yang ditanamkan sejak dini untuk membentuk akhlakul karimah.",
  },
  {
    icon: Award,
    title: "Kurikulum Terpadu",
    description:
      "Memadukan kurikulum nasional dengan pendidikan agama Islam untuk perkembangan kognitif dan spiritual yang seimbang.",
  },
  {
    icon: Users,
    title: "Guru Profesional",
    description:
      "Tenaga pendidik yang berpengalaman, penuh kasih sayang, dan berkomitmen dalam mendidik generasi penerus bangsa.",
  },
  {
    icon: Heart,
    title: "Lingkungan Nyaman",
    description:
      "Suasana belajar yang aman, nyaman, dan kondusif untuk tumbuh kembang optimal anak usia dini.",
  },
  {
    icon: Star,
    title: "Fasilitas Lengkap",
    description:
      "Ruang kelas nyaman, area bermain, mushola, dan berbagai fasilitas pendukung pembelajaran modern.",
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description:
      "Pengawasan ketat dan protokol keamanan untuk menjaga keselamatan seluruh peserta didik.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Mengapa Memilih RA Al-Islam?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kami berkomitmen memberikan pendidikan terbaik dengan memadukan nilai-nilai
            Islam dan standar pendidikan modern untuk putra-putri Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover-elevate transition-all duration-300"
              data-testid={`card-feature-${index}`}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
