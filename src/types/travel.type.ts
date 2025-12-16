/** ai 여행 일정 추천 request */
export type TravelAiListReqType = {
  departure: string; // 도착지
  destination: string; // 출발지
  companion: string; // 누구랑
  startDate: string; // 시작일 yyyy-mm-dd
  endDate: string; // 종료일 yyyy-mm-dd
  concept: string[]; // 여행컨셉
  preference: string; // 사용자input 의견
};

/** ai 여행 일정 추천 response */
export type ActivitiesTypes = {
  time: string; // 시간대
  location: string; // 장소명
  placeSearchQuery: string; // 구글 Places 검색용 쿼리
  categories: string[]; // 카테고리
  placeId: string; // Google Places place_id
  rating: number; // 구글 리뷰 별점
  operatingHours: string[]; // 운영 시간(요일별 배열)
  travelTime: number; // 다음 장소까지 이동 시간(분)
  description: string; // 장소 설명
  coordinates: {
    // 장소 설명
    latitude: number; //위도
    longitude: number; //경도
  };
};

export type ScheduleType = {
  day: number; // 일차
  date: string; // 날짜
  activities: ActivitiesTypes[]; // 활동 목록
};

export type TravelAiListResType = {
  recommendedDestinations: string[]; //main title list
  schedule: ScheduleType[];
  summary: string; // 전체 일정 요약
};




/** TravelContainer 이하 types */
export type TravelMapCenter = {
  lat: number;
  lng: number;
};

/** useTravelMapStore type */
export type TravelMapStoreType = {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map) => void;

  center: google.maps.LatLngLiteral;
  markers: google.maps.LatLngLiteral[];
  hoveredIndex: number | null;
  isLoaded: boolean;

  setCenter: (c: google.maps.LatLngLiteral) => void;
  setMarkers: (
    m: google.maps.LatLngLiteral[] | ((prev: google.maps.LatLngLiteral[]) => google.maps.LatLngLiteral[])
  ) => void;
  setHoveredIndex: (i: number | null) => void;
  setIsLoaded: (v: boolean) => void;
};


/**
 * 장소 검색 결과용 타입
 * - textSearch / 자동완성 선택 후 지도 & 리스트에 표시되는 데이터
 */
export type PlaceResultType = {
  /** 장소 이름 (예: 스타벅스 강남점) */
  name: string;
  /** 전체 주소 문자열 */
  formatted_address: string;
  /** 지도 마커 위치 좌표 */
  location: google.maps.LatLngLiteral;
  /** 현재 위치 기준 거리 (km 단위) */
  distanceKm: number;
  /** Google Places 고유 장소 ID */
  placeId: string;
}

/**
 * 장소 상세 정보 타입
 * - TravelList에서 PlacesService.getDetails()로 조회한 데이터
 */
export type PlaceDetailsType = {
  /** 장소 이름 */
  name: string;
  /** 현재 영업 여부
   * - true  : 영업 중
   * - false : 영업 종료
   * - null  : 정보 없음
   */
  openNow: boolean | null;
  /** Google 평점 (0~5)
   * - null: 평점 정보 없음
   */
  rating: number | null;
  /** 장소 사진 URL 목록 */
  photos: string[];
  /** 요일별 영업 시간 텍스트
   * - 예: ["월요일: 09:00–18:00", "화요일: 09:00–18:00"]
   * - null: 영업시간 정보 없음
   */
  openingHours: string[] | null;
  /** 장소 카테고리(타입)
   * - 예: ["restaurant", "cafe", "food"]
   */
  categories: string[];
};
