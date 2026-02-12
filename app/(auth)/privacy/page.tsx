import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Privacy Policy
      </h1>

      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            1. Information Collection
          </h2>
          <p>
            We collect information you provide directly to us, such as when you
            create or modify your account, request on-demand services, contact
            customer support, or otherwise communicate with us. This information
            may include: name, email, phone number, postal address, profile
            picture, payment method, items requested (for delivery services),
            delivery notes, and other information you choose to provide.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            2. Use of Information
          </h2>
          <p>
            We may use the information we collect about you for various
            purposes, including to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Provide, maintain and improve our services.</li>
            <li>Provide customer support.</li>
            <li>
              Send you technical notices, updates, security alerts and support
              and administrative messages.
            </li>
            <li>
              Monitor and analyze trends, usage and activities in connection
              with our Services.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            3. Sharing of Information
          </h2>
          <p>
            We may share the information we collect about you as described in
            this Statement or as described at the time of collection or sharing,
            including as follows:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              With third party vendors, consultants and other service providers
              who need access to such information to carry out work on our
              behalf.
            </li>
            <li>
              In response to a request for information if we believe disclosure
              is in accordance with any applicable law, regulation or legal
              process.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            4. Security
          </h2>
          <p>
            We take reasonable measures to help protect information about you
            from loss, theft, misuse and unauthorized access, disclosure,
            alteration and destruction.
          </p>
        </section>

        <div className="mt-8 pt-8 border-t border-border">
          <Link href="/signup" className="text-primary hover:underline">
            &larr; Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
