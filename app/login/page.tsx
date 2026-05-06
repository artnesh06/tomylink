"use client";
// Login page

export default function LoginPage() {
  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>YourLink</h1>
        <p style={{ color: "#636366", marginBottom: 32 }}>Login to manage your bio link</p>
        <button style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#5E5CE6,#BF5AF2)", border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
          Login with Google
        </button>
      </div>
    </div>
  );
}
