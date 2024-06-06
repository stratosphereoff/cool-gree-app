"use client";

import { cn } from "@/lib/utils";

interface ProfileInventorySlotProps {
  slotType: string;
  slotH: number;
  slotW: number;
  fileUrl?: string;
}

const ProfileInventorySlot = ({
  slotType,
  slotH,
  slotW,
  fileUrl,
}: ProfileInventorySlotProps) => {
  const isSlotEmpty = true;

  const hasItemStyle = `flex bg-[#2f271d80]/25 col-span-${slotW} row-span-${slotH} border border-[#f6ae5580] shadow-[inset_0px_0px_3px_1px_#fbd38d]`;
  const emptyStyle = `bg-black col-span-${slotW} row-span-${slotH} border-0 shadow-none`;

  return (
    <div className={cn(hasItemStyle, isSlotEmpty && emptyStyle)}
    >
      {!isSlotEmpty ? <img src={fileUrl} alt={slotType} /> : <p>{slotType}</p>}
    </div>
  );
};

export default ProfileInventorySlot;
