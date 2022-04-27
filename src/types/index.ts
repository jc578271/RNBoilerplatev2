export interface RawCheckInOut {
  id: string;
  photo: string;
  lat: string;
  lng: string;
  time: number;
}

export interface RawUser {
  id: string,
  accessToken: string
}

export interface RawNote {
  id: string;
  value: string;
}
