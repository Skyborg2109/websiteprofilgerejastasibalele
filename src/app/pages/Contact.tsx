import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, MessageCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { useSiteContent } from "../context/SiteContentContext";
import Swal from "sweetalert2";

export function Contact() {
  const { content } = useSiteContent();
  const { contact } = content;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Format nomor WA: hapus karakter non-digit, ganti 0 di awal dengan 62
  const formatWANumber = (phone: string) => {
    const digits = phone.replace(/[^0-9]/g, "");
    if (digits.startsWith("0")) return "62" + digits.slice(1);
    if (digits.startsWith("62")) return digits;
    return "62" + digits;
  };

  const buildWhatsAppMessage = () => {
    return [
      `Halo, saya ingin menyampaikan pesan melalui website Stasi Santa Bernadeth.`,
      ``,
      `*Nama:* ${formData.name}`,
      `*No. Telepon:* ${formData.phone}`,
      `*Email:* ${formData.email}`,
      `*Subjek:* ${formData.subject}`,
      ``,
      `*Pesan:*`,
      formData.message,
    ].join("\n");
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Nama lengkap harus diisi.";
    if (!formData.phone.trim()) return "Nomor telepon harus diisi.";
    if (!formData.email.trim()) return "Email harus diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Format email tidak valid.";
    if (!formData.subject.trim()) return "Subjek harus diisi.";
    if (!formData.message.trim()) return "Pesan harus diisi.";
    return null;
  };

  const handleSendWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      Swal.fire({ icon: "warning", title: "Periksa Form", text: error, confirmButtonColor: "#0d9488" });
      return;
    }

    const waNumber = formatWANumber(contact.phone);
    const waMessage = encodeURIComponent(buildWhatsAppMessage());
    const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

    const result = await Swal.fire({
      title: "Kirim via WhatsApp?",
      html: `Pesan akan dikirim ke nomor gereja:<br/><strong>${contact.phone}</strong><br/><br/>WhatsApp akan terbuka di browser/aplikasi Anda.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Kirim!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#64748b",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    window.open(waUrl, "_blank");
    setTimeout(() => {
      setLoading(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      Swal.fire({
        icon: "success",
        title: "WhatsApp Dibuka!",
        text: "Silakan kirim pesan yang sudah terisi di WhatsApp. Kami akan segera merespons.",
        confirmButtonColor: "#0d9488",
      });
    }, 1000);
  };

  const handleSendEmail = () => {
    const error = validateForm();
    if (error) {
      Swal.fire({ icon: "warning", title: "Periksa Form", text: error, confirmButtonColor: "#0d9488" });
      return;
    }
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\nNo. Telepon: ${formData.phone}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
    );
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, "_blank");
  };

  const contactInfo = [
    { icon: MapPin, title: "Alamat", content: contact.address, color: "red" },
    { icon: Phone, title: "Telepon", content: contact.phone, link: `tel:${contact.phone.replace(/[^0-9+]/g, "")}`, color: "green" },
    { icon: Mail, title: "Email", content: contact.email, link: `mailto:${contact.email}`, color: "blue" },
  ];

  const schedule = contact.officeHours.split("|").map((s) => {
    const parts = s.trim().split(":");
    return { day: parts[0]?.trim() || s, hours: parts.slice(1).join(":").trim() };
  });

  const socialMedia = [
    { name: "Facebook", icon: Facebook, url: contact.facebook, color: "bg-blue-600" },
    { name: "Instagram", icon: Instagram, url: contact.instagram, color: "bg-pink-600" },
    { name: "Youtube", icon: Youtube, url: contact.youtube, color: "bg-red-600" },
  ];

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl opacity-90">Lokasi, Kontak, dan Informasi Gereja</p>
        </div>
      </section>

      {/* Map */}
      <section className="bg-gray-100">
        <div className="w-full h-96">
          <iframe
            src={contact.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.5938574449896!2d119.89088!3d-2.9858333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d93d3e7b7b7b7b7%3A0x1234567890abcdef!2s2VPR%2BH7C!5e0!3m2!1sid!2sid!4v1234567890"}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Gereja"
          ></iframe>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 text-center">
                    <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                      <Icon className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="text-gray-700 hover:text-teal-600 transition-colors">
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-700">{info.content}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-teal-600" />
                  Jam Operasional Sekretariat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="font-medium text-gray-900">{item.day}</span>
                      <span className="text-teal-600 font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-gray-700">
                  <strong>Catatan:</strong> Untuk janji dengan Pastor, harap menghubungi sekretariat terlebih dahulu.
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media Sosial Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Ikuti media sosial kami untuk mendapatkan informasi terbaru tentang kegiatan
                  gereja, jadwal misa, dan pengumuman penting.
                </p>
                <div className="space-y-3">
                  {socialMedia.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className={`p-2 rounded ${social.color} text-white`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-gray-900">{social.name}</span>
                        <span className="ml-auto text-teal-600 text-sm">Kunjungi →</span>
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Kirim Pesan</h2>
            <p className="text-gray-600">
              Isi formulir di bawah ini, lalu kirim pesan Anda via <strong>WhatsApp</strong> atau{" "}
              <strong>Email</strong> langsung ke sekretariat gereja.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSendWhatsApp} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama Lengkap *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0853-4680-8206"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subjek *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Topik pesan Anda"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pesan Anda di sini..."
                    rows={6}
                  />
                </div>

                {/* Dua tombol kirim */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {/* Kirim via WhatsApp (submit utama) */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Membuka WhatsApp...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-5 w-5" />
                        Kirim via WhatsApp
                      </>
                    )}
                  </button>

                  {/* Kirim via Email */}
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Send className="h-5 w-5" />
                    Kirim via Email
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Tombol akan membuka WhatsApp / Email client dengan pesan yang sudah terisi otomatis.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Kami Siap Melayani Anda</h2>
          <p className="text-lg opacity-90 mb-6">
            Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan, memerlukan
            pelayanan pastoral, atau ingin bergabung dengan komunitas kami.
          </p>
          <p className="text-lg font-medium">Tuhan memberkati Anda!</p>
        </div>
      </section>
    </div>
  );
}