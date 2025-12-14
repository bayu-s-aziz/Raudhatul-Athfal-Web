import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import patternImage from "@assets/generated_images/islamic_geometric_pattern.png";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Kontak() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      toast({
        title: "Pesan Terkirim",
        description: "Terima kasih! Kami akan segera menghubungi Anda.",
      });
    },
    onError: () => {
      toast({
        title: "Gagal Mengirim",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              Hubungi Kami
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              Kontak
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Silakan hubungi kami untuk informasi lebih lanjut tentang pendaftaran,
              program, atau pertanyaan lainnya.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Informasi Kontak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Alamat</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Dusun Sirnagalih, Kecamatan Sindangkasih,
                        <br />
                        Kabupaten Ciamis, Jawa Barat 46268
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Telepon</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        +62 812-3456-7890
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Email</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        info@raalislam.sch.id
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">Jam Operasional</h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        Senin - Jumat: 07:00 - 11:00 WIB
                        <br />
                        Sabtu: Ekstrakurikuler
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Lokasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31647.62095854095!2d108.34!3d-7.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f5e1234567890%3A0x1234567890abcdef!2sSindangkasih%2C%20Ciamis%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi RA Al-Islam"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Kirim Pesan</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Pesan Terkirim!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Terima kasih telah menghubungi kami. Kami akan segera membalas pesan
                      Anda.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} data-testid="button-kirim-lagi">
                      Kirim Pesan Lagi
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Nama Lengkap <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Masukkan nama lengkap"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        data-testid="input-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="contoh@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        data-testid="input-email"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+62 812-xxxx-xxxx"
                        value={formData.phone}
                        onChange={handleChange}
                        data-testid="input-phone"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Pesan <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tulis pesan Anda di sini..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="resize-none"
                        data-testid="input-message"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-submit"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Kirim Pesan
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
