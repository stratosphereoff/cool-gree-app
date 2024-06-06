import { auth } from "@clerk/nextjs/server";
import { Profile } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

import ProfilePlayerEquipment from "@/components/profile/profile-inventory";
import ProfilePlayerInfo from "@/components/profile/profile-player-info";
import { redirect } from "next/navigation";
import { getOrCreateConversation } from "@/lib/conversation";

interface ProfileIdPageProps {
  params: {
    memberId: string;
    serverId: string;
    profileId: string;
  };
}

const ProfileIdPage = async ({ params }: ProfileIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  const thisProfile = await db.profile.findFirst({
    where: {
      id: params.profileId,
    },
  });

  if (!thisProfile) {
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

  const thisMember = await db.member.findFirst({
    where: {
      profileId: thisProfile.id,
    },
  });

  if (!thisMember) {
    return redirect(`/servers/${params.serverId}`);
  }

  return (
    <div className="relative bg-white dark:bg-[#313338] flex flex-col h-full justify-center items-center gap-y-1">
      <ProfilePlayerInfo
        visitorId={profile.id}
        profile={thisProfile}
        serverId={currentMember.serverId}
        memberId={thisMember.id}
      />
      <ProfilePlayerEquipment />
    </div>
  );
};

export default ProfileIdPage;
