export const UpcomingEventsSkeleton = () => {
    return (
        <div>
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="rounded-2xl bg-[#FFFEFC] p-8 my-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5 animate-pulse">

                    {/* Accent line */}
                    < div className="h-[2px] w-12 bg-gray-200 mb-6" />

                    {/* Date */}
                    < div className="h-4 w-32 bg-gray-200 rounded mb-2" />

                    {/* Title */}
                    < div className="h-6 w-2/3 bg-gray-300 rounded mb-3" />

                    {/* Description */}
                    < div className="space-y-2 mb-6" >
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        <div className="h-4 w-4/6 bg-gray-200 rounded" />
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-gray-300 rounded-full" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-gray-300 rounded-full" />
                            <div className="h-4 w-28 bg-gray-200 rounded" />
                        </div>
                    </div>

                </div >
            ))}
        </div>
    )
};

export const FeaturedEventSkeleton = () => {
    return (
        <div className="animate-pulse">

            {/* Title */}
            <div className="h-8 w-2/3 bg-gray-300 rounded mb-4" />

            {/* Description */}
            <div className="space-y-3 mb-6">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-6 mb-8 text-sm">

                {/* Date */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 rounded-full" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>

                {/* Location */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 rounded-full" />
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                </div>

                {/* Time */}
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-gray-300 rounded-full" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                </div>

            </div>

            {/* CTA Button */}
            <div className="h-10 w-40 bg-gray-300 rounded-md" />

        </div>
    );
};

export const AnnouncementSkeleton = () => {
    return (
        <div>
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-[#FFFEFC] border border-black/5 rounded-2xl shadow-xl shadow-black/10 my-4 p-8 md:p-10 animate-pulse">

                    {/* Date */}
                    <div className="h-4 w-32 bg-gray-300 rounded mb-3" />

                    {/* Title */}
                    <div className="h-8 w-2/3 bg-gray-300 rounded mb-4" />

                    {/* Description */}
                    <div className="space-y-3 mb-6">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        <div className="h-4 w-4/6 bg-gray-200 rounded" />
                    </div>

                    {/* CTA Link */}
                    <div className="h-5 w-24 bg-gray-300 rounded" />
                </div>
            ))}
        </div>
    );
};

export const MessageSkeleton = () => {
    return (
        <div>
            {[1, 2, 3].map((_, i) => (
                <div key={i} className="border-b border-black/10 pb-20 animate-pulse">

                    {/* Title */}
                    <div className="h-7 w-2/3 bg-gray-300 rounded mb-3" />

                    {/* Date */}
                    <div className="h-4 w-32 bg-gray-200 rounded mb-4" />

                    {/* Description */}
                    <div className="space-y-3 mb-6">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                        <div className="h-4 w-4/6 bg-gray-200 rounded" />
                    </div>

                    {/* CTA Button */}
                    <div className="h-5 w-24 bg-gray-300 rounded" />
                </div>
            ))}
        </div>
    );
};

export const FeaturedSermonSkeleton = () => {
    return (
        <>
            {/* Video Placeholder */}
            <div className="aspect-video rounded-2xl overflow-hidden shadow-xl animate-pulse">
                <div className="w-full h-full bg-gray-300" />
            </div>

            {/* Info Placeholder */}
            <div className="animate-pulse">
                {/* Eyebrow */}
                <div className="h-4 w-24 bg-gray-200 rounded mb-2" />

                {/* Title */}
                <div className="h-7 w-3/4 bg-gray-300 rounded mb-4" />

                {/* Date */}
                <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
        </>
    );
};

export const SermonCardSkeleton = ({ count = 3 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="group rounded-2xl bg-white shadow-md transition-all duration-300 animate-pulse"
                >
                    {/* Video Placeholder */}
                    <div className="aspect-video overflow-hidden rounded-t-2xl">
                        <div className="w-full h-full bg-gray-300" />
                    </div>

                    {/* Content Placeholder */}
                    <div className="p-6">
                        {/* Title */}
                        <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />

                        {/* Date */}
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                </div>
            ))}
        </>
    );
};

export const ImageCardSkeleton = ({ count = 6 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition animate-pulse"
                >
                    {/* Image Placeholder */}
                    <div className="relative w-full h-72 bg-gray-300" />

                    {/* Overlay Placeholder */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                </div>
            ))}
        </>
    );
};

export const EventDetailDescriptionSkeleton = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 animate-pulse">
            <div className="space-y-6 font-body text-gray-700 leading-relaxed">
                {/* Paragraph 1 */}
                <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-5/6 bg-gray-200 rounded" />
                    <div className="h-4 w-4/6 bg-gray-200 rounded" />
                </div>

                {/* Paragraph 2 */}
                <div className="space-y-3">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
};

export const EventDetailHeroSkeleton = () => {
    return (
        <div>
            {/* Title */}
            <div className="h-8 md:h-12 w-1/2 mx-auto bg-gray-300 rounded mb-6" />

            {/* Description */}
            <div className="space-y-3 max-w-2xl mx-auto">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-4/6 bg-gray-200 rounded" />
            </div>
        </div>
    );
};

export const EventDetailMetaSkeleton = () => {
    return (
        <div className="h-4 w-full bg-gray-200 rounded" />
    )
}