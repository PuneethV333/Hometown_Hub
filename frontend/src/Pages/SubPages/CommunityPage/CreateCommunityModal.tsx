import { useState } from "react";
import { X, Users, MapPin, Image } from "lucide-react";
import { useCreateCommunity } from "../../../Hooks/useCommunity";

import {
  useCityNames,
  useStateNames,
} from "../../../Hooks/useHelpers";

import { getImgUrl } from "../../../utils/getImgUrl";

import toast from "react-hot-toast";

interface CreateCommunityModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateCommunityModal = ({
  open,
  onClose,
}: CreateCommunityModalProps) => {
  const [form, setForm] = useState({
    name: "",
    type: "city" as
      | "town"
      | "city"
      | "state",
    state: "",
    city: "",
    town: "",
    icon: "",
  });

  const [iconFile, setIconFile] =
    useState<File | null>(null);

  const [iconPreview, setIconPreview] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const {
    mutate: createCommunity,
    isPending,
  } = useCreateCommunity();

  // hooks

  const states = useStateNames();

  const cities = useCityNames(
    form.state,
  );

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "type") {
        return {
          ...prev,
          type: value as
            | "town"
            | "city"
            | "state",
          city: "",
          town: "",
        };
      }

      if (name === "state") {
        return {
          ...prev,
          state: value,
          city: "",
          town: "",
        };
      }

      if (name === "city") {
        return {
          ...prev,
          city: value,
          town: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleIconChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file =
      e.target.files?.[0] ?? null;

    setIconFile(file);

    setIconPreview(
      file
        ? URL.createObjectURL(file)
        : "",
    );
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    // validation

    if (!form.name.trim()) {
      toast.error(
        "Community name required",
      );
      return;
    }

    if (!form.state) {
      toast.error(
        "Please select state",
      );
      return;
    }

    if (
      form.type !== "state" &&
      !form.city
    ) {
      toast.error(
        "Please select city",
      );
      return;
    }

    if (
      form.type === "town" &&
      !form.town.trim()
    ) {
      toast.error(
        "Please enter town",
      );
      return;
    }

    let iconUrl = "";

    if (iconFile) {
      try {
        setUploading(true);

        iconUrl = await getImgUrl(
          iconFile,
        );
      } catch {
        toast.error(
          "Icon upload failed",
        );
        return;
      } finally {
        setUploading(false);
      }
    }

    createCommunity(
      {
        ...form,
        icon: iconUrl,
      },
      {
        onSuccess: () => {
          onClose();

          setForm({
            name: "",
            type: "city",
            state: "",
            city: "",
            town: "",
            icon: "",
          });

          setIconFile(null);

          setIconPreview("");
        },
      },
    );
  };

  const isSubmitting =
    isPending || uploading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#2a2a38] bg-[#13131a] shadow-2xl">
        {/* HEADER */}

        <div className="flex items-center justify-between p-5 border-b border-[#2a2a38]">
          <div className="flex items-center gap-2">
            <Users
              size={20}
              className="text-violet-400"
            />

            <h2 className="text-lg font-semibold text-[#f0eeff]">
              Create Community
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[#1d1d28] transition-colors"
          >
            <X
              size={18}
              className="text-[#7b7a9a]"
            />
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          {/* ICON */}

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-[#1e1e2e] border border-[#2a2a38] overflow-hidden flex items-center justify-center shrink-0">
              {iconPreview ? (
                <img
                  src={iconPreview}
                  alt="icon"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  size={20}
                  className="text-[#3a3a52]"
                />
              )}
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-[#2a2a38] text-[#3a3a52] hover:border-[#7c6fff] hover:text-[#7c6fff] transition-all cursor-pointer text-xs">
                <Image size={13} />

                {iconPreview
                  ? "Change icon"
                  : "Upload icon"}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={
                    handleIconChange
                  }
                />
              </label>

              {iconPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setIconFile(null);
                    setIconPreview("");
                  }}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors px-1"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* NAME */}

          <div>
            <label className="text-sm text-[#b0aecb] mb-1 block">
              Community Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Bangalore Developers"
              required
              className="w-full h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38] px-4 text-sm text-white outline-none focus:border-[#7c6fff] placeholder:text-[#4a4a62]"
            />
          </div>

          {/* TYPE */}

          <div>
            <label className="text-sm text-[#b0aecb] mb-1 block">
              Community Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38] px-4 text-sm text-white outline-none focus:border-[#7c6fff]"
            >
              <option value="state">
                State
              </option>

              <option value="city">
                City
              </option>

              <option value="town">
                Town
              </option>
            </select>
          </div>

          {/* STATE */}

          <div>
            <label className="text-sm text-[#b0aecb] mb-1 block">
              State
            </label>

            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38] px-4 text-sm text-white outline-none focus:border-[#7c6fff]"
            >
              <option value="">
                Select state
              </option>

              {states.map(
                (state: string) => (
                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* CITY */}

          {form.type !== "state" && (
            <div>
              <label className="text-sm text-[#b0aecb] mb-1 block">
                City
              </label>

              <select
                name="city"
                value={form.city}
                onChange={handleChange}
                disabled={
                  !form.state
                }
                required
                className="w-full h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38] px-4 text-sm text-white outline-none focus:border-[#7c6fff] disabled:opacity-50"
              >
                <option value="">
                  {!form.state
                    ? "Select state first"
                    : cities.length === 0
                      ? "Loading cities..."
                      : "Select city"}
                </option>

                {cities.map(
                  (city: string) => (
                    <option
                      key={city}
                      value={city}
                    >
                      {city}
                    </option>
                  ),
                )}
              </select>
            </div>
          )}

          {/* TOWN */}

          {form.type === "town" && (
            <div>
              <label className="text-sm text-[#b0aecb] mb-1 block">
                Town / Area
              </label>

              <div className="flex items-center gap-2 px-3 h-11 rounded-xl bg-[#0d0d12] border border-[#2a2a38] focus-within:border-[#7c6fff]">
                <MapPin
                  size={15}
                  className="text-[#6a6a8a] shrink-0"
                />

                <input
                  type="text"
                  name="town"
                  value={form.town}
                  onChange={handleChange}
                  placeholder="Enter town / area"
                  disabled={
                    !form.city
                  }
                  required
                  className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-[#4a4a62] disabled:opacity-50"
                />
              </div>
            </div>
          )}

          {/* ACTIONS */}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-11 rounded-xl border border-[#2a2a38] text-[#b0aecb] hover:bg-[#1a1a24] transition-all text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 h-11 rounded-xl bg-linear-to-r from-violet-600 to-violet-800 text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 text-sm"
            >
              {uploading
                ? "Uploading..."
                : isPending
                  ? "Creating..."
                  : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunityModal;