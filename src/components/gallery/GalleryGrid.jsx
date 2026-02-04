"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import { ErrorBlock } from "../ErrorBlock";
import { ImageCardSkeleton } from "../LoadingSkeletons";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), {
    ssr: false,
});

const GalleryGrid = ({ gallery, loading, error, lang, content, retry }) => {
    const [activeImage, setActiveImage] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {loading && <ImageCardSkeleton />}

                    {error && !loading && (
                        <div className="col-span-full flex justify-center p-10">
                            <ErrorBlock onRetry={retry} />
                        </div>
                    )}

                    {!loading && !error && gallery.length === 0 && (
                        <p className="col-span-full text-center text-gray-500">
                            {content.noImages}
                        </p>
                    )}

                    {!loading &&
                        !error &&
                        gallery.map((img, index) => (
                            <button
                                key={img.id}
                                aria-label="Open image"
                                onClick={() => {
                                    setActiveImage(img);
                                    setActiveIndex(index);
                                }}
                                className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition"
                            >
                                <div className="relative w-full h-72">
                                    <Image
                                        src={img.image_url}
                                        alt={img.description?.[lang] ?? `Gallery image ${index + 1}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                            </button>
                        ))}
                </div>

                {activeImage && (
                    <GalleryLightbox
                        image={activeImage}
                        index={activeIndex}
                        lang={lang}
                        onClose={() => setActiveImage(null)}
                    />
                )}
            </div>
        </section>
    );
};

export default GalleryGrid;