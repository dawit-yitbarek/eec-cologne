import Image from "next/image";

const MinistryHero = ({ title, subtitle, image }) => {
    return (
        <section className="pt-32 bg-gradient-to-b from-[#F1EFEC] to-white">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">

                {/* Image */}
                <div className="w-full md:w-1/2 h-64 md:h-96 overflow-hidden rounded-2xl shadow-lg">
                    <Image
                        fill
                        src={image}
                        alt={title}
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>

                {/* Text Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="font-heading text-4xl md:text-5xl tracking-tight mb-4 text-[#030303]">
                        {title}
                    </h1>

                    <p className="font-body text-gray-600 text-lg leading-relaxed">
                        {subtitle}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default MinistryHero;