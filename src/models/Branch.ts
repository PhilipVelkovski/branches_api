export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}