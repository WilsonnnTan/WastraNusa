import { BookOpen, User, MapPin, ShoppingBag, LogOut } from "lucide-react";

// --- Sidebar ---
export default function Sidebar({ active }: { active: string }) {
  const items = [
    { icon: <User size={16} />,        label: "Profil Saya",      badge: null },
    { icon: <ShoppingBag size={16} />, label: "Pesanan Saya",     badge: null },
    { icon: <MapPin size={16} />,      label: "Alamat Tersimpan", badge: null },
    { icon: <BookOpen size={16} />,    label: "Artikel Disukai",  badge: null },
    { icon: <LogOut size={16} />,      label: "Keluar",           badge: null },
  ];

  return (
    <div style={{
      width: "200px", backgroundColor: "#fff",
      borderRadius: "14px", padding: "8px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)", alignSelf: "flex-start"
    }}>
      {items.map(({ icon, label, badge }) => (
        <div key={label} style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 14px", borderRadius: "10px", cursor: "pointer",
          backgroundColor: label === active ? "#f5f0eb" : "transparent",  // active highlight
          fontSize: "14px", color: "#374151",
          transition: "background 0.15s"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {icon}
            {label}
          </div>
          {badge && (
            <span style={{
              backgroundColor: "#3d6b4f", color: "#fff",
              borderRadius: "999px", fontSize: "11px",
              padding: "2px 7px", fontWeight: "600"
            }}>
              {badge}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}