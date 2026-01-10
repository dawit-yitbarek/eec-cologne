const FeaturedSermon = ({ content }) => {
    return (
        <section className="py-8 bg-white">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

                {/* Video */}
                <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                    <iframe
                        src="https://www.youtube.com/embed/4xDnG7WB_Sc"
                        className="w-full h-full"
                        allowFullScreen
                    />
                </div>

                {/* Info */}
                <div>
                    <span className="text-sm text-yellow-700 font-body">
                        {content.eyebrow}
                    </span>

                    <h2 className="font-heading text-3xl mt-3 mb-4">
                        Walking in Faith During Difficult Times
                    </h2>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                        <span className="text-yellow-700">February 2026</span>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedSermon;