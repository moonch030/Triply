import React, { useRef, useState, useEffect } from "react";

interface PlaceResultType {
  name: string;
  formatted_address: string;
  location: google.maps.LatLngLiteral;
  distanceKm: number;
}

interface Props {
  mapLoaded: boolean;
  setCenter: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral>>;
  setMarkers: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral[]>>;
}

export default function TravelSearchInput({ mapLoaded, setCenter, setMarkers }: Props) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PlaceResultType[]>([]);
  const [suggestions, setSuggestions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [myLocation, setMyLocation] = useState<google.maps.LatLngLiteral | null>(null);

  /** 현재 위치 가져오기 */
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setMyLocation(loc);
        setCenter(loc);
        setMarkers([loc]);
      },
      (err) => console.error("GPS 오류:", err),
      { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    if (mapLoaded && !myLocation) getCurrentLocation();
  }, [mapLoaded]);

  /** 자동완성 */
  const handleAutocomplete = () => {
    if (!window.google || query === "") {
      setSuggestions([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query, location: myLocation ? new window.google.maps.LatLng(myLocation.lat, myLocation.lng) : undefined, radius: 50000 }, (predictions, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
        setSuggestions(predictions);
      } else {
        setSuggestions([]);
      }
    });
  };

  /** 선택한 장소 */
  const handleSelectSuggestion = (placeId: string) => {
    if (!mapRef.current || !window.google) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        const loc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };

        setCenter(loc);
        setMarkers([loc]);
        setQuery(place.name ?? "");
        setSuggestions([]);
      }
    });
  };

  /** 기존 검색 기능 */
  const handleSearch = () => {
    if (!mapRef.current || !window.google || !myLocation) return;

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    service.textSearch({ query }, (places, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && places) {
        const mapped = places.map((p) => {
          const loc = { lat: p.geometry?.location?.lat() ?? 0, lng: p.geometry?.location?.lng() ?? 0 };
          const distMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(myLocation.lat, myLocation.lng),
            new window.google.maps.LatLng(loc.lat, loc.lng)
          );

          return {
            name: p.name ?? "",
            formatted_address: p.formatted_address ?? "",
            location: loc,
            distanceKm: Math.round((distMeters / 1000) * 10) / 10,
          };
        });

        setResults(mapped);
        if (mapped.length > 0) {
          setCenter(mapped[0].location);
          setMarkers(mapped.map((p) => p.location));
        }
      } else {
        setResults([]);
        console.warn("검색 실패:", status);
      }
    });
  };

  if (!mapLoaded) return <div>로딩 중...</div>;

  return (
    <div style={{ padding: 20 }}>
      {/* 검색 input */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px", position: "relative" }}>
        <input
          type="text"
          placeholder="장소 검색 (예: 서울 맛집)"
          value={query}
          onChange={(e) => { setQuery(e.target.value); handleAutocomplete(); }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSearch}>검색</button>

        {/* 자동완성 리스트 */}
        {suggestions.length > 0 && (
          <div style={{ position: "absolute", top: "42px", left: 0, right: 0, background: "#fff", border: "1px solid #ccc", zIndex: 10 }}>
            {suggestions.map((s) => (
              <div
                key={s.place_id}
                style={{ padding: "8px", cursor: "pointer" }}
                onClick={() => handleSelectSuggestion(s.place_id)}
              >
                {s.description}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 검색 결과 */}
      <div>
        {results.map((r, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{r.name}</strong>
            <div>{r.formatted_address}</div>
            <div style={{ color: "#555" }}>{r.distanceKm} km</div>
          </div>
        ))}
      </div>

      {/* 숨겨진 map container */}
      <div
        ref={(el) => {
          if (el && !mapRef.current) {
            mapRef.current = new window.google.maps.Map(el, { center: myLocation ?? { lat: 0, lng: 0 }, zoom: 1 });
          }
        }}
        style={{ width: 0, height: 0 }}
      />
    </div>
  );
}
