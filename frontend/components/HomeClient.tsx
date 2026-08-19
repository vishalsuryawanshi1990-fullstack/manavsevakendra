'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Logo from './Logo';
import MembershipFormExact from './MembershipFormExact';
import { Component as InstituteStackInteractor } from './ui/connoisseur-stack-interactor';
import type { CmsData, Institution, SiteSettings } from '../lib/cms';

const navLinks = [
  { href: '#home', label: 'मुख्यपृष्ठ' },
  { href: '#about', label: 'आमच्याविषयी' },
  { href: '#institutions', label: 'आमचे उपक्रम' },
  { href: '#campus', label: 'कॅम्पस दृष्टिकोन' },
  { href: '#membership', label: 'सदस्यत्व अर्ज' },
  { href: '#donation', label: 'देणगी नोंदणी' },
  { href: '#faq', label: 'प्रश्नोत्तरे' },
  { href: '#contact', label: 'संपर्क' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomeClient({ cms, settings }: { cms: CmsData; settings: SiteSettings }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="font-devanagari text-navy-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gold-200 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <Logo size={52} />
            <div>
              <p className="text-sm font-bold leading-tight text-navy-800 sm:text-base">मानव सेवा केंद्र</p>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-maroon-600">
                शिक्षण • संशोधन • कौशल्य विकास • सेवा
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-navy-700 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-maroon-600">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#membership"
            className="hidden rounded-full bg-maroon-600 px-5 py-2.5 text-sm font-bold text-cream shadow-card transition hover:bg-maroon-700 lg:inline-block"
          >
            आजीव सदस्य व्हा
          </a>

          <button
            aria-label="मेनू उघडा"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-navy-200 text-navy-700 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-gold-200 bg-cream px-6 py-4 lg:hidden">
            <nav className="flex flex-col gap-3 text-sm font-semibold text-navy-700">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <a
                href="#membership"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-maroon-600 px-5 py-2.5 text-center text-cream"
              >
                आजीव सदस्य व्हा
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-cream">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(196,155,42,0.18),_transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              शिक्षण, संशोधन व सेवा यांचा संगम
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-maroon-700 sm:text-5xl">{settings.hero_title}</h1>
            <p className="text-lg font-semibold text-gold-700">{settings.hero_location}</p>
            <p className="max-w-xl text-base leading-8 text-navy-700">{settings.hero_description}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#membership"
                className="rounded-full bg-maroon-600 px-7 py-3.5 text-center font-bold text-cream shadow-card transition hover:bg-maroon-700"
              >
                आजीव सदस्य व्हा
              </a>
              <a
                href="#institutions"
                className="rounded-full border-2 border-navy-700 px-7 py-3.5 text-center font-bold text-navy-800 transition hover:bg-navy-700 hover:text-cream"
              >
                आमचे उपक्रम पहा
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[2rem] border-4 border-white bg-white p-3 shadow-glass"
          >
            <Image
              src="/images/home-banner.png"
              alt="मानव सेवा केंद्र — १ एकर कॅम्पस संकल्पनात्मक आराखडा"
              width={1535}
              height={1024}
              priority
              className="w-full rounded-[1.5rem]"
            />
            <span className="absolute -bottom-3 left-6 rounded-full bg-maroon-600 px-4 py-1.5 text-xs font-bold text-cream shadow-card">
              कॅम्पस पायाभूत सुविधा — Vision 2035
            </span>
          </motion.div>
        </div>
      </section>

      {/* Trust badge strip */}
      <section className="border-y border-gold-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 sm:grid-cols-4 lg:px-8">
          {cms.trust_stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-extrabold text-maroon-700 sm:text-xl">{s.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-navy-600 sm:text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Institutions overview */}
      <section id="institutions" className="bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">आमचे उपक्रम</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">मानव सेवा केंद्र अंतर्गत ४ उपक्रम</h2>
            <p className="mx-auto mt-3 max-w-2xl text-navy-700">
              एकाच १ एकर कॅम्पसवर संकल्पित असलेली चार स्वतंत्र शैक्षणिक व सेवाभावी उपक्रम/महाविद्यालये.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cms.institutions.map((inst, i) => (
              <motion.div
                key={inst.id}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col rounded-2xl border border-gold-200 bg-white p-6 shadow-card"
              >
                <span className="text-4xl">{inst.icon}</span>
                <h3 className="mt-4 text-lg font-extrabold text-navy-900">{inst.nameMr}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-maroon-600">{inst.nameEn}</p>
                <p className="mt-3 flex-1 text-sm leading-6 text-navy-700">{inst.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {inst.tags.map((t) => (
                    <span key={t} className="rounded-full bg-navy-50 px-2.5 py-1 text-[10px] font-semibold text-navy-700">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={`#${inst.id}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-maroon-600 hover:text-maroon-700"
                >
                  अधिक जाणून घ्या →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutions interactive showcase */}
      <InstitutionsShowcase institutions={cms.institutions} />

      {/* About / Mission / Journey */}
      <section id="about" className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">आमच्याविषयी</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">आमचे ध्येय व वाटचाल</h2>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="rounded-2xl border border-gold-200 bg-white p-8 shadow-card">
              <h3 className="text-lg font-extrabold text-navy-900">आमचे ध्येय</h3>
              <p className="mt-4 text-sm leading-8 text-navy-700">{settings.mission_text}</p>
              <ul className="mt-6 space-y-2.5">
                {cms.vision_pillars.slice(0, 4).map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm font-semibold text-navy-800">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>

            <div className="space-y-5">
              {cms.journey.map((step, i) => (
                <motion.div
                  key={step.year}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 rounded-2xl border border-gold-200 bg-white p-6 shadow-card"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-800 text-center text-[11px] font-extrabold leading-tight text-cream">
                    {step.year}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900">{step.title}</h4>
                    <p className="mt-1.5 text-sm leading-6 text-navy-700">{step.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* School of Economics */}
      <InstitutionIntro index={1} inst={cms.institutions[0]} bg="bg-cream" />

      {/* Computer Science & IT */}
      <InstitutionIntro index={2} inst={cms.institutions[1]} bg="bg-navy-50" />

      {/* School of Psychology */}
      <InstitutionIntro index={3} inst={cms.institutions[2]} bg="bg-cream" />

      {/* Library & Research Center intro */}
      <InstitutionIntro index={4} inst={cms.institutions[3]} bg="bg-navy-50" />

      {/* Floor plans */}
      <section id="floors" className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">मजला आराखडा</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">2D फ्लोअर प्लॅन</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {cms.floors.map((floor, i) => (
              <motion.div
                key={floor.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-gold-200 bg-white p-7 shadow-card"
              >
                <div className="flex items-center justify-between border-b border-gold-100 pb-4">
                  <h3 className="text-xl font-extrabold text-navy-900">{floor.title}</h3>
                  <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-bold text-cream">{floor.area}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {floor.rooms.map((room) => (
                    <li key={room} className="flex items-start gap-2.5 text-sm text-navy-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-600" />
                      {room}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery / Interior views */}
      <section id="gallery" className="bg-gold-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">आंतरंग दृश्ये</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">Interior Views</h2>
            <p className="mx-auto mt-3 max-w-2xl text-navy-700">प्रस्तावित इमारतीतील महत्त्वाच्या दालनांची झलक.</p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cms.gallery.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-gold-200 bg-white py-10 text-center shadow-card"
              >
                <span className="text-4xl">{item.icon}</span>
                <p className="font-bold text-navy-900">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">वैशिष्ट्ये</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">सुविधा</h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="rounded-2xl bg-white shadow-card">
              <div className="rounded-t-2xl bg-maroon-600 px-6 py-3">
                <h3 className="text-lg font-extrabold text-cream">प्रमुख वैशिष्ट्ये</h3>
              </div>
              <ul className="grid gap-3 p-6 sm:grid-cols-2">
                {cms.main_facilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ delay: 0.1 }} className="rounded-2xl bg-white shadow-card">
              <div className="rounded-t-2xl bg-navy-700 px-6 py-3">
                <h3 className="text-lg font-extrabold text-cream">बाह्य सुविधा</h3>
              </div>
              <ul className="grid gap-3 p-6 sm:grid-cols-2">
                {cms.outdoor_facilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-navy-700">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campus Vision */}
      <section id="campus" className="bg-leaf-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <span className="inline-block rounded-full bg-leaf-600 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Vision 2035
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-navy-900 sm:text-4xl">१ एकर कॅम्पस संकल्पनात्मक आराखडा</h2>
            <p className="mx-auto mt-3 max-w-2xl text-navy-700">
              गुणवत्तापूर्ण शिक्षण, कौशल्य व संस्काराचे आदर्श केंद्र बनविण्याचा संकल्प — मानव सेवा केंद्र, मावळ, पुणे.
            </p>
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="overflow-hidden rounded-2xl border-4 border-white shadow-glass">
              <Image
                src="/images/home-banner.png"
                alt="मानव सेवा केंद्र — १ एकर कॅम्पस संकल्पनात्मक आराखडा"
                width={1535}
                height={1024}
                className="w-full"
              />
            </motion.div>

            <div className="space-y-6">
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="rounded-2xl bg-white p-6 shadow-card">
                <h3 className="text-lg font-extrabold text-navy-900">कॅम्पसमधील इमारती</h3>
                <ul className="mt-4 space-y-2.5">
                  {cms.campus_buildings.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-navy-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-maroon-600" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ delay: 0.1 }} className="rounded-2xl bg-white p-6 shadow-card">
                <h3 className="text-lg font-extrabold text-navy-900">कॅम्पसच्या वैशिष्ट्ये</h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {cms.campus_features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-navy-700">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mt-10 grid grid-cols-2 gap-4 rounded-2xl bg-navy-900 p-8 text-center sm:grid-cols-4 lg:grid-cols-7"
          >
            {cms.vision_pillars.map((p) => (
              <div key={p} className="text-xs font-bold text-cream sm:text-sm">
                {p}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Membership Form */}
      <section id="membership" className="bg-navy-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">आजीव सदस्यत्व</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">आजीव सदस्यत्व अर्ज</h2>
            <p className="mx-auto mt-3 max-w-2xl text-navy-700">
              मूळ छापील अर्जाप्रमाणेच रचना असलेला हा फॉर्म भरून थेट ऑनलाईन सादर करा व निश्चित शुल्क भरा.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}>
            <MembershipFormExact variant="life_membership" settings={settings} />
          </motion.div>
        </div>
      </section>

      {/* Donation / General registration */}
      <section id="donation" className="bg-cream py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">सर्वसाधारण नोंदणी व देणगी</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">देणगी नोंदणी अर्ज</h2>
            <p className="mx-auto mt-3 max-w-2xl text-navy-700">
              आजीव सदस्यत्व नको असल्यास, संस्थेच्या उपक्रमांना पाठिंबा देण्यासाठी आपल्या इच्छेनुसार कोणतीही रक्कम देणगी
              म्हणून नोंदवा.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={fadeUp}>
            <MembershipFormExact variant="donation" settings={settings} />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-maroon-600">प्रश्नोत्तरे</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">वारंवार विचारले जाणारे प्रश्न</h2>
          </motion.div>

          <div className="space-y-3">
            {cms.faq.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-navy-950 py-14 text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={48} />
              <div>
                <p className="font-extrabold">मानव सेवा केंद्र</p>
                <p className="text-xs text-navy-200">मानव सेवा हीच ईश्वर सेवा</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-navy-200">{settings.address}</p>
          </div>

          <div>
            <p className="font-bold text-gold-300">जलद दुवे</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-200">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-bold text-gold-300">नोंदणी तपशील</p>
            <ul className="mt-4 space-y-2 text-sm text-navy-200">
              <li>सार्वजनिक विश्वस्त संस्था नोंदणी क्र. : {settings.reg_trust_number}</li>
              <li>संस्था नोंदणी : {settings.reg_society_number}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-6 pt-6 text-center text-xs text-navy-300 lg:px-8">
          © {new Date().getFullYear()} मानव सेवा केंद्र. सर्व हक्क राखीव.
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <a
        href="#membership"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-maroon-600 px-5 py-3.5 text-sm font-bold text-cream shadow-glass transition hover:bg-maroon-700 lg:hidden"
      >
        आजीव सदस्य व्हा
      </a>
    </main>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="overflow-hidden rounded-2xl border border-gold-200 bg-white shadow-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-bold text-navy-900"
      >
        {q}
        <span className={`shrink-0 text-maroon-600 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="px-6 pb-5 text-sm leading-7 text-navy-700">{a}</p>}
    </div>
  );
}

function InstitutionIntro({ index, inst, bg }: { index: number; inst: Institution; bg: string }) {
  const isLibrary = inst.id === 'library';
  return (
    <section id={inst.id} className={`${bg} py-16`}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-4xl px-6 text-center lg:px-8"
      >
        <span className="inline-block rounded-full bg-navy-800 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-cream">
          उपक्रम {index} / ४
        </span>
        <div className="mt-5 text-5xl">{inst.icon}</div>
        <h2 className="mt-3 text-3xl font-extrabold text-navy-900 sm:text-4xl">{inst.nameMr}</h2>
        <p className="mt-1 text-sm font-bold uppercase tracking-wide text-maroon-600">
          {inst.nameEn} · {inst.tagline}
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-navy-700">{inst.desc}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {inst.tags.map((t) => (
            <span key={t} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 shadow-card">
              {t}
            </span>
          ))}
        </div>
        {!isLibrary && (
          <p className="mx-auto mt-6 max-w-xl rounded-xl border border-gold-300 bg-gold-50 px-5 py-3 text-sm font-semibold text-gold-800">
            सविस्तर अभ्यासक्रम, प्रवेश प्रक्रिया व इतर माहिती लवकरच जाहीर करण्यात येईल.
          </p>
        )}
        {isLibrary && (
          <p className="mx-auto mt-6 max-w-xl text-sm font-semibold text-navy-600">
            खालील तपशील पहा — मजला आराखडा, सुविधा व आंतरंग दृश्ये.
          </p>
        )}
      </motion.div>
    </section>
  );
}

// Maps each institution to the hover-reveal image + clip-path shape used by the showcase below.
const SHOWCASE_VISUALS: Record<string, { image: string; clipId: string }> = {
  economics: { image: '/images/eco-building.png', clipId: 'clip-original' },
  'computer-science': { image: '/images/IT-building-front.png', clipId: 'clip-hexagons' },
  psychology: { image: '/images/psycho-main-build.png', clipId: 'clip-pixels' },
  library: { image: '/images/Library.png', clipId: 'clip-columns' },
};

function InstitutionsShowcase({ institutions }: { institutions: Institution[] }) {
  const items = institutions.map((inst, i) => {
    const visual = SHOWCASE_VISUALS[inst.id] ?? { image: '/images/home-banner.png', clipId: 'clip-original' };
    return {
      num: String(i + 1).padStart(2, '0'),
      name: inst.nameMr,
      subtitle: inst.nameEn,
      clipId: visual.clipId,
      image: visual.image,
    };
  });

  return (
    <section id="institutions-showcase">
      <InstituteStackInteractor items={items} />
    </section>
  );
}
