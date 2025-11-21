import { AgGridReact, type AgGridReactProps } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

/**
 * StyledGrid 컴포넌트
 * --------------------
 * 공통 스타일을 적용한 AG Grid 래퍼 컴포넌트입니다.
 *
 * 주요 기능:
 * - 전달된 columnDefs, rowData 기반으로 AG Grid 렌더링
 * - 행 드래그(rowDragManaged)를 통해 순서 변경 가능
 * - 드래그 종료 시 onRowDragEnd 내부에서 rowData 순서를 자동 재정렬
 * - 외부에서 받은 setRowData로 즉시 상태 반영
 * - useMemo로 rowSelection 옵션을 안정적으로 선언
 * - 로딩 상태 표시(`loading` prop 사용)
 * - className을 통해 커스텀 스타일 지정 가능
 *
 * 주요 Props
 * -----
 * @template T 그리드 row 데이터의 타입
 *
 * @prop {ColDef<T>[]} columnDefs
 *   - AG Grid 컬럼 정의 목록
 *
 * @prop {T[]} rowData
 *   - 그리드에 표시되는 데이터 배열
 *
 * @prop {React.Dispatch<React.SetStateAction<T[]>>} setRowData
 *   - rowData를 업데이트하는 함수 (드래그 순서 변경 시 사용)
 *
 * @prop {boolean} isLoading
 *   - 로딩 상태 표시 여부
 *
 * @prop {string} [className]
 *   - wrapper div에 적용할 커스텀 클래스
 *
 * @prop {AgGridReactProps<T>} ...props
 *   - AG Grid가 제공하는 추가 prop 전달 가능
 */

ModuleRegistry.registerModules([AllCommunityModule]);
interface Props<T> extends AgGridReactProps<T> {
  columnDefs: ColDef<T>[];
  rowData: T[];
  setRowData: React.Dispatch<React.SetStateAction<T[]>>;
  className?: string;
}

export default function StyledGrid<T>({
  columnDefs,
  rowData,
  setRowData,
  className = "h-full",
  ...props
}: Props<T>) {
  const rowSelection = useMemo<RowSelectionOptions>(
    () => ({
      mode: "multiRow",
      checkboxes: true,
    }),
    []
  );

  return (
    <div className={cn(className)}>
      <AgGridReact<T>
        {...props}
        columnDefs={columnDefs}
        rowData={rowData}
        rowDragManaged={true}
        onRowDragEnd={(event) => {
          const movedData = event.node.data;
          if (!movedData) return;

          const overIndex = event.overIndex ?? 0;
          const newData = rowData.filter((d) => d !== movedData);
          newData.splice(overIndex, 0, movedData);

          console.log("Moved row:", movedData);
          console.log("New row order:", newData);

          setRowData(newData);
        }}
        rowSelection={rowSelection}
      />
    </div>
  );
}
