import { ChatHeader } from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({
    params
}: ChannelIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
      return auth().redirectToSignIn();
    }
  
    const channel = await db.channel.findUnique({
      where: {
        id: params.channelId,
      }
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    });

    if(!channel || !member){
        redirect("/");
    }
  
    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                profileId={profile.id}
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            {channel.type === ChannelType.TEXT && (
                <>
                    <ChatMessages 
                        name={channel.name}
                        member={member}
                        chatId={channel.id}
                        apiUrl="/api/messages"
                        socketQuery={{
                            channelId: channel.id,
                            serverId: channel.serverId,
                        }}
                        socketUrl="/api/socket/messages"
                        paramKey="channelId"
                        paramValue={channel.id}
                        type="channel"
                />
                    <div>
                        <ChatInput
                            otherMemberProfile={null}  
                            name={channel.name}
                            type="channel"
                            apiUrl="/api/socket/messages"
                            query={{
                                channelId: channel.id,
                                serverId: channel.serverId,
                            }}
                        />
                    </div>
                </>
            )}
            {channel.type === ChannelType.AUDIO && (
                <MediaRoom 
                    chatId={channel.id}
                    video={false}
                    audio={true}
                />
            )}
            {channel.type === ChannelType.VIDEO && (
                <MediaRoom 
                    chatId={channel.id}
                    video={true}
                    audio={true}
                />
            )}
        </div>
    )
}
 
export default ChannelIdPage;