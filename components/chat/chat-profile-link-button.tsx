"use client";

import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import ActionTooltip from "@/components/action-tooltip";

interface ChatProfileLinkButtonProps {
  profileId: string;
}

export const ChatProfileLinkButton = ({
  profileId,
}: ChatProfileLinkButtonProps) => {
  const router = useRouter();

  const profileIdLink = profileId;

  const onClick = () => {
    router.push(`/profiles/${profileIdLink}`);
  };

  return (
    <ActionTooltip side="bottom" label="User profile">
      <button onClick={onClick} className="hover:opacity-75 transition mr-4">
        <User className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
      </button>
    </ActionTooltip>
  );
};
