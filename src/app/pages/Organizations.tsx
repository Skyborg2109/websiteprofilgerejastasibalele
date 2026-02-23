import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useSiteContent } from "../context/SiteContentContext";

export function Organizations() {
  const { content } = useSiteContent();
  const organizations = content.organizations;

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; badge: string }> = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" },
      indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-700" },
      red: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", badge: "bg-red-100 text-red-700" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", badge: "bg-purple-100 text-purple-700" },
      green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-200", badge: "bg-green-100 text-green-700" },
      orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", badge: "bg-orange-100 text-orange-700" },
      teal: { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-200", badge: "bg-teal-100 text-teal-700" },
      pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-200", badge: "bg-pink-100 text-pink-700" },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Organisasi & Komunitas</h1>
          <p className="text-xl opacity-90">Berbagai Organisasi dan Komunitas di Stasi Santa Bernadeth</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Stasi Santa Bernadeth Ba'lele Kondongan memiliki berbagai organisasi dan komunitas yang aktif melayani dalam
            berbagai bidang pelayanan. Setiap umat diundang untuk bergabung dan berkontribusi
            sesuai dengan panggilan dan talenta masing-masing.
          </p>
        </div>
      </section>

      {/* Organizations Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {organizations.map((org) => {
              const colors = getColorClasses(org.color);
              return (
                <Card key={org.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardHeader className={`${colors.bg} border-b ${colors.border}`}>
                    <div className="flex items-start justify-between">
                      <CardTitle className={`text-xl ${colors.text}`}>{org.name}</CardTitle>
                      <Badge className={colors.badge}>{org.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{org.description}</p>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-gray-900 text-sm min-w-20">Ketua:</span>
                      <span className="text-gray-700 text-sm">{org.leader}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-gray-900 text-sm min-w-20">Anggota:</span>
                      <span className="text-gray-700 text-sm">{org.members}</span>
                    </div>
                    <div className={`flex items-start gap-2 pt-3 border-t ${colors.border}`}>
                      <span className="font-medium text-gray-900 text-sm min-w-20">Jadwal:</span>
                      <span className={`text-sm ${colors.text} font-medium`}>{org.schedule}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {organizations.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              Belum ada organisasi terdaftar.
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Bergabunglah dengan Kami!</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Setiap umat diundang untuk aktif dalam organisasi dan komunitas sesuai dengan
            panggilan masing-masing. Mari bersama-sama membangun Gereja yang hidup!
          </p>
          <p className="text-lg">
            Hubungi koordinator masing-masing organisasi atau sekretariat gereja untuk informasi lebih lanjut.
          </p>
        </div>
      </section>
    </div>
  );
}