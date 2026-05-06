"use client";
import { useState } from "react";

const tokens = [
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    amount: "0.00335 ETH",
    value: "$7.93",
    change: "-$0.06",
    positive: false,
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#1C1C3A"/>
        <polygon points="20,7 26,20 20,23.5 14,20" fill="#8A92B2"/>
        <polygon points="20,23.5 26,20 20,33" fill="#62688F"/>
        <polygon points="20,23.5 14,20 20,33" fill="#454A75"/>
        <polygon points="20,7 14,20 20,17" fill="#62688F"/>
        <polygon points="20,17 26,20 20,23.5 14,20" fill="#C0C4E4" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: "hype",
    name: "HYPE",
    symbol: "HYPE",
    amount: "0.01146 HYPE",
    value: "$0.50",
    change: "-<$0.01",
    positive: false,
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#0d1117"/>
        {/* bow-tie / HYPE shape */}
        <path d="M10 16 C13 16 15 20 20 20 C25 20 27 16 30 16 C27 16 25 24 20 24 C15 24 13 16 10 16Z" fill="#00E5CC"/>
      </svg>
    ),
  },
  {
    id: "weth",
    name: "WETH",
    symbol: "WETH",
    amount: "0.00021 WETH",
    value: "$0.50",
    change: "-<$0.01",
    positive: false,
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#1C1C3A"/>
        <polygon points="20,7 26,20 20,23.5 14,20" fill="#8A92B2" opacity="0.8"/>
        <polygon points="20,23.5 26,20 20,33" fill="#62688F" opacity="0.8"/>
        <polygon points="20,23.5 14,20 20,33" fill="#454A75" opacity="0.8"/>
        {/* wrapped indicator circle */}
        <circle cx="27" cy="27" r="8" fill="#1C1C3A" stroke="#444" strokeWidth="1"/>
        <circle cx="27" cy="27" r="5" fill="#2a2a4a"/>
        <polygon points="27,23 29.5,27 27,28.5 24.5,27" fill="#8A92B2" opacity="0.9"/>
      </svg>
    ),
  },
  {
    id: "degen",
    name: "Degen (Base)",
    symbol: "DEGEN",
    amount: "1.234 DEGEN",
    value: "$0.06",
    change: "+$0.00",
    positive: true,
    logo: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#7B3FE4"/>
        <text x="20" y="26" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold" fontFamily="Arial">D</text>
      </svg>
    ),
  },
];

const navItems = [
  {
    label: "Home",
    active: true,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "#A78BFA" : "none"} stroke={active ? "#A78BFA" : "#636366"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
        <path d="M9 21V12h6v9" stroke={active ? "#A78BFA" : "#636366"}/>
      </svg>
    ),
  },
  {
    label: "",
    active: false,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A78BFA" : "#636366"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: "",
    active: false,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A78BFA" : "#636366"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
      </svg>
    ),
  },
  {
    label: "",
    active: false,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A78BFA" : "#636366"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    label: "",
    active: false,
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#A78BFA" : "#636366"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
];

