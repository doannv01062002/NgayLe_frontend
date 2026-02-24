import { Footer } from "@/components/shared/Footer";
import { AffiliateHeader } from "@/features/customer/affiliate/AffiliateHeader";
import { AffiliateHero } from "@/features/customer/affiliate/AffiliateHero";
import { AffiliateProcess } from "@/features/customer/affiliate/AffiliateProcess";
import { AffiliateCommissionTable } from "@/features/customer/affiliate/AffiliateCommissionTable";
import { AffiliateWhyChoose } from "@/features/customer/affiliate/AffiliateWhyChoose";
import { AffiliateFAQ } from "@/features/customer/affiliate/AffiliateFAQ";
import { AffiliateCTA } from "@/features/customer/affiliate/AffiliateCTA";

export default function AffiliatePage() {
  return (
    <div className="font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden flex flex-col min-h-screen">
      <AffiliateHeader />

      <main className="flex-grow w-full">
        <AffiliateHero />
        <AffiliateProcess />
        <AffiliateCommissionTable />
        <AffiliateWhyChoose />
        <AffiliateFAQ />
        <AffiliateCTA />
      </main>

      <Footer />
    </div>
  );
}
