const ImpactSection = ({ content }) => {
    return (
        <section className="py-24 bg-[#FFFEFC]">
            <div className="max-w-6xl mx-auto px-6">

                <h3 className="font-heading text-3xl mb-12 text-center">
                    {content.title}
                </h3>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {content.items.map(item => (
                        <div
                            key={item.title}
                            className="relative rounded-2xl border border-black/10 p-8 text-center hover:shadow-xl transition bg-gradient-to-b from-[#030303] via-[#0d0d0d] to-[#1a1a1a] text-white overflow-hidden"
                        >
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-yellow-500/10 blur-3xl rounded-full" />
                            </div>

                            <h4 className="font-heading text-lg mb-3">
                                {item.title}
                            </h4>
                            <p className="font-body text-gray-300 text-sm">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;