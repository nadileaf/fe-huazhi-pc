import React, { useMemo, useState } from 'react';
import { useRequest } from '@/hooks/useHooks';
import { getLocationData, type LocationOptions } from '@/services/dictionary';

import { Button, Input } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import { useAppStore } from '@/stores/app';

const HotCities = [
  '',
  '北京',
  '上海',
  '广州',
  '深圳',
  '杭州',
  '天津',
  '西安',
  '苏州',
  '武汉',
  '厦门',
  '长沙',
  '成都',
  '郑州',
  '重庆',
  '佛山',
  '合肥',
  '济南',
  '青岛',
  '南京',
  '东莞',
  '昆明',
  '南昌',
  '石家庄',
  '宁波',
  '福州',
];

export function useCitySelector() {
  const { openModal } = useMessageBoxContext();

  function openCitySelector(params: { value?: string; isLocationCity?: boolean }) {
    return openModal({
      body: ({ resolve, close }) => (
        <CitySelector
          {...params}
          onChange={() => {
            resolve?.();
            close?.();
          }}
        />
      ),
      size: '4xl',
      scrollBehavior: 'inside',
    });
  }
  return { openCitySelector };
}

export function CitySelector({
  value,
  onChange,
  isLocationCity,
}: {
  value?: string;
  onChange?: (val?: string) => void;
  isLocationCity?: boolean;
}) {
  const { currentLocation, setCurrentLocation } = useAppStore();

  function handleChange(val: string) {
    if (isLocationCity) {
      setCurrentLocation(val);
    }
    onChange?.(val);
  }

  const { data } = useRequest(() => getLocationData());
  const [search, setSearch] = useState('');

  const cityLetterGroup = useMemo(() => {
    const cities = data?.map((pro) => pro.children).flat();
    const cityLetterGroup = {} as { [key: string]: LocationOptions };
    cities?.forEach((city) => {
      const firstLetter = city.pinyin_prefix;
      if (!cityLetterGroup[firstLetter]) {
        cityLetterGroup[firstLetter] = [];
      }
      cityLetterGroup[firstLetter].push(city);
    });
    // cityLetterGroup排序
    const sortedCityLetterGroup = Object.keys(cityLetterGroup)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = cityLetterGroup[key];
          return acc;
        },
        {} as { [key: string]: LocationOptions },
      );
    return sortedCityLetterGroup;
  }, [data]);

  return (
    <div className="py-5 flex flex-col gap-8">
      <Input
        placeholder="搜索城市"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={<Icon icon="akar-icons:search" />}
        className="w-80 sticky top-0 z-10"
      />

      <div>
        <div className="text-default-400 text-sm mb-5">热门城市</div>
        <div className="flex flex-wrap gap-2">
          {HotCities.map((city) => (
            <Button
              variant="flat"
              size="sm"
              key={city}
              onClick={() => handleChange(city)}
              className="bg-default-50 hover:bg-default-200"
            >
              {city || '全国'}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {Object.keys(cityLetterGroup).map((letter) => (
          <div key={letter} className="group flex gap-5">
            <div className="font-bold text-default-400 text-base leading-8 group-hover:text-primary">
              {letter.toUpperCase()}
            </div>
            <div className="flex-1 flex items-center gap-2 flex-wrap">
              {cityLetterGroup[letter].map((city) => (
                <Button
                  variant="light"
                  size="sm"
                  key={city.value}
                  onClick={() => handleChange(city.label)}
                >
                  {city.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
