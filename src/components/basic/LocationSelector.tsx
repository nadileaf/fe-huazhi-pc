'use client';
import { Select, SelectItem, Input } from '@nextui-org/react';
import { useState, useEffect } from 'react';

import { locationService } from '@/services/location';
import { debounce, isEqual } from 'lodash-es';
import { useRequest } from '@/hooks/useHooks';

interface LocationSelectorProps {
  value?: Common.NormalizedField.Location;
  onChange?: (value: Common.NormalizedField.Location) => void;
}

export default function LocationSelector({ value = {}, onChange }: LocationSelectorProps) {
  const [innerValue, setInnerValue] = useState<Common.NormalizedField.Location>(value);
  const [address, setAddress] = useState(value?.address || '');

  const { data: cityTree } = useRequest(() => locationService.getCityTree());
  const { data: countries } = useRequest(() => locationService.getCountries());

  useEffect(() => {
    if (!isEqual(value, innerValue) && Object.keys(value || {}).length > 0) {
      setInnerValue(value);
      setAddress(value?.address || '');
    }
  }, [value]);

  const cities = cityTree?.find((p) => p.ext_name === innerValue.province)?.children ?? [];
  const districts = cities?.find((c) => c.ext_name === innerValue.city)?.children ?? [];

  const handleLocationChange = (
    type: 'country' | 'province' | 'city' | 'district',
    selectedValue: string,
  ) => {
    const provinceObj =
      type === 'province'
        ? cityTree?.find((p) => p.ext_name === selectedValue)
        : cityTree?.find((p) => p.ext_name === innerValue.province);

    const cityObj =
      type === 'city'
        ? provinceObj?.children?.find((c) => c.ext_name === selectedValue)
        : type === 'district'
          ? provinceObj?.children?.find((c) => c.ext_name === innerValue.city)
          : undefined;

    const districtObj =
      type === 'district'
        ? cityObj?.children?.find((d) => d.ext_name === selectedValue)
        : undefined;

    const updated = {
      country: type === 'country' ? selectedValue : innerValue.country || '中国',
      province:
        type === 'country'
          ? undefined
          : type === 'province'
            ? provinceObj?.ext_name
            : innerValue.province,
      city:
        type === 'country' || type === 'province'
          ? undefined
          : type === 'city'
            ? cityObj?.ext_name
            : innerValue.city,
      district:
        type === 'country' || type === 'province' || type === 'city'
          ? undefined
          : type === 'district'
            ? districtObj?.ext_name
            : innerValue.district,
      code: districtObj?.ext_id || cityObj?.ext_id || provinceObj?.ext_id,
      address,
    };

    setInnerValue(updated);
    onChange?.(updated);
  };

  const handleAddressChange = debounce((value: string) => {
    setAddress(value);
    const updated = { ...innerValue, address: value };
    onChange?.(updated);
  }, 300);

  if (!countries || !cityTree) return null;

  return (
    <div className="flex gap-2 w-full">
      <Select
        variant="bordered"
        label="国家"
        placeholder="中国"
        selectedKeys={innerValue.country ? [innerValue.country] : []}
        onChange={(e) => handleLocationChange('country', e.target.value)}
        className="w-[120px]"
      >
        {countries.map((country) => (
          <SelectItem key={country.name} value={country.name}>
            {country.name}
          </SelectItem>
        ))}
      </Select>

      {(!innerValue.country || innerValue.country === '中国') && (
        <>
          <Select
            variant="bordered"
            label="省份"
            placeholder="选择省份"
            selectedKeys={innerValue.province ? [innerValue.province] : []}
            onChange={(e) => handleLocationChange('province', e.target.value)}
            className="w-[120px]"
          >
            {cityTree.map((province) => (
              <SelectItem key={province.ext_name} value={province.ext_name}>
                {province.ext_name}
              </SelectItem>
            ))}
          </Select>

          <Select
            variant="bordered"
            label="城市"
            placeholder="选择城市"
            selectedKeys={innerValue.city ? [innerValue.city] : []}
            onChange={(e) => handleLocationChange('city', e.target.value)}
            className="w-[140px]"
            isDisabled={!innerValue.province}
          >
            {cities.map((city) => (
              <SelectItem key={city.ext_name} value={city.ext_name}>
                {city.ext_name}
              </SelectItem>
            ))}
          </Select>

          <Select
            variant="bordered"
            label="区县"
            placeholder="选择区县"
            selectedKeys={innerValue.district ? [innerValue.district] : []}
            onChange={(e) => handleLocationChange('district', e.target.value)}
            className="w-[140px]"
            isDisabled={!innerValue.city}
          >
            {districts.map((district) => (
              <SelectItem key={district.ext_name} value={district.ext_name}>
                {district.ext_name}
              </SelectItem>
            ))}
          </Select>
        </>
      )}

      {/* <Input
        label="详细地址"
        placeholder="请输入详细地址"
        value={address}
        onChange={(e) => handleAddressChange(e.target.value)}
        className="flex-1"
      /> */}
    </div>
  );
}
