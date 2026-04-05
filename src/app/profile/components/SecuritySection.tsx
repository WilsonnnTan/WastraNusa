// Components for Security Section

import { ReactNode } from "react";
import { Lock, CheckCircle, Key } from "lucide-react";

// --- Security Row ---
function SecurityRow({ icon, title, subtitle, action }: { icon: ReactNode; title: string; subtitle?: string; action?: string}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 18px", backgroundColor: "#f5f0eb",
      borderRadius: "10px"               // rounded
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {icon}
        <div>
          <div style={{ fontSize: "13px", fontWeight: "500", color: "#374151" }}>{title}</div>
          {subtitle && <div style={{ fontSize: "12px", color: "#b45309" }}>{subtitle}</div>}
        </div>
      </div>
      {action && (
        <button style={{
          padding: "6px 14px", fontSize: "12px",
          border: "1px solid #d1d5db", borderRadius: "8px",
          backgroundColor: "#fff", cursor: "pointer", color: "#374151"
        }}>
          {action}
        </button>
      )}
    </div>
  );
}

// --- Security Section ---
export default function SecuritySection() {
  return (
    <div style={{
      backgroundColor: "#fff", borderRadius: "16px",
      padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px", color: "#3d6b4f" }}>
          <Lock size={18} /> Keamanan Akun
        </h2>
        <button style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 16px", fontSize: "13px",
          border: "1px solid #d1d5db", borderRadius: "10px",
          backgroundColor: "#fff", color: "#3d6b4f", cursor: "pointer"
        }}>
          🔑 Ubah Password
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <SecurityRow icon={<Lock size={16} />}        title="Password"        subtitle="••••••••••••" />
        <SecurityRow icon={<CheckCircle size={16} />} title="Login Terakhir"  subtitle="20 Mar 2025, 09:15 dari Yogyakarta, Indonesia" />
        <SecurityRow
          icon={<Key size={16} />}
          title="Verifikasi Email Anda"
          subtitle="Belum aktif — disarankan untuk keamanan tambahan"
          action="Aktifkan"
        />
      </div>
    </div>
  );
}
