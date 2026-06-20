import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Subject Rights | KaziCast',
  description: 'How to exercise your data protection rights under the Kenya Data Protection Act 2019.',
};

export default function DataRightsPage() {
  return (
    <>
      <h1>Your Data Rights</h1>
      <p className="!text-text-muted !text-sm">Last updated: June 17, 2026</p>

      <p>
        Under the <strong>Kenya Data Protection Act, 2019</strong>, you have specific rights over
        your personal data. This page explains each right and how to exercise it with KaziCast.
      </p>

      <h2>Your Rights at a Glance</h2>
      <table>
        <thead>
          <tr><th>Right</th><th>What It Means</th><th>Timeframe</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Access</strong></td>
            <td>Request a copy of all personal data we hold about you</td>
            <td>30 days</td>
          </tr>
          <tr>
            <td><strong>Rectification</strong></td>
            <td>Correct inaccurate or incomplete data</td>
            <td>14 days</td>
          </tr>
          <tr>
            <td><strong>Erasure</strong></td>
            <td>Request deletion of your data (&quot;right to be forgotten&quot;)</td>
            <td>30 days</td>
          </tr>
          <tr>
            <td><strong>Restrict Processing</strong></td>
            <td>Limit how we process your data while a dispute is resolved</td>
            <td>14 days</td>
          </tr>
          <tr>
            <td><strong>Data Portability</strong></td>
            <td>Receive your data in a structured, machine-readable format (JSON/CSV)</td>
            <td>30 days</td>
          </tr>
          <tr>
            <td><strong>Object</strong></td>
            <td>Object to processing based on legitimate interests or direct marketing</td>
            <td>14 days</td>
          </tr>
          <tr>
            <td><strong>Withdraw Consent</strong></td>
            <td>Revoke consent for any consent-based processing</td>
            <td>Immediate</td>
          </tr>
        </tbody>
      </table>

      <h2>How to Submit a Request</h2>
      <h3>Option 1: Email</h3>
      <p>Send your request to <strong>dpo@kazicast.com</strong> with the following information:</p>
      <ul>
        <li>Your full name and email associated with your KaziCast account</li>
        <li>Which right you are exercising</li>
        <li>Any specific details (e.g., what data to correct, what to delete)</li>
        <li>A copy of your national ID or passport for identity verification</li>
      </ul>

      <h3>Option 2: In-Platform (Coming Soon)</h3>
      <p>
        We are building a self-service data rights dashboard within your account settings where
        you can download your data, request deletion, and manage consent preferences directly.
      </p>

      <h2>Identity Verification</h2>
      <p>
        To protect your data from unauthorised access, we require identity verification for all
        data rights requests. This typically involves confirming your email address and may require
        a government-issued ID for sensitive requests (erasure, portability).
      </p>
      <p>
        Verification documents are used solely for this purpose and deleted within 7 days of
        request completion.
      </p>

      <h2>What to Expect</h2>
      <ol>
        <li><strong>Acknowledgement:</strong> We confirm receipt of your request within <strong>3 business days</strong>.</li>
        <li><strong>Verification:</strong> We verify your identity (1–5 business days).</li>
        <li><strong>Processing:</strong> We process your request within the statutory timeframe.</li>
        <li><strong>Confirmation:</strong> We notify you when the request is complete, with details of actions taken.</li>
      </ol>

      <h2>Exceptions</h2>
      <p>In certain circumstances, we may not be able to fully comply with your request:</p>
      <ul>
        <li><strong>Legal obligations:</strong> We may be required to retain certain data under Kenyan law (e.g., financial records for tax purposes).</li>
        <li><strong>Legitimate interests:</strong> Where our interests override your request (e.g., fraud prevention).</li>
        <li><strong>Legal claims:</strong> If data is needed for establishing, exercising, or defending legal claims.</li>
        <li><strong>Third-party rights:</strong> If fulfilling the request would adversely affect the rights of another person.</li>
      </ul>
      <p>If we cannot comply, we will explain why within the response timeframe.</p>

      <h2>Data Export Format</h2>
      <p>When you request data portability, we provide your data in:</p>
      <ul>
        <li><strong>JSON format:</strong> Complete structured export of your profile, applications, and activity</li>
        <li><strong>ZIP archive:</strong> Including any uploaded media (photos, videos)</li>
      </ul>

      <h2>Complaints</h2>
      <p>
        If you are unsatisfied with our response, you have the right to complain to the{' '}
        <strong>Office of the Data Protection Commissioner (ODPC)</strong>:
      </p>
      <ul>
        <li><strong>Website:</strong> <a href="https://www.odpc.go.ke" target="_blank" rel="noopener noreferrer">www.odpc.go.ke</a></li>
        <li><strong>Email:</strong> complaints@odpc.go.ke</li>
        <li><strong>Phone:</strong> +254 20 2089761</li>
      </ul>

      <h2>Contact Our DPO</h2>
      <p>
        Our Data Protection Officer is your point of contact for all data rights matters:
      </p>
      <ul>
        <li><strong>Email:</strong> dpo@kazicast.com</li>
        <li><strong>Response time:</strong> Within 3 business days</li>
      </ul>
    </>
  );
}
