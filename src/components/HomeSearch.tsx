'use client';

import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

// 定义过滤器选项类型
type FilterOption = {
  key: string;
  label: string;
  options: { key: string; label: string }[];
};

// 过滤器配置
const filters: FilterOption[] = [
  {
    key: 'country',
    label: '国家',
    options: [
      { key: 'all', label: '全部' },
      { key: 'china', label: '中国' },
      { key: 'usa', label: '美国' },
      // ... 更多国家选项
    ],
  },
  {
    key: 'position',
    label: '职能',
    options: [
      { key: 'all', label: '全部' },
      { key: 'tech', label: '技术' },
      { key: 'design', label: '设计' },
      // ... 更多职能选项
    ],
  },
  {
    key: 'industry',
    label: '行业',
    options: [
      { key: 'all', label: '全部' },
      { key: 'internet', label: '互联网' },
      { key: 'finance', label: '金融' },
      // ... 更多行业选项
    ],
  },
  {
    key: 'salary',
    label: '薪资',
    options: [
      { key: 'all', label: '全部' },
      { key: '10k-20k', label: '10k-20k' },
      { key: '20k-30k', label: '20k-30k' },
      // ... 更多薪资范围
    ],
  },
  {
    key: 'postDate',
    label: '发布时间',
    options: [
      { key: 'all', label: '全部' },
      { key: 'today', label: '今天' },
      { key: '3days', label: '3天内' },
      { key: 'week', label: '一周内' },
      // ... 更多时间选项
    ],
  },
];

export default function SearchBar() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-8 bg-white rounded-lg shadow-sm">
      <div className="flex gap-4 items-center">
        {/* 搜索输入框 */}
        <div className="flex-1">
          <Input
            placeholder="国家经理"
            startContent={<SearchIcon className="text-gray-400" size={20} />}
            className="w-full"
            size="lg"
          />
        </div>

        {/* 搜索按钮 */}
        <Button color="primary" size="lg">
          搜索
        </Button>
      </div>

      {/* 过滤器选项 */}
      <div className="flex gap-4 mt-4 items-center">
        {filters.map((filter) => (
          <Dropdown key={filter.key}>
            <DropdownTrigger>
              <Button
                variant="light"
                endContent={<ChevronDownIcon size={16} />}
                className={selectedFilters[filter.key] ? 'text-primary' : ''}
              >
                {filter.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label={filter.label}
              onAction={(key) => {
                setSelectedFilters((prev) => ({
                  ...prev,
                  [filter.key]: key as string,
                }));
              }}
              selectedKeys={
                selectedFilters[filter.key] ? new Set([selectedFilters[filter.key]]) : new Set()
              }
              selectionMode="single"
            >
              {filter.options.map((option) => (
                <DropdownItem key={option.key}>{option.label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        ))}

        {/* 清空选项 */}
        {Object.keys(selectedFilters).length > 0 && (
          <Button variant="light" color="default" onPress={() => setSelectedFilters({})}>
            清空筛选
          </Button>
        )}
      </div>
    </div>
  );
}
