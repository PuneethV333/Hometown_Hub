/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetEvents } from "../../Hooks/useEvent";
import EventItem from "../Eventitem";
import CalendarIcon from "../icons/CalendarIcon";
import SidebarSkeleton from "../shared/SidebarSkeleton";
// import CalendarIcon from "../icons/CalendarIcon";
// import EventItem from "./EventItem";
// import SidebarSkeleton from "../shared/SidebarSkeleton";

const Events = () => {
  const { data, isPending, isError } = useGetEvents();

  if (isPending) return <SidebarSkeleton title="Upcoming events" rows={3} />;
  if (isError) return null;

  const events = data?.data ?? [];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#EBEBEB]">
      <h3 className="text-sm font-semibold text-[#1A1A1A] mb-3 flex items-center gap-2">
        <CalendarIcon />
        Upcoming events
      </h3>

      {events.length === 0 ? (
        <p className="text-xs text-[#9B9B9B] py-2">No upcoming events in your communities.</p>
      ) : (
        <div className="space-y-3">
          {events.map((event: any) => (
            <EventItem key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;