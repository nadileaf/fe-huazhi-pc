import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { type FilterOptionConfig } from '@/config/entity';
import { useFilterOption } from '@/hooks/useFilterOption';
import { ChevronDownIcon } from 'lucide-react';

interface Props {
  config: FilterOptionConfig[number];
  values: SearchModel.FilterValueType[];
  onChange: (values: SearchModel.FilterValueType[]) => void;
}

export default function SelectFilter({ config, values, onChange }: Props) {
  const { getOptionLabel, getValue } = useFilterOption();

  // 转换选项数据
  const items =
    config.values?.map((item) => ({
      label: getOptionLabel(item, config),
      value: getValue(item),
    })) || [];

  // 当前选中的选项集合
  const selectedKeys = new Set(
    items
      .filter((item) => values?.includes(item.value) && item.label)
      .map((item) => item.label) as string[],
  );

  // 处理选项变更
  function handleSelectionChange(keys: Set<string>) {
    const newValues = Array.from(keys)
      .map((key) => items.find((item) => item.label === key)?.value)
      .filter((value): value is SearchModel.FilterValueType => value !== undefined);

    onChange(newValues);
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          color={selectedKeys.size > 0 ? 'primary' : 'default'}
          endContent={<ChevronDownIcon size={16} />}
        >
          {config.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={`Filter by ${config.label}`}
        closeOnSelect={false}
        selectedKeys={selectedKeys}
        selectionMode={config.multiple ? 'multiple' : 'single'}
        onSelectionChange={(keys) => handleSelectionChange(keys as Set<string>)}
        className="max-h-[400px] overflow-y-auto"
      >
        {items.map((item) => (
          <DropdownItem key={item.label}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
