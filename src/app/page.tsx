import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from '@/app/components/auth-button-server'
import { redirect } from 'next/navigation'
import { PostLists } from './components/posts-list'
import { type Database } from './types/database'
import { ComposePost } from './components/compose-post'
import { type Post } from './types/posts'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(name, avatar_url, user_name)') //esto es un join que lo hace automaticamente supabase detectando que con el user id popula el resto del objeto que tiene ese id
    .order('created_at', { ascending: false })
  //para renombrar el nombre tambien se puede usar 2 puntos
  // como no permite crear triggers de tablas privadas en supabase ejecutamos este comando
  // create trigger on_auth_insert_users after insert on auth.users for each row execute function insert_user_in_public_table_for_new_user();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between'>
      <section className='max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen'>
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <PostLists posts={posts as Post[]} />
        <AuthButtonServer />
      </section>
    </main>
  )
}
