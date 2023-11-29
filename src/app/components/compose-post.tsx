import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { Avatar } from "@nextui-org/react"
// import { revalidatePath } from "next/cache"


export function ComposePost({
    userAvatarUrl
}: {
    userAvatarUrl: string
}) {
    return (
        <form className="flex flex-row space-x-4 p-4">
            <Avatar radius='full' size='md' src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">
                <textarea name="post" rows={4} className="w-full text-xl bg-black placeholder-gray-500 p-2 resize-none bg-focus" placeholder='Que esta pasando!?'>
                </textarea>
                <button className="bg-sky-500 font-bold rounded-full px-5 py-2 self-end">
                    Postear
                </button>
            </div>
        </form>
    )
}