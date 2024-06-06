import { Hash } from "lucide-react";

import { MobileToggle } from "@/components/mobile-toggle";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";
import ProfilePageMini from "@/components/profile-page-mini";
import { ChatProfileLinkButton } from "./chat-profile-link-button";

interface ChatHeaderProps {
  serverId: string;
  profileId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export const ChatHeader = ({
  serverId,
  profileId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-netural-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      { type === "conversation" && (
        <ProfilePageMini imageUrl={imageUrl} />
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
      <div className="ml-auto flex items-center"> 
        {type === "conversation" && (
          <ChatVideoButton />
        )}
        {type === "conversation" && (
        <ChatProfileLinkButton profileId={profileId} />
        )}
        <SocketIndicator />
      </div>
    </div>
  );
};
