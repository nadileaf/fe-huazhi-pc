import create from 'zustand';
import { mapService } from '@/services/map';

type Addr = {
  city?: string;
  district?: string;
  province?: string;
};

interface State {
  location?: {
    longitude: number;
    latitude: number;
    addr?: Addr;
  };
  locationLoading?: boolean;
  currentLocation: {
    city: string;
    geoPoint: Common.NormalizedField.GeoPoint;
  };
}

interface Actions {
  setCurrentLocation: (city: string) => Promise<void>;
  initLocation: () => Promise<void>;
}

export const useAppStore = create<State & Actions>((set, get) => ({
  location: undefined,
  locationLoading: false,
  currentLocation: {
    city: '',
    geoPoint: {
      longitude: 0,
      latitude: 0,
    },
  },
  setCurrentLocation: async (city: string) => {
    const state = get();
    if (city !== state.currentLocation.city) {
      if (city) {
        const geo = await mapService.getGeo({ city });
        const [long, lat] = geo.split(',');
        const geoPoint = {
          longitude: Number(long),
          latitude: Number(lat),
        };

        set({
          currentLocation: {
            geoPoint,
            city,
          },
        });
      } else {
        set({
          currentLocation: {
            geoPoint: {
              longitude: 0,
              latitude: 0,
            },
            city: '',
          },
        });
      }
    }
  },
  async initLocation() {
    try {
      set({ locationLoading: true });
      const location = await mapService.getLocation();
      const regeocode = await mapService.getRegeo(location);
      const addr = regeocode.addressComponent as Addr;
      set((state) => ({
        location: {
          ...location,
          addr,
        },
        locationLoading: false,
        currentLocation: {
          city: addr.city || state.currentLocation.city,
          geoPoint: {
            longitude: location.longitude,
            latitude: location.latitude,
          },
        },
      }));
    } finally {
      set({ locationLoading: false });
    }
  },
}));
