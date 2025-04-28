import React, { useMemo, useState } from 'react';
import { Button, Image } from '@nextui-org/react';
import { downloadByUrl, generateUrl } from '@/utils/common';
import { getFileExtension, getFileType } from '@/utils/file';
import { Icon } from '@iconify/react';
import { Base64 } from 'js-base64';
import { useDebouncedEffect } from '@/hooks/useHooks';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import Loading from './Loading';

interface FileProps {
  url: string;
  fileName?: string;
  title?: string;
}

interface Props {
  files: FileProps[];
  downloadable?: boolean;
}

export function downloadFile(file: FileProps) {
  if (!file) return;

  const url =
    file.fileName && !file.url.includes('oss')
      ? generateUrl(file.url, {
          'response-content-disposition': `attachment;filename=${file.fileName}`,
        })
      : file.url;
  console.log('downloadFile url', url, file.fileName);
  downloadByUrl(url, file.fileName);
}

export function useFilePreview() {
  const { openModal } = useMessageBoxContext();

  function previewFile(files: FileProps[], downloadable?: boolean) {
    openModal({
      body: <FilePreview files={files} downloadable={downloadable} />,
      classNames: { base: 'w-[80vw] h-[80vh] max-w-full' },
    });
  }
  return { previewFile };
}

export default function FilePreview({ files, downloadable }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentFile = files[currentIndex];

  const fileType = useMemo(
    () => getFileType(currentFile.fileName || '') || getFileType(currentFile?.url),
    [currentFile],
  );

  const [loading, setLoading] = useState(false);

  useDebouncedEffect(
    () => {
      console.log('currentFile', currentFile, fileType);
      if (currentFile && fileType && !['image', 'video'].includes(fileType)) {
        renderFile();
      }
    },
    [currentFile, fileType],
    300,
  );

  function renderFile() {
    setLoading(true);
    const urlParam = getFileExtension(currentFile.url)
      ? currentFile.url
      : generateUrl(currentFile.url, { fileName: currentFile.fileName });
    const url = generateUrl(process.env.NEXT_PUBLIC_FILE_PREVIEW_URL, {
      url: Base64.encode(urlParam),
      watermarkTxt: '华智出海人才',
    });
    createIframe('src', url);
  }

  async function createIframe(attr: 'src' | 'srcdoc', data: string) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'width: 100%;height: 100%;overflow-y: auto;backgroundColor:#fff;');
    iframe.onload = () => setLoading(false);
    iframe[attr] = data;
    document.querySelector('#file-preview')?.appendChild(iframe);
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between pr-10">
        <div className="flex-1 overflow-hidden overflow-ellipsis text-xl leading-10">
          {currentFile?.title || currentFile?.fileName || '文件预览'}
        </div>
        {downloadable && (
          <Button onClick={() => downloadFile(currentFile)}>
            <Icon icon="bi:cloud-download" />
            <span>下载</span>
          </Button>
        )}
      </div>
      <Loading loading={loading}>
        <div
          id="file-preview"
          className={`flex items-center justify-center min-h-[100px] h-full flex-1 ${files.length > 1 ? 'px-10' : ''}`}
        >
          {fileType === 'image' && (
            <Image
              src={currentFile.url}
              alt={currentFile.title}
              width={600}
              height={400}
              className="object-contain"
            />
          )}
          {fileType === 'video' && (
            <video src={currentFile.url} controls width="600" height="400" />
          )}
        </div>
      </Loading>

      {files && files.length > 1 && (
        <>
          {currentIndex > 0 && (
            <Button
              className="absolute left-0 top-1/2 transform -translate-y-1/2"
              variant="flat"
              isIconOnly
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              <Icon icon="ri:arrow-left-s-line" />
            </Button>
          )}
          {currentIndex < files.length - 1 && (
            <Button
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              variant="flat"
              isIconOnly
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              <Icon icon="ri:arrow-right-s-line" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}
