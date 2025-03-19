'use client';

import Tag from '@/components/basic/Tag';
import { withCdnPrefix } from '@/utils/file';
import { Button, Image } from '@nextui-org/react';
import { useRequest } from '@/hooks/useHooks';
import Loading from '@/components/basic/Loading';
import { aiService, type AppItem } from '@/services/ai';
import { useRouter } from 'next/navigation';
import useAITool from '@/hooks/useAITool';
import { useAIToolsStore } from '@/stores/ai-tools';
import { formatImageUrl } from '@/utils/format';
import AIToolCard from '../ai/AIToolCard';
import { useAuthStore } from '@/stores/auth';

export default function AIToolbox() {
  const router = useRouter();

  const { aiTools } = useAIToolsStore();

  const { open } = useAITool();

  function getAIToolCardItem(item: AppItem, iconSrc: string) {
    return {
      title: item.name,
      description: item.description,
      link: item.link,
      icon: <Image src={formatImageUrl(item.icon_v2?.key)} width={48} radius="none"></Image>,
    };
  }

  function handleClickMore() {
    router.push('/home/ai');
  }

  return (
    <Loading>
      <section className="bg-[url('https://cdn-fe.mesoor.com/custom/ciickd/ai-toolbox/home/bg.png')] bg-contain bg-center bg-no-repeat w-full h-[1034px] bg-[#F6F9FC]">
        <div className="wrapper">
          <div className="flex items-center justify-between pt-20">
            <div className="title">AI工具箱</div>
            <div className="hover:text-primary cursor-pointer" onClick={handleClickMore}>
              更多
            </div>
          </div>
        </div>
        {aiTools.length ? (
          <div className="wrapper pt-14 pb-4">
            <div className=" h-[800px] flex flex-col justify-center">
              <div className="flex items-center gap-8">
                <AIToolCard
                  key={aiTools[0].name}
                  item={getAIToolCardItem(
                    aiTools[0],
                    withCdnPrefix(`/custom/ciickd/ai-toolbox/home/1.svg`),
                  )}
                  customContent={
                    <div className="flex items-end justify-between flex-col gap-3 px-6 pt-[78px] max-sm:px-5 max-sm:pb-10 max-sm:pt-16">
                      <div className="w-full">
                        <div className="pb-5 font-medium text-2xl max-sm:text-lg text-black">
                          {aiTools[0].name}
                        </div>
                        <div className="text-black-666 max-sm:text-xs ">
                          {aiTools[0].description}
                        </div>
                      </div>
                      <Button
                        className="bg-white border border-[#CCCCCC] text-black-333 font-[450] text-lg max-sm:text-base w-48 h-12 max-sm:w-36 max-sm:h-9 lg:gap-5 max-sm:gap-2"
                        radius="full"
                        endContent={
                          <Image
                            src={withCdnPrefix('/custom/ciickd/website/arrow.png')}
                            width={62}
                            height={21}
                          ></Image>
                        }
                        onClick={() => open(aiTools[0].link)}
                      >
                        立即查看
                      </Button>
                    </div>
                  }
                  otherContent={
                    <div className="absolute right-6 top-5 flex items-center gap-3">
                      <Tag text="推荐" className="!bg-[#587DFF]" />
                      <Tag text="NEW" className="!bg-primary" />
                    </div>
                  }
                  className="w-[66%] h-[240px] !mb-0  hover:bg-active"
                ></AIToolCard>
                <AIToolCard
                  key={aiTools[1].name}
                  item={getAIToolCardItem(
                    aiTools[1],
                    withCdnPrefix(`/custom/ciickd/ai-toolbox/home/2.svg`),
                  )}
                  className="w-[33%] h-[240px] !mb-0 hover:bg-active "
                ></AIToolCard>
              </div>
              <div className="mt-24 flex items-center gap-8">
                {aiTools.slice(2, 5).map((item, index) => (
                  <AIToolCard
                    key={item.name}
                    item={getAIToolCardItem(
                      item,
                      withCdnPrefix(`/custom/ciickd/ai-toolbox/home/${index + 3}.svg`),
                    )}
                    className="w-[33%] h-[240px] !mb-0  hover:bg-active "
                  ></AIToolCard>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>
      )
    </Loading>
  );
}
