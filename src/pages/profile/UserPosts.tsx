import type { Dispatch, SetStateAction } from "react";
import { deletePostAPI } from "../../services/post";
import PostCard from "../post/PostCard";
import Toast from "../../components/toast/Toast";

export default function UserPosts({
  posts,
  setPosts,
}: {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
}) {
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const deletePostHandler = async (uid: string) => {
    try {
      const deleteData = await deletePostAPI(uid);
      console.log(deleteData);
      setPosts((prev) => prev.filter((item) => item.uid !== uid));
      notify("포스트가 삭제되었습니다.", "SUCCESS");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        {posts &&
          posts.map((post) => (
            <PostCard key={post.uid} post={post} deletePostHandler={deletePostHandler} />
          ))}
      </div>
    </>
  );
}
