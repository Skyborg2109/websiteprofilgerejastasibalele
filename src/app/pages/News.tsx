import { useState } from "react";
import { Link } from "react-router";
import { Newspaper, Calendar, Tag, Image as ImageIcon, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useSiteContent } from "../context/SiteContentContext";

// ─── Lightbox component ───────────────────────────────────────────────────────
function Lightbox({
  images,
  initialIndex,
  title,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={handleBackdrop}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
        aria-label="Tutup"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
        {current + 1} / {images.length}
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 md:left-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <div className="max-w-4xl max-h-[85vh] w-full mx-16 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[current]}
          alt={`${title} - Foto ${current + 1}`}
          className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl"
        />
        <p className="text-white/80 text-sm text-center">{title} — Foto {current + 1}</p>
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 md:right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
          aria-label="Foto berikutnya"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Thumbnails strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`h-12 w-16 rounded overflow-hidden border-2 transition-all ${i === current ? "border-white scale-110" : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main News Page ──────────────────────────────────────────────────────────
export function News() {
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const { content } = useSiteContent();

  // Lightbox state
  const [lightbox, setLightbox] = useState<{
    images: string[];
    index: number;
    title: string;
  } | null>(null);

  const newsArticles = content.news;

  const uniqueCategories = [...new Set(newsArticles.map((a) => a.category))];
  const categories = [
    { value: "semua", label: "Semua" },
    ...uniqueCategories.map((c) => ({ value: c, label: c })),
  ];

  const filteredNews =
    selectedCategory === "semua"
      ? newsArticles
      : newsArticles.filter((article) => article.category === selectedCategory);

  const galleries = [
    {
      title: "Perayaan Natal 2025",
      date: "2025-12-25",
      images: [
        "https://images.unsplash.com/photo-1636562705007-67a52b138df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMGNodXJjaCUyMGludGVyaW9yJTIwYWx0YXJ8ZW58MXx8fHwxNzcxNjkzMDM5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1709054754811-6c8d2d1ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjaG9pciUyMHNpbmdpbmd8ZW58MXx8fHwxNzcxNjk3MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1561984781-de40954f2c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmllc3QlMjBjZWxlYnJhdGluZyUyMG1hc3N8ZW58MXx8fHwxNzcxNjcyMjYxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1765947382559-93260e5d6c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzcxNzY2NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description: "Dokumentasi perayaan Natal tahun 2025",
    },
    {
      title: "Bakti Sosial OMK",
      date: "2026-01-15",
      images: [
        "https://images.unsplash.com/photo-1639092419140-c9af5d9538f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRob2xpYyUyMHlvdXRoJTIwZ3JvdXB8ZW58MXx8fHwxNzcxNzY2NDExfDA&ixlib=rb-4.1.0&q=80&w=1080",
        "https://images.unsplash.com/photo-1765947382559-93260e5d6c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHklMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzcxNzY2NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      ],
      description: "Kegiatan bakti sosial ke panti asuhan",
    },
  ];

  return (
    <div>
      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Newspaper className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita &amp; Kegiatan</h1>
          <p className="text-xl opacity-90">Informasi dan Dokumentasi Kegiatan Gereja</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="berita" className="w-full">
            <div className="overflow-x-auto mb-8 -mx-4 px-4">
              <TabsList className="flex w-max min-w-full h-auto">
                <TabsTrigger value="berita" className="flex-1 min-w-[90px] py-2">Berita</TabsTrigger>
                <TabsTrigger value="galeri" className="flex-1 min-w-[100px] py-2">Galeri Foto</TabsTrigger>
              </TabsList>
            </div>

            {/* ── Berita ── */}
            <TabsContent value="berita">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.value
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* News Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((article) => (
                  <Link
                    key={article.id}
                    to={`/berita/${article.id}`}
                    className="group block"
                  >
                    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full cursor-pointer border border-gray-100">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900">
                          {article.category}
                        </Badge>
                        {/* Read more overlay */}
                        <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/10 transition-colors duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-green-700 text-sm font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1">
                            Baca Selengkapnya <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(article.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-green-700 transition-colors">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                          Baca selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* ── Galeri ── */}
            <TabsContent value="galeri">
              <div className="space-y-8">
                {galleries.map((gallery, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-2xl">
                            <ImageIcon className="h-6 w-6 text-green-600" />
                            {gallery.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(gallery.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                        <Badge variant="secondary">{gallery.images.length} Foto</Badge>
                      </div>
                      <p className="text-gray-600 mt-2">{gallery.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {gallery.images.map((image, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() =>
                              setLightbox({
                                images: gallery.images,
                                index: imgIndex,
                                title: gallery.title,
                              })
                            }
                            className="relative h-40 rounded-lg overflow-hidden group cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label={`Buka foto ${imgIndex + 1} dari ${gallery.title}`}
                          >
                            <ImageWithFallback
                              src={image}
                              alt={`${gallery.title} - Foto ${imgIndex + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-medium bg-black/40 px-2 py-1 rounded-full">
                                Lihat foto
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
