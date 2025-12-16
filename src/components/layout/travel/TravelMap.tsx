import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import useTravelMapStore from "@/store/TravelMapStore";
import { useShallow } from 'zustand/react/shallow'
import { useEffect } from "react";

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

export default function TravelMap() {
  const { center, markers, hoveredIndex, setHoveredIndex, setIsLoaded, setMap } =
    useTravelMapStore(
      useShallow((state) => ({
        center: state.center,
        markers: state.markers,
        hoveredIndex: state.hoveredIndex,
        setHoveredIndex: state.setHoveredIndex,
        setIsLoaded: state.setIsLoaded,
        setMap: state.setMap,
      }))
    );

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
    language: "ko",
    region: "KR",
  });

  useEffect(() => {
    setIsLoaded(isLoaded);
  }, [isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={14}
      onLoad={(map) => setMap(map)}
    >
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
  );
}
