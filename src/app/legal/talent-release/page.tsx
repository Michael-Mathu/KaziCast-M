import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Talent Release Agreement | KaziCast',
  description: 'Terms governing the use of talent profiles and media by directors and casting professionals on KaziCast.',
};

export default function TalentReleasePage() {
  return (
    <>
      <h1>Talent Release Agreement</h1>
      <p className="!text-text-muted !text-sm">Last updated: June 17, 2026</p>

      <p>
        This Talent Release Agreement (&quot;Agreement&quot;) governs how your profile information,
        photographs, videos, and other media (&quot;Talent Materials&quot;) are shared with directors
        and casting professionals through the KaziCast platform.
      </p>

      <h2>1. Scope of Release</h2>
      <p>By creating a talent profile on KaziCast, you grant:</p>
      <ul>
        <li>
          <strong>KaziCast</strong> a non-exclusive, revocable licence to display your Talent Materials
          on the platform to registered directors and casting professionals.
        </li>
        <li>
          <strong>Directors</strong> permission to view your profile, download your headshots for
          internal casting consideration, and share your profile within their production team for
          the specific casting you applied to.
        </li>
      </ul>

      <h2>2. What Directors Can Do</h2>
      <table>
        <thead>
          <tr><th>Permitted</th><th>Not Permitted</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>View your profile and media on-platform</td>
            <td>Use your likeness in any production without a separate written contract</td>
          </tr>
          <tr>
            <td>Download headshots for internal casting decisions</td>
            <td>Share your data with third parties outside the production team</td>
          </tr>
          <tr>
            <td>Share your profile within their production team</td>
            <td>Use your photos for marketing, advertising, or promotion without consent</td>
          </tr>
          <tr>
            <td>Contact you through KaziCast messaging</td>
            <td>Store your data beyond the casting period without consent</td>
          </tr>
        </tbody>
      </table>

      <h2>3. What This Agreement Does NOT Cover</h2>
      <p>
        This Agreement covers platform-based interactions only. It does <strong>not</strong> replace
        or constitute:
      </p>
      <ul>
        <li>An <strong>employment contract</strong> — engagement terms must be agreed separately</li>
        <li>A <strong>performance release</strong> — separate consent is required for using your performance in a production</li>
        <li>A <strong>likeness release</strong> — use of your image in marketing, trailers, or publicity requires a separate written agreement</li>
        <li>An <strong>NDA</strong> — if the production requires confidentiality, it must be agreed separately</li>
      </ul>

      <h2>4. Your Controls</h2>
      <ul>
        <li><strong>Profile visibility:</strong> You can set your profile to public or private at any time.</li>
        <li><strong>Application withdrawal:</strong> You can withdraw a casting application at any time before acceptance.</li>
        <li><strong>Media removal:</strong> You can remove any photos or videos from your profile at any time.</li>
        <li><strong>Account deletion:</strong> Deleting your account removes all your Talent Materials from the platform within 30 days.</li>
      </ul>

      <h2>5. Director Obligations</h2>
      <p>Directors who access Talent Materials through KaziCast agree to:</p>
      <ul>
        <li>Use materials <strong>solely for casting purposes</strong> related to the specific role or production</li>
        <li><strong>Delete downloaded materials</strong> within 90 days of casting completion if the talent was not selected</li>
        <li>Not create <strong>databases or repositories</strong> of talent data outside the platform</li>
        <li>Comply with the <strong>Kenya Data Protection Act, 2019</strong> in all handling of talent data</li>
      </ul>

      <h2>6. Compensation</h2>
      <p>
        This Agreement does not entitle talent to any compensation. Compensation for services
        (acting, modelling, voiceover, etc.) must be negotiated and agreed upon separately between
        the talent and the production in a formal engagement contract.
      </p>

      <h2>7. Revocation</h2>
      <p>
        You may revoke this release at any time by setting your profile to private or deleting your
        account. Revocation does not affect the lawfulness of processing based on consent before
        withdrawal, and does not apply to materials already lawfully downloaded by directors for
        active casting processes.
      </p>

      <h2>8. Governing Law</h2>
      <p>
        This Agreement is governed by the laws of the <strong>Republic of Kenya</strong>, including
        the Data Protection Act, 2019 and the Copyright Act, 2001.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about this agreement? Email <strong>legal@kazicast.com</strong>.
      </p>
    </>
  );
}
