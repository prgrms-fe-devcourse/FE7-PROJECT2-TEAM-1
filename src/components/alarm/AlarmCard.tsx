import { useState } from "react";
import close from "../../assets/alarm/alarm_close.png";
import { deleteAlarmAPI } from "../../services/alarm";
import { useAlarmStore } from "../../stores/alarmStore";
import AlarmCardComment from "./alarmCardType/AlarmCardComment";
import AlarmCardReport from "./alarmCardType/AlarmCardReport";
import AlarmCardVote from "./alarmCardType/AlarmCardVote";
import PostAlarm from "../modal/PostAlarm";

export default function AlarmCard({ alarm }: { alarm: Alarm }) {
  const alarmStore = useAlarmStore();
  const [openPost, setOpenPost] = useState(false);
  const [postData, setPostData] = useState<Post | null>(null);

  const renderContent = () => {
    switch (alarm.type) {
      case "votes":
        // alarm reference_id는 무조건 vote
        return <AlarmCardVote alarm={alarm} setPostData={setPostData} openPost={openPost} />;
      case "comments":
        return <AlarmCardComment alarm={alarm} setPostData={setPostData} openPost={openPost} />;
      case "likes":
        return;
      case "reports":
        return <AlarmCardReport />;
    }
  };

  const deleteHandler = async () => {
    await deleteAlarmAPI(alarm.uid);
    alarmStore.setAlarms(alarmStore.alarms.filter((item) => item.uid !== alarm.uid));
  };

  return (
    <>
      <div
        className="relative w-[320px] min-h-[100px] bg-[rgba(218,218,218,0.33)] rounded-[12px] m-auto cursor-pointer transition-transform duration-300 hover:scale-101 hover:bg-[rgba(175,174,174,0.34)] active:scale-98 shadow-sm shadow-[#0A0A0A]"
        onClick={() => setOpenPost(true)}
      >
        <img
          className="absolute right-2 top-2 transition-transform duration-200 hover:scale-105"
          src={close}
          alt="alarm_close"
          onClick={deleteHandler}
        />
        {renderContent()}
        {openPost && postData && <PostAlarm setOpenPost={setOpenPost} post={postData} />}
      </div>
    </>
  );
}
