import { useEffect, useState } from "react";

/** 자동완성 */
export const usePlacesAutocomplete = (
  query: string,
  myLocation: google.maps.LatLngLiteral | null
) => {
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  useEffect(() => {
    if (!window.google || !query.trim()) {
      setSuggestions([]);
      return;
    }

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: query,
        locationBias: myLocation
          ? new google.maps.Circle({
            center: new google.maps.LatLng(myLocation.lat, myLocation.lng),
            radius: 50000,
          })
          : undefined,
        // locationRestriction 추가 가능
      },
      (predictions, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      }
    );
  }, [query, myLocation]);

  return { suggestions, setSuggestions };
};