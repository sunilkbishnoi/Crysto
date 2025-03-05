
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCurrencyChange={() => {}} />
      
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-3">Privacy Policy</h1>
        <p className="text-muted-foreground text-center mb-8">
          Last updated: June 1, 2023
        </p>
        <Separator className="my-6" />
        
        <ScrollArea className="h-[600px] rounded-md p-4">
          <div className="space-y-8 pr-4">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                At CRYST0, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              <p className="text-muted-foreground">
                This privacy policy applies to all users of the CRYST0 platform, including the website, mobile applications, and all related services.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">2. Data We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                <li><strong>Financial Data</strong> includes payment card details (stored securely through our payment processors).</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Profile Data</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
                <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Data</h2>
              <p className="text-muted-foreground mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
              <p className="text-muted-foreground">
                We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">5. Cookie Policy</h2>
              <p className="text-muted-foreground mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you've been to the website before.
              </p>
              <p className="text-muted-foreground mb-4">
                We use cookies to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our website</li>
                <li>Improve your experience</li>
                <li>Provide personalized content and recommendations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Right to withdraw consent</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">7. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "last updated" date at the top of this privacy policy.
              </p>
              <p className="text-muted-foreground">
                You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
                <br />
                Email: privacy@cryptomarket.com
                <br />
                Address: 123 Crypto Street, Market City, CM 12345
              </p>
            </section>
          </div>
        </ScrollArea>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
