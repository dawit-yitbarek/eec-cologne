import axios from "axios";
import { LogOut, Loader2 } from "lucide-react";
import { useState } from "react";

const tabs = [
  { key: "events", label: "Events" },
  { key: "announcements", label: "Announcements" },
  { key: "pastor", label: "pastor-message" },
  { key: "gallery", label: "Gallery" },
  { key: "sermons", label: "Sermons" },
  { key: "manage", label: "Manage" },
];

export default function AdminNav({ active, onChange }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    try {
      setLeaving(true);
      await axios.post("/api/admin/logout");
      window.location.href = "/";
    } catch (error) {
      console.log("Failed to logout: ", error)
      setLeaving(false);
      setLogoutError("Failed to logout. Please try again");
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Tabs Section */}
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
          ${
            active === tab.key
              ? "bg-yellow-500 text-black shadow-inner"
              : "bg-white text-gray-700 hover:bg-yellow-50"
          }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex justify-center items-center gap-1 w-auto sm:self-auto self-center px-4 py-2 rounded-lg text-sm font-medium transition bg-yellow-500 text-black shadow-inner hover:bg-yellow-600"
        >
          Logout <LogOut size={16} />
        </button>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <p className="text-lg font-medium mb-2">Confirm Logout</p>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to logout ?
            </p>
            {logoutError && (
              <p className="text-md text-red-600 mb-4">{logoutError}</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                disabled={leaving}
                onClick={() => {
                  setShowLogoutModal(false);
                  setLogoutError("");
                }}
                className="px-4 py-2 bg-gray-200 disabled:opacity-50 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                disabled={leaving}
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white disabled:opacity-50 rounded hover:bg-red-700"
              >
                {leaving ? <Loader2 className="animate-spin" size={24} /> : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
