import Geolocation, {GeoError, GeoPosition} from "react-native-geolocation-service";

export const getLocation = (
  callback?: (position?: GeoPosition) => void,
  error?: (e?: GeoError) => void,
) => {
  let location: Geolocation.GeoPosition | undefined;
  Geolocation.requestAuthorization('whenInUse');
  Geolocation.getCurrentPosition(
    position => {
      location = position;
      if (callback) callback(position);
    },
    e => {
      if (error) error(e);
      console.log('Error:', e);
    },
    {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 10000,
      showLocationDialog: true,
      forceRequestLocation: true,
    },
  );
  return location;
};

type Point = {
  lng: number;
  lat: number;
};
export const locationDistance = (p1: Point, p2: Point) => {
  const R = 6371e3; // metres
  const phi1 = (p1.lat * Math.PI) / 180;
  const phi2 = (p2.lat * Math.PI) / 180;
  const denPhi = ((p2.lat - p1.lat) * Math.PI) / 180;
  const denLam = ((p2.lng - p1.lng) * Math.PI) / 180;

  const a =
    Math.sin(denPhi / 2) * Math.sin(denPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(denLam / 2) *
      Math.sin(denLam / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in metres
};

export const isInArea = (cenPnt: Point, radius: number, curPnt: Point) => {
  const d = locationDistance(cenPnt, curPnt);
  return d <= radius;
};