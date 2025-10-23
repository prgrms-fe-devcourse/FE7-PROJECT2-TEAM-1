import { Activity, useEffect, useState } from "react";
import supabase from "../../utils/supabase";

export default function Badge({ post_id, user_id }: { post_id: string; user_id: string }) {
  const [label, setLabel] = useState<string>("");
  const [isSame, setIsSame] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const { data: commenterVote, error: cvErr } = await supabase
          .from("votes")
          .select("option_id")
          .eq("post_id", post_id)
          .eq("user_id", user_id)
          .maybeSingle();
        if (cvErr) throw cvErr;
        const commenterOptionId = commenterVote?.option_id;

        const {
          data: { user },
          error: authErr,
        } = await supabase.auth.getUser();
        if (authErr) throw authErr;

        let viewerOptionId = null;
        if (user?.id) {
          const { data: viewerVote, error: vvErr } = await supabase
            .from("votes")
            .select("option_id")
            .eq("post_id", post_id)
            .eq("user_id", user.id)
            .maybeSingle();
          if (vvErr) throw vvErr;
          viewerOptionId = viewerVote?.option_id;
        }

        let optionTitle = "";
        if (commenterOptionId) {
          const { data: opt, error: optErr } = await supabase
            .from("options")
            .select("option_title")
            .eq("uid", commenterOptionId)
            .single();
          if (optErr) throw optErr;
          optionTitle = opt?.option_title;
        }

        setLabel(optionTitle);
        setIsSame(viewerOptionId === commenterOptionId);
      } catch (e) {
        console.error("Badge load error:", e);
        setLabel("옵션");
        setIsSame(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [post_id, user_id]);

  const baseClass =
    "relative  inline-flex items-center justify-center select-none leading-none px-3 py-2 border-2 border-black  before:absolute before:inset-0 before:content-[''] before:-m-[3px] before:border-[3px] before:border-black before:rounded-none";
  if (loading) {
    return null;
  }
  if (!label) return null;

  const activeClass = "bg-[#FF8C00] text-black";
  const inactiveClass = "bg-[#ffdea1] text-black/60";
  const colorClass = isSame ? activeClass : inactiveClass;

  return (
    <span
      style={{
        boxShadow: "inset 0 0 4px rgba(0,0,0,1)",
        backgroundImage: "linear-gradient(45deg, #310c61 0.01px, transparent 1px)",
        backgroundSize: "6px 6px",
      }}
      className={`${baseClass} ${colorClass}`}
    >
      <Activity mode={label ? "visible" : "hidden"}>
        <span className="relative z-[1]">{label}</span>

        {/* 좌상 */}
        <span className="absolute top-[0px] left-[0px] w-[4px] h-[4px] bg-black"></span>
        <span className="absolute top-[4px] left-[0px] w-[2px] h-[2px] bg-black"></span>
        <span className="absolute top-[0px] left-[4px] w-[2px] h-[2px] bg-black"></span>

        {/* 우상 */}
        <span className="absolute top-[0px] right-[0px] w-[4px] h-[4px] bg-black"></span>
        <span className="absolute top-[4px] right-[0px] w-[2px] h-[2px] bg-black"></span>
        <span className="absolute top-[0px] right-[4px] w-[2px] h-[2px] bg-black"></span>

        {/* 좌하 */}
        <span className="absolute bottom-[0px] left-[0px] w-[4px] h-[4px] bg-black"></span>
        <span className="absolute bottom-[4px] left-[0px] w-[2px] h-[2px] bg-black"></span>
        <span className="absolute bottom-[0px] left-[4px] w-[2px] h-[2px] bg-black"></span>

        {/* 우하 */}
        <span className="absolute bottom-[0px] right-[0px] w-[4px] h-[4px] bg-black"></span>
        <span className="absolute bottom-[4px] right-[0px] w-[2px] h-[2px] bg-black"></span>
        <span className="absolute bottom-[0px] right-[4px] w-[2px] h-[2px] bg-black"></span>

        {/* 광택 */}
        <span className="absolute top-[4px] right-[10px] w-[8px] h-[2px] bg-white/70"></span>
        <span className="absolute top-[6px] right-[8px] w-[4px] h-[2px] bg-white/70"></span>
        <span className="absolute top-[6px] right-[6px] w-[3px] h-[4px] bg-white/70"></span>
        <span className="absolute bottom-[4px] left-[10px] w-[8px] h-[2px] bg-white/70"></span>
        <span className="absolute bottom-[6px] left-[8px] w-[4px] h-[2px] bg-white/70"></span>
        <span className="absolute bottom-[6px] left-[6px] w-[3px] h-[4px] bg-white/70"></span>
      </Activity>
    </span>
  );
}
