import ApplyButton from '@/components/unlogin/ApplyButton';
import { withCdnPrefix } from '@/utils/file';
import { Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export interface Plan {
  title: string;
  img: string;
  price: JSX.Element;
  features: Record<string, string[]>;
}

const buttonClass = {
  标准版: 'blue-gradient-button',
  专业版: 'purple-gradient-button',
  旗舰版: 'orange-gradient-button',
};

const bgClass = {
  标准版: 'bg-blue',
  专业版: 'bg-purple',
  旗舰版: 'bg-orange',
};

const featureHeight = {
  服务框架: '200px',
  享用功能: '160px',
};

export default function PlanItem({ plan }: { plan: Plan }) {
  return (
    <div className="plan-item ">
      <Image
        src={withCdnPrefix(`/custom/ciickd/website/solution/${plan.img}.png`)}
        width={410}
        height={340}
        radius="none"
        classNames={{
          wrapper: 'absolute top-0 left-0 w-auto h-[340px] max-sm:w-full max-sm:h-auto',
        }}
      ></Image>

      <div className="relative z-10 w-full h-[340px] max-sm:h-[56vw] flex justify-between flex-col p-14 px-12 max-sm:p-8 max-sm:px-6">
        <div className="text-3xl max-sm:text-xl text-white">{plan.title}</div>
        {plan.price}
        <ApplyButton
          custom
          className={`sm:w-[314px] h-12 max-sm:h-8 text-lg max-sm:text-sm text-black rounded-3xl bg-white shadow-lg ${buttonClass[plan.title as keyof typeof buttonClass]}`}
        >
          {plan.title === '标准版' ? '申请试用' : '升级咨询'}
        </ApplyButton>
      </div>

      <div
        className={`relative pt-12 px-12 max-sm:pt-8 max-sm:px-6 h-[1600px] max-sm:h-[1300px] border border-t-0 border-[#ccc] bg-white ${bgClass[plan.title as keyof typeof bgClass]}`}
      >
        <div className="absolute top-0 left-0 w-full h-5 hover-shadow max-sm:hidden"></div>
        {Object.entries(plan.features).map(([key, features]) => (
          <div key={key} className={`mb-9 h-[${featureHeight[key as keyof typeof featureHeight]}]`}>
            <div className="text-2xl max-sm:text-lg mb-4">{key}</div>
            {key === '享用功能' ? (
              features.map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Icon
                    icon="fluent:checkmark-12-regular"
                    className={`text-base max-sm:text-sm icon`}
                  />
                  <span className="text-base max-sm:text-sm">{item}</span>
                </div>
              ))
            ) : (
              <ul className="list-disc list-inside ">
                {features.map((item) => (
                  <li key={item} className="text-base max-sm:text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
