import { Input, Button } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import { memo, useCallback } from 'react';

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSearch: () => void;
};

export default memo(function SearchBar({ inputValue, setInputValue, handleSearch }: Props) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <div className="flex gap-4 items-center">
      {/* 搜索输入框 */}
      <div className="flex-1">
        <Input
          value={inputValue}
          onValueChange={setInputValue}
          placeholder="请输入职位名称"
          startContent={<SearchIcon className="text-gray-400" size={20} />}
          className="w-full"
          size="lg"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 搜索按钮 */}
      <Button color="primary" size="lg" onPress={handleSearch}>
        搜索
      </Button>
    </div>
  );
});
