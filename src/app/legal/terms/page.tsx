import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | KaziCast',
  description: 'Terms and conditions for using the KaziCast casting platform.',
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="!text-text-muted !text-sm">Last updated: June 17, 2026 · Effective: June 17, 2026</p>

      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the KaziCast
        platform operated by KaziCast Limited (&quot;KaziCast&quot;, &quot;we&quot;, &quot;us&quot;).
        By creating an account or using the platform, you agree to be bound by these Terms.
      </p>

      <h2>1. Eligibility</h2>
      <ul>
        <li>You must be at least <strong>18 years old</strong> to create an account independently.</li>
        <li>Users aged <strong>13–17</strong> may use the platform with verified parental or guardian consent (see our <a href="/legal/minors">Minor&apos;s Policy</a>).</li>
        <li>You must provide accurate, complete information during registration.</li>
        <li>You are responsible for maintaining the security of your account credentials.</li>
      </ul>

      <h2>2. Platform Description</h2>
      <p>
        KaziCast is a digital marketplace connecting talent (actors, models, voice artists, extras)
        with directors and casting professionals in East Africa. We provide the technology
        infrastructure—we are <strong>not</strong> a talent agency, employer, or production company.
      </p>

      <h2>3. User Accounts</h2>
      <h3>3.1 Account Types</h3>
      <ul>
        <li><strong>Talent:</strong> Individuals creating profiles to apply for casting opportunities.</li>
        <li><strong>Director:</strong> Casting professionals and production companies posting casting calls.</li>
      </ul>
      <h3>3.2 Account Responsibilities</h3>
      <ul>
        <li>You are responsible for all activity under your account.</li>
        <li>You must notify us immediately of any unauthorised access at <strong>security@kazicast.com</strong>.</li>
        <li>One person, one account. Multiple accounts may be terminated.</li>
      </ul>

      <h2>4. Talent Obligations</h2>
      <ul>
        <li>All profile information, media, and credentials must be <strong>truthful and current</strong>.</li>
        <li>You retain ownership of all content you upload (photos, videos, showreels).</li>
        <li>By uploading content, you grant KaziCast a <strong>limited, non-exclusive licence</strong> to display it to directors and casting professionals on the platform.</li>
        <li>You must not upload content that infringes third-party intellectual property rights.</li>
        <li>You must respond to casting offers in a timely and professional manner.</li>
      </ul>

      <h2>5. Director Obligations</h2>
      <ul>
        <li>Casting calls must be for <strong>legitimate, lawful productions</strong>.</li>
        <li>You must provide accurate details: role description, compensation, dates, and location.</li>
        <li>You must not use talent data obtained through KaziCast for purposes other than the stated casting.</li>
        <li>You must comply with Kenyan employment and labour laws, including the Employment Act, 2007.</li>
        <li>Compensation terms posted on a casting are <strong>binding commitments</strong>.</li>
        <li>Discriminatory casting criteria are prohibited unless they constitute a <strong>genuine occupational requirement</strong> for the role (e.g., specific age range, gender, or ethnicity required for character authenticity).</li>
      </ul>

      <h2>6. Prohibited Conduct</h2>
      <p>You must not:</p>
      <ul>
        <li>Post fraudulent, misleading, or scam casting calls</li>
        <li>Harass, intimidate, or discriminate against any user</li>
        <li>Solicit sexual favours or exploit power dynamics in casting</li>
        <li>Scrape, harvest, or bulk-download user profiles or data</li>
        <li>Use the platform to distribute malware or spam</li>
        <li>Circumvent platform safeguards or security measures</li>
        <li>Share another user&apos;s personal data without their consent</li>
        <li>Impersonate another person or entity</li>
      </ul>
      <p>
        Violations may result in immediate account suspension or termination and may be reported to
        law enforcement.
      </p>

      <h2>7. Content & Intellectual Property</h2>
      <ul>
        <li><strong>Your Content:</strong> You retain all rights to content you upload. We do not claim ownership.</li>
        <li><strong>Platform Content:</strong> KaziCast&apos;s branding, design, code, and platform features are our intellectual property.</li>
        <li><strong>DMCA & Takedowns:</strong> If you believe content infringes your IP, contact <strong>legal@kazicast.com</strong> with a description of the infringement.</li>
      </ul>

      <h2>8. Payments & Fees</h2>
      <ul>
        <li>KaziCast is currently free for talent to create profiles and apply for castings.</li>
        <li>Directors may be subject to platform fees for posting castings (details provided at time of posting).</li>
        <li>KaziCast does not process payments between talent and directors—compensation is arranged directly between parties.</li>
        <li>We reserve the right to introduce fees with <strong>30 days&apos; notice</strong>.</li>
      </ul>

      <h2>9. Disclaimers</h2>
      <ul>
        <li>KaziCast is provided <strong>&quot;as is&quot;</strong> without warranties of any kind.</li>
        <li>We do not guarantee that you will receive casting offers or find suitable talent.</li>
        <li>We are not responsible for the conduct, reliability, or quality of any user.</li>
        <li>We are not a party to any agreement between talent and directors.</li>
      </ul>

      <h2>10. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by Kenyan law, KaziCast&apos;s total liability to you for any
        claim arising from use of the platform shall not exceed the fees you have paid to KaziCast in
        the 12 months preceding the claim, or <strong>KES 50,000</strong>, whichever is greater.
      </p>
      <p>
        We are not liable for indirect, incidental, consequential, or punitive damages, including lost
        income, lost opportunities, or reputational harm.
      </p>

      <h2>11. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless KaziCast, its officers, employees, and agents from
        any claims, damages, or expenses arising from your violation of these Terms or your use of the
        platform.
      </p>

      <h2>12. Account Termination</h2>
      <ul>
        <li>You may delete your account at any time from your account settings.</li>
        <li>We may suspend or terminate accounts that violate these Terms, with notice where practicable.</li>
        <li>Upon termination, we will delete your personal data in accordance with our <a href="/legal/privacy">Privacy Policy</a>.</li>
      </ul>

      <h2>13. Dispute Resolution</h2>
      <ul>
        <li>These Terms are governed by the <strong>laws of the Republic of Kenya</strong>.</li>
        <li>Disputes will first be addressed through good-faith negotiation.</li>
        <li>If unresolved after 30 days, disputes shall be referred to <strong>mediation</strong> under the Nairobi Centre for International Arbitration (NCIA).</li>
        <li>If mediation fails, disputes shall be resolved through <strong>binding arbitration</strong> under the NCIA Rules.</li>
        <li>The courts of Kenya shall have jurisdiction for injunctive relief.</li>
      </ul>

      <h2>14. Changes to Terms</h2>
      <p>
        We may modify these Terms with <strong>14 days&apos; notice</strong> via email or platform
        notification. Continued use after the effective date constitutes acceptance. If you disagree
        with changes, you must stop using the platform and delete your account.
      </p>

      <h2>15. Contact</h2>
      <p>For questions about these Terms:</p>
      <ul>
        <li><strong>Email:</strong> legal@kazicast.com</li>
        <li><strong>Address:</strong> KaziCast Limited, Nairobi, Kenya</li>
      </ul>
    </>
  );
}
