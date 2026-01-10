import Image from "next/image";

const GalleryLightbox = ({ image, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Image */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 h-[85vh]">
                <Image
                    fill
                    src={image.src}
                    alt={image.alt}
                    className="object-cover rounded-xl shadow-2xl"
                />
            </div>

        </div>
    );
};

export default GalleryLightbox;