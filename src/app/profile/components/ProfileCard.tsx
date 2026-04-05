// Components for Profile Card

import { User, MapPin } from "lucide-react";

// --- Profile Card ---
export default function ProfileCard() {
  return (
    <div style={{
      margin: "16px 32px", padding: "28px 32px",
      backgroundColor: "#fff", borderRadius: "12px",
      border: "1px solid #e5e7eb", fontFamily: "sans-serif",
      display: "flex", justifyContent: "space-between", alignItems: "center"
    }}>
      {/* Left: Avatar + Info */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Avatar */}
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          backgroundColor: "#f3f4f6", border: "1px solid #d1d5db",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#9ca3af"
        }}>
          <User size={32} />
        </div>

        {/* Text Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#111827" }}>
            Siti Rahayu
          </h2>
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
            ✉ a*****@gmail.com &nbsp;|&nbsp; +62 812 3456 7890
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "#6b7280", display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={13} />
            Bergabung: Januari 2024
          </p>
        </div>
      </div>

      {/* Right: Stats */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "36px", fontWeight: "800", color: "#111827" }}>12</div>
        <div style={{ fontSize: "13px", color: "#6b7280" }}>Total Pesanan</div>
      </div>
    </div>
  );
}
