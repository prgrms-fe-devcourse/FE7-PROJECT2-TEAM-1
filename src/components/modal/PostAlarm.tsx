import { createPortal } from "react-dom";
import PostCard from "../../pages/post/PostCard";
import { useCallback, useEffect, useState } from "react";
import { deletePostAPI } from "../../services/post";
import Toast from "../toast/Toast";
import { useAlarmStore } from "../../stores/alarmStore";
import Sure from "./Sure";
import PostsSkeleton from "../loading/PostsSkeleton";

export default function PostAlarm({
  setOpenPost,
  post,
  deleteHandler,
}: {
  setOpenPost: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post | null;
  deleteHandler: () => Promise<void>;
}) {
  const [opening, setOpening] = useState(true);
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const notify = (message: string, type: ToastType) => Toast({ message, type });
  const { setOpenModal } = useAlarmStore();
  const [confirmingUid, setConfirmingUid] = useState<string | null>(null);

  const deletePostHandler = async (uid: string) => {
    try {
      const deleteData = await deletePostAPI(uid);
      console.log(deleteData);
      setClosing(true);
      setTimeout(() => {
        setOpenPost(false);
      }, 350);
      await deleteHandler();
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

  useEffect(() => {
    setOpenModal(true);
    setLoading(true);
    const t = setTimeout(() => {
      setOpening(false);
    }, 10);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(t);
      setOpenModal(false);
    };
  }, []);

  const handleCloseAnimation = useCallback(
    (e: React.MouseEvent) => {
      e?.stopPropagation;
      if (closing) return;
      setClosing(true);
      setTimeout(() => {
        setOpenPost(false);
      }, 350);
    },
    [setOpenPost, closing],
  );

  const modal = (
    <div className="fixed inset-0 z-[1000] bg-[rgb(132_124_124_/_0.3)] flex justify-center items-center font-normal">
      <div
        className={`w-[1400px] scale-60 bg-black border-2 border-[#FF8C00] flex justify-center items-center rounded-[12px] shadow-[20px_20px_4px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out font-normal p-10 flex-col gap-10 ${closing ? "opacity-0 translate-y-10" : opening ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
      >
        {confirmingUid && <Sure onYes={handleConfirmYes} onClose={handleConfirmClose} />}
        {loading && (
          <div className="w-full overflow-y-auto">
            {" "}
            <PostsSkeleton />{" "}
          </div>
        )}
        {post && !loading && (
          <div className="w-full overflow-y-auto">
            <PostCard post={post} searchTerm={""} onDeleteClick={handleDeleteRequest} />
          </div>
        )}
        <div className="border border-[#FF8C00] w-[1150px] opacity-30"></div>
        <button
          className="hover:bg-[#FF8C00] hover:text-black cursor-pointer rounded-[5px] bg-[#AAAAAA] w-[150px] h-[50px] text-[25px] transition-all duration-250"
          onClick={handleCloseAnimation}
        >
          확인
        </button>
      </div>
    </div>
  );
  return createPortal(modal, document.body);
}
