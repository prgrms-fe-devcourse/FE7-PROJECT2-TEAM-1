import { useNavigate } from "react-router";
import profileDefault from "../../assets/profile/profile_default.png";

type Profile = {
  email: string;
  profile_img: string | null;
  bio: string | null;
  created_at: string;
  username: string;
  handle: string;
};

export default function SearchUsers({ result }: { result: Profile }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${result.handle}`);
  };
  return (
    <>
      <div className="flex justify-center items-center mt-12">
        <div className="w-[1094px] h-[104px] flex items-center border-2 border-[rgb(255_140_0_/_0.3)] rounded-[12px]">
          <button className="cursor-pointer flex gap-7 ml-5" onClick={handleClick}>
            <div className="overflow-hidden border-2 border-[rgb(255_140_0)] rounded-[30px]">
              <img
                src={result.profile_img || profileDefault}
                alt="logo"
                className="w-[50px] h-[50px]"
              />
            </div>
            <p className="text-[16px] mt-3.5">{result.username}</p>
            <p className="text-[#FF8C00] text-[14px] px-1 mt-4.5">@{result.handle}</p>
          </button>
        </div>
      </div>
    </>
  );
}
