import { Link } from "react-router";
import { Calendar, BookOpen, Users, ArrowRight, Bell, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useSiteContent } from "../context/SiteContentContext";

export function Home() {
  const { content } = useSiteContent();
  const { hero, welcome, announcements, homeSchedules } = content;
  // Filter hanya item yang memiliki data lengkap
  const validSchedules = homeSchedules.filter(s => s.day?.trim() || s.time?.trim() || s.type?.trim());

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <ImageWithFallback
          src={hero.imageUrl}
          alt={hero.churchName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight drop-shadow-lg">
            {hero.churchName}
            <span className="block text-3xl md:text-4xl font-light mt-2 text-blue-100">{hero.subName}</span>
          </h1>

          <div className="space-y-3 mb-10">
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
            <p className="text-xl md:text-2xl font-medium text-white/90">
              {content.profile.parishName}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:text-base font-semibold tracking-widest uppercase text-blue-300">
              <span>{content.profile.kevikepan}</span>
              <span className="hidden md:block w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              <span>{hero.diocese}</span>
            </div>
          </div>

          <p className="text-lg md:text-xl mb-10 italic opacity-90 max-w-2xl mx-auto leading-relaxed border-l-2 border-blue-500/50 pl-6 py-2">
            "{hero.verse}" <br />
            <span className="text-sm font-medium not-italic text-blue-300">{hero.verseRef}</span>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/jadwal">
                <Calendar className="mr-2 h-5 w-5" />
                Lihat Jadwal Misa
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
              <Link to="/berita">
                <BookOpen className="mr-2 h-5 w-5" />
                Lihat Kegiatan
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">{welcome.title}</h2>
              <div className="space-y-4 text-gray-600">
                <p>{welcome.paragraph1}</p>
                <p>{welcome.paragraph2}</p>
                <p className="font-medium text-gray-900">
                  {welcome.quote}
                  <br />
                  <span className="text-sm text-gray-600">{welcome.quoteRef}</span>
                </p>
                <p className="italic">
                  {welcome.pastorGreeting}
                  <br />
                  <span className="font-medium">{welcome.pastorName}</span>
                  <br />
                  <span className="text-sm">{welcome.pastorTitle}</span>
                </p>
              </div>
              <Button asChild className="mt-6">
                <Link to="/profil">
                  Tentang Kami
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src={welcome.imageUrl}
                alt="Interior Gereja"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Schedule — hanya tampil jika ada data valid */}
      {validSchedules.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Jadwal Misa</h2>
              <p className="text-gray-600">Jadwal ibadah reguler mingguan</p>
            </div>

            <div className={`grid gap-6 ${validSchedules.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
              validSchedules.length === 2 ? "sm:grid-cols-2 max-w-xl mx-auto" :
                validSchedules.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" :
                  "sm:grid-cols-2 lg:grid-cols-4"
              }`}>
              {validSchedules.map((schedule, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      {schedule.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600 mb-1">{schedule.time}</p>
                    <p className="text-gray-600">{schedule.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/jadwal">
                  Lihat Jadwal Lengkap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}


      {/* Announcements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Pengumuman Terbaru</h2>
              <p className="text-gray-600">Informasi dan kegiatan gereja</p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/berita">
                Lihat Semua
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{announcement.category}</Badge>
                    <Bell className="h-4 w-4 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg">{announcement.title}</CardTitle>
                  <p className="text-sm text-gray-500">
                    {new Date(announcement.date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{announcement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/organisasi" className="group">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Organisasi</h3>
                  <p className="text-white/80">OMK, Legio Maria, Koor, dan lainnya</p>
                  <ArrowRight className="h-5 w-5 mx-auto mt-4 group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/donasi" className="group">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Donasi</h3>
                  <p className="text-white/80">Dukung kegiatan dan operasional gereja</p>
                  <ArrowRight className="h-5 w-5 mx-auto mt-4 group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>

            <Link to="/kontak" className="group">
              <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-2">Hubungi Kami</h3>
                  <p className="text-white/80">Lokasi, kontak, dan informasi</p>
                  <ArrowRight className="h-5 w-5 mx-auto mt-4 group-hover:translate-x-2 transition-transform" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}