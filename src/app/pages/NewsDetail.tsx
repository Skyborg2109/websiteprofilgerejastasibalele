import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Calendar, Tag, Newspaper, User, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useSiteContent } from "../context/SiteContentContext";

// Hitung estimasi waktu baca (1 kata ≈ 0.004 menit, rata-rata 200 kata/menit)
function readingTime(text: string): number {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

// Warna badge berdasarkan kategori
function categoryColor(cat: string) {
    const map: Record<string, string> = {
        Liturgi: "bg-purple-500",
        Sosial: "bg-blue-500",
        Kegiatan: "bg-amber-500",
        Pengumuman: "bg-red-500",
    };
    return map[cat] ?? "bg-green-500";
}

export function NewsDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { content } = useSiteContent();

    const allNews = content.news;
    const currentIndex = allNews.findIndex((n) => n.id === Number(id));
    const article = allNews[currentIndex];
    const prevArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null;
    const nextArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;
    const related = allNews.filter((n) => n.id !== Number(id) && n.category === article?.category).slice(0, 3);
    const otherNews = allNews.filter((n) => n.id !== Number(id)).slice(0, 3);

    // ─── Not found ─────────────────────────────────────────────────────────────
    if (!article) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 py-32">
                <Newspaper className="h-16 w-16 text-gray-300" />
                <h2 className="text-2xl font-bold text-gray-600">Berita tidak ditemukan</h2>
                <p className="text-gray-400 text-sm">Artikel yang Anda cari mungkin sudah dihapus atau dipindahkan.</p>
                <button
                    onClick={() => navigate("/berita")}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke Berita
                </button>
            </div>
        );
    }

    const fullText = article.content || article.excerpt;
    const paragraphs = fullText.split("\n\n").filter(Boolean);
    const minsRead = readingTime(fullText);

    // ─── Main render ───────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-white">
            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <div className="relative h-72 md:h-[480px] overflow-hidden">
                <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

                {/* Back button */}
                <button
                    onClick={() => navigate("/berita")}
                    className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-all shadow-md z-10"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali
                </button>

                {/* Title block */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 md:px-12 md:pb-12 max-w-4xl">
                    <Badge className={`mb-3 ${categoryColor(article.category)} text-white border-0 text-xs px-3 py-1`}>
                        {article.category}
                    </Badge>
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                        {article.title}
                    </h1>
                </div>
            </div>

            {/* ── Body ─────────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Main article */}
                <article className="lg:col-span-2">

                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6 pb-5 border-b border-gray-100">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-green-600" />
                            {new Date(article.date).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Tag className="h-4 w-4 text-green-600" />
                            {article.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-green-600" />
                            {minsRead} menit membaca
                        </span>
                        <span className="flex items-center gap-1.5">
                            <User className="h-4 w-4 text-green-600" />
                            Tim Redaksi Gereja
                        </span>
                    </div>

                    {/* Lead / excerpt */}
                    <blockquote className="text-base md:text-lg font-medium text-gray-700 border-l-4 border-green-500 pl-5 py-1 italic mb-8 bg-green-50 rounded-r-lg pr-4">
                        {article.excerpt}
                    </blockquote>

                    {/* Article body */}
                    <div className="space-y-5 text-gray-700 leading-relaxed text-[15px] md:text-base">
                        {article.content ? (
                            paragraphs.map((para, i) => (
                                <p key={i}>{para}</p>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">Isi artikel belum tersedia. Silakan tambahkan konten melalui panel admin.</p>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="my-10 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {/* Prev / Next navigation */}
                    <div className="grid grid-cols-2 gap-4">
                        {prevArticle ? (
                            <Link
                                to={`/berita/${prevArticle.id}`}
                                className="group flex flex-col gap-1 p-4 border border-gray-100 rounded-xl hover:border-green-300 hover:shadow-sm transition-all"
                            >
                                <span className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-green-600">
                                    <ChevronLeft className="h-3.5 w-3.5" /> Sebelumnya
                                </span>
                                <span className="text-sm font-semibold text-gray-700 line-clamp-2 group-hover:text-green-700">
                                    {prevArticle.title}
                                </span>
                            </Link>
                        ) : <div />}

                        {nextArticle ? (
                            <Link
                                to={`/berita/${nextArticle.id}`}
                                className="group flex flex-col items-end gap-1 p-4 border border-gray-100 rounded-xl hover:border-green-300 hover:shadow-sm transition-all text-right"
                            >
                                <span className="text-xs text-gray-400 flex items-center gap-1 group-hover:text-green-600">
                                    Berikutnya <ChevronRight className="h-3.5 w-3.5" />
                                </span>
                                <span className="text-sm font-semibold text-gray-700 line-clamp-2 group-hover:text-green-700">
                                    {nextArticle.title}
                                </span>
                            </Link>
                        ) : <div />}
                    </div>

                    {/* Back button */}
                    <div className="mt-6">
                        <button
                            onClick={() => navigate("/berita")}
                            className="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium text-sm transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Lihat Semua Berita
                        </button>
                    </div>
                </article>

                {/* ── Sidebar ──────────────────────────────────────────────────── */}
                <aside className="space-y-8">

                    {/* Related / other news */}
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Newspaper className="h-4 w-4 text-green-600" />
                            {related.length > 0 ? "Berita Serupa" : "Berita Lainnya"}
                        </h3>
                        <div className="space-y-4">
                            {(related.length > 0 ? related : otherNews).map((rel) => (
                                <Link
                                    key={rel.id}
                                    to={`/berita/${rel.id}`}
                                    className="group flex gap-3 items-start"
                                >
                                    <div className="w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                                        <ImageWithFallback
                                            src={rel.image}
                                            alt={rel.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Badge className={`text-[10px] px-2 py-0.5 mb-1 ${categoryColor(rel.category)} text-white border-0`}>
                                            {rel.category}
                                        </Badge>
                                        <p className="text-sm font-medium text-gray-700 line-clamp-2 group-hover:text-green-600 transition-colors leading-snug">
                                            {rel.title}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(rel.date).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Category info card */}
                    <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl p-5 text-white">
                        <h3 className="font-bold text-base mb-2">Kategori: {article.category}</h3>
                        <p className="text-sm text-white/80 leading-relaxed">
                            {article.category === "Liturgi" && "Berita seputar perayaan sakramen, misa, dan kegiatan ibadah liturgis gereja."}
                            {article.category === "Sosial" && "Kegiatan bakti sosial, kepedulian, dan pelayanan kepada sesama yang membutuhkan."}
                            {article.category === "Kegiatan" && "Rangkaian kegiatan komunitas, pertemuan lingkungan, retret, dan acara gereja."}
                            {article.category === "Pengumuman" && "Informasi resmi dan pengumuman penting dari Stasi Santa Bernadeth."}
                            {!["Liturgi", "Sosial", "Kegiatan", "Pengumuman"].includes(article.category) && "Berita dan informasi terbaru dari Stasi Santa Bernadeth Ba'lele Kondongan."}
                        </p>
                        <button
                            onClick={() => navigate("/berita")}
                            className="mt-4 text-sm font-medium underline underline-offset-2 hover:no-underline"
                        >
                            Lihat semua berita →
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
