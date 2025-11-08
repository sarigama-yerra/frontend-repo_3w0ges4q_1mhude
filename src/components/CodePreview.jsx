import { useEffect, useMemo, useState } from "react";
import { Copy } from "lucide-react";

function copy(text) {
  navigator.clipboard?.writeText(text).catch(() => {});
}

export default function CodePreview({ artifact }) {
  const [tab, setTab] = useState("Controller.java");

  const files = useMemo(() => {
    if (!artifact) return {};
    const { pageName, description, framework } = artifact;
    const className = pageName.replace(/[^a-zA-Z0-9]/g, "").replace(/^(.)/, (m) => m.toUpperCase());
    const pkg = framework === "Jakarta EE" ? "com.example.boundary" : "com.example";

    const controller = framework === "Spring Boot"
      ? `package ${pkg};\n\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api/${className.toLowerCase()}")\npublic class ${className}Controller {\n\n    @GetMapping\n    public ResponseEntity<String> describe() {\n        return ResponseEntity.ok("${description.replace(/"/g, '\\"')}");\n    }\n}\n`
      : framework === "Jakarta EE"
      ? `package ${pkg};\n\nimport jakarta.ws.rs.GET;\nimport jakarta.ws.rs.Path;\nimport jakarta.ws.rs.Produces;\nimport jakarta.ws.rs.core.MediaType;\n\n@Path("/api/${className.toLowerCase()}")\npublic class ${className}Resource {\n\n    @GET\n    @Produces(MediaType.TEXT_PLAIN)\n    public String describe() {\n        return "${description.replace(/"/g, '\\"')}";\n    }\n}\n`
      : `package ${pkg};\n\nimport io.micronaut.http.*;\nimport io.micronaut.http.annotation.*;\n\n@Controller("/api/${className.toLowerCase()}")\npublic class ${className}Controller {\n\n    @Get\n    public HttpResponse<String> describe() {\n        return HttpResponse.ok("${description.replace(/"/g, '\\"')}");\n    }\n}\n`;

    const service = `package ${pkg};\n\npublic class ${className}Service {\n    // Implementa la logica di business per: ${pageName}\n}`;

    const dto = `package ${pkg};\n\npublic class ${className}Dto {\n    // Definisci i campi e le validazioni richieste dalla descrizione\n}`;

    return {
      "Controller.java": controller,
      "Service.java": service,
      "Dto.java": dto,
      "README.md": `# ${pageName}\n\n${description}\n\nStack: ${framework}`,
    };
  }, [artifact]);

  useEffect(() => {
    if (artifact) setTab("Controller.java");
  }, [artifact]);

  if (!artifact) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-500">
        Il codice generato apparirà qui.
      </div>
    );
  }

  const current = files[tab] ?? "";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-gray-200">
        <div className="flex gap-1">
          {Object.keys(files).map((name) => (
            <button
              key={name}
              onClick={() => setTab(name)}
              className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px ${
                tab === name
                  ? "border-blue-600 text-blue-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <button
          onClick={() => copy(current)}
          className="m-2 inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Copy className="h-4 w-4" /> Copia
        </button>
      </div>
      <pre className="mt-0 max-h-[420px] overflow-auto rounded-b-lg bg-gray-900 p-4 text-xs leading-relaxed text-gray-100">
        <code>{current}</code>
      </pre>
    </div>
  );
}
