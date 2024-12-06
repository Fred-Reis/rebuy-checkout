import { twJoin } from "tailwind-merge";

interface ButtonProps {
  text: string;
  action: () => void;
  type?: "outline" | "default";
}

export const Button = ({ text, action, type = "default" }: ButtonProps) => {
  const buttonClass = twJoin(
    "bg-[#BE2198] font-medium rounded-[5px] w-full h-[57px] flex items-center justify-center transition duration-300 ease-in-out",
    type === "outline"
      ? "border border-[#E6E6E6] hover:text-[#951877] hover:border-[#951877] text-[#BE2198] bg-white"
      : "hover:bg-[#951877] text-white"
  );

  return (
    <button className={buttonClass} onClick={action}>
      {text}
    </button>
  );
};
