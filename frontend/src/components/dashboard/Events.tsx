/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, MapPin } from "lucide-react";
import { useGetEvents } from "../../Hooks/useEvent";
import SidebarSkeleton from "./Helpers/SidebarSkeleton";

const Events = () => {
  const { data, isPending, isError } = useGetEvents();

  if (isPending) return <SidebarSkeleton rows={3} />;
  if (isError)   return null;

  const events: any[] = data ?? [];

  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={15} className="text-[#7c6fff]" />
        <h3 className="text-sm font-semibold text-[#e0e0f0]">Upcoming events</h3>
      </div>

      {events.length === 0 ? (
        <p className="text-xs text-[#3a3a52] py-2">
          No upcoming events in your communities.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {events.map((event: any) => (
            <EventItem key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

const EventItem = ({ event }: { event: any }) => {
  const date  = new Date(event.startDate);
  const day   = date.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = date.toLocaleDateString("en-IN", { month: "short" });

  return (
    <div className="flex items-start gap-3 group cursor-pointer">
      {/* Date pill */}
      <div className="shrink-0 w-10 text-center bg-[#1e1e2e] border border-[#2a2a38] rounded-xl py-1.5 group-hover:border-[#7c6fff] transition-colors">
        <p className="text-[9px] font-semibold text-[#7c6fff] uppercase tracking-wider">
          {month}
        </p>
        <p className="text-sm font-bold text-[#e0e0f0] leading-tight">{day}</p>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 pt-0.5">
        <p className="text-xs font-semibold text-[#c0c0e0] truncate group-hover:text-[#7c6fff] transition-colors">
          {event.title}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin size={10} className="text-[#3a3a52] shrink-0" />
          <p className="text-[11px] text-[#3a3a52] truncate">{event.location}</p>
        </div>
        {event.community?.name && (
          <p className="text-[10px] text-[#4a3a8a] mt-0.5">{event.community.name}</p>
        )}
      </div>
    </div>
  );
};

export default Events;