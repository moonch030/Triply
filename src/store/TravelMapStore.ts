import type { TravelMapStoreType } from '@/types/travel.type';
import { create } from 'zustand'

/**
 * TravelMap 전역 상태 관리 스토어
 * - 지도 객체
 * - 지도 중심 좌표
 * - 마커(핀) 목록
 * - 마커 hover 상태
 * - Google Maps 로딩 상태
 */
const useTravelMapStore = create<TravelMapStoreType>(set => ({
    /** Google Maps Map 인스턴스 */
    map: null as google.maps.Map | null,

    /** Map 인스턴스 저장 */
    setMap: (map: google.maps.Map) => set({ map }),

    /** 지도 중심 좌표 (기본값: 서울 시청) */
    center: { lat: 37.5665, lng: 126.9780 },

    /** 지도에 표시되는 모든 마커 좌표 목록 */
    markers: [],

    /** 마우스가 올라가 있는 마커의 인덱스 (hover 효과용) */
    hoveredIndex: null,

    /** Google Maps API 로딩 완료 여부 */
    isLoaded: false,

    /** 지도 중심 좌표 변경 */
    setCenter: (center) => set({ center }),

    /**
     * 마커 목록 설정
     * - 배열 직접 전달 가능
     * - 이전 상태를 기반으로 한 함수형 업데이트도 가능
     */
    setMarkers: (markers) =>
        set((state) => ({
            markers: typeof markers === "function"
                ? markers(state.markers)
                : markers,
        })),

    /** 마커 hover 인덱스 설정 */
    setHoveredIndex: (hoveredIndex) => set({ hoveredIndex }),

    /** Google Maps API 로딩 상태 설정 */
    setIsLoaded: (isLoaded) => set({ isLoaded }),
}))

export default useTravelMapStore;
