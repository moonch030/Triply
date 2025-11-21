import { Button } from "@/components/ui/button"
import { Calendar } from "./components/ui/calendar"
import { Input } from "./components/ui/input"

function Home() {
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

  return (
    <main className="flex flex-col gap-10 bg-[#F7F7F8] w-full min-h-screen p-10">
      {/** Button Section */}
      <section className="bg-white p-5 border border-gray-300 rounded">
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-semibold">Button</p>
          <ul className="list-disc border rounded border-pink-200 bg-pink-100 p-1 pl-10 text-sm text-pink-700">
            <li>기본값 : variant=default / size=md</li>
            <li>사이즈 : xs, s, md, lg, xl</li>
            <li>색상 : default, destructive, outline, secondary, ghost, link</li>
          </ul>

          {/** Button Sizes */}
          <div className="flex items-end gap-3">
            <Button variant="default" size="xs">xs</Button>
            <Button variant="default" size="s">s</Button>
            <Button variant="default" size="md">md</Button>
            <Button variant="default" size="lg">lg</Button>
            <Button variant="default" size="xl">xl</Button>
          </div>

          {/** Button Variants */}
          <div className="flex items-end gap-3">
            <Button variant="default">default</Button>
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
          <Calendar />
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
                <Input type={type as string} placeholder={type} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
