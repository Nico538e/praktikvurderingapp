const taskText = document.querySelector("#taskText");
const evaluateBtn = document.querySelector("#evaluateBtn");
const statusEl = document.querySelector("#status");
const resultEl = document.querySelector("#result");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function loadExample(name) {
  statusEl.textContent = "Indlæser eksempel...";
  const response = await fetch(`/api/examples/${encodeURIComponent(name)}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Could not load example");
  }
  taskText.value = data.content;
  statusEl.textContent = `Eksempel ${name} er indlæst.`;
}

function renderEmpty(message) {
  resultEl.innerHTML = `<p>${message}</p>`;
}

function renderError(message) {
  resultEl.innerHTML = `<div class="error-box"><strong>Fejl</strong><p>${escapeHtml(message)}</p></div>`;
}

function renderEvaluation(payload) {
  const { evaluation, disclaimer, model } = payload;
  const rubricRows = evaluation.rubric
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.category)}</td>
        <td>${Number(item.score).toFixed(1)} / 4</td>
        <td>${escapeHtml(item.rationale)}</td>
        <td>${(item.evidence || []).map(escapeHtml).join("<br>")}</td>
      </tr>`,
    )
    .join("");

  const strengths = evaluation.strengths
    .map(
      (item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span><em>${(item.evidence || []).map(escapeHtml).join(" | ")}</em></li>`,
    )
    .join("");

  const gaps = evaluation.gaps
    .map(
      (item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.detail)}</span><em>${(item.evidence || []).map(escapeHtml).join(" | ")}</em></li>`,
    )
    .join("");

  const recommendations = evaluation.recommendations
    .map((item) => `<li>${escapeHtml(item)}</li>`)
    .join("");

  resultEl.innerHTML = `
    <div class="score-banner">
      <div>
        <p class="eyebrow">Samlet score</p>
        <h3>${evaluation.overallScore}/100</h3>
      </div>
      <div class="score-meta">
        <p>${evaluation.shortSummary}</p>
        <p class="muted">${disclaimer}</p>
        <p class="muted">Model: ${escapeHtml(model)}</p>
      </div>
    </div>

    <section class="result-block">
      <h4>Rubric-score</h4>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Kategori</th>
              <th>Score</th>
              <th>Begrundelse</th>
              <th>Belæg</th>
            </tr>
          </thead>
          <tbody>${rubricRows}</tbody>
        </table>
      </div>
    </section>

    <section class="result-block">
      <h4>Styrker</h4>
      <ul class="result-list">${strengths}</ul>
    </section>

    <section class="result-block">
      <h4>Mangler og risici</h4>
      <ul class="result-list">${gaps}</ul>
    </section>

    <section class="result-block">
      <h4>Forbedringsforslag</h4>
      <ol class="result-list">${recommendations}</ol>
    </section>
  `;
}

async function evaluate() {
  const text = taskText.value.trim();
  if (!text) {
    renderEmpty("Indsæt en opgavetekst først.");
    return;
  }

  evaluateBtn.disabled = true;
  statusEl.textContent = "Sender opgaveteksten til modellen...";
  renderEmpty("Venter på vurdering...");

  try {
    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || "Unknown error");
    }

    statusEl.textContent = "Vurdering modtaget.";
    renderEvaluation(data);
  } catch (error) {
    statusEl.textContent = "Kunne ikke gennemføre vurderingen.";
    renderError(error.message);
  } finally {
    evaluateBtn.disabled = false;
  }
}

document.querySelector("#loadStudent1").addEventListener("click", () => loadExample("student1"));
document.querySelector("#loadStudent2").addEventListener("click", () => loadExample("student2"));
document.querySelector("#loadStudent3").addEventListener("click", () => loadExample("student3"));
evaluateBtn.addEventListener("click", evaluate);

renderEmpty("Ingen vurdering endnu.");
