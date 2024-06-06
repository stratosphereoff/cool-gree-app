"use client"

import { User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MyProfileProps {
  profileId: string;
}

export function MyProfile({ profileId }: MyProfileProps) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/profiles/${profileId}`);
  }

  return (
        <Button 
          onClick={onClick}
          className="bg-transparent border-0" variant="outline" size="icon"
        >
          <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <span className="sr-only">My Profile</span>
        </Button>

  )
}
