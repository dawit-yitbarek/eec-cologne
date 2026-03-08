import { formatedDate } from "@/lib/formatDate";
import LazyYouTubeEmbed from "./LazyYouTubeEmbed";

const FeaturedSermon = ({ content, featuredSermon, lang }) => {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Video */}
                {featuredSermon && <>
                    <LazyYouTubeEmbed
                        url={featuredSermon.media_url}
                        title={featuredSermon.description?.[lang]}
                        className="shadow-xl"
                    />

                    {/* Info */}
                    <div>
                        <span className="text-sm text-yellow-700 font-body">
                            {content.eyebrow}
                        </span>

                        <h2 className="font-heading text-3xl mt-3 mb-4">
                            {featuredSermon.description && featuredSermon.description[lang]}
                        </h2>

                        <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                            <span className="text-yellow-700">{formatedDate(featuredSermon.published_at)}</span>
                        </div>
                    </div>
                </>}

            </div>
        </section>
    );
};

export default FeaturedSermon;