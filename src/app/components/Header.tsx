import Image from "next/image";

import logo from "@/assets/rebuy-logo.png";
import check from "@/assets/check.png";

export const Header = () => {
  return (
    <header className="h-[116px] py-[18px] md:block flex flex-wrap border-b-[1px] border-[#DCDCDC]">
      <div className="max-w-[938px] m-auto">
        <Image
          className="w-[125px] h-[32px]"
          src={logo}
          alt="logo"
          width={125}
          height={32}
          priority
        />

        <span className="flex items-center gap-2 mt-3">
          <Image
            className="w-6 h-6 ml-[-32px]"
            src={check}
            alt="check"
            width={24}
            height={24}
            priority
          />
          <p className="text-base text-[#333]">You’ve paid for your order.</p>
        </span>

        <a href="#" className="text-sm text-secondary">
          View order confirmation ›
        </a>
      </div>
    </header>
  );
};
