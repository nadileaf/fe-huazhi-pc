import { type FilterOptionConfig } from '@/config/entity';

import { Tabs, Tab, Checkbox } from '@nextui-org/react';

interface Props {
  config: FilterOptionConfig[number];
  values: SearchModel.FilterValueType[];
  onChange: (values: SearchModel.FilterValueType[]) => void;
}

export default function TreeDictionaryFilter({ config, values, onChange }: Props) {
  if (!config.treeDictionary?.length) return null;

  const handleValueChange = (value: SearchModel.FilterValueType) => {
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];
    onChange(newValues);
  };

  return (
    <div className="w-[500px]">
      <Tabs
        aria-label="Tree Dictionary Options"
        color="primary"
        variant="underlined"
        classNames={{
          base: 'w-full overflow-x-scroll',
          tabList: 'gap-2',
        }}
      >
        {config.treeDictionary.map((parent) => (
          <Tab key={parent.value} title={parent.label}>
            <div className="grid grid-cols-3 gap-4 p-4">
              {parent.children?.map((child) => (
                <Checkbox
                  key={child.value}
                  isSelected={values.includes(child.value)}
                  onValueChange={() => handleValueChange(child.value)}
                  classNames={{ label: 'ml-1' }}
                >
                  {child.label}
                </Checkbox>
              ))}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
