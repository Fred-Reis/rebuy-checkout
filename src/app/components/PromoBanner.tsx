interface PromoBannerProps {
  message?: string;
  counter: number;
}

export const PromoBanner = ({
  message = "Don't miss out -- your special offer ends in:",
  counter,
}: PromoBannerProps) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return counter > 0 ? (
    <div className="h-[54px] rounded-[5px] flex flex-col w-full items-center justify-center bg-[#FFF8E0] border-[1px] border-[#F0E4BC] mb-[14px]">
      <p className="text-sm text-[#545454]">
        {message}
        <span className="text-sm text-[#333] font-medium ml-1">
          {formatTime(counter)}
        </span>
      </p>
    </div>
  ) : null;
};
