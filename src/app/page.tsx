import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { AuthButtonServer } from "@/app/components/auth-button-server"
import { redirect } from "next/navigation"


export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, users(name, avatar_url, username)') //esto es un join que lo hace automaticamente supabase detectando que con el user id popula el resto del objeto que tiene ese id

  // como no permite crear triggers de tablas privadas en supabase ejecutamos este comando
  // create trigger on_auth_insert_users after insert on auth.users for each row execute function insert_user_in_public_table_for_new_user();  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthButtonServer />
      Hola Twitter 👋🏻
      <pre>
        {
          JSON.stringify(posts, null, 2)
        }
      </pre>
    </main>
  )
}


