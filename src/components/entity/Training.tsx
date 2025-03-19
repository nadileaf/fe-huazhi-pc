import { Image, Chip, Link, Button } from '@nextui-org/react';
import { useMemo } from 'react';
import FileList from '../basic/FileList';
import { useRouter } from 'next/navigation';
import { generateUrl } from '@/utils/common';
import { FlowSelector } from '../task/FlowSelector';
import { get } from 'lodash-es';

export function TrainingCard({
  data,
  stageName,
  groups,
  onClick,
}: {
  data: EntityModel.BusinessEntity<'Training'>;
  stageName?: string;
  groups?: string[];
  onClick?: (data: EntityModel.BusinessEntity<'Training'>) => void;
}) {
  const standardFields = useMemo(() => data.data.standardFields, [data]);
  const projectId = useMemo(() => {
    if (get(data, 'data.standardFields.projectId'))
      return get(data, 'data.standardFields.projectId');
    else if ('projectPayload' in data) return data.meta.openId;
    return undefined;
  }, [data]);

  const taskId = useMemo(() => {
    if (get(data, 'data.standardFields.taskId')) return get(data, 'data.standardFields.taskId');
    else if ('taskPayload' in data) return data.meta.openId;
    return undefined;
  }, [data]);

  const examLink = useMemo(
    () => ('examLink' in standardFields ? standardFields.examLink : ''),
    [standardFields],
  );
  const reportUrl = useMemo(
    () => ('reportUrl' in standardFields ? standardFields.reportUrl : ''),
    [standardFields],
  );

  const router = useRouter();
  function handleClick() {
    if (onClick) onClick(data);
    else
      router.push(
        generateUrl(`/home/entity/Training/${data.meta.openId}`, {
          stageName,
          projectId,
          taskId,
          examLink,
          reportUrl,
        }),
      );
  }

  const meta = useMemo(() => {
    const chaptersInfo = standardFields.chapters ? `共${standardFields.chapters.length}章节` : '';

    return [standardFields.mode, chaptersInfo].filter(Boolean).join(' | ');
  }, [standardFields]);

  if (!standardFields) return null;
  return (
    <div className="card-v2 py-5 px-8 hover:bg-active " onClick={handleClick}>
      <div className="text-2xl font-bold mb-3">{standardFields.name}</div>
      <div className="text-base text-black-666 mb-4">{meta}</div>
      <div className="divider bg-gray-100 mb-4 "></div>
      <div className="flex items-center justify-between">
        <div>讲师：{standardFields.courseLecturer || '-'}</div>
        {projectId && taskId && (
          <FlowSelector
            projectId={projectId}
            taskId={taskId}
            value={stageName || ''}
            groups={groups}
          />
        )}
      </div>
    </div>
  );

  // return (
  //   standardFields && (
  //     <div className="card" onClick={handleClick}>
  //       <div className="flex flex-1 flex-col gap-1">
  //         <div className="flex items-center gap-5 mb-2">
  //           <div className="flex items-center gap-2">
  //             <span className="text-xl">{standardFields.name}</span>
  //             <Chip color="default" variant="flat" size="sm" radius="sm">
  //               {standardFields.mode}
  //             </Chip>
  //             {standardFields.sources?.map((item, i) => (
  //               <Chip key={i} color="default" variant="flat" size="sm" radius="sm">
  //                 {item}
  //               </Chip>
  //             ))}
  //           </div>
  //         </div>
  //         <div className="flex items-center gap-5 text-xs">
  //           <span>讲师：{standardFields.courseLecturer}</span>
  //           <span>课程章节：{standardFields.chapters?.length || 0}节</span>
  //         </div>
  //         <div className="text-xs text-default-500">{standardFields.background}</div>
  //         {standardFields.coursewares && (
  //           <div className=" mt-3">
  //             <FileList data={standardFields.coursewares} />
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   )
  // );
}

export function TrainingDetail({
  data,
  taskId,
  projectId,
  stageName,
  ...otherFields
}: {
  data?: EntityModel.BusinessEntity<'Training'>;
  taskId?: string;
  projectId?: string;
  stageName?: string;
  [key: string]: any;
}) {
  const standardFields = data?.data.standardFields;

  console.log('otherFields', taskId, otherFields);

  const examLink = otherFields?.examLink;
  const reportUrl = otherFields?.reportUrl;

  return (
    standardFields && (
      <>
        <div className="wrapper py-20">
          <div className="flex justify-between gap-3">
            <div className="text-5xl text-black font-bold mb-8">{standardFields.name}</div>
            {projectId && taskId && (
              <FlowSelector projectId={projectId} taskId={taskId} value={stageName || ''} />
            )}
          </div>
          <div className="flex justify-between text-2xl">
            <div className="flex items-center gap-10">
              <div>课程讲师: {standardFields.courseLecturer || '-'}</div>{' '}
              <div>课程来源：{standardFields.sources?.join(',') || '-'}</div>
            </div>
          </div>

          <div className="mt-20 flex w-full gap-4 items-center">
            <div className="flex-1 flex flex-col items-center gap-6">
              <span className="text-3xl">{standardFields.category?.join(',') || '-'}</span>
              <span className="text-xl">课程分类</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-6 border-x border-gray-200">
              <span className="text-3xl">{standardFields.targetAudiences?.join(',') || '-'}</span>
              <span className="text-xl">课程对象</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-6">
              <span className="text-3xl">{standardFields.price || '-'}</span>
              <span className="text-xl">课程价格</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-6 border-r border-gray-200">
              <span className="text-3xl">{standardFields.mode || '-'}</span>
              <span className="text-xl">上课形式</span>
            </div>

            <div className="flex-1 flex flex-col items-center gap-6">
              <span className="text-3xl text-primary">
                {examLink ? (
                  <Link href={examLink} size="sm" isExternal showAnchorIcon>
                    查看
                  </Link>
                ) : (
                  '-'
                )}
              </span>
              <span className="text-xl">考试链接</span>
            </div>
          </div>
        </div>
        <div className="bg-white py-28">
          <div className="wrapper">
            <div className="mb-28">
              <div className="text-4xl font-bold mb-10">课程背景</div>
              <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
                {standardFields.background}
              </div>
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">课程目的</div>
              <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
                {standardFields.objectives}
              </div>
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">课程大纲</div>
              <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
                {standardFields.syllabus}
              </div>
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">课程收益</div>
              <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
                {standardFields.benefit}
              </div>
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">培训描述</div>
              <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
                {standardFields.description}
              </div>
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">课程讲师介绍</div>
              <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
                {standardFields.courseLecturerProfile}
              </div>
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">课程封面</div>
              <FileList data={standardFields.cover ? [standardFields.cover] : []} />
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">课程介绍图</div>
              <FileList data={standardFields.introductionAttachments} />
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">课件</div>
              <FileList data={standardFields.coursewares} />
            </div>
            <div className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <div className="text-4xl font-bold">课程章节</div>
                <div className="text-2xl whitespace-pre-wrap leading-[1.6]">
                  共{standardFields.chapters?.length}章节
                </div>
              </div>
              {standardFields.chapters?.map((item) => (
                <div key={item.name} className="mb-10">
                  <div className="text-2xl whitespace-pre-wrap leading-[1.6] mb-2">{item.name}</div>
                  {!!item.materials?.filter((v) => v.key).length && (
                    <FileList data={item.materials?.filter((v) => v.key)} />
                  )}
                </div>
              ))}
            </div>
            <div className="mb-20">
              <div className="text-4xl font-bold mb-10">其他资料</div>
              <FileList data={standardFields.attachments} />
            </div>
          </div>
        </div>
      </>
    )
  );
}
