import { useState } from "react";
import TravelList from "./TravelList";
import useTravelMapStore from "@/store/TravelMapStore";
import { useShallow } from "zustand/react/shallow";
import useDebounce from "@/hooks/useDebounce";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { usePlacesAutocomplete } from "@/hooks/usePlacesAutocomplete";
import { usePlacesSearch } from "@/hooks/usePlacesSearch";
import { handleTravelInputKeyDown } from "@/utils/uiHandlers";

export default function TravelSearchInput() {
  const { map, setCenter, setMarkers, isLoaded, setHoveredIndex } = useTravelMapStore(
    useShallow((state) => ({
      map: state.map,
      setCenter: state.setCenter,
      setMarkers: state.setMarkers,
      isLoaded: state.isLoaded,
      setHoveredIndex: state.setHoveredIndex,
    }))
  );

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const [results, setResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const myLocation = useCurrentLocation(isLoaded, (loc) => {
    setCenter(loc);
    setMarkers([loc]);
  });

  const { suggestions, setSuggestions } = usePlacesAutocomplete(debouncedQuery, myLocation);
  const { textSearch, getDetail } = usePlacesSearch(map);

  const handleSelectSuggestion = (placeId: string, description?: string) => {
    setSuggestions([]);
    setSelectedIndex(-1);
    getDetail(placeId, (res) => {
      setQuery(description ?? res.name);
      setCenter(res.location);
      setMarkers([res.location]);
      setResults([res]);
    });
  };

  const handleSearch = () => {
    textSearch(query, (res) => {
      setResults(res);
      setCenter(res[0].location);
      setMarkers(res.map((r) => r.location));
    });
  };

  if (!isLoaded) return <div>로딩 중...</div>;

  return (
    <div className="p-3 w-[700px] h-screen overflow-auto">
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={query}
            placeholder="장소 검색"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) =>
              handleTravelInputKeyDown({
                e,
                suggestions,
                selectedIndex,
                setSelectedIndex,
                handleSelectSuggestion,
                handleSearch,
              })
            }
            style={{ flex: 1, padding: 10 }}
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        {suggestions.length > 0 && (
          <div style={{ position: "absolute", top: 42, left: 0, right: 0, background: "#fff", border: "1px solid #ccc", zIndex: 10 }}>
            {suggestions.map((s, idx) => (
              <div
                key={s.place_id}
                style={{ padding: 8, background: idx === selectedIndex ? "#eee" : "#fff", cursor: "pointer" }}
                onMouseDown={() => handleSelectSuggestion(s.place_id, s.description)}
              >
                {s.description}
              </div>
            ))}
          </div>
        )}
      </div>

      {results.map((r, i) => (
        <TravelList key={r.placeId} placeId={r.placeId} onClick={() => { setCenter(r.location); setHoveredIndex(i); }} />
      ))}
    </div>
  );
}
