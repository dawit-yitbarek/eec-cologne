import { getContent } from "@/lib/getMessages";
import Hero from "@/components/homePage/Hero";
import DonationSection from "@/components/homePage/DonationSection";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const homeMessages = getContent(lang, 'home');
  const commonMessages = getContent(lang, 'common');

  return {
    title: `${homeMessages.seo.title} | ${commonMessages.seo.churchShortName}`,
    description: homeMessages.seo.description,
  };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const messages = getContent(lang, "home");

  return (
    <>
      {/* Hero Section */}
      <Hero content={messages.hero} lang={lang} />

      {/* Journey Section */}
      <section className="bg-[#f9f7f2] py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading mb-4">
              {messages.journey.title}
            </h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {messages.journey.text}
            </p>

            <Link
              href="/about"
              className="inline-block bg-yellow-500 px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
            >
              {messages.journey.cta}
            </Link>
          </div>

          <div className="relative pl-8 border-l-2 border-yellow-500/30 py-4">
            <div className="mb-10 relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
              <span className="text-sm font-bold text-yellow-600">
                {messages.journey.timeline.startYear}
              </span>
              <h4 className="font-heading text-lg">
                {messages.journey.timeline.startTitle}
              </h4>
              <p className="text-sm text-gray-600">
                {messages.journey.timeline.startDescription}
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-gray-300"></div>
              <span className="text-sm font-bold text-gray-400">
                {messages.journey.timeline.presentYear}
              </span>
              <h4 className="font-heading text-lg text-gray-400">
                {messages.journey.timeline.presentTitle}
              </h4>
              <p className="text-sm text-gray-500">
                {messages.journey.timeline.presentDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Schedule Section */}
      <section className="bg-white py-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading mb-4">
              {messages.services.title}
            </h2>
            <div className="w-16 h-1 bg-yellow-500 mx-auto rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {messages.services.list.map((service, idx) => (
              <div
                key={idx}
                className="bg-[#f9f7f2] p-6 rounded-xl border border-yellow-500/10 hover:border-yellow-500/40 transition dynamic-card"
              >
                <div className="text-sm font-bold text-yellow-600 uppercase tracking-wider mb-2">
                  {service.day}
                </div>
                <div className="text-xl font-heading mb-1 text-gray-900">
                  {service.name}
                </div>
                <div className="text-sm text-gray-600 font-mono">
                  {service.time}
                </div>
              </div>
            ))}
          </div>

          {/* Special Communion Alert Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 max-w-3xl mx-auto shadow-sm">
            <p className="text-gray-800 text-center font-medium text-lg md:text-base leading-relaxed">
              {messages.services.communionNote}
            </p>
          </div>
        </div>
      </section>

      {/* Foundation Section */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-heading mb-6">
            {messages.foundation.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-8">
            {messages.foundation.text}
          </p>

          <Link
            href="/statement-of-faith"
            className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            {messages.foundation.cta}
          </Link>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="bg-[#f9f7f2] py-20">
        {" "}
        <div className="max-w-6xl mx-auto px-6">
          {" "}
          <h2 className="text-3xl font-heading text-center mb-12">
            {" "}
            {messages.ministries.title}{" "}
          </h2>{" "}
          <div className="grid md:grid-cols-2 gap-8">
            {" "}
            {messages.ministries.list.map((item, i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition"
              >
                {" "}
                <h3 className="text-xl font-heading mb-3">
                  {" "}
                  {item.title}{" "}
                </h3>{" "}
                <p className="text-gray-700 mb-6"> {item.text} </p>{" "}
                <Link
                  href={item.link}
                  className="text-yellow-600 font-medium hover:underline"
                >
                  {" "}
                  {item.cta}{" "}
                </Link>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </section>

      {/* Donation Section */}
      <DonationSection content={messages.donationSection} />
    </>
  );
}
