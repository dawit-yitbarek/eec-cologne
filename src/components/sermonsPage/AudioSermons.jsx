import { formatedDate } from "@/lib/formatDate";
import { SermonCardSkeleton } from "../LoadingSkeletons";
import { ErrorBlock } from "../ErrorBlock";

const AudioSermons = ({ content, lang, audioSermons, loading, error, retry }) => {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-5xl mx-auto px-6">

                <h3 className="font-heading text-3xl mb-12">
                    {content.title}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">

                    {loading && <SermonCardSkeleton />}
                    {error && !loading && <div className="col-span-full flex justify-center items-center p-8">
                        <ErrorBlock onRetry={retry} />
                    </div>}
                    {!loading && !error && audioSermons.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">
                            {content.noAudioSermon}
                        </p>
                    )}
                    {audioSermons && audioSermons.map((sermon, index) => (
                        <div
                            key={index}
                            className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-video overflow-hidden rounded-t-2xl">
                                <iframe
                                    width="100%"
                                    height="166"
                                    scrolling="no"
                                    frameBorder="no"
                                    allow="autoplay"
                                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(sermon.media_url)}&color=%23facc15&auto_play=false`}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h4 className="font-heading text-lg mb-2">
                                    {sermon.description && sermon.description[lang]}
                                </h4>

                                <span className="text-xs text-yellow-700">
                                    {formatedDate(sermon.published_at)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AudioSermons;