"use client"

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";

import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form"

import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useModal } from "@/components/hooks/use-modal-store";
import EmojiPicker from "@/components/emoji-picker";
import { cn } from "@/lib/utils";
import { Profile } from "@prisma/client";

interface ChatInputProps {
    apiUrl: string;
    query: Record<string, any>;
    otherMemberProfile: Profile | null;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1),
});

const ChatInput = ({
    apiUrl,
    query,
    otherMemberProfile,
    name,
    type
}: ChatInputProps) => {
    const { onOpen } = useModal();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const giveGold = async (otherProfileId : string, otherProfileGold : number) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/profiles/${otherProfileId}`,
            });

            let profileGold = otherProfileGold;

            const response = await axios.patch(url, { otherProfileId, profileGold });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            if(type === "conversation" && values.content === "!gold"){
                if(!otherMemberProfile) return;

                const otherProfileId = otherMemberProfile.id;
                let otherProfileGold = otherMemberProfile.gold;
                giveGold(otherProfileId, otherProfileGold);
                
                form.reset();
                router.refresh();
                return;
            }

            await axios.post(url, values);

            form.reset();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField 
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button 
                                        type="button"
                                        onClick={() => onOpen("messageFile", { apiUrl, query})}
                                        className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 
                                        hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 
                                        flex items-center justify-center"
                                    >
                                        <Plus className="text-white dark:text-[#313338]" />
                                    </button>
                                        <Input
                                            disabled={isLoading}
                                            className={cn(
                                                "px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200",
                                                field.value[0] === "!" && "px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-emerald-500 dark:text-emerald-400"
                                            )}
                                            placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                                            {...field}
                                        />
                                    <div className="absolute top-7 right-8">
                                        <EmojiPicker 
                                            onChange={(emoji: string) => field.onChange(`${field.value} ${emoji}`)}
                                        />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
 
export default ChatInput;