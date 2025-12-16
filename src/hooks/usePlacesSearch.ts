import type { PlaceResultType } from "@/types/travel.type";
import { createPlacesService } from "@/utils/googleMaps";

/** place 검색 */
export const usePlacesSearch = (map: google.maps.Map | null) => {
  const textSearch = (query: string, onSuccess: (results: PlaceResultType[]) => void) => {
    const service = createPlacesService(map);
    if (!service || !query.trim()) return;

    service.textSearch({ query }, (places, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && places) {
        onSuccess(
          places.map((p) => ({
            name: p.name ?? "",
            formatted_address: p.formatted_address ?? "",
            location: { lat: p.geometry?.location?.lat() ?? 0, lng: p.geometry?.location?.lng() ?? 0 },
            distanceKm: 0,
            placeId: p.place_id ?? "",
          }))
        );
      }
    });
  };

  const getDetail = (placeId: string, onSuccess: (result: PlaceResultType) => void) => {
    const service = createPlacesService(map);
    if (!service) return;

    service.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        onSuccess({
          name: place.name ?? "",
          formatted_address: place.formatted_address ?? "",
          location: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
          distanceKm: 0,
          placeId: place.place_id ?? "",
        });
      }
    });
  };

  return { textSearch, getDetail };
};
