import { Settings, Download } from 'lucide-react';

/* Guardian AI Shield Logo — faithful SVG recreation of the brand mark */
function ShieldLogo({ size = 46 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer shield border gradient */}
        <linearGradient id="shieldBorder" x1="50" y1="0" x2="50" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8D8EE" />
          <stop offset="100%" stopColor="#8AAACB" />
        </linearGradient>
        {/* Main shield fill gradient — dark navy */}
        <linearGradient id="shieldFill" x1="50" y1="0" x2="50" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2B4A7A" />
          <stop offset="50%" stopColor="#1A3460" />
          <stop offset="100%" stopColor="#0F2040" />
        </linearGradient>
        {/* Gloss highlight on shield */}
        <linearGradient id="shieldGloss" x1="30" y1="5" x2="70" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        {/* Blue glow for core target */}
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60B8FF" stopOpacity="1" />
          <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.4" />
        </radialGradient>
        {/* Outer ring glow */}
        <radialGradient id="ringGlow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.25" />
        </radialGradient>
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer border shield (light blue-gray ring) */}
      <path
        d="M50 4 L90 18 L90 55 Q90 88 50 106 Q10 88 10 55 L10 18 Z"
        fill="url(#shieldBorder)"
        opacity="0.55"
      />

      {/* Main shield body */}
      <path
        d="M50 10 L85 22 L85 56 Q85 84 50 100 Q15 84 15 56 L15 22 Z"
        fill="url(#shieldFill)"
      />

      {/* Gloss highlight */}
      <path
        d="M50 10 L85 22 L85 56 Q85 84 50 100 Q15 84 15 56 L15 22 Z"
        fill="url(#shieldGloss)"
      />

      {/* Outermost ring — faint halo */}
      <circle cx="50" cy="52" r="26" stroke="#3B82F6" strokeWidth="0.6" strokeOpacity="0.3" fill="none" />

      {/* Outer crosshair ring */}
      <circle cx="50" cy="52" r="20" stroke="#4A9EE8" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />

      {/* Crosshair tick marks */}
      <line x1="50" y1="32" x2="50" y2="36" stroke="#60B8FF" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
      <line x1="50" y1="68" x2="50" y2="72" stroke="#60B8FF" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
      <line x1="30" y1="52" x2="34" y2="52" stroke="#60B8FF" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>
      <line x1="66" y1="52" x2="70" y2="52" stroke="#60B8FF" strokeWidth="1" strokeOpacity="0.7" strokeLinecap="round"/>

      {/* Mid ring */}
      <circle cx="50" cy="52" r="13" stroke="#5BAEE0" strokeWidth="1" strokeOpacity="0.6" fill="none" filter="url(#glowFilter)" />

      {/* Inner ring */}
      <circle cx="50" cy="52" r="8" stroke="#7ECBFF" strokeWidth="1.2" strokeOpacity="0.8" fill="rgba(59,130,246,0.12)" />

      {/* Core glow disc */}
      <circle cx="50" cy="52" r="6" fill="url(#coreGlow)" filter="url(#softGlow)" />

      {/* Centre bright dot */}
      <circle cx="50" cy="52" r="3" fill="#E0F2FF" filter="url(#glowFilter)" />
      <circle cx="50" cy="52" r="1.5" fill="white" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldLogo size={48} />
        </div>
        <div className="brand-text">
          <span className="brand-name">Guardian AI</span>
          <span className="brand-subtitle">Research &amp; Analytics Dashboard</span>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="nav-settings-btn">
          <Settings size={14} />
          Settings
        </button>
        <button className="btn btn-navy">
          <Download size={14} />
          Export Data
        </button>
      </div>
    </nav>
  );
}
