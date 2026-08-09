type LogoProps = {
  size?: number;
  className?: string;
  ringText?: boolean;
};

export default function Logo({ size = 96, className = '', ringText = true }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="मानव सेवा केंद्र लोगो"
    >
      <defs>
        <path id="logoRingPath" d="M 100,168 A 68,68 0 0 1 32,100" fill="none" />
        <linearGradient id="sunGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9b04b" />
          <stop offset="100%" stopColor="#e4741c" />
        </linearGradient>
        <linearGradient id="leafGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5cb96f" />
          <stop offset="100%" stopColor="#226f34" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="96" fill="#ffffff" stroke="#0c2454" strokeWidth="5" />
      <circle cx="100" cy="100" r="82" fill="none" stroke="#c1931f" strokeWidth="2" />

      <g>
        {Array.from({ length: 11 }).map((_, i) => {
          const angle = -180 + (i * 18);
          const rad = (angle * Math.PI) / 180;
          const cx = 100 + Math.cos(rad) * 46;
          const cy = 58 + Math.sin(rad) * 30;
          return (
            <circle key={i} cx={cx} cy={cy} r="2.6" fill="url(#sunGradient)" opacity={0.9} />
          );
        })}
        <path
          d="M62 58 L100 20 L138 58 Q100 34 62 58 Z"
          fill="url(#sunGradient)"
        />
        {Array.from({ length: 9 }).map((_, i) => {
          const angle = -160 + i * 20;
          const rad = (angle * Math.PI) / 180;
          const x1 = 100 + Math.cos(rad) * 26;
          const y1 = 44 + Math.sin(rad) * 14;
          const x2 = 100 + Math.cos(rad) * 50;
          const y2 = 44 + Math.sin(rad) * 34;
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e4741c" strokeWidth="3" strokeLinecap="round" />
          );
        })}
      </g>

      <g>
        <rect x="96" y="92" width="8" height="34" rx="2" fill="#7a5230" />
        <circle cx="100" cy="78" r="24" fill="url(#leafGradient)" />
        <circle cx="80" cy="94" r="16" fill="url(#leafGradient)" />
        <circle cx="120" cy="94" r="16" fill="url(#leafGradient)" />
      </g>

      <path
        d="M40 148 C 55 122, 78 118, 100 132 C 122 118, 145 122, 160 148 C 148 132, 122 128, 100 146 C 78 128, 52 132, 40 148 Z"
        fill="#163f80"
      />
      <path
        d="M34 152 C 52 158, 78 168, 100 168 C 122 168, 148 158, 166 152 C 148 172, 124 182, 100 182 C 76 182, 52 172, 34 152 Z"
        fill="#0f2f66"
      />

      {ringText && (
        <text fontSize="10.5" fill="#0a1c42" fontWeight={600} letterSpacing="0.5">
          <textPath href="#logoRingPath" startOffset="50%" textAnchor="middle">
            मानव सेवा हीच ईश्वर सेवा
          </textPath>
        </text>
      )}
    </svg>
  );
}
