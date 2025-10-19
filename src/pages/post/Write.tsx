import uploadButton from "../../assets/write/upload_button.svg";
import categoryArrow from "../../assets/write/categoryArrow.svg";
import optionsArrow from "../../assets/write/search_arrow.svg";
import { useRef, useState } from "react";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router";

type Choices = { key: string; label: string; image: string }[];

export default function Write() {
  const choices: Choices = [
    { key: "A", label: "선택지 A", image: "" },
    { key: "B", label: "선택지 B", image: "" },
  ];
  // useState로 개선할 수 있음 (추후)

  const options = {
    friendship: "우정",
    love: "연애",
    food: "음식",
    life: "생활",
    hobby: "취미",
    work: "일",
  };

  const navigate = useNavigate();

  const imageUploadInputRefA = useRef<HTMLInputElement>(null);
  const imageUploadInputRefB = useRef<HTMLInputElement>(null);
  const [imageUploadPreviewA, setImageUploadPreviewA] = useState("");
  const [imageUploadPreviewB, setImageUploadPreviewB] = useState("");
  const [imageUploadA, setImageUploadA] = useState<File | null>(null);
  const [imageUploadB, setImageUploadB] = useState<File | null>(null);

  const [writeOptionList, setWriteOptionList] = useState(false);
  const [writeOption, setWriteOption] = useState<Category | "">("");
  const [writeTitle, setWriteTitle] = useState("");
  const [writeExplain, setWriteExplain] = useState("");
  const [writeSelectTextA, setWriteSelectTextA] = useState("");
  const [writeSelectTextB, setWriteSelectTextB] = useState("");

  const [showError, setShowError] = useState(false);

  const profile = useAuthStore((state) => state.profile);

  const imageUploadHandler = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) return;

    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      if (type === "A") {
        setImageUploadPreviewA(imagePreviewUrl);
        setImageUploadA(file);
      } else {
        setImageUploadPreviewB(imagePreviewUrl);
        setImageUploadB(file);
      }
    }
  };

  const writeDataHandler = async () => {
    if (writeOption === "") return setShowError(true);
    if (writeTitle === "") return setShowError(true);
    if (writeExplain === "") return setShowError(true);
    if (writeSelectTextA === "") return setShowError(true);
    if (writeSelectTextB === "") return setShowError(true);
    if (!profile) return;
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          {
            user_id: profile?.uid,
            post_title: writeTitle,
            post_desc: writeExplain,
            category: writeOption,
          },
        ])
        .select()
        .single();
      if (error) {
        throw error;
      }
      if (data) {
        console.log(data);
        let urlA = await insertOptionImg(imageUploadA, data.uid, writeOption);
        await insertOption(writeSelectTextA, urlA, "left", data.uid);
        let urlB = await insertOptionImg(imageUploadB, data.uid, writeOption);
        await insertOption(writeSelectTextB, urlB, "right", data.uid);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function insertOptionImg(file: File | null, uid: string, category: string) {
    if (file) {
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      console.log(safeName);
      const { data, error } = await supabase.storage
        .from("hotpotato")
        .upload(`options/${uid}/${safeName}`, file, {
          upsert: true,
        });
      if (error) {
        console.error("Error uploading file:", error);
      } else {
        console.log("File uploaded successfully");
        return supabase.storage.from("hotpotato").getPublicUrl(data.path).data.publicUrl;
      }
    } else {
      switch (category) {
        case "life":
          return "https://nrmhxllcbannezonftgf.supabase.co/storage/v1/object/public/hotpotato/options/default/life.png";
        case "love":
          return "https://nrmhxllcbannezonftgf.supabase.co/storage/v1/object/public/hotpotato/options/default/love.png";
        case "friendship":
          return "https://nrmhxllcbannezonftgf.supabase.co/storage/v1/object/public/hotpotato/options/default/friendship.png";
        case "food":
          return "https://nrmhxllcbannezonftgf.supabase.co/storage/v1/object/public/hotpotato/options/default/food.png";
        case "work":
          return "https://nrmhxllcbannezonftgf.supabase.co/storage/v1/object/public/hotpotato/options/default/work.png";
        case "hooby":
          return "https://nrmhxllcbannezonftgf.supabase.co/storage/v1/object/public/hotpotato/options/default/hobby.png";
        default:
          return "";
      }
    }
  }

  async function insertOption(
    title: string,
    img: string | null | undefined,
    position: string,
    id: string,
  ) {
    const { data, error } = await supabase
      .from("options")
      .insert([
        {
          option_title: title,
          option_img: img,
          position: position,
          post_id: id,
        },
      ])
      .select()
      .single();
    if (error) {
      throw error;
    }
    if (data) {
      console.log(data);
    }
    console.log(writeOption);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[1200px] my-9 mx-auto flex gap-5 items-center">
          <img
            src={categoryArrow}
            className="w-[31px] h-[26px] mt-[7px] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          <p className="w-[1000px] text-[#FF8C00] text-3xl">새 밸런스 게임 만들기</p>
        </div>

        {/* 본문 컨테이너 */}
        <div className="max-w-[1200px] w-full h-auto min-h-[1200px] px-[59px] py-[35px] border-2 border-[#FF8C00] rounded-xl">
          <div className="flex flex-col space-y-2">
            <p className="mb-2.5">주제 선택</p>
            <div className="relative mb-[45px]">
              <button
                className="flex justify-between items-center w-full max-w-[220px] my-1.5
              h-[40px] border-2 border-[#FF8C00]/60 rounded-md text-gray-70 cursor-pointer hover:border-[#FF8C00]"
                onClick={() => setWriteOptionList(!writeOptionList)}
              >
                {!writeOptionList ? (
                  <>
                    <p className="ml-[15px]">
                      {writeOption ? options[writeOption] : "주제를 선택하세요"}
                    </p>
                    <img className="rotate-90 mr-[5px] mb-[3px]" src={optionsArrow} />
                  </>
                ) : (
                  <>
                    <p className="ml-[15px] text-[#9e9e9e]">주제를 선택하세요</p>
                    <img className="rotate-270 mr-[5px] mt-[5px]" src={optionsArrow} />
                  </>
                )}
              </button>

              {writeOptionList && (
                <ul className="absolute w-full max-w-[220px] border-2 border-[#FF8C00]/60 rounded-md bg-black/80 ;">
                  {Object.entries(options).map(([key, value]) => (
                    <li
                      key={key}
                      className="w-full max-w-[220px] h-[40px] p-[7px] cursor-pointer hover:bg-[rgba(218,218,218,0.33)]"
                      onClick={() => {
                        setWriteOption(key as Category);
                        setWriteOptionList(!writeOptionList);
                        setShowError(false);
                      }}
                    >
                      <p className="text-center text-[#9e9e9e]">{value}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="mb-2.5">제목</p>
            <input
              type="text"
              placeholder="예: 치킨 vs 피자, 당신의 선택은?"
              className="w-full h-[45px] mb-2.5 pl-[15px] border-2 border-[#FF8C00]/60 rounded-md outline-none
              focus:border-[#FF8C00] focus:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)]"
              value={writeTitle}
              onChange={(e) => {
                {
                  if (e.target.value.length <= 50) setWriteTitle(e.target.value);
                  setShowError(false);
                }
              }}
            ></input>
            <p className="mb-[30px] text-right">{writeTitle.length}/50</p>

            <p className="mb-[10px]">설명</p>
            <textarea
              placeholder="밸런스 게임에 대한 설명을 입력하세요"
              rows={5}
              className="w-full mb-[10px] p-[15px] pt-[12px] font-normal border-2 border-[#FF8C00]/60 rounded-md outline-none
              focus:border-[#FF8C00] focus:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] "
              value={writeExplain}
              onChange={(e) => {
                if (e.target.value.length <= 200 && e.target.value.split("\n").length <= 5)
                  setWriteExplain(e.target.value);
                setShowError(false);
              }}
            ></textarea>
            <p className="mb-[46px] text-right">{writeExplain.length}/200</p>
          </div>
          {/*  */}
          <div className="flex items-center mb-[42px]">
            <div className="flex-1 h-[1px] bg-[#FF8C00]"></div>
            <p className="text-[#FF8C00]">선택지</p>
            <div className="flex-1 h-[1px] bg-[#FF8C00]"></div>
          </div>
          {/* */}
          <input
            type="file"
            className="hidden"
            ref={imageUploadInputRefA}
            accept="image/*"
            onChange={(e) => {
              imageUploadHandler(e, "A");
              setShowError(false);
            }}
          />
          <input
            type="file"
            className="hidden"
            ref={imageUploadInputRefB}
            accept="image/*"
            onChange={(e) => {
              imageUploadHandler(e, "B");
              setShowError(false);
            }}
          />
          <div className="w-full h-[480px] grid grid-cols-2 gap-[82px] justify-items-center">
            {choices.map((choice) => (
              <div key={choice.key} className="w-full h-full">
                {/* 1 */}
                <div className="mb-[16px] flex items-center gap-[19px]">
                  <div
                    className="w-[32px] h-[32px] border-2 rounded-[50%] border-[#FF8C00] text-[#FF8C00] bg-[#FF8C00]/30
                flex items-center justify-center"
                  >
                    <p>{choice.key}</p>
                  </div>
                  <p>{choice.label}</p>
                </div>
                {/* 2 */}
                <input
                  placeholder="선택지 텍스트"
                  className="w-full h-[40px] mb-[10px] pl-[15px] border-2 border-[#FF8C00]/60 rounded-md outline-none focus:border-[#FF8C00]
                focus-within:shadow-[0_0_10px_4px_rgba(255,140,0,0.5)] "
                  value={choice.key === "A" ? writeSelectTextA : writeSelectTextB}
                  onChange={(e) => {
                    if (choice.key === "A" && e.target.value.length <= 25)
                      setWriteSelectTextA(e.target.value);
                    else if (choice.key === "B" && e.target.value.length <= 25)
                      setWriteSelectTextB(e.target.value);
                  }}
                ></input>
                <p className="mb-[16px] text-right">
                  {choice.key === "A" ? writeSelectTextA.length : writeSelectTextB.length}/25
                </p>
                {/* 3 */}
                <div
                  className="w-full h-[350px] border-2 border-dashed border-[#FF8C00]/60 rounded-lg
                  cursor-pointer hover:border-[#FF8C00]"
                >
                  {imageUploadPreviewA && choice.key === "A" ? (
                    <img
                      src={imageUploadPreviewA}
                      alt="선택지 사진 미리보기"
                      className="w-full h-full flex flex-col items-center justify-center hover:blur-sm"
                      onClick={() => setImageUploadPreviewA("")}
                    />
                  ) : imageUploadPreviewB && choice.key === "B" ? (
                    <img
                      src={imageUploadPreviewB}
                      alt="선택지 사진 미리보기"
                      className="w-full h-full flex flex-col items-center justify-center hover:blur-sm"
                      onClick={() => setImageUploadPreviewB("")}
                    />
                  ) : (
                    <div
                      className="h-full flex flex-col items-center justify-center gap-[3px]"
                      onClick={() => {
                        if (choice.key === "A") imageUploadInputRefA?.current?.click();
                        else imageUploadInputRefB?.current?.click();
                      }}
                    >
                      <img src={uploadButton} className="w-[35px] h-[35px]" />
                      <p className="opacity-50">이미지업로드</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/*  */}
          <div className="grid justify-items-center">
            <button
              className="w-[426px] h-[41px] mt-[35px] bg-[#FF8C00] text-black rounded-md
              cursor-pointer transition-shadow duration-200 hover:scale-101 hover:drop-shadow-[0_0_5px_#ff8c00]"
              onClick={() => writeDataHandler()}
            >
              게시하기
            </button>
            {showError && (
              <p className="text-red-500 text-sm text-center mt-2">
                모든 필수 입력 항목을 입력해주세요.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
