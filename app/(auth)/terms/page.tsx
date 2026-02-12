import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-foreground mb-6">
        Terms of Service
      </h1>

      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this service, you accept and agree to be
            bound by the terms and provision of this agreement. In addition,
            when using these particular services, you shall be subject to any
            posted guidelines or rules applicable to such services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            2. Description of Service
          </h2>
          <p>
            We provide an AI-powered learning path generation platform. You
            understand and agree that the Service is provided &quot;AS-IS&quot;
            and that we assume no responsibility for the timeliness, deletion,
            mis-delivery or failure to store any user communications or
            personalization settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            3. User Conduct
          </h2> 
          <p>
            You agree to use the Service only for purposes that are legal,
            proper and in accordance with these Terms and any applicable
            policies or guidelines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            4. Intellectual Property
          </h2>
          <p>
            The content, organization, graphics, design, compilation, magnetic
            translation, digital conversion and other matters related to the
            Site are protected under applicable copyrights, trademarks and other
            proprietary (including but not limited to intellectual property)
            rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            5. Disclaimer
          </h2>
          <p>
            The materials on our website are provided on an &apos;as is&apos;
            basis. We make no warranties, expressed or implied, and hereby
            disclaim and negate all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights.
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
