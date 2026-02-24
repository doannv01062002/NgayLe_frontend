import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { AboutHero } from "@/features/customer/about/AboutHero";
import { AboutValues } from "@/features/customer/about/AboutValues";
import { AboutTimeline } from "@/features/customer/about/AboutTimeline";
import { AboutStats } from "@/features/customer/about/AboutStats";
import { AboutCTA } from "@/features/customer/about/AboutCTA";

export default function AboutPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <AboutHero />
        <AboutValues />
        <AboutTimeline />
        <AboutStats />
        <AboutCTA />
      </main>

      <Footer />
    </div>
  );
}
