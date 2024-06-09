import { InitailModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if(server) {
        return redirect(`/servers/${server.id}`)
    }

    if(!server) {
        return redirect("/invite/d3508834-24d0-499c-8450-1c40a827d2d1");
    }

    //SHOULD NEVER HAPPEN
    return <InitailModal />;
}
 
export default SetupPage;