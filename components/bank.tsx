"use client";

import { Loader2, Wallet } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Member, Message, Profile } from "@prisma/client";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfilePageProps {
    profile: Profile;
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

const Bank = ({
    profile
}: ProfilePageProps) => {
    const router = useRouter();
    const [loadingId,setLoadingId]  = useState("");

    const profileId = profile?.id;
    let profileGold = profile?.gold;

    const onClick = async () => {
        try {
            setLoadingId(profileId);

            const url = qs.stringifyUrl({
                url: `/api/profiles/${profile.id}`,
            });

            const response = await axios.patch(url, { profileId, profileGold });
            const { gold } = await response.data;
            profile.gold = gold;
            router.refresh();
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingId("");
        }
    }

    return ( 
    <div>
        <Popover>
          <PopoverTrigger>
            <div
                onClick={() => {}} 
                className="group flex items-center"
            >
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px]
                group-hover:rounded-[16px] transition-all overflow-hidden 
                items-center justify-center bg-background dark:bg-netural-700 group-hover:bg-zinc-500">
                    <Wallet
                        className="group-hover:text-white transition text-zinc-500"
                        size={25}
                    />
                </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="flex flex-row justify-center items-center">
          {!loadingId && (<div> 
                <p className="text-sm font-semibold text-zinc-600">
                    Gold: {profile?.gold} Silver: {profile?.silver} Cooper: {profile?.cooper}
                </p>
                {/* TEST <button 
                    onClick={onClick}
                    className="text-zinc-200"
                >
                    Get gold
                </button> */}
            </div>)}
            {loadingId && (<div>
                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"/>
            </div>)}
          </PopoverContent>
        </Popover>
    </div> 
    );
}

export default Bank;