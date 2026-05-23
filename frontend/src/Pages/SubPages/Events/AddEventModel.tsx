import { useState } from "react";
import { X, CalendarDays, MapPin, FileText, Users } from "lucide-react";
import type { addEventsReqBodyType } from "../../../types/events.types";

interface Community {
  _id: string;
  name: string;
}

interface AddEventModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: addEventsReqBodyType) => void;
  isPending?: boolean;
  communities: Community[];
}

const AddEventModal = ({
  open,
  onClose,
  onSubmit,
  isPending,
  communities,
}: AddEventModalProps) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    community: "",
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      startDate: new Date(form.startDate),
      endDate: form.endDate ? new Date(form.endDate) : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#2a2a38] bg-[#13131a] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2a2a38]">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-violet-400" />
            <h2 className="text-lg font-semibold text-[#f0eeff]">
              Create Event
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#1d1d28] transition-colors"
          >
            <X size={18} className="text-[#7b7a9a]" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {/* Community */}
          <div>
            <label className="text-sm text-[#b0aecb] mb-1 block">
              Community
            </label>
            <div className="flex items-center gap-2 px-3 h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38]">
              <Users size={16} className="text-[#6a6a8a]" />
              <select
                name="community"
                value={form.community}
                onChange={handleChange}
                required
                className="flex-1 bg-transparent outline-none text-sm text-white"
              >
                <option value="" disabled className="bg-[#0d0d12]">
                  Select community
                </option>
                {communities.map((c) => (
                  <option key={c._id} value={c._id} className="bg-[#0d0d12]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm text-[#b0aecb] mb-1 block">
              Event Title
            </label>
            <div className="flex items-center gap-2 px-3 h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38]">
              <FileText size={16} className="text-[#6a6a8a]" />
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="React Meetup"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-[#4a4a62]"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-[#b0aecb] mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Tell people about the event..."
              className="w-full rounded-xl bg-[#0d0d12] border border-[#2a2a38] px-4 py-3 text-sm text-white outline-none resize-none placeholder:text-[#4a4a62]"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-[#b0aecb] mb-1 block">
                Start Date
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38] px-3 text-sm text-white outline-none"
                required
              />
            </div>
            <div>
              <label className="text-sm text-[#b0aecb] mb-1 block">
                End Date
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38] px-3 text-sm text-white outline-none"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-[#b0aecb] mb-1 block">
              Location
            </label>
            <div className="flex items-center gap-2 px-3 h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38]">
              <MapPin size={16} className="text-[#6a6a8a]" />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Bangalore"
                className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-[#4a4a62]"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-11 rounded-xl border border-[#2a2a38] text-[#b0aecb] hover:bg-[#1a1a24] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 h-11 rounded-xl bg-linear-to-r from-violet-600 to-violet-800 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
