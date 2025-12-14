import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Eye, History, Users } from "lucide-react";
import logoImage from "@assets/logo_ra.png";
import classroomImage from "@assets/generated_images/islamic_kindergarten_classroom.png";
import patternImage from "@assets/generated_images/islamic_geometric_pattern.png";

const missions = [
  "Menanamkan nilai-nilai aqidah dan akhlakul karimah sejak usia dini",
  "Mengembangkan potensi kognitif, afektif, dan psikomotorik anak",
  "Menciptakan lingkungan belajar yang Islami, nyaman, dan menyenangkan",
  "Mempersiapkan anak untuk melanjutkan ke jenjang pendidikan berikutnya",
  "Membangun kerjasama yang baik antara sekolah, orang tua, dan masyarakat",
  "Mengembangkan kreativitas dan kemandirian anak",
];

const teachers = [
  { name: "Ustadzah Fatimah, S.Pd.I", role: "Kepala Sekolah", experience: "15 tahun" },
  { name: "Ustadzah Aisyah, S.Pd", role: "Guru Kelas A", experience: "10 tahun" },
  { name: "Ustadzah Khadijah, S.Pd", role: "Guru Kelas B", experience: "8 tahun" },
  { name: "Ustadz Ahmad, S.Pd.I", role: "Guru Al-Quran", experience: "12 tahun" },
];

export default function Profil() {
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
              Tentang Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Profil Sekolah
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Mengenal lebih dekat Raudhatul Athfal Al-Islam sebagai lembaga pendidikan
              anak usia dini berbasis nilai-nilai Islami.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={logoImage}
                  alt="Logo RA Al-Islam"
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Raudhatul Athfal Al-Islam
                  </h2>
                  <p className="text-muted-foreground">
                    Gunungcupu Sindangkasih Ciamis
                  </p>
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-4">
                Raudhatul Athfal Al-Islam adalah lembaga pendidikan anak usia dini yang
                berdiri di Dusun Sirnagalih, Kecamatan Sindangkasih, Kabupaten Ciamis,
                Jawa Barat. Sejak didirikan, kami berkomitmen untuk memberikan pendidikan
                yang berkualitas dengan landasan nilai-nilai Islam.
              </p>
              <p className="text-foreground leading-relaxed">
                Dengan pengalaman lebih dari 15 tahun dalam mendidik generasi muda, kami
                telah meluluskan ratusan alumni yang siap melanjutkan pendidikan ke
                jenjang berikutnya dengan bekal iman, ilmu, dan akhlak yang mulia.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={classroomImage}
                alt="Kelas RA Al-Islam"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card data-testid="card-visi">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Visi</h2>
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  "Menjadi lembaga pendidikan anak usia dini yang unggul dalam membentuk
                  generasi Islami yang cerdas, kreatif, berakhlak mulia, dan siap
                  menghadapi tantangan masa depan dengan pondasi iman yang kokoh."
                </p>
              </CardContent>
            </Card>

            <Card data-testid="card-misi">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Misi</h2>
                </div>
                <ul className="space-y-3">
                  {missions.map((mission, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{mission}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <History className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Sejarah Singkat
            </h2>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 md:p-8">
            <p className="text-foreground leading-relaxed mb-4">
              Raudhatul Athfal Al-Islam didirikan pada tahun 2008 oleh tokoh masyarakat
              dan ulama setempat yang memiliki visi untuk menyediakan pendidikan anak
              usia dini berbasis Islam di kawasan Gunungcupu, Sindangkasih.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Bermula dari sebuah ruang kecil dengan hanya 15 murid, kini RA Al-Islam
              telah berkembang menjadi lembaga pendidikan yang dipercaya oleh masyarakat
              sekitar. Dengan fasilitas yang terus ditingkatkan dan tenaga pendidik yang
              berkompeten, kami terus berkomitmen memberikan pendidikan terbaik.
            </p>
            <p className="text-foreground leading-relaxed">
              Hingga saat ini, lebih dari 500 alumni telah kami luluskan dan berhasil
              melanjutkan pendidikan ke jenjang berikutnya dengan prestasi yang
              membanggakan.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Tenaga Pendidik
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((teacher, index) => (
              <Card key={index} data-testid={`card-teacher-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{teacher.name}</h3>
                  <p className="text-primary text-sm font-medium mt-1">{teacher.role}</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Pengalaman: {teacher.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
