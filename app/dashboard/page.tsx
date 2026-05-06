"use client";
import { useState } from "react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [profileData, setProfileData] = useState({
    name: "Anesh Artnesh",
    bio: "Digital creator passionate about art, design, and visual storytelling",
    email: "anesh@example.com",
    phone: "+62 812 3456 7890",
  });

  const [isEditing, setIsEditing] = useState(false);

  const earnings = {
    total: 2500000,
    thisMonth: 450000,
    pending: 125000,
  };

  const referrals = [
    { id: 1, name: "User 1", earnings: 50000, date: "2026-05-01" },
    { id: 2, name: "User 2", earnings: 75000, date: "2026-04-28" },
    { id: 3, name: "User 3", earnings: 30000, date: "2026-04-25" },
  ];

  const links = [
    { id: 1, title: "Shopee Affiliate", clicks: 234, earnings: 125000 },
    { id: 2, title: "Tokopedia Affiliate", clicks: 156, earnings: 89000 },
    { id: 3, title: "TikTok Shop", clicks: 89, earnings: 45000 },
  ];

  return (
    <div style={{ background: "#000", minHeight: "100vh", display: "flex", justifyContent: "center", paddingBottom: 40 }}>
      <div style={{ width: "100%", maxWidth: 430 }}>
        {/* Header */}
        <div style={{ padding: "16px", borderBottom: "1px solid #222" }}>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>Dashboard</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #222", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {["overview", "profile", "earnings", "referrals"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "12px 16px",
                border: "none",
                background: "none",
                color: activeTab === tab ? "#fff" : "#666",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                borderBottom: activeTab === tab ? "2px solid #667eea" : "none",
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "16px" }}>
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div>
              {/* Earnings Summary */}
              <div style={{ marginBottom: 20 }}>
                <h2 style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: "0 0 12px", textTransform: "uppercase" }}>
                  Earnings Summary
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: 12,
                      padding: 16,
                      color: "#fff",
                    }}
                  >
                    <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, margin: "0 0 4px" }}>Total Earnings</p>
                    <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 700, margin: 0 }}>
                      Rp {earnings.total.toLocaleString("id-ID")}
                    </h3>
                  </div>

                  <div style={{ display: "flex", gap: 10 }}>
                    <div
                      style={{
                        flex: 1,
                        background: "#111",
                        border: "1px solid #222",
                        borderRadius: 12,
                        padding: 12,
                      }}
                    >
                      <p style={{ color: "#999", fontSize: 11, margin: "0 0 4px" }}>This Month</p>
                      <p style={{ color: "#2ecc71", fontSize: 16, fontWeight: 600, margin: 0 }}>
                        Rp {earnings.thisMonth.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: "#111",
                        border: "1px solid #222",
                        borderRadius: 12,
                        padding: 12,
                      }}
                    >
                      <p style={{ color: "#999", fontSize: 11, margin: "0 0 4px" }}>Pending</p>
                      <p style={{ color: "#ff9500", fontSize: 16, fontWeight: 600, margin: 0 }}>
                        Rp {earnings.pending.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Links */}
              <div>
                <h2 style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: "0 0 12px", textTransform: "uppercase" }}>
                  Top Links
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {links.map((link) => (
                    <div
                      key={link.id}
                      style={{
                        background: "#111",
                        border: "1px solid #222",
                        borderRadius: 12,
                        padding: 12,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0 }}>{link.title}</p>
                        <p style={{ color: "#667eea", fontSize: 13, fontWeight: 600, margin: 0 }}>
                          Rp {link.earnings.toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p style={{ color: "#999", fontSize: 12, margin: 0 }}>{link.clicks} clicks</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    margin: "0 0 16px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="https://ugc.production.linktr.ee/eba81421-5375-4371-a9b0-d6aabb91b3da_Cyborg-Male.jpeg?io=true&size=avatar-v3_0"
                    alt="Profile"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <button
                  style={{
                    padding: "8px 16px",
                    borderRadius: 8,
                    border: "1px solid #333",
                    background: "#111",
                    color: "#fff",
                    fontSize: 12,
                    cursor: "pointer",
                    marginBottom: 20,
                  }}
                >
                  Change Photo
                </button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ color: "#999", fontSize: 12, display: "block", marginBottom: 4 }}>Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #222",
                      background: "#111",
                      color: "#fff",
                      fontSize: 14,
                      boxSizing: "border-box",
                      cursor: isEditing ? "text" : "default",
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: "#999", fontSize: 12, display: "block", marginBottom: 4 }}>Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #222",
                      background: "#111",
                      color: "#fff",
                      fontSize: 14,
                      boxSizing: "border-box",
                      minHeight: 80,
                      resize: "vertical",
                      cursor: isEditing ? "text" : "default",
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: "#999", fontSize: 12, display: "block", marginBottom: 4 }}>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #222",
                      background: "#111",
                      color: "#fff",
                      fontSize: 14,
                      boxSizing: "border-box",
                      cursor: isEditing ? "text" : "default",
                    }}
                  />
                </div>

                <div>
                  <label style={{ color: "#999", fontSize: 12, display: "block", marginBottom: 4 }}>Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    disabled={!isEditing}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: "1px solid #222",
                      background: "#111",
                      color: "#fff",
                      fontSize: 14,
                      boxSizing: "border-box",
                      cursor: isEditing ? "text" : "default",
                    }}
                  />
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: isEditing ? "#2ecc71" : "#667eea",
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: 8,
                  }}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </button>
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <div>
              <h2 style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: "0 0 12px", textTransform: "uppercase" }}>
                Earnings History
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <div
                    key={link.id}
                    style={{
                      background: "#111",
                      border: "1px solid #222",
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0 }}>{link.title}</p>
                      <p style={{ color: "#2ecc71", fontSize: 13, fontWeight: 600, margin: 0 }}>
                        +Rp {link.earnings.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <p style={{ color: "#999", fontSize: 12, margin: 0 }}>May 1, 2026</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === "referrals" && (
            <div>
              <div style={{ marginBottom: 20, background: "#111", border: "1px solid #222", borderRadius: 12, padding: 12 }}>
                <p style={{ color: "#999", fontSize: 12, margin: "0 0 8px" }}>Your Referral Link</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value="https://tomylink.vercel.app/ref/anesh"
                    readOnly
                    style={{
                      flex: 1,
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "1px solid #333",
                      background: "#000",
                      color: "#667eea",
                      fontSize: 12,
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    style={{
                      padding: "8px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: "#667eea",
                      color: "#fff",
                      fontSize: 12,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <h2 style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: "0 0 12px", textTransform: "uppercase" }}>
                Referrals
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {referrals.map((ref) => (
                  <div
                    key={ref.id}
                    style={{
                      background: "#111",
                      border: "1px solid #222",
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0 }}>{ref.name}</p>
                      <p style={{ color: "#2ecc71", fontSize: 13, fontWeight: 600, margin: 0 }}>
                        +Rp {ref.earnings.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <p style={{ color: "#999", fontSize: 12, margin: 0 }}>{ref.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
