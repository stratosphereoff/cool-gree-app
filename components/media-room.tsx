"use client";

import { useEffect, useState } from 'react';

import {
    LiveKitRoom,
    VideoConference,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { Channel } from "@prisma/client"

interface MediaRoomProps {
    chatId: string;
    video: boolean;
    audio: boolean;
};

export const MediaRoom = ({
    chatId,
    video,
    audio
}: MediaRoomProps) => {
    const { user } = useUser();
    const [token,setToken] = useState("");

    useEffect(()=> {
        const name = `${user?.firstName} ${user?.lastName}`;

        (async () => {
            try {
                const resp = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
                console.log(resp);
                const data = await resp.json();
                setToken(data.token);
              } catch (e) {
                console.error(e);
                console.log("AAA");
              }
        })()
    }, [user?.firstName, user?.lastName, chatId]);

    if (token === "") {
        return (
        <div className='flex flex-col flex-1 justify-center items-center'>
            <Loader2 
                className='h-7 w-7 animate-spin text-zinc-500 my-4'
            />
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                Getting token...
            </p>
        </div>
        )
    }

    return (
        <LiveKitRoom
          video={video}
          audio={audio}
          token={token}
          connect={true}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
          data-lk-theme="default"
        >
          <VideoConference />
        </LiveKitRoom>
      );
}