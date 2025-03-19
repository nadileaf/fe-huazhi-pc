import useFileUpload from '@/hooks/useFileUpload';
import { formatImageUrl } from '@/utils/format';
import { Avatar } from '@nextui-org/react';
import { cn } from '@nextui-org/react';

type AvatarEditorProps = {
  value?: Common.NormalizedField.File;
  onChange: (files: Common.NormalizedField.File[]) => void;
  className?: string;
};
export function AvatarEditor({ value, onChange, className }: AvatarEditorProps) {
  const { handleUpload } = useFileUpload({ files: value ? [value] : [], onFilesChange: onChange });

  return (
    <div className={cn('avatar-wrapper w-24 h-24', className)}>
      <Avatar
        size="lg"
        src={formatImageUrl(value?.key)}
        classNames={{ base: 'w-full h-full' }}
        onClick={handleUpload}
      ></Avatar>
    </div>
  );
}
