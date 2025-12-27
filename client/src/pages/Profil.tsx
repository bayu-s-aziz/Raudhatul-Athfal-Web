import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Eye, History, Users } from "lucide-react";
import logoImage from "@assets/logo_ra.png";
import classroomImage from "@assets/generated_images/islamic_kindergarten_classroom.png";
import patternImage from "@assets/generated_images/islamic_geometric_pattern.png";

const missions = [
  "Menampilkan nilai-nilai agama Islam dan akhlakul karimah",
  "Mengembangkan kecerdasan anak secara menyeluruh (holistik)",
  "Mendorong kreativitas dan kemandirian anak",
  "Mempersiapkan peserta didik untuk melanjutkan ke jenjang pendidikan dasar",
];

const tujuan = [
  "Menanamkan nilai-nilai keimanan, ketaqwaan dan akhlakul karimah",
  "Mengembangkan seluruh aspek perkembangan anak secara holistik",
  "Menumbuhkan rasa ingin tahu dan kreativitas anak",
  "Membentuk kemandirian, kepercayaan diri dan tanggung jawab",
];

const strukturOrganisasi = [
  { name: "Ade Aziz Hakim, S. Ag, M. M", role: "Ketua Yayasan" },
  { name: "Lilis Farida, S. Pd.I", role: "Kepala RA" },
  { name: "Ai Idah Romdiani, S. Ag", role: "Komite" },
  { name: "Elis Nurjanah", role: "Sekretaris" },
  { name: "Eulis Sukmayati", role: "Bendahara" },
  { name: "Amas Mastini S.Pd", role: "Guru Kelompok A" },
  { name: "Ecin Nurbayanti", role: "Guru Kelompok B" }
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
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="font-semibold">NSS / NPSN:</span></div>
                  <div>101232070043 / 69736386</div>
                  <div><span className="font-semibold">Status:</span></div>
                  <div>Swasta</div>
                  <div><span className="font-semibold">Akreditasi:</span></div>
                  <div>B</div>
                  <div><span className="font-semibold">Tahun Berdiri:</span></div>
                  <div>1988</div>
                  <div><span className="font-semibold">Jumlah Guru:</span></div>
                  <div>5 Orang</div>
                </div>
              </div>
              <p className="text-foreground leading-relaxed mb-4">
                Raudhatul Athfal Al-Islam adalah lembaga pendidikan anak usia dini yang
                secara resmi berdiri pada tahun 1988 di Dusun Sirnagalih, Desa Gunungcupu,
                Kecamatan Sindangkasih, Kabupaten Ciamis, Provinsi Jawa Barat.
              </p>
              <p className="text-foreground leading-relaxed">
                Dengan pengalaman lebih dari 36 tahun dalam mendidik generasi muda, kami
                berkomitmen untuk memberikan pendidikan berkualitas dengan landasan nilai-nilai
                Islam, membentuk generasi yang berakhlak mulia, cerdas, dan terampil.
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card data-testid="card-visi">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Visi</h2>
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  "Terwujudnya peserta didik yang berakhlak mulia, cerdas dan terampil,
                  serta siap melanjutkan ke jenjang pendidikan dasar."
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
                      <span className="text-foreground text-sm">{mission}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card data-testid="card-tujuan">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Tujuan</h2>
                </div>
                <ul className="space-y-3">
                  {tujuan.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-sm">{item}</span>
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
              Raudhatul Athfal (RA) Al-Islam secara resmi berdiri pada tahun 1988 di Dusun
              Sirnagalih, Desa Gunungcupu, Kecamatan Sindangkasih, Kabupaten Ciamis. Cikal
              bakal lembaga pendidikan ini berawal dari prakarsa mulia seorang tokoh masyarakat
              bernama Bapak Sulaeman. Beliau memiliki kepedulian yang mendalam terhadap
              pendidikan dasar keagamaan bagi anak-anak di lingkungan sekitarnya.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Dengan niat tulus untuk memberantas buta huruf Al-Qur'an, beliau menginisiasi
              sebuah kegiatan belajar mengajar sederhana yang berfokus pada membaca dan mengaji.
              Pada tahap awal, kegiatan pendidikan ini sepenuhnya dipercayakan kepada istri
              beliau, Ibu Encum Kulsum, yang dengan sabar dan tekun menjadi pengajar pertama.
            </p>
            <p className="text-foreground leading-relaxed mb-4">
              Seiring berjalannya waktu, inisiatif sederhana ini mendapat sambutan yang sangat
              positif dari masyarakat setempat. Semakin banyak orang tua yang mempercayakan
              pendidikan anaknya, sehingga mendorong beberapa penduduk lain yang memiliki latar
              belakang pendidikan yang lebih memadai untuk turut serta mengabdikan diri sebagai
              tenaga pengajar.
            </p>
            <p className="text-foreground leading-relaxed">
              Kini, tongkat estafet perjuangan dan pengelolaan RA Al-Islam dilanjutkan oleh
              generasi penerus, termasuk putra-putri dari pendiri. Cita-cita luhur Bapak Sulaeman
              untuk membentuk generasi yang agamis kini tercermin jelas dalam visi sekolah.
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
              Struktur Organisasi
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strukturOrganisasi.map((person, index) => (
              <Card key={index} data-testid={`card-struktur-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{person.name}</h3>
                  <p className="text-primary text-sm font-medium mt-2">{person.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
