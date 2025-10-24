import { useRef, useState } from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "plain";
}

export default function Button({
  onClick,
  children,
  className = "",
  variant = "default",
  ...props
}: IButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef<boolean>(false);

  const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading) return;
    loadingRef.current = true;
    setIsLoading(true);
    try {
      if (onClick) await onClick(e);
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
      setTimeout(() => setIsLoading(false), 200);
    }
  };

  const base = "rounded-[6px] duration-200 cursor-pointer";
  const variants = {
    default: "bg-[#FF8C00] hover:scale-101 active:scale-98",
    plain: "",
  };

  return (
    <button
      {...props}
      onClick={clickHandler}
      disabled={isLoading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
