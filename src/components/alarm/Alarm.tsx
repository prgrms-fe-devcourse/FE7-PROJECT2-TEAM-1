import AlarmCard from "./AlarmCard";
import { useAlarmStore } from "../../stores/alarmStore";
import { Activity } from "react";

export default function Alarm() {
  const { alarms, isOpen } = useAlarmStore((state) => state);

  if (!isOpen) return null;

  return (
    <>
      <div className="absolute top-8 right-1 w-[350px] min-h-[500px] max-h-[500px] border-1 border-[#ffffff30] rounded-[10px] mt-3 shadow-lg shadow-[#0A0A0A] overflow-x-hidden overflow-y-auto transition-all duration-200 z-50 backdrop-blur-lg">
        <Activity mode={alarms.length ? "hidden" : "visible"}>
          <div className="sticky top-18 min-h-[70px] text-[16px] text-[#efefef] font-normal flex items-center justify-center text-center z-10 backdrop-blur-sm">
            받은 알람이 없습니다.
          </div>
        </Activity>
        <div className="flex flex-col items-center gap-[9px] mt-7">
          {alarms && alarms.map((alarm) => <AlarmCard key={alarm.uid} alarm={alarm} />)}
        </div>
      </div>
    </>
  );
}
