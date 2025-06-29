import { Image } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import LocationDisplay from '@/components/basic/LocationDisplay';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { formatFileUrl } from '@/utils/format';

interface CompanyCardProps {
  data: CompanyModel.Company;
  onClick?: (data: CompanyModel.Company) => void;
}

export default function CompanyCard({ data, onClick }: CompanyCardProps) {
  const router = useRouter();
  const standardFields = useMemo(() => data?.data.standardFields, [data]);

  function handleClick() {
    if (onClick) onClick(data);
    else router.push(`/entity/Company/${data.meta.openId}`);
  }

  return standardFields ? (
    <div
      className="bg-white rounded-lg py-8 px-10 cursor-pointer shadow-md hover:shadow-lg transition-shadow overflow-hidden"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4 w-full">
        {standardFields.logo?.key && (
          <>
            <Image
              src={formatFileUrl(standardFields.logo?.key)}
              alt={standardFields.name}
              width={100}
              height={100}
              classNames={{ img: 'object-cover', wrapper: 'flex-shrink-0' }}
            />
            <div className="border-r-1 border-[#ccc] w-[1px] h-[120px] mx-5 flex-shrink-0"></div>
          </>
        )}
        <div className="flex-1 min-h-[80px] max-w-full overflow-hidden">
          <div className="text-xl font-medium mb-2 truncate">
            {standardFields.name}
            {standardFields.alias && ` (${standardFields.alias})`}
          </div>
          <div className="text-base text-[#666] min-h-[20px] truncate">
            {standardFields.profile}
          </div>
          <div className="mt-2 overflow-hidden">
            {standardFields.address ? (
              <LocationDisplay
                locations={[standardFields.address]}
                classNames={{ container: 'text-sm text-[#666] truncate' }}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
