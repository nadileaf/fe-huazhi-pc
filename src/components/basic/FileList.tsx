'use client';

import { getFileIcon, getFileType } from '@/utils/file';
import { formatFileUrl } from '@/utils/format';
import { Image } from '@nextui-org/react';
import { useMemo, useCallback } from 'react';
import { useFilePreview, downloadFile } from './FilePreview';
import { withCdnPrefix } from '@/utils/file';
import { FileArchive } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileMode = 'list' | 'grid' | 'card';

export default function FileList({
  data,
  maxDisplayCount,
  className,
  mode,
  size = 'md',
  addButton,
  onFileAction,
}: {
  data?: Common.NormalizedField.File[];
  maxDisplayCount?: number;
  className?: string;
  mode?: FileMode;
  size?: 'sm' | 'md';
  addButton?: React.ReactNode;
  onFileAction?: (file: Common.NormalizedField.File, index: number) => React.ReactNode;
}) {
  const showFiles = useMemo(
    () => (maxDisplayCount ? data?.slice(0, maxDisplayCount) : data),
    [data, maxDisplayCount],
  );

  const remainCount = useMemo(
    () => (maxDisplayCount && data?.length ? data.length - maxDisplayCount : 0),
    [data, maxDisplayCount],
  );

  return (
    <div
      className={cn(
        'flex flex-wrap',
        mode === 'card' && 'justify-between',
        mode === 'list' && 'flex-col',
        'gap-4',
        className,
      )}
    >
      {showFiles?.map((file, index) => (
        <div key={index} className="relative group">
          <FileItem file={file} mode={mode} size={size} actions={onFileAction?.(file, index)} />
        </div>
      ))}
      {addButton}
      {remainCount > 0 && <div className="text-gray-400 text-sm">还有{remainCount}个文件</div>}
    </div>
  );
}

export function FileItem({
  file,
  mode,
  size = 'md',
  actions,
}: {
  file: Common.NormalizedField.File;
  mode?: FileMode;
  size?: 'sm' | 'md';
  actions?: React.ReactNode;
}) {
  const sizeClass = useMemo(() => {
    if (size === 'sm') return 'w-12 h-12';
    return 'w-20 h-20';
  }, [size]);

  const fileType = useMemo(() => getFileType(file.fileName || file.key), [file.fileName, file.key]);
  const { previewFile } = useFilePreview();

  const fileProps = useMemo(
    () => ({
      url: formatFileUrl(file.key),
      title: file.fileName,
      fileName: file.fileName,
    }),
    [file],
  );

  const handleClickFile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      previewFile([fileProps], true);
    },
    [fileProps, previewFile],
  );

  const handleDownload = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      downloadFile(fileProps);
    },
    [fileProps],
  );

  const FilePreview = useCallback(() => {
    const commonProps = {
      src: formatFileUrl(file.key),
      alt: '',
    };
    switch (fileType) {
      case 'image':
        return (
          <Image
            {...commonProps}
            width={size === 'sm' ? 100 : 200}
            height={size === 'sm' ? 100 : 200}
            classNames={{
              img: cn(mode === 'card' ? 'w-20 h-20' : sizeClass, 'object-contain'),
            }}
          />
        );
      case 'video':
        return (
          <video
            {...commonProps}
            width={size === 'sm' ? 100 : 200}
            height={size === 'sm' ? 100 : 200}
            controls
          />
        );
      case 'audio':
        return <audio src={commonProps.src} controls />;
      default:
        return (
          <Image
            src={getFileIcon(file.key || file.fileName)}
            width={size === 'sm' ? 48 : 60}
            height={size === 'sm' ? 48 : 60}
            radius="sm"
            classNames={{
              wrapper: mode === 'card' ? 'p-0 flex-shrink-0' : 'p-0',
            }}
            alt=""
          />
        );
    }
  }, [file, fileType, mode, size, sizeClass]);

  if (mode === 'card') {
    return (
      <div
        className="bg-white w-full rounded-lg border-1 border-[#ccc] shadow pt-4 pb-7 px-6 w-[48%] mb-8 cursor-pointer hover:border-primary"
        onClick={handleClickFile}
      >
        <Image
          src={withCdnPrefix('/custom/ciickd/icon/download.svg')}
          width={29}
          alt=""
          classNames={{ wrapper: 'ml-auto cursor-pointer' }}
          onClick={handleDownload}
        />
        {actions}
        <div className="flex items-center gap-2">
          <FilePreview />
          <div className="text-2xl text-black-333 truncate">{file.fileName}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex gap-2 cursor-pointer ${
        mode === 'list' ? 'items-center' : 'flex-col max-w-20'
      } `}
      onClick={handleClickFile}
    >
      {actions}
      <div
        className={`bg-gray-100 flex items-center justify-center rounded-md overflow-hidden ${
          mode === 'list' ? 'w-8 h-8' : sizeClass
        }`}
      >
        <FilePreview />
      </div>
      <div className="text-default-500 text-xs truncate" title={file.fileName}>
        {file.fileName}
      </div>
    </div>
  );
}
