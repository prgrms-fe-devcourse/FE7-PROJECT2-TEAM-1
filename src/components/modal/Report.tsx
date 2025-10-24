import yellowWaring from "../../assets/report/yellowWarning.svg";
import redLight from "../../assets/report/redLight.svg";
import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authStore";
import Toast from "../toast/Toast";
import Button from "../common/Button";

export default function Report({
  id,
  type,
  setOpenReportModal,
}: {
  id: string;
  type: "post" | "comment";
  setOpenReportModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [reportText, setReportText] = useState("");
  const [opening, setOpening] = useState(true);
  const [closing, setClosing] = useState(false);
  const profile = useAuthStore((state) => state.profile);

  const notify = (message: string, type: ToastType) => Toast({ message, type });

  useEffect(() => {
    const t = setTimeout(() => {
      setOpening(false);
    }, 10);
    return () => clearTimeout(t);
  }, []);

  const handleCloseAnimation = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setOpenReportModal(false);
      setClosing(false);
      setOpening(true);
    }, 350);
  }, [setOpenReportModal, closing]);

  const handleCompleted = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!profile) {
      notify("로그인 정보가 없습니다", "ERROR");
      return;
    }

    if (!reportText.trim()) {
      notify("신고 사유를 입력해주세요", "INFO");
      return;
    }

    const insertData =
      type === "post"
        ? { user_id: profile?.uid, post_id: id, comment_id: null, reason: reportText }
        : { user_id: profile?.uid, post_id: null, comment_id: id, reason: reportText };

    try {
      const { data, error } = await supabase.from("reports").insert([insertData]).select().single();
      if (error) throw error;

      const table = type === "post" ? "posts" : "comments";
      try {
        const { data: target, error: selErr } = await supabase
          .from(table)
          .select("report_count, is_visible")
          .eq("uid", id)
          .maybeSingle();
        if (selErr) throw selErr;
        const count: number = (target as any)?.report_count ?? 0;
        const visible: boolean | null | undefined = (target as any)?.is_visible;
        if (count >= 5 && visible != false) {
          await supabase.from(table).update({ is_visible: false }).eq("uid", id);
        }
      } catch (inner) {
        console.error("신고 후 is_visible 갱신 실패:", inner);
      }

      setReportText("");
      handleCloseAnimation();
      notify("신고가 정상적으로 접수되었습니다.", "SUCCESS");
      console.log(data);
    } catch (error) {
      const err = error as { code: string; message: string };
      if (err.code === "23505") {
        // as 키워드로 타입 단언 해주기(에러 생기면)
        notify("중복된 신고입니다", "ERROR");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] bg-[rgb(132_124_124_/_0.3)] flex justify-center items-center font-normal">
        <div
          className={`bg-black text-white border-2 border-[#FF8C00] w-[470px] h-[470px] flex flex-col items-center rounded-[12px] shadow-[20px_20px_4px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out 
            ${closing ? "opacity-0 translate-y-10" : opening ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}
        >
          <div className="flex flex-row mt-6">
            <img src={redLight} alt="redLight" />
            <p className="text-[20px]">신고하기</p>
            <img src={redLight} alt="redLight" />
          </div>

          <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
            <p className="text-[14px] mt-7 mb-1">사유</p>
            <div className="relative">
              <textarea
                className="text-black rounded-[10px] bg-white outline-none focus:border-2 focus:border-[#FF8C00] w-[400px] h-[200px] resize-none"
                value={reportText}
                onChange={(e) => {
                  if (e.target.value.length <= 150) setReportText(e.target.value);
                }}
              />
              <span className="absolute bottom-2 right-4 font-normal text-[#AAAAAA] text-[14px]">
                {reportText.length}/150
              </span>
            </div>

            <div className="flex flex-row  mt-3">
              <img src={yellowWaring} alt="yellowWaring" />
              <p className="pl-1 text-[12px]">
                무분별한 신고는 커뮤니티 이용에 제제를 받을 수 있습니다.
              </p>
            </div>
            <div className="flex justify-between mt-10 mr-13 ml-13">
              <Button
                variant="plain"
                type="submit"
                className="hover:bg-[#FF8C00] hover:text-black cursor-pointer rounded-[5px] bg-[#AAAAAA] w-[100px] h-[34px]"
                onClick={handleCompleted}
              >
                완료
              </Button>
              <Button
                type="button"
                className="hover:bg-[#FF8C00] hover:text-black cursor-pointer rounded-[5px] bg-[#AAAAAA] w-[100px] h-[34px]"
                onClick={() => {
                  setReportText("");
                  handleCloseAnimation();
                }}
              >
                취소
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
