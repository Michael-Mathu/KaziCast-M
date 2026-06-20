import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Guidelines | KaziCast',
  description: 'Standards of conduct for all KaziCast users — talent, directors, and casting professionals.',
};

export default function CommunityGuidelinesPage() {
  return (
    <>
      <h1>Community Guidelines</h1>
      <p className="!text-text-muted !text-sm">Last updated: June 17, 2026</p>

      <p>
        KaziCast is committed to building a <strong>safe, professional, and equitable</strong>{' '}
        casting ecosystem in East Africa. These guidelines apply to all users — talent, directors,
        casting professionals, and crew members. Violations may result in account suspension,
        permanent banning, or referral to law enforcement.
      </p>

      <h2>1. Professionalism & Respect</h2>
      <ul>
        <li>Treat all users with dignity and respect, regardless of their role, experience level, or background.</li>
        <li>Communication through the platform must remain professional and related to casting activities.</li>
        <li>Constructive feedback is welcome; personal attacks, insults, or demeaning language are not.</li>
      </ul>

      <h2>2. Zero Tolerance for Exploitation</h2>
      <p>
        The entertainment industry has a documented history of power imbalances and exploitation.
        KaziCast takes a <strong>zero-tolerance stance</strong> against:
      </p>
      <ul>
        <li><strong>Sexual harassment or coercion:</strong> Soliciting sexual favours in exchange for roles, auditions, or career advancement.</li>
        <li><strong>Quid pro quo arrangements:</strong> Any suggestion that casting decisions are contingent on personal favours.</li>
        <li><strong>Unwanted contact:</strong> Persistent messaging, calls, or contact attempts after someone has declined or not responded.</li>
        <li><strong>Intimidation:</strong> Threats related to career consequences for refusing personal requests.</li>
      </ul>
      <p>
        If you experience any of the above, report it immediately via our in-platform reporting
        feature or email <strong>safety@kazicast.com</strong>. All reports are investigated
        confidentially.
      </p>

      <h2>3. Anti-Discrimination</h2>
      <p>
        Discrimination based on race, ethnicity, gender, sexual orientation, disability, religion,
        age, or socioeconomic status is prohibited, <strong>unless</strong> a specific characteristic
        is a genuine occupational requirement for a role (e.g., a character that must be a specific
        age or ethnicity). In such cases, the casting call must clearly state this requirement and
        its justification.
      </p>

      <h2>4. Legitimate Castings Only</h2>
      <p>Directors must ensure that all casting calls are:</p>
      <ul>
        <li>For <strong>real, funded productions</strong> with defined timelines</li>
        <li><strong>Transparent</strong> about compensation — paid or unpaid must be clearly stated</li>
        <li><strong>Accurate</strong> in their descriptions of roles, requirements, and working conditions</li>
        <li>Compliant with <strong>Kenyan labour laws</strong>, including provisions around working hours, contracts, and payment</li>
      </ul>
      <p>
        Posting fake, misleading, or exploitative casting calls is a bannable offence and may be
        reported to relevant authorities.
      </p>

      <h2>5. Content Standards</h2>
      <h3>Profile Content</h3>
      <ul>
        <li>Use <strong>professional, appropriate photos</strong> for headshots and portfolios.</li>
        <li>Nudity or sexually explicit content is not permitted in profiles.</li>
        <li>All media must be content you own or have the right to use.</li>
      </ul>
      <h3>Casting Descriptions</h3>
      <ul>
        <li>If a role involves nudity, intimate scenes, or stunts, this must be <strong>clearly disclosed</strong> in the casting call.</li>
        <li>An <strong>intimacy coordinator</strong> should be engaged for any scenes involving physical intimacy.</li>
        <li>Talent has the right to decline any role requirement not disclosed upfront.</li>
      </ul>

      <h2>6. Privacy & Data Respect</h2>
      <ul>
        <li>Do not share another user&apos;s personal information (phone number, address, photos) outside the platform without their explicit consent.</li>
        <li>Do not screenshot or record private conversations without consent.</li>
        <li>Do not scrape, download, or collect user data in bulk.</li>
      </ul>

      <h2>7. Safe Auditions & Meetings</h2>
      <ul>
        <li>Auditions should be conducted in <strong>professional settings</strong> (studios, offices, public venues) — not private residences.</li>
        <li>Talent has the right to bring a <strong>companion</strong> to any in-person audition.</li>
        <li>Directors must provide clear details about audition location, time, and what to expect.</li>
        <li>No audition should require talent to remove clothing unless the role explicitly requires it, it was disclosed in advance, and a chaperone or intimacy coordinator is present.</li>
      </ul>

      <h2>8. Minors</h2>
      <p>
        All interactions with users under 18 must comply with our{' '}
        <a href="/legal/minors">Minor&apos;s Policy</a>. A parent or guardian must be present at
        all auditions and on-set activities involving minors.
      </p>

      <h2>9. Reporting & Enforcement</h2>
      <h3>How to Report</h3>
      <ul>
        <li><strong>In-platform:</strong> Use the report button on any profile, casting, or message.</li>
        <li><strong>Email:</strong> safety@kazicast.com</li>
        <li><strong>Anonymous tip:</strong> We accept anonymous reports, though providing contact details helps our investigation.</li>
      </ul>
      <h3>What Happens Next</h3>
      <ol>
        <li>We acknowledge your report within <strong>24 hours</strong>.</li>
        <li>We investigate the matter, which may include contacting involved parties.</li>
        <li>We take action ranging from a warning to permanent ban, depending on severity.</li>
        <li>Serious violations (sexual assault, fraud) are reported to <strong>Kenya Police</strong> and relevant authorities.</li>
      </ol>
      <h3>Consequences</h3>
      <table>
        <thead>
          <tr><th>Severity</th><th>Examples</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr><td>Minor</td><td>Unprofessional language, minor inaccuracies</td><td>Warning + content removal</td></tr>
          <tr><td>Moderate</td><td>Discriminatory casting, privacy violations</td><td>Temporary suspension (7–30 days)</td></tr>
          <tr><td>Severe</td><td>Harassment, exploitation, fraud, fake castings</td><td>Permanent ban + law enforcement referral</td></tr>
        </tbody>
      </table>

      <h2>10. Contact</h2>
      <p>
        Questions about these guidelines? Email <strong>community@kazicast.com</strong>.
      </p>
    </>
  );
}
