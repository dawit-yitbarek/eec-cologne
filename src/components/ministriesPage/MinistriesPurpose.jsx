const MinistriesPurpose = ({ content }) => {
    return (
        <section className="py-24 bg-[#F1EFEC]">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <h2 className="font-heading text-3xl mb-6">
                    {content.title}
                </h2>

                <p className="font-body text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    {content.subtitle}
                </p>

            </div>
        </section>
    );
};

export default MinistriesPurpose;