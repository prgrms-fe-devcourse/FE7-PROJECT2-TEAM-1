import { Activity, useEffect, useRef, useState } from "react";
import profile_default from "../../assets/profile/profile_default.png";
import edit_img from "../../assets/profile/profile_edit.png";
import img_upload from "../../assets/profile/upload-button.png";
import check from "../../assets/profile/profile_check.png";
import close from "../../assets/profile/profile_close.png";
import { useAuthStore } from "../../stores/authStore";
import supabase from "../../utils/supabase";
import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import Toast from "../../components/toast/Toast";
import UserPosts from "./UserPosts";
import UserStats from "./UserStats";

export default function Profile() {
  const notify = (message: string, type: ToastType) => Toast({ message, type });

  const params = useParams();
  const navigate = useNavigate();
  const users = useAuthStore((state) => state.profile);
  const [profile, setProfile] = useState<Profile | null>(null);
  const hydrateFromAuth = useAuthStore((state) => state.hydrateFromAuth);
  const [newName, setNewName] = useState(profile?.username);
  const [newBio, setNewBio] = useState(profile?.bio);
  const [isEdit, setIsEdit] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const signout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = async () => {
    if (newName!.length < 2) {
      nameInputRef.current?.focus();
      notify("이름을 2글자 이상 적어주세요", "ERROR");
      return;
    }

    try {
      if (newName === profile?.username && newBio === profile?.bio && imagePreview === "") {
        return;
      }

      let url = null;

      if (imageFile) {
        const safeName = imageFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const sanitizedEmail = profile?.email.replace(/[@.]/g, "_");
        console.log(safeName);
        const { data, error } = await supabase.storage
          .from("hotpotato")
          .upload(`profile/${sanitizedEmail}/${safeName}`, imageFile, {
            upsert: true,
          });
        if (error) {
          console.error("Error uploading file:", error);
        } else {
          console.log("File uploaded successfully");
          url = supabase.storage.from("hotpotato").getPublicUrl(data.path).data.publicUrl;
        }
      }

      if (!url) url = profile?.profile_img;

      const { error } = await supabase
        .from("profiles")
        .update({ username: newName, bio: newBio, profile_img: url })
        .eq("email", profile?.email || "")
        .select()
        .single();

      if (error) throw error;
      notify("프로필이 수정되었습니다.", "SUCCESS");
      hydrateFromAuth();
      setProfile((prev) => ({ ...prev, username: newName, bio: newBio }) as Profile);
      setImagePreview("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsEdit((prev) => !prev);
      setImageFile(null);
    }
  };

  const cancelEditHandler = () => {
    setIsEdit((prev) => !prev);
    setNewBio(profile?.bio);
    setNewName(profile?.username);
    setImagePreview("");
    setImageFile(null);
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 첨부해주세요.");
      return;
    }

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setImageFile(file);
    }
  };
  useEffect(() => {
    async function handleParam() {
      if (params.userId) {
        try {
          const { data: profiles, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("handle", params.userId)
            .single();
          if (error) throw error;
          if (profiles) {
            setProfile(profiles);
          }
        } catch (error) {
          console.error(error);
        }
      } else if (users) {
        setProfile(users);
      }
    }
    handleParam();

    return () => {
      setProfile(null);
    };
  }, []);

  return (
    <>
      <main className="max-w-dvw min-h-dvh bg-black overflow-hidden pb-[50px]">
        <div className="flex flex-col items-center">
          <div className="relative w-[1098px] h-auto bg-[#0A0A0A] border-2 border-[#FF8C00] rounded-[12px] shadow-[0_1px_3px_#000000] m-auto mt-[33px] flex flex-col text-white">
            {isEdit && (
              <button
                className="absolute top-[20px] right-[90px] w-[31px] h-[31px] rounded-[6px] border-0 bg-[#FF8C00] flex items-center justify-center text-black hover:opacity-80 transition cursor-pointer"
                onClick={editHandler}
              >
                <img src={check} alt="edit_check" />
              </button>
            )}

            {!isEdit ? (
              <Activity
                mode={
                  !params.userId
                    ? "visible"
                    : params.userId === users?.handle
                      ? "visible"
                      : "hidden"
                }
              >
                <button
                  className="absolute top-[20px] right-[50px] w-[31px] h-[31px] rounded-[6px] border-0 bg-[#FF8C00] flex items-center justify-center text-black hover:opacity-80 transition cursor-pointer"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  <img src={edit_img} alt="edit_btn" />
                </button>
              </Activity>
            ) : (
              <button
                className="absolute top-[20px] right-[50px] w-[31px] h-[31px] rounded-[6px] border-2 border-[#842727] flex items-center justify-center text-[#FFFFFF] hover:opacity-80 transition cursor-pointer"
                onClick={cancelEditHandler}
              >
                <img src={close} alt="edit_close" />
              </button>
            )}

            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => imageChangeHandler(e)}
            />

            <div className="flex items-center gap-[20px] px-[40px] py-[30px] pb-[20px] mt-[35px]">
              <div className="relative w-[95px] h-[95px] rounded-full  border-2 border-[#EBBA7D] p-1.5 flex-shrink-0">
                {}
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : `${profile?.profile_img}?t=${Date.now()}` || profile_default
                  }
                  alt="profile_img"
                  className="w-full h-full object-cover rounded-full"
                />
                {isEdit && (
                  <button
                    className="absolute w-[31px] h-[31px] bottom-[5px] right-[-5px] rounded-full border-0 bg-[#EBBA7D] flex items-center justify-center text-black hover:opacity-80 transition cursor-pointer"
                    onClick={() => fileInputRef?.current?.click()}
                  >
                    <img src={img_upload} alt="img_upload" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-[10px] w-[890px]">
                <div>
                  {isEdit ? (
                    <>
                      <input
                        type="text"
                        className="w-full h-[36px] bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] px-3 
                  focus:outline-none mb-[10px]
                  "
                        ref={nameInputRef}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      <p className="text-[28px] font-bold">{profile?.username}</p>
                    </>
                  )}

                  <p className="text-[14px] text-[#999999]">@{profile?.handle}</p>
                </div>

                {isEdit ? (
                  <>
                    <textarea
                      className="w-full min-h-[112px] bg-[#0A0A0A] border border-[#FF8C00] rounded-[6px] text-white placeholder-[#999999] placeholder:font-bold shadow-[0_1px_2px_rgba(0,0,0,0.25)] p-1 px-3 
                  focus:outline-none font-normal overflow-hidden 
                  "
                      value={newBio || ""}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) setNewBio(e.target.value);
                      }}
                    />
                    <span className="text-right  text-[14px] font-normal">
                      {newBio?.length}/200
                    </span>
                  </>
                ) : (
                  <>
                    <p className="text-[16px] text-[#CFCFCF] font-normal break-words whitespace-pre">
                      {profile?.bio?.trim() || `간단한 한마디 끄적`}
                    </p>
                  </>
                )}

                <p className="text-[14px] text-[#AAAAAA]">
                  📅{" "}
                  {profile && format(new Date(profile.created_at || ""), "yyyy년 MM월 dd일 가입")}
                </p>
              </div>
            </div>

            <UserStats profile={profile} />
          </div>
          <Activity
            mode={
              !params.userId ? "visible" : params.userId === users?.handle ? "visible" : "hidden"
            }
          >
            <button onClick={signout}>로그아웃</button>
          </Activity>
          <div className="w-[1098px] h-auto text-left text-[24px] mt-[60px] mb-[5px]">
            작성한 게시글
          </div>
          <Activity mode={profile ? "visible" : "hidden"}>
            <UserPosts profile={profile} />
          </Activity>
        </div>
      </main>
    </>
  );
}
