"use client";
import { useState } from "react";

// SVG Social Icons
const Icons = {
  Facebook: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  YouTube: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0d0d0d"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
    </svg>
  ),
  TikTok: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

export default function UserPage({ params }: { params: { username: string } }) {
  const [likes, setLikes] = useState(248);
  const [isLiked, setIsLiked] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; x: number }>>([]);
  const [emojiCounter, setEmojiCounter] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Affiliate");

  const emojis = ["❤️", "😍", "🔥", "✨", "💯", "🎉"];

  const handleLike = () => {
    if (!isLiked) {
      setLikes((l) => l + 1);
      setIsLiked(true);
      for (let i = 0; i < 4; i++) {
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        const newId = emojiCounter + i;
        const x = (Math.random() - 0.5) * 40;
        setFloatingEmojis((prev) => [...prev, { id: newId, emoji: randomEmoji, x }]);
        setTimeout(() => {
          setFloatingEmojis((prev) => prev.filter((e) => e.id !== newId));
        }, 1800);
      }
      setEmojiCounter((c) => c + 4);
    }
  };

  const categories = ["Affiliate", "Lelang", "Digital"];

  const catColors: Record<string, string> = {
    Affiliate: "#2ecc71",
    Lelang: "#ff9500",
    Digital: "#4f8ef7",
  };

  const products = {
    Affiliate: [
      { id: 1, title: "Shopee Affiliate", subtitle: "anesh.bio/shopee", icon: "🔗", bg: "linear-gradient(135deg,#7c5cbf,#a855f7)" },
      { id: 2, title: "Tokopedia Affiliate", subtitle: "anesh.bio/tokped", icon: "🛒", bg: "linear-gradient(135deg,#e05c1a,#f97316)" },
      { id: 3, title: "TikTok Shop", subtitle: "anesh.bio/tiktokshop", icon: "💰", bg: "linear-gradient(135deg,#16a34a,#2ecc71)" },
    ],
    Lelang: [
      { id: 1, title: "Nasi Ayam Geprek Spesial", subtitle: "anesh.bio/geprek", icon: "🍗", bg: "linear-gradient(135deg,#e05c1a,#f97316)" },
      { id: 2, title: "Mie Goreng Jawa Premium", subtitle: "anesh.bio/miegoreng", icon: "🍜", bg: "linear-gradient(135deg,#16a34a,#2ecc71)" },
      { id: 3, title: "Brown Sugar Boba Milk", subtitle: "anesh.bio/boba", icon: "🧋", bg: "linear-gradient(135deg,#d97706,#ff9500)" },
    ],
    Digital: [
      { id: 1, title: "Digital Art Course", subtitle: "anesh.bio/artcourse", icon: "🎨", bg: "linear-gradient(135deg,#4f46e5,#667eea)" },
      { id: 2, title: "Design Templates", subtitle: "anesh.bio/templates", icon: "📐", bg: "linear-gradient(135deg,#6d28d9,#764ba2)" },
      { id: 3, title: "Consultation", subtitle: "anesh.bio/consult", icon: "💬", bg: "linear-gradient(135deg,#1d4ed8,#4f8ef7)" },
    ],
  };

  const socialLinks = [
    { Icon: Icons.Facebook, href: "#", label: "Facebook" },
    { Icon: Icons.YouTube, href: "#", label: "YouTube" },
    { Icon: Icons.WhatsApp, href: "#", label: "WhatsApp" },
    { Icon: Icons.TikTok, href: "#", label: "TikTok" },
    { Icon: Icons.Instagram, href: "#", label: "Instagram" },
    { Icon: Icons.X, href: "#", label: "X" },
  ];

  const Content = () => (
    <div style={{ background: "#0d0d0d", minHeight: "100%", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Social Icons */}
      <div style={{ padding: "20px 20px 12px", display: "flex", justifyContent: "center", gap: 24 }}>
        {socialLinks.map(({ Icon, href, label }) => (
          <a key={label} href={href} aria-label={label} style={{ color: "#aaa", textDecoration: "none", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Search */}
      <div style={{ padding: "4px 16px 16px" }}>
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#555" }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Cari link..." style={{
            width: "100%", padding: "11px 14px 11px 36px",
            borderRadius: 14, border: "1px solid #222",
            background: "#181818", color: "#fff", fontSize: 13,
            boxSizing: "border-box", outline: "none",
            transition: "border-color 0.2s",
          }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#444")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#222")}
          />
        </div>
      </div>

      {/* Profile Card */}
      <div style={{ padding: "0 16px 18px" }}>
        <div style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #161616 100%)",
          borderRadius: 18, padding: "16px",
          display: "flex", gap: 14, alignItems: "center",
          border: "1px solid #252525",
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}>
          {/* Avatar */}
          <div style={{
            width: 72, height: 72, borderRadius: 14,
            overflow: "hidden", flexShrink: 0,
            boxShadow: "0 0 0 2px #333",
          }}>
            <img
              src="https://ugc.production.linktr.ee/eba81421-5375-4371-a9b0-d6aabb91b3da_Cyborg-Male.jpeg?io=true&size=avatar-v3_0"
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: "0 0 5px", letterSpacing: -0.3 }}>
              Anesh Artnesh
            </h1>
            <p style={{ color: "#777", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
              Digital creator · Art & Design
            </p>
          </div>

          {/* Like Button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flexShrink: 0, position: "relative" }}>
            <button
              onClick={handleLike}
              style={{
                background: isLiked ? "rgba(255,60,80,0.15)" : "rgba(255,255,255,0.06)",
                border: isLiked ? "1px solid rgba(255,60,80,0.3)" : "1px solid #2a2a2a",
                borderRadius: 10, width: 36, height: 36,
                cursor: "pointer", fontSize: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.25s ease",
                transform: isLiked ? "scale(1.05)" : "scale(1)",
              }}
            >
              {isLiked ? "❤️" : "🤍"}
            </button>
            <span style={{ color: "#666", fontSize: 11, fontWeight: 500 }}>{likes}</span>

            {/* Floating Emojis */}
            {floatingEmojis.map((item) => (
              <span key={item.id} style={{
                position: "absolute", bottom: "110%",
                left: `calc(50% + ${item.x}px)`,
                fontSize: 15, pointerEvents: "none",
                animation: "float-up 1.8s ease-out forwards",
                zIndex: 10,
              }}>{item.emoji}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: "0 16px 18px", display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
            padding: "9px 20px", borderRadius: 24,
            border: selectedCategory === cat ? "none" : "1px solid #252525",
            background: selectedCategory === cat ? catColors[cat] : "#161616",
            color: "#fff", fontSize: 13, fontWeight: 600,
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            transition: "all 0.2s ease",
            boxShadow: selectedCategory === cat ? `0 4px 16px ${catColors[cat]}55` : "none",
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Section Title */}
      <div style={{ padding: "0 16px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 3, height: 14, borderRadius: 2, background: catColors[selectedCategory] }} />
        <h2 style={{ color: "#fff", fontSize: 12, fontWeight: 700, margin: 0, textTransform: "uppercase", letterSpacing: 0.8 }}>
          {selectedCategory === "Affiliate" ? "Link Terpopuler" : selectedCategory === "Lelang" ? "Menu & Produk" : "Digital Products"}
        </h2>
      </div>

      {/* Products */}
      <div style={{ padding: "0 16px 36px", display: "flex", flexDirection: "column", gap: 10 }}>
        {products[selectedCategory as keyof typeof products].map((product, idx) => (
          <a key={product.id} href="#" style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 12px", background: "#161616",
            borderRadius: 14, color: "#fff", textDecoration: "none",
            border: "1px solid #222",
            transition: "all 0.2s ease",
            animation: `slide-in 0.3s ease ${idx * 0.05}s both`,
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e1e1e";
              e.currentTarget.style.borderColor = "#333";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#161616";
              e.currentTarget.style.borderColor = "#222";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Icon */}
            <div style={{
              width: 50, height: 50, borderRadius: 12,
              background: product.bg,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}>
              {product.icon}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ color: "#f0f0f0", fontSize: 14, fontWeight: 600, margin: "0 0 3px", letterSpacing: -0.2 }}>
                {product.title}
              </p>
              <p style={{ color: "#4a9eff", fontSize: 11, margin: 0, fontWeight: 400 }}>
                {product.subtitle}
              </p>
            </div>

            {/* Button */}
            <button style={{
              padding: "7px 16px", borderRadius: 20, border: "none",
              background: "linear-gradient(135deg, #1d4ed8, #4f8ef7)",
              color: "#fff", fontSize: 12, fontWeight: 600,
              cursor: "pointer", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(79,142,247,0.35)",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Lihat
            </button>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 16px 20px", textAlign: "center", borderTop: "1px solid #1a1a1a" }}>
        <p style={{ color: "#333", fontSize: 11, margin: 0, letterSpacing: 0.3 }}>
          tomylink.vercel.app · @{params.username}
        </p>
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
        background: "linear-gradient(135deg, #7a7a7a 0%, #9a9a9a 50%, #7a7a7a 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: 48,
        paddingBottom: 48,
      }}>
        {/* Phone Frame */}
        <div style={{
          width: 380,
          background: "#111",
          borderRadius: 54,
          padding: "16px 8px",
          boxShadow: "0 50px 120px rgba(0,0,0,0.7), inset 0 0 0 1.5px #3a3a3a, inset 0 0 0 3px #1a1a1a",
          position: "relative",
        }}>
          {/* Side buttons */}
          <div style={{ position: "absolute", left: -3, top: 100, width: 3, height: 32, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
          <div style={{ position: "absolute", left: -3, top: 144, width: 3, height: 56, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
          <div style={{ position: "absolute", left: -3, top: 210, width: 3, height: 56, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
          <div style={{ position: "absolute", right: -3, top: 160, width: 3, height: 72, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />

          {/* Notch */}
          <div style={{
            width: 120, height: 32,
            background: "#111",
            borderRadius: 20,
            margin: "0 auto 8px",
            position: "relative", zIndex: 10,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#1e1e1e", border: "1px solid #2a2a2a" }} />
            <div style={{ width: 40, height: 6, borderRadius: 3, background: "#1e1e1e" }} />
          </div>

          {/* Screen */}
          <div style={{
            borderRadius: 44,
            overflow: "hidden",
            background: "#0d0d0d",
            maxHeight: 780,
            overflowY: "auto",
            scrollbarWidth: "none",
          }}>
            <Content />
          </div>

          {/* Home indicator */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 10 }}>
            <div style={{ width: 100, height: 4, borderRadius: 2, background: "#2a2a2a" }} />
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
          0% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
          60% { opacity: 1; }
          100% { opacity: 0; transform: translateX(-50%) translateY(-55px) scale(0.7); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </>
  );
}
