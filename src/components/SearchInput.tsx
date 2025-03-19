import { Button, Input, type InputProps } from '@nextui-org/react';
import { Icon } from '@iconify/react';

export default function SearchInput({
  value,
  className,
  classNames,
  onChange,
  onSearch,
}: {
  value: string;
  className?: string;
  classNames?: InputProps['classNames'];
  onChange: (v: string) => void;
  onSearch: (v: string) => void;
}) {
  return (
    <Input
      value={value}
      onValueChange={onChange}
      onKeyDown={(e) => e.key === 'Enter' && onSearch(value)}
      placeholder="搜索职位关键词"
      size="lg"
      startContent={
        <Icon icon="akar-icons:search" className="flex-shrink-0 mx-2 text-xl text-default-500" />
      }
      endContent={
        value && (
          <Button size="lg" color="primary" variant="light" onClick={() => onSearch(value)}>
            搜索
          </Button>
        )
      }
      type="search"
      className={className ?? ''}
      classNames={{ inputWrapper: '!bg-white py-2 pr-2 h-16', ...classNames }}
    />
  );
}
