import { Link } from "react-router";
import { Church, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";

export function Footer() {
  const { content } = useSiteContent();
  const { footer, contact, navbar, profile } = content;

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Church className="h-6 w-6 text-blue-400" />
              <div>
                <h3 className="font-bold text-white">{navbar.churchName}</h3>
                <p className="text-sm">{navbar.subName}</p>
              </div>
            </div>
            <p className="text-xs text-blue-400 font-medium mb-2">{profile.parishName}</p>
            <p className="text-sm text-gray-400">{footer.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/profil" className="hover:text-blue-400 transition-colors">
                  Profil Gereja
                </Link>
              </li>
              <li>
                <Link to="/jadwal" className="hover:text-blue-400 transition-colors">
                  Jadwal Misa
                </Link>
              </li>
              <li>
                <Link to="/berita" className="hover:text-blue-400 transition-colors">
                  Berita & Kegiatan
                </Link>
              </li>
              <li>
                <Link to="/organisasi" className="hover:text-blue-400 transition-colors">
                  Organisasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>{contact.email}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-white mb-4">Media Sosial</h3>
            <div className="flex gap-3">
              <a
                href={contact.facebook || "#"}
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={contact.instagram || "#"}
                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={contact.youtube || "#"}
                className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}