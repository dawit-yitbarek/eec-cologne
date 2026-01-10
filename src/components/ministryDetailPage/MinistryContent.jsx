const MinistryContent = ({ description, content }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6 space-y-12">

                {/* Description */}
                <div>
                    <h2 className="font-heading text-3xl mb-6">{content.title}</h2>
                    <p className="font-body text-gray-700 leading-relaxed">{description}</p>
                </div>
            </div>
        </section>
    );
};

export default MinistryContent;