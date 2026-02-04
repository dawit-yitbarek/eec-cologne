import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function GallerySection() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [fetchingGallery, setFetchingGallery] = useState(true);
  const [galleryError, setGalleryError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const messageTimerRef = useRef(null);
  const [files, setFiles] = useState([]);

  function ImageInput() {
    const handleFileChange = (e) => {
      const selected = Array.from(e.target.files);
      if (selected.length > 0) setFiles(selected);
    };

    return (
      <div className={`flex items-center`}>
        {files.length > 0 ? (
          <div className="w-full flex flex-wrap gap-4">
            {files.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        ) : (
          <label className="w-64 flex flex-col justify-center items-center gap-4 border-2 border-dashed border-yellow-400 p-4 bg-yellow-50 hover:bg-yellow-100 transition cursor-pointer rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-yellow-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            <p className="text-gray-700 font-medium">
              Click to upload or drag & drop
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    );
  }

  // Fetch gallery items
  const fetchGallery = async () => {
    setFetchingGallery(true);
    setGalleryError("");
    try {
      const { data } = await axios.get("/api/gallery");
      setGalleryItems(data);
    } catch (err) {
      setGalleryError("Failed to load gallery");
    } finally {
      setFetchingGallery(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    if (!message) return;
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    messageTimerRef.current = setTimeout(() => {
      setMessage(null);
      messageTimerRef.current = null;
    }, 5000);
    return () => {
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, [message]);

  const submit = async () => {
    if (files.length === 0) {
      setMessage({ type: "error", text: "Please select images" });
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      const res = await axios.post("/api/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const createdItems = res.data; // expect array
      setGalleryItems((prev) => [...createdItems, ...prev]);
      setMessage({ type: "success", text: "Images uploaded" });

      setFiles([]);
    } catch (err) {
      console.log("Submitting gallery failed: ", err);
      setMessage({ type: "error", text: "Action failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteModal(true);
  };

  const deleteGalleryItem = async (id) => {
    setDeleting(true);
    setDeleteError("");
    try {
      await axios.delete(`/api/gallery?id=${id}`);
      setGalleryItems((prev) => prev.filter((g) => g.id !== id));
      setShowDeleteModal(false);
      setSelectedDeleteId(null);
    } catch (err) {
      setDeleteError("Failed to delete this image");
    } finally {
      setDeleting(false);
    }
  };

  const LoadingCard = ({ text = "Loading..." }) => (
    <div className="py-8 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 text-center">
        <Loader
          size={36}
          className="animate-spin mx-auto mb-3 text-yellow-500"
        />
        <p className="font-medium text-gray-700">{text}</p>
      </div>
    </div>
  );

  const ErrorCard = ({ text = "Something went wrong", onRetry }) => (
    <div className="py-8 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 text-center">
        <AlertTriangle size={36} className="mx-auto mb-3 text-red-500" />
        <p className="font-medium text-gray-700 mb-3">{text}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-yellow-500 rounded text-black"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );

  const MessageToast = ({ message }) => {
    if (!message) return null;
    return (
      <div className="fixed top-10 right-1/2 z-50">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-100"
              : "bg-red-50 border border-red-100"
          }`}
        >
          <div className="text-2xl">
            {message.type === "success" ? (
              <CheckCircle className="text-green-600" />
            ) : (
              <XCircle className="text-red-600" />
            )}
          </div>
          <div>
            <p
              className={`font-medium ${
                message.type === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {message.text}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-6">Gallery</h2>

      {/* FORM */}
      <div>
        <ImageInput />

        <button
          onClick={submit}
          disabled={files.length < 1 || submitting}
          className={`px-6 py-2 my-4 mr-3 bg-yellow-500 text-black rounded disabled:opacity-50 ${
            files.length < 1 || submitting ? "" : "hover:bg-yellow-600"
          }`}
        >
          {submitting ? "Uploading..." : "Upload"}
        </button>

        {files.length > 0 && (
          <button
            onClick={() => setFiles([])}
            disabled={submitting}
            className={`px-6 py-2 bg-gray-200 rounded disabled:opacity-50 ${submitting ? "" : "hover:bg-gray-400 "}`}
          >
            Cancel
          </button>
        )}
      </div>

      {fetchingGallery ? (
        <LoadingCard text="Loading gallery..." />
      ) : galleryError ? (
        <ErrorCard text={galleryError} onRetry={fetchGallery} />
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {galleryItems.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">No images yet.</p>
          ) : (
            galleryItems.map((item) => (
              <div
                key={item.id}
                className="relative bg-gray-50 rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={item.image_url}
                  alt="Gallery item"
                  className="w-full h-64 object-cover transition hover:brightness-75"
                />

                <button
                  onClick={() => confirmDelete(item.id)}
                  className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg shadow-md"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => {
              if (!deleting) {
                setShowDeleteModal(false);
                setSelectedDeleteId(null);
                setDeleteError("");
              }
            }}
          />
          <div className="bg-white rounded-lg p-6 z-10 w-full max-w-md">
            <p className="text-lg font-medium mb-2">Confirm delete</p>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this image? This action cannot be
              undone.
            </p>

            {deleteError && (
              <p className="text-md text-red-600 mb-4">{deleteError}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                disabled={deleting}
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedDeleteId(null);
                  setDeleteError("");
                }}
                className="px-4 py-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                disabled={deleting}
                onClick={() => deleteGalleryItem(selectedDeleteId)}
                className="px-4 py-2 bg-red-600 text-white disabled:opacity-50 rounded hover:bg-red-700"
              >
                {deleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <MessageToast message={message} />
    </section>
  );
}
