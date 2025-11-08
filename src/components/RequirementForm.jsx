import { useState } from "react";

export default function RequirementForm({ onGenerate }) {
  const [pageName, setPageName] = useState("");
  const [description, setDescription] = useState("");
  const [framework, setFramework] = useState("Spring Boot");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pageName.trim() || !description.trim()) return;
    onGenerate({ pageName: pageName.trim(), description: description.trim(), framework });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-700">Nome pagina</label>
        <input
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Esempio: Login, Dashboard, Profilo"
          value={pageName}
          onChange={(e) => setPageName(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-700">Descrizione del requisito</label>
        <textarea
          className="min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descrivi cosa deve fare la pagina, campi, validazioni, azioni, ruoli, ecc."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-700">Stack di destinazione</label>
        <select
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
        >
          <option>Spring Boot</option>
          <option>Jakarta EE</option>
          <option>Micronaut</option>
        </select>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Genera codice
      </button>
    </form>
  );
}
