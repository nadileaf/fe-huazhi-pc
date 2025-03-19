'use client';
import { Button } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import FileList from './FileList';
import useFileUpload from '@/hooks/useFileUpload';

interface FileUploadProps {
  value?: Common.NormalizedField.File[];
  onChange?: (files: Common.NormalizedField.File[]) => void;
  maxCount?: number;
  accept?: string;
  className?: string;
}

export default function FileUpload({
  value = [],
  onChange,
  maxCount,
  accept,
  className,
}: FileUploadProps) {
  const { loading, handleUpload, handleDelete } = useFileUpload({
    files: value,
    onFilesChange: onChange,
    accept,
  });

  return (
    <div className={className}>
      <FileList
        data={value}
        mode="grid"
        size="sm"
        maxDisplayCount={maxCount}
        className="flex flex-wrap gap-3"
        onFileAction={(file, index) => (
          <Button
            isIconOnly
            size="sm"
            variant="light"
            className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white z-10"
            onPress={() => handleDelete(file, index)}
          >
            <Icon icon="material-symbols:close" className="text-sm" />
          </Button>
        )}
        addButton={
          (!maxCount || value.length < maxCount) && (
            <div className="h-12 w-12 border-2 border-dashed border-default-300 rounded-lg flex items-center justify-center transition-colors cursor-pointer">
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Button
                  isIconOnly
                  variant="light"
                  className="!min-w-0 !w-full !h-full !p-0"
                  onPress={handleUpload}
                >
                  <Icon icon="material-symbols:add" className="text-xl text-default-400" />
                </Button>
              )}
            </div>
          )
        }
      />
    </div>
  );
}
