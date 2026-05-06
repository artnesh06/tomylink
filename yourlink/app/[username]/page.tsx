"use client";
import { useState } from "react";

export default function UserPage({ params }: { params: { username: string } }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string }>>([]);
  const [emojiCounter, setEmojiCounter] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Affiliate");

  const emojis = ["❤️", "😍", "🔥", "✨", "💯"];

  const handleLike = () => {
    if (!isLiked) {
      setLikes((l) => l + 1);
      setIsLiked(true);
      for (let i = 0; i < 3; i++) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const newId = emojiCounter + i;
        setFloatingEmojis((prev) => [...prev, { id: newId, emoji: randomEmoji }]);
        setTimeout(() => {
          setFloatingEmojis((prev) => prev.filter((e) => e.id !== newId));
        }, 2000);
      }
      setEmojiCounter((c) => c + 3);
    }
  };

  const categories = ["Affiliate", "Lelang", "Digital"];

  const products = {
    Affiliate: [
      { id: 1, title: "Shopee Affiliate", subtitle: "anesh.bio/shopee", icon: "🔗", bg: "#7c5cbf" },
      { id: 2, title: "Tokopedia Affiliate", subtitle: "anesh.bio/tokped", icon: "🛒", bg: "#e05c1a" },
      { id: 3, title: "TikTok Shop", subtitle: "anesh.bio/tiktokshop", icon: "💰", bg: "#2ecc71" },
    ],
    Lelang: [
      { id: 1, title: "Nasi Ayam Geprek Spesial", subtitle: "anesh.bio/geprek", icon: "🍗", bg: "#e05c1a" },
      { id: 2, title: "Mie Goreng Jawa Premium", subtitle: "anesh.bio/miegoreng", icon: "🍜", bg: "#2ecc71" },
      { id: 3, title: "Brown Sugar Boba Milk", subtitle: "anesh.bio/boba", icon: "🧋", bg: "#ff9500" },
    ],
    Digital: [
      { id: 1, title: "Digital Art Course", subtitle: "anesh.bio/artcourse", icon: "🎨", bg: "#667eea" },
      { id: 2, title: "Design Templates", subtitle: "anesh.bio/templates", icon: "📐", bg: "#764ba2" },
      { id: 3, title: "Consultation", subtitle: "anesh.bio/consult", icon: "💬", bg: "#0066ff" },
    ],
  };

  const Content = () => (
    <div style={{ background: "#0d0d0d", minHeight: "100%" }}>
      {/* Social Icons */}
      <div style={{ padding: "16px 20px 10px", display: "flex", justifyContent: "center", gap: 22 }}>
        {["f", "▶", "◎", "♪", "⊞", "✕"].map((icon, idx) => (
          <a key={idx} href="#" style={{ fontSize: 17, color: "#ccc", textDecoration: "none" }}>
            {icon}
          </a>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: "6px 16px 14px" }}>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#555", fontSize: 14 }}>🔍</span>
          <input
            type="text"
            placeholder="Cari link..."
            style={{
              width: "100%", padding: "10px 12px 10px 36px",
              borderRadius: 12, border: "none",
              background: "#1c1c1c", color: "#fff", fontSize: 14,
              boxSizing: "border-box", outline: "none",
            }}
          />
        </div>
      </div>

      {/* Profile Card */}
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{
          background: "#1c1c1c", borderRadius: 16, padding: "14px",
          display: "flex", gap: 12, alignItems: "center",
        }}>
          <div style={{ width: 70, height: 70, borderRadius: 12, overflow: "hidden", flexShrink: 0, background: "#333" }}>
            <img
              src="https://ugc.production.linktr.ee/eba81421-5375-4371-a9b0-d6aabb91b3da_Cyborg-Male.jpeg?io=true&size=avatar-v3_0"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>Anesh Artnesh</h1>
            <p style={{ color: "#888", fontSize: 12, margin: 0, lineHeight: 1.4 }}>
              Digital creator passionate about art, design, and visu...
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0, position: "relative" }}>
            <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 0, lineHeight: 1 }}>
              {isLiked ? "❤️" : "🤍"}
            </button>
            <span style={{ color: "#888", fontSize: 11 }}>{likes}</span>
            {floatingEmojis.map((item) => (
              <span key={item.id} style={{
                position: "absolute", bottom: "100%", left: "50%",
                fontSize: 16, pointerEvents: "none",
                animation: "float-up 2s ease-out forwards",
              }}>{item.emoji}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "0 16px 16px", display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
            padding: "10px 22px", borderRadius: 24, border: "none",
            background: selectedCategory === cat
              ? (cat === "Affiliate" ? "#2ecc71" : cat === "Lelang" ? "#ff9500" : "#0066ff")
              : "#1c1c1c",
            color: "#fff", fontSize: 14, fontWeight: 600,
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ padding: "0 16px 32px" }}>
        <h2 style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: 0.5 }}>
          {selectedCategory === "Affiliate" ? "Link Terpopuler" : selectedCategory === "Lelang" ? "Menu & Produk" : "Digital Products"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {products[selectedCategory as keyof typeof products].map((product) => (
            <a key={product.id} href="#" style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 12px", background: "#1c1c1c",
              borderRadius: 12, color: "#fff", textDecoration: "none",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10,
                background: product.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>
                {product.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600, margin: "0 0 2px" }}>{product.title}</p>
                <p style={{ color: "#4a9eff", fontSize: 11, margin: 0 }}>{product.subtitle}</p>
              </div>
              <button style={{
                padding: "6px 16px", borderRadius: 20, border: "none",
                background: "#0066ff", color: "#fff",
                fontSize: 12, fontWeight: 600, cursor: "pointer", flexShrink: 0,
              }}>
                Lihat
              </button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile: full screen */}
      <div className="mobile-only">
        <Content />
      </div>

      {/* Desktop: phone frame mockup */}
      <div className="desktop-only" style={{
        background: "#888888",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 40,
        paddingBottom: 40,
      }}>
        {/* Phone Frame */}
        <div style={{
          width: 375,
          background: "#1a1a1a",
          borderRadius: 52,
          padding: "14px 8px",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 0 0 2px #444",
          position: "relative",
        }}>
          {/* Notch */}
          <div style={{
            width: 126, height: 34,
            background: "#1a1a1a",
            borderRadius: 20,
            margin: "0 auto 6px",
            position: "relative", zIndex: 10,
          }} />
          {/* Screen */}
          <div style={{
            borderRadius: 44,
            overflow: "hidden",
            background: "#0d0d0d",
            maxHeight: 760,
            overflowY: "auto",
          }}>
            <Content />
          </div>
        </div>
      </div>

      <style>{`
        .mobile-only { display: none; }
        .desktop-only { display: block; }
        @media (max-width: 768px) {
          .mobile-only { display: block; }
          .desktop-only { display: none; }
        }
        @keyframes float-up {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
        }
      `}</style>
    </>
  );
}
