const MinistriesIntro = ({ content }) => {
    return (
        <section className="relative pt-32 pb-24 bg-gradient-to-b from-[#030303] via-[#0d0d0d] to-[#1a1a1a] text-white overflow-hidden">

            {/* Subtle decorative element */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[480px] h-[480px] bg-yellow-500/10 blur-3xl rounded-full" />
            </div>

            <div className="relative max-w-5xl mx-auto px-6 text-center">

                <h1 className="font-heading text-4xl md:text-5xl leading-tight tracking-tight">
                    {content.title}
                </h1>

                <p className="mt-6 font-body text-gray-300 text-lg max-w-2xl mx-auto">
                    {content.subtitle}
                </p>

                {/* Gentle invitation cue */}
                <div className="mt-12 flex justify-center">
                    <span className="text-sm font-body text-gray-400 tracking-wide">
                        {content.cue}
                    </span>
                </div>

            </div>
        </section>
    );
};

export default MinistriesIntro;