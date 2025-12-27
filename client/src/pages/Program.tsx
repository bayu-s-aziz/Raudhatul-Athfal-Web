import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Music,
  Palette,
  Users,
  Heart,
  Star,
  Clock,
  Calendar,
} from "lucide-react";
import classroomImage from "@assets/generated_images/islamic_kindergarten_classroom.png";
import prayerImage from "@assets/generated_images/islamic_school_prayer_room.png";
import playgroundImage from "@assets/generated_images/kindergarten_playground_outdoor.png";
import materialsImage from "@assets/generated_images/educational_materials_display.png";
import patternImage from "@assets/generated_images/islamic_geometric_pattern.png";

const programs = [
  {
    icon: BookOpen,
    title: "Pembelajaran Al-Quran",
    description:
      "Program pembelajaran membaca dan menghafal Al-Quran menggunakan metode Iqro yang menyenangkan. Anak-anak akan belajar huruf hijaiyah, tajwid dasar, dan hafalan surat-surat pendek.",
    schedule: "Setiap hari",
    duration: "30 menit",
    image: prayerImage,
  },
  {
    icon: Star,
    title: "Pendidikan Akhlak",
    description:
      "Menanamkan nilai-nilai akhlak mulia melalui cerita Nabi, hadits, dan praktik sehari-hari. Anak-anak diajarkan untuk berakhlak baik, jujur, dan saling menyayangi.",
    schedule: "Setiap hari",
    duration: "20 menit",
    image: classroomImage,
  },
  {
    icon: Palette,
    title: "Seni & Kreativitas",
    description:
      "Mengembangkan kreativitas anak melalui berbagai kegiatan seni seperti menggambar, mewarnai, membuat prakarya, dan bermain dengan berbagai media kreatif.",
    schedule: "3x seminggu",
    duration: "45 menit",
    image: materialsImage,
  },
  {
    icon: Users,
    title: "Motorik & Bermain",
    description:
      "Pengembangan motorik kasar dan halus melalui aktivitas bermain di luar ruangan, senam, dan berbagai permainan edukatif yang menyenangkan.",
    schedule: "Setiap hari",
    duration: "30 menit",
    image: playgroundImage,
  },
  {
    icon: Music,
    title: "Seni Suara & Nasyid",
    description:
      "Pembelajaran menyanyi lagu-lagu anak Islami dan nasyid untuk mengembangkan kecerdasan musikal serta mengenalkan nilai-nilai Islam melalui lagu.",
    schedule: "2x seminggu",
    duration: "30 menit",
    image: classroomImage,
  },
  {
    icon: Heart,
    title: "Praktik Ibadah",
    description:
      "Pengenalan dan praktik ibadah sederhana seperti doa sehari-hari, gerakan sholat, dan adab-adab Islami dalam kehidupan sehari-hari.",
    schedule: "Setiap hari",
    duration: "15 menit",
    image: prayerImage,
  },
];

const dailySchedule = [
  { time: "06:30 - 07:00", activity: "Penyambutan & Bermain Bebas" },
  { time: "07:00 - 07:30", activity: "Baris, Doa, & Muraja'ah" },
  { time: "07:30 - 08:00", activity: "Pembelajaran Al-Quran" },
  { time: "08:00 - 08:45", activity: "Kegiatan Inti" },
  { time: "08:45 - 09:15", activity: "Istirahat & Makan Snack" },
  { time: "09:15 - 09:45", activity: "Kegiatan Motorik/Seni" },
  { time: "09:45 - 10:15", activity: "Recalling & Evaluasi" },
  { time: "10:15 - 10:30", activity: "Doa Pulang & Persiapan" },
];

export default function Program() {
  return (
    <Layout>
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "300px" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Kurikulum
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Program Pendidikan
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Program pembelajaran yang dirancang untuk mengembangkan potensi anak secara
              optimal dengan pendekatan Islami yang menyenangkan.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {programs.map((program, index) => (
              <Card
                key={index}
                className="overflow-hidden"
                data-testid={`card-program-detail-${index}`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`aspect-video lg:aspect-auto ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent
                    className={`p-6 md:p-8 flex flex-col justify-center ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <program.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-foreground leading-relaxed mb-4">
                      {program.description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{program.schedule}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>{program.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Jadwal Harian
            </h2>
            <p className="text-muted-foreground mt-2">
              Kegiatan pembelajaran dari Senin hingga Jumat
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {dailySchedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 md:p-5"
                    data-testid={`schedule-${index}`}
                  >
                    <div className="w-24 md:w-32 flex-shrink-0">
                      <span className="text-sm font-medium text-primary">
                        {item.time}
                      </span>
                    </div>
                    <div className="flex-1">
                      <span className="text-foreground">{item.activity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
