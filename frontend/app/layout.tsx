import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins, Noto_Sans_Devanagari } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-poppins' });
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-dev',
});

export const metadata: Metadata = {
  title: 'मानव सेवा केंद्र | Manav Seva Kendra — शिक्षण, संशोधन व सेवा',
  description:
    'मानव सेवा केंद्र, मावळ पुणे — स्कूल ऑफ इकॉनॉमिक्स, कॉम्प्युटर सायन्स व आयटी, स्कूल ऑफ सायकॉलॉजी आणि ग्रंथालय आणि संशोधन केंद्र या चार उपक्रमांसह. आजीव सदस्यत्वासाठी अर्ज करा.',
  openGraph: {
    title: 'मानव सेवा केंद्र | Manav Seva Kendra',
    description: 'शिक्षण, संशोधन, कौशल्य विकास आणि समाजसेवा यांचा संगम असलेली सार्वजनिक विश्वस्त संस्था.',
    type: 'website',
    locale: 'mr_IN',
    siteName: 'मानव सेवा केंद्र',
  },
  metadataBase: new URL('https://www.manavsevaeducation.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mr" className={`${inter.variable} ${poppins.variable} ${notoDevanagari.variable}`}>
      <body>{children}</body>
    </html>
  );
}
