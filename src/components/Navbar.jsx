import { Settings, Download } from 'lucide-react';

/* Guardian AI Shield Logo — faithful SVG recreation of the brand mark from image */
function ShieldLogo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldFill" x1="50" y1="0" x2="50" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0B1F3A" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer Shield Path */}
      <path
        d="M50 5 L92 20 L92 55 Q92 88 50 105 Q8 88 8 55 L8 20 Z"
        fill="url(#shieldFill)"
        stroke="#8AAACB"
        strokeWidth="1.5"
      />
      {/* Inner Radar/Target UI */}
      <circle cx="50" cy="50" r="22" stroke="#2563EB" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
      <circle cx="50" cy="50" r="16" stroke="#2563EB" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      <circle cx="50" cy="50" r="10" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.6" fill="rgba(37,99,235,0.1)" />
      
      {/* Crosshair ticks */}
      <line x1="50" y1="32" x2="50" y2="36" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="50" y1="64" x2="50" y2="68" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="50" x2="36" y2="50" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="64" y1="50" x2="68" y2="50" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Core Glow */}
      <circle cx="50" cy="50" r="5" fill="#2563EB" filter="url(#glow)" />
      <circle cx="50" cy="50" r="2.5" fill="white" />
    </svg>
  );
}

export default function Navbar({ onAction }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldLogo size={48} />
        </div>
        <div className="brand-text">
          <span className="brand-name">GUARDIAN AI</span>
          <span className="brand-subtitle">Where Safety Meets Technology</span>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="nav-settings-btn" onClick={() => onAction?.('Opening system settings...')}>
          <Settings size={14} />
          Settings
        </button>
        <button className="btn btn-navy" onClick={() => onAction?.('Generating export package (CSV/PDF)...')}>
          <Download size={14} />
          Export Data
        </button>
      </div>
    </nav>
  );
}
