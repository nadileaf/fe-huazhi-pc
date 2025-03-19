'use client';
import useApplyModal from '@/components/unlogin/ApplyModalContent';
import { Icon } from '@iconify/react';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Switch,
} from '@nextui-org/react';
import { useState } from 'react';
import { type Features } from '@/config/features';
import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';

const commonButtonClass = 'text-white shadow-lg px-11 h-[46px] bg-gradient-to-b ';

export default function Features({ features }: { features: Features }) {
  const [type, setType] = useState(Object.keys(features)[0]);
  const { openApplyModal } = useApplyModal();
  const [show, setShow] = useState(false);

  return (
    <section className="wrapper  max-sm:hidden">
      <Switch
        checked={show}
        onChange={() => setShow(!show)}
        classNames={{ label: 'text-lg text-black-333', base: 'flex mx-auto gap-6 mb-10' }}
      >
        开启各版本功能对比
      </Switch>

      {show && (
        <div className="pb-32">
          <table className="w-full border border-b-0 border-default-200 shadow-md">
            <tr>
              <td className="border-r border-default-200">
                <div className="flex items-center justify-center">
                  <TypeSelector value={type} features={features} onChange={setType} />
                </div>
              </td>
              <td className="border-r border-default-200 w-[calc(10vw+1px)] py-5" rowSpan={2}>
                <div className="text-3xl text-center mb-5">标准版</div>
                <div className="text-center">
                  <Button
                    radius="full"
                    size="lg"
                    className={commonButtonClass + 'from-[#35caf2] to-[#33afe6]'}
                    onClick={() => openApplyModal()}
                  >
                    立即购买
                  </Button>
                </div>
              </td>
              <td className="border-r border-default-200 w-[calc(10vw+1px)]" rowSpan={2}>
                <div className="text-3xl text-center mb-5">专业版</div>
                <div className="text-center">
                  <Button
                    radius="full"
                    size="lg"
                    className={commonButtonClass + 'from-[#7C7CF5] to-[#616fe8]'}
                    onClick={() => openApplyModal()}
                  >
                    立即购买
                  </Button>
                </div>
              </td>
              <td className="border-r border-default-200 w-[calc(10vw+1px)]" rowSpan={2}>
                <div className="text-3xl text-center mb-5">旗舰版</div>
                <div className="text-center">
                  <Button
                    radius="full"
                    size="lg"
                    className={commonButtonClass + 'from-[#FF6B06] to-[#F75B06]'}
                    onClick={() => openApplyModal()}
                  >
                    立即购买
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td className="border border-b-0 border-default-200 text-center text-base font-bold">
                功能服务和权益
              </td>
            </tr>
          </table>
          <table className="w-full text-base">
            {Object.entries(features[type]).map(([key1, value1]) => (
              <tr key={key1}>
                {key1 && (
                  <td className="w-[12%] border border-default-200 text-center font-bold">
                    {key1}
                  </td>
                )}
                <td className="w-[85%] border border-default-200">
                  <table className="w-full ">
                    {Object.entries(value1).map(([key2, value2], index) => (
                      <tr key={key2}>
                        <td
                          className={`w-[15%] border-r border-default-200 text-center ${index < Object.keys(value1).length - 1 ? 'border-b' : ''}`}
                        >
                          {key2}
                        </td>
                        <td className="w-[85%] border-b border-default-200 text-center">
                          <table className="w-full ">
                            {value2.map((item, index) => (
                              <tr key={index}>
                                <td
                                  className={`text-sm border-r border-default-200 text-left py-2 px-5 ${index < Object.keys(value2).length - 1 ? 'border-b' : ''}`}
                                >
                                  {item.label}
                                </td>
                                <td
                                  className={`w-[10vw] border-r border-default-200 ${index < Object.keys(value2).length - 1 ? 'border-b' : ''}`}
                                >
                                  <FeatureItem value={item.standard} />
                                </td>
                                <td
                                  className={`w-[10vw] border-r border-default-200 ${index < Object.keys(value2).length - 1 ? 'border-b' : ''}`}
                                >
                                  <FeatureItem value={item.major} />
                                </td>
                                <td
                                  className={`w-[10vw] border-default-200 ${index < Object.keys(value2).length - 1 ? 'border-b' : ''}`}
                                >
                                  <FeatureItem value={item.flagship} />
                                </td>
                              </tr>
                            ))}
                          </table>
                        </td>
                      </tr>
                    ))}
                  </table>
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </section>
  );
}

function FeatureItem({ value }: { value?: boolean | string }) {
  return (
    <div className="flex items-center justify-center">
      {typeof value === 'boolean' ? (
        <Icon
          icon={value ? 'bi:check-circle-fill' : 'fluent:subtract-12-filled'}
          className={`text-xl ${value ? 'text-[#92C162]' : 'text-[#CC3333]'}`}
        />
      ) : (
        value || ''
      )}
    </div>
  );
}

function TypeSelector({
  value,
  features,
  onChange,
}: {
  value: string;
  features: Features;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-[30px] font-bold flex items-center gap-4">
      {value}
      <Dropdown>
        <DropdownTrigger>
          <Button variant="light" className="min-w-max" onClick={() => setOpen(!open)}>
            <Image
              src={withCdnPrefix(`/custom/ciickd/icon/${open ? 'up' : 'down'}.svg`)}
              width={28}
              alt=""
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {Object.keys(features).map((key) => (
            <DropdownItem key={key} onClick={() => onChange(key)}>
              {key}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
