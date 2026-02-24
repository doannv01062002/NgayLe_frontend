"use client";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { SupportHero } from "@/features/customer/support/SupportHero";
import { SupportCategories } from "@/features/customer/support/SupportCategories";
import { SupportFAQ } from "@/features/customer/support/SupportFAQ";
import { useEffect, useState } from "react";
import { supportService } from "@/services/supportService";
import { SupportArticleDTO } from "@/services/adminSupportService";

export default function SupportPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState<SupportArticleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    setLoading(true);
    supportService
      .getArticles({
        category: activeCategory || undefined,
        search: debouncedSearch || undefined,
        size: 10,
      })
      .then((res) => {
        setArticles(res.content);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [activeCategory, debouncedSearch]);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-sans text-gray-900 dark:text-gray-100 antialiased overflow-x-hidden">
      <Header />

      <main className="flex-grow">
        <SupportHero searchTerm={searchTerm} onSearch={setSearchTerm} />
        <SupportCategories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
        <SupportFAQ articles={articles} loading={loading} />
      </main>

      <Footer />
    </div>
  );
}
