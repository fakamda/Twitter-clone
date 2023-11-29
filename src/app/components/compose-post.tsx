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
    const addPost = async (formData: FormData) => {
        'use server' //indica que este metodo solo se ejecuta en el servidor
        console.log('holamundo')
    }
    return (
        <form action={addPost} className="flex flex-row p-4 border-b border-white/20">
            <Avatar radius='full' size='md' src={userAvatarUrl} />
            <div className="flex flex-1 flex-col gap-y-4">
                <textarea name="post" rows={3} className="w-full text-xl bg-black placeholder-gray-500 p-2 resize-none focus:outline-none" placeholder='Que esta pasando!?'>
                </textarea>
                <button type="submit" className="bg-sky-500 font-bold rounded-full px-5 py-2 self-end">
                    Postear
                </button>
            </div>
        </form>
    )
}