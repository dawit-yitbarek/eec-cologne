const TrustSection = ({ content }) => {
    return (
        <section className="py-20 bg-[#F1EFEC]">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <p className="font-body text-gray-700">
                    {content.message}
                </p>
            </div>
        </section>
    );
};

export default TrustSection;