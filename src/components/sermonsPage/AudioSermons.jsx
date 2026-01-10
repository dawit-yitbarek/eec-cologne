const sermons = [
    {
        title: "The Power of Prayer",
        date: "Jan 2026",
        url: "https://soundcloud.com/eyue-213469406/youtube_short-mp3",
    },
    {
        title: "Living a Christ-Centered Life",
        date: "Dec 2025",
        url: "https://soundcloud.com/eyue-213469406/youtube_short-mp3",
    },
];


const AudioSermons = ({ content }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">

                <h3 className="font-heading text-3xl mb-12">
                    {content.title}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {sermons.map((sermon, index) => (
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
                                    src={`https://w.soundcloud.com/player/?url=${sermon.url}&color=%23facc15&auto_play=false`}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h4 className="font-heading text-lg mb-2">
                                    {sermon.title}
                                </h4>

                                <span className="text-xs text-yellow-700">
                                    {sermon.date}
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