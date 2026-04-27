import http from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadDotEnv();

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "127.0.0.1";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.4-mini";
const OPENAI_REASONING_EFFORT = process.env.OPENAI_REASONING_EFFORT || "medium";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const RUBRIC = [
  { category: "Overholdelse af rapportkrav", weight: 30, maxScore: 4 },
  { category: "Dækning af læringsmål", weight: 25, maxScore: 4 },
  { category: "Refleksionsdybde og teori-kobling", weight: 15, maxScore: 4 },
  { category: "DARE, SHARE og CARE", weight: 15, maxScore: 4 },
  { category: "Virksomhedens udbytte og egen udvikling", weight: 10, maxScore: 4 },
  { category: "Kvalitet i formidlingen", weight: 5, maxScore: 4 },
];

const SRC = {
  krav: path.join(__dirname, "data/krav-til-rapport.md"),
  maal: path.join(__dirname, "data/laeringsmaal.md"),
  dsc: path.join(__dirname, "data/dare-share-care.md"),
  systemTemplate: path.join(__dirname, "prompts/app-system-prompt.md"),
  userTemplate: path.join(__dirname, "prompts/app-user-prompt.md"),
  index: path.join(__dirname, "public/index.html"),
  appJs: path.join(__dirname, "public/app.js"),
  styles: path.join(__dirname, "public/styles.css"),
  examplesDir: path.join(__dirname, "data"),
};

async function readText(filePath) {
  return readFile(filePath, "utf8");
}

function loadDotEnv() {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const envPath = path.join(__dirname, ".env");
  if (!existsSync(envPath)) {
    return;
  }

  try {
    const contents = readFileSync(envPath, "utf8");
    for (const rawLine of contents.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#") || !line.includes("=")) {
        continue;
      }

      const separatorIndex = line.indexOf("=");
      const key = line.slice(0, separatorIndex).trim();
      let value = line.slice(separatorIndex + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch (error) {
    console.warn(`Could not load .env: ${error.message}`);
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function numberLines(text) {
  return text
    .trim()
    .split(/\r?\n/)
    .map((line, index) => `L${String(index + 1).padStart(3, "0")}: ${line}`)
    .join("\n");
}

function buildRubricText() {
  return RUBRIC.map(
    (item) => `- ${item.category} (${item.weight}%): score ${item.maxScore}/4`,
  ).join("\n");
}

async function buildPrompt(templatePath, replacements) {
  let template = await readText(templatePath);
  for (const [key, value] of Object.entries(replacements)) {
    template = template.replaceAll(`{{${key}}}`, value);
  }
  return template;
}

async function buildSystemPrompt() {
  const [krav, maal, dsc] = await Promise.all([
    readText(SRC.krav),
    readText(SRC.maal),
    readText(SRC.dsc),
  ]);

  return buildPrompt(SRC.systemTemplate, {
    RUBRIC: buildRubricText(),
    KRAV_TIL_RAPPORT: krav.trim(),
    LAERINGSMAAL: maal.trim(),
    DARE_SHARE_CARE: dsc.trim(),
  });
}

async function buildUserPrompt(taskText) {
  return buildPrompt(SRC.userTemplate, {
    TASK_TEXT: numberLines(taskText),
  });
}

function computeOverallScore(rubricScores) {
  const byCategory = new Map(rubricScores.map((item) => [item.category, item]));
  const weighted = RUBRIC.reduce((sum, item) => {
    const score = Number(byCategory.get(item.category)?.score ?? 0);
    return sum + (score / item.maxScore) * item.weight;
  }, 0);
  return Math.round(weighted);
}

function createAssessmentSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      rubric: {
        type: "array",
        minItems: 6,
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            category: { type: "string" },
            score: { type: "number", minimum: 0, maximum: 4 },
            rationale: { type: "string" },
            evidence: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["category", "score", "rationale", "evidence"],
        },
      },
      strengths: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            detail: { type: "string" },
            evidence: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["title", "detail", "evidence"],
        },
      },
      gaps: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            detail: { type: "string" },
            evidence: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["title", "detail", "evidence"],
        },
      },
      recommendations: {
        type: "array",
        items: { type: "string" },
      },
      shortSummary: { type: "string" },
      disclaimer: { type: "string" },
    },
    required: [
      "rubric",
      "strengths",
      "gaps",
      "recommendations",
      "shortSummary",
      "disclaimer",
    ],
  };
}

function extractTextFromResponse(data) {
  if (typeof data?.output_text === "string" && data.output_text.trim()) {
    return data.output_text;
  }

  const chunks = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === "string") {
        chunks.push(content.text);
      } else if (typeof content?.output_text === "string") {
        chunks.push(content.output_text);
      }
    }
  }
  return chunks.join("\n").trim();
}

