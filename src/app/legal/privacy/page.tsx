import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | KaziCast',
  description: 'How KaziCast collects, uses, stores, and protects your personal data under the Kenya Data Protection Act 2019.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="!text-text-muted !text-sm">Last updated: June 17, 2026 · Effective: June 17, 2026</p>

      <p>
        KaziCast (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the KaziCast platform at{' '}
        <a href="https://kazicast.com">kazicast.com</a>. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your personal data when you use our platform, in compliance with the{' '}
        <strong>Kenya Data Protection Act, 2019 (DPA)</strong> and the regulations issued by the Office
        of the Data Protection Commissioner (ODPC).
      </p>

      <h2>1. Data Controller</h2>
      <p>
        KaziCast Limited, registered in Kenya, is the data controller responsible for your personal data.
      </p>
      <table>
        <tbody>
          <tr><td><strong>Company</strong></td><td>KaziCast Limited</td></tr>
          <tr><td><strong>Address</strong></td><td>Nairobi, Kenya</td></tr>
          <tr><td><strong>Email</strong></td><td>privacy@kazicast.com</td></tr>
          <tr><td><strong>Data Protection Officer</strong></td><td>dpo@kazicast.com</td></tr>
        </tbody>
      </table>

      <h2>2. Data We Collect</h2>
      <h3>2.1 Information You Provide</h3>
      <table>
        <thead>
          <tr><th>Category</th><th>Data Points</th><th>Legal Basis</th></tr>
        </thead>
        <tbody>
          <tr><td>Account Information</td><td>Full name, email, phone number, password (hashed)</td><td>Contract performance</td></tr>
          <tr><td>Talent Profile</td><td>Bio, skills, experience, location, showreel/portfolio links</td><td>Contract performance</td></tr>
          <tr><td>Physical Attributes</td><td>Height, weight, age range, ethnicity, gender</td><td>Explicit consent</td></tr>
          <tr><td>Media</td><td>Headshots, photos, videos, voice recordings</td><td>Explicit consent</td></tr>
          <tr><td>Application Data</td><td>Casting applications, audition submissions, messages</td><td>Contract performance</td></tr>
          <tr><td>Payment Information</td><td>M-Pesa number, bank details (processed by third-party payment providers)</td><td>Contract performance</td></tr>
        </tbody>
      </table>

      <h3>2.2 Information We Collect Automatically</h3>
      <ul>
        <li>Device information (browser type, OS, screen resolution)</li>
        <li>IP address and approximate location</li>
        <li>Usage data (pages visited, features used, session duration)</li>
        <li>Cookies and similar technologies (see our <a href="/legal/cookies">Cookie Policy</a>)</li>
      </ul>

      <h3>2.3 Sensitive Personal Data</h3>
      <p>
        Under the Kenya DPA, certain data we collect qualifies as <strong>sensitive personal data</strong>,
        including ethnicity, photographs, and biometric-adjacent information. We only collect sensitive
        data with your <strong>explicit, informed consent</strong> and you may withdraw this consent at
        any time.
      </p>

      <h2>3. How We Use Your Data</h2>
      <ul>
        <li><strong>Platform Operations:</strong> Creating and managing your account, enabling casting applications, facilitating communication between talent and directors.</li>
        <li><strong>Matching:</strong> Displaying your talent profile to directors and casting professionals for relevant casting opportunities.</li>
        <li><strong>Communications:</strong> Sending casting updates, application status changes, and platform announcements.</li>
        <li><strong>Safety & Security:</strong> Detecting fraud, preventing abuse, and enforcing our Terms of Service.</li>
        <li><strong>Improvements:</strong> Analyzing aggregate usage patterns to improve the platform (always anonymised).</li>
        <li><strong>Legal Compliance:</strong> Meeting our obligations under Kenyan law, responding to lawful requests from authorities.</li>
      </ul>

      <h2>4. Data Sharing</h2>
      <p>We do <strong>not</strong> sell your personal data. We share data only in these circumstances:</p>
      <table>
        <thead>
          <tr><th>Recipient</th><th>Purpose</th><th>Safeguards</th></tr>
        </thead>
        <tbody>
          <tr><td>Directors & Casting Professionals</td><td>Viewing talent profiles you have made public</td><td>Platform access controls, Terms of Service</td></tr>
          <tr><td>Cloud Hosting Providers</td><td>Data storage and processing</td><td>Data Processing Agreements, encryption</td></tr>
          <tr><td>Payment Processors</td><td>Processing payments (M-Pesa, bank transfers)</td><td>PCI-DSS compliance, DPAs</td></tr>
          <tr><td>Analytics Providers</td><td>Anonymised usage analytics</td><td>Data anonymisation, no personal data shared</td></tr>
          <tr><td>Law Enforcement</td><td>When required by law or court order</td><td>Verified legal process only</td></tr>
        </tbody>
      </table>

      <h2>5. Cross-Border Data Transfers</h2>
      <p>
        Our platform may use cloud infrastructure located outside Kenya. In such cases, we ensure
        adequate safeguards are in place as required by Section 48 of the Kenya DPA, including:
      </p>
      <ul>
        <li>Data Processing Agreements with all sub-processors</li>
        <li>Ensuring the recipient country has adequate data protection laws, or</li>
        <li>Obtaining your explicit consent for the transfer</li>
        <li>Implementing appropriate technical measures (encryption in transit and at rest)</li>
      </ul>

      <h2>6. Data Retention</h2>
      <table>
        <thead>
          <tr><th>Data Type</th><th>Retention Period</th></tr>
        </thead>
        <tbody>
          <tr><td>Active account data</td><td>Duration of account + 12 months after deletion request</td></tr>
          <tr><td>Application history</td><td>24 months after casting closure</td></tr>
          <tr><td>Media (photos, videos)</td><td>Deleted within 30 days of account deletion</td></tr>
          <tr><td>Analytics data</td><td>Anonymised and retained indefinitely</td></tr>
          <tr><td>Legal/compliance records</td><td>As required by applicable Kenyan law (typically 7 years)</td></tr>
        </tbody>
      </table>

      <h2>7. Your Rights</h2>
      <p>
        Under the Kenya DPA 2019, you have the following rights (see our{' '}
        <a href="/legal/data-rights">Data Subject Rights</a> page for how to exercise them):
      </p>
      <ul>
        <li><strong>Right of Access:</strong> Request a copy of all personal data we hold about you.</li>
        <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data.</li>
        <li><strong>Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;).</li>
        <li><strong>Right to Restrict Processing:</strong> Limit how we use your data.</li>
        <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
        <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
        <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time for consent-based processing.</li>
      </ul>
      <p>
        To exercise any right, email <strong>dpo@kazicast.com</strong>. We will respond within{' '}
        <strong>30 days</strong> as required by the DPA.
      </p>

      <h2>8. Data Security</h2>
      <p>We implement industry-standard security measures including:</p>
      <ul>
        <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256)</li>
        <li>Password hashing using bcrypt with salt rounds</li>
        <li>Role-based access controls</li>
        <li>Regular security audits and vulnerability assessments</li>
        <li>Incident response procedures</li>
      </ul>

      <h2>9. Data Breach Notification</h2>
      <p>
        In the event of a personal data breach that poses a risk to your rights and freedoms, we will:
      </p>
      <ul>
        <li>Notify the <strong>Office of the Data Protection Commissioner (ODPC)</strong> within <strong>72 hours</strong></li>
        <li>Notify affected data subjects without undue delay</li>
        <li>Document the breach and remedial actions taken</li>
      </ul>

      <h2>10. Children&apos;s Data</h2>
      <p>
        See our <a href="/legal/minors">Minor&apos;s Policy</a> for details on how we handle data
        of users under 18. Parental or guardian consent is required for all minors.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be communicated
        via email and/or a prominent notice on the platform at least <strong>14 days</strong> before
        they take effect.
      </p>

      <h2>12. Contact & Complaints</h2>
      <p>For questions, concerns, or complaints about this Privacy Policy or our data practices:</p>
      <ul>
        <li><strong>Data Protection Officer:</strong> dpo@kazicast.com</li>
        <li><strong>General Inquiries:</strong> hello@kazicast.com</li>
      </ul>
      <p>
        If you are not satisfied with our response, you have the right to lodge a complaint with the{' '}
        <strong>Office of the Data Protection Commissioner (ODPC)</strong> at{' '}
        <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">www.odpc.go.ke</a>.
      </p>
    </>
  );
}
