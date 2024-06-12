import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import NavigationAction from "./navigation-action";
import NavigationItem from "./navigation-item";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/mode-toggle";

import Bank from "@/components/bank";
import { MyProfile } from "../my-profile-button";
import { currentUser } from "@clerk/nextjs/server";

const NavigationSidebar = async () => {
    const profile = await currentProfile();
    const user = await currentUser();

    if(!profile) redirect("/");

    const servers = db.server.findMany({
        where: {
            members: {
                some:{
                    profileId: profile.id
                }
            }
        }
    });

    return ( 
    <div
        className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#E3E5E8] dark:bg-[#1E1F22] py-3"
    >
        {profile.accessLevel === "ADMIN" && (<>
            <NavigationAction />
            <Separator
            className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"
            >
            </Separator>
            <ScrollArea className="flex-1 w-full">
                {(await servers).map((server) => (
                    <div key={server.id} className="mb-4">
                        <NavigationItem
                            id={server.id}
                            name={server.name}
                            imageUrl={server.imageUrl}
                        />
                    </div>
                ))}
            </ScrollArea>
        </>)}
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
            <ModeToggle/>
            <MyProfile profileId={profile.id}/>
            <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: "h-[48px] w-[48px]"
                    }
                }}
            />
            <Bank
                profile={profile}
            />
        </div>
    </div> 
    )
}
 
export default NavigationSidebar;