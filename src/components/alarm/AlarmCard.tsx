import close from "../../assets/alarm/alarm_close.png";
import { deleteAlarmAPI } from "../../services/alarm";
import { useAlarmStore } from "../../stores/alarmStore";
import AlarmCardComment from "./alarmCardType/AlarmCardComment";
import AlarmCardReport from "./alarmCardType/AlarmCardReport";
import AlarmCardVote from "./alarmCardType/AlarmCardVote";

export default function AlarmCard({ alarm }: { alarm: Alarm }) {
  const alarmStore = useAlarmStore();

  const renderContent = () => {
    switch (alarm.type) {
      case "vote":
        // alarm reference_id는 무조건 vote
        return <AlarmCardVote alarm={alarm} />;
      case "comment":
        return <AlarmCardComment />;
      case "like":
        return;
      case "report":
        return <AlarmCardReport />;
    }
  };

  const deleteHandler = async () => {
    await deleteAlarmAPI(alarm.uid);
    alarmStore.setAlarms(alarmStore.alarms.filter((item) => item.uid !== alarm.uid));
  };

  return (
    <>
      <div className="relative w-[320px] min-h-[100px] bg-[rgba(218,218,218,0.33)] rounded-[12px] m-auto cursor-pointer transition-transform duration-300 hover:scale-101 hover:bg-[rgba(175,174,174,0.34)] active:scale-98 shadow-sm shadow-[#0A0A0A]">
        <img
          className="absolute right-2 top-2 transition-transform duration-200 hover:scale-105"
          src={close}
          alt="alarm_close"
          onClick={deleteHandler}
        />
        {renderContent()}
      </div>
    </>
  );
}
