import { useEffect, useRef, useState } from "react";
import supabase from "../../utils/supabase";
import { useAuthStore } from "../../stores/authStore";

export default function ChatCotaniner({
  category,
  onClose,
  onNewMessage,
}: {
  category: string;
  onClose: () => void;
  onNewMessage: () => void;
}) {
  const [messages, setMessages] = useState<Chat[]>([]);
  const [text, setText] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);
  const profile = useAuthStore((state) => state.profile);

  // 1️⃣ 초기 메시지 불러오기
  useEffect(() => {
    console.log(category);
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("chat")
        .select("*,profiles(username)")
        .eq("category", category)
        .order("created_at", { ascending: true });

      if (error) throw error;
      if (data) {
        console.log(data);
        setMessages(data);
      }
    };
    loadMessages();
  }, [category]);

  // 2️⃣ 실시간 구독
  useEffect(() => {
    const channel = supabase
      .channel(`chat_${category}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat",
          filter: `category=eq.${category}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Chat]);
          onNewMessage?.();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category, onNewMessage]);

  // // 3️⃣ 메시지 전송
  const handleSend = async () => {
    if (!text.trim()) return;
    const { error } = await supabase.from("chat").insert({
      category,
      user_id: profile?.uid,
      content: text,
    });
    if (error) throw error;
    setText("");
  };

  // // 4️⃣ 자동 스크롤
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-20 right-6 w-[350px] min-h-[500px] h-96 border-1 border-[#ffffff30] rounded-[10px] mt-3 shadow-lg shadow-[#0A0A0A] overflow-x-hidden overflow-y-auto transition-all duration-200 z-100 backdrop-blur-lg">
      {/* <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col z-100"> */}
      {/* 상단바 */}
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <span className="font-semibold">{category} 채팅방</span>
        <button onClick={onClose}>
          {/* <X size={20} /> */}
          닫기
        </button>
      </div>

      {/* 메시지 리스트 */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages &&
          messages.map((msg) => (
            <div
              key={msg.uid}
              className={`p-2 rounded-lg max-w-[70%] text-black ${
                msg.user_id === profile?.uid ? "bg-orange-100 self-end ml-auto" : "bg-gray-100"
              }`}
            >
              {msg.content}
            </div>
          ))}
      </div>

      {/* 입력창 */}
      <div className="border-t flex p-2">
        <input
          className="w-full flex-1 border rounded-lg px-3 py-1 outline-none text-stone-800"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="메시지 입력..."
        />
        <button onClick={handleSend} className="ml-2 bg-orange-500 text-white px-3 rounded-lg">
          전송
        </button>
      </div>
    </div>
  );
}
