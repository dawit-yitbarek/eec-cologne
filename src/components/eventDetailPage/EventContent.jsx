import { ErrorBlock } from "../ErrorBlock";
import { EventDetailDescriptionSkeleton } from "../LoadingSkeletons";
import EmptyState from "../EmptyState";

const EventContent = ({ content, event, loading, error, retry, lang }) => {
    console.log('This is event: ', event)
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {loading ? (
          <EventDetailDescriptionSkeleton />
        ) : error ? (
          <ErrorBlock message="Failed to load event details." onRetry={retry} />
        ) : !event.content ? (
          <EmptyState />
        ) : (
          <>
            <h2 className="font-heading text-2xl mb-6">{content.title}</h2>
            <div className="space-y-6 font-body text-gray-700 leading-relaxed wrap-pre">
              <p className="indent-8">{event?.content && event.content[lang]}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default EventContent;
