import Image from "next/image";
import Link from "next/link";

const Hero = ({ content }) => {
    return (
        <section className="bg-black text-white min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-1 grid gap-16 md:grid-cols-2 items-center">

                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h1 className="font-heading text-4xl md:text-6xl leading-[1.1] tracking-tight"
                        dangerouslySetInnerHTML={{ __html: content.title }}
                    />

                    <p className="mt-6 text-lg text-gray-300 max-w-xl font-body">
                        {content.subtitle}
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link
                            href="/sermons"
                            className="bg-yellow-500 text-black text-center px-6 py-3 rounded-md font-medium hover:bg-yellow-400 transition"
                        >
                            {content["buttons"].primary}
                        </Link>

                        <Link
                            href="/events"
                            className="border border-white text-center text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-black transition"
                        >
                            {content["buttons"].secondary}
                        </Link>
                    </div>
                </div>

                {/* Image */}
                <div className="relative w-full max-w-md mx-auto md:max-w-none">
                    <Image
                        src="/images/hero.jpg"
                        alt="Jesus Christ"
                        width={500}
                        height={700}
                        className="rounded-lg object-cover grayscale contrast-125"
                        priority
                    />
                </div>

            </div>
        </section>
    );
};

export default Hero;