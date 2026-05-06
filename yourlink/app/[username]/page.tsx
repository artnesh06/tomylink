"use client";
import { useState, useEffect, useRef } from "react";

export default function UserPage({ params }: { params: { username: string } }) {
  const [loveCount, setLoveCount] = useState(0);
  const [loveActive, setLoveActive] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; x: number; y: number; tx: number }>>([]);
  const [emojiCounter, setEmojiCounter] = useState(0);
  const [selectedCat, setSelectedCat] = useState("affiliate");
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loveRef = useRef<HTMLDivElement>(null);

  const emojiList = ["❤️", "💕", "💖", "💗", "💝", "💓", "💞", "💘"];

  const showToast = (msg: string) => {
    setToast(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2500);
  };

  const handleLove = (e: React.MouseEvent) => {
    setLoveCount((c) => c + 1);
    setLoveActive(true);
    setTimeout(() => setLoveActive(false), 600);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const tx = (Math.random() * 0.7 + 0.3) * 140;
        const newId = emojiCounter + i + Date.now();
        setFloatingEmojis((prev) => [...prev, {
          id: newId,
          emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
          x: startX, y: startY, tx,
        }]);
        setTimeout(() => setFloatingEmojis((prev) => prev.filter((e) => e.id !== newId)), 1200);
      }, i * 40);
    }
    setEmojiCounter((c) => c + 8);
    showToast(`❤️ ${loveCount + 1} orang menyukai Anesh!`);
  };

  const catData = {
    affiliate: {
      title: "Link Terpopuler",
      items: [
        { ico: "fi1", emoji: "🔗", name: "Shopee Affiliate", url: "anesh.bio/shopee", bg: "linear-gradient(135deg,#5E5CE6,#BF5AF2)" },
        { ico: "fi2", emoji: "🛍️", name: "Tokopedia Affiliate", url: "anesh.bio/tokped", bg: "linear-gradient(135deg,#FF9F0A,#FF375F)" },
        { ico: "fi3", emoji: "💰", name: "TikTok Shop", url: "anesh.bio/tiktokshop", bg: "linear-gradient(135deg,#30D158,#0A84FF)" },
        { ico: "fi4", emoji: "📦", name: "Lazada Affiliate", url: "anesh.bio/lazada", bg: "linear-gradient(135deg,#FF9F0A,#FF6B00)" },
        { ico: "fi5", emoji: "🎁", name: "Blibli Affiliate", url: "anesh.bio/blibli", bg: "linear-gradient(135deg,#BF5AF2,#5E5CE6)" },
      ],
    },
    bid: {
      title: "Lelang Aktif",
      items: [
        { name: "Cyborg Male NFT", img: "https://res.cloudinary.com/dlogqjuwl/image/upload/v1776349549/bidthings/ibg94gpeymriupdvlu2t.jpg", price: "Rp 285.000", time: "02:14:33", seller: "@anesh.artnesh", bids: "47" },
      ],
    },
    digital: {
      title: "Produk Digital",
      items: [
        { ico: "fi1", emoji: "🔤", name: "Font Pack Retro Future", url: "anesh.bio/font", bg: "linear-gradient(135deg,#5E5CE6,#BF5AF2)" },
        { ico: "fi3", emoji: "📱", name: "Mockup Bundle Vol.3", url: "anesh.bio/mockup", bg: "linear-gradient(135deg,#30D158,#0A84FF)" },
        { ico: "fi5", emoji: "⚡", name: "Icon Pack 500+", url: "anesh.bio/icon", bg: "linear-gradient(135deg,#BF5AF2,#5E5CE6)" },
        { ico: "fi2", emoji: "🖌️", name: "Brush Procreate Ink", url: "anesh.bio/brush", bg: "linear-gradient(135deg,#FF9F0A,#FF375F)" },
      ],
    },
    template: {
      title: "Template & Preset",
      items: [
        { ico: "fi2", emoji: "📄", name: "Portofolio Canva Pro", url: "anesh.bio/canva", bg: "linear-gradient(135deg,#FF9F0A,#FF375F)" },
        { ico: "fi1", emoji: "📅", name: "Content Planner Notion", url: "anesh.bio/notion", bg: "linear-gradient(135deg,#5E5CE6,#BF5AF2)" },
        { ico: "fi4", emoji: "🌅", name: "Preset Golden Hour", url: "anesh.bio/preset", bg: "linear-gradient(135deg,#FF9F0A,#FF6B00)" },
        { ico: "fi3", emoji: "🎬", name: "CapCut Pack Aesthetic", url: "anesh.bio/capcut", bg: "linear-gradient(135deg,#30D158,#0A84FF)" },
      ],
    },
    food: {
      title: "Menu & Produk",
      items: [
        { ico: "fi1", emoji: "🍗", name: "Nasi Ayam Geprek Spesial", url: "anesh.bio/geprek", bg: "linear-gradient(135deg,#FF9F0A,#FF6B00)" },
        { ico: "fi3", emoji: "🍜", name: "Mie Goreng Jawa Premium", url: "anesh.bio/miegoreng", bg: "linear-gradient(135deg,#30D158,#0A84FF)" },
        { ico: "fi4", emoji: "🧋", name: "Brown Sugar Boba Milk", url: "anesh.bio/boba", bg: "linear-gradient(135deg,#FF9F0A,#FF6B00)" },
        { ico: "fi2", emoji: "🥩", name: "Sate Ayam Madura", url: "anesh.bio/sate", bg: "linear-gradient(135deg,#FF9F0A,#FF375F)" },
      ],
    },
  };

  const cats = [
    { key: "affiliate", label: "Affiliate", bg: "linear-gradient(135deg,#34D058,#1a9e3f)" },
    { key: "bid", label: "Lelang", bg: "linear-gradient(135deg,#FF9500,#FF5E00)" },
    { key: "digital", label: "Digital", bg: "linear-gradient(135deg,#1E90FF,#0055CC)" },
    { key: "template", label: "Template", bg: "linear-gradient(135deg,#FF9500,#FF5E00)" },
    { key: "food", label: "Delivery", bg: "linear-gradient(135deg,#AF52DE,#7B2FBE)" },
  ];

  const currentCat = catData[selectedCat as keyof typeof catData];

  const Content = () => (
    <div style={{ width: "100%", maxWidth: 430, margin: "0 auto", background: "#000", minHeight: "100vh", position: "relative", overflowX: "hidden", fontFamily: "-apple-system,'Helvetica Neue',sans-serif" }}>

      {/* Social Icons Header */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 16, padding: "56px 20px 16px", background: "#000", flexWrap: "wrap" }}>
        {[
          <svg key="fb" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
          <svg key="yt" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff" stroke="#fff" strokeWidth="1.5"/></svg>,
          <svg key="wa" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
          <svg key="tt" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
          <svg key="ig" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#fff"/></svg>,
          <svg key="x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M20 4L4 20"/></svg>,
        ].map((icon, idx) => (
          <a key={idx} href="#" onClick={(e) => { e.preventDefault(); showToast("Link dibuka!"); }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "transform .2s, opacity .2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Search Box */}
      <div style={{ margin: "0 16px 28px", background: "#1c1c1e", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: "#636366", fontSize: 18 }}>🔍</span>
        <input type="text" placeholder="Cari link..." style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontSize: 15, outline: "none", fontFamily: "inherit" }} />
      </div>

      {/* Profile Card */}
      <div ref={loveRef} style={{ margin: "0 16px 28px", background: "#1c1c1e", borderRadius: 20, padding: "0 16px 0 0", display: "flex", alignItems: "center", gap: 8, height: 100, overflow: "hidden" }}>
        <img
          src="https://pbs.twimg.com/profile_images/2042441264453599233/foTV-yAr_400x400.jpg"
          alt="pfp"
          style={{ width: 80, height: 80, borderRadius: 16, objectFit: "cover", flexShrink: 0, border: "2px solid rgba(255,255,255,.1)", margin: "0 12px" }}
        />
        <div style={{ flex: 1, minWidth: 0, paddingRight: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4, letterSpacing: -0.3 }}>Anesh Artnesh</div>
          <div style={{ fontSize: 13, color: "#636366", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden", lineHeight: 1.3 }}>
            Digital creator passionate about art, design, and visual storytelling through photography and illustration
          </div>
        </div>
        <div onClick={handleLove} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", userSelect: "none", marginRight: 20, flexShrink: 0 }}>
          <svg style={{ width: 24, height: 24, display: "block", fill: loveActive ? "#FF375F" : "#636366", transition: "fill .2s, transform .2s", transform: loveActive ? "scale(1.2)" : "scale(1)" }} viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span style={{ fontSize: 11, fontWeight: 400, color: "#636366" }}>{loveCount}</span>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", gap: 12, padding: "4px 16px 32px", overflowX: "auto", scrollbarWidth: "none", scrollSnapType: "x mandatory" }}>
        {cats.map((cat) => (
          <div
            key={cat.key}
            onClick={() => setSelectedCat(cat.key)}
            style={{
              width: 120, height: 60, borderRadius: 16, flexShrink: 0,
              cursor: "pointer", position: "relative", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 10, transition: "transform 0.2s", userSelect: "none",
              background: cat.bg,
              border: selectedCat === cat.key ? "1.5px solid rgba(255,255,255,.4)" : "1.5px solid transparent",
              boxShadow: selectedCat === cat.key ? "0 0 14px rgba(255,255,255,.12)" : "none",
              scrollSnapAlign: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", position: "relative", zIndex: 1, textAlign: "center" }}>{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Link List */}
      <div style={{ margin: "0 16px 28px", background: "#1c1c1e", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "16px 16px 12px" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: -0.3 }}>{currentCat.title}</div>
        </div>
        <div style={{ padding: "0 16px 12px" }}>
          {selectedCat === "bid" ? (
            // Auction format
            (currentCat.items as Array<{ name: string; img: string; price: string; time: string; seller: string; bids: string }>).map((item) => (
              <div key={item.name} style={{ marginBottom: 16, cursor: "pointer" }}>
                <div style={{ background: `url('${item.img}') center/cover`, borderRadius: 16, height: 350, width: "100%" }} />
                <div style={{ padding: "16px 0 0" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "#636366", marginBottom: 16 }}>oleh {item.seller} · {item.bids} penawar aktif</div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                    <div style={{ flex: 1, background: "#000", borderRadius: 12, padding: "10px 14px" }}>
                      <div style={{ fontSize: 11, color: "#636366", marginBottom: 4 }}>Harga tertinggi</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#BF5AF2" }}>{item.price}</div>
                    </div>
                    <div style={{ flex: 1, background: "#2d0a0a", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(255,55,95,.2)" }}>
                      <div style={{ fontSize: 11, color: "#FF375F", marginBottom: 4, opacity: 0.8 }}>⏱ Sisa waktu</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: "#FF6B8A" }}>{item.time}</div>
                    </div>
                  </div>
                  <button onClick={() => showToast("🔨 Bid modal akan muncul!")} style={{ width: "100%", padding: 15, background: "linear-gradient(135deg,#5E5CE6,#BF5AF2)", border: "none", borderRadius: 14, color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    🔨 Pasang Bid Sekarang
                  </button>
                </div>
              </div>
            ))
          ) : (
            // Normal link format
            (currentCat.items as Array<{ emoji: string; name: string; url: string; bg: string }>).map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: "none", cursor: "pointer", borderRadius: 12, transition: "all .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,.06)"; e.currentTarget.style.padding = "14px 8px"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.padding = "14px 0"; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: item.bg, boxShadow: "0 4px 12px rgba(0,0,0,.3)" }}>
                  {item.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 3, letterSpacing: -0.2 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "#0A84FF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", opacity: 0.8 }}>{item.url}</div>
                </div>
                <button onClick={() => showToast("Membuka link...")} style={{ background: "linear-gradient(135deg,#0A84FF,#0066CC)", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, padding: "8px 18px", borderRadius: 16, cursor: "pointer", fontFamily: "inherit", flexShrink: 0, boxShadow: "0 2px 8px rgba(10,132,255,.2)" }}>
                  Lihat
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: "32px 16px 48px", textAlign: "center", background: "#000" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,.4)" }}>
          {["Cookie Preferences", "Report", "Privacy", "Explore"].map((link, i, arr) => (
            <span key={link} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <a href="#" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>{link}</a>
              {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,.2)" }}>•</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Home Bar */}
      <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 28px", background: "#000" }}>
        <div style={{ width: 134, height: 5, background: "rgba(255,255,255,.3)", borderRadius: 3 }} />
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Emojis - fixed position */}
      {floatingEmojis.map((item) => (
        <div key={item.id} style={{
          position: "fixed", left: item.x, top: item.y,
          fontSize: 20, pointerEvents: "none",
          animation: `loveup 1.2s cubic-bezier(.25,.46,.45,.94) forwards`,
          zIndex: 9999,
          ["--tx" as string]: `${item.tx}px`,
        }}>
          {item.emoji}
        </div>
      ))}

      {/* Toast */}
      <div style={{
        position: "fixed", bottom: 100, left: "50%", transform: "translateX(-50%)",
        background: "rgba(44,44,46,.95)", backdropFilter: "blur(20px)",
        color: "#fff", padding: "10px 22px", borderRadius: 20,
        fontSize: 14, fontWeight: 600, whiteSpace: "nowrap",
        opacity: toastVisible ? 1 : 0, transition: "opacity .3s",
        pointerEvents: "none", zIndex: 300, maxWidth: "90vw",
      }}>
        {toast}
      </div>

      {/* Mobile: full screen */}
      <div className="mobile-only">
        <Content />
      </div>

      {/* Desktop: phone frame */}
      <div className="desktop-only" style={{ background: "#b0b0b0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
        <div style={{ position: "relative", width: 393, flexShrink: 0 }}>
          {/* Notch */}
          <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#1a1a1a", borderRadius: 20, zIndex: 100, pointerEvents: "none" }} />
          {/* Side buttons */}
          <div style={{ position: "absolute", left: -12, top: 140, width: 4, height: 36, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
          <div style={{ position: "absolute", left: -12, top: 186, width: 4, height: 36, background: "#2a2a2a", borderRadius: "2px 0 0 2px" }} />
          <div style={{ position: "absolute", right: -12, top: 160, width: 4, height: 60, background: "#2a2a2a", borderRadius: "0 2px 2px 0" }} />
          {/* Phone screen */}
          <div style={{ width: 393, height: 820, borderRadius: 50, overflow: "hidden", boxShadow: "0 0 0 10px #1a1a1a, 0 0 0 12px #3a3a3a, 0 40px 80px rgba(0,0,0,.5)", position: "relative", background: "#000" }}>
            <div style={{ width: "100%", height: "100%", overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none" }}>
              <Content />
            </div>
          </div>
        </div>

        {/* QR Panel */}
        <div style={{ position: "fixed", bottom: 28, right: 28, background: "#fff", borderRadius: 16, padding: "14px 16px 12px", boxShadow: "0 4px 24px rgba(0,0,0,.18)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 9999 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#333", letterSpacing: ".02em" }}>View on mobile</div>
          <div style={{ width: 100, height: 100, background: "#f0f0f0", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#999" }}>QR Code</div>
        </div>
      </div>

      <style>{`
        .mobile-only { display: none; }
        .desktop-only { display: block; }
        @media (max-width: 768px) {
          .mobile-only { display: block; }
          .desktop-only { display: none; }
        }
        @keyframes loveup {
          0% { opacity: 1; transform: translateY(0) translateX(0) scale(1); }
          100% { opacity: 0; transform: translateY(-80px) translateX(var(--tx)) scale(0); }
        }
        input::placeholder { color: #636366; }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
