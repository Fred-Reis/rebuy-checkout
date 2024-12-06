interface HeadingBannerProps {
  title: string;
  body: string;
}

export const HeadingBanner = ({ title, body }: HeadingBannerProps) => {
  return (
    <div className="h-24 flex flex-col w-full items-center justify-between py-[18px] px-[17px] bg-[#F5F5F5] border-y-[1px] border-[#DCDCDC] mb-[14px]">
      <p className="text-sm text-[#505050]">{title}</p>

      <h5 className="text-base text-[#382B2A] font-medium text-center">
        {body}
      </h5>
    </div>
  );
};
