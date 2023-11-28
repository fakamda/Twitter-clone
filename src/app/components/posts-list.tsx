import PostCard from "./post-card"

export function PostLists({ posts }) {
    return (

        <>
            {
                posts?.map(post => {
                    const {
                        id,
                        user,
                        content
                    } = post

                    const {
                        user_name: userName,
                        name: userFullName,
                        avatar_url: avatarUrl,
                    } = user

                    return (
                        <PostCard
                            key={id}
                            content={content}
                            userName={userName}
                            userFullName={userFullName}
                            avatarUrl={avatarUrl}
                        />
                    )
                })
            }
        </>
    )
}