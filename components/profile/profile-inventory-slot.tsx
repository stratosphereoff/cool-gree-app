"use client";

import { cn } from "@/lib/utils";

interface ProfileInventorySlotProps {
  slotType: string;
  slotW: number;
  slotH: number;
  fileUrl?: string;
}

const ProfileInventorySlot = ({
  slotType,
  slotW,
  slotH,
  fileUrl,
}: ProfileInventorySlotProps) => {
  const isSlotEmpty = true;

  const colSpan = `col-span-${slotW}`;
  const rowSpan = `row-span-${slotH}`;

  const hasItemStyle = `flex bg-[#2f271d80]/25 ${colSpan} ${rowSpan} border border-[#f6ae5580] shadow-[inset_0px_0px_3px_1px_#fbd38d]`;
  const emptyStyle = `bg-black ${colSpan} ${rowSpan} border-0 shadow-none`;

  return (
    <div className={cn(hasItemStyle, isSlotEmpty && emptyStyle)}
    >
      {!isSlotEmpty ? <img src={fileUrl} alt={slotType} /> : <p>{slotType}</p>}
    </div>
  );
};

export default ProfileInventorySlot;
