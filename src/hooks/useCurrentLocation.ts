import { useEffect, useState } from "react";

/** 현재위치 */
export const useCurrentLocation = (
  isLoaded: boolean,
  onSuccess?: (loc: google.maps.LatLngLiteral) => void
) => {
  const [location, setLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(loc);
        onSuccess?.(loc);
      },
      (err) => console.error("GPS 오류:", err),
      { enableHighAccuracy: true }
    );
  }, [isLoaded]);

  return location;
};
