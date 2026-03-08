import { X } from "lucide-react";
import { formatedDate } from "@/lib/formatDate";
import { useEffect } from "react";

const PastorMessageModal = ({ message, onClose, lang }) => {
  useEffect(() => {
    // disable scroll
    document.body.style.overflow = "hidden";
    return () => {
      // restore scroll when modal closes
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
         className="sticky py-4 top-0 right-0 m-4 text-gray-400 hover:text-black float-right z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="font-heading text-3xl mb-2">{message.title[lang]}</h2>

          <span className="block text-sm text-gray-500 mb-8">
            {formatedDate(message.published_at)}
          </span>

          <div className="indent-8 font-body text-gray-700 leading-loose space-y-6 wrap-pre">
            {message.content[lang]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastorMessageModal;
