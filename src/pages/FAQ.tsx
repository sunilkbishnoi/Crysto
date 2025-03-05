
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onCurrencyChange={() => {}} />
      
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        <Separator className="my-6" />
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">What is CRYST0?</AccordionTrigger>
            <AccordionContent>
              CRYST0 is a comprehensive platform that provides real-time cryptocurrency and stock market data. 
              We combine powerful AI algorithms with market analytics to help users make informed trading decisions.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">How is market data updated?</AccordionTrigger>
            <AccordionContent>
              Our platform pulls data from multiple reliable sources and exchanges in real-time. 
              Cryptocurrency data is updated every few seconds, while stock market data follows standard market updates.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">Is CRYST0 free to use?</AccordionTrigger>
            <AccordionContent>
              Yes, CRYST0 offers a free tier with essential features for casual traders. 
              We also offer premium subscriptions for professional traders who need advanced analytics, 
              additional technical indicators, and specialized AI insights.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">How accurate are the AI predictions?</AccordionTrigger>
            <AccordionContent>
              Our AI models are trained on vast amounts of historical market data and continuously improved. 
              While we strive for high accuracy, it's important to remember that all market predictions carry inherent uncertainty. 
              CRYST0's AI insights should be used as one of many tools in your investment decision-making process.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">Can I track my portfolio on CRYST0?</AccordionTrigger>
            <AccordionContent>
              Yes, you can create and track custom portfolios by adding your favorite assets to your watchlist. 
              Premium users can access additional portfolio analytics and performance tracking features.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-medium">How do I get started?</AccordionTrigger>
            <AccordionContent>
              Simply browse to the Markets section to start exploring cryptocurrencies and stocks. 
              No account is required for basic features, but creating an account allows you to save favorites and access personalized features.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-medium">Is my data secure?</AccordionTrigger>
            <AccordionContent>
              We take data security seriously and employ industry-standard encryption and security practices. 
              Your personal information is never shared with third parties without your explicit consent.
              For more details, please refer to our Privacy Policy.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;
