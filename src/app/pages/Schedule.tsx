import { Calendar, Clock, Cross, Heart, Users, Baby, Sparkles, Church } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

// Peta ikon berdasarkan nama sakramen
const sacramentIcons: Record<string, typeof Baby> = {
  "Baptis": Baby,
  "Komuni Pertama": Church,
  "Krisma": Sparkles,
  "Pernikahan": Heart,
};

export function Schedule() {
  const { content } = useSiteContent();
  const weeklyMass = content.weeklyMass;
  const holyDays = content.holyDays;
  const sacraments = content.sacraments;
  const devotions = content.devotions;

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Jadwal & Liturgi</h1>
          <p className="text-xl opacity-90">Jadwal Misa, Sakramen, dan Kegiatan Rohani</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="misa" className="w-full">
            <div className="overflow-x-auto mb-8 -mx-4 px-4">
              <TabsList className="flex w-max min-w-full h-auto">
                <TabsTrigger value="misa" className="flex-1 min-w-[100px] py-2">Jadwal Misa</TabsTrigger>
                <TabsTrigger value="hariraya" className="flex-1 min-w-[90px] py-2">Hari Raya</TabsTrigger>
                <TabsTrigger value="sakramen" className="flex-1 min-w-[90px] py-2">Sakramen</TabsTrigger>
                <TabsTrigger value="doa" className="flex-1 min-w-[100px] py-2">Doa & Devosi</TabsTrigger>
              </TabsList>
            </div>

            {/* Jadwal Misa Mingguan */}
            <TabsContent value="misa">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Clock className="h-6 w-6 text-purple-600" />
                    Jadwal Misa Mingguan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hari</TableHead>
                        <TableHead>Waktu</TableHead>
                        <TableHead>Jenis Misa</TableHead>
                        <TableHead>Bahasa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {weeklyMass.map((mass, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{mass.day}</TableCell>
                          <TableCell>{mass.time}</TableCell>
                          <TableCell>{mass.type}</TableCell>
                          <TableCell>{mass.language}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {weeklyMass.length === 0 && (
                    <div className="text-center py-10 text-gray-400">Belum ada jadwal misa.</div>
                  )}

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">Catatan Penting:</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Umat diharapkan hadir 10 menit sebelum Misa dimulai</li>
                      <li>• Berpakaian sopan dan rapi</li>
                      <li>• Silakan konfirmasi jadwal di hari-hari besar atau libur nasional</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hari Raya */}
            <TabsContent value="hariraya">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6 text-yellow-600" />
                    Jadwal Misa Hari Raya
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {holyDays.map((day, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow flex justify-between items-center"
                      >
                        <div>
                          <div className="font-bold text-lg text-gray-900">{day.event}</div>
                          <div className="text-gray-600">{day.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-purple-600">{day.time}</div>
                        </div>
                      </div>
                    ))}
                    {holyDays.length === 0 && (
                      <div className="text-center py-10 text-gray-400">Belum ada jadwal hari raya.</div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h3 className="font-bold text-gray-900 mb-2">Informasi:</h3>
                    <p className="text-sm text-gray-700">
                      Jadwal Misa untuk Hari Raya yang tanggalnya tidak tetap (seperti Paskah,
                      Kenaikan Yesus) akan dikonfirmasi sesuai dengan kalender liturgi tahun berjalan.
                      Mohon perhatikan pengumuman di Gereja dan media sosial untuk informasi terkini.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sakramen */}
            <TabsContent value="sakramen">
              <div className="space-y-6">
                {sacraments.map((sacrament, index) => {
                  const Icon = sacramentIcons[sacrament.name] ?? Church;
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                          <Icon className="h-6 w-6 text-blue-600" />
                          {sacrament.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="font-medium text-gray-900 mb-1">Jadwal:</div>
                          <div className="text-gray-700">{sacrament.schedule}</div>
                        </div>

                        {sacrament.requirements.length > 0 && (
                          <div>
                            <div className="font-medium text-gray-900 mb-2">Persyaratan:</div>
                            <ul className="space-y-1">
                              {sacrament.requirements.map((req, idx) => (
                                <li key={idx} className="text-gray-700 text-sm">• {req}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {sacrament.contact && (
                          <div className="pt-3 border-t">
                            <div className="font-medium text-gray-900 mb-1">Pendaftaran:</div>
                            <div className="text-sm text-gray-700">{sacrament.contact}</div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
                {sacraments.length === 0 && (
                  <div className="text-center py-16 text-gray-400">Belum ada informasi sakramen.</div>
                )}
              </div>
            </TabsContent>

            {/* Doa & Devosi */}
            <TabsContent value="doa">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Cross className="h-6 w-6 text-purple-600" />
                    Jadwal Doa & Devosi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devotions.map((devotion, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{devotion.name}</h3>
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="text-purple-600 font-medium mb-2">{devotion.schedule}</div>
                        <div className="text-gray-600 text-sm">{devotion.description}</div>
                      </div>
                    ))}
                    {devotions.length === 0 && (
                      <div className="text-center py-10 text-gray-400">Belum ada jadwal doa & devosi.</div>
                    )}
                  </div>

                  <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">Ajakan:</h3>
                    <p className="text-sm text-gray-700">
                      Semua umat diundang untuk ikut serta dalam berbagai kegiatan doa dan devosi ini
                      untuk memperdalam kehidupan rohani dan mempererat persaudaraan dalam Kristus.
                      Mari kita berdoa bersama sebagai keluarga Allah!
                    </p>
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
