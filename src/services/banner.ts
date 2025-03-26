import { formatFileUrl } from '@/utils/format';
import { mesoorSpacePrefixUrl, request } from '.';
import { type QueryTasksRes } from './task';

export type Banner = { name: string; url: string; seats: string; link?: string };

const defaultBanner: Banner[] = [
  { url: 'https://cdn-fe.mesoor.com/custom/ciickd/banner-1.png', name: '默认1', seats: '1' },
  { url: 'https://cdn-fe.mesoor.com/custom/ciickd/banner-2.png', name: '默认2', seats: '1' },
  { url: 'https://cdn-fe.mesoor.com/custom/ciickd/banner-3.png', name: '默认3', seats: '1' },
];

export const bannerService = {
  async query() {
    try {
      const result = await request.get<QueryTasksRes<'NationalBanner'>>(
        mesoorSpacePrefixUrl(`/mini-app/v1/banners`),
        undefined,
        {
          handleResponseData: false,
        },
      );
      const res = transformBanners(result.data);
      return res.length ? res : defaultBanner;
    } catch (error) {
      console.error(error);
      return defaultBanner;
    }
  },
};
function transformBanners(data: TaskModel.Task<'SquareBanner' | 'NationalBanner'>[]) {
  const banners: Banner[] = data?.map((item) => {
    const fields = item.taskPayload?.payload?.data.standardFields;
    return {
      name: fields?.name ?? '',
      url: formatFileUrl(fields?.bannerFile.key ?? '', { forceCDN: true }),
      seats: fields?.bannerSeats ?? '',
    };
  });
  banners.sort((a, b) => a.seats.localeCompare(b.seats));
  return banners.length ? banners : defaultBanner;
}
