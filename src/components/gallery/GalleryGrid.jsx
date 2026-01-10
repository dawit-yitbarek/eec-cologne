'use client';

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
const GalleryLightbox = dynamic(
    () => import("./GalleryLightbox"),
    { ssr: false }
);

const images = [
    { src: "/gallery/1.jpg", alt: "Sunday Worship" },
    { src: "/gallery/2.jpg", alt: "Youth Fellowship" },
    { src: "/gallery/3.jpg", alt: "Community Outreach" },
    { src: "/gallery/4.jpg", alt: "Prayer Night" },
    { src: "/gallery/5.jpg", alt: "Church Anniversary" },
    { src: "/gallery/6.jpg", alt: "Children’s Ministry" },
];

const GalleryGrid = () => {
    const [activeImage, setActiveImage] = useState(null);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(img)}
                            className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition"
                        >
                            <div className="relative w-full h-72">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>


                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                        </button>
                    ))}
                </div>

                {/* Only render lightbox after hydration */}
                {activeImage && (
                    <GalleryLightbox
                        image={activeImage}
                        onClose={() => setActiveImage(null)}
                    />
                )}

            </div>
        </section>
    );
};

export default GalleryGrid;