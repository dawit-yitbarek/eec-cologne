"use client";

import { useState } from "react";

const SermonTabs = ({ videoContent, audioContent, content }) => {
    const [activeTab, setActiveTab] = useState("video");

    return (
        <section className="py-8 bg-[#FFFEFC]">
            <div className="max-w-6xl mx-auto px-6">

                {/* Tabs */}
                <div className="flex justify-center gap-10 mb-14 border-b border-black/10">
                    <button
                        onClick={() => setActiveTab("video")}
                        className={`pb-4 font-heading text-lg transition
                            ${activeTab === "video"
                                ? "text-yellow-700 border-b-2 border-yellow-500"
                                : "text-gray-500 hover:text-black"
                            }`}
                    >
                        {content.video}
                    </button>

                    <button
                        onClick={() => setActiveTab("audio")}
                        className={`pb-4 font-heading text-lg transition
                            ${activeTab === "audio"
                                ? "text-yellow-700 border-b-2 border-yellow-500"
                                : "text-gray-500 hover:text-black"
                            }`}
                    >
                        {content.audio}
                    </button>
                </div>

                {/* Content (KEEP BOTH MOUNTED) */}
                <div>
                    <div className={activeTab === "video" ? "block" : "hidden"}>
                        {videoContent}
                    </div>

                    <div className={activeTab === "audio" ? "block" : "hidden"}>
                        {audioContent}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SermonTabs;