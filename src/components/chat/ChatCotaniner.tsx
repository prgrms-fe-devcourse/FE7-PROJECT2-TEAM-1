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

  useEffect(() => {
    const loadMessages = async () => {
      const { data, error } = await supabase
        .from("chat")
        .select("*")
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

  const handleSend = async () => {
    if (!text.trim()) return;
    const { error } = await supabase.from("chat").insert({
      category,
      user_id: profile?.uid,
      content: text,
      profile_img: profile?.profile_img,
      username: profile?.username,
    });
    if (error) throw error;
    setText("");
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-20 right-6 w-[400px] h-[600px] border border-[#ffffff30] rounded-2xl shadow-lg shadow-[#0A0A0A]/70 overflow-hidden transition-all duration-300 z-[100] backdrop-blur-xl flex flex-col">
      <div className="flex justify-between items-center px-4 py-3 border-b border-[#ffffff20] bg-[#1a1a1a]/60 backdrop-blur-md">
        <span className="font-semibold text-white">{category} 채팅방</span>
        <button
          onClick={onClose}
          className="text-sm text-gray-300 hover:text-orange-400 transition"
        >
          닫기 ✕
        </button>
      </div>

      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#0f0f0f]/60">
        {messages && messages.length > 0 ? (
          messages.map((msg) => {
            const isMine = msg.user_id === profile?.uid;
            return (
              <div
                key={msg.uid}
                className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}
              >
                {!isMine && (
                  <img
                    src={msg.profile_img || ""}
                    alt="프로필"
                    className="w-8 h-8 rounded-full border border-[#ffffff30]"
                  />
                )}

                <div
                  className={`max-w-[70%] rounded-xl px-3 py-2 text-sm ${
                    isMine
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-white/90 text-black rounded-bl-none"
                  }`}
                >
                  {!isMine && (
                    <p className="text-xs text-gray-500 mb-0.5 font-medium">{msg.username}</p>
                  )}
                  <p className="break-words font-normal">{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 text-gray-400 text-right ${
                      isMine ? "text-orange-100" : "text-gray-500"
                    }`}
                  >
                    {new Date(msg.created_at).toLocaleTimeString("ko-KR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {isMine && (
                  <img
                    src={profile?.profile_img || "/default_profile.png"}
                    alt="내 프로필"
                    className="w-8 h-8 rounded-full border border-[#ffffff30]"
                  />
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-400 mt-10 text-sm">아직 메시지가 없습니다.</div>
        )}
      </div>

      <div className="border-t border-[#ffffff20] bg-[#1a1a1a]/80 backdrop-blur-md flex items-center gap-2 p-3">
        <input
          className="w-full flex-1 border border-[#ffffff30] bg-transparent rounded-lg px-3 py-2 outline-none text-white placeholder-gray-400 text-sm"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="메시지 입력..."
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          전송
        </button>
      </div>
    </div>
  );
}
