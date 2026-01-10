const PastorScripture = ({ content }) => {
    return (
        <section className="py-20 bg-[#FFFEFC]">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <blockquote className="text-xl md:text-2xl font-heading text-gray-800 leading-relaxed">
                    {content.quote}
                </blockquote>

                <span className="block mt-6 text-sm text-gray-600 font-body">
                    {content.reference}
                </span>

            </div>
        </section>
    );
};

export default PastorScripture;