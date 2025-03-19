import { Icon } from '@iconify/react';

interface ClearButtonProps {
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export default function ClearButton({ onClick, className }: ClearButtonProps) {
  return (
    <div
      className={`cursor-pointer text-default-400 hover:text-default-500 ${className || ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      <Icon icon="mdi:close" />
    </div>
  );
}
