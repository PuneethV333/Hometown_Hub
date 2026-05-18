// import ImageIcon from "../icons/ImageIcon";

import ImageIcon from "./icons/ImageIcon";

const ComposeBox = () => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#EBEBEB]">
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-[#E8E4FF] flex items-center justify-center text-sm font-semibold text-[#5B4FCF]">
        U
      </div>
      <button className="flex-1 text-left px-4 py-2.5 rounded-xl bg-[#F7F6F3] text-[#9B9B9B] text-sm hover:bg-[#EFEFEF] transition-colors">
        What's happening in your hometown?
      </button>
      <button className="p-2 rounded-xl hover:bg-[#F7F6F3] transition-colors text-[#9B9B9B]">
        <ImageIcon />
      </button>
    </div>
  </div>
);

export default ComposeBox;