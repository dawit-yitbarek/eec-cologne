const ClosingMessage = ({ content }) => {
    return (
        <section className="py-24 bg-[#030303] text-white">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <p className="font-body text-gray-300 mb-4">
                    {content.quote}
                </p>
                <span className="font-heading text-sm text-yellow-400">
                    {content.reference}
                </span>
            </div>
        </section>
    );
};

export default ClosingMessage;