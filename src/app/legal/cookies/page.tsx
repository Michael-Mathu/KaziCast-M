import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | KaziCast',
  description: 'How KaziCast uses cookies and similar tracking technologies.',
};

export default function CookiePolicyPage() {
  return (
    <>
      <h1>Cookie Policy</h1>
      <p className="!text-text-muted !text-sm">Last updated: June 17, 2026</p>

      <p>
        This Cookie Policy explains how KaziCast Limited (&quot;we&quot;, &quot;us&quot;) uses cookies
        and similar technologies on the KaziCast platform. It should be read alongside our{' '}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help the
        site remember your preferences, keep you signed in, and understand how you use the platform.
      </p>

      <h2>2. Cookies We Use</h2>
      <table>
        <thead>
          <tr><th>Cookie</th><th>Type</th><th>Purpose</th><th>Duration</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>next-auth.session-token</code></td>
            <td>Strictly Necessary</td>
            <td>Keeps you signed in to your account</td>
            <td>Session / 30 days</td>
          </tr>
          <tr>
            <td><code>next-auth.csrf-token</code></td>
            <td>Strictly Necessary</td>
            <td>Protects against cross-site request forgery attacks</td>
            <td>Session</td>
          </tr>
          <tr>
            <td><code>next-auth.callback-url</code></td>
            <td>Strictly Necessary</td>
            <td>Remembers where to redirect you after login</td>
            <td>Session</td>
          </tr>
          <tr>
            <td><code>theme</code></td>
            <td>Functional</td>
            <td>Remembers your light/dark mode preference</td>
            <td>Persistent (localStorage)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Cookie Categories</h2>
      <h3>Strictly Necessary Cookies</h3>
      <p>
        These cookies are essential for the platform to function. They enable core features like
        authentication and security. You cannot opt out of these cookies as the platform will not
        work without them.
      </p>

      <h3>Functional Cookies</h3>
      <p>
        These remember your preferences (like theme choice) to provide a personalised experience.
        They do not track you across other websites.
      </p>

      <h3>Analytics Cookies</h3>
      <p>
        We may use anonymised analytics to understand how users interact with the platform. If
        introduced, these will be opt-in and clearly disclosed. We currently do <strong>not</strong>{' '}
        use third-party tracking cookies (Google Analytics, Facebook Pixel, etc.).
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        We currently do not set any third-party cookies. If this changes in the future, we will
        update this policy and notify you accordingly.
      </p>

      <h2>5. How to Control Cookies</h2>
      <p>You can manage cookies through your browser settings:</p>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
        <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
        <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
      </ul>
      <p>
        Note that blocking strictly necessary cookies will prevent you from using the platform.
      </p>

      <h2>6. Local Storage</h2>
      <p>
        In addition to cookies, we use your browser&apos;s <strong>localStorage</strong> to store
        your theme preference. This data stays on your device and is never sent to our servers.
      </p>

      <h2>7. Changes</h2>
      <p>
        We will update this Cookie Policy if we introduce new cookies or tracking technologies.
        Check this page periodically for changes.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about our use of cookies? Email <strong>privacy@kazicast.com</strong>.
      </p>
    </>
  );
}
