import { useState, useEffect } from "react";
import ChatCotaniner from "./ChatCotaniner";
import chat_logo from "../../assets/chat/chat_logo.png";

export default function ChatButton({ category }: { category: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    if (isOpen) setHasNew(false);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <ChatCotaniner
          category={category}
          onClose={() => setIsOpen(false)}
          onNewMessage={() => {
            if (!isOpen) setHasNew(true);
          }}
        />
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
    w-[60px] h-[60px] fixed bottom-6 right-6 
    bg-gradient-to-br from-orange-400 to-orange-500 
    text-white p-1 rounded-full 
    shadow-[0_8px_15px_rgba(0,0,0,0.3)] 
    hover:shadow-[0_15px_25px_rgba(0,0,0,0.35)] 
    active:translate-y-1 active:shadow-[0_4px_6px_rgba(0,0,0,0.3)]
    transition-all duration-200 cursor-pointer
    flex items-center justify-center
  "
      >
        <img className="w-full" src={chat_logo} alt="chat_logo" />
        {hasNew && <span className="absolute top-2 right-2 bg-red-600 w-3 h-3 rounded-full" />}
      </button>
    </>
  );
}
