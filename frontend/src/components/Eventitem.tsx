/* eslint-disable @typescript-eslint/no-explicit-any */
const EventItem = ({ event }: { event: any }) => {
  const date = new Date(event.startDate);
  const day = date.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = date.toLocaleDateString("en-IN", { month: "short" });

  return (
    <div className="flex items-start gap-3 group cursor-pointer">
      <div className="flex-shrink-0 w-10 text-center bg-[#F0EDFF] rounded-lg py-1">
        <p className="text-[10px] font-medium text-[#5B4FCF] uppercase">{month}</p>
        <p className="text-sm font-bold text-[#5B4FCF] leading-tight">{day}</p>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[#1A1A1A] truncate group-hover:text-[#5B4FCF] transition-colors">
          {event.title}
        </p>
        <p className="text-[11px] text-[#9B9B9B] truncate">{event.location}</p>
        {event.community && (
          <p className="text-[10px] text-[#C4BBFF] mt-0.5">{event.community.name}</p>
        )}
      </div>
    </div>
  );
};

export default EventItem;