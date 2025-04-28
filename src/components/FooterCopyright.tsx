'use client';

import { withCdnPrefix } from '@/utils/file';
import Link from 'next/link';
import { useMessageBoxContext } from '@/providers/MessageBoxProvider';
import { Image } from '@nextui-org/react';
import { useFilePreview } from './basic/FilePreview';

export const FooterCopyright: React.FC = () => {
  const { previewFile } = useFilePreview();

  function handlePrivacy() {
    previewFile([{ url: withCdnPrefix('/custom/huazhi/privacy-0306.docx'), fileName: '隐私协议' }]);
  }
  function handleUserAgreement() {
    previewFile([{ url: withCdnPrefix('/custom/huazhi/service-0306.docx'), fileName: '用户协议' }]);
  }

  return (
    <div className="flex flex-wrap gap-5 justify-between mt-6 max-sm:mt-0 w-full text-base font-[305] max-md:mr-0.5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 max-sm:gap-5 max-sm:justify-center self-start max-md:max-w-full text-black-333 max-sm:text-sm">
        <Link href="https://beian.miit.gov.cn" target="_blank">
          Copyright © 2025 华智人才招聘
        </Link>
        {/* TODO */}
        {/* <ModalImageLink
          imagePath="/custom/ciickd/renliziyuanxukezheng.jpg"
          title="人力资源服务许可证"
        />
        <ModalImageLink imagePath="/custom/ciickd/yingyezhizhao.jpg" title="电子营业执照" /> */}
      </div>
      <div className="flex gap-10 max-sm:gap-6 whitespace-nowrap max-sm:mx-auto max-sm:text-sm">
        <span onClick={handlePrivacy}>隐私协议</span>
        <span onClick={handleUserAgreement}>用户协议</span>
      </div>
    </div>
  );
};

const ModalImageLink: React.FC<{
  imagePath: string;
  title: string;
}> = ({ imagePath, title }) => {
  const { openModal } = useMessageBoxContext();

  function handlePreview(url: string, fileName: string) {
    openModal({
      title: fileName,
      body: (
        <div className="py-8 flex items-center justify-center">
          <Image src={withCdnPrefix(url)} alt={fileName} width={800}></Image>
        </div>
      ),
      classNames: {
        base: 'modal-bg',
      },
      size: '5xl',
    });
  }

  return (
    <button
      className="max-sm:mx-auto hover:cursor-pointer"
      onClick={() => handlePreview(imagePath, title)}
    >
      {title}
    </button>
  );
};
