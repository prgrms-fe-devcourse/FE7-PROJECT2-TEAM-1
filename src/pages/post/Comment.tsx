import { useEffect, useState } from "react";
import { getCommentsByPostId } from "../../api/postGet";

function formatRelativeTime(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString();
}

export default function Comment({ postUid }: { postUid: string }) {
  const [comments, setComments] = useState<CommentWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [profiles, setProfiles] = useState<Record<string, string>>({});

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
  }, [postUid]);

  if (loading) return <div className="text-[#FF8C00] px-4 py-2">불러오는 중…</div>;
  if (error) return <div className="text-red-500 px-4 py-2">{error}</div>;
  if (comments.length === 0)
    return <div className="text-[#999999] px-4 py-2">첫 댓글을 남겨보세요!</div>;

  return (
    <div className="space-y-3">
      {comments.map((c) => (
        <div key={c.uid} className="flex items-start w-full min-h-[60px] px-3 py-2">
          {/* 프로필 이미지 */}
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden border border-[#FF8C00]/40 mr-3">
            <img
              src={c.profiles?.profile_img ?? "/default-profile.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 오른쪽 텍스트 영역 */}
          <div className="flex flex-col justify-center flex-1">
            {/* username + 시간 */}
            <div className="flex items-center justify-between">
              <p className="text-white text-[14px] font-semibold">
                {c.profiles?.username ?? "익명"}
              </p>
              <span className="text-[#999999] text-[12px] ml-2 whitespace-nowrap">
                {formatRelativeTime(c.created_at)}
              </span>
            </div>

            {/* 댓글 내용 */}
            <p className="text-white text-[14px] mt-1">{c.comment_content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