async function callOpenAI(taskText) {
  const systemPrompt = await buildSystemPrompt();
  const userPrompt = await buildUserPrompt(taskText);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      reasoning: { effort: OPENAI_REASONING_EFFORT },
      input: [
        { role: "system", content: [{ type: "input_text", text: systemPrompt }] },
        { role: "user", content: [{ type: "input_text", text: userPrompt }] },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "praktikrapport_vurdering",
          schema: createAssessmentSchema(),
          strict: true,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const raw = extractTextFromResponse(data);
  if (!raw) {
    throw new Error("OpenAI response did not contain any text output.");
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Could not parse model JSON output: ${error.message}\nRaw output: ${raw}`);
  }

  const overallScore = computeOverallScore(parsed.rubric || []);
  return { ...parsed, overallScore };
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function serveStatic(res, filePath) {
  return readText(filePath)
    .then((content) => {
      const ext = path.extname(filePath);
      res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "text/plain; charset=utf-8" });
      res.end(content);
    })
    .catch(() => {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
    });
}

async function loadExample(name) {
  const safeName = name.replace(/[^a-z0-9-]/gi, "").toLowerCase();
  const candidates = {
    "student1": path.join(SRC.examplesDir, "student1.md"),
    "student2": path.join(SRC.examplesDir, "student2.md"),
    "student3": path.join(SRC.examplesDir, "student3.md"),
  };
  const file = candidates[safeName];
  if (!file) {
    throw new Error("Unknown example");
  }
  return readText(file);
}

function htmlPage() {
  return `<!doctype html>
<html lang="da">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Praktikvurdering</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <div class="background-orb orb-one"></div>
    <div class="background-orb orb-two"></div>
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">AI-baseret vejledende vurdering</p>
        <h1>Vurdér praktikrapporter med en rubric, der bygger på de formelle krav.</h1>
        <p class="lede">
          Indsæt en opgavetekst, så får du en struktureret vurdering med score, styrker,
          mangler og konkrete forbedringsforslag. Løsningen er et støtteværktøj - ikke en
          automatisk sand bedømmelse.
        </p>
        <div class="meta">
          <span>Rubric afledt af rapportkrav, læringsmål og DARE/SHARE/CARE</span>
          <span>OpenAI Responses API</span>
        </div>
      </section>

      <section class="panel input-panel">
        <div class="panel-header">
          <h2>Opgavetekst</h2>
          <div class="actions">
            <button id="loadStudent1" class="secondary">Indlæs student1</button>
            <button id="loadStudent2" class="secondary">Indlæs student2</button>
            <button id="loadStudent3" class="secondary">Indlæs student3</button>
          </div>
        </div>
        <textarea id="taskText" spellcheck="false" placeholder="Indsæt opgaveteksten her..."></textarea>
        <div class="toolbar">
          <p class="hint">Tip: Du kan også indsætte rapporten direkte fra en .md-fil.</p>
          <button id="evaluateBtn" class="primary">Vurder rapport</button>
        </div>
        <p id="status" class="status"></p>
      </section>

      <section class="panel rubric-panel">
        <div class="panel-header">
          <h2>Rubric</h2>
          <p>Vægte i procent og 0-4 skala.</p>
        </div>
        <div class="rubric-list">
          ${RUBRIC.map(
            (item) => `<article class="rubric-card">
              <div>
                <h3>${escapeHtml(item.category)}</h3>
                <p>Vægt: ${item.weight}%</p>
              </div>
              <strong>0-4</strong>
            </article>`,
          ).join("")}
        </div>
      </section>

      <section class="panel result-panel">
        <div class="panel-header">
          <h2>Vurdering</h2>
          <p>Resultatet vises her, når modellen har svaret.</p>
        </div>
        <div id="result" class="result-empty">
          <p>Ingen vurdering endnu.</p>
        </div>
      </section>
    </main>
    <script src="/app.js" type="module"></script>
  </body>
</html>`;
}

async function handleEvaluate(req, res) {
  if (!OPENAI_API_KEY) {
    sendJson(res, 400, {
      error: "OPENAI_API_KEY is not set.",
      message: "Set OPENAI_API_KEY and retry.",
    });
    return;
  }

  let body = "";
  try {
    for await (const chunk of req) {
      body += chunk;
      if (body.length > 200000) {
        sendJson(res, 413, { error: "Request body too large." });
        return;
      }
    }
  } catch (error) {
    sendJson(res, 400, { error: error.message });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(body || "{}");
  } catch {
    sendJson(res, 400, { error: "Invalid JSON body." });
    return;
  }

  const taskText = String(payload.text || "").trim();
  if (!taskText) {
    sendJson(res, 400, { error: "Missing text field." });
    return;
  }

  if (taskText.length < 20) {
    sendJson(res, 400, { error: "Task text is too short." });
    return;
  }

  try {
    const evaluation = await callOpenAI(taskText);
    sendJson(res, 200, {
      evaluation,
      model: OPENAI_MODEL,
      disclaimer:
        "Dette er en vejledende AI-baseret vurdering, ikke en automatisk sand bedømmelse.",
    });
  } catch (error) {
    sendJson(res, 500, {
      error: "Failed to evaluate the report.",
      message: error.message,
    });
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(htmlPage());
    return;
  }

  if (req.method === "GET" && url.pathname === "/app.js") {
    return serveStatic(res, SRC.appJs);
  }

  if (req.method === "GET" && url.pathname === "/styles.css") {
    return serveStatic(res, SRC.styles);
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/examples/")) {
    const exampleName = url.pathname.split("/").pop() || "";
    try {
      const content = await loadExample(exampleName);
      sendJson(res, 200, { name: exampleName, content });
    } catch (error) {
      sendJson(res, 404, { error: error.message });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/evaluate") {
    await handleEvaluate(req, res);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(PORT, HOST, () => {
  console.log(`Praktikvurdering running on http://${HOST}:${PORT}`);
});
