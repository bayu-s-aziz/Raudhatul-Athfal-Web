import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import schoolImage from "@assets/generated_images/islamic_kindergarten_school_building.png";
import classroomImage from "@assets/generated_images/islamic_kindergarten_classroom.png";
import prayerImage from "@assets/generated_images/islamic_school_prayer_room.png";
import playgroundImage from "@assets/generated_images/kindergarten_playground_outdoor.png";
import materialsImage from "@assets/generated_images/educational_materials_display.png";
import patternImage from "@assets/generated_images/islamic_geometric_pattern.png";

const categories = ["Semua", "Fasilitas", "Kegiatan", "Pembelajaran"];

const galleryItems = [
  { id: 1, image: schoolImage, title: "Gedung Sekolah", category: "Fasilitas" },
  { id: 2, image: classroomImage, title: "Ruang Kelas", category: "Fasilitas" },
  { id: 3, image: prayerImage, title: "Mushola", category: "Fasilitas" },
  { id: 4, image: playgroundImage, title: "Area Bermain", category: "Fasilitas" },
  { id: 5, image: materialsImage, title: "Alat Peraga", category: "Pembelajaran" },
  { id: 6, image: classroomImage, title: "Kegiatan Belajar", category: "Kegiatan" },
  { id: 7, image: prayerImage, title: "Praktik Ibadah", category: "Kegiatan" },
  { id: 8, image: playgroundImage, title: "Bermain Bersama", category: "Kegiatan" },
  { id: 9, image: materialsImage, title: "Media Belajar", category: "Pembelajaran" },
  { id: 10, image: schoolImage, title: "Halaman Sekolah", category: "Fasilitas" },
  { id: 11, image: classroomImage, title: "Kegiatan Seni", category: "Pembelajaran" },
  { id: 12, image: prayerImage, title: "Pembelajaran Al-Quran", category: "Pembelajaran" },
];

export default function Galeri() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems =
    selectedCategory === "Semua"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

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
              Dokumentasi
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Galeri Foto
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Dokumentasi kegiatan dan fasilitas Raudhatul Athfal Al-Islam.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-category-${category.toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer hover-elevate"
                onClick={() => setSelectedImage(item)}
                data-testid={`gallery-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-white/70 text-xs">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/90 border-none">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
            data-testid="button-close-gallery"
          >
            <X className="h-5 w-5" />
          </Button>
          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-lg font-medium">{selectedImage.title}</p>
                <p className="text-white/70 text-sm">{selectedImage.category}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
