import { Rocket } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-4 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-blue-600 text-white grid place-items-center shadow">
          <Rocket className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
            Java Page Generator
          </h1>
          <p className="text-sm text-gray-500">
            Scrivi i requisiti pagina per pagina e ottieni il codice Java di base
          </p>
        </div>
      </div>
    </header>
  );
}
