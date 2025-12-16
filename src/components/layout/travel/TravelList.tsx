import { useEffect, useState } from "react";

type TravelListProps = {
  placeId: string;
  onClick?: () => void;
};

type PlaceDetailsType = {
  name: string;
  openNow: boolean | null;
  rating: number | null;
  photos: string[];
  openingHours: string[] | null;
  categories: string[];
};

const TravelList = ({ placeId, onClick }: TravelListProps) => {
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
            openNow: place.opening_hours?.open_now ?? null,
            rating: place.rating ?? null,
            photos: place.photos?.map((p) => p.getUrl()) ?? [],
            openingHours: place.opening_hours?.weekday_text ?? null,
            categories: place.types ?? [],
          });
        }
      }
    );
  }, [placeId]);

  if (!details) return <div>Loading...</div>;

  return (
    <div className="border p-3 rounded shadow-sm mb-3 cursor-pointer" onClick={onClick}>
      <h3 className="font-bold text-lg">{details.name}</h3>
      <p>{details.openNow !== null ? (details.openNow ? "영업 중" : "영업 종료") : "정보 없음"}</p>
      <p>평점: {details.rating ?? "정보 없음"}</p>
      <p>카테고리: {details.categories.join(", ")}</p>
      {details.openingHours && (
        <>
          <p>영업시간:</p>
          <ul>
            {details.openingHours.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </>
      )}
      {details.photos.length > 0 && (
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {details.photos.map((url, idx) => (
            <img key={idx} src={url} alt={details.name} className="w-32 h-24 object-cover rounded" />
          ))}
        </div>
      )}
    </div>
  );
};

export default TravelList;
