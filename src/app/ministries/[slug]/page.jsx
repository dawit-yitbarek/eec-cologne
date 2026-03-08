"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import MinistryHero from "@/components/ministryDetailPage/MinistryHero";
import MinistryContent from "@/components/ministryDetailPage/MinistryContent";
import MinistryCTA from "@/components/ministryDetailPage/MinistryCTA";

export default function MinistryDetailPage() {
  const { lang } = useLanguage();
  const params = useParams();
  const slug = params?.slug ?? "";

  const messages = getContent(lang, "ministryDetail");
  const ministry = messages?.ministries?.[slug];

  if (!ministry) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-6 py-24">
        <div className="max-w-xl text-center">
          <h1 className="font-heading text-4xl mb-4 text-[#030303]">
            {messages?.notFound?.title ?? "Ministry Not Found"}
          </h1>
          <p className="font-body text-gray-600 mb-8">
            {messages?.notFound?.message ??
              "We couldn\'t find that ministry. Please return to the ministries list."}
          </p>
          <Link
            href="/ministries"
            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
          >
            {messages?.notFound?.cta ?? "Back to Ministries"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <MinistryHero
        title={ministry.hero.title}
        subtitle={ministry.hero.subtitle}
        image={ministry.hero.image}
      />

      <MinistryContent
        content={messages.content}
        description={ministry.description}
      />

      <section className="py-4 bg-white" id="ministry-page">
        <div className="space-y-6">
          {ministry.sections?.map((section, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 p-6 mx-5 shadow-sm"
            >
              <h3 className="font-heading text-2xl">{section.title}</h3>
              {section.text && (
                <p className="font-body text-gray-700 leading-relaxed">
                  {section.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <MinistryCTA content={messages.ctaSection} />
    </>
  );
}
