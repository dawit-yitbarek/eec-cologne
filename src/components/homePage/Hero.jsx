const Hero = ({ content, lang }) => {
  return (
    <section className="relative bg-gray-950 text-white md:min-h-screen flex items-center overflow-hidden" >

      {/* Main Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero.jpg')" }
        }
      />

      {/* Dark Overlay + Warm Radial Glow for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none" />

      {/* Content Container */}
      <div className="relative max-w-4xl px-6 py-32 z-10">

        <h1
          className={`font-heading ${lang === "de" ? "text-3xl md:text-5xl" : "text-4xl md:text-6xl"} leading-[1.15] tracking-tight text-white max-w-3xl mx-auto`}
          dangerouslySetInnerHTML={{ __html: content.title }}
        />

        <div className="max-w-2xl py-4">
          <p className="italic text-yellow-200/90 text-lg md:text-xl font-medium leading-relaxed font-serif">
            {content.quote}
          </p>
        </div>

      </div>
    </section >
  );
};

export default Hero;