/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays } from "lucide-react";
import SidebarSkeleton from "../../../components/dashboard/Helpers/SidebarSkeleton";
import { EventCard } from "../../../components/EventHelper/EventCard";
import { useGetEvents } from "../../../Hooks/useEvent";

const EventsPage = () => {
  const { data, isPending, isError } = useGetEvents();

  const events = data ?? [];

  if (isPending)
    return (
      <div className="min-h-full bg-[#0d0d12] p-6">
        <div className="max-w-3xl mx-auto">
          <SidebarSkeleton rows={5} />
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center min-h-full">
        <p className="text-sm text-[#4a4a62]">Failed to load events</p>
      </div>
    );

  return (
    <div className="min-h-full bg-[#0d0d12] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-[#7c6fff]" />
            <h1 className="text-lg font-bold text-[#e0e0f0]">
              Upcoming Events
            </h1>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 rounded-2xl border border-[#2a2a38] bg-[#13131a]">
            <CalendarDays size={36} className="text-[#3a3a52]" />
            <p className="text-sm font-medium text-[#6a6a8a]">
              No upcoming events
            </p>
            <p className="text-xs text-[#3a3a52]">
              Events from your communities will appear here
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
