import StyledGrid from "@/components/StyledGrid";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { demoRowData, demoColDefs, inputTypes } from "@/data/demo";
import type { ComponentsDemoColDefsType } from "@/types/componentsDemo.type";
import { useNavigate } from "@tanstack/react-router";
import type { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { useMemo, useState } from "react";

function componentsDemo() {
  const [_gridApi, setGridApi] = useState<GridApi | null>(null);

  const [rowData, setRowData] =
    useState<ComponentsDemoColDefsType[]>(demoRowData);

  const colDefs = useMemo<ColDef<ComponentsDemoColDefsType>[]>(
    () => demoColDefs,
    []
  );

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
  };

  const navigate = useNavigate();

  return (
    <main className="bg-[#F7F7F8] w-full min-h-screen p-10">
      <Button
        variant="default"
        size="md"
        onClick={() => navigate({ to: "/auth/login" })}
      >
        로그인
      </Button>
      <div className="flex flex-col gap-10 m-auto max-w-[1200px]">
        {/** Button Section */}
        {/* <section className="bg-white p-5 border border-gray-300 rounded"> */}
        <section className="p-5">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-semibold">Button</p>
            <ul className="list-disc border rounded border-pink-200 bg-pink-100 p-1 pl-10 text-sm text-pink-700">
              <li>default : variant=default / size=md</li>
              <li>size : xs, s, md, lg, xl</li>
              <li>
                color : default, destructive, outline, secondary, ghost, link
              </li>
            </ul>

            {/** Button Sizes */}
            <div className="flex items-end gap-3 flex-wrap">
              <Button variant="default" size="icon">
                icon
              </Button>
              <Button variant="default" size="xs">
                xs
              </Button>
              <Button variant="default" size="s">
                s
              </Button>
              <Button variant="default" size="md">
                md
              </Button>
              <Button variant="default" size="lg">
                lg
              </Button>
              <Button variant="default" size="xl">
                xl
              </Button>
            </div>

            {/** Button Variants */}
            {/* <div className="flex items-end gap-3 flex-wrap"> */}
            <div className="flex flex-col items-start gap-3 flex-wrap">
              <div className="flex gap-2">
                <Button variant="default">default</Button>
                <Button variant="destructive">destructive</Button>
                <Button variant="secondary">secondary</Button>
                <Button variant="cancel">cancel</Button>
                <Button variant="outline">outline</Button>
                <Button variant="ghost">ghost</Button>
                <Button variant="link">link</Button>
              </div>

              <div className="flex gap-2">
                <Button variant="a">확인</Button>
                <Button variant="b">다음</Button>
                <Button variant="c">다음</Button>
              </div>

              <div className="flex gap-2">
                <Button variant="d">확인</Button>
                <Button variant="e">확인</Button>
                <Button variant="f">다음</Button>
                <Button variant="g">다음</Button>
              </div>
            </div>
          </div>
        </section>

        {/** Calendar Section */}
        <section className="bg-white p-5 border border-gray-300 rounded">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-semibold">Calendar</p>
            <Calendar className="min-w-[220px]" />
          </div>
        </section>

        {/** input Section */}
        <section className="bg-white p-5 border border-gray-300 rounded">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-semibold">Input</p>
            <ul className="list-disc border rounded border-pink-200 bg-pink-100 p-1 pl-10 text-sm text-pink-700">
              <li>
                type : button, checkbox, color, date, datetime-local, email,
                file, hidden, image, month, number, password, radio, range,
                reset, search, submit, tel, text, time, url, week
              </li>
            </ul>

            <div className="flex flex-col gap-3">
              {inputTypes.map((type) => (
                <div key={type} className="flex items-center jus gap-2">
                  <span className="w-32 text-sm text-gray-600">{type}:</span>
                  <Input
                    id={`input-${type}`}
                    name={`input-${type}`}
                    type={type as string}
                    placeholder={type}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/** grid Section */}
        <section className="bg-white p-5 border border-gray-300 rounded">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-semibold">Grid</p>
            <ul className="list-disc border rounded border-pink-200 bg-pink-100 p-1 pl-10 text-sm text-pink-700">
              <li>
                columnDefs : 그리드에 표시할 컬럼들의 정의를 담은 배열입니다.{" "}
                <br />- 컬럼 이름, 필드, 편집 가능 여부, 너비, 드래그 가능 여부
                등 설정
              </li>
              <li>
                rowData : 그리드에 표시될 실제 데이터 배열입니다. <br />- 각
                객체는 컬럼의 field와 매칭되어 행으로 렌더링
              </li>
              <li>
                setRowData : rowData 상태를 업데이트하는 함수입니다. <br />- 행
                드래그나 외부에서 데이터를 수정할 때 사용
              </li>
              <li>
                loading : 그리드의 로딩 상태를 표시할지 여부를 boolean으로
                지정합니다. <br />- true면 로딩 스피너가 표시됨
              </li>
              <li>
                onGridReady : 그리드 초기화 시 호출되는 콜백 함수입니다. <br />-
                GridApi와 ColumnApi를 사용할 때 필요
              </li>
            </ul>

            <div style={{ height: 500 }}>
              <StyledGrid<ComponentsDemoColDefsType>
                columnDefs={colDefs}
                rowData={rowData}
                setRowData={setRowData}
                loading={false}
                onGridReady={onGridReady}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default componentsDemo;
