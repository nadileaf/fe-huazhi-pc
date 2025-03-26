// 'use client';

// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';
// import { useAppStore } from '@/stores/app';
// import { useAuthStore } from '@/stores/auth';
// import { Icon } from '@iconify/react';
// import { Avatar } from '@nextui-org/react';
// import { useEffect, useMemo, useState } from 'react';
// import { taskService } from '@/services/task';
// import { useRequest } from '@/hooks/useHooks';
// import HtmlToPDF from '@/utils/html-to-pdf';
// import Loading from '../basic/Loading';
// import { formatImageUrl } from '@/utils/format';

// type Tab = '人才看板' | '编辑简历' | '下载简历';

// export default function SystemEmployeeHeader() {
//   const pathName = usePathname();
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState<Tab | undefined>(undefined);

//   // const [loading, setLoading] = useState(false);

//   const tabs = useMemo(
//     () => [
//       {
//         label: '人才看板',
//         icon: 'solar:document-outline',
//         onClick: () => {
//           router.push('/resume');
//         },
//       },
//       {
//         label: '编辑简历',
//         icon: 'solar:document-add-linear',
//         onClick: () => {
//           router.push('/resume/edit');
//         },
//       },

//       {
//         label: '下载简历',
//         icon: 'solar:download-linear',
//         onClick: () => {
//           router.push('/resume/download');
//         },
//       },
//     ],
//     [router],
//   );

//   useEffect(() => {
//     if (pathName.includes('resume')) {
//       setActiveTab('人才看板');
//     }
//   }, [pathName]);

//   const { currentLocation, locationLoading } = useAppStore();
//   const { systemEmployee, loading } = useAuthStore();

//   const standardFields = useMemo(() => systemEmployee?.data.standardFields, [systemEmployee]);

//   return (
//     <Loading loading={loading}>
//       <section className="bg-white pt-24 pb-20">
//         {standardFields && (
//           <div className="wrapper flex items-end gap-16">
//             <div className="flex items-center gap-4">
//               <Avatar
//                 classNames={{ base: 'w-40 h-40' }}
//                 src={formatImageUrl(standardFields?.humanInfo?.avatar?.key)}
//                 className="flex-shrink-0"
//               />
//               <div className="flex-shrink-0">
//                 <div className="text-4xl text-black-333">{standardFields.humanInfo?.name}</div>
//                 <div className="my-3 flex items-center gap-3">
//                   <div className="text-lg bg-[#F2F6FF] py-1 px-3 flex items-center justify-center rounded-lg">
//                     {[
//                       standardFields.educations?.[0]?.schoolName,
//                       standardFields.educations?.[0]?.majorCategoryName,
//                     ]
//                       .filter(Boolean)
//                       .join('-')}
//                   </div>
//                   <div className="text-lg bg-[#FFF4F3] py-1 px-3 flex items-center justify-center rounded-lg">
//                     {standardFields.educations?.[0]?.degree?.name}
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-1 text-black-666">
//                   <Icon icon="akar-icons:location" />
//                   {locationLoading ? '定位中' : currentLocation.city || '全国'}
//                 </div>
//               </div>
//             </div>
//             <div className="w-full">
//               <div className="flex items-center justify-center gap-16 mb-10">
//                 {tabs.map((tab) => (
//                   <div
//                     key={tab.label}
//                     className="flex items-center gap-4 cursor-pointer group"
//                     onClick={tab.onClick}
//                   >
//                     <Icon
//                       icon={tab.icon}
//                       className={`text-lg ${tab.label === activeTab ? 'text-primary' : 'text-black-333'} group-hover:text-primary`}
//                     ></Icon>
//                     <span
//                       className={`text-lg ${tab.label === activeTab ? 'text-primary' : 'text-black-333'} group-hover:text-primary`}
//                     >
//                       {tab.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//               <Cards />
//             </div>
//           </div>
//         )}
//       </section>
//     </Loading>
//   );
// }

// function Cards() {
//   const { systemEmployee } = useAuthStore();
//   const standardFields = useMemo(() => systemEmployee?.data.standardFields, [systemEmployee]);

//   const { data: training } = useRequest(
//     () =>
//       taskService.query({
//         filters: [
//           {
//             key: 'data.standardFields.channelTemplate.openId',
//             values: ['TrainingToSystemEmployee'],
//           },
//           {
//             key: 'data.standardFields.taskPayload.openId',
//             values: [systemEmployee?.meta.openId!],
//           },
//         ],
//       }),
//     {
//       before: () => !!systemEmployee?.meta.openId,
//       refreshDeps: [systemEmployee?.meta.openId],
//     },
//   );
//   const { data: evaluation } = useRequest(
//     () =>
//       taskService.query({
//         filters: [
//           {
//             key: 'data.standardFields.channelTemplate.openId',
//             values: ['PinPinCloudEvaluationToSystemEmployee'],
//           },
//           {
//             key: 'data.standardFields.taskPayload.openId',
//             values: [systemEmployee?.meta.openId!],
//           },
//         ],
//       }),
//     {
//       before: () => !!systemEmployee?.meta.openId,
//       refreshDeps: [systemEmployee?.meta.openId],
//     },
//   );

//   const cards = useMemo(() => {
//     return [
//       {
//         label: '求职状态',
//         value: standardFields?.currentJobStatus?.[0]?.status || '暂无',
//       },
//       {
//         label: '课程学习',
//         value: training?.total || 0,
//       },
//       {
//         label: '参与评测',
//         value: evaluation?.total || 0,
//       },
//     ];
//   }, [standardFields, training, evaluation]);

//   return (
//     <div className="flex items-center justify-center gap-10">
//       {cards.map((card) => (
//         <div
//           key={card.label}
//           className="w-[168px] h-[168px] py-9 px-8 border-[#ccc] border-1 rounded-lg bg-white flex flex-col items-center justify-between "
//         >
//           <div className="text-4xl text-black ">{card.value}</div>
//           <div className="text-lg text-black-666">{card.label}</div>
//         </div>
//       ))}
//     </div>
//   );
// }
