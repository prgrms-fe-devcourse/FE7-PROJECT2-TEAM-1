import { useState } from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className = "", ...props }: IButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (onClick) await onClick(e);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      {...props}
      onClick={clickHandler}
      disabled={isLoading}
      className={`bg-[#FF8C00] rounded-[6px] duration-200 hover:scale-101 active:scale-98 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
