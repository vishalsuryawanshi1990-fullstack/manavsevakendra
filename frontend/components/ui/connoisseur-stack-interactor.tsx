'use client';

import { cn } from '@/lib/utils';
import { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface MenuItem {
  num: string;
  name: string;
  subtitle?: string;
  clipId: string;
  image: string;
}

const defaultItems: MenuItem[] = [
  {
    num: '01',
    name: 'Gourmet Burgers',
    clipId: 'clip-original',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '02',
    name: 'Fresh Desserts',
    clipId: 'clip-hexagons',
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
  {
    num: '03',
    name: 'Artisan Waffles',
    clipId: 'clip-pixels',
    image:
      'https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  },
];

export const Component = ({
  items = defaultItems,
  className,
}: {
  items?: MenuItem[];
  className?: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const mainGroupRef = useRef<SVGGElement>(null);
  const masterTl = useRef<gsap.core.Timeline | null>(null);

  const createLoop = (index: number) => {
    const item = items[index];
    const selector = `#${item.clipId} .path`;

    if (masterTl.current) masterTl.current.kill();

    if (imageRef.current) imageRef.current.setAttribute('href', item.image);
    if (mainGroupRef.current) mainGroupRef.current.setAttribute('clip-path', `url(#${item.clipId})`);

    gsap.set(selector, { scale: 0, transformOrigin: '50% 50%' });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // 1. IN (Expo Out)
    tl.to(selector, {
      scale: 1,
      duration: 0.8,
      stagger: { amount: 0.4, from: 'random' },
      ease: 'expo.out',
    })
      // 2. IDLE (Sine Breath)
      .to(selector, {
        scale: 1.05,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: 'sine.inOut',
        stagger: { amount: 0.2, from: 'center' },
      })
      // 3. OUT (Expo In)
      .to(selector, {
        scale: 0,
        duration: 0.6,
        stagger: { amount: 0.3, from: 'edges' },
        ease: 'expo.in',
      });

    masterTl.current = tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      createLoop(0);
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleItemHover = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    createLoop(index);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex flex-col md:flex-row items-center justify-between min-h-screen w-full p-8 md:p-24 overflow-hidden bg-navy-950',
        className,
      )}
    >
      {/* LEFT SIDE: HIGH CONTRAST MENU */}
      <div className="z-20 w-full md:w-1/2">
        <nav>
          <ul className="flex flex-col gap-14">
            {items.map((item, index) => (
              <li key={item.num} onMouseEnter={() => handleItemHover(index)} className="group cursor-pointer">
                <div className="flex items-start gap-6">
                  <span
                    className={cn(
                      'mt-2 text-3xl font-bold transition-all duration-500',
                      activeIndex === index ? 'scale-110 text-gold-400' : 'text-cream/30',
                    )}
                  >
                    {item.num}
                  </span>

                  <div>
                    {item.subtitle && (
                      <p
                        className={cn(
                          'mb-1 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-500',
                          activeIndex === index ? 'text-gold-400 opacity-100' : 'text-cream/30 opacity-0',
                        )}
                      >
                        {item.subtitle}
                      </p>
                    )}
                    <h2
                      className={cn(
                        'text-4xl md:text-5xl font-black uppercase leading-[0.95] tracking-tighter transition-all duration-700',
                        activeIndex === index
                          ? 'translate-x-4 text-cream opacity-100'
                          : 'translate-x-0 text-transparent opacity-40 [-webkit-text-stroke:1.5px_rgba(251,245,230,0.35)]',
                      )}
                    >
                      {item.name}
                    </h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* RIGHT SIDE: SQUARE GRID (Sharp Squares) */}
      <div className="relative mt-16 flex w-full items-center justify-center md:mt-0 md:w-1/2">
        <div className="absolute h-[120%] w-[120%] rounded-full bg-gold-500/10 blur-[120px]" />

        <svg
          viewBox="0 0 500 500"
          className="z-10 h-auto w-[100%] max-w-[500px] drop-shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <clipPath id="clip-original">
              <path
                className="path"
                d="M480.6,235H19.4c-6,0-10.8-4.9-10.8-10.8v-9.5c0-6,4.9-10.8,10.8-10.8h461.1c6,0,10.8,4.9,10.8,10.8v9.5C491.4,230.2,486.6,235,480.6,235z"
              />
              <path
                className="path"
                d="M483.1,362.4H16.9c-4.6,0-8.3-3.7-8.3-8.3v-1.8c0-4.6,3.7-8.3,8.3-8.3h466.1c4.6,0,8.3,3.7,8.3,8.3v1.8C491.4,358.7,487.7,362.4,483.1,362.4z"
              />
              <path
                className="path"
                d="M460.3,336.3H39.7c-17.2,0-31.1-13.9-31.1-31.1v-31.5c0-17.2,13.9-31.1,31.1-31.1h420.7c17.2,0,31.1,13.9,31.1,31.1v31.5C491.4,322.4,477.5,336.3,460.3,336.3z"
              />
              <path
                className="path"
                d="M459.2,196.2H40.8v-35c0-47.5,38.5-86,86-86h246.5c47.5,0,86,38.5,86,86V196.2z"
              />
              <path
                className="path"
                d="M441.9,424.9H58.1c-9.6,0-17.3-7.8-17.3-17.3v-37.4h418.5v37.4C459.2,417.1,451.5,424.9,441.9,424.9z"
              />
            </clipPath>

            <clipPath id="clip-hexagons">
              <rect className="path" x="20" y="20" width="200" height="280" rx="12" />
              <rect className="path" x="20" y="320" width="200" height="160" rx="12" />
              <rect className="path" x="240" y="20" width="240" height="140" rx="12" />
              <rect className="path" x="240" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="370" y="180" width="110" height="160" rx="12" />
              <rect className="path" x="240" y="360" width="240" height="120" rx="12" />
            </clipPath>

            {/* Grid Squares with rx="4" as requested */}
            <clipPath id="clip-pixels">
              {Array.from({ length: 9 }).map((_, i) => (
                <rect
                  key={i}
                  className="path"
                  x={(i % 3) * 160 + 20}
                  y={Math.floor(i / 3) * 160 + 20}
                  width="140"
                  height="140"
                  rx="4"
                />
              ))}
            </clipPath>

            {/* 4th variant, added for a 4-item stack */}
            <clipPath id="clip-columns">
              <rect className="path" x="20" y="20" width="100" height="460" rx="12" />
              <rect className="path" x="140" y="20" width="100" height="460" rx="12" />
              <rect className="path" x="260" y="20" width="100" height="460" rx="12" />
              <rect className="path" x="380" y="20" width="100" height="460" rx="12" />
            </clipPath>
          </defs>

          <g ref={mainGroupRef} clipPath={`url(#${items[0].clipId})`}>
            <image ref={imageRef} href={items[0].image} width="500" height="500" preserveAspectRatio="xMidYMid slice" />
          </g>
        </svg>
      </div>
    </div>
  );
};
