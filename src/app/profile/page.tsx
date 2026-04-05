import { ReactNode } from "react";
import { ShoppingCart, BookOpen, LayoutGrid, User } from "lucide-react";
import ProfileCard from "./components/ProfileCard";
import Sidebar from "./components/Sidebar";
import ProfileInfoSection from "./components/ProfileInfoSection";
import SecuritySection from "./components/SecuritySection";

// --- Navbar ---
function Navbar() {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 32px", backgroundColor: "#fff",
      borderBottom: "1px solid #e5e7eb", fontFamily: "sans-serif"
    }}>
      {/* Logo */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        color: "#3d6b4f",
        padding: "8px 14px", borderRadius: "8px", fontWeight: "700", fontSize: "15px"
      }}>
        <img
          //src={logo}                // logo image (belum dimasukkin)
          alt="WastraNusa Logo"
          style={{ width: "28px", height: "28px", objectFit: "contain" }}
        />
        WastraNusa
      </div>

      {/* Search Bar */}
      <div style={{ display: "flex", flex: 1, maxWidth: "480px", margin: "0 24px" }}>
        <input
          placeholder="Cari produk batik, tenun, atau artikel budaya..."
          style={{
            flex: 1, padding: "8px 14px", border: "1px solid #d1d5db",
            borderRadius: "8px 0 0 8px", outline: "none", fontSize: "13px"
          }}
        />
        <button style={{
          padding: "8px 16px", backgroundColor: "#3d6b4f", color: "#fff",
          border: "none", borderRadius: "0 8px 8px 0", cursor: "pointer", fontSize: "13px"
        }}>
          Cari
        </button>
      </div>

      {/* Nav Icons */}
      <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
        {[
          { icon: <BookOpen size={20} />, label: "Ensiklopedia" },
          { icon: <LayoutGrid size={20} />, label: "Katalog" },
          { icon: <ShoppingCart size={20} />, label: "Keranjang" },
          { icon: <User size={20} />, label: "Profil" },
        ].map(({ icon, label }) => (
          <div key={label} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "2px", cursor: "pointer", color: "#374151", fontSize: "11px"
          }}>
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
}

// --- Breadcrumb ---
function Breadcrumb() {
  return (
    <div style={{
      padding: "10px 32px", fontSize: "13px",
      color: "#6b7280", fontFamily: "sans-serif"
    }}>
      <span style={{ cursor: "pointer", color: "#3d6b4f" }}>Beranda</span>
      {" › "}
      <span>Profil Saya</span>
    </div>
  );
}

// --- Footer Column (reusable) ---
function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "700", color: "#fff" }}>{title}</h4>
      {links.map((link) => (
        <a key={link} href="#" style={{
          fontSize: "13px", color: "#a8b5a0", textDecoration: "none", cursor: "pointer"
        }}>
          {link}
        </a>
      ))}
    </div>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer style={{
      backgroundColor: "#2d4a38",   // dark green background
      padding: "48px 32px 24px",
      fontFamily: "sans-serif",
      marginTop: "auto"
    }}>
      {/* Top section */}
      <div style={{ display: "flex", gap: "48px", marginBottom: "48px" }}>

        {/* Brand column */}
        <div style={{ minWidth: "180px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "8px",
              backgroundColor: "#4a7c5e",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px"
            }}>
              🧵
            </div>
            <span style={{ fontWeight: "700", fontSize: "16px", color: "#fff" }}>WastraNusa</span>
          </div>

          {/* Description */}
          <p style={{ margin: 0, fontSize: "12px", color: "#a8b5a0", lineHeight: "1.6" }}>
            Platform terpercaya untuk wastra tradisional Indonesia — menghubungkan pengrajin lokal dengan pecinta budaya Nusantara.
          </p>

          {/* Social buttons */}
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            {["IG", "FB", "TW", "YT"].map((s) => (
              <button key={s} style={{
                width: "32px", height: "32px", borderRadius: "50%",
                backgroundColor: "#3d6b4f", border: "none",
                color: "#fff", fontSize: "10px", fontWeight: "700",
                cursor: "pointer"
              }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
          <FooterColumn title="WastraNusa" links={["Tentang Kami", "Misi & Visi", "Tim Kami", "Karir", "Blog"]} />
          <FooterColumn title="Belanja"    links={["Semua Produk", "Batik", "Tenun & Songket", "Kebaya & Ulos", "Promo"]} />
          <FooterColumn title="Ensiklopedia" links={["Jelajahi Artikel", "Per Wilayah", "Per Topik", "Kontribusi", "Pengrajin"]} />
          <FooterColumn title="Bantuan"   links={["Pusat Bantuan", "Cara Pemesanan", "Kebijakan Return", "Hubungi Kami", "FAQ"]} />
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #3d6b4f", paddingTop: "20px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px"
      }}>
        <span style={{ fontSize: "12px", color: "#a8b5a0" }}>
          © 2025 WastraNusa. Hak cipta dilindungi undang-undang.
        </span>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Syarat & Ketentuan", "Kebijakan Privasi", "Peta Situs"].map((item) => (
            <a key={item} href="#" style={{ fontSize: "12px", color: "#a8b5a0", textDecoration: "none" }}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// --- Main in Profile ---
export default function Profile() {
  return (
    <div style={{ backgroundColor: "#f9fafb", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Navbar />
      <Breadcrumb />
      <ProfileCard />

      // Main content area with sidebar
      <div style={{
        display: "flex", gap: "24px", alignItems: "flex-start",
        padding: "24px 32px", backgroundColor: "#f0e9e0"
      }}>
        <Sidebar active="Profil Saya" />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
          <ProfileInfoSection />
          <SecuritySection />
        </div>
      </div>
      <Footer />
    </div>
  );
}