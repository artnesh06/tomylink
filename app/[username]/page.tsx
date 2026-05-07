"use client";
import { useState, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type LinkItem = {
  id: string;
  ico: string;
  emoji: string;
  name: string;
  url: string;
  img?: string;
  price?: string;
  time?: string;
  seller?: string;
  bids?: string;
};

type CatData = {
  title: string;
  items: LinkItem[];
};

export default function UserPage({ params }: { params: { username: string } }) {
  // ── Edit mode state ──────────────────────────────────────────────────────
  const isOwner = true; // TODO: replace with real auth check
  const [editMode, setEditMode] = useState(false);

  // ── Profile editable fields ──────────────────────────────────────────────
  const [profileName, setProfileName] = useState("Anesh Artnesh");
  const [profileBio, setProfileBio] = useState("Digital creator passionate about art, design, and visual storytelling");
  const [editingField, setEditingField] = useState<string | null>(null);

  // ── General state ────────────────────────────────────────────────────────
  const [loveCount, setLoveCount] = useState(0);
  const [selectedCat, setSelectedCat] = useState("affiliate");
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2500);
  };

  const handleLove = (e: React.MouseEvent) => {
    const newCount = loveCount + 1;
    setLoveCount(newCount);
    const emojiList = ["❤️","💕","��","💗","💝","💓","💞","💘"];
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const el = document.createElement("div");
        el.className = "love-emoji";
        el.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];
        const tx = (Math.random() * 0.7 + 0.3) * 140;
        el.style.left = startX + "px";
        el.style.top = startY + "px";
        el.style.setProperty("--tx", tx + "px");
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1200);
      }, i * 40);
    }
    showToast(`❤️ ${newCount} orang menyukai Anesh!`);
  };

  const cats = [
    { key: "affiliate", label: "Affiliate", cls: "c1" },
    { key: "bid",       label: "Lelang",    cls: "c2" },
    { key: "digital",   label: "Digital",   cls: "c3" },
    { key: "template",  label: "Template",  cls: "c2" },
    { key: "food",      label: "Delivery",  cls: "c5" },
  ];

  const [catData, setCatData] = useState<Record<string, CatData>>({
    affiliate: {
      title: "Link Terpopuler",
      items: [
        { id:"a1", ico:"fi1", emoji:"🔗", name:"Shopee Affiliate",    url:"anesh.bio/shopee" },
        { id:"a2", ico:"fi2", emoji:"🛍️", name:"Tokopedia Affiliate", url:"anesh.bio/tokped" },
        { id:"a3", ico:"fi3", emoji:"💰", name:"TikTok Shop",         url:"anesh.bio/tiktokshop" },
        { id:"a4", ico:"fi4", emoji:"📦", name:"Lazada Affiliate",    url:"anesh.bio/lazada" },
        { id:"a5", ico:"fi5", emoji:"🎁", name:"Blibli Affiliate",    url:"anesh.bio/blibli" },
        { id:"a6", ico:"fi1", emoji:"🏪", name:"Bukalapak Affiliate", url:"anesh.bio/bukalapak" },
      ],
    },
    bid: {
      title: "Lelang Aktif",
      items: [
        { id:"b1", ico:"fi1", emoji:"🎨", name:"Cyborg Male NFT", url:"anesh.bio/lelang",
          img:"https://res.cloudinary.com/dlogqjuwl/image/upload/v1776349549/bidthings/ibg94gpeymriupdvlu2t.jpg",
          price:"Rp 285.000", time:"02:14:33", seller:"@anesh.artnesh", bids:"47" },
      ],
    },
    digital: {
      title: "Produk Digital",
      items: [
        { id:"d1", ico:"fi1", emoji:"🔤", name:"Font Pack Retro Future", url:"anesh.bio/font" },
        { id:"d2", ico:"fi3", emoji:"📱", name:"Mockup Bundle Vol.3",    url:"anesh.bio/mockup" },
        { id:"d3", ico:"fi5", emoji:"⚡", name:"Icon Pack 500+",         url:"anesh.bio/icon" },
        { id:"d4", ico:"fi2", emoji:"🖌️", name:"Brush Procreate Ink",   url:"anesh.bio/brush" },
      ],
    },
    template: {
      title: "Template & Preset",
      items: [
        { id:"t1", ico:"fi2", emoji:"📄", name:"Portofolio Canva Pro",    url:"anesh.bio/canva" },
        { id:"t2", ico:"fi1", emoji:"📅", name:"Content Planner Notion",  url:"anesh.bio/notion" },
        { id:"t3", ico:"fi4", emoji:"🌅", name:"Preset Golden Hour",      url:"anesh.bio/preset" },
        { id:"t4", ico:"fi3", emoji:"🎬", name:"CapCut Pack Aesthetic",   url:"anesh.bio/capcut" },
      ],
    },
    food: {
      title: "Menu & Produk",
      items: [
        { id:"f1", ico:"fi1", emoji:"🍗", name:"Nasi Ayam Geprek Spesial", url:"anesh.bio/geprek" },
        { id:"f2", ico:"fi3", emoji:"🍜", name:"Mie Goreng Jawa Premium",  url:"anesh.bio/miegoreng" },
        { id:"f3", ico:"fi4", emoji:"🧋", name:"Brown Sugar Boba Milk",    url:"anesh.bio/boba" },
        { id:"f4", ico:"fi2", emoji:"🥩", name:"Sate Ayam Madura",         url:"anesh.bio/sate" },
      ],
    },
  });

  // ── Edit helpers ─────────────────────────────────────────────────────────
  const updateItem = (catKey: string, itemId: string, field: keyof LinkItem, value: string) => {
    setCatData(prev => ({
      ...prev,
      [catKey]: {
        ...prev[catKey],
        items: prev[catKey].items.map(it => it.id === itemId ? { ...it, [field]: value } : it),
      },
    }));
  };

  const deleteItem = (catKey: string, itemId: string) => {
    setCatData(prev => ({
      ...prev,
      [catKey]: {
        ...prev[catKey],
        items: prev[catKey].items.filter(it => it.id !== itemId),
      },
    }));
    showToast("Link dihapus");
  };

  const addItem = (catKey: string) => {
    const newId = `new_${Date.now()}`;
    const icoList = ["fi1","fi2","fi3","fi4","fi5"];
    setCatData(prev => ({
      ...prev,
      [catKey]: {
        ...prev[catKey],
        items: [
          ...prev[catKey].items,
          { id: newId, ico: icoList[prev[catKey].items.length % 5], emoji: "🔗", name: "Link baru", url: "yourlink.bio/link" },
        ],
      },
    }));
    showToast("Link ditambahkan ✅");
  };

  const current = catData[selectedCat];
  const visibleItems = editMode ? current.items : current.items.slice(0, 5);
  const hasMore = !editMode && current.items.length > 5;

  // ── Inline editable text ─────────────────────────────────────────────────
  const EditableText = ({
    value, onChange, fieldKey, className, style, multiline,
  }: {
    value: string; onChange: (v: string) => void; fieldKey: string;
    className?: string; style?: React.CSSProperties; multiline?: boolean;
  }) => {
    const isEditing = editingField === fieldKey;
    if (!editMode) return <span className={className} style={style}>{value}</span>;
    if (isEditing) {
      const props = {
        autoFocus: true,
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
        onBlur: () => setEditingField(null),
        onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" && !multiline) setEditingField(null); },
        style: {
          background: "rgba(255,255,255,.08)", border: "1.5px solid rgba(255,255,255,.3)",
          borderRadius: 8, color: "#fff", padding: "4px 8px", fontSize: "inherit",
          fontWeight: "inherit", fontFamily: "inherit", width: "100%", outline: "none",
          resize: "none" as const, lineHeight: "inherit",
          ...style,
        },
      };
      return multiline
        ? <textarea rows={2} {...props} />
        : <input type="text" {...props} />;
    }
    return (
      <span
        className={className}
        style={{ ...style, cursor: "text", borderBottom: "1.5px dashed rgba(255,255,255,.3)", paddingBottom: 1 }}
        onClick={() => setEditingField(fieldKey)}
        title="Klik untuk edit"
      >
        {value}
      </span>
    );
  };

  const Content = () => (
    <div className="app">
      {/* Social Icons */}
      <div className="social-header">
        {[
          <svg key="fb" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
          <svg key="yt" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff" stroke="#fff" strokeWidth="1.5"/></svg>,
          <svg key="wa" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
          <svg key="tt" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
          <svg key="ig" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#fff"/></svg>,
          <svg key="x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l16 16M20 4L4 20"/></svg>,
        ].map((icon, idx) => (
          <a key={idx} href="#" className="soc-link" onClick={(e) => { e.preventDefault(); showToast("Link dibuka!"); }}>
            {icon}
          </a>
        ))}
      </div>

      {/* Search */}
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Cari link..." />
      </div>

      {/* Profile Card */}
      <div className={`profile-card${editMode ? " profile-card-edit" : ""}`}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img className="profile-avatar" src="https://pbs.twimg.com/profile_images/2042441264453599233/foTV-yAr_400x400.jpg" alt="pfp" />
          {editMode && (
            <button className="avatar-edit-btn" onClick={() => showToast("Ganti foto profil")} title="Ganti foto">
              📷
            </button>
          )}
        </div>
        <div className="profile-info">
          <EditableText
            value={profileName}
            onChange={setProfileName}
            fieldKey="profile-name"
            className="profile-name"
          />
          <EditableText
            value={profileBio}
            onChange={setProfileBio}
            fieldKey="profile-bio"
            className="profile-bio"
            multiline
          />
        </div>
        <div className="love-section" onClick={editMode ? undefined : handleLove} style={editMode ? { opacity: 0.4, cursor: "default" } : {}}>
          <svg className="love-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <span className="love-count">{loveCount}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="cats">
        {cats.map((cat) => (
          <div
            key={cat.key}
            className={`cat ${cat.cls}${selectedCat === cat.key ? " cat-active" : ""}`}
            onClick={() => setSelectedCat(cat.key)}
          >
            <span className="cat-name">{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Link List */}
      <div className={`fav-box${editMode ? " fav-box-edit" : ""}`}>
        <div className="fav-head">
          <div className="fav-title">{current.title}</div>
        </div>
        <div className="fav-list">
          {selectedCat === "bid" ? (
            visibleItems.map((item) => (
              <div key={item.id} style={{ marginBottom: 16, cursor: "pointer", position: "relative" }}>
                {editMode && (
                  <button className="item-delete-btn" onClick={() => deleteItem(selectedCat, item.id)} title="Hapus">✕</button>
                )}
                <div style={{ background: `url('${item.img}') center/cover`, borderRadius: 16, height: 320, width: "100%" }} />
                <div style={{ padding: "14px 0 0" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.name}</div>
                  <div style={{ fontSize: 13, color: "#636366", marginBottom: 14 }}>oleh {item.seller} · {item.bids} penawar aktif</div>
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
                  <button onClick={() => showToast("🔨 Pasang bid sekarang!")} style={{ width: "100%", padding: 15, background: "linear-gradient(135deg,#5E5CE6,#BF5AF2)", border: "none", borderRadius: 14, color: "#fff", fontSize: 17, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    🔨 Pasang Bid Sekarang
                  </button>
                </div>
              </div>
            ))
          ) : (
            visibleItems.map((item) => (
              <div key={item.id} className={`fav-row${editMode ? " fav-row-edit" : ""}`}>
                {editMode && (
                  <span className="drag-handle" title="Drag untuk reorder">⠿</span>
                )}
                <div className={`fav-ico ${item.ico}`}>
                  {editMode ? (
                    <input
                      type="text"
                      value={item.emoji}
                      onChange={e => updateItem(selectedCat, item.id, "emoji", e.target.value)}
                      style={{ background: "transparent", border: "none", color: "#fff", fontSize: 22, width: 32, textAlign: "center", outline: "none", cursor: "text" }}
                      maxLength={2}
                    />
                  ) : item.emoji}
                </div>
                <div className="fav-info">
                  <EditableText
                    value={item.name}
                    onChange={v => updateItem(selectedCat, item.id, "name", v)}
                    fieldKey={`name-${item.id}`}
                    className="fav-name"
                  />
                  <EditableText
                    value={item.url}
                    onChange={v => updateItem(selectedCat, item.id, "url", v)}
                    fieldKey={`url-${item.id}`}
                    className="fav-url"
                  />
                </div>
                {editMode ? (
                  <button className="item-delete-btn-inline" onClick={() => deleteItem(selectedCat, item.id)} title="Hapus">✕</button>
                ) : (
                  <button className="view-btn" onClick={() => showToast("Membuka link...")}>Lihat</button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add link button — only in edit mode */}
        {editMode && selectedCat !== "bid" && (
          <button className="add-link-btn" onClick={() => addItem(selectedCat)}>
            <span>＋</span> Tambah Link
          </button>
        )}
      </div>

      {hasMore && (
        <div className="see-more-container">
          <button className="see-more-btn" onClick={() => showToast("Lihat semua link 🔗")}>
            See More ({current.items.length - 5}+)
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <div className="footer-links">
          {["Cookie Preferences","Report","Privacy","Explore","More from Yourlink"].map((link, i, arr) => (
            <span key={link} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <a href="#" onClick={(e) => e.preventDefault()}>{link}</a>
              {i < arr.length - 1 && <span>•</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="home-bar"><div></div></div>
    </div>
  );

  return (
    <>
      {/* Live / Edit toggle — only visible to owner */}
      {isOwner && (
        <div className="mode-bar">
          <button
            className={`mode-btn${!editMode ? " mode-btn-active" : ""}`}
            onClick={() => { setEditMode(false); showToast("Mode Live aktif 👁"); }}
          >
            <span className="mode-dot mode-dot-live" />
            Live
          </button>
          <button
            className={`mode-btn${editMode ? " mode-btn-active" : ""}`}
            onClick={() => { setEditMode(true); showToast("Mode Edit aktif ✏️"); }}
          >
            ✏️ Edit
          </button>
          {editMode && (
            <button className="mode-save-btn" onClick={() => { setEditMode(false); showToast("Perubahan disimpan ✅"); }}>
              Simpan
            </button>
          )}
        </div>
      )}

      {/* Mobile */}
      <div className="mobile-only"><Content /></div>

      {/* Desktop: phone frame */}
      <div className="desktop-only">
        <div className="desktop-frame">
          <div className="phone-notch"></div>
          <div className="phone-btn-vol"></div>
          <div className="phone-btn-vol2"></div>
          <div className="phone-btn-pwr"></div>
          <div className="phone-screen">
            <div className="phone-inner">
              <Content />
            </div>
          </div>
        </div>
        <div className="qr-panel">
          <div className="qr-label">View on mobile</div>
          <div style={{ width:100, height:100, background:"#f0f0f0", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#999" }}>QR Code</div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast${toastShow ? " show" : ""}`}>{toastMsg}</div>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
        .mobile-only{display:none}
        .desktop-only{display:block}
        @media(max-width:768px){
          .mobile-only{display:block}
          .desktop-only{display:none}
        }

        /* ===== DESKTOP FRAME ===== */
        @media(min-width:769px){
          .desktop-only{background:#b0b0b0;min-height:100vh;overflow:hidden}
          .desktop-frame{position:fixed;top:0;left:50%;transform:translateX(-50%);width:390px;flex-shrink:0;z-index:10}
          .phone-screen{width:390px;height:100vh;border-radius:52px 52px 0 0;overflow:hidden;box-shadow:0 0 0 11px #1a1a1a,0 0 0 13px #3a3a3a,0 40px 80px rgba(0,0,0,.6);position:relative;background:#000;margin-top:200px}
          .phone-inner{width:100%;height:100%;overflow-y:auto;overflow-x:hidden;scrollbar-width:none;-webkit-overflow-scrolling:touch}
          .phone-inner::-webkit-scrollbar{display:none}
          .phone-notch{position:absolute;top:213px;left:50%;transform:translateX(-50%);width:126px;height:36px;background:#1a1a1a;border-radius:20px;z-index:100;pointer-events:none}
          .phone-btn-vol{position:absolute;left:-13px;top:150px;width:4px;height:38px;background:#2a2a2a;border-radius:2px 0 0 2px}
          .phone-btn-vol2{position:absolute;left:-13px;top:198px;width:4px;height:38px;background:#2a2a2a;border-radius:2px 0 0 2px}
          .phone-btn-pwr{position:absolute;right:-13px;top:170px;width:4px;height:64px;background:#2a2a2a;border-radius:0 2px 2px 0}
          .qr-panel{position:fixed;bottom:32px;right:32px;background:#fff;border-radius:18px;padding:16px 18px 14px;box-shadow:0 6px 28px rgba(0,0,0,.2);display:flex;flex-direction:column;align-items:center;gap:10px;z-index:9999}
          .qr-label{font-size:12px;font-weight:600;color:#333;letter-spacing:.02em}
          .toast{position:absolute;bottom:120px;left:50%;transform:translateX(-50%);max-width:380px}
        }

        /* ===== APP ===== */
        .app{width:100%;max-width:430px;margin:0 auto;background:#000;min-height:100vh;position:relative;overflow-x:hidden;font-family:-apple-system,'Helvetica Neue',sans-serif}

        /* Social Icons */
        .social-header{display:flex;justify-content:center;align-items:center;gap:16px;padding:56px 20px 16px;background:#000;flex-wrap:wrap}
        .soc-link{display:flex;align-items:center;justify-content:center;transition:transform .2s ease,opacity .2s;text-decoration:none}
        .soc-link:hover{transform:scale(1.15)}
        .soc-link:active{transform:scale(.88);opacity:.7}

        /* Search */
        .search-box{margin:0 16px 28px;background:#1c1c1e;border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px}
        .search-box input{flex:1;background:transparent;border:none;color:#fff;font-size:15px;outline:none;font-family:inherit}
        .search-box input::placeholder{color:#636366}
        .search-icon{color:#636366;font-size:18px}

        /* Profile Card */
        .profile-card{margin:0 16px 28px;background:#1c1c1e;border-radius:20px;padding:0 16px 0 0;display:flex;align-items:center;gap:8px;height:100px;overflow:hidden}
        .profile-avatar{width:80px;height:80px;border-radius:16px;object-fit:cover;flex-shrink:0;border:2px solid rgba(255,255,255,.1);margin:0 12px}
        .profile-info{flex:1;min-width:0;padding-right:8px}
        .profile-name{font-size:20px;font-weight:700;color:#fff;margin-bottom:4px;letter-spacing:-0.3px}
        .profile-bio{font-size:13px;color:#636366;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;line-height:1.3}
        .love-section{display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;user-select:none;margin-right:20px;flex-shrink:0}
        .love-icon{width:24px;height:24px;display:block;fill:#636366;transition:fill .2s,transform .2s}
        .love-icon:hover{fill:#FF375F;transform:scale(1.2)}
        .love-count{font-size:11px;font-weight:400;color:#636366}

        /* Categories */
        .cats{display:flex;gap:12px;padding:4px 16px 32px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x mandatory}
        .cats::-webkit-scrollbar{display:none}
        .cat{width:120px;height:60px;border-radius:16px;flex-shrink:0;cursor:pointer;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:10px;transition:transform 0.2s;user-select:none;border:1.5px solid transparent;scroll-snap-align:center}
        .cat:active{transform:scale(.95)}
        .cat-active{border-color:rgba(255,255,255,.4);box-shadow:0 0 14px rgba(255,255,255,.12)}
        .cat-name{font-size:15px;font-weight:700;color:#fff;position:relative;z-index:1;text-align:center}
        .c1{background:linear-gradient(135deg,#34D058,#1a9e3f)}
        .c2{background:linear-gradient(135deg,#FF9500,#FF5E00)}
        .c3{background:linear-gradient(135deg,#1E90FF,#0055CC)}
        .c4{background:linear-gradient(135deg,#FF6B35,#E8001D)}
        .c5{background:linear-gradient(135deg,#AF52DE,#7B2FBE)}

        /* Fav Box */
        .fav-box{margin:0 16px 28px;background:#1c1c1e;border-radius:16px;overflow:hidden}
        .fav-head{padding:16px 16px 12px}
        .fav-title{font-size:18px;font-weight:700;color:#fff;letter-spacing:-0.3px}
        .fav-list{padding:0 16px 12px}
        .fav-row{display:flex;align-items:center;gap:12px;padding:14px 0;cursor:pointer;border-radius:12px;transition:all .2s;border-bottom:.5px solid transparent}
        .fav-row:hover{background:rgba(255,255,255,.06);padding:14px 8px;border-bottom-color:rgba(255,255,255,.08)}
        .fav-ico{width:56px;height:56px;border-radius:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:24px;box-shadow:0 4px 12px rgba(0,0,0,.3)}
        .fi1{background:linear-gradient(135deg,#5E5CE6,#BF5AF2)}
        .fi2{background:linear-gradient(135deg,#FF9F0A,#FF375F)}
        .fi3{background:linear-gradient(135deg,#30D158,#0A84FF)}
        .fi4{background:linear-gradient(135deg,#FF9F0A,#FF6B00)}
        .fi5{background:linear-gradient(135deg,#BF5AF2,#5E5CE6)}
        .fav-info{flex:1;min-width:0}
        .fav-name{font-size:15px;font-weight:600;color:#fff;margin-bottom:3px;letter-spacing:-0.2px;display:block}
        .fav-url{font-size:12px;color:#0A84FF;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;opacity:.8;display:block}
        .view-btn{background:linear-gradient(135deg,#0A84FF,#0066CC);border:none;color:#fff;font-size:14px;font-weight:600;padding:8px 18px;border-radius:16px;cursor:pointer;font-family:inherit;transition:all .2s;flex-shrink:0;box-shadow:0 2px 8px rgba(10,132,255,.2)}
        .view-btn:active{transform:scale(.95);opacity:.8}

        /* See More */
        .see-more-container{display:flex;justify-content:center;padding:0 16px 28px;margin-top:-16px}
        .see-more-btn{background:none;border:none;color:rgba(255,255,255,.45);padding:0;font-size:13px;font-weight:400;cursor:pointer;font-family:inherit;transition:color .2s}
        .see-more-btn:hover{color:rgba(255,255,255,.65)}

        /* Footer */
        .footer{padding:32px 16px 48px;text-align:center;background:#000}
        .footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;font-size:12px;color:rgba(255,255,255,.4)}
        .footer-links a{color:rgba(255,255,255,.4);text-decoration:none;transition:color .15s}
        .footer-links a:hover{color:rgba(255,255,255,.6)}
        .footer-links span{color:rgba(255,255,255,.2)}
        .home-bar{display:flex;justify-content:center;padding:12px 0 28px;background:#000}
        .home-bar div{width:134px;height:5px;background:rgba(255,255,255,.3);border-radius:3px}

        /* Toast */
        .toast{position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:rgba(44,44,46,.95);backdrop-filter:blur(20px);color:#fff;padding:10px 22px;border-radius:20px;font-size:14px;font-weight:600;white-space:nowrap;opacity:0;transition:opacity .3s;pointer-events:none;z-index:300;max-width:90vw}
        .toast.show{opacity:1}

        /* Love emoji */
        @keyframes loveup{
          0%{opacity:1;transform:translateY(0) translateX(0) scale(1)}
          100%{opacity:0;transform:translateY(-80px) translateX(var(--tx)) scale(0)}
        }
        .love-emoji{position:fixed;font-size:20px;pointer-events:none;animation:loveup 1.2s cubic-bezier(.25,.46,.45,.94) forwards;z-index:999}

        /* ===== LIVE / EDIT MODE BAR ===== */
        .mode-bar{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:6px;background:rgba(28,28,30,.92);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:5px 6px;box-shadow:0 4px 24px rgba(0,0,0,.4)}
        .mode-btn{background:transparent;border:none;color:rgba(255,255,255,.5);font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all .2s;display:flex;align-items:center;gap:6px}
        .mode-btn:hover{color:#fff}
        .mode-btn-active{background:rgba(255,255,255,.12);color:#fff}
        .mode-dot{width:7px;height:7px;border-radius:50%;background:#30D158;box-shadow:0 0 6px #30D158;display:inline-block}
        .mode-save-btn{background:linear-gradient(135deg,#30D158,#0A84FF);border:none;color:#fff;font-size:13px;font-weight:700;padding:6px 16px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all .2s;margin-left:4px}
        .mode-save-btn:hover{opacity:.85}
        .mode-save-btn:active{transform:scale(.95)}

        /* ===== EDIT MODE STYLES ===== */
        .profile-card-edit{border:1.5px dashed rgba(255,255,255,.2);background:#1c1c1e}
        .avatar-edit-btn{position:absolute;bottom:-4px;right:-4px;background:#0A84FF;border:none;border-radius:50%;width:24px;height:24px;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,.4)}
        .fav-box-edit{border:1.5px dashed rgba(255,255,255,.15)}
        .fav-row-edit{border-bottom:.5px solid rgba(255,255,255,.08)!important;padding:10px 0!important}
        .drag-handle{color:rgba(255,255,255,.3);font-size:18px;cursor:grab;flex-shrink:0;padding:0 4px;user-select:none}
        .drag-handle:active{cursor:grabbing}
        .item-delete-btn{position:absolute;top:8px;right:8px;background:rgba(255,55,95,.85);border:none;color:#fff;width:28px;height:28px;border-radius:50%;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s}
        .item-delete-btn:hover{background:#FF375F;transform:scale(1.1)}
        .item-delete-btn-inline{background:rgba(255,55,95,.15);border:1px solid rgba(255,55,95,.3);color:#FF375F;width:30px;height:30px;border-radius:50%;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s}
        .item-delete-btn-inline:hover{background:rgba(255,55,95,.3)}
        .add-link-btn{width:calc(100% - 32px);margin:4px 16px 16px;background:rgba(255,255,255,.06);border:1.5px dashed rgba(255,255,255,.2);color:rgba(255,255,255,.6);font-size:14px;font-weight:600;padding:12px;border-radius:12px;cursor:pointer;font-family:inherit;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px}
        .add-link-btn:hover{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.35)}
      `}</style>
    </>
  );
}
