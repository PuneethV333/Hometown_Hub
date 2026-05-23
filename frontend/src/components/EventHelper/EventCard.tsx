/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, MapPin } from "lucide-react";

export const EventCard = ({ event }: { event: any }) => {
  const date = new Date(event.startDate);
  const day = date.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = date.toLocaleDateString("en-IN", { month: "short" });
  const year = date.toLocaleDateString("en-IN", { year: "numeric" });
  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5 hover:border-[#3a3a52] transition-colors">
      <div className="flex gap-4">
        <div className="shrink-0 w-14 text-center bg-[#1e1e2e] border border-[#2a2a38] rounded-xl py-2 px-1">
          <p className="text-[10px] font-semibold text-[#7c6fff] uppercase tracking-wider">
            {month}
          </p>
          <p className="text-xl font-bold text-[#e0e0f0] leading-tight">
            {day}
          </p>
          <p className="text-[10px] text-[#3a3a52]">{year}</p>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h2 className="text-sm font-semibold text-[#e0e0f0]">
              {event.title}
            </h2>
            <span
              className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                event.status === "ongoing"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-[#1e1e2e] text-[#7c6fff] border border-[#2a2a38]"
              }`}
            >
              {event.status}
            </span>
          </div>

          {event.description && (
            <p className="text-xs text-[#6a6a8a] mb-3 line-clamp-2">
              {event.description}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-3">
            <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
              <MapPin size={11} />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-[#3a3a52]">
              <CalendarDays size={11} />
              <span>{time}</span>
            </div>

            {event.community && (
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded overflow-hidden bg-[#1e1e2e]">
                  {event.community.icon ? (
                    <img
                      src={event.community.icon}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] text-[#7c6fff] font-bold">
                      {event.community.name?.[0]}
                    </div>
                  )}
                </div>
                <span className="text-xs text-[#7c6fff]">
                  {event.community.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
