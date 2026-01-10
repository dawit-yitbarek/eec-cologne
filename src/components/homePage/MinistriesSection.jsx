import Image from "next/image";
import Link from "next/link";

const ministries = [
    {
        title: "Youth Ministry",
        description: "Helping young people grow in faith, character, and purpose.",
        href: "/ministries/youth",
        image: "/images/ministries/youth.jpg",
    },
    {
        title: "Women’s Fellowship",
        description: "A welcoming space for encouragement, prayer, and spiritual growth.",
        href: "/ministries/women",
        image: "/images/ministries/women.jpg",
    },
    {
        title: "Men’s Fellowship",
        description: "Strengthening faith, leadership, and accountability.",
        href: "/ministries/men",
        image: "/images/ministries/men.jpg",
    },
    {
        title: "Children’s Ministry",
        description: "Teaching children biblical values in a loving environment.",
        href: "/ministries/children",
        image: "/images/ministries/children.jpg",
    },
];

const MinistriesSection = ({ content }) => {
    return (
        <section className="bg-[#F1EFEC] text-[#030303] py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="font-heading text-3xl md:text-4xl text-center tracking-tight">
                        {content.title}
                    </h2>
                    <p className="mt-4 text-gray-700 text-center font-body">
                        {content.subtitle}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {ministries.map((ministry) => (
                        <Link
                            key={ministry.title}
                            href={ministry.href}
                            className="group block bg-white rounded-2xl overflow-hidden border border-black/5 shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-yellow-100/60 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden">
                                <Image
                                    src={ministry.image}
                                    alt={ministry.title}
                                    fill
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="font-heading text-xl mb-3">
                                    {ministry.title}
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

export default MinistriesSection;