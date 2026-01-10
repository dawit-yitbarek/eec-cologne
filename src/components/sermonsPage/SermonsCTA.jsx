const SermonsCTA = ({ content }) => {
    return (
        <section className="py-20 bg-[#F6F4EF] text-center">
            <h3 className="font-heading text-3xl mb-4">
                {content.title}
            </h3>
            <p className="font-body text-gray-600 mb-8">
                {content.subtitle}
            </p>
        </section>
    );
};

export default SermonsCTA;