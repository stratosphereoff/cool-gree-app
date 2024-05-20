"use client"

import { ServerWithMembersWithProfiles } from "@/types"
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";

interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles;
    role?: MemberRole;
}

const ServerHeader = ({
    server,
    role
}: ServerHeaderProps) => {
    const isGM = role === MemberRole.GAMEMASTER;
    const isPL = isGM || role === MemberRole.PARTYLEADER;

    return ( 
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="focus:outline-none"
                    asChild
                >
                    <button
                        className="w-full text-md font-semibold px-3 flex items-center h-12 
                        border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
                    >
                        {server.name}
                        <ChevronDown className="h-5 w-5 ml-auto"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2x]"
                >
                {isPL && (
                    <DropdownMenuItem
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        Invite People
                        <UserPlus className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isGM && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        Server Settings
                        <Settings className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isGM && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer"
                    >
                        MenageMembers
                        <Users className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isPL && (
                    <DropdownMenuItem
                        className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
                    >
                        Create Channel
                        <PlusCircle className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {isPL && (
                    <DropdownMenuSeparator/>
                )}
                {isGM && (
                    <DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Delete Server 
                        <Trash className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                {!isGM && (
                    <DropdownMenuItem
                        className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
                    >
                        Leave Server 
                        <LogOut className="h-4 w-4 ml-auto"/>
                    </DropdownMenuItem>
                )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
     );
}
 
export default ServerHeader;