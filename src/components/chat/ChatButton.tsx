import { useState, useEffect } from "react";
import ChatCotaniner from "./ChatCotaniner";

export default function ChatButton({ category }: { category: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    if (isOpen) setHasNew(false);
  }, [isOpen]);

  return (
    <>
      {/* 채팅창 */}
      {isOpen && (
        <ChatCotaniner
          category={category}
          onClose={() => setIsOpen(false)}
          onNewMessage={() => {
            if (!isOpen) setHasNew(true);
          }}
        />
      )}

      {/* 채팅 아이콘 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all"
      >
        {/* <MessageCircle size={28} /> */}
        {hasNew && <span className="absolute top-2 right-2 bg-red-600 w-3 h-3 rounded-full" />}
      </button>
    </>
  );
}
