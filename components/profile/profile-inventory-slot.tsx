"use client";

import { cn } from "@/lib/utils";

interface ProfileInventorySlotProps {
  slotType: string;
  colSpan: string;
  rowSpan: string;
  fileUrl?: string;
}

const ProfileInventorySlot = ({
  slotType,
  colSpan,
  rowSpan,
  fileUrl,
}: ProfileInventorySlotProps) => {
  const isSlotEmpty = true;

  const hasItemStyle = `flex bg-[#2f271d80]/25 ${colSpan} ${rowSpan} border border-[#f6ae5580] shadow-[inset_0px_0px_3px_1px_#fbd38d]`;
  const emptyStyle = `bg-black ${colSpan} ${rowSpan} border-0 shadow-none`;

  return (
    <div className={cn(hasItemStyle, isSlotEmpty && emptyStyle)}
    >
      {!isSlotEmpty ? <img src={fileUrl} alt={slotType} /> : <p className="text-zinc-200 dark:text-white">{slotType}</p>}
    </div>
  );
};

export default ProfileInventorySlot;
