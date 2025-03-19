import { withCdnPrefix } from '@/utils/file';
import { formatDate } from '@/utils/format';
import { Image } from '@nextui-org/react';
import NoData from '../basic/NoData';

export interface Props {
  certificates?: ResumeModel.Certificate[];
}

export default function Certificates({ certificates }: Props) {
  return (
    <div className="w-full overflow-x-auto pb-12">
      {certificates?.length ? (
        <div className="flex gap-20">
          {certificates.map((certificate, idx) => (
            <div className="flex-shrink-0" key={idx}>
              <div className="relative flex items-center justify-center">
                <Image
                  src={withCdnPrefix('/custom/ciickd/certificate/certificate.png')}
                  width={180}
                  alt=""
                ></Image>
                <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] z-[99] text-center max-w-[120px] flex flex-col gap-3">
                  <span>{certificate.name}</span>
                  <span className="text-xs">{formatDate(certificate.date)}</span>
                </div>
              </div>
              <div className="mt-8  flex items-center justify-between">
                <Image
                  src={withCdnPrefix('/custom/ciickd/certificate/left.png')}
                  width={34}
                  height={88}
                  alt=""
                ></Image>
                <div className="">
                  <div className="text-center text-lg font-light">
                    {formatDate(certificate.date)}
                  </div>
                  <div className="my-1 text-center text-xl font-semibold">{certificate.name}</div>
                  <div className="text-center text-sm text-black-666">
                    已验证 ({certificate.source || '-'})
                  </div>
                </div>
                <Image
                  src={withCdnPrefix('/custom/ciickd/certificate/right.png')}
                  width={34}
                  height={88}
                  alt=""
                ></Image>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
