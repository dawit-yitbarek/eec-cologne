const GalleryIntro = ({ content }) => {
    return (
        <section className="pt-32 pb-20 bg-gradient-to-b from-[#030303] via-[#0d0d0d] to-[#1a1a1a] text-white overflow-hidden">

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-yellow-500/10 blur-3xl rounded-full" />
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center">
                <h1 className="font-heading text-4xl md:text-5xl tracking-tight">
                    {content.title}
                </h1>
                <p className="mt-6 font-body text-gray-300 text-lg">
                    {content.subtitle}
                </p>
            </div>
        </section>
    );
};

export default GalleryIntro;