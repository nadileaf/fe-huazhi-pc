'use client';
import { withCdnPrefix } from '@/utils/file';
import { Image, Button, type ButtonProps } from '@nextui-org/react';
import useApplyModal from '@/components/unlogin/ApplyModalContent';

export default function ApplyButton({ custom, ...props }: { custom?: boolean } & ButtonProps) {
  const { openApplyModal } = useApplyModal();

  if (custom) {
    return (
      <Button {...props} onClick={openApplyModal}>
        {props.children}
      </Button>
    );
  }

  return (
    <Button
      className="bg-white text-black-333 font-[450] text-lg max-sm:text-base w-48 h-12 max-sm:w-36 max-sm:h-9 lg:gap-5 max-sm:gap-2"
      radius="full"
      endContent={
        <Image
          src={withCdnPrefix('/custom/ciickd/website/arrow.png')}
          width={62}
          height={21}
        ></Image>
      }
      onClick={openApplyModal}
    >
      申请试用
    </Button>
  );
}
