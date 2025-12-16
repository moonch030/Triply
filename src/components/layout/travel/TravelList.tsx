import { usePlaceDetails } from "@/hooks/usePlaceDetails";

type TravelListProps = {
  placeId: string;
  onClick?: () => void;
};

const TravelList = ({ placeId, onClick }: TravelListProps) => {
  const details = usePlaceDetails(placeId);

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
