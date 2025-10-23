import { useState, type Dispatch, type SetStateAction } from "react";
import { deletePostAPI } from "../../services/post";
import PostCard from "../post/PostCard";
import Toast from "../../components/toast/Toast";
import Sure from "../../components/modal/Sure";

export default function UserPosts({
  posts,
  setPosts,
  onReportClick,
}: {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  onReportClick: (id: string) => void;
}) {
  const notify = (message: string, type: ToastType) => Toast({ message, type });
  const [confirmingUid, setConfirmingUid] = useState<string | null>(null);

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

  const handleDeleteRequest = (uid: string) => {
    setConfirmingUid(uid);
  };

  const handleConfirmYes = async () => {
    if (confirmingUid) {
      await deletePostHandler(confirmingUid);
      setConfirmingUid(null);
    }
  };

  const handleConfirmClose = () => {
    setConfirmingUid(null);
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        {posts &&
          posts.map((post) => (
            <PostCard
              key={post.uid}
              post={post}
              onDeleteClick={handleDeleteRequest}
              searchTerm={""}
              onReportClick={onReportClick}
            />
          ))}
        {confirmingUid && <Sure onYes={handleConfirmYes} onClose={handleConfirmClose} />}
      </div>
    </>
  );
}
