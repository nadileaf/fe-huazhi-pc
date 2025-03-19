import { Icon } from '@iconify/react';
import { formatLocation } from '@/utils/format';

interface LocationDisplayProps {
  locations?: Common.NormalizedField.Location[];
  fields?: Array<keyof Common.NormalizedField.Location>;
  classNames?: {
    container?: string;
    icon?: string;
    text?: string;
  };
}

export default function LocationDisplay({
  locations,
  fields = ['city', 'district'],
  classNames,
}: LocationDisplayProps) {
  const formattedLocation = formatLocation(locations, fields as any);

  if (!formattedLocation) return null;

  return (
    <span className={`flex items-center gap-1 ${classNames?.container}`}>
      <Icon icon="akar-icons:location" className={`text-default-500 ${classNames?.icon}`} />
      <span className={classNames?.text}>{formattedLocation}</span>
    </span>
  );
}
