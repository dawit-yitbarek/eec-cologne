'use client';

import { useState } from "react";
import PastorMessageModal from "./PastorMessageModal";
import { formatedDate } from "@/lib/formatDate";
import { ErrorBlock } from "../ErrorBlock";
import { MessageSkeleton } from "../LoadingSkeletons";

const PastorMessageContent = ({ content, lang, loading, error, retry, messages }) => {
    const [activeMessage, setActiveMessage] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6 space-y-14">

                {loading && <MessageSkeleton />}
                {!loading && error && <ErrorBlock onRetry={retry} />}
                {!loading && !error && messages.length < 1 && <p className="text-center text-gray-500 font-body">
                    {content.noPastorMessage}
                </p>}
                {messages && messages.map((msg, i) => (
                    <div
                        key={i}
                        className="border-b border-black/10 pb-10"
                    >
                        <h3 className="font-heading text-2xl mb-3 text-[#030303]">
                            {msg.title[lang]}
                        </h3>

                        <span className="block text-sm text-gray-500 mb-4 font-body">
                            {formatedDate(msg.published_at)}
                        </span>

                        <p className="font-body text-gray-700 leading-relaxed mb-6">
                            {msg.description && msg.description[lang]}
                        </p>

                        <button
                            onClick={() => setActiveMessage(msg)}
                            className="text-yellow-700 font-medium hover:underline"
                        >
                            {content.cta}
                        </button>
                    </div>
                ))}

                {activeMessage && (
                    <PastorMessageModal
                        message={activeMessage}
                        onClose={() => setActiveMessage(null)}
                        lang={lang}
                    />
                )}

            </div>
        </section>
    );
};


export default PastorMessageContent;