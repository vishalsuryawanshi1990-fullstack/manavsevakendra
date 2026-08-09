'use client';

import { FormEvent, useRef, useState } from 'react';
import Logo from './Logo';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export type RegistrationVariant = 'life_membership' | 'donation';

export type RegistrationSettings = {
  life_membership_amount: number;
  donation_suggested_amounts: number[];
  razorpay_key_id: string;
  razorpay_enabled: boolean;
  address: string;
  reg_trust_number: string;
  reg_society_number: string;
};

/* ---------- small icons ---------- */

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" className="shrink-0">
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        fill="#0c2454"
      />
      <circle cx="12" cy="9.5" r="2.6" fill="#fbf5e6" />
    </svg>
  );
}

function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" className="shrink-0">
      <circle cx="12" cy="9" r="7" fill="#0c2454" />
      <path d="M8 15 L6 22 L12 19 L18 22 L16 15" fill="#0c2454" />
      <path d="M9 9 L11 11 L15 6" stroke="#fbf5e6" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg viewBox="0 0 100 100" width="72" height="72">
      <circle cx="50" cy="38" r="30" fill="#e4c05a" stroke="#a17419" strokeWidth="2" />
      <circle cx="50" cy="38" r="23" fill="#f9edc9" stroke="#c1931f" strokeWidth="1.5" />
      <path d="M35 60 L28 92 L50 80 L72 92 L65 60" fill="#7a1e1a" />
      <text x="50" y="34" textAnchor="middle" fontSize="9" fontWeight={800} fill="#7a1e1a">
        आपला
      </text>
      <text x="50" y="45" textAnchor="middle" fontSize="7.5" fontWeight={700} fill="#7a1e1a">
        सहभाग
      </text>
    </svg>
  );
}

function QrPlaceholder() {
  const cells = Array.from({ length: 49 }).map((_, i) => {
    const seed = (i * 37 + 11) % 97;
    return seed % 3 === 0;
  });
  return (
    <svg viewBox="0 0 70 70" width="70" height="70" className="rounded bg-white p-1">
      {cells.map((on, i) => {
        const x = (i % 7) * 10;
        const y = Math.floor(i / 7) * 10;
        return on ? <rect key={i} x={x} y={y} width="10" height="10" fill="#0a1c42" /> : null;
      })}
      <rect x="0" y="0" width="20" height="20" fill="none" stroke="#0a1c42" strokeWidth="3" />
      <rect x="50" y="0" width="20" height="20" fill="none" stroke="#0a1c42" strokeWidth="3" />
      <rect x="0" y="50" width="20" height="20" fill="none" stroke="#0a1c42" strokeWidth="3" />
    </svg>
  );
}

/* ---------- form primitives ---------- */

function RowShell({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[36px_1fr] border-b border-navy-300 last:border-b-0">
      <div className="flex items-center justify-center border-r border-navy-300 bg-navy-50 text-xs font-bold text-navy-700">
        {n}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Cell({
  label,
  children,
  full = false,
  border = true,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  border?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-[minmax(120px,0.9fr)_1.4fr] items-center gap-2 px-3 py-2 ${
        border ? 'sm:border-l border-navy-200' : ''
      } ${full ? 'sm:col-span-2' : ''}`}
    >
      <label className="text-xs font-bold text-navy-800 sm:text-[13px]">{label}</label>
      <div>{children}</div>
    </div>
  );
}

const inputCls =
  'w-full rounded-none border-0 border-b border-dotted border-navy-400 bg-transparent px-1 py-1 text-sm text-navy-900 outline-none focus:border-maroon-500 focus:bg-gold-50';

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

function DigitBoxes({ groups, name }: { groups: number[]; name: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {groups.map((len, gi) => (
        <span key={gi} className="flex items-center gap-1.5">
          {gi > 0 && <span className="text-navy-400">-</span>}
          {Array.from({ length: len }).map((_, i) => (
            <input
              key={i}
              name={`${name}_${gi}_${i}`}
              maxLength={1}
              inputMode="numeric"
              className="h-7 w-6 rounded border border-navy-300 bg-white text-center text-xs font-bold text-navy-900 outline-none focus:border-maroon-500"
            />
          ))}
        </span>
      ))}
    </div>
  );
}

function CheckboxPill({ name, value, label }: { name: string; value: string; label: string }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-semibold text-navy-800">
      <input type="radio" name={name} value={value} className="h-3.5 w-3.5 accent-maroon-600" />
      {label}
    </label>
  );
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ---------- main component ---------- */

type Stage = 'idle' | 'submitting' | 'awaiting_payment' | 'success' | 'error';

export default function MembershipFormExact({
  variant,
  settings,
}: {
  variant: RegistrationVariant;
  settings: RegistrationSettings;
}) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState<{ applicationNumber: string; paid: boolean } | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(settings.donation_suggested_amounts[0] ?? 500);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDonation = variant === 'donation';
  const displayAmount = isDonation ? donationAmount : settings.life_membership_amount;

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStage('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('registration_type', variant);
    if (isDonation) {
      formData.set('amount', String(donationAmount));
    }
    if (fileInputRef.current?.files?.[0]) {
      formData.set('photo', fileInputRef.current.files[0]);
    }

    try {
      const res = await fetch(`${API_BASE}/membership-applications`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message || 'सर्व्हर त्रुटी आली, कृपया पुन्हा प्रयत्न करा.');
      }

      if (!data.razorpay || !settings.razorpay_enabled) {
        setSuccessInfo({ applicationNumber: data.application_number, paid: false });
        setStage('success');
        form.reset();
        setPhotoPreview(null);
        return;
      }

      setStage('awaiting_payment');
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error('पेमेंट गेटवे लोड करता आले नाही. कृपया इंटरनेट कनेक्शन तपासा.');
      }

      const razorpay = new window.Razorpay({
        key: data.razorpay.key_id,
        amount: Math.round(data.razorpay.amount * 100),
        currency: 'INR',
        name: 'मानव सेवा केंद्र',
        description: isDonation ? 'देणगी नोंदणी' : 'आजीव सदस्यत्व शुल्क',
        order_id: data.razorpay.order_id,
        prefill: {
          name: String(formData.get('full_name') || ''),
          email: String(formData.get('email') || ''),
          contact: String(formData.get('mobile') || ''),
        },
        theme: { color: '#7a1e1a' },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify({
                application_id: data.application_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json().catch(() => null);
            if (!verifyRes.ok || !verifyData?.verified) {
              throw new Error(verifyData?.message || 'पेमेंट सत्यापित करता आले नाही.');
            }
            setSuccessInfo({ applicationNumber: data.application_number, paid: true });
            setStage('success');
            form.reset();
            setPhotoPreview(null);
          } catch (err) {
            setStage('error');
            setErrorMsg(err instanceof Error ? err.message : 'पेमेंट सत्यापित करता आले नाही.');
          }
        },
        modal: {
          ondismiss: () => {
            setStage('error');
            setErrorMsg('पेमेंट पूर्ण झाले नाही. आपला अर्ज जतन झाला आहे — आपण नंतर पुन्हा पेमेंट करू शकता किंवा कार्यालयाशी संपर्क साधू शकता.');
          },
        },
      });
      razorpay.open();
    } catch (err) {
      setStage('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'अर्ज सादर करता आला नाही. बॅकएंड सर्व्हर (Laravel API) सुरू आहे का ते तपासा.'
      );
    }
  }

  if (stage === 'success' && successInfo) {
    return (
      <div className="rounded-2xl border-2 border-leaf-500 bg-leaf-50 p-10 text-center">
        <p className="text-xl font-extrabold text-leaf-700">
          {successInfo.paid ? 'आपले पेमेंट यशस्वी झाले आहे!' : 'आपला अर्ज यशस्वीरित्या सादर झाला आहे!'}
        </p>
        <p className="mt-2 text-sm text-navy-700">अर्ज क्रमांक: {successInfo.applicationNumber}</p>
        {!successInfo.paid && (
          <p className="mt-2 text-sm text-navy-700">संस्थेकडून लवकरच आपल्याशी संपर्क साधला जाईल.</p>
        )}
        <button
          onClick={() => {
            setStage('idle');
            setSuccessInfo(null);
          }}
          className="mt-6 rounded-full bg-maroon-600 px-6 py-2.5 text-sm font-bold text-cream"
        >
          नवीन अर्ज भरा
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[880px] overflow-hidden rounded-lg border-[6px] border-navy-800 bg-white shadow-glass"
    >
      {/* corner accents */}
      <div className="relative h-2 bg-gradient-to-r from-gold-400 via-navy-800 to-gold-400" />

      {/* header */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b-2 border-navy-800 px-5 py-5 sm:px-8">
        <Logo size={92} />

        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-navy-900 sm:text-4xl">मानव सेवा केंद्र</h2>
          <p className="mt-1 flex items-center justify-center gap-2 text-xs font-bold text-maroon-600 sm:text-sm">
            <span className="text-gold-500">◆</span> मानव सेवा हीच ईश्वर सेवा <span className="text-gold-500">◆</span>
          </p>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] leading-5 text-navy-700 sm:text-xs">
            <PinIcon /> कार्यालय : {settings.address}
          </p>
          <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-semibold text-navy-800 sm:text-xs">
            <span className="flex items-center gap-1.5">
              <SealIcon /> सार्वजनिक विश्वस्त संस्था नोंदणी क्र. : {settings.reg_trust_number}
            </span>
            <span className="flex items-center gap-1.5">
              <SealIcon /> संस्था नोंदणी : {settings.reg_society_number}
            </span>
          </p>
        </div>

        <div className="flex w-28 flex-col items-center gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-32 w-24 flex-col items-center justify-center gap-1 rounded border-2 border-dashed border-navy-400 bg-navy-50 text-center text-[10px] font-semibold text-navy-500 hover:bg-navy-100"
          >
            {photoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoPreview} alt="फोटो पूर्वावलोकन" className="h-full w-full rounded object-cover" />
            ) : (
              <>
                <span className="text-lg">📷</span>
                पासपोर्ट साईज
                <br />
                फोटो येथे चिकटवा
              </>
            )}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" name="photo" className="hidden" onChange={onPhotoChange} />
        </div>
      </div>

      {/* application no / title banner / member no */}
      <div className="grid grid-cols-1 items-stretch gap-2 border-b-2 border-navy-800 bg-cream px-5 py-3 sm:grid-cols-[1fr_2fr_1fr] sm:px-8">
        <div className="flex items-center gap-2 text-xs font-bold text-navy-800">
          अर्ज क्रमांक :
          <input disabled className="flex-1 border-b border-dotted border-navy-400 bg-transparent px-1 text-navy-400" placeholder="कार्यालयासाठी" />
        </div>
        <div className="flex items-center justify-center rounded bg-navy-800 px-4 py-2 text-center text-sm font-extrabold tracking-wide text-cream sm:text-lg">
          {isDonation ? '★★ सर्वसाधारण नोंदणी व देणगी ★★' : '★★ आजीव सदस्यत्व अर्ज ★★'}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-navy-800 sm:justify-end">
          सदस्य क्रमांक :
          <input disabled className="flex-1 border-b border-dotted border-navy-400 bg-transparent px-1 text-navy-400 sm:max-w-[110px]" placeholder="कार्यालयासाठी" />
        </div>
      </div>

      {/* salutation + qr */}
      <div className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-[1fr_auto] sm:px-8">
        <div className="text-sm leading-7 text-navy-800">
          <p>प्रति,</p>
          <p>मा. अध्यक्ष,</p>
          <p>मानव सेवा केंद्र, मावळ, जि. पुणे.</p>
          <p className="mt-3">महोदय/महोदया,</p>
          <p>
            {isDonation ? (
              <>
                मी खाली सही करणारा/करणारी आपल्या मानव सेवा केंद्र या संस्थेच्या उपक्रमांना पाठिंबा देण्यासाठी खाली
                नमूद केलेली रक्कम देणगी/नोंदणी शुल्क म्हणून सादर करत आहे.
              </>
            ) : (
              <>
                मी खाली सही करणारा/करणारी आपल्या मानव सेवा केंद्र या संस्थेचे उद्दिष्ट, नियम व अटी मान्य करून आजीव
                सदस्य म्हणून प्रवेश मिळावा, अशी विनंती करीत आहे.
              </>
            )}
          </p>
        </div>
        <div className="flex flex-col items-center justify-start gap-1.5 justify-self-center rounded border border-navy-200 bg-navy-50 p-2.5">
          <QrPlaceholder />
          <p className="max-w-[110px] text-center text-[10px] font-semibold leading-tight text-navy-700">
            अधिक माहितीसाठी
            <br />
            QR Code स्कॅन करा
          </p>
        </div>
      </div>

      {/* applicant info banner */}
      <div className="bg-navy-800 px-5 py-2 text-sm font-bold text-cream sm:px-8">
        अर्जदाराची माहिती (कृपया ठळक अक्षरात वाचनीय स्वरूपात भरा)
      </div>

      {/* table */}
      <div className="border-b-2 border-navy-800 sm:mx-0">
        <RowShell n={1}>
          <Cell label="पूर्ण नाव (आडनाव प्रथम)" full border={false}>
            <TextInput name="full_name" required placeholder="उदा. देशमुख राजेश कुमार" />
          </Cell>
        </RowShell>
        <RowShell n={2}>
          <Cell label="वडिलांचे / पतीचे नाव" full border={false}>
            <TextInput name="father_or_husband_name" required />
          </Cell>
        </RowShell>
        <RowShell n={3}>
          <Cell label="जन्मतारीख" border={false}>
            <TextInput type="date" name="dob" required />
          </Cell>
          <Cell label="लिंग">
            <div className="flex flex-wrap gap-3">
              <CheckboxPill name="gender" value="पुरुष" label="पुरुष" />
              <CheckboxPill name="gender" value="महिला" label="महिला" />
              <CheckboxPill name="gender" value="इतर" label="इतर" />
            </div>
          </Cell>
        </RowShell>
        <RowShell n={4}>
          <Cell label="शैक्षणिक पात्रता" border={false}>
            <TextInput name="education" required />
          </Cell>
          <Cell label="व्यवसाय">
            <TextInput name="occupation" />
          </Cell>
        </RowShell>
        <RowShell n={5}>
          <Cell label="पूर्ण पत्ता" full border={false}>
            <textarea name="address" required rows={2} className={inputCls + ' resize-none'} />
          </Cell>
        </RowShell>
        <RowShell n={6}>
          <Cell label="तालुका" border={false}>
            <TextInput name="taluka" required />
          </Cell>
          <Cell label="जिल्हा">
            <TextInput name="district" required />
          </Cell>
        </RowShell>
        <RowShell n={7}>
          <Cell label="पिनकोड" border={false}>
            <DigitBoxes groups={[6]} name="pincode" />
          </Cell>
          <Cell label="राज्य">
            <TextInput name="state" required defaultValue="महाराष्ट्र" />
          </Cell>
        </RowShell>
        <RowShell n={8}>
          <Cell label="मोबाईल क्रमांक" border={false}>
            <TextInput type="tel" name="mobile" required />
          </Cell>
          <Cell label="व्हॉट्सअॅप क्रमांक">
            <TextInput type="tel" name="whatsapp" />
          </Cell>
        </RowShell>
        <RowShell n={9}>
          <Cell label="ई-मेल आयडी" border={false}>
            <TextInput type="email" name="email" required />
          </Cell>
          <Cell label="लँडलाईन क्रमांक (असल्यास)">
            <TextInput type="tel" name="landline" />
          </Cell>
        </RowShell>
        <RowShell n={10}>
          <Cell label="आधार क्रमांक" border={false}>
            <DigitBoxes groups={[4, 4, 4]} name="aadhar" />
          </Cell>
          <Cell label="पॅन क्रमांक (असल्यास)">
            <TextInput name="pan" placeholder="ABCDE1234F" maxLength={10} className={inputCls + ' uppercase'} />
          </Cell>
        </RowShell>
        <RowShell n={11}>
          <Cell label="रक्तगट" border={false}>
            <TextInput name="blood_group" placeholder="उदा. B+" />
          </Cell>
          <Cell label="वैवाहिक स्थिती">
            <div className="flex flex-wrap gap-3">
              <CheckboxPill name="marital_status" value="विवाहित" label="विवाहित" />
              <CheckboxPill name="marital_status" value="अविवाहित" label="अविवाहित" />
            </div>
          </Cell>
        </RowShell>
        <RowShell n={12}>
          <Cell label="आपली विशेष कौशल्ये / रुची" full border={false}>
            <TextInput name="special_skills" />
          </Cell>
        </RowShell>
        <RowShell n={13}>
          <Cell label="आपण संस्थेशी कसे जोडले जाऊ इच्छिता?" full border={false}>
            <TextInput name="how_to_join" />
          </Cell>
        </RowShell>
      </div>

      {/* payment amount */}
      <div className="border-b-2 border-navy-800">
        <div className="bg-gold-500 px-5 py-2 text-sm font-bold text-navy-900 sm:px-8">
          {isDonation ? 'देणगी / नोंदणी शुल्क रक्कम' : 'सदस्यत्व शुल्क'}
        </div>
        <div className="px-5 py-5 sm:px-8">
          {isDonation ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {settings.donation_suggested_amounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDonationAmount(amt)}
                    className={`rounded-full border-2 px-4 py-1.5 text-sm font-bold transition ${
                      donationAmount === amt
                        ? 'border-maroon-600 bg-maroon-600 text-cream'
                        : 'border-navy-300 text-navy-700 hover:border-maroon-400'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-navy-800">इतर रक्कम (₹):</label>
                <input
                  type="number"
                  min={1}
                  max={1000000}
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(Number(e.target.value) || 0)}
                  className="w-32 rounded-lg border border-navy-300 px-3 py-1.5 text-sm font-bold text-navy-900"
                />
              </div>
            </div>
          ) : (
            <p className="text-lg font-extrabold text-navy-900">
              ₹{settings.life_membership_amount.toLocaleString('en-IN')}{' '}
              <span className="text-sm font-semibold text-navy-500">(निश्चित आजीव सदस्यत्व शुल्क)</span>
            </p>
          )}
          {!settings.razorpay_enabled && (
            <p className="mt-3 text-xs font-semibold text-gold-800">
              टीप: ऑनलाईन पेमेंट सुविधा सध्या तयार होत आहे — अर्ज सादर केल्यावर संस्थेकडून शुल्क भरण्याबाबत संपर्क साधला जाईल.
            </p>
          )}
        </div>
      </div>

      {/* declaration */}
      <div className="border-b-2 border-navy-800">
        <div className="bg-maroon-700 px-5 py-2 text-sm font-bold text-cream sm:px-8">घोषणा</div>
        <div className="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-[1.5fr_1fr] sm:px-8">
          <p className="text-sm leading-7 text-navy-800">
            मी संस्थेची घटना, नियम व उपनियमांचे पालन करेन. संस्थेच्या उद्दिष्टांना पूरक कार्य करेन. संस्थेची प्रतिमा
            मलिन होईल असे कोणतेही कृत्य करणार नाही. माझी दिलेली सर्व माहिती खरी असून, ती चुकीची आढळल्यास माझे
            सदस्यत्व रद्द करण्याचा अधिकार संस्थेला राहील.
            <label className="mt-3 flex items-start gap-2 text-xs font-semibold text-navy-700">
              <input type="checkbox" name="declaration_accepted" required className="mt-0.5 h-3.5 w-3.5 accent-maroon-600" />
              मी वरील घोषणा वाचली असून मला ती मान्य आहे.
            </label>
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <label className="w-16 shrink-0 font-bold text-navy-800">दिनांक :</label>
              <TextInput type="date" name="declaration_date" />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-16 shrink-0 font-bold text-navy-800">स्थळ :</label>
              <TextInput name="declaration_place" />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-28 shrink-0 font-bold text-navy-800">अर्जदाराची सही :</label>
              <TextInput name="applicant_signature_name" placeholder="टाईप करा" />
            </div>
          </div>
        </div>
      </div>

      {/* proposer / seconder */}
      <div className="relative grid grid-cols-1 gap-6 border-b-2 border-navy-800 px-5 py-8 sm:grid-cols-2 sm:px-8">
        <div className="rounded-lg border-2 border-leaf-600">
          <div className="rounded-t-md bg-leaf-600 px-4 py-1.5 text-sm font-bold text-white">प्रस्तावक (Proposer)</div>
          <div className="space-y-2.5 p-4 text-sm">
            <FieldLine label="नाव" name="proposer_name" />
            <FieldLine label="सदस्य क्रमांक" name="proposer_member_number" />
            <FieldLine label="स्वाक्षरी" name="proposer_signature_name" />
            <FieldLine label="दिनांक" name="proposer_date" type="date" />
          </div>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
          <BadgeIcon />
        </div>

        <div className="rounded-lg border-2 border-navy-600">
          <div className="rounded-t-md bg-navy-600 px-4 py-1.5 text-sm font-bold text-white">अनुमोदक (Seconder)</div>
          <div className="space-y-2.5 p-4 text-sm">
            <FieldLine label="नाव" name="seconder_name" />
            <FieldLine label="सदस्य क्रमांक" name="seconder_member_number" />
            <FieldLine label="स्वाक्षरी" name="seconder_signature_name" />
            <FieldLine label="दिनांक" name="seconder_date" type="date" />
          </div>
        </div>
      </div>

      {/* office use only */}
      <div className="border-b-2 border-navy-800">
        <div className="bg-navy-700 px-5 py-2 text-sm font-bold text-cream sm:px-8">कार्यालयीन वापरासाठी</div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 p-5 text-xs text-navy-500 sm:grid-cols-3 sm:px-8">
          <OfficeField label="अर्ज प्राप्त दिनांक" />
          <OfficeField label="सदस्य क्रमांक" />
          <div>
            <p className="mb-1.5 font-bold">सदस्यत्व मंजूर / नामंजूर</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5">
                <input type="checkbox" disabled className="h-3.5 w-3.5" /> मंजूर
              </span>
              <span className="flex items-center gap-1.5">
                <input type="checkbox" disabled className="h-3.5 w-3.5" /> नामंजूर
              </span>
            </div>
          </div>
          <OfficeField label="सदस्यत्व शुल्क ₹" />
          <OfficeField label="संचालक मंडळाचा ठराव क्र." />
          <OfficeField label="कारण" />
          <OfficeField label="पावती क्रमांक" />
          <OfficeField label="ठराव दिनांक" />
        </div>
        <p className="px-5 pb-3 text-[10px] italic text-navy-400 sm:px-8">
          (हा विभाग केवळ कार्यालयीन वापरासाठी राखीव आहे — अर्जदाराने भरू नये.)
        </p>

        <div className="grid grid-cols-1 gap-6 border-t border-navy-200 px-5 py-6 text-center text-sm sm:grid-cols-3 sm:px-8">
          <div>
            <div className="mb-2 h-10 border-b border-navy-400" />
            <p className="font-bold text-navy-800">अध्यक्ष</p>
            <p className="text-[10px] text-navy-500">स्वाक्षरी</p>
          </div>
          <div>
            <div className="mb-2 h-10 border-b border-navy-400" />
            <p className="font-bold text-navy-800">सचिव</p>
            <p className="text-[10px] text-navy-500">स्वाक्षरी</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 h-16 w-16 rounded-full border-2 border-dashed border-navy-400" />
            <p className="font-bold text-navy-800">संस्थेचा शिक्का</p>
          </div>
        </div>
      </div>

      {/* footer tagline */}
      <div className="flex items-center justify-center gap-2 bg-navy-800 py-3 text-sm font-bold text-cream">
        📖 मानव सेवा हीच ईश्वर सेवा 🌿
      </div>

      {stage === 'error' && (
        <p className="border-t border-maroon-200 bg-maroon-50 px-6 py-3 text-center text-sm font-semibold text-maroon-700">
          {errorMsg}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4 bg-cream p-6">
        <button
          type="submit"
          disabled={stage === 'submitting' || stage === 'awaiting_payment'}
          className="rounded-full bg-maroon-600 px-8 py-3.5 font-bold text-cream shadow-card transition hover:bg-maroon-700 disabled:opacity-60"
        >
          {stage === 'submitting' && 'सादर करत आहे...'}
          {stage === 'awaiting_payment' && 'पेमेंट सुरू होत आहे...'}
          {(stage === 'idle' || stage === 'error') &&
            (settings.razorpay_enabled
              ? `अर्ज सादर करा व ₹${displayAmount.toLocaleString('en-IN')} भरा`
              : 'अर्ज सादर करा')}
        </button>
        <button
          type="reset"
          onClick={() => setPhotoPreview(null)}
          className="rounded-full border-2 border-navy-700 px-8 py-3.5 font-bold text-navy-800 transition hover:bg-navy-700 hover:text-cream"
        >
          रीसेट करा
        </button>
      </div>
    </form>
  );
}

function FieldLine({ label, name, type = 'text' }: { label: string; name: string; type?: string }) {
  return (
    <div className="flex items-center gap-2">
      <label className="w-24 shrink-0 font-semibold text-navy-700">{label} :</label>
      <TextInput type={type} name={name} />
    </div>
  );
}

function OfficeField({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <label className="w-40 shrink-0 font-semibold">{label} :</label>
      <input disabled className="flex-1 border-b border-dotted border-navy-300 bg-transparent px-1 py-1" />
    </div>
  );
}
