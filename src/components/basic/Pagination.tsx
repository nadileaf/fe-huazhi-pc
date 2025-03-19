import { Button, cn } from '@nextui-org/react';
import { useMemo } from 'react';

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  current = 1,
  total = 1,
  onChange,
  className,
}: PaginationProps) {
  const buttonClass = '!w-8 bg-white text-black-666 shadow hover:bg-gray-100 transition-colors';

  const hasPreviousPage = current > 1;
  const hasNextPage = current < total;

  const handlePrevious = () => {
    if (hasPreviousPage) {
      onChange(current - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onChange(current + 1);
    }
  };

  const pageNumbers = useMemo(() => {
    const pageNumbers = [];
    const showPages = 10;
    const sidePages = Math.floor(showPages / 2); // 当前页码两侧要显示的页码数

    let startPage = Math.max(current - sidePages, 1);
    const endPage = Math.min(startPage + showPages - 1, total);

    // 调整startPage，确保始终显示showPages个数的页码（如果总页数足够的话）
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(endPage - showPages + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [current, total]);

  return (
    <div className={cn('flex items-center gap-2 py-2', className)}>
      {hasPreviousPage && (
        <Button onClick={handlePrevious} size="sm" variant="solid" className={buttonClass}>
          {`<`}
        </Button>
      )}

      <div className="flex gap-1">
        {pageNumbers.map((page) => (
          <Button
            key={page}
            onClick={() => onChange(page)}
            size="sm"
            variant="solid"
            color={current === page ? 'primary' : 'default'}
            className={cn(
              buttonClass,
              current === page ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-gray-100',
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {hasNextPage && (
        <Button onClick={handleNext} size="sm" variant="solid" className={buttonClass}>
          {`>`}
        </Button>
      )}
    </div>
  );
}
