import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ResumeForge',
  description:
    'The terms that govern your use of ResumeForge — accounts, purchases, seller obligations, AI tools, and liability.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service | ResumeForge',
    description:
      'The terms that govern your use of ResumeForge — accounts, purchases, seller obligations, AI tools, and liability.',
    url: '/terms',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | ResumeForge',
    description:
      'The terms that govern your use of ResumeForge — accounts, purchases, seller obligations, AI tools, and liability.',
  },
}

const sections = [
  {
    title: '1. Accounts',
    body: 'You must be at least 13 years old to create an account. You are responsible for keeping your login information secure and for any activity that happens under your account. If you think your account has been compromised, contact us immediately.',
  },
  {
    title: '2. Buying Templates',
    body: 'All template purchases are one time and final. When you buy a template, you receive a personal license to use and edit it for your own resume. You cannot resell, redistribute or claim ownership of any template you did not create yourself. All sales are non refundable unless the file is defective or was misrepresented in the listing.',
  },
  {
    title: '3. Selling Templates',
    body: 'If you are a seller on our platform, you confirm that you own the rights to anything you upload and that your templates do not contain stolen or copyrighted material. We take a percentage of each sale as a platform fee, which will be clearly disclosed before you list. We reserve the right to remove any listing that violates these terms.',
  },
  {
    title: '4. AI and Resume Tools',
    body: 'Our AI resume optimizer is meant to give suggestions and is not a guarantee of employment. Use the feedback as a guide, not as professional career advice.',
  },
  {
    title: '5. Prohibited Behavior',
    body: 'You agree not to upload malicious files, attempt to hack or disrupt the platform, impersonate other users, or use our service for anything illegal. Violating these rules can result in account termination.',
  },
  {
    title: '6. Changes to These Terms',
    body: 'We may update these terms from time to time. If we make major changes, we will notify users by email or through a notice on the site. Continuing to use Resume Marketplace after changes go into effect means you accept the new terms.',
  },
  {
    title: '7. Limitation of Liability',
    body: 'Resume Marketplace is not responsible for any damages that result from your use of templates or tools on our platform. We provide everything as is and do not make guarantees about job outcomes or hiring results.',
  },
  {
    title: '8. Contact Us',
    body: 'If you have questions about these terms, you can reach us at support@resumemarketplace.com.',
  },
]

export default function TermsPage() {
  return (
    <div className="bg-bg-base min-h-screen">
      <section className="container-page pt-[120px] pb-[40px] text-center">
        <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] bg-[#FF5C0015] border border-[#FF5C0040] rounded-[100px] text-accent text-[13px] font-medium mb-[24px]">
          ✦ Legal
        </span>
        <h1 className="font-serif text-[clamp(40px,6vw,64px)] text-text-primary font-normal leading-[1.1] max-w-[860px] mx-auto mt-0 mb-[16px]">
          Terms of Service
        </h1>
        <p className="text-text-muted text-[14px] m-0">
          Last Updated: April 15, 2026
        </p>
      </section>

      <section className="px-[80px] pb-[120px] max-w-[860px] mx-auto">
        <p className="text-text-secondary text-[17px] leading-[1.75] mt-0 mb-[48px]">
          Welcome to Resume Marketplace. By using our website and services, you
          agree to the following terms. Please read them carefully before
          making a purchase or creating an account.
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
