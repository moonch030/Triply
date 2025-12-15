// TravelSearchInput.tsx
import React, { useRef, useState, useEffect } from "react";
import TravelList from "./TravelList";

interface PlaceResultType {
  name: string;
  formatted_address: string;
  location: google.maps.LatLngLiteral;
  distanceKm: number;
  placeId: string;
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
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // 키보드 선택 인덱스
  const autocompleteRef = useRef<HTMLDivElement>(null);

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
      setSelectedIndex(-1);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: query,
        location: myLocation ? new window.google.maps.LatLng(myLocation.lat, myLocation.lng) : undefined,
        radius: 50000,
      },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
          setSelectedIndex(-1); // 새로 뜨면 인덱스 초기화
        } else {
          setSuggestions([]);
          setSelectedIndex(-1);
        }
      }
    );
  };

  /** 선택한 자동완성 장소 */
  const handleSelectSuggestion = (placeId: string, placeName?: string) => {
    if (!mapRef.current || !window.google) return;

    setSuggestions([]); // 클릭/선택 즉시 리스트 닫기
    setSelectedIndex(-1);

    const service = new window.google.maps.places.PlacesService(mapRef.current);
    service.getDetails({ placeId }, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
        const loc = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        setCenter(loc);
        setMarkers([loc]);
        if (placeName) setQuery(placeName);

        setResults([
          {
            name: place.name ?? "",
            formatted_address: place.formatted_address ?? "",
            location: loc,
            distanceKm: myLocation
              ? Math.round(
                  (window.google.maps.geometry.spherical.computeDistanceBetween(
                    new window.google.maps.LatLng(myLocation.lat, myLocation.lng),
                    new window.google.maps.LatLng(loc.lat, loc.lng)
                  ) / 1000) * 10
                ) / 10
              : 0,
            placeId: place.place_id ?? "",
          },
        ]);
      }
    });
  };

  /** 텍스트 검색 */
  const handleSearch = () => {
  if (!mapRef.current || !window.google || !myLocation) return;

  const service = new window.google.maps.places.PlacesService(mapRef.current);
  service.textSearch({ query }, (places, status) => {
    if (status === window.google.maps.places.PlacesServiceStatus.OK && places) {
      const mapped = places.map((p) => {
        const loc = {
          lat: p.geometry?.location?.lat() ?? 0,
          lng: p.geometry?.location?.lng() ?? 0,
        };
        const distMeters = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(myLocation.lat, myLocation.lng),
          new window.google.maps.LatLng(loc.lat, loc.lng)
        );
        return {
          name: p.name ?? "",
          formatted_address: p.formatted_address ?? "",
          location: loc,
          distanceKm: Math.round((distMeters / 1000) * 10) / 10,
          placeId: p.place_id ?? "",
        };
      });

      // 거리 순 정렬 (오름차순)
      mapped.sort((a, b) => a.distanceKm - b.distanceKm);

      setResults(mapped);

      if (mapped.length > 0) {
        setCenter(mapped[0].location);
        // 기존 마커 유지하고 새 마커 추가
        setMarkers((prev) => [...prev, ...mapped.map((p) => p.location)]);
      }
    } else {
      setResults([]);
      console.warn("검색 실패:", status);
    }
  });
};

  /** 외부 클릭 시 자동완성 리스트 닫기 */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (autocompleteRef.current && !autocompleteRef.current.contains(target)) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  /** 키보드 제어 */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        const s = suggestions[selectedIndex];
        handleSelectSuggestion(s.place_id, s.description);
      } else {
        handleSearch();
      }
    }
  };

  if (!mapLoaded) return <div>로딩 중...</div>;

  return (
    <div className="p-3 w-[700px] h-screen overflow-auto">
      <div
        ref={autocompleteRef}
        style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12, position: "relative" }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="장소 검색 (예: 서울 맛집)"
            value={query}
            onChange={(e) => { setQuery(e.target.value); handleAutocomplete(); }}
            onKeyDown={handleKeyDown}
            style={{ flex: 1, padding: 10 }}
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        {/* 자동완성 리스트 */}
        {suggestions.length > 0 && (
          <div style={{ position: "absolute", top: 42, left: 0, right: 0, background: "#fff", border: "1px solid #ccc", zIndex: 10 }}>
            {suggestions.map((s, idx) => (
              <div
                key={s.place_id}
                style={{
                  padding: 8,
                  cursor: "pointer",
                  backgroundColor: idx === selectedIndex ? "#eee" : "#fff",
                }}
                onMouseDown={() => handleSelectSuggestion(s.place_id, s.description)} // onMouseDown으로 blur 방지
              >
                {s.description}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 검색 결과 TravelList */}
      <div>
        {results.map((r, i) => (
          <TravelList
            key={i}
            placeId={r.placeId}
            onClick={() => {
              setSuggestions([]);
              setSelectedIndex(-1);
              setCenter(r.location);
              setMarkers([r.location]);
            }}
          />
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