export default function WalletPage() {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="wallet-root">
      <div className="wallet-app">

        {/* Status Bar */}
        <div className="status-bar">
          <span className="status-time">23.14</span>
          <div className="status-right">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
              <rect x="0" y="6" width="3" height="6" rx="0.5"/>
              <rect x="4.5" y="4" width="3" height="8" rx="0.5"/>
              <rect x="9" y="2" width="3" height="10" rx="0.5"/>
              <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3"/>
            </svg>
            <span className="status-5g">5G</span>
            <div className="battery-icon">
              <span className="battery-num">24</span>
              <div className="battery-tip" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="wallet-header">
          <div className="header-left">
            <div className="header-avatar">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="22" fill="#1a1a1a"/>
                {/* Eagle / graffiti style icon matching screenshot */}
                <text x="22" y="30" textAnchor="middle" fontSize="22">🦅</text>
              </svg>
            </div>
            <div className="header-info">
              <span className="header-username">@anesh</span>
              <span className="header-name">Artnesh Cosmos</span>
            </div>
          </div>
          <div className="header-actions">
            <button className="header-icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </button>
            <button className="header-icon-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Balance */}
        <div className="balance-section">
          <div className="balance-amount">$9.00</div>
          <div className="balance-change-row">
            <span className="balance-change-neg">-$0.0688</span>
            <span className="balance-badge">-0.76%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-grid">
          {[
            { label: "Kirim", icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2" fill="none"/>
              </svg>
            )},
            { label: "Tukar", icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
              </svg>
            )},
            { label: "Terima", icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="3" height="3" rx="0.5"/><rect x="18" y="14" width="3" height="3" rx="0.5"/>
                <rect x="14" y="18" width="3" height="3" rx="0.5"/><rect x="18" y="18" width="3" height="3" rx="0.5"/>
              </svg>
            )},
            { label: "Beli", icon: (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            )},
          ].map((btn) => (
            <button key={btn.label} className="action-btn">
              <div className="action-btn-icon">{btn.icon}</div>
              <span className="action-btn-label">{btn.label}</span>
            </button>
          ))}
        </div>

        {/* Cash Balance Card */}
        <div className="cash-card">
          <div className="cash-left">
            <span className="cash-label">Saldo Uang Tunai</span>
            <span className="cash-amount">$0.00</span>
          </div>
          <button className="cash-add-btn">Tambah Uang Tunai</button>
        </div>

        {/* Token Section */}
        <div className="token-section">
          <div className="token-header">
            <span className="token-title">Token</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>

          <div className="token-list">
            {tokens.map((token) => (
              <div key={token.id} className="token-row">
                <div className="token-logo">{token.logo}</div>
                <div className="token-info">
                  <div className="token-name-row">
                    <span className="token-name">{token.name}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#4A9EFF">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                  </div>
                  <span className="token-amount">{token.amount}</span>
                </div>
                <div className="token-value-col">
                  <span className="token-value">{token.value}</span>
                  <span className={`token-change ${token.positive ? "pos" : "neg"}`}>{token.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="bottom-nav">
          {navItems.map((item, i) => (
            <button
              key={i}
              className={`nav-btn${activeNav === i ? " nav-btn-active" : ""}`}
              onClick={() => setActiveNav(i)}
            >
              {item.icon(activeNav === i)}
            </button>
          ))}
        </div>

        {/* Home Indicator */}
        <div className="home-indicator"><div /></div>
      </div>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}

        .wallet-root{
          background:#111;
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:-apple-system,'SF Pro Display','Helvetica Neue',sans-serif;
        }

        .wallet-app{
          width:100%;
          max-width:430px;
          min-height:100vh;
          background:#111;
          display:flex;
          flex-direction:column;
          position:relative;
          overflow-x:hidden;
        }

        /* Status Bar */
        .status-bar{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:14px 20px 6px;
        }
        .status-time{
          font-size:15px;
          font-weight:700;
          color:#fff;
          background:#1DB954;
          padding:4px 12px;
          border-radius:20px;
          letter-spacing:0.3px;
        }
        .status-right{
          display:flex;
          align-items:center;
          gap:6px;
        }
        .status-5g{
          font-size:13px;
          font-weight:700;
          color:#fff;
        }
        .battery-icon{
          width:28px;
          height:14px;
          border:1.5px solid rgba(255,255,255,.5);
          border-radius:3px;
          position:relative;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .battery-num{
          font-size:9px;
          font-weight:700;
          color:#fff;
          line-height:1;
        }
        .battery-tip{
          position:absolute;
          right:-4px;
          top:50%;
          transform:translateY(-50%);
          width:3px;
          height:6px;
          background:rgba(255,255,255,.5);
          border-radius:0 1px 1px 0;
        }

        /* Header */
        .wallet-header{
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:12px 20px 8px;
        }
        .header-left{
          display:flex;
          align-items:center;
          gap:12px;
        }
        .header-avatar{
          width:48px;
          height:48px;
          border-radius:50%;
          overflow:hidden;
          background:#1a1a1a;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
          font-size:26px;
          line-height:1;
        }
        .header-info{
          display:flex;
          flex-direction:column;
          gap:2px;
        }
        .header-username{
          font-size:12px;
          color:#888;
          font-weight:400;
        }
        .header-name{
          font-size:20px;
          font-weight:700;
          color:#fff;
          letter-spacing:-0.4px;
        }
        .header-actions{
          display:flex;
          gap:4px;
        }
        .header-icon-btn{
          background:transparent;
          border:none;
          cursor:pointer;
          padding:8px;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:50%;
          transition:background .2s;
        }
        .header-icon-btn:hover{background:rgba(255,255,255,.08)}

        /* Balance */
        .balance-section{
          padding:18px 20px 10px;
        }
        .balance-amount{
          font-size:48px;
          font-weight:700;
          color:#fff;
          letter-spacing:-1.5px;
          line-height:1;
          margin-bottom:8px;
        }
        .balance-change-row{
          display:flex;
          align-items:center;
          gap:8px;
        }
        .balance-change-neg{
          font-size:15px;
          font-weight:500;
          color:#FF375F;
        }
        .balance-badge{
          background:#FF375F;
          color:#fff;
          font-size:12px;
          font-weight:700;
          padding:3px 8px;
          border-radius:6px;
        }

        /* Action Grid */
        .action-grid{
          display:grid;
          grid-template-columns:repeat(4,1fr);
          gap:10px;
          padding:18px 20px;
        }
        .action-btn{
          background:#1c1c1e;
          border:none;
          border-radius:16px;
          padding:16px 8px 12px;
          cursor:pointer;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:8px;
          transition:background .2s,transform .15s;
        }
        .action-btn:hover{background:#2a2a2e}
        .action-btn:active{transform:scale(.94)}
        .action-btn-icon{
          width:28px;
          height:28px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .action-btn-label{
          font-size:13px;
          font-weight:500;
          color:#fff;
        }

        /* Cash Card */
        .cash-card{
          margin:0 20px 20px;
          background:#1c1c1e;
          border-radius:16px;
          padding:16px 18px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
        .cash-left{
          display:flex;
          flex-direction:column;
          gap:3px;
        }
        .cash-label{
          font-size:13px;
          color:#888;
          font-weight:400;
        }
        .cash-amount{
          font-size:20px;
          font-weight:700;
          color:#fff;
        }
        .cash-add-btn{
          background:#A78BFA;
          border:none;
          color:#fff;
          font-size:14px;
          font-weight:600;
          padding:12px 18px;
          border-radius:12px;
          cursor:pointer;
          font-family:inherit;
          transition:opacity .2s,transform .15s;
          white-space:nowrap;
        }
        .cash-add-btn:hover{opacity:.88}
        .cash-add-btn:active{transform:scale(.96)}

        /* Token Section */
        .token-section{
          flex:1;
          padding:0 20px;
        }
        .token-header{
          display:flex;
          align-items:center;
          gap:4px;
          margin-bottom:12px;
          cursor:pointer;
        }
        .token-title{
          font-size:18px;
          font-weight:700;
          color:#fff;
        }
        .token-list{
          display:flex;
          flex-direction:column;
          gap:2px;
          background:#1c1c1e;
          border-radius:16px;
          overflow:hidden;
        }
        .token-row{
          display:flex;
          align-items:center;
          gap:12px;
          padding:14px 16px;
          cursor:pointer;
          transition:background .15s;
          border-bottom:.5px solid rgba(255,255,255,.06);
        }
        .token-row:last-child{border-bottom:none}
        .token-row:hover{background:rgba(255,255,255,.04)}
        .token-logo{
          width:44px;
          height:44px;
          border-radius:50%;
          overflow:hidden;
          flex-shrink:0;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .token-info{
          flex:1;
          min-width:0;
        }
        .token-name-row{
          display:flex;
          align-items:center;
          gap:5px;
          margin-bottom:3px;
        }
        .token-name{
          font-size:15px;
          font-weight:600;
          color:#fff;
        }
        .token-amount{
          font-size:13px;
          color:#636366;
        }
        .token-value-col{
          display:flex;
          flex-direction:column;
          align-items:flex-end;
          gap:3px;
        }
        .token-value{
          font-size:15px;
          font-weight:600;
          color:#fff;
        }
        .token-change{
          font-size:13px;
          font-weight:400;
        }
        .token-change.neg{color:#FF375F}
        .token-change.pos{color:#30D158}

        /* Bottom Nav */
        .bottom-nav{
          display:flex;
          justify-content:space-around;
          align-items:center;
          padding:10px 0 4px;
          background:#111;
          border-top:.5px solid rgba(255,255,255,.08);
          margin-top:auto;
        }
        .nav-btn{
          background:transparent;
          border:none;
          cursor:pointer;
          padding:8px 16px;
          border-radius:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:background .2s;
        }
        .nav-btn:hover{background:rgba(255,255,255,.06)}
        .nav-btn-active svg{filter:drop-shadow(0 0 4px rgba(167,139,250,.5))}

        /* Home Indicator */
        .home-indicator{
          display:flex;
          justify-content:center;
          padding:8px 0 20px;
          background:#111;
        }
        .home-indicator div{
          width:134px;
          height:5px;
          background:rgba(255,255,255,.25);
          border-radius:3px;
        }

        /* Desktop: center the phone */
        @media(min-width:769px){
          .wallet-root{background:#222}
          .wallet-app{
            border-radius:52px;
            box-shadow:0 0 0 11px #1a1a1a,0 0 0 13px #3a3a3a,0 40px 80px rgba(0,0,0,.7);
            min-height:0;
            height:90vh;
            max-height:860px;
            overflow-y:auto;
            scrollbar-width:none;
          }
          .wallet-app::-webkit-scrollbar{display:none}
        }
      `}</style>
    </div>
  );
}
