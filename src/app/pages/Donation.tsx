import { DollarSign, Heart, Building, Users, BookOpen, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

export function Donation() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const donationTypes = [
    {
      title: "Persembahan Misa",
      icon: Heart,
      description: "Persembahan mingguan untuk operasional gereja dan pelayanan pastoral",
      color: "red",
    },
    {
      title: "Pembangunan Gereja",
      icon: Building,
      description: "Dana untuk renovasi dan pemeliharaan gedung gereja",
      color: "blue",
    },
    {
      title: "Kegiatan Sosial",
      icon: Users,
      description: "Bantuan untuk kegiatan sosial dan membantu sesama yang membutuhkan",
      color: "green",
    },
    {
      title: "Pendidikan Iman",
      icon: BookOpen,
      description: "Dukungan untuk kegiatan katekese dan pendidikan iman umat",
      color: "purple",
    },
  ];

  const bankAccounts = [
    {
      bank: "Bank Mandiri",
      accountNumber: "1234567890",
      accountName: "Stasi Santa Bernadeth Ba'lele Kondongan",
    },
    {
      bank: "Bank BCA",
      accountNumber: "0987654321",
      accountName: "Stasi Santa Bernadeth Ba'lele Kondongan",
    },
    {
      bank: "Bank BNI",
      accountNumber: "5555666677",
      accountName: "Stasi Santa Bernadeth Ba'lele Kondongan",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      red: { bg: "bg-red-50", text: "text-red-600" },
      blue: { bg: "bg-blue-50", text: "text-blue-600" },
      green: { bg: "bg-green-50", text: "text-green-600" },
      purple: { bg: "bg-purple-50", text: "text-purple-600" },
    };
    return colors[color] || colors.blue;
  };

  const copyToClipboard = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(bank);
    toast.success(`Nomor rekening ${bank} berhasil disalin!`);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div>
      <Toaster />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <DollarSign className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Informasi Persembahan</h1>
          <p className="text-xl opacity-90">Dukung Kegiatan dan Operasional Gereja</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700">
              "Berilah, maka kamu akan diberi: suatu takaran yang baik, yang dipadatkan, yang
              digoncang dan yang tumpah ke luar akan dicurahkan ke dalam ribaanmu."
            </p>
            <p className="text-sm text-gray-600 italic">- Lukas 6:38</p>
            <p className="text-gray-700 mt-6">
              Persembahan Anda sangat berharga bagi kelangsungan pelayanan pastoral dan berbagai
              kegiatan gereja. Terima kasih atas dukungan dan kemurahan hati Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Types */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Jenis Persembahan</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {donationTypes.map((type, index) => {
              const Icon = type.icon;
              const colors = getColorClasses(type.color);
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`inline-flex p-4 rounded-full ${colors.bg} mb-4`}>
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bank Transfer */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Transfer Bank</h2>
          <div className="space-y-4">
            {bankAccounts.map((account, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{account.bank}</h3>
                      <p className="text-gray-600 mb-2">a/n {account.accountName}</p>
                      <p className="text-2xl font-mono font-bold text-blue-600">
                        {account.accountNumber}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                      className="flex items-center gap-2"
                    >
                      {copiedAccount === account.bank ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Salin
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* QRIS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">QRIS</h2>
          <Card>
            <CardContent className="p-8 text-center">
              <div className="max-w-xs mx-auto mb-6 bg-white p-4 rounded-lg border">
                <div className="aspect-square bg-gray-200 rounded flex items-center justify-center">
                  <p className="text-gray-500 text-sm">QR Code QRIS</p>
                </div>
              </div>
              <p className="text-gray-700 mb-2">
                Scan QR Code di atas untuk persembahan melalui QRIS
              </p>
              <p className="text-sm text-gray-600">
                (Dapat menggunakan aplikasi mobile banking atau e-wallet)
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Offline Donation */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Persembahan Langsung</h2>
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">Di Gereja</h3>
                <p className="text-gray-700">
                  Anda dapat memberikan persembahan langsung melalui kotak persembahan yang
                  tersedia di gereja saat Misa atau menyerahkan langsung ke sekretariat gereja.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Jadwal Sekretariat</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Senin - Jumat: 09:00 - 12:00 WIB</li>
                  <li>• Sabtu: 09:00 - 11:00 WIB</li>
                  <li>• Minggu: Setelah Misa (tutup pukul 12:00 WIB)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Notes */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-center">Catatan Penting</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    Untuk persembahan melalui transfer bank, mohon cantumkan keterangan (Nama dan
                    keperluan, contoh: "Nama - Persembahan Misa")
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    Bukti transfer dapat dikirimkan ke sekretariat gereja atau WhatsApp pengurus
                    untuk dokumentasi
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    Laporan keuangan gereja dipublikasikan secara berkala untuk transparansi
                    pengelolaan dana
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    Tuhan memberkati setiap persembahan yang diberikan dengan tulus dan ikhlas
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Thank You */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Terima Kasih</h2>
          <p className="text-lg opacity-90">
            Atas kemurahan hati dan dukungan Anda dalam membangun Kerajaan Allah.
            <br />
            Tuhan memberkati Anda dan keluarga!
          </p>
        </div>
      </section>
    </div>
  );
}