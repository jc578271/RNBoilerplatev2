import {GeoPosition} from "react-native-geolocation-service";
import {useEffect, useState} from "react";
import { getLocation } from "./utils";

export const useLocation = (callback?:(position?:GeoPosition | undefined) => void, deps?: any[]) => {
  const [location, setLocation] = useState<GeoPosition | undefined>();
  useEffect(() => {
    getLocation(
      position => {
        setLocation(position);
        if (callback) callback(position)
      },
      e => {
        setLocation(undefined)
      },
    );
  }, deps&&[...deps]);

  return location;
};