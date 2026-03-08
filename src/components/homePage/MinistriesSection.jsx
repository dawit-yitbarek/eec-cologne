"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";
import Image from "next/image";
import Link from "next/link";

const MinistriesSection = ({ content }) => {
  const { lang } = useLanguage();
  const ministries = getContent(lang, "ministryDetail");
  const ministriesArray = Object.entries(ministries.ministries).map(
    ([slug, ministry]) => ({
      slug,
      ...ministry,
    }),
  );

  return (
    <section className="bg-[#F1EFEC] text-[#030303] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-center tracking-tight">
            {content.title}
          </h2>
          <p className="mt-4 text-gray-700 text-center font-body">
            {content.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {ministriesArray.map((ministry) => (
            <Link
              key={ministry.hero.title}
              href={`/ministries/${ministry.slug}`}
              className="group inline-block w-fit bg-white rounded-2xl overflow-hidden border border-black/5 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-yellow-100/60 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={ministry.hero.image}
                  alt={ministry.hero.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl mb-3">
                  {ministry.hero.title}
                </h3>

                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  {ministry.description}
                </p>

                <span className="inline-block mt-6 text-sm text-yellow-700 font-medium">
                  {content.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistriesSection;
