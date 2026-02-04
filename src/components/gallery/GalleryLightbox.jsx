"use client";

import Image from "next/image";
import { useEffect } from "react";

const GalleryLightbox = ({ image, onClose, lang, index }) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Image */}
            <div className="relative z-10 max-h-[85vh] max-w-[90vw]">
                <Image
                    src={image.image_url}
                    alt={image.description?.[lang] ?? `Gallery image ${index + 1}`}
                    width={1200}
                    height={800}
                    className="rounded-xl shadow-2xl max-h-[85vh] w-auto object-contain"
                    priority
                />
            </div>
        </div>
    );
};

export default GalleryLightbox;
