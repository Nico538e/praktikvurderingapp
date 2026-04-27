## **Reflektionsrapport**

### **Formål og hvem er** V1 **?**

Praktikken havde til formål at afprøve mine kompetencer og skabe ny læring i praksis hos V1 (4. august-17. oktober 2025). Denne rapport fokuserer på mødet mellem forståelsen fra skolen og den praktiske virkelighed, hvor tekniske valg havde konsekvenser.

V1 er et dansk IT-konsulenthus, der arbejder med cloud, drift, sikkerhed og digitalisering med særligt fokus på Microsoft Azure. Virksomheden leverer løsninger, hvor teknik, forretning og governance kombineres. Her spiller automatisering og sikkerhed en central rolle. Jeg blev en del af Cloud Operations-teamet, som designer, implementerer og drifter løsninger i Azure. Teamet arbejder med Infrastructure as Code (IaC), standardisering og compliance. Arbejdet foregår i tæt samarbejde med kunder, i mit tilfælde Pensam, hvor løsningerne implementeres direkte i drift.

#### **Læringsmålene fra skolebænken brugt i praksis**

På studiet har vi arbejdet med Scrum. En af de processer, der hjælper virksomheder og teams med at skabe struktur og fremdrift. Et rammeværk som fokuserer på at planlægge arbejdet isprints og afslutte hver iteration med review og retrospective. Det gav en god forståelse for samarbejde, rollefordeling og fremdrift.

Hos V1 arbejdede vi mere Kanban-baseret med et tydeligt agilt mindset. Arbejdet flød løbende gennem et Azure DevOps board med kolonner som New, Approved, Committed og Done (Bilag 1). I stedet for faste sprints blev opgaver prioriteret og leveret løbende, så kunden hele tiden kunne følge med og give feedback. Jeg oplevede, hvor effektivt det var, når ændringer kunne implementeres med det samme. Det passede perfekt til en af de fire værdier i det Agile Manifesto, *"responding to change over following a plan".* 1

Vores team arbejdede agilt, da det skabte fleksible struktur, men når jeg sad på kontoret, kunne jeg høre, at nogle af de andre teamsstadig brugte klassisk Scrum. Det blev faktisk ret lærerigt at observere forskellen. Jeg lagde mærke til, hvor stort et pres der kunne ligge på Scrum Masteren, som både skulle facilitere møder, fjerne forhindringer og samtidig håndtere de menneskelige udfordringer i et team.

<sup>1</sup> Beck, K. et al., *Manifesto for Agile Software Development*, 2001. Tilgængelig på: https://agilemanifesto.org/ (tilgået: 20. oktober 2025).

Jeg sagde til min mentor i sjov, at Scrum Masteren nogle dage burde få dobbeltløn, fordi de fungerer både som psykolog og projektleder. Det kræver en del tålmodighed, som ofte undervurderes. Refleksion fra egne forløb på studiet viste at samme dynamikker dukkede op, blot i mindre skala. Det bekræftede for mig, at mennesket afgør om samarbejdet lykkedes. Min mentor og jeg var enige om, at det vigtigste er at vælge en proces, der passer til teamets kultur og omstillingsparathed. I modsætning til vandfaldsmodellen som følger et fast forløb fra krav til design, implementering og test, mens agil udvikling handler om samarbejde, tilpasning og hurtig feedback. I praksis betød det, at vi opdagede fejl tidligere, leverede værdi hurtigere og havde et tættere samarbejde med kunden.

#### **Mødet med Cloud og DevOps i praksis**

Et af studiets læringsmål var udvikling og implementering af IT-løsninger i praksis. Hos V1 fik jeg prøvet at arbejdet med Microsoft Azure, ved at bruge Bicep til at automatisere oprettelsen af ressourcer som kode (Infrastructure as Code). Det gav mig en praktisk forståelse for, hvordan man skaber mere ensartede og skalerbare løsninger gennem automatisering. Jeg havde ingen erfaring indenfor feltet, men min mentor sørgede for, at jeg allerede i sommerferien tog relevante kurser og certificeringer, så jeg kunne træde trygt ind i rollen.

Jeg arbejdede også med CI/CD-pipelines i Azure DevOps, som automatisk byggede, validerede og deployede koden. Her gik det for alvor op for mig vigtigheden af automatisering for kvaliteten, idet fejl bliver fanget tidligt og frigiver tid til at fokusere på forbedringer frem for gentagelser. På studiet var det mere hvad der skete bag kulisserne, men her så jeg det for første gang aktion (Bilag 2).

Samtidig lærte jeg, hvordan versionsstyring og samarbejde hænger tæt sammen. Ved at bruge Git og trunk-based development med branches og pull requests fik jeg indsigt i, hvordan struktur og kommunikation i koden er afgørende for et teams succes. Det, vi tidligere kun havde lært som teori gennem SDLC-modellen på studiet, blev pludselig konkret i hverdagen (Bilag 3).

#### **Sikkerhed**

Fra faget Cyber Security kunne jeg trække den teoretiske viden direkte ind i arbejdet med Key Vault projektet, hvor vi flyttede secrets og credentials fra lokale servere til en central, krypteret cloudløsning. Her blev CIA-triaden (Confidentiality, Integrity og Availability) et aktivt redskab i de beslutninger, der blev truffet under designet. Jeg fik implementeret Role-Based Access Control (RBAC) og least privilege principper, så brugere og systemer kun fik adgang til det, de faktisk

behøvede. Jeg konfigurerede også private endpoints og DNS-routing, som sikrer, at ressourcer kun kommunikerer internt. Det var her, jeg virkelig mærkede, hvad security by design betød, sikkerhed er ikke noget, man tilføjer bagefter, men tænker ind fra start. Principperne mindede meget om Zero Trust tilgangen, vi lærte på studiet, hvor alt skal verificeres, og intet antages som sikkert. I praksis lærte jeg, hvor komplekst det var at balancere sikkerhed og brugervenlighed, små ændringer i adgangspolitikker kan få store konsekvenser både for funktionalitet og sikkerhedsniveau.

#### **AI er ikke nødvendigvis en dårlig ting**

Noget, der virkelig overraskede mig undervejs, var, hvor meget kunstig intelligens faktisk fylder i arbejdet hos V1 . Jeg havde forventet, at AI mest blev brugt som et supplement, men oplevede hurtigt, at det er blevet en naturlig del af hverdagen. AI handler ikke om at erstatte mennesker, men om at frigive tid, øge kvaliteten og hjælpe os med at tænke hurtigere og mere effektivt. Det blev tydeligt, at det forventes, man bruger AI som et professionelt værktøj, ikke som snyd, men som en måde at arbejde smartere på.

For eksempel var jeg nødsaget til selv at bruge AI til at optimere mine scripts og få hurtigere feedback på fejl i koden, hvilket både styrkede min forståelse og sparede tid. Jeg oplevede, hvordan teknologien kan støtte det menneskelige arbejde, hvis den bruges klogt. Samtidig kræver det faglig dømmekraft at vide, hvornår man skal stole på AI, og hvornår man skal tænke selv.

Det fik mig til at reflektere over, hvor hurtigt vores fag udvikler sig, og hvor vigtigt det er at være nysgerrig og tilpasningsdygtig. Faglighed handler ikke kun om at kende værktøjerne, men om at forstå, hvordan man bruger dem rigtigt. Jeg blev mindet om et forløb på studiet i Business Intelligence, hvor vi selv skulle bygge en chatbot, dengang blev jeg for alvor klar over, hvor komplekst og intelligent sådanne systemer egentlig er. Den oplevelse gav mig stor respekt for dem, der udvikler AI-løsninger, og for den værdi, teknologien kan skabe i både virksomheder og samfund. I dag ser jeg AI som en slags livline i moderne IT, ikke fordi den gør arbejdet for os, men fordi den gør os bedre til det, vi allerede kan.

#### **Relevans og perspektiv**

Efter tre måneder hos V1 blev det tydeligt, at cloudkompetencer er afgørende i moderne IT. Azure, AWS og GCP danner fundamentet for det meste udvikling, og studiet kunne med fordel tilbyde et valgfag i cloud computing med fokus på ressourcestyring, sikkerhed og Infrastructure as Code.

Min mentor påpegede, at det er "*urealistisk at forvente, at nyuddannede kan navigere i et komplekst cloudmiljø fra dag et"*, men også fremhævede mit gåpåmod og min vilje til at lære nyt. Det bekræftede for mig, at jeg både har udviklet mine tekniske og personlige kompetencer til at trives i et miljø med høje krav. (Bilag 4)

#### **Teamday og refleksion over mine personlige udviklingsmål**

Et af højdepunkterne under praktikken var teamday i Aarhus, hvor jeg for første gang mødte kollegaerne, jeg ellers kun havde samarbejdet med online. Det var obligatorisk at tage en personlighedstest dagen før. Nederst ses testen:

| Solving Problems Page   | Energy Page                                                                         |                                                                                                                                                                 |
|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 A selections:         | 1 A selections:                                                                     | 0                                                                                                                                                               |
| 2 B selections:         | 0 B selections:                                                                     | 2                                                                                                                                                               |
| 3 C selections:         | 2 C selections:                                                                     | . 3                                                                                                                                                             |
| 0 D selections:         | 3 D selections:                                                                     | 1                                                                                                                                                               |
| 6 Total selections:     | 6 Total selections:                                                                 | 6                                                                                                                                                               |
| Category identification |                                                                                     |                                                                                                                                                                 |
| #A                      | 2                                                                                   |                                                                                                                                                                 |
| #B                      | 4                                                                                   |                                                                                                                                                                 |
|                         | 1 A selections: 2 B selections: 3 C selections: 0 D selections: 6 Total selections: | 1 A selections: 2 B selections: 3 C selections: 2 D selections: 3 D selections: 4 Total selections: 5 Total selections: 6 Total selections: 6 Total selections: |

Den gav indsigt i vores arbejds- og kommunikationsstil. Jeg scorede højt i den relationsorienterede kategori (C) og lå også stærkt i de strukturerede (B) og kreative (D) områder, mens den analytiske del (A) var lavere. Resultatet mindede mig om Belbins teamroller, som vi har arbejdet med på studiet, hvor jeg kunne genkende mig selv i den koordinerende og relationsskabende rolle. Det var interessant, fordi jeg tidligere, især i skolesammenhæng, har set mig selv som mere analytisk og selvstændig. Praktikken viste, at jeg faktisk trives i samarbejde og naturligt tager initiativ til dialoger, sikrer, at alle bliver hørt, og hjælper med at skabe en positiv stemning. I et miljø med en mentor, der prioriterede kommunikation og videndeling højt, lærte jeg, at samarbejde ikke kun handler om at tale sammen, men om at skabe fælles forståelse. Et konkret eksempel var, da jeg skulle præsentere mit arbejde en kollega på engelsk. Det var grænseoverskridende og præsentationen gjorde mig mere bevidst om, at teknisk kunnen kun er én del af rollen som udvikler: evnen til at kommunikere, lytte og skabe relationer er lige så afgørende.

Personlighedstesten fik mig til at reflektere mere systematisk over min udvikling som både kollega og individ. Jeg lærte at ro og nysgerrighed ofte er nøglen, når presset er størst, og at det betaler sig at stille spørgsmål tidligt i processen. Min mentor skabte et læringsrum, hvor spørgsmål blev værdsat, og hvor erfaring og refleksion gik hånd i hånd. Vores samtaler handlede lige så meget om, hvordan man lærer, som om teknik, og jeg oplevede, hvordan ny nysgerrighed og mange års erfaring kan berige hinanden. Praktikken blev derfor ikke bare et forløb, men en dialog mellem to måder at forstå IT på.

#### **Refleksion over praktikforløbets udbytte for virksomheden**

Jeg spurgte mit team og flere kollegaer om deres oplevelse af at have en praktikant, og responsen overraskede mig positivt (Bilag 4). For V1 blev forløbet en gevinst frem for en ekstra opgave. Jeg deltog aktivt i udviklingen af løsninger, blandt andet ved at forbedre parameterfiler, designe Biceptemplates og udvikle pipelines, som blev implementeret direkte hos kunden. Mit arbejde skabte værdi for både teamet og PenSam og blev mødt med positiv feedback.

Praktikken blev et samspil mellem ny energi og erfaring. Jeg lærte af mine kollegaers rutine, mens de blev inspireret af mit friske perspektiv. Det viste mig, hvor vigtigt samarbejde, struktur og kommunikation er, når presset er højt. For V1 betød det nye idéer, og for mig blev det et solidt skridt mod den udvikler, jeg er ved at blive.

I sidste ende handlede det ikke kun om teknik, men om mennesker. At turde række ud, dele viden, stille spørgsmål og vise omsorg, når nogen har en svær dag. Det er det, der skaber et stærkt team.

#### **En kvittering for evalueringsskemaet**

#### **Antal ord 10870 med mellemrum**

![](_page_4_Picture_9.jpeg)

# -5 sem 21/10/2025

## Bilag

Bilag 1: Azure DevOps Kanban board (udsnit fra midtvejs i processen)

![](_page_5_Picture_4.jpeg)

## -5 sem 21/10/2025

Bilag 2: Visualisering af CI/CD-pipeline

![](_page_6_Figure_3.jpeg)

![](_page_6_Figure_4.jpeg)

**Bilag 3:** SDLC-modellen anvendt i praksis hos V1

![](_page_7_Picture_3.jpeg)

## -5 sem 21/10/2025

Bilag 4: Feedback på min indsats og udvikling (med tilladelse til fremvisning)

Hej F,

Her er min feedback.

I øvrigt har Morten hos P testet fra dev og test ... og det VIRKER! Tak for indsatsen

![](_page_8_Figure_6.jpeg)

## -5 sem

Hej F,

Hvad synes du, at I som team eller virksomhed har fået ud af at have mig som praktikant?
 (Det behøver ikke kun være fagligt det kan også handle om samarbejde, energi, stemning eller perspektiv.)

Jeg synes det har været rigtig dejligt at have dig med om bord, du har virkeligt bidraget til den positive stemning på kontoret. Du er indgået i de faglige samtaler og fået det bedste frem i "dine" kollegaer der har skulle påtage sig en mentor rolle og det er dejligt at se.

1. Hvad synes du, jeg som person eller praktikant har bidraget med til teamet eller projektet hos A?

Du har bidraget til godt kollegialt klima, hvor du med din personlighed har budt ind med ungdommelighed og positiv stemning

1. Hvad synes du, jeg har været særligt god til og har du måske et godt råd med på vejen, som jeg kan tage med mig videre i min udvikling?

Jeg har desværre ikke været inden over din arbejdsopgaver, men det jeg har været mest imponeret over er, hvordan din personlighed har kunne glide ind i flokken og det virker som du har været her altid.:-)

#### Best Regards

![](_page_9_Figure_10.jpeg)

![](_page_9_Figure_11.jpeg)
