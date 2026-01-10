import Image from "next/image";

const PastorIntro = ({ content }) => {
    return (
        <section className="pt-32 pb-20 bg-[#F1EFEC]">
            <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-2 items-center">

                {/* Pastor Image */}
                <div className="flex justify-center">
                    <Image
                        width={320}
                        height={384}
                        src="/images/pastor.jpg"
                        alt="Senior Pastor"
                        className="object-cover rounded-3xl shadow-lg"
                    />
                </div>

                {/* Intro Text */}
                <div>
                    <h1 className="font-heading text-4xl md:text-5xl tracking-tight text-[#030303]">
                        {content.title}
                    </h1>

                    <p className="mt-6 font-body text-gray-700 text-lg leading-relaxed">
                        {content.subtitle}
                    </p>

                    <p className="mt-6 font-heading text-lg text-gray-900">
                        {content.name}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default PastorIntro;