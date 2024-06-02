import { ChatHeader } from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
        serverId: string;
    },
    searchParams: {
        video?: boolean;
    }
}

const MeberIdPage = async ({
    params,
    searchParams
}: MemberIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return auth().redirectToSignIn();
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });

    if (!currentMember) {
        return redirect("/");
    }

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if (!conversation) {
        return redirect(`/servers/${params.serverId}`);
    }

    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                imageUrl={otherMember.profile.imageUrl}
                name={otherMember.profile.name}
                serverId={params.serverId}
                type="conversation"
            />
            {searchParams.video && (
                <MediaRoom 
                    chatId={conversation.id}
                    video={true}
                    audio={true}
                />
            )}
            {!searchParams.video && (
                <>
                    <ChatMessages 
                            name={otherMember.profile.name}
                            member={currentMember}
                            chatId={conversation.id}
                            apiUrl="/api/direct-messages"
                            socketQuery={{
                                conversationId: conversation.id,
                            }}
                            socketUrl="/api/socket/direct-messages"
                            paramKey="conversationId"
                            paramValue={conversation.id}
                            type="conversation"
                    />
                    <div>
                        <ChatInput 
                            name={otherMember.profile.name}
                            type="conversation"
                            apiUrl="/api/socket/direct-messages"
                            query={{
                                conversationId: conversation.id,
                            }}
                        />
                    </div>
                </>
            )}
        </div>
     );
}
 
export default MeberIdPage;