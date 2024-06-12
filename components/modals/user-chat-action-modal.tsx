"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import qs from "query-string"

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { useModal } from "@/components/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Profile } from "@prisma/client";
import { useRouter } from "next/navigation";

export const UserChatActionModal = () =>{
    const { isOpen, onClose, type, data} = useModal();
    const { currentMemberProfile, profile } = data as {currentMemberProfile: Profile, profile: Profile};
    const router = useRouter();

    const isModalOpen = isOpen && type === "userChatAction";

    const [canTransfer,setCanTransfer] = useState(false);

    const currentMemberProfileGold = currentMemberProfile?.gold;

    useEffect(() => {
        (currentMemberProfileGold < 1) ? setCanTransfer(true) : setCanTransfer(false);
      }, [currentMemberProfileGold]);

    const transferGold = async () => {
        takeGold();
        giveGold();
        router.refresh();
        onClose();
    }

    const takeGold = async () => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/profiles/${currentMemberProfile?.id}`,
            });

            let profileGold = currentMemberProfile.gold - 1;
            let profileId = currentMemberProfile.id;

            await axios.patch(url, { profileId, profileGold });
        } catch (error) {
            console.log(error);
        }
    }

    const giveGold = async () => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/profiles/${profile?.id}`,
            });

            let profileGold = profile.gold + 1;
            let profileId = profile.id;

            await axios.patch(url, { profileId, profileGold });
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent 
            className="
            bg-white
            text-black
            p-0
            overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Give 1 <span className="text-yellow-600">Gold</span> to {profile?.name}
                    </DialogTitle>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            onClick={handleClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={canTransfer}
                            onClick={transferGold}
                            variant="primary"
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

