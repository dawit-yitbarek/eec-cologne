"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import axios from "axios";

import DashboardLayout from "@/components/admin/DashboardLayout";
import AdminNav from "@/components/admin/AdminNav";

import GallerySection from "@/components/admin/GallerySection";
import ManageSection from "@/components/admin/Manage";
import ReusableSection from "@/components/admin/Reusable";

const eventsRequired = ["title", "content", "event_date", "start_time"];
const eventsEmptyForm = {
  title: { en: "", de: "", am: "" },
  description: { en: "", de: "", am: "" },
  content: { en: "", de: "", am: "" },
  event_date: "",
  start_time: "",
  end_time: "",
  location: "",
};
const eventsDataType = {
  title: "text",
  description: "textarea",
  content: "textarea",
  event_date: "date",
  start_time: "time",
  end_time: "time",
  location: "text",
};

const announcementsRequired = ["title", "content"];
const announcementsEmptyForm = {
  title: { en: "", de: "", am: "" },
  description: { en: "", de: "", am: "" },
  content: { en: "", de: "", am: "" },
};
const announcementsDataType = {
  title: "text",
  description: "textarea",
  content: "textarea",
};

const sermonsRequired = ["media_url"];
const sermonsEmptyForm = {
  media_url: "",
  description: { en: "", de: "", am: "" },
};
const sermonsDataType = {
  media_url: "text",
  description: "textarea",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState("events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get("/api/admin/me");
        setLoading(false);
      } catch (err) {
        console.log("Error on checking admin: ", err);
        router.push("/admin/login");
      }
    };
    check();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl font-bold text-gray-500">
        Loading admin dashboard
        <Loader size={64} className="animate-spin my-4 text-yellow-600" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <AdminNav active={active} onChange={setActive} />

      <div style={{ display: active === "events" ? "block" : "none" }}>
        <ReusableSection
          component={"event"}
          required={eventsRequired}
          emptyForm={eventsEmptyForm}
          getRoute={"/api/events"}
          putRoute={"/api/events/detail"}
          postRoute={"/api/events"}
          deleteRoute={"/api/events/detail"}
          dataType={eventsDataType}
        />
      </div>
      <div style={{ display: active === "announcements" ? "block" : "none" }}>
        <ReusableSection
          component={"announcement"}
          required={announcementsRequired}
          emptyForm={announcementsEmptyForm}
          getRoute={"/api/announcements"}
          putRoute={"/api/announcements/detail"}
          postRoute={"/api/announcements"}
          deleteRoute={"/api/announcements/detail"}
          dataType={announcementsDataType}
        />
      </div>
      <div style={{ display: active === "pastor" ? "block" : "none" }}>
        <ReusableSection
          component={"pastor message"}
          required={announcementsRequired}
          emptyForm={announcementsEmptyForm}
          getRoute={"/api/pastor-message"}
          putRoute={"/api/pastor-message"}
          postRoute={"/api/pastor-message"}
          deleteRoute={"/api/pastor-message"}
          dataType={announcementsDataType}
        />
      </div>
      <div style={{ display: active === "sermons" ? "block" : "none" }}>
        <ReusableSection
          component={"sermon"}
          required={sermonsRequired}
          emptyForm={sermonsEmptyForm}
          getRoute={"/api/sermons"}
          putRoute={"/api/sermons"}
          postRoute={"/api/sermons"}
          deleteRoute={"/api/sermons"}
          dataType={sermonsDataType}
        />
      </div>
      <div style={{ display: active === "gallery" ? "block" : "none" }}>
        <GallerySection />
      </div>
      <div style={{ display: active === "manage" ? "block" : "none" }}>
        <ManageSection />
      </div>
    </DashboardLayout>
  );
}
