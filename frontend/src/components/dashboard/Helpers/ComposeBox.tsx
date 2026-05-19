import { ImagePlus } from "lucide-react";

const ComposeBox = () => {
  return (
    <div className="bg-[#13131a] border border-[#2a2a38] rounded-2xl p-4">
      <div className="flex items-center gap-3">
        
        <div className="w-9 h-9 rounded-full bg-[#1e1e2e] border border-[#2a2a38] flex items-center justify-center text-xs font-semibold text-[#7c6fff] shrink-0">
          U
        </div>

        
        <button className="flex-1 text-left px-4 py-2.5 rounded-xl bg-[#0d0d12] border border-[#2a2a38] text-[#3a3a52] text-sm hover:border-[#3a3a52] transition-colors">
          What's happening in your hometown?
        </button>

        
        <button className="p-2 rounded-xl text-[#3a3a52] hover:text-[#7c6fff] hover:bg-[#1e1e2e] transition-all">
          <ImagePlus size={18} />
        </button>
      </div>
    </div>
  );
};

export default ComposeBox;