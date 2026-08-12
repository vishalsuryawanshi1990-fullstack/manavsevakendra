import Image from 'next/image';

type LogoProps = {
  size?: number;
  className?: string;
};

export default function Logo({ size = 96, className = '' }: LogoProps) {
  return (
    <Image
      src="/images/new_logo.jpeg"
      alt="मानव सेवा केंद्र लोगो"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: 'contain' }}
      priority
    />
  );
}
