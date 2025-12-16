import { useEffect, useState } from "react";
import type { PlaceDetailsType } from "@/types/travel.type";

export const usePlaceDetails = (placeId: string) => {
  const [details, setDetails] = useState<PlaceDetailsType | null>(null);

  useEffect(() => {
    if (!window.google) return;

    const service = new window.google.maps.places.PlacesService(document.createElement("div"));

    service.getDetails(
      { placeId, fields: ["name", "opening_hours", "photos", "rating", "types"] },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          setDetails({
            name: place.name ?? "",
            openNow: place.opening_hours?.isOpen() ?? null,
            rating: place.rating ?? null,
            photos: place.photos?.map((p) => p.getUrl()) ?? [],
            openingHours: place.opening_hours?.weekday_text ?? null,
            categories: place.types ?? [],
          });
        }
      }
    );
  }, [placeId]);

  return details;
};
