# Praktik Vurdering

Et projekt til evaluering af praktikrapporter for datamatikeruddannelsen.

## Projektstruktur

```text
praktikvurdering/
├── data/                      # Kildedata og referancematerialer
│   ├── laeringsmaal.md       # Officielle læringsmål for praktikken
│   ├── krav-til-rapport.md   # Krav til praktikrapporten
│   ├── dare-share-care.md    # Værdigrundlag for virksomheden
│   ├── student1.md           # Student 1's praktikrapport
│   ├── student2.md           # Student 2's praktikrapport
│   └── student3.md           # Student 3's praktikrapport
├── prompts/                   # AI-prompts og evalueringsværktøjer
│   ├── app-system-prompt.md   # Systemprompt til webappen
│   ├── app-user-prompt.md     # Brugerskabelon til webappen
│   └── evaluate-report.md    # Starterprompt til vurdering af praktikrapporter
├── public/                    # Frontend til webappen
├── server.js                  # Lille Node-server med OpenAI-integration
├── package.json               # Startscript og metadata
└── README.md                  # Dette dokument
```

## Mål

Automatiseret evaluering af praktikrapporter baseret på:

- Officielle læringsmål
- Krav til rapportens indhold
- Værdigrundlag for virksomheden

## Dokumentation

- **Læringsmål**: se `data/laeringsmaal.md`
- **Rapportkrav**: se `data/krav-til-rapport.md`
- **Værdigrundlag**: se `data/dare-share-care.md`
- **Vurderingsprompt**: se `prompts/evaluate-report.md`

## Kørsel af appen

Applikationen ligger i roden af projektet og kan startes med:

```bash
npm start
```

Du skal sætte `OPENAI_API_KEY` i dit miljø, og du kan vælge model med `OPENAI_MODEL` hvis du vil overstyre standarden `gpt-5.4-mini`.

### Lokal opsætning med `.env`

Til lokal udvikling kan du kopiere `.env.example` til `.env` og udfylde værdierne der. `.env` er ignoreret af git, så nøglen bliver ikke committed. `.env.example` er kun en skabelon og bør ikke indeholde hemmeligheder.

```bash
cp .env.example .env
```

Tilføj derefter din rigtige `OPENAI_API_KEY` i `.env` og kør:

```bash
npm start
```

### Sikker deployment

Når du deployer, skal `OPENAI_API_KEY` sættes som en hemmelig miljøvariabel i din hostingplatforms dashboard, ikke i frontend-kode og ikke i et offentligt repository.

Brug gerne disse regler:

- gem nøglen kun på serversiden
- commit aldrig `.env`
- giv kun frontend adgang til vurderingsresultatet, aldrig til selve API-nøglen
- brug HTTPS på den offentlige URL
- begræns hvem der kan tilgå admin- eller deploypanelet

Hvis din hostingplatform understøtter environment variables, er det den sikreste løsning.

### GitHub Actions

Ja, du kan godt bruge GitHub Actions. Lige nu er workflowet sat op som CI, så det validerer koden ved push og pull request.

Det sikre mønster er:

- gem `OPENAI_API_KEY` som en GitHub Secret
- lad workflowet læse den via `secrets.OPENAI_API_KEY`
- send den videre som miljøvariabel kun på server-siden under deployment
- lad aldrig nøglen komme ind i frontend-bundle eller offentlige logs

Hvis du senere vil have egentlig deployment via GitHub Actions, kan vi koble workflowet på en hostingplatform eller en server via SSH. Uden et hostingmål er den sikre default at holde det til CI.

## Bemærkning

Løsningen er bevidst bygget som et vejledende AI-baseret vurderingsværktøj. Den skal ikke forstås som en automatisk sand eller officiel bedømmelse.
