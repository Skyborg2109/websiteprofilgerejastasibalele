import { Church, Target, Heart, Users2, User, MapPin } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Profile() {
  const { content } = useSiteContent();
  const { history, visiMisi, structure, pastor, wilayah, profile } = content;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-6 inline-block p-4 bg-white/10 backdrop-blur-md rounded-full ring-1 ring-white/20">
            <Church className="h-10 w-10 text-blue-200" />
          </div>
          <div className="space-y-1 mb-6">
            <p className="text-blue-300 font-bold tracking-widest uppercase text-xs md:text-sm">
              Keuskupan Agung Makassar
            </p>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-blue-400" />
              <p className="text-lg md:text-xl font-medium text-white/90 whitespace-nowrap">{profile.parishName}</p>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight">
            Stasi Santa Bernadeth
          </h1>
          <p className="text-xl md:text-2xl font-light text-blue-100 italic">Ba'lele Kondongan</p>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="sejarah" className="w-full">
            <div className="overflow-x-auto mb-8 -mx-4 px-4">
              <TabsList className="flex w-max min-w-full h-auto">
                <TabsTrigger value="sejarah" className="flex-1 min-w-[90px] py-2">Sejarah</TabsTrigger>
                <TabsTrigger value="visi-misi" className="flex-1 min-w-[100px] py-2">Visi & Misi</TabsTrigger>
                <TabsTrigger value="kepengurusan" className="flex-1 min-w-[90px] py-2">Kepengurusan</TabsTrigger>
                <TabsTrigger value="pastor" className="flex-1 min-w-[80px] py-2">Pastor</TabsTrigger>
                <TabsTrigger value="wilayah" className="flex-1 min-w-[80px] py-2">Wilayah</TabsTrigger>
              </TabsList>
            </div>

            {/* Sejarah */}
            <TabsContent value="sejarah" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Sejarah Stasi Santa Bernadeth</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {history.paragraph1 && <p className="text-gray-700">{history.paragraph1}</p>}
                      {history.paragraph2 && <p className="text-gray-700">{history.paragraph2}</p>}
                      {history.paragraph3 && <p className="text-gray-700">{history.paragraph3}</p>}
                    </div>
                    {history.imageUrl && (
                      <div className="relative h-64 md:h-full rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={history.imageUrl}
                          alt="Gereja Santa Bernadeth"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Timeline */}
                  {history.timeline.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-6">Timeline Sejarah</h3>
                      <div className="space-y-4">
                        {history.timeline.map((item, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-4 h-4 rounded-full bg-blue-600" />
                              {index !== history.timeline.length - 1 && (
                                <div className="w-0.5 h-full bg-blue-200 mt-1" />
                              )}
                            </div>
                            <div className="pb-8">
                              <div className="font-bold text-blue-600 text-lg">{item.year}</div>
                              <div className="text-gray-700">{item.event}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visi & Misi */}
            <TabsContent value="visi-misi" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Target className="h-6 w-6 text-blue-600" />
                    Visi Kami
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {visiMisi.visi}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Heart className="h-6 w-6 text-red-600" />
                    Misi Kami
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {visiMisi.misi.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="text-blue-600 font-bold flex-shrink-0">{index + 1}.</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                    {visiMisi.misi.length === 0 && (
                      <p className="text-gray-400 text-sm">Belum ada poin misi.</p>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kepengurusan */}
            <TabsContent value="kepengurusan" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Users2 className="h-6 w-6 text-blue-600" />
                    Struktur Kepengurusan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {structure.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-10">Belum ada data struktur kepengurusan.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {structure.map((person, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                          {/* Foto */}
                          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md mb-3 flex-shrink-0 group-hover:border-blue-200 transition-colors">
                            {person.imageUrl ? (
                              <img
                                src={person.imageUrl}
                                alt={person.name}
                                className="w-full h-full object-cover object-top"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "";
                                  (e.target as HTMLImageElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                                <User className="h-10 w-10 text-blue-400" />
                              </div>
                            )}
                          </div>
                          {/* Info */}
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-0.5 leading-tight">{person.position}</p>
                          <p className="text-sm font-medium text-gray-900 leading-snug">{person.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pastor */}
            <TabsContent value="pastor" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <User className="h-6 w-6 text-blue-600" />
                    Pastor yang Melayani
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 flex justify-center">
                      <div
                        className="w-full max-w-[240px] rounded-2xl overflow-hidden bg-gray-200 shadow-lg"
                        style={{ aspectRatio: "3 / 4" }}
                      >
                        <ImageWithFallback
                          src={pastor.imageUrl}
                          alt="Pastor Paroki"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{pastor.name}</h3>
                        <p className="text-blue-600 font-medium">{pastor.title}</p>
                      </div>
                      <div className="space-y-2 text-gray-700">
                        {pastor.ordination && <p><strong>Tahbisan:</strong> {pastor.ordination}</p>}
                        {pastor.education && <p><strong>Pendidikan:</strong> {pastor.education}</p>}
                        {pastor.since && <p><strong>Pelayanan di Paroki:</strong> {pastor.since}</p>}
                      </div>
                      <div className="pt-4 border-t space-y-3">
                        {pastor.quote && (
                          <p className="italic">"{pastor.quote}"</p>
                        )}
                        {pastor.bio && (
                          <p className="text-sm text-gray-600">{pastor.bio}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Wilayah */}
            <TabsContent value="wilayah" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Data Stasi & Wilayah Lingkungan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <div className="grid sm:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-3xl font-bold text-blue-600">{wilayah.totalLingkungan}</div>
                        <div className="text-gray-600">Lingkungan</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600">{wilayah.totalKeluarga}</div>
                        <div className="text-gray-600">Keluarga</div>
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-blue-600">{wilayah.totalJiwa}</div>
                        <div className="text-gray-600">Jiwa</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {wilayah.items.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                            <p className="text-gray-600">Ketua: {item.ketua}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{item.families}</div>
                            <div className="text-sm text-gray-600">Keluarga</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {wilayah.items.length === 0 && (
                      <p className="text-center text-gray-400 py-8">Belum ada data lingkungan.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}