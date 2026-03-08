"use client";

import { useMemo, useState } from "react";
import { getYouTubeEmbedUrl } from "@/lib/getEmbedUrl";

const getYouTubeVideoId = (url) => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
    if (parsed.hostname.includes("youtube.com"))
      return parsed.searchParams.get("v");
  } catch {
    return null;
  }
  return null;
};

const getYouTubeThumbnailUrl = (videoId) => {
  if (!videoId) return "";
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const LazyYouTubeEmbed = ({ url, title, className, style }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = useMemo(() => getYouTubeVideoId(url), [url]);
  const thumbnail = useMemo(() => getYouTubeThumbnailUrl(videoId), [videoId]);
  const embedUrl = useMemo(() => getYouTubeEmbedUrl(url), [url]);

  const ariaLabel = title ? `Play video: ${title}` : "Play video";

  if (!url || !embedUrl) return null;

  return (
    <div
      className={className}
      style={style}
      role="button"
      tabIndex={0}
      onClick={() => setIsPlaying(true)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setIsPlaying(true);
        }
      }}
      aria-label={ariaLabel}
    >
      {!isPlaying ? (
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
          <img
            src={thumbnail}
            alt={title ?? "YouTube video thumbnail"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer group">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:bg-white">
              <span className="ml-1 text-3xl text-black">▶</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <iframe
            src={embedUrl}
            title={title ?? "YouTube video"}
            className="w-full h-full"
            allowFullScreen
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default LazyYouTubeEmbed;
