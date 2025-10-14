import { useRef, useState } from "react";
import profile_default from "../../assets/profile/profile_default.png";
import { useAuthStore } from "../../stores/authStore";
import supabase from "../../utils/supabase";
import { useNavigate } from "react-router";
import { format } from "date-fns";

export default function Profile() {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  const hydrateFromAuth = useAuthStore((state) => state.hydrateFromAuth);
  const [newName, setNewName] = useState(profile?.username);
  const [newBio, setNewBio] = useState(profile?.bio);
  const [isEdit, setIsEdit] = useState(false);

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
    try {
      if (newName === profile?.username && newBio === profile?.bio && imagePreview === "") {
        return;
      }

      if (newName!.length < 2) {
        // 2글자 처리
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
      console.log("업데이트 성공");
      hydrateFromAuth();
    } catch (error) {
      console.error(error);
    } finally {
      setIsEdit((prev) => !prev);
      // setNewBio(profile?.bio);
      setNewName(profile?.username);
      setImagePreview("");
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

  return (
    <>
      <main className="max-w-dvw min-h-dvh bg-black overflow-hidden">
        <div className="relative w-[1098px] h-auto bg-[#0A0A0A] border-2 border-[#FF8C00] rounded-[12px] shadow-[0_1px_3px_#000000] m-auto mt-[33px] flex flex-col text-white">
          {isEdit && (
            <button
              className="absolute top-[20px] right-[90px] w-[31px] h-[31px] rounded-[6px] border-0 bg-[#FF8C00] flex items-center justify-center text-black hover:opacity-80 transition cursor-pointer"
              onClick={editHandler}
            ></button>
          )}

          {!isEdit ? (
            <button
              className="absolute top-[20px] right-[50px] w-[31px] h-[31px] rounded-[6px] border-0 bg-[#FF8C00] flex items-center justify-center text-black hover:opacity-80 transition cursor-pointer"
              onClick={() => setIsEdit((prev) => !prev)}
            ></button>
          ) : (
            <button
              className="absolute top-[20px] right-[50px] w-[31px] h-[31px] rounded-[6px] border-2 border-[#842727] flex items-center justify-center text-[#FFFFFF] hover:opacity-80 transition cursor-pointer"
              onClick={cancelEditHandler}
            >
              X
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
                // src={profile?.profile_img || profile_default}
                src={imagePreview ? imagePreview : profile?.profile_img || profile_default}
                alt="profile_img"
                className="w-full h-full object-cover rounded-full"
              />
              {isEdit && (
                <button
                  className="absolute w-[31px] h-[31px] bottom-[5px] right-[-5px] rounded-full border-0 bg-[#EBBA7D] flex items-center justify-center text-black hover:opacity-80 transition cursor-pointer"
                  onClick={() => fileInputRef?.current?.click()}
                ></button>
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
                  <span className="text-right  text-[14px] font-normal">{newBio?.length}/200</span>
                </>
              ) : (
                <>
                  <p className="text-[16px] text-[#CFCFCF] font-normal break-words">
                    {profile?.bio?.trim() || `간단한 한마디 끄적`}
                  </p>
                </>
              )}

              <p className="text-[14px] text-[#AAAAAA]">
                📅 {profile && format(new Date(profile.created_at || ""), "yyyy년 MM월 dd일 가입")}
              </p>
            </div>
          </div>

          <div className="w-[996px] border-t border-[#FF8C00] m-auto mt-[30px] mb-[10px] flex justify-center gap-[220px] py-[20px]">
            <div className="flex flex-col items-center">
              <p className="text-[#FF8C00] text-[24px] font-bold">0</p>
              <p className="text-[14px] text-[#CFCFCF]">게시물</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#FF8C00] text-[24px] font-bold">0</p>
              <p className="text-[14px] text-[#CFCFCF]">받은 투표</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-[#FF8C00] text-[24px] font-bold">0</p>
              <p className="text-[14px] text-[#CFCFCF]">받은 좋아요</p>
            </div>
          </div>
        </div>
        <button onClick={signout}>로그아웃</button>
      </main>
    </>
  );
}
