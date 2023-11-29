'use server' //indica que este metodo solo se ejecuta en el servidor

import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"

export const addPost = async (formData: FormData) => {

    const content = formData.get('content')

    if (content === null) return

    const supabase = createServerActionClient({ cookies })
    // revisa si el usuario realmente esta auth
    const { data: { user } } = await supabase.auth.getUser()
    if (user === null) return

    await supabase.from('posts').insert({ content, user_id: user.id })

    revalidatePath('/') //revalida la ruta y next.js le da un mensaje a la route para que ejecute de nuevo todo y vuelve a renderizar, en el cliente solo lo que tiene cambio se modifica
}