import { X } from "lucide-react";

const PastorMessageModal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto">

                <div className="p-8">

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-black"
                    >
                        <X size={24} />
                    </button>

                    <h2 className="font-heading text-3xl mb-2">
                        {message.title}
                    </h2>

                    <span className="block text-sm text-gray-500 mb-8">
                        {message.date}
                    </span>

                    <div className="font-body text-gray-700 leading-loose space-y-6 whitespace-pre-line">
                        {message.content}
                    </div>

                </div>

            </div>

        </div>
    );
};

export default PastorMessageModal;