import { Image } from '@nextui-org/react';
import { withCdnPrefix } from '@/utils/file';

export default function Banner() {
  return (
    <section className="w-full ">
      <Image
        src={withCdnPrefix('/custom/ciickd/website/contact/banner.png')}
        width={'100%'}
        height={'100%'}
        alt={``}
      ></Image>
    </section>
  );
}
