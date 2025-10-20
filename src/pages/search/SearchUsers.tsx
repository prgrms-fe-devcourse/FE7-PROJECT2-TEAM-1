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

export default function SearchUsers({
  result,
  searchTerm,
}: {
  result: Profile;
  searchTerm: string;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${result.handle}`);
  };
  const handleParts = result.handle.split(new RegExp(`(${searchTerm})`, "gi"));
  const usernameParts = result.username.split(new RegExp(`(${searchTerm})`, "gi"));
  return (
    <>
      <div className=" flex justify-center items-center mt-7">
        <div
          className="w-[1094px] h-[104px] flex items-center border-2 border-[rgb(255_140_0_/_0.3)] rounded-[12px] hover:scale-101  transition-all duration-200  cursor-pointer"
          onClick={handleClick}
        >
          <button className="cursor-pointer flex gap-7 ml-5">
            <div className="overflow-hidden border-2 border-[rgb(255_140_0)] rounded-[30px]">
              <img
                src={result.profile_img || profileDefault}
                alt="logo"
                className="w-[50px] h-[50px]"
              />
            </div>
            <p className="text-[16px] mt-3.5">
              {usernameParts.map((part, index) =>
                part.toLowerCase() === searchTerm.toLowerCase() ? (
                  <span key={index} className="text-[#FF8C00] ">
                    {part}
                  </span>
                ) : (
                  <span key={index} className="text-[#ffffff]">
                    {part}
                  </span>
                ),
              )}
            </p>
            <p className="text-[#999999] text-[14px] px-1 mt-4.5">
              @
              {handleParts.map((part, index) =>
                part.toLowerCase() === searchTerm.toLowerCase() ? (
                  <span key={index} className="text-[#FF8C00]">
                    {part}
                  </span>
                ) : (
                  <span key={index} className="text-[#999999]">
                    {part}
                  </span>
                ),
              )}
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
