'use client';

import { useState } from "react";
import PastorMessageModal from "./PastorMessageModal";

const messages = [
    {
        id: 1,
        title: "Walking in Faith Every Day",
        excerpt:
            "Faith is not just for Sunday worship; it is a daily walk with God...",
        content: `
        Faith is not just for Sunday worship; it is a daily walk with God.
        In every challenge, in every joy, we are invited to trust Him fully...
        `,
        date: "January 2026",
    },
    {
        id: 2,
        title: "Finding Peace in Uncertain Times",
        excerpt:
            "When the world feels unstable, God remains our firm foundation...",
        content: `
        When the world feels unstable, God remains our firm foundation.
        `,
        date: "February 2026",
    },
];

const PastorMessageContent = ({ content }) => {
    const [activeMessage, setActiveMessage] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6 space-y-14">

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className="border-b border-black/10 pb-10"
                    >
                        <h3 className="font-heading text-2xl mb-3 text-[#030303]">
                            {msg.title}
                        </h3>

                        <span className="block text-sm text-gray-500 mb-4 font-body">
                            {msg.date}
                        </span>

                        <p className="font-body text-gray-700 leading-relaxed mb-6">
                            {msg.excerpt}
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
                    />
                )}

            </div>
        </section>
    );
};


export default PastorMessageContent;