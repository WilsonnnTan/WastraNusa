// Components for Profile Info Section

// --- Info Field ---
function InfoField({ label, value }: { label: string; value: string}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "13px", color: "#6b7280" }}>{label}</label>
      <div style={{
        padding: "10px 16px",
        backgroundColor: "#f5f0eb",
        borderRadius: "10px",
        fontSize: "14px", color: "#374151"
      }}>
        {value}
      </div>
    </div>
  );
}

// --- Profile Info Section ---
export default function ProfileInfoSection() {
  return (
    <div style={{
      backgroundColor: "#fff", borderRadius: "16px",
      padding: "28px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#3d6b4f" }}>Informasi Profil</h2>
        <button style={{
          display: "flex", alignItems: "center", gap: "6px",
          padding: "8px 16px", fontSize: "13px",
          border: "1px solid #d1d5db", borderRadius: "10px",
          backgroundColor: "#fff", color: "#3d6b4f", cursor: "pointer"
        }}>
          ✏️ Edit Profil
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <InfoField label="Nama Lengkap"  value="Siti Rahayu" />
        <InfoField label="Nomor Telepon" value="+62 812 3456 7890" />
        <InfoField label="Email"         value="sitirahayu@gmail.com" />
        <InfoField label="Jenis Kelamin" value="Perempuan" />
      </div>
      <div style={{ marginTop: "16px" }}>
        <InfoField label="Tanggal Lahir" value="12 Januari 1995" />
      </div>
    </div>
  );
}