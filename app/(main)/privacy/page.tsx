import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ResumeForge',
  description:
    'What information ResumeForge collects, how we use it, and the rights you have over your data.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | ResumeForge',
    description:
      'What information ResumeForge collects, how we use it, and the rights you have over your data.',
    url: '/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | ResumeForge',
    description:
      'What information ResumeForge collects, how we use it, and the rights you have over your data.',
  },
}

const sections = [
  {
    title: 'What We Collect',
    body: 'We collect information you give us directly, such as your name, email address, and payment details when you register or make a purchase. We also collect information about how you use the site, like pages visited, templates viewed, and actions taken. If you use our AI resume tools, we may temporarily process the content you submit to generate feedback.',
  },
  {
    title: 'How We Use Your Information',
    body: 'We use your information to process purchases and manage your account, send receipts and important account updates, improve our platform and personalize your experience, and show relevant content like job board ads. We do not use your resume content to train AI models without your explicit consent.',
  },
  {
    title: 'Payment Information',
    body: 'We do not store your full credit card or payment details on our servers. All payment processing is handled by a secure third party provider. We only receive confirmation that a transaction was completed.',
  },
  {
    title: 'Sharing Your Information',
    body: 'We do not sell your personal information to anyone. We may share limited data with trusted third party services that help us run the platform, such as payment processors and hosting providers. These partners are required to keep your data secure and can only use it to perform services for us. We may also disclose information if required by law.',
  },
  {
    title: 'Cookies',
    body: 'We use cookies to keep you logged in, remember your preferences, and understand how people use our site. You can disable cookies in your browser settings, but some features may not work properly if you do.',
  },
  {
    title: 'Data Retention',
    body: 'We keep your account information for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where we are required by law to keep certain records.',
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, correct, or delete your personal information at any time. You can also request a copy of the data we have on you. To make any of these requests, contact us at support@resumemarketplace.com and we will respond within 30 days.',
  },
  {
    title: "Children's Privacy",
    body: 'Our platform is not intended for children under 13. We do not knowingly collect personal information from anyone under that age. If we discover that we have, we will delete it promptly.',
  },
  {
    title: 'Security',
    body: 'We take reasonable steps to protect your information, including encrypted connections and secure storage. No system is completely foolproof, but we are committed to keeping your data as safe as possible.',
  },
  {
    title: 'Contact Us',
    body: 'If you have any questions or concerns about this Privacy Policy, reach out to us at support@resumemarketplace.com.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="bg-bg-base min-h-screen">
      <section className="container-page pt-[120px] pb-[40px] text-center">
        <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] bg-[#FF5C0015] border border-[#FF5C0040] rounded-[100px] text-accent text-[13px] font-medium mb-[24px]">
          ✦ Legal
        </span>
        <h1 className="font-serif text-[clamp(40px,6vw,64px)] text-text-primary font-normal leading-[1.1] max-w-[860px] mx-auto mt-0 mb-[16px]">
          Privacy Policy
        </h1>
        <p className="text-text-muted text-[14px] m-0">
          Last Updated: April 15, 2026
        </p>
      </section>

      <section className="px-[80px] pb-[120px] max-w-[860px] mx-auto">
        <p className="text-text-secondary text-[17px] leading-[1.75] mt-0 mb-[48px]">
          This Privacy Policy explains what information we collect, how we use
          it, and what rights you have over your data. By using Resume
          Marketplace, you agree to the practices described here.
        </p>

        <div className="flex flex-col gap-[40px]">
          {sections.map((s) => (
            <div key={s.title} className="flex flex-col gap-[12px]">
              <h2 className="font-serif text-[24px] text-text-primary font-normal m-0">
                {s.title}
              </h2>
              <p className="text-text-secondary text-[16px] leading-[1.75] m-0">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
