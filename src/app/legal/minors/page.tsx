import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Minor's Policy | KaziCast",
  description: 'Protections and requirements for users under 18 on the KaziCast platform.',
};

export default function MinorsPolicyPage() {
  return (
    <>
      <h1>Minor&apos;s Policy</h1>
      <p className="!text-text-muted !text-sm">Last updated: June 17, 2026</p>

      <p>
        KaziCast recognises that many productions require child and teenage actors. This policy
        outlines the additional protections we implement for users under <strong>18 years of age</strong>,
        in compliance with the <strong>Kenya Children Act, 2022</strong>, the{' '}
        <strong>Kenya Data Protection Act, 2019</strong>, and the{' '}
        <strong>Employment Act, 2007</strong>.
      </p>

      <h2>1. Age Requirements</h2>
      <table>
        <thead>
          <tr><th>Age Group</th><th>Account Policy</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Under 13</strong></td>
            <td>Cannot create an account. A parent/guardian may create a profile on their behalf with verified identity.</td>
          </tr>
          <tr>
            <td><strong>13–17</strong></td>
            <td>May create an account with verified parental/guardian consent.</td>
          </tr>
          <tr>
            <td><strong>18+</strong></td>
            <td>Standard account. No additional consent required.</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Parental/Guardian Consent</h2>
      <p>For any user under 18, the following consent process applies:</p>
      <ol>
        <li>The minor (or parent, for under-13s) initiates account creation.</li>
        <li>A <strong>consent form</strong> is sent to the parent/guardian&apos;s email address.</li>
        <li>The parent/guardian must <strong>verify their identity</strong> (national ID or passport) and <strong>sign the consent form</strong> electronically.</li>
        <li>The account is activated only after verified consent is received.</li>
        <li>The parent/guardian receives access to a <strong>guardian dashboard</strong> to monitor the minor&apos;s activity.</li>
      </ol>

      <h2>3. Profile Restrictions for Minors</h2>
      <ul>
        <li>Minor profiles are <strong>flagged</strong> in our system with additional protections.</li>
        <li>Minor profiles display <strong>age range only</strong> (e.g., &quot;14–16&quot;), not exact date of birth.</li>
        <li><strong>Contact information</strong> (phone, email) is hidden from directors — all communication goes through the parent/guardian.</li>
        <li>Minor profiles cannot be searched directly — directors must search for roles and minors are shown only for age-appropriate castings.</li>
      </ul>

      <h2>4. Casting Requirements for Minors</h2>
      <p>Directors posting castings that involve minors must:</p>
      <ul>
        <li>Clearly indicate that the role is for a minor in the casting description.</li>
        <li>Comply with the <strong>Employment Act, 2007</strong> provisions on child labour:
          <ul>
            <li>No work that is hazardous, harmful to health, or interferes with education</li>
            <li>Maximum working hours as prescribed by law</li>
            <li>Adequate rest periods</li>
          </ul>
        </li>
        <li>Obtain <strong>parental/guardian consent</strong> before any audition or engagement.</li>
        <li>Ensure a <strong>parent, guardian, or licensed chaperone</strong> is present at all times during auditions and production.</li>
        <li>Provide appropriate <strong>tutoring arrangements</strong> if production conflicts with school hours.</li>
      </ul>

      <h2>5. On-Set Protections</h2>
      <p>While KaziCast is a platform and not present on set, we require directors to confirm:</p>
      <ul>
        <li>A <strong>child welfare officer</strong> or licensed chaperone will be on set for all shooting days involving minors.</li>
        <li>Working hours comply with Kenyan law (no more than 4 hours for under-16s on school days).</li>
        <li>The minor will not be required to perform <strong>dangerous stunts, intimate scenes, or psychologically distressing content</strong> without prior approval from the parent/guardian and appropriate professional support.</li>
        <li>Earnings of the minor are <strong>protected</strong> and paid to a parent/guardian-managed account.</li>
      </ul>

      <h2>6. Data Protection for Minors</h2>
      <p>
        The Kenya DPA classifies children&apos;s data as <strong>sensitive personal data</strong>
        requiring enhanced protections:
      </p>
      <ul>
        <li>We process minor data <strong>only with verified parental consent</strong>.</li>
        <li>We apply the <strong>principle of data minimisation</strong> — collecting only what is strictly necessary.</li>
        <li>Minor data is <strong>never used</strong> for marketing, profiling, or analytics.</li>
        <li>Minor data is subject to <strong>enhanced security</strong> with restricted access within our team.</li>
        <li>Upon request, we delete all minor data within <strong>14 days</strong> (faster than our standard 30-day period).</li>
      </ul>

      <h2>7. Guardian Rights</h2>
      <p>Parents and guardians have the right to:</p>
      <ul>
        <li><strong>Access</strong> all data collected about the minor</li>
        <li><strong>Approve or reject</strong> any casting application before it is submitted</li>
        <li><strong>Withdraw consent</strong> and request deletion of the minor&apos;s account at any time</li>
        <li><strong>Monitor</strong> all communications between directors and the minor (all messages are copied to the guardian)</li>
        <li><strong>Set restrictions</strong> on the types of roles the minor can apply for</li>
      </ul>

      <h2>8. Reporting Concerns</h2>
      <p>
        If you have any concerns about the safety of a minor on KaziCast, contact us immediately:
      </p>
      <ul>
        <li><strong>Email:</strong> safety@kazicast.com (response within 12 hours for minor-related reports)</li>
        <li><strong>Kenya Childline:</strong> 116 (toll-free, 24/7)</li>
        <li><strong>National Council for Children&apos;s Services:</strong> +254 20 2727661</li>
      </ul>

      <h2>9. Contact</h2>
      <p>
        Questions about our Minor&apos;s Policy? Email <strong>safety@kazicast.com</strong> or{' '}
        <strong>dpo@kazicast.com</strong>.
      </p>
    </>
  );
}
