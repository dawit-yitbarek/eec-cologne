"use client";

import Image from "next/image";
import Link from "next/link";
import { Goal, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";

const AboutPage = () => {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'about');

    return (
        <main className="pt-24">

            {/* Hero */}
            <section className="relative pt-20 pb-24 bg-gradient-to-b from-[#030303] via-[#0d0d0d] to-[#1a1a1a] text-white overflow-hidden">

                {/* Subtle decorative element */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-yellow-500/10 blur-3xl rounded-full" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 text-center">

                    <h1 className="font-heading text-4xl md:text-5xl leading-tight tracking-tight">
                        {messages.hero.title}
                    </h1>

                    <p className="mt-6 font-body text-gray-300 text-lg max-w-2xl mx-auto">
                        {messages.hero.subtitle}
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-[#F1EFEC] text-[#030303] py-24 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="font-heading text-3xl md:text-4xl tracking-tight">
                        {messages.missionVision.title}
                    </h2>
                    <p className="mt-6 font-body text-gray-700 max-w-3xl mx-auto text-lg">
                        {messages.missionVision.subtitle}
                    </p>

                    {/* Optional icons */}
                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <div className="text-yellow-500">
                                <Goal size={32} />
                            </div>
                            <h3 className="font-heading text-xl mb-2">{messages.missionVision.items["purpose"].title}</h3>
                            <p className="font-body text-gray-600 text-sm">
                                {messages.missionVision.items["purpose"].description}
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-yellow-500">
                                <Users size={32} />
                            </div>
                            <h3 className="font-heading text-xl mb-2">{messages.missionVision.items["community"].title}</h3>
                            <p className="font-body text-gray-600 text-sm">
                                {messages.missionVision.items["community"].description}
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-yellow-500">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="font-heading text-xl mb-2">{messages.missionVision.items["growth"].title}</h3>
                            <p className="font-body text-gray-600 text-sm">
                                {messages.missionVision.items["growth"].description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pastor / Leadership */}
            <section className="bg-[#EFECE3] text-[#030303] py-24 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-shrink-0 w-full md:w-1/3">
                        <Image
                            src="/images/pastor.jpg"
                            alt="Pastor"
                            width={400}
                            height={500}
                            className="rounded-lg shadow-lg object-cover w-full h-full"
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h2 className="font-heading text-3xl md:text-4xl mb-4">
                            {messages.pastorSection.title}
                        </h2>
                        <p className="font-body text-gray-700 text-lg mb-4">
                            {messages.pastorSection.subtitle}
                        </p>
                        <Link
                            href="/pastor-message"
                            className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
                        >
                            {messages.pastorSection.cta}
                        </Link>
                    </div>
                </div>
            </section>

            {/* History */}

            <section className="relative py-24 bg-gradient-to-b from-[#1a1a1a] via-[#121212] to-[#0d0d0d] text-white">

                {/* Subtle decorative element */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-yellow-500/10 blur-3xl rounded-full" />
                </div>

                {/* Soft top glow separator */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent" />

                <div className="max-w-4xl mx-auto px-6 text-center relative">
                    <h2 className="font-heading text-3xl md:text-4xl tracking-tight">
                        {messages.historySection.title}
                    </h2>

                    <p className="mt-6 font-body text-gray-300 max-w-3xl mx-auto text-lg">
                        {messages.historySection.subtitle}
                    </p>
                </div>
            </section>

        </main>
    );
};

export default AboutPage;