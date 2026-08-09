import HomeClient from '../components/HomeClient';
import { getCmsData, getSiteSettings } from '../lib/cms';

export default async function Home() {
  const [cms, settings] = await Promise.all([getCmsData(), getSiteSettings()]);

  return <HomeClient cms={cms} settings={settings} />;
}
