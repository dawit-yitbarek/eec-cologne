"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getContent } from "@/lib/getMessages";

export default function EmptyState() {
    const { lang } = useLanguage();
    const messages = getContent(lang, 'noContent');
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {messages.title}
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
                {messages.subtitle}
            </p>
            <a
                href="/"
                className="px-5 py-2 bg-yellow-500 text-white rounded-md shadow hover:bg-yellow-500 transition"
            >
                {messages.button}
            </a>
        </div>
    );
}