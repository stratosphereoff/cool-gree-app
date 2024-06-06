import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
    req: Request,
    { params }: { params: { profileId: string, profileGold : number } }
){
    try{ 
        if(!params.profileId) {
            return new NextResponse("Profile ID missing", { status: 400 });
        }

        const { profileGold } = await req.json();
        let goldIncrement = profileGold + 1;

        const profile = await db.profile.update({
            where: {
                id: params.profileId,
            },
            data: {
                gold: goldIncrement,
            }
        });

        return NextResponse.json(profile);
    } catch(error){
        console.log("[PROFILE_ID_PATCH]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}