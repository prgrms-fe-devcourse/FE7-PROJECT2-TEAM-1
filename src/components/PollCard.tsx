import person_orange from "../assets/posts/person_orange.svg";
import { useEffect, useState } from "react";
import Toast from "./toast/Toast";

type PollCardProps = {
  left: { label: string; img: string; optionId: string };
  right: { label: string; img: string; optionId: string };
  initialCounts?: { left: number; right: number };
  initialSelected?: OptionKey | null;
  onVote: (choice: OptionKey) => Promise<void> | void;
};
export default function PollCard({
  left,
  right,
  initialCounts = { left: 0, right: 0 },
  initialSelected = null,
  onVote,
}: PollCardProps) {
  const [counts, setCounts] = useState(initialCounts);
  const [selected, setSelected] = useState<OptionKey | null>(initialSelected);

  useEffect(() => setCounts(initialCounts), [initialCounts]);
  useEffect(() => setSelected(initialSelected), [initialSelected]);

  const hasVoted = selected !== null;
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const vote = (key: OptionKey) => {
    if (hasVoted) {
      notify("이미 투표한 게시물입니다.", "INFO");
      return;
    }
    setSelected(key);
    setCounts((c) => ({ ...c, [key]: c[key] + 1 }));
    onVote(key);
  };

  const total = counts.left + counts.right || 1;
  const pctLeft = Math.round((counts.left / total) * 100);
  const pctRight = 100 - pctLeft;

  const { profile } = useAuthStore();

  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const Card = ({
    side,
    data,
    percent,
  }: {
    side: OptionKey;
    data: { label: string; img: string };
    percent: number;
  }) => (
    <button
      type="button"
      onClick={() => vote(side)}
      // disabled={hasVoted}
      className={[
        "relative w-[488px] h-[406px] overflow-hidden rounded-[12px] transition-all duration-300",

        !hasVoted
          ? "border-[1px] border-[#eacaa0] hover:border-[#FF8C00] cursor-pointer"
          : [
              "cursor-default",
              selected === side
                ? "scale-105 border-[#FF8C00] border-4"
                : "scale-90 border-[#eacaa0] border-[2px]",
            ].join(" "),
      ].join(" ")}
    >
      {data.img && (
        <img
          src={data.img}
          className={[
            "w-full h-full object-cover transition-transform duration-300",
            !hasVoted ? "hover:scale-105" : "",
          ].join(" ")}
          alt={data.label}
        />
      )}
      <div className="overlay-gradient pointer-events-none" />
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-[24px]">
        {data.label}
      </span>

      {hasVoted && (
        <span
          className={[
            "absolute top-3 right-3 rounded-full px-2 py-[2px] font-bold",
            side === selected
              ? "bg-[#FF8C00] text-black text-[20px]"
              : "bg-[#ffffff78] text-black/50 text-[14px] ",
          ].join(" ")}
        >
          {percent}%
        </span>
      )}
    </button>
  );

  const [wLeft, setWLeft] = useState(0);
  const [wRight, setWRight] = useState(0);
  useEffect(() => {
    if (!hasVoted) {
      setWLeft(0);
      setWRight(0);
      return;
    }
    const id = requestAnimationFrame(() => {
      setWLeft(pctLeft);
      setWRight(pctRight);
    });
    return () => cancelAnimationFrame(id);
  }, [hasVoted, pctLeft, pctRight]);
  return (
    <div className="space-y-[30px]">
      <div className="relative flex justify-between mx-[51px] gap-[28px]">
        <Card side="left" data={left} percent={pctLeft} />
        <Card side="right" data={right} percent={pctRight} />
      </div>

      {hasVoted && (
        <div className="mt-6 mx-[51px]">
          <div className="flex items-center justify-between text-[#FF8C00] text-[14px] mb-2">
            <span>RESULT</span>
            <span className="flex items-center">
              <img src={person_orange} className="mr-1" /> {total}
            </span>
          </div>
          <div className="relative w-full h-[16px] rounded-full bg-[#FF8C00]/20 overflow-hidden">
            <div
              className={[
                "absolute left-0 top-0 h-full rounded-full transition-[width] duration-1000 gaugeFill stripeRunRight",
                selected === "left" ? "bg-[#FF8C00]" : "bg-[#ffffff78]",
              ].join(" ")}
              style={{ width: `${wLeft}%` }}
            />
            <div
              className={[
                "absolute right-0 top-0 h-full rounded-full transition-[width] duration-1000 gaugeFill stripeRunLeft",
                selected === "right" ? "bg-[#FF8C00]" : "bg-[#ffffff78]",
              ].join(" ")}
              style={{ width: `${wRight}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[14px]">
            <span className={selected === "left" ? "text-white" : "text-[#999999]"}>
              {left.label} {counts.left}명
            </span>
            <span className={selected === "right" ? "text-white" : "text-[#999999]"}>
              {right.label} {counts.right}명
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
