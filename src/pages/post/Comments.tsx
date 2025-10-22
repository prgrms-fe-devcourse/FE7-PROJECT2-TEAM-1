import { Activity, useEffect, useState } from "react";
import { getCommentsByPostId } from "../../api/postGet";
import { deleteComment } from "../../api/postActions";
import Toast from "../../components/toast/Toast";
import Comment from "./Comment";

export default function Comments({ postUid, refresh }: { postUid: string; refresh: number }) {
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const PAGE_SIZE = 10;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setComments(await getCommentsByPostId(postUid));
      } catch (err) {
        console.error("댓글 불러오기 실패:", err);
        setError("댓글을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [postUid, refresh]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(comments.length / PAGE_SIZE));
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [comments.length]);
  const deleteCommentHandler = async (uid: string) => {
    try {
      const deleteData = await deleteComment(uid);
      console.log(deleteData);
      setComments((prev) => prev.filter((item) => item.uid !== uid));
      setPage(1);
      notify("댓글이 삭제되었습니다.", "SUCCESS");
    } catch (error) {
      console.error(error);
    }
  };

  const pagedComments = () => {
    const start = (page - 1) * PAGE_SIZE;
    return comments.slice(start, start + PAGE_SIZE);
  };

  const totalPages = Math.ceil(comments.length / PAGE_SIZE);
  const hasPagination = totalPages > 1 ? "visible" : "hidden";

  if (loading) return <div className="text-[#FF8C00] px-4 py-2">불러오는 중…</div>;
  if (error) return <div className="text-red-500 px-4 py-2">{error}</div>;
  if (comments.length === 0)
    return <div className="text-[#999999] px-4 py-2">첫 댓글을 남겨보세요!</div>;

  return (
    <div className="space-y-3 w-full">
      {comments &&
        pagedComments().map((c) => (
          <Comment key={c.uid} comment={c} deleteCommentHandler={deleteCommentHandler} />
        ))}

      <Activity mode={hasPagination}>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === page ? "page" : undefined}
              className={`min-w-[32px] h-[32px] px-2 rounded-md text-[14px] border border-[#ffffff30] hover:bg-[#0A0A0A] ${
                n === page ? "bg-[#FF8C00] text-black border-[#FF8C00]" : "text-white"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </Activity>
    </div>
  );
}
