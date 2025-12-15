import { useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import TravelSearchInput from "./TravelSearchInput";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function TravelMap() {
  const [center, setCenter] = useState({ lat: 14.018, lng: 120.835941 });
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // 호버 인덱스

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],
    language: "ko",
    region: "KR",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <TravelSearchInput
        mapLoaded={isLoaded}
        setCenter={setCenter}
        setMarkers={setMarkers}
      />
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {markers.map((m, i) => (
          <MarkerF
            key={i}
            position={m}
            onMouseOver={() => setHoveredIndex(i)}
            onMouseOut={() => setHoveredIndex(null)}
            icon={{
              url: "/assets/icon/triply_pin_border.png",
              scaledSize: new window.google.maps.Size(
                hoveredIndex === i ? 50 : 40,
                hoveredIndex === i ? 50 : 40
              ),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
}
