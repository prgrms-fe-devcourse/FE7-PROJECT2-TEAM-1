import PostCard from "../post/PostCard";

export default function UserPosts({ posts }: { posts: Post[] | null }) {

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        {posts?.map((post) => (
          <PostCard key={post.uid} post={post} />
        ))}
      </div>
    </>
  );
}
