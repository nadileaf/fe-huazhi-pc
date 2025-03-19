'use client';
import { type AppItem } from '@/services/ai';
import { Image } from '@nextui-org/react';
import { useAIToolsStore } from '@/stores/ai-tools';
import AIToolCard from '@/components/ai/AIToolCard';
import { formatImageUrl } from '@/utils/format';

export default function Page() {
  const { aiTools } = useAIToolsStore();

  function getAIToolCardItem(item: AppItem, iconSrc: string) {
    return {
      title: item.name,
      description: item.description,
      link: item.link,
      icon: <Image src={iconSrc} width={48} radius="none" alt={item.name}></Image>,
    };
  }

  return (
    <div className="wrapper py-8">
      <div className="text-3xl font-medium mb-24">AI工具箱</div>
      <div className="grid grid-cols-3 gap-8">
        {aiTools?.map((item, index) => (
          <AIToolCard
            key={item.name}
            item={getAIToolCardItem(item, formatImageUrl(item.icon_v2?.key))}
            className="h-[240px] !mb-14 hover:bg-active "
          ></AIToolCard>
        ))}
      </div>
    </div>
  );
}
