import { EventDetailDescriptionSkeleton } from "../LoadingSkeletons";
import { ErrorBlock } from "../ErrorBlock";
import EmptyState from "../EmptyState";

const AnnouncementContent = ({ announcement, loading, lang, error, retry }) => {
  return (
    <section className="py-4 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {loading ? (
          <EventDetailDescriptionSkeleton />
        ) : error ? (
          <ErrorBlock onRetry={retry} />
        ) : !announcement?.content ? (
          <EmptyState />
        ) : (
          <article className="font-body text-gray-700 text-lg leading-relaxed space-y-6 wrap-pre">
            <p className="indent-8">{announcement?.content && announcement.content[lang]}</p>
          </article>
        )}
      </div>
    </section>
  );
};

export default AnnouncementContent;
