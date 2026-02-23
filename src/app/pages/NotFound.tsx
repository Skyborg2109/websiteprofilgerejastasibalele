import { Link } from "react-router";
import { Home, Church } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-[600px] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <Church className="h-24 w-24 mx-auto mb-6 text-gray-400" />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak ditemukan. Silakan kembali ke beranda atau gunakan navigasi di atas.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            <Home className="mr-2 h-5 w-5" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>
    </div>
  );
}
