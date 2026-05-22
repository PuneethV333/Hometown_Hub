/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ImagePlus, X, Send, ChevronDown } from "lucide-react";
import { useAddPost } from "../../../Hooks/usePost";
import toast from "react-hot-toast";
import type { SideBarProps } from "../../../Pages/SubPages/SideBar";
import { getInitials } from "../../../utils/getInitials";
import { getImgUrl } from "../../../utils/getImgUrl";

const ComposeBox = ({ user }: SideBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const { mutate: addPost, isPending } = useAddPost();
  
  
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview("");
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = async () => {
    if (!content.trim()) return toast.error("Write something first");
    if (!communityId) return toast.error("Select a community");

    let imgUrl = "";

    if (image) {
      try {
        setUploading(true);
        imgUrl = await getImgUrl(image);
      } catch {
        toast.error("Image upload failed");
        return;
      } finally {
        setUploading(false);
      }
    }

    addPost(
      { content, communityId, image: imgUrl },
      {
        onSuccess: () => {
          toast.success("Post created!");
          setContent("");
          setImage(null);
          setPreview("");
          setCommunityId("");
          setIsOpen(false);
        },
        onError: () => toast.error("Failed to create post"),
      },
    );
  };

  const isSubmitting = isPending || uploading;

  return (
    <>
      <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1e1e2e] border border-[#2a2a38] flex items-center justify-center text-xs font-semibold text-[#7c6fff] overflow-hidden shrink-0">
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              getInitials(user?.name)
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 text-left px-4 py-2.5 rounded-xl bg-[#0d0d12] border border-[#2a2a38] text-[#3a3a52] text-sm hover:border-[#3a3a52] transition-colors"
          >
            What's happening in your hometown?
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-xl text-[#3a3a52] hover:text-[#7c6fff] hover:bg-[#1e1e2e] transition-all"
          >
            <ImagePlus size={18} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#13131a] border border-[#2a2a38] rounded-2xl p-5 z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#e0e0f0]">
                Create Post
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-[#3a3a52] hover:text-[#e0e0f0] hover:bg-[#1e1e2e] transition-all"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#1e1e2e] border border-[#2a2a38] flex items-center justify-center text-xs font-semibold text-[#7c6fff] overflow-hidden shrink-0">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#e0e0f0]">
                  {user?.name}
                </p>
                <div className="relative mt-1">
                  <select
                    value={communityId}
                    onChange={(e) => setCommunityId(e.target.value)}
                    className="appearance-none bg-[#1e1e2e] border border-[#2a2a38] rounded-lg pl-2 pr-6 py-0.5 text-[11px] text-[#7c6fff] outline-none focus:border-[#7c6fff] transition-colors cursor-pointer"
                  >
                    <option value="" disabled>
                      Select community
                    </option>
                    {user?.myCommunities?.map((c: any) => {
                      return (
                        <option key={c?._id} value={c?._id}>
                          {c?.name}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown
                    size={10}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[#7c6fff] pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening in your hometown?"
              rows={4}
              className="w-full bg-[#0d0d12] border border-[#2a2a38] rounded-xl px-4 py-3 text-sm text-[#e0e0f0] placeholder:text-[#3a3a52] outline-none focus:border-[#7c6fff] transition-colors resize-none mb-3"
            />

            {preview && (
              <div className="relative rounded-xl overflow-hidden mb-3 border border-[#2a2a38]">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-h-48 object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white hover:bg-black/80 transition-all"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {!preview && (
              <label className="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl border border-dashed border-[#2a2a38] text-[#3a3a52] hover:border-[#7c6fff] hover:text-[#7c6fff] transition-all cursor-pointer text-xs">
                <ImagePlus size={14} />
                Add image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-[#2a2a38]">
              <p
                className={`text-xs ${content.length > 1800 ? "text-red-400" : "text-[#3a3a52]"}`}
              >
                {content.length}/2000
              </p>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !content.trim() || !communityId}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2d1f5e] border border-violet-600/30 text-[#c4b5fd] hover:bg-[#3a2970] disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm font-medium"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-[#7c6fff] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                {uploading ? "Uploading..." : isPending ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComposeBox;
