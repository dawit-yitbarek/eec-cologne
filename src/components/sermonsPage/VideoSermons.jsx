const sermons = [
    {
        title: "The Power of Prayer",
        date: "Jan 2026",
        videoId: "Nv6E95dQ4RA",
    },
    {
        title: "Living a Christ-Centered Life",
        date: "Dec 2025",
        videoId: "eGQYy79W0L0",
    },
];

const SermonLibrary = ({ content }) => {
    return (
        <section className="py-8 bg-[#FFFEFC]">
            <div className="max-w-6xl mx-auto px-6">

                <h3 className="font-heading text-3xl mb-12">
                    {content.title}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {sermons.map((sermon, index) => (
                        <div
                            key={index}
                            className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300"
                        >

                            <div className="aspect-video overflow-hidden rounded-t-2xl">
                                <iframe
                                    src={`https://www.youtube.com/embed/${sermon.videoId}`}
                                    className="w-full h-full"
                                    allowFullScreen
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

export default SermonLibrary;