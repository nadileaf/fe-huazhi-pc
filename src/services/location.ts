import request from '@/utils/request';
const FE_ASSETS_CDN_URL = 'https://cdn-fe.mesoor.com';

export type CityData = {
  value: string;
  label: string;
  pinyin: string;
  pinyin_prefix: string;
  ext_id: string;
  ext_name: string;
  children: CityData;
}[];

export const locationService = {
  cityTree: undefined as CityData | undefined,

  countries: undefined as { name: string }[] | undefined,
  async getCityTree() {
    if (this.cityTree) return this.cityTree;
    const res = await request.get<CityData>(FE_ASSETS_CDN_URL + '/data/city_tree.json', undefined, {
      handleResponseData: false,
    });
    if (res?.[res.length - 1]?.label === '国外') res.pop();
    this.cityTree = res;
    return this.cityTree;
  },
  async getCityTreeSimple() {
    return request.get<CityData>(FE_ASSETS_CDN_URL + '/data/city_tree_simple.json', undefined, {
      handleResponseData: false,
    });
  },

  async getCountries() {
    if (this.countries?.length) return this.countries;
    const res = await request.get<{ name: string }[]>(
      FE_ASSETS_CDN_URL + '/data/countries.json',
      undefined,
      {
        handleResponseData: false,
      },
    );
    this.countries = res.sort((a, b) => a.name.localeCompare(b.name));
    return this.countries;
  },
};
