import { useState } from "react";
import Header from "./components/Header.jsx";
import RequirementForm from "./components/RequirementForm.jsx";
import CodePreview from "./components/CodePreview.jsx";
import HistoryPanel from "./components/HistoryPanel.jsx";

function App() {
  const [artifact, setArtifact] = useState(null);
  const [history, setHistory] = useState([]);

  const handleGenerate = (data) => {
    setArtifact(data);
    setHistory((prev) => [...prev, { ...data, createdAt: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Header />
      <main className="mx-auto grid w-full max-w-6xl gap-6 p-4 md:p-6 md:grid-cols-5">
        <section className="md:col-span-2">
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Descrivi la pagina</h2>
            <RequirementForm onGenerate={handleGenerate} />
          </div>
          <div className="mt-4">
            <HistoryPanel items={history} onSelect={setArtifact} />
          </div>
        </section>
        <section className="md:col-span-3">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Codice generato</h2>
              <p className="text-sm text-gray-500">Controller, Service e DTO di base in base al requisito</p>
            </div>
            <div className="p-0">
              <CodePreview artifact={artifact} />
            </div>
          </div>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl p-6 text-center text-xs text-gray-500">
        Suggerimento: aggiungi campi, validazioni e azioni nella descrizione per generare scheletri più completi.
      </footer>
    </div>
  );
}

export default App;
