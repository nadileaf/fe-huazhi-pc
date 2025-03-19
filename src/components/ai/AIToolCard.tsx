import useAITool from '@/hooks/useAITool';

export type AIToolCardProps = {
  item: {
    title: string;
    description: string;
    icon: JSX.Element;
    link?: string;
  };
  className?: string;
  customContent?: JSX.Element;
  otherContent?: JSX.Element;
};

export default function AIToolCard({
  item,
  className,
  customContent,
  otherContent,
}: AIToolCardProps) {
  const { open } = useAITool();

  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg mb-32 max-sm:mb-16 ${item.link ? 'cursor-pointer' : ''} ${className}`}
      onClick={() => open(item.link)}
    >
      {otherContent}
      <div className="absolute left-6 top-[-50px] w-[100px] h-[100px] max-sm:w-[80px] max-sm:h-[80px] max-sm:left-5 max-sm:top-[-35px] rounded-xl bg-white flex items-center justify-center shadow-lg">
        {item.icon}
      </div>
      {customContent || (
        <div className="px-6 pb-[66px] pt-[78px] max-sm:px-5 max-sm:pb-10 max-sm:pt-16">
          <div className="pb-5 font-medium text-2xl max-sm:text-lg text-black truncate">
            {item.title}
          </div>
          <div className="text-black-666 max-sm:text-xs  truncate">{item.description}</div>
        </div>
      )}
    </div>
  );
}
