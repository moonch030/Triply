import StyledGrid from "@/components/StyledGrid";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import type { ColDef } from "ag-grid-community";
import { useState } from "react";

function componentsDemo() {
  const inputTypes = [
    "button",
    "checkbox",
    "color",
    "date",
    "datetime-local",
    "email",
    "file",
    "hidden",
    "month",
    "number",
    "password",
    "radio",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "text",
    "time",
    "url",
    "week",
  ] as string[];

  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ]);

  const [colDefs, setColDefs] = useState<ColDef<any>[]>([
    {
      headerName: "",
      field: "drag",
      rowDrag: true,
      width: 40,
    },
    { field: "make", editable: true },
    { field: "model", editable: true },
    { field: "price", editable: true },
    { field: "electric", editable: true }
  ]);

  return (
    <main className="bg-[#F7F7F8] w-full min-h-screen p-10">
      <div className="flex flex-col gap-10 m-auto max-w-[1200px]">

        {/** Button Section */}
        <section className="bg-white p-5 border border-gray-300 rounded">
          <div className="flex flex-col gap-5">
            <p className="text-3xl font-semibold">Button</p>
            <ul className="list-disc border rounded border-pink-200 bg-pink-100 p-1 pl-10 text-sm text-pink-700">
              <li>default : variant=default / size=md</li>
              <li>size : xs, s, md, lg, xl</li>
              <li>color : default, destructive, outline, secondary, ghost, link</li>
            </ul>

            {/** Button Sizes */}
            <div className="flex items-end gap-3 flex-wrap">
              <Button variant="default" size="xs">xs</Button>
              <Button variant="default" size="s">s</Button>
              <Button variant="default" size="md">md</Button>
              <Button variant="default" size="lg">lg</Button>
              <Button variant="default" size="xl">xl</Button>
            </div>

            {/** Button Variants */}
            <div className="flex items-end gap-3 flex-wrap">
              <Button variant="default">default</Button>
              <Button variant="cancel">cancel</Button>
              <Button variant="destructive">destructive</Button>
              <Button variant="outline">outline</Button>
              <Button variant="secondary">secondary</Button>
              <Button variant="ghost">ghost</Button>
              <Button variant="link">link</Button>
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
              <li>type : button, checkbox, color, date, datetime-local, email, file, hidden, image, month, number, password, radio, range, reset, search, submit, tel, text, time, url, week</li>
            </ul>

            <div className="flex flex-col gap-3">
              {inputTypes.map((type) => (
                <div key={type} className="flex items-center jus gap-2">
                  <span className="w-32 text-sm text-gray-600">{type}:</span>
                  <Input
                    id={`input-${type}`}
                    name={`input-${type}`}
                    type={type as string}
                    placeholder={type} />
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
              <li>columnDefs :</li>
              <li>rowData :</li>
              <li>columnDefs :</li>
            </ul>

            <div style={{ height: 500 }}>
              <StyledGrid<any>
                columnDefs={colDefs}
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
                }} />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default componentsDemo
