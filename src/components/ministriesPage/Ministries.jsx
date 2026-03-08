import Link from "next/link";
import Image from "next/image";

const MinistriesGrid = ({ content, ministries }) => {
  return (
    <section className="py-24 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <Link
              key={ministry.hero.title}
              href={`/ministries/${ministry.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-black/5 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-yellow-100/60 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={ministry.hero.image}
                  alt={ministry.hero.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl mb-3">
                  {ministry.hero.title}
                </h3>

                <p className="font-body text-gray-600 text-sm leading-relaxed">
                  {ministry.description}
                </p>

                <span className="inline-block mt-6 text-sm text-yellow-700 font-medium">
                  {content.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinistriesGrid;
