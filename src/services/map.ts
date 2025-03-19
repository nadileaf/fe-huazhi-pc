import request from '@/utils/request';
import { isArray } from 'lodash-es';

const MAP_KEY = 'c65d844ddc728f797c572eb32c977ab1';

export const mapService = {
  async getLocation() {
    return new Promise<{ longitude: number; latitude: number }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
            });
          },
          (error) => {
            reject(error);
          },
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  },
  /** 地理编码 https://lbs.amap.com/api/webservice/guide/api/georegeo#geo */
  async getGeo(params: { city?: string }) {
    const { geocodes } = await request.get<{
      geocodes: {
        location: string;
      }[];
    }>(
      `/map-api/v3/geocode/geo`,
      {
        city: params.city,
        address: params.city,
        key: MAP_KEY,
        output: 'json',
      },
      { handleResponseData: false },
    );

    return geocodes[0].location;
  },

  // 逆地理编码
  async getRegeo(params: { longitude: number; latitude: number; poitype?: string }) {
    const { regeocode } = await request.get<{
      regeocode: {
        formatted_address: string;
        addressComponent: {
          city: string;
          district: string;
          province: string;
        };
      };
    }>(
      `/map-api/v3/geocode/regeo`,
      {
        location: `${params.longitude},${params.latitude}`,
        key: MAP_KEY,
        extensions: 'base',
        poitype: params.poitype,
        radius: 1000,
        output: 'json',
      },
      { handleResponseData: false },
    );

    if (isArray(regeocode.addressComponent.city)) {
      regeocode.addressComponent.city = regeocode.addressComponent.province;
    }

    return regeocode;
  },
};
