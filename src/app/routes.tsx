import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Schedule } from "./pages/Schedule";
import { News } from "./pages/News";
import { NewsDetail } from "./pages/NewsDetail";
import { Organizations } from "./pages/Organizations";
import { Donation } from "./pages/Donation";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

// Admin pages
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminGuard } from "./pages/admin/AdminGuard";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminBeranda } from "./pages/admin/AdminBeranda";
import { AdminPengumuman } from "./pages/admin/AdminPengumuman";
import { AdminJadwal } from "./pages/admin/AdminJadwal";
import { AdminBerita } from "./pages/admin/AdminBerita";
import { AdminOrganisasi } from "./pages/admin/AdminOrganisasi";
import { AdminKontak } from "./pages/admin/AdminKontak";
import { AdminTampilan } from "./pages/admin/AdminTampilan";
import { AdminProfil } from "./pages/admin/AdminProfil";
import { AdminKeamanan } from "./pages/admin/AdminKeamanan";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "profil", Component: Profile },
      { path: "jadwal", Component: Schedule },
      { path: "berita", Component: News },
      { path: "berita/:id", Component: NewsDetail },
      { path: "organisasi", Component: Organizations },
      { path: "donasi", Component: Donation },
      { path: "kontak", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
  // Admin login (no guard needed)
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  // Admin protected routes
  {
    path: "/admin",
    element: <AdminGuard><AdminDashboard /></AdminGuard>,
  },
  {
    path: "/admin/beranda",
    element: <AdminGuard><AdminBeranda /></AdminGuard>,
  },
  {
    path: "/admin/pengumuman",
    element: <AdminGuard><AdminPengumuman /></AdminGuard>,
  },
  {
    path: "/admin/jadwal",
    element: <AdminGuard><AdminJadwal /></AdminGuard>,
  },
  {
    path: "/admin/berita",
    element: <AdminGuard><AdminBerita /></AdminGuard>,
  },
  {
    path: "/admin/organisasi",
    element: <AdminGuard><AdminOrganisasi /></AdminGuard>,
  },
  {
    path: "/admin/kontak",
    element: <AdminGuard><AdminKontak /></AdminGuard>,
  },
  {
    path: "/admin/tampilan",
    element: <AdminGuard><AdminTampilan /></AdminGuard>,
  },
  {
    path: "/admin/profil",
    element: <AdminGuard><AdminProfil /></AdminGuard>,
  },
  {
    path: "/admin/keamanan",
    element: <AdminGuard><AdminKeamanan /></AdminGuard>,
  },
]);
