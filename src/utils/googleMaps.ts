export const createPlacesService = (
  map: google.maps.Map | null
): google.maps.places.PlacesService | null => {
  if (!window.google || !map) return null;
  return new google.maps.places.PlacesService(map);
};
