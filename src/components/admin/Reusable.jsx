"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Loader2,
  Loader,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { scrollToSection } from "@/lib/scrollToSection";
import TextareaAutosize from "react-textarea-autosize";
import { getYouTubeEmbedUrl } from "@/lib/getEmbedUrl";

export default function ReusableSection({
  component,
  required,
  emptyForm,
  getRoute,
  putRoute,
  postRoute,
  deleteRoute,
  dataType,
}) {
  const [items, setItems] = useState([]);
  const [fetchingItems, setFetchingItems] = useState(true);
  const [itemsError, setItemsError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [sermonType, setSermonType] = useState("video");
  const messageTimerRef = useRef(null);

  const fetchItems = async () => {
    setFetchingItems(true);
    setItemsError("");
    try {
      const { data } = await axios.get(getRoute);
      setItems(data);
    } catch (err) {
      setItemsError(`Failed to load ${component}`);
    } finally {
      setFetchingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const MessageToast = ({ message }) => {
    if (!message) return null;
    return (
      <div className="fixed top-10 right-1/2 z-50">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${message.type === "success" ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"}`}
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
              className={`font-medium ${message.type === "success" ? "text-green-800" : "text-red-800"}`}
            >
              {message.text}
            </p>
          </div>
        </div>
      </div>
    );
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

  const isValid = () => {
    for (const key in form) {
      if (required.includes(key)) {
        const section = form[key];

        if (typeof section === "object" && section !== null) {
          for (const lang in section) {
            if (section[lang].trim() === "") {
              return false;
            }
          }
        } else {
          if (section.trim() === "") {
            return false;
          }
        }
      }
    }

    return true;
  };

  const submit = async () => {
    if (!isValid()) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      if (editingId) {
        const res = await axios.put(`${putRoute}?id=${editingId}`, form);
        const updated = res.data;
        setItems((prev) =>
          prev.map((i) => (i.id === updated.id ? updated : i)),
        );
        setMessage({ type: "success", text: `${component} updated` });
      } else {
        const res = await axios.post(`${postRoute}?type=${sermonType}`, form);
        const created = res.data;
        // prepend created event so UI updates immediately
        setItems((prev) => [created, ...prev]);
        setMessage({ type: "success", text: `${component} created` });
      }

      setForm(emptyForm);
      setEditingId(null);
    } catch (err) {
      console.log(`Failed to submit to ${component}`);
      setMessage({ type: "error", text: "Action failed" });
    } finally {
      setSubmitting(false);
    }
  };

  const editItem = (item) => {
    scrollToSection("top-section");
    setEditingId(item.id);

    const filteredForm = Object.keys(emptyForm).reduce((acc, key) => {
      if (typeof emptyForm[key] === "object" && emptyForm[key] !== null) {
        // enforce language order from emptyForm
        acc[key] = Object.keys(emptyForm[key]).reduce((langAcc, lang) => {
          langAcc[lang] = item[key]?.[lang] ?? "";
          return langAcc;
        }, {});
      } else {
        acc[key] = item[key] ?? emptyForm[key];
      }

      return acc;
    }, {});

    setForm(filteredForm);
  };

  const deleteItem = async (id) => {
    setDeleting(true);
    setDeleteError("");
    try {
      await axios.delete(`${deleteRoute}?id=${id}`);
      // remove from local state immediately
      setItems((prev) => prev.filter((i) => i.id !== id));
      setShowDeleteModal(false);
      setSelectedDeleteId(null);
    } catch (err) {
      setDeleteError(`Failed to delete this ${component}`);
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteModal(true);
  };

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

  return (
    <section
      id="top-section"
      className="bg-white rounded-xl shadow-sm p-6 space-y-8"
    >
      <h2 className="text-xl font-semibold">{component}s</h2>

      {/* FORM */}
      <div className="space-y-6">
        {component === "sermon" && (
          <div className="flex gap-4">
            {["audio", "video"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSermonType(type);
                  if (sermonType !== type) {
                    setForm(emptyForm);
                    setEditingId(null);
                  }
                }}
                className={`px-4 py-2 rounded border ${
                  sermonType === type
                    ? "bg-gray-900 hover:bg-gray-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type === "audio" ? "Audio" : "Video"}
              </button>
            ))}
          </div>
        )}

        {Object.keys(form).map((key) => {
          const section = form[key];

          if (typeof section === "object" && section !== null) {
            return (
              <div key={key}>
                <p className="font-medium mb-2">
                  {key}
                  {required.includes(key) && "*"}
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  {Object.keys(section).map((lang) => {
                    {
                      return dataType[key] === "textarea" ? (
                        <TextareaAutosize
                          key={lang}
                          maxRows={10}
                          placeholder={`${key} (${lang})`}
                          className="border p-2 rounded"
                          value={section[lang]}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              [key]: { ...section, [lang]: e.target.value },
                            })
                          }
                        />
                      ) : (
                        <input
                          key={lang}
                          type={dataType[key]}
                          placeholder={`${key} (${lang})`}
                          className="border p-2 rounded"
                          value={section[lang]}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              [key]: { ...section, [lang]: e.target.value },
                            })
                          }
                        />
                      );
                    }
                  })}
                </div>
              </div>
            );
          } else {
            return (
              <div key={key}>
                <p className="font-medium mb-2">
                  {key}
                  {required.includes(key) && "*"}
                </p>
                <input
                  type={dataType[key]}
                  className="border p-2 rounded w-full"
                  value={section}
                  placeholder={
                    component === "sermon"
                      ? sermonType === "audio"
                        ? "SoundCloud link"
                        : "Youtube link"
                      : ""
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [key]: e.target.value,
                    })
                  }
                />
              </div>
            );
          }
        })}
      </div>

      {message && (
        <p
          className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}
        >
          {message.text}
        </p>
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
              Are you sure you want to delete this {component}? This action
              cannot be undone.
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
                onClick={() => deleteItem(selectedDeleteId)}
                className="px-4 py-2 bg-red-600 text-white disabled:opacity-50 rounded hover:bg-red-700"
              >
                {deleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACTION */}
      {editingId ? (
        <div>
          <button
            onClick={submit}
            disabled={!isValid() || submitting}
            className={`px-6 py-2 bg-yellow-500 rounded-lg disabled:opacity-50 ${!isValid() || submitting ? "" : "hover:bg-yellow-600"}`}
          >
            {submitting ? (
              <Loader2 className="animate-spin mr-2 inline-block w-6 h-6" />
            ) : (
              "Update"
            )}
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
            disabled={submitting}
            className={`ml-4 px-6 py-2 bg-gray-300 text-black rounded-lg disabled:opacity-50 ${submitting ? "" : "hover:bg-gray-400 "}`}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={submit}
          disabled={!isValid() || submitting}
          className={`px-6 py-2 bg-yellow-500 rounded-lg disabled:opacity-50 ${!isValid() || submitting ? "" : "hover:bg-yellow-600"}`}
        >
          {submitting ? (
            <Loader2 className="animate-spin mr-2 inline-block w-6 h-6" />
          ) : (
            `Add ${component}`
          )}
        </button>
      )}

      {/* LIST */}
      <div className="divide-y">
        {fetchingItems ? (
          <LoadingCard text={`Loading ${component}s...`} />
        ) : itemsError ? (
          <ErrorCard text={itemsError} onRetry={fetchItems} />
        ) : items.length === 0 ? (
          <div className="py-4 flex items-center justify-center">
            <div className="text-sm text-gray-500">No {component}s found.</div>
          </div>
        ) : component === "sermon" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
            {items.map((s) => (
              <div
                key={s.id}
                className={`group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ${
                  s.type === sermonType ? "block" : "hidden"
                }`}
              >
                {/* PREVIEW */}
                {s.type === "audio" ? (
                  <div className="aspect-video overflow-hidden rounded-t-2xl">
                    <iframe
                      width="100%"
                      height="166"
                      scrolling="no"
                      frameBorder="no"
                      allow="autoplay"
                      src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                        s.media_url,
                      )}&auto_play=false`}
                    />
                  </div>
                ) : (
                  <div className="aspect-video overflow-hidden rounded-t-2xl">
                    <iframe
                      className="w-full aspect-video rounded"
                      src={getYouTubeEmbedUrl(s.media_url)}
                      allowFullScreen
                    />
                  </div>
                )}

                {/* DESCRIPTION */}
                <p className="text-sm text-center text-gray-600">
                  {s.description?.en}
                </p>

                {/* ACTIONS */}
                <div className="flex justify-center p-4 gap-3">
                  <button
                    onClick={() => editItem(s)}
                    className="text-black bg-yellow-500 hover:bg-yellow-600 text-md px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(s.id)}
                    className="text-white bg-red-500 hover:bg-red-600 text-md px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="py-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.title?.["en"]}</p>
                <p className="text-sm text-gray-500">
                  {(item.description && item.description["en"]) || "—"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  disabled={submitting}
                  onClick={() => editItem(item)}
                  className="text-black bg-yellow-500 hover:bg-yellow-600 text-md px-4 py-2 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => confirmDelete(item.id)}
                  className="text-white bg-red-500 hover:bg-red-600 text-md px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <MessageToast message={message} />
    </section>
  );
}
