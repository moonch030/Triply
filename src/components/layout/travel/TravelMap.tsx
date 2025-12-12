import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const center = {
  lat: 14.018,
  lng: 120.835941,
};

function TravelMap() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    language: "ko",
    region: "KR",
  });
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
      <MarkerF
        position={center}
        icon={{
          url: "/assets/icon/triply_pin_border.png",
          scaledSize: new window.google.maps.Size(40, 40),
        }}
      />
    </GoogleMap>
  );
}

export default React.memo(TravelMap);
