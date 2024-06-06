"use client";

import { Profile } from "@prisma/client";
import UserAvatar from "../user-avatar";
import ActionTooltip from "../action-tooltip";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfilePlayerInfoProps {
    visitorId: string;
    profile: Profile;
    memberId: string;
    serverId: string;
}

const ProfilePlayerInfo = ({ visitorId, profile, memberId, serverId } : ProfilePlayerInfoProps) => {   
  const playerLevel = profile.level;
  const playerClass = profile.class;

  const router = useRouter();

    const onClick = () => {
        visitorId !== profile.id 
          ? router.push(`/servers/${serverId}/conversations/${memberId}`)
          : router.push("/");
    }

  return (
    <>
    <div className="bg-indigo-500 absolute mb-[476px] ml-[384px] border rounded-full">
      <ActionTooltip label="Return">
            <X 
                onClick={onClick}
                className="cursor-pointer ml-auto w-7 h-7 text-zinc-600 hover:text-zinc-100 dark:hover:text-zinc-300 transition"
            />
       </ActionTooltip>
    </div>
    <div className="relative flex items-center bg-neutral-100/15 w-96 rounded-sm">
      <div>
        <UserAvatar
          className="m-5 md:h-[72px] md:w-[72px]"
          src={profile.imageUrl}
        />
      </div>
      <div>
        <p className="uppercase text-xs text-emerald-700">adventurers guild</p>
        <p className="text-2xl font-bold">
          {`${profile.name}`}
        </p>
        <p className="text-xs">{`Level ${playerLevel} ${playerClass}`}</p>
      </div>
    </div>
    </>
  );
};

export default ProfilePlayerInfo;
