export default function BuildingIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 420" className={className} role="img" aria-label="मानव सेवा ग्रंथालय इमारत रेखाचित्र">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bcd7f5" />
          <stop offset="100%" stopColor="#eaf3fc" />
        </linearGradient>
        <linearGradient id="facade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf8ec" />
          <stop offset="100%" stopColor="#f1e4c4" />
        </linearGradient>
      </defs>

      <rect width="640" height="420" fill="url(#sky)" />
      <rect y="340" width="640" height="80" fill="#cfe3c4" />

      {/* trees */}
      {[60, 130, 520, 580].map((x, i) => (
        <g key={i} transform={`translate(${x},300)`}>
          <rect x="-4" y="20" width="8" height="34" fill="#6b4a2b" />
          <circle cx="0" cy="0" r="26" fill="#3f8f4f" />
          <circle cx="-18" cy="14" r="18" fill="#357a43" />
          <circle cx="18" cy="14" r="18" fill="#357a43" />
        </g>
      ))}

      {/* building base / ground floor */}
      <rect x="150" y="230" width="340" height="110" fill="url(#facade)" stroke="#0c2454" strokeWidth="2" />
      {/* first floor */}
      <rect x="165" y="150" width="310" height="90" fill="url(#facade)" stroke="#0c2454" strokeWidth="2" />
      {/* second floor */}
      <rect x="180" y="80" width="280" height="80" fill="url(#facade)" stroke="#0c2454" strokeWidth="2" />
      {/* rooftop pediment */}
      <rect x="255" y="46" width="130" height="40" fill="#163f80" />
      <polygon points="245,46 395,46 320,14" fill="#0c2454" />

      {/* columns ground floor */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={162 + i * 40} y="230" width="10" height="110" fill="#e4c05a" opacity="0.8" />
      ))}

      {/* windows first + second floor */}
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={`f1-${i}`} x={190 + i * 48} y="170" width="26" height="40" fill="#163f80" opacity="0.85" rx="2" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={`f2-${i}`} x={205 + i * 48} y="100" width="26" height="40" fill="#163f80" opacity="0.85" rx="2" />
      ))}

      {/* entrance */}
      <rect x="295" y="270" width="50" height="70" fill="#0c2454" rx="4" />
      <rect x="280" y="336" width="80" height="8" fill="#932a25" />

      {/* plaque */}
      <rect x="255" y="56" width="130" height="18" fill="#fbf5e6" rx="2" />
      <text x="320" y="69" textAnchor="middle" fontSize="12" fill="#7a1e1a" fontWeight={700}>
        ज्ञानदीप दीप भव
      </text>

      {/* national flag */}
      <line x1="500" y1="60" x2="500" y2="230" stroke="#0c2454" strokeWidth="3" />
      <rect x="500" y="60" width="34" height="8" fill="#e4741c" />
      <rect x="500" y="68" width="34" height="8" fill="#fdf8ec" />
      <rect x="500" y="76" width="34" height="8" fill="#226f34" />

      {/* boundary */}
      <rect x="60" y="336" width="520" height="8" fill="#7a1e1a" />
    </svg>
  );
}
