import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import classroomImage from "@assets/generated_images/islamic_kindergarten_classroom.png";
import prayerImage from "@assets/generated_images/islamic_school_prayer_room.png";
import playgroundImage from "@assets/generated_images/kindergarten_playground_outdoor.png";

const programs = [
  {
    title: "Pembelajaran Al-Quran",
    description:
      "Program pembelajaran membaca Al-Quran dengan metode Iqro dan tilawah yang menyenangkan untuk anak usia dini.",
    image: prayerImage,
  },
  {
    title: "Kegiatan Belajar Mengajar",
    description:
      "Aktivitas pembelajaran yang interaktif dengan kurikulum terpadu antara pendidikan umum dan pendidikan agama Islam.",
    image: classroomImage,
  },
  {
    title: "Kegiatan Bermain & Motorik",
    description:
      "Pengembangan motorik kasar dan halus melalui berbagai permainan edukatif di area bermain yang aman.",
    image: playgroundImage,
  },
];

export function ProgramsPreview() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Program Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Program Pendidikan
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl">
              Berbagai program pembelajaran yang dirancang khusus untuk mengembangkan
              potensi anak secara optimal.
            </p>
          </div>
          <Link href="/program">
            <Button variant="outline" className="gap-2" data-testid="button-lihat-program">
              Lihat Semua Program
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover-elevate"
              data-testid={`card-program-${index}`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {program.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {program.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
