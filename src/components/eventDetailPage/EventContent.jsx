const EventContent = ({ content }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6">

                <h2 className="font-heading text-2xl mb-6">
                    {content.title}
                </h2>

                <div className="space-y-6 font-body text-gray-700 leading-relaxed">
                    <p>
                        The Women’s Fellowship is a time set apart for spiritual
                        growth, encouragement, and building meaningful
                        relationships within our church community.
                    </p>

                    <p>
                        Through prayer, sharing, and reflection, we seek to
                        strengthen our faith and support one another in love.
                    </p>

                    <p>
                        All women are welcome — whether you are visiting for the
                        first time or have been part of our church family for
                        years.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default EventContent;