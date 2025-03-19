import { Image } from '@nextui-org/react';
import Link from 'next/link';
import { withCdnPrefix } from '@/utils/file';
import { FooterCopyright } from './FooterCopyright';
import FooterLinks from './FooterLinks';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center pt-20 max-sm:pt-10 pb-32 max-sm:pb-20 w-full bg-white text-zinc-800 max-md:px-5 max-md:pb-24 max-md:max-w-full">
      <div className="wrapper w-full flex flex-col mb-0 px-0 max-md:mb-2.5">
        <div className="flex flex-wrap gap-5 justify-between w-full text-lg whitespace-nowrap font-[380] max-md:max-w-full">
          <Image
            src={withCdnPrefix('/custom/huazhi/logo.png')}
            alt=""
            width={110}
            classNames={{ wrapper: 'max-sm:hidden' }}
          />
          <nav className="flex max-sm:justify-between gap-10 max-sm:gap-0 my-auto max-sm:w-[85%] max-sm:mx-auto flex-wrap max-sm:hidden">
            <FooterLinks />
          </nav>
        </div>
        <hr className="shrink-0 mt-20 w-full h-px bg-neutral-400 bg-opacity-50 max-md:mt-10 max-md:mr-0.5" />
        <Image
          src={withCdnPrefix('/custom/huazhi/logo.png')}
          alt=""
          width={110 * 0.8}
          classNames={{ wrapper: 'sm:hidden mx-auto my-8' }}
        />
        <FooterCopyright />
      </div>
    </footer>
  );
}
