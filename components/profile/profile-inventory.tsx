"use client";

import ProfileInventorySlot from "./profile-inventory-slot";

const ProfilePlayerEquipment = () => {
  return (
    <div className="bg-zinc-200 dark:bg-zinc-800 gap-y-2 w-96 h-[360px] rounded-sm">
      <div className="flex items-center bg-emerald-600/25 w-full h-6 rounded-t-md">
        <p className="text-xs px-1">Equipment</p>
      </div>
      <div className="h-[300px] p-1 text-[10px]">
        <div className="mt-5 grid grid-cols-8 grid-rows-6 gap-1 h-full w-full">
          <ProfileInventorySlot slotType="Weapon1" slotW={2} slotH={4} fileUrl={""} />
          <ProfileInventorySlot slotType="Ring1" slotW={1} slotH={1} fileUrl={""} />
          <ProfileInventorySlot slotType="Helmet" slotW={2} slotH={2} fileUrl={""} />
          <ProfileInventorySlot slotType="Amulet1" slotW={1} slotH={1} fileUrl={""} />
          <ProfileInventorySlot slotType="Weapon2" slotW={2} slotH={4} fileUrl={""} />
          <ProfileInventorySlot slotType="Ring2" slotW={1} slotH={1} fileUrl={""} />
          <ProfileInventorySlot slotType="Amulet2" slotW={1} slotH={1} fileUrl={""} />
          <ProfileInventorySlot slotType="Ring3" slotW={1} slotH={1} fileUrl={""} />
          <ProfileInventorySlot slotType="Body" slotW={2} slotH={3} fileUrl={""} />
          <ProfileInventorySlot slotType="Ring5" slotW={1} slotH={1} fileUrl={""} />
          <ProfileInventorySlot slotType="Ring4" slotW={1} slotH={1} fileUrl={""} />
          <ProfileInventorySlot slotType="Ring6" slotW={1} slotH={1} fileUrl={""} />
          <div className="col-span-1 row-span-2" />
          <ProfileInventorySlot slotType="Glove" slotW={2} slotH={2} fileUrl={""} />
          <ProfileInventorySlot slotType="Boots" slotW={2} slotH={2} fileUrl={""} />
          <div className="col-span-1 row-span-2" />
          <ProfileInventorySlot slotType="Belt" slotW={2} slotH={1} fileUrl={""} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePlayerEquipment;
