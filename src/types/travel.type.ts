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
