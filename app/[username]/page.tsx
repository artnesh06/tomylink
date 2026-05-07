"use client";
import { useState, useRef } from "react";

type LinkItem = {
  id: string;
  type: "link" | "affiliate";
  title: string;
  url: string;
  thumbnail?: string;
  image?: string;
  price?: string;
  originalPrice?: string;
  rating?: string;
  orders?: string;
  shipping?: string;
  discount?: string;
};

type Category = {
  key: string;
  label: string;
  sublabel: string;
  emoji: string;
};

export default function UserPage() {
  const isOwner = true;
  const [editMode, setEditMode] = useState(false);
  const [selectedCat, setSelectedCat] = useState("link");
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setToastShow(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastShow(false), 2500);
  };

  const categories: Category[] = [
    { key: "link",     label: "Katalog",  sublabel: "LINK",    emoji: "💎" },
    { key: "bid",      label: "Lelang",   sublabel: "ONLINE",  emoji: "📻" },
    { key: "digital",  label: "Koleksi",  sublabel: "DIGITAL", emoji: "🎞️" },
    { key: "template", label: "Template", sublabel: "UNIK",    emoji: "📷" },
  ];

  const [items] = useState<Record<string, LinkItem[]>>({
    link: [
      {
        id: "l1", type: "link",
        title: "Personal Portfolio",
        url: "https://tomylink.vercel.app/",
        thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=120&fit=crop",
      },
      {
        id: "l2", type: "link",
        title: "Exchange Art",
        url: "https://tomylink.vercel.app/",
        thumbnail: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=200&h=120&fit=crop",
      },
      {
        id: "l3", type: "affiliate",
        title: "Mie Sedap",
        url: "https://shopee.co.id/",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=160&h=160&fit=crop",
        price: "Rp 117.700",
        originalPrice: "Rp 126.000",
        rating: "4.6",
        orders: "23 Order",
        shipping: "Rp 13.000 - Regular",
        discount: "8%",
      },
      {
        id: "l4", type: "affiliate",
        title: "Mie Sedap",
        url: "https://shopee.co.id/",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=160&h=160&fit=crop",
        price: "Rp 117.700",
        originalPrice: "Rp 126.000",
        rating: "4.6",
        orders: "23 Order",
        shipping: "Rp 13.000 - Regular",
        discount: "8%",
      },
    ],
    bid: [],
    digital: [],
    template: [],
  });

  const currentItems = items[selectedCat] || [];
  const visibleItems = currentItems.slice(0, 6);
  const hasMore = currentItems.length > 6;

  return (
    <div className="root">
      <div className="app">

        {/* ── Top Bar ── */}
        <div className="topbar">
          <div className="topbar-avatar">
            <img
              src="https://pbs.twimg.com/profile_images/2042441264453599233/foTV-yAr_400x400.jpg"
              alt="avatar"
              className="topbar-avatar-img"
            />
          </div>
          <div className="topbar-spacer" />
          <div className="topbar-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span>Search...</span>
          </div>
          <div className="topbar-right">
            {isOwner && (
              <button
                className={`topbar-edit-btn${editMode ? " topbar-edit-on" : ""}`}
                onClick={() => { setEditMode(!editMode); showToast(editMode ? "Mode Live 👁" : "Mode Edit ✏️"); }}
              >
                <svg className={editMode ? "gear-stop" : "gear-spin"} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ── Profile ── */}
        <div className="profile">
          <div className="avatar-ring">
            <img
              className="avatar-img"
              src="https://pbs.twimg.com/profile_images/2042441264453599233/foTV-yAr_400x400.jpg"
              alt="avatar"
            />
          </div>
          <div className="profile-name">@Artnesh</div>
          <div className="profile-bio">Creative cloud by Artnesh. Bad kid, nft artist, and dev.</div>
          <div className="socials">
            <a href="#" className="soc-btn" onClick={e => e.preventDefault()}>
              {/* Instagram */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#222" stroke="none"/>
              </svg>
            </a>
            <a href="#" className="soc-btn" onClick={e => e.preventDefault()}>
              {/* X (Twitter) */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#222">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="soc-btn" onClick={e => e.preventDefault()}>
              {/* WhatsApp */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#222">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Categories & Filter — hidden ── */}

        {/* ── Categories — hidden ── */}

        {/* ── Banner Ads — hidden ── */}

        {/* ── Cards ── */}
        <div className="cards">
          {currentItems.length === 0 && (
            <p className="empty">Belum ada item</p>
          )}

          {visibleItems.map((item) =>
            item.type === "link" ? (
              <div key={item.id} className="lcard-group">
                <div className="lcard" onClick={() => showToast("Membuka link...")}>
                  {item.thumbnail && (
                    <img src={item.thumbnail} alt="" className="lcard-thumb" />
                  )}
                  <div className="lcard-left">
                    <div className="lcard-title">{item.title}</div>
                    <div className="lcard-url">{item.url}</div>
                  </div>
                  <span className="lcard-chevron">
                    <span className="chev-arrow" style={{animationDelay:'0s'}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </span>
                    <span className="chev-arrow" style={{animationDelay:'0.2s'}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <div key={item.id} className="acard" onClick={() => showToast("Membuka produk...")}>
                <div className="acard-imgwrap">
                  {item.discount && <span className="acard-badge">Diskon {item.discount}</span>}
                  <img src={item.image} alt="" className="acard-img" />
                </div>
                <div className="acard-body">
                  <div className="acard-title">{item.title}</div>
                  <div className="acard-row">
                    <span className="acard-star">⭐</span>
                    <span className="acard-rating">{item.rating}</span>
                    <span className="acard-orders">({item.orders})</span>
                  </div>
                  <div className="acard-ship">🛵 {item.shipping}</div>
                  <div className="acard-prices">
                    <span className="acard-price">{item.price}</span>
                    <span className="acard-orig">{item.originalPrice}</span>
                  </div>
                </div>
                <div className="acard-chevron">
                  <span className="chev-arrow" style={{animationDelay:'0s'}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                  <span className="chev-arrow" style={{animationDelay:'0.2s'}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        {hasMore && (
          <button className="seemore" onClick={() => showToast("Lihat semua")}>
            See more ({currentItems.length - 6}+)
          </button>
        )}

        {/* ── Footer ── */}
        <div className="footer">
          {["Cookie Preferences","Report","Privacy","Explore"].map((t, i, arr) => (
            <span key={t} className="footer-item">
              {t}{i < arr.length - 1 && <span className="footer-sep"> • </span>}
            </span>
          ))}
        </div>

        {/* Settings bar & homebar — removed */}
      </div>

      {/* QR Desktop */}
      <div className="qr-desktop">
        <div className="qr-desktop-label">View on mobile</div>
        <div className="qr-desktop-box">QR Code</div>
      </div>

      {/* FAB — hidden */}

      {/* Toast */}
      <div className={`toast${toastShow ? " show" : ""}`}>{toastMsg}</div>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}

        .root{
          background:#F0F0F0;
          min-height:100vh;
          display:flex;
          justify-content:center;
          font-family:-apple-system,'Helvetica Neue',sans-serif;
          position:relative;
        }
        .app{
          width:100%;
          max-width:100%;
          min-height:100vh;
          background:#F0F0F0;
          display:flex;
          flex-direction:column;
          position:relative;
        }

        /* Top Bar */
        .topbar{
          display:flex;align-items:center;gap:10px;
          padding:14px 14px 12px;
          background:#F0F0F0;
        }
        .topbar-avatar{
          width:48px;height:48px;
          background:#fff;border-radius:10px;
          overflow:hidden;flex-shrink:0;
          border:0.5px solid #e0e0e0;
        }
        .topbar-avatar-img{width:100%;height:100%;object-fit:cover}
        .topbar-spacer{flex:1}
        .topbar-icon{
          width:44px;height:44px;
          background:#fff;border:0.5px solid #e0e0e0;border-radius:10px;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;flex-shrink:0;
        }
        .topbar-icon:active{background:#eee}
        .topbar-search{
          background:#fff;border:0.5px solid #e0e0e0;border-radius:10px;
          padding:10px 16px;
          display:flex;align-items:center;gap:8px;
          cursor:text;min-width:160px;
          height:44px;
        }
        .topbar-search span{font-size:15px;color:#aaa}
        .topbar-right{display:flex;align-items:center;gap:6px;flex-shrink:0}
        .topbar-edit-btn{
          background:#fff;border:0.5px solid #e0e0e0;
          color:#444;
          width:44px;height:44px;
          border-radius:10px;
          cursor:pointer;
          display:flex;align-items:center;justify-content:center;
          transition:all .2s;flex-shrink:0;
        }
        .topbar-edit-btn:active{transform:scale(.95)}
        .topbar-edit-on{background:#FF3B30;border-color:#FF3B30;color:#fff}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .gear-spin{animation:spin 5s linear infinite}
        .gear-stop{animation:none}

        /* Profile */
        .profile{
          display:flex;flex-direction:column;align-items:center;
          padding:20px 16px 10px;
        }
        .avatar-ring{
          width:110px;height:110px;border-radius:50%;
          background:#fff;
          border:1px solid #e0e0e0;
          display:flex;align-items:center;justify-content:center;
          margin-bottom:14px;
          overflow:hidden;
        }
        .avatar-img{width:100%;height:100%;object-fit:cover}
        .profile-name{font-size:24px;font-weight:800;color:#111;margin-bottom:1.5px}
        .profile-bio{font-size:14px;font-weight:400;font-style:normal;color:#555;margin-bottom:14px;text-align:center;line-height:1.5}
        .socials{display:flex;gap:16px;margin-bottom:14px}
        .soc-btn{
          width:32px;height:32px;
          display:flex;align-items:center;justify-content:center;
          text-decoration:none;
          transition:transform .15s, opacity .15s;
          background:transparent;
        }
        .soc-btn:hover{opacity:0.6}
        .soc-btn:active{transform:scale(.9)}

        /* Filter Tabs */
        .filter-wrap{padding:0 14px 18px}
        .filter-bar{
          background:#e0e0e0;
          border-radius:999px;
          padding:4px;
          display:flex;
          align-items:center;
          gap:2px;
        }
        .filter-tab{
          flex:1;
          background:transparent;border:none;
          border-radius:999px;
          padding:10px 8px;
          font-size:14px;font-weight:600;
          color:#555;
          cursor:pointer;
          font-family:inherit;
          transition:all .2s;
          white-space:nowrap;
        }
        .filter-tab-on{
          background:#3a7d2c;
          color:#fff;
          box-shadow:0 2px 8px rgba(58,125,44,.3);
        }

        /* Categories */
        .cats{
          display:grid;grid-template-columns:repeat(4,1fr);
          gap:8px;padding:28px 14px 18px;
          overflow:visible;
        }
        .cat{
          background:#D8D8D8;
          border:none;
          border-radius:22px;
          padding:44px 4px 12px;
          display:flex;flex-direction:column;align-items:center;gap:4px;
          cursor:pointer;transition:all .2s;
          position:relative;
          overflow:visible;
        }
        .cat:active{transform:scale(.93)}
        .cat-on{
          background:#fff;
          box-shadow:0 4px 16px rgba(0,0,0,.15);
        }
        .cat-emoji{
          font-size:40px;line-height:1;
          position:absolute;
          top:-20px;
          left:50%;transform:translateX(-50%);
          filter:drop-shadow(0 2px 4px rgba(0,0,0,.15));
        }
        .cat-top{font-size:11px;color:#666;font-weight:400}
        .cat-bot{font-size:13px;font-weight:900;color:#111;letter-spacing:.2px}

        /* Banner */
        .banner-wrap{padding:0 14px 16px}
        .banner-img{width:100%;border-radius:16px;display:block;object-fit:cover}

        /* Cards */
        .cards{
          display:flex;flex-direction:column;gap:10px;
          padding:0 14px;
          overflow:visible;
        }
        .empty{text-align:center;padding:40px 0;font-size:14px;color:#aaa}

        /* Link Card */
        /* Link Card */
        .lcard-group{ display:contents }
        .lcard{
          background:#F7F7F7;
          border:0.5px solid #e0e0e0;
          border-radius:20px;
          padding:12px 16px;
          display:flex;align-items:center;gap:14px;
          cursor:pointer;
          transition:border-color .2s, background .2s;
          width:100%;
        }
        .lcard:hover{background:#fff;border-color:#aaa}
        .lcard:active{transform:scale(.97)}
        .lcard-thumb{
          width:60px;height:60px;
          border-radius:14px;
          object-fit:cover;
          flex-shrink:0;
        }
        .lcard-left{flex:1;min-width:0}
        .lcard-title{font-size:16px;font-weight:600;color:#111;margin-bottom:1px}
        .lcard-url{font-size:12px;color:#aaa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .lcard-chevron{flex-shrink:0;display:flex;align-items:center;gap:1px}
        .lcard-img-slot{display:none}

        /* Affiliate Card */
        .acard{
          background:#F7F7F7;border:0.5px solid #e0e0e0;border-radius:16px;
          padding:14px;
          display:flex;align-items:flex-start;gap:14px;
          cursor:pointer;
          transition:border-color .2s, background .2s;
        }
        .acard:hover{background:#fff;border-color:#aaa}
        .acard:active{transform:scale(.98)}
        .acard-imgwrap{
          position:relative;flex-shrink:0;
          width:120px;height:120px;border-radius:18px;overflow:hidden;
          background:#f0f0f0;
        }
        .acard-badge{
          position:absolute;top:8px;left:8px;right:8px;
          background:#EE4D2D;color:#fff;
          font-size:13px;font-weight:700;
          padding:5px 10px;border-radius:10px;z-index:1;
          text-align:center;
        }
        .acard-img{width:100%;height:100%;object-fit:cover}
        .acard-body{flex:1;min-width:0}
        .acard-title{font-size:16px;font-weight:600;color:#111;margin-bottom:5px}
        .acard-row{display:flex;align-items:center;gap:5px;margin-bottom:3px}
        .acard-star{font-size:14px}
        .acard-rating{font-size:13px;font-weight:600;color:#111}
        .acard-orders{font-size:12px;color:#999}
        .acard-ship{font-size:12px;color:#999;margin-bottom:7px}
        .acard-prices{
          display:inline-flex;align-items:center;gap:8px;
          border:0.5px solid #e0e0e0;
          border-radius:12px;
          padding:6px 12px;
          white-space:nowrap;
        }
        .acard-price{font-size:15px;font-weight:700;color:#111}
        .acard-orig{font-size:12px;color:#bbb;text-decoration:line-through}
        .acard-chevron{flex-shrink:0;align-self:center;padding-left:4px;display:flex;align-items:center;gap:1px}
        .chev-arrow{display:flex;align-items:center;opacity:0.35}
        .chev-arrow:nth-child(2){display:none;opacity:0}
        .lcard:hover .chev-arrow:nth-child(2),
        .acard:hover .chev-arrow:nth-child(2){display:flex}
        .lcard:hover .chev-arrow,.lcard:active .chev-arrow,
        .acard:hover .chev-arrow,.acard:active .chev-arrow{animation:chev-stagger .7s ease-in-out infinite}
        @keyframes chev-stagger{
          0%  {opacity:0;transform:translateX(-6px)}
          40% {opacity:1;transform:translateX(0px)}
          70% {opacity:1;transform:translateX(4px)}
          100%{opacity:0;transform:translateX(8px)}
        }

        /* See More */
        .seemore{
          display:block;margin:16px auto 4px;
          background:none;border:none;
          font-size:13px;color:#888;
          cursor:pointer;font-family:inherit;
          padding:8px 24px;
          transition:color .2s;
        }
        .seemore:hover{color:#333}

        /* Footer */
        .footer{
          display:flex;flex-wrap:wrap;justify-content:center;
          gap:2px;padding:20px 16px 12px;
          font-size:11px;color:#aaa;
        }
        .footer-item{color:#aaa}
        .footer-sep{color:#ccc}

        /* Settings Bar */
        .settingsbar{display:flex;justify-content:center;padding:8px 16px 10px;background:#F0F0F0}
        .settingsbar-inner{display:flex;align-items:center;gap:3px;background:rgba(0,0,0,.09);border-radius:999px;padding:4px 6px}
        .stab{background:transparent;border:none;color:rgba(0,0,0,.4);font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;cursor:pointer;font-family:inherit;transition:all .2s;display:flex;align-items:center;gap:5px}
        .stab:hover{color:rgba(0,0,0,.65)}
        .stab-on{background:#fff;color:#111;box-shadow:0 1px 4px rgba(0,0,0,.12)}
        .stab-dot{width:7px;height:7px;border-radius:50%;background:#30D158;box-shadow:0 0 5px #30D158;display:inline-block;flex-shrink:0}
        .stab-sep{width:1px;height:16px;background:rgba(0,0,0,.1);flex-shrink:0}
        .stab-save{background:#111;border:none;color:#fff;font-size:13px;font-weight:700;padding:6px 16px;border-radius:999px;cursor:pointer;font-family:inherit}
        .stab-save:active{transform:scale(.95)}

        /* Home Bar */
        .homebar{display:flex;justify-content:center;padding:10px 0 22px;background:#F0F0F0}
        .homebar div{width:134px;height:5px;background:rgba(0,0,0,.15);border-radius:3px}

        /* FAB */
        .fab{
          position:fixed;bottom:80px;right:16px;
          width:48px;height:48px;border-radius:14px;
          background:#1c1c1e;border:none;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;z-index:100;
          box-shadow:0 4px 16px rgba(0,0,0,.3);
          transition:transform .15s;
        }
        .fab:active{transform:scale(.92)}

        /* Toast */
        .toast{position:fixed;bottom:140px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.78);backdrop-filter:blur(10px);color:#fff;padding:10px 22px;border-radius:20px;font-size:14px;font-weight:600;white-space:nowrap;opacity:0;transition:opacity .3s;pointer-events:none;z-index:999;max-width:90vw}
        .toast.show{opacity:1}

        /* Desktop */
        @media(min-width:769px){
          .root{
            background:#adadad;
            align-items:flex-start;
            justify-content:center;
            min-height:100vh;
            padding:40px 20px 0;
          }
          .app{
            max-width:620px;
            min-height:calc(100vh - 40px);
            background:#fff;
            border-radius:24px 24px 0 0;
            box-shadow:0 8px 40px rgba(0,0,0,.12);
            margin:0 auto;
            overflow:hidden;
          }
          .topbar{background:#fff}
          .app{background:#fff}
          /* QR panel fixed bottom right — only on wide desktop */
          .qr-desktop{display:none}
        }
        @media(min-width:1024px){
          .qr-desktop{
            position:fixed;bottom:32px;right:32px;
            display:flex;flex-direction:column;align-items:center;gap:6px;
            z-index:999;
          }
          .qr-desktop-label{
            font-size:11px;font-weight:500;
            color:rgba(0,0,0,.5);
            letter-spacing:.02em;
          }
          .qr-desktop-box{
            width:90px;height:90px;
            background:#fff;
            border-radius:6px;
            display:flex;align-items:center;justify-content:center;
            font-size:10px;color:#aaa;text-align:center;
            box-shadow:0 2px 8px rgba(0,0,0,.15);
          }
        }
        @media(max-width:768px){
          .qr-desktop{display:none}
        }
      `}</style>
    </div>
  );
}
