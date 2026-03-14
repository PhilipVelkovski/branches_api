export interface BranchDTO {
  id: string;
  name: string;
  address: string;
  city: string;
  workingHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}