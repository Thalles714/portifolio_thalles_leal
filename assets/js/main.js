(function () {
import("../../src/modules/signal-motion").then(function (signalMotionModule) {
      var createSignalMotion = signalMotionModule.createSignalMotion;
      import("../../src/modules/reveals").then(function (revealModule) {
      var createReveals = revealModule.createReveals;
      "use strict";

      var root = document.documentElement;
      var body = document.body;
      var descriptionMeta = document.querySelector('meta[name="description"]');
      var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

      var translations = {
        en: {
          documentTitle: "Thalles Leal — Junior Front-end & Full-stack Developer",
          description: "Thalles Leal is a junior front-end and full-stack developer who builds responsive web interfaces and applications with React, Next.js and Node.js.",
          skipLink: "Skip to portfolio",
          headerStatus: "Open to junior roles + freelance",
          navAbout: "About",
          navProjects: "Work",
          navSkills: "Skills",
          navContact: "Contact",
          navContactMobile: "Contact",
          menuHeading: "Navigate / Portfolio",
          menuHome: "Home",
          menuExperience: "Experience",
          menuAvailability: "Availability",
          languageAction: "Português / BR",
          heroEyebrow: "Junior front-end & full-stack developer",
          heroCoordinates: "Brazil / Remote",
          heroTitle1: "Digital work",
          heroTitle2: "built with",
          heroTitle3: "gravity.",
          heroIntro: "I build <strong>responsive web interfaces and applications</strong> with React, Next.js and Node.js, from implementation to deployment.",
          heroPrimary: "View selected work",
          heroSecondary: "Open contact channels",
          heroIndex: "Portfolio / 2026<br>React · Next.js · Node.js",
          profilePreludeEyebrow: "Profile / How I work",
          profilePreludeTitle1: "I understand.",
          profilePreludeTitle2: "Then I build.",
          profileBridgeBody: "I turn requirements into responsive interfaces and web applications, balancing clarity, performance and maintainable code.",
          profileBridgeFactsLabel: "Profile highlights",
          profileBridgeFact1: "Junior developer",
          profileBridgeFact2: "Freelance projects",
          profileBridgeFact3: "Brazil / Remote",
          profileBridgeAction: "See professional overview",
          profileRegionLabel: "Profile — five personal chapters",
          profileCarouselLabel: "Horizontal profile narrative. Use the arrow keys or controls to move through five slides.",
          profileKicker: "Profile / Six inner coordinates",
          profileDirection: "Scroll to cross the archive",
          profileKeywordsLabel: "Keywords",
          profilePaginationLabel: "Choose a profile slide",
          profileNavigationLabel: "Profile navigation",
          profilePrevious: "Previous profile slide",
          profileNext: "Next profile slide",
          profileGo1: "Go to profile slide 1",
          profileGo2: "Go to profile slide 2",
          profileGo3: "Go to profile slide 3",
          profileGo4: "Go to profile slide 4",
          profileGo5: "Go to profile slide 5",
          profileGo6: "Go to profile slide 6",
          profileSlide1Label: "Profile slide 1 of 5: Curiosity",
          profileSlide1Chapter: "Chapter 01 / Curiosity",
          profileSlide1Code: "Observe",
          profileSlide1Title1: "I follow",
          profileSlide1Title2: "the question.",
          profileSlide1Title: "I begin with the question.",
          profileSlide1Body: "Curiosity comes first. I understand what truly needs to be built.",
          profileSlide1Tag1: "Curiosity",
          profileSlide1Tag2: "Learning",
          profileSlide1Tag3: "Evolution",
          profilePhoto1Alt: "Monochrome landscape with a bright rectangular portal between rock formations.",
          profilePhoto1Caption: "Personal archive / Night study",
          profilePhoto1Meta: "Light / Shadow / 01",
          profileSlide2Label: "Profile slide 2 of 5: Structure",
          profileSlide2Chapter: "Chapter 02 / Intent",
          profileSlide2Code: "Understand",
          profileSlide2Title1: "The problem",
          profileSlide2Title2: "comes first.",
          profileSlide2Title: "Structure shapes ideas.",
          profileSlide2Body: "Clarity, intuitive use and maintainable code work as one system.",
          profileSlide2Tag1: "Context",
          profileSlide2Tag2: "Need",
          profileSlide2Tag3: "Direction",
          profilePhoto2Alt: "Monumental concrete cube illuminated from within in a misty landscape.",
          profilePhoto2Caption: "Personal archive / Through the layer",
          profilePhoto2Meta: "Context / Signal / 02",
          profileSlide3Label: "Profile slide 3 of 5: Relationships",
          profileSlide3Chapter: "Chapter 03 / Craft",
          profileSlide3Code: "Connect",
          profileSlide3Title1: "Interface meets",
          profileSlide3Title2: "infrastructure.",
          profileSlide3Title: "Everything must connect.",
          profileSlide3Body: "Interface, performance and dependable code move in one direction.",
          profileLocation: "Brazil / Remote",
          profileSlide3Tag1: "Design",
          profileSlide3Tag2: "Performance",
          profileSlide3Tag3: "Systems",
          profilePhoto3Alt: "Abstract molecular network with illuminated nodes against a dark background.",
          profilePhoto3Caption: "Personal archive / Street system",
          profilePhoto3Meta: "Interface / Structure / 03",
          profileSlide4Label: "Profile slide 4 of 5: Creative rhythm",
          profileSlide4Chapter: "Chapter 04 / Method",
          profileSlide4Code: "Refine",
          profileSlide4Title1: "Details hold",
          profileSlide4Title2: "the whole.",
          profileSlide4Title: "Rhythm is a tool.",
          profileSlide4Body: "Music taught me timing, contrast and pause.",
          profileSlide4Tag1: "Clarity",
          profileSlide4Tag2: "Quality",
          profileSlide4Tag3: "Continuity",
          profilePhoto4Alt: "Expressive painting of figures moving through a vivid landscape.",
          profilePhoto4Caption: "Personal archive / Classical frame",
          profilePhoto4Meta: "Detail / Material / 04",
          profileSlide5Label: "Profile slide 5 of 5: Brazil and remote work",
          profileSlide5Chapter: "Chapter 05 / Rhythm",
          profileSlide5Code: "Listen",
          profileSlide5Title1: "Code is not my",
          profileSlide5Title2: "only language.",
          profileSlide5Title: "From Brazil to the world.",
          profileSlide5Body: "Available for remote teams, ready to contribute and grow.",
          profileSlide5Tag1: "Guitar",
          profileSlide5Tag2: "Voice",
          profileSlide5Tag3: "Spotify",
          profilePhoto5Alt: "Circular architectural structure facing a wide ocean horizon.",
          profilePhoto5Caption: "Personal archive / Studio process",
          profilePhoto5Meta: "Voice / Rhythm / 05",
          profileSlide6Label: "Profile slide 6 of 6: Range",
          profileSlide6Chapter: "Chapter 06 / Range",
          profileSlide6Code: "Move",
          profileSlide6Title1: "Built in Brazil.",
          profileSlide6Title2: "Open to the world.",
          profileSlide6Body: "Based in Brazil and available remotely, I am open to national and international teams where I can contribute, collaborate and keep growing.",
          profileSlide6Tag1: "Brazil",
          profileSlide6Tag2: "Remote",
          profileSlide6Tag3: "Open",
          profilePhoto6Alt: "A motion-blurred night portrait of Thalles Leal dressed in black with golden chains.",
          profilePhoto6Caption: "Personal archive / Moving frame",
          profilePhoto6Meta: "Brazil / Remote / 06",
          signalKicker: "Professional signal / Active",
          signalTitle1: "Work",
          signalTitle2: "you can inspect.",
          signalIntro: "Four projects showing my progression from responsive interfaces to tested, production-ready web products.",
          signalCta: "View the 4 projects",
          signalMapLabel: "Static signal map centered on Brazil, indicating availability for remote work",
          signalMapEyebrow: "Range / Remote",
          signalMapSignal: "Local signal",
          signalMapLocation: "Brazil / Remote",
          signalMapTitle: "Open to junior front-end or full-stack roles.",
          signalMapNote: "Available remotely and for freelance projects.",
          signalProjectsLabel: "Featured projects",
          signalEvidence: "Verified work",
          signalProjectsNote: "Operations, private financial analysis, healthcare and solar energy.",
          signalProjectsAction: "Go to selected projects",
          signalCoverageLabel: "Project coverage",
          signalCoverageAria: "Verified capabilities across four portfolio projects",
          signalCoverageReact: "React",
          signalCoverageResponsive: "Responsive interface",
          signalCoverageTypeScript: "TypeScript",
          signalCoverageTesting: "Automated testing",
          signalCoverageLocalFirst: "Offline / local-first",
          signalFlowLabel: "End-to-end practice",
          signalFlowStatus: "Current scope",
          signalFlowDiscovery: "Discovery",
          signalFlowArchitecture: "Architecture",
          signalFlowInterface: "Interface",
          signalFlowPerformance: "Performance",
          signalFlowDeploy: "Deploy",
          signalFlowEvolution: "Evolution",
          signalEducationLabel: "Expected completion",
          signalEducationStatus: "In progress",
          signalEducationCopy: "Systems Analysis & Development / UNIP",
          signalStackLabel: "Core stack",
          projectsKicker: "Selected work / 04 builds",
          projectsTitle1: "Selected",
          projectsTitle2: "projects.",
          projectsIntro: "Four projects tracing my progression from responsive websites to multi-tenant and local-first products with automated testing.",
          projectNavigatorLabel: "Project navigator",
          projectNavigatorKicker: "Choose a transmission",
          projectNavigatorAction: "Open project",
          projectNavigatorHint: "Drag, use the arrows or choose a signal to inspect a project.",
          projectNavigatorPrevious: "Previous project",
          projectNavigatorNext: "Next project",
          projectNavigatorPagination: "Choose a project",
          projectNavigatorFormat: "Format",
          projectNavigatorFocus: "Focus",
          projectNavigatorRoute: "Route",
          nitidoRole: "Front-end product project / Private local-first financial analysis",
          nitidoDescription: "I built a responsive PWA that imports CSV and OFX statements, processes financial data on-device and turns transactions into explainable dashboards without requiring an account.",
          nitidoResult: "Private offline-capable analysis, 24 automated tests, E2E coverage and CI/CD to Cloudflare Workers",
          goodRole: "Full-stack freelancer / Institutional landing page",
          goodDescription: "I developed a responsive landing page for a solar-energy company, with reusable React components, technical SEO and automated deployment.",
          goodResult: "Landing page published with a mobile-ready interface",
          voeRole: "Front-end freelancer / Healthcare website",
          voeDescription: "I developed the interface for a multidisciplinary clinic website, organizing accessible content, responsive navigation and contact through WhatsApp.",
          voeResult: "Responsive website with a direct WhatsApp contact path",
          catalogRole: "Full-stack freelancer / Management platform",
          catalogDescription: "I built a web application for brokers to manage and publish agricultural machinery, including authentication, CRUD operations and an admin panel.",
          catalogResult: "Catalog with authentication, database and administrative panel",
          workflowRole: "Full-stack product project / Operations management SaaS",
          workflowDescription: "I built a SaaS for small agencies to organize clients, projects, deliverables and tasks in one consistent operational hierarchy.",
          workflowResult: "Multi-tenant application with server-side authorization, PostgreSQL RLS, automated tests and a safe read-only demo",
          caseContextLabel: "Context",
          caseDecisionLabel: "Product decision",
          caseEvidenceLabel: "Evidence",
          caseInterfaceLabel: "Interface evidence",
          workflowContext: "Small agencies can lose deadlines and approvals when client work is scattered across disconnected tools.",
          workflowDecision: "I connected clients, projects, deliverables and tasks in one hierarchy, then surfaced the next decision instead of another generic dashboard.",
          workflowEvidence: "The public read-only demo lets anyone follow a critical signal to its blocked task using safe, entirely fictitious data.",
          workflowCaption: "From the attention center to the blocked task, the operational context remains visible across desktop and mobile.",
          workflowCoverAlt: "Workflow operational hierarchy converging on a critical blocked task.",
          workflowShotPrimaryAlt: "Workflow operations dashboard highlighting a blocked landing page and the next decision.",
          workflowShotSecondaryAlt: "Workflow task detail preserving the client, project and next-step context.",
          workflowShotMobileAlt: "Workflow attention center adapted to a mobile viewport.",
          nitidoContext: "Bank statements contain useful answers, but they are difficult to read and too sensitive to send to an unknown server.",
          nitidoDecision: "I designed an account-free flow that processes CSV and OFX files on-device and turns raw transactions into plain-language categories and insights.",
          nitidoEvidence: "The built-in example converts 148 fictitious transactions into a private, responsive report that remains available offline.",
          nitidoCaption: "Privacy is part of the interface: the product explains where processing happens while keeping the financial reading direct.",
          nitidoCoverAlt: "Nítido transforms a private financial statement into clear local insights.",
          nitidoShotPrimaryAlt: "Nítido home screen explaining local financial processing without connecting a bank account.",
          nitidoShotSecondaryAlt: "Nítido category analysis showing spending totals and proportional bars.",
          nitidoShotMobileAlt: "Nítido financial summary adapted to a mobile viewport.",
          metaStack: "Stack",
          metaResult: "Result",
          projectAction: "Visit live project",
          skillsKicker: "Technical skills / Applied in projects",
          skillsTitle1: "Tools used",
          skillsTitle2: "in practice.",
          skillsIntro: "A visual inventory of the technologies I use to design, build, test and ship real products.",
          skillsRackLabel: "Technologies used in shipped projects",
          skillDomainInterface: "Interface",
          skillDomainData: "Data",
          skillDomainQuality: "Quality",
          skillDomainDelivery: "Delivery",
          skillInterface: "Front-end & product",
          skillSystems: "Data & architecture",
          skillDelivery: "Delivery & security",
          skillCraft: "Quality & testing",
          experienceKicker: "Path / Practice + education",
          experienceTitle1: "Learning by",
          experienceTitle2: "shipping.",
          experienceLabel: "Experience",
          freelanceTitle: "Full-stack developer",
          freelanceMeta: "Freelance / Current practice",
          freelanceBody: "I turn project requirements into responsive interfaces and web applications, then version, deploy and maintain each delivery.",
          educationLabel: "Education",
          educationTitle: "Systems analysis & development",
          educationMeta: "Universidade Paulista — UNIP / In progress",
          educationBody: "Degree in progress at Universidade Paulista (UNIP). Expected completion: December 2026.",
          availabilityStatus: "Open to conversations",
          availabilityTitle1: "Open to junior roles.",
          availabilityTitle2: "Available remotely.",
          availabilityWorkLabel: "Work",
          availabilityWorkValue: "Junior role / Freelance",
          availabilityModeLabel: "Mode",
          availabilityModeValue: "Remote / English-friendly teams",
          availabilityPeriodLabel: "Preferred",
          availabilityPeriodValue: "Evening period",
          contactKicker: "Contact / Start a conversation",
          contactTitle1: "Let's talk",
          contactTitle2: "about your",
          contactTitle3: "next project.",
          contactAction: "Chat on WhatsApp",
          contactChannelsLabel: "Contact channels",
          contactSpotifyMeta: "Artist profile",
          contactLinkedinMeta: "Professional profile",
          contactEmailMeta: "thallestleal@gmail.com · Copy email",
          contactEmailCopied: "thallestleal@gmail.com · Copied",
          contactEmailAria: "Copy email address thallestleal@gmail.com",
          contactEmailStatus: "Email address thallestleal@gmail.com copied to the clipboard.",
          contactEmailError: "Email address: thallestleal@gmail.com",
          contactDiscordMeta: "@talerich · Copy username",
          contactDiscordCopied: "@talerich · Copied",
          contactDiscordAria: "Copy Discord username @talerich",
          contactDiscordStatus: "Discord username @talerich copied to the clipboard.",
          contactDiscordError: "Discord username: @talerich",
          footerKicker: "Epilogue / Contact",
          footerIndex: "End of page",
          footerTitle1: "Thanks for",
          footerTitle2: "visiting.",
          footerNote: "See the projects above or get in touch to talk about a junior role or freelance work.",
          footerBack: "Return to orbit",
          footerCopyright: "Brazil / 2026",
          footerLinksLabel: "Footer links",
          openMenu: "Open navigation menu",
          closeMenu: "Close navigation menu",
          switchLanguage: "Mudar idioma para português",
          wordmarkLabel: "Thalles Leal, home",
          primaryNavigation: "Primary navigation",
          menuNavigation: "Menu navigation",
          siteMenu: "Site menu"
        },
        pt: {
          documentTitle: "Thalles Leal — Desenvolvedor Front-end & Full-stack Júnior",
          description: "Thalles Leal é desenvolvedor front-end e full-stack júnior. Cria interfaces e aplicações web responsivas com React, Next.js e Node.js.",
          skipLink: "Ir para o portfólio",
          headerStatus: "Aberto a vagas júnior + freelance",
          navAbout: "Sobre",
          navProjects: "Projetos",
          navSkills: "Competências",
          navContact: "Contato",
          navContactMobile: "Contato",
          menuHeading: "Navegar / Portfólio",
          menuHome: "Início",
          menuExperience: "Experiência",
          menuAvailability: "Disponibilidade",
          languageAction: "English / EN",
          heroEyebrow: "Desenvolvedor front-end & full-stack júnior",
          heroCoordinates: "Brasil / Remoto",
          heroTitle1: "Produtos",
          heroTitle2: "feitos com",
          heroTitle3: "gravidade.",
          heroIntro: "Desenvolvo <strong>interfaces e aplicações web responsivas</strong> com React, Next.js e Node.js, da implementação ao deploy.",
          heroPrimary: "Ver projetos",
          heroSecondary: "Abrir canais de contato",
          heroIndex: "Portfólio / 2026<br>React · Next.js · Node.js",
          profilePreludeEyebrow: "Perfil / Como eu trabalho",
          profilePreludeTitle1: "Eu entendo.",
          profilePreludeTitle2: "Depois construo.",
          profileBridgeBody: "Transformo requisitos em interfaces responsivas e aplicações web, equilibrando clareza, performance e código sustentável.",
          profileBridgeFactsLabel: "Destaques do perfil",
          profileBridgeFact1: "Desenvolvedor júnior",
          profileBridgeFact2: "Projetos freelance",
          profileBridgeFact3: "Brasil / Remoto",
          profileBridgeAction: "Ver panorama profissional",
          profileRegionLabel: "Perfil — cinco capítulos pessoais",
          profileCarouselLabel: "Narrativa horizontal de perfil. Use as setas do teclado ou os controles para percorrer cinco slides.",
          profileKicker: "Perfil / Seis coordenadas internas",
          profileDirection: "Role para atravessar o arquivo",
          profileKeywordsLabel: "Palavras-chave",
          profilePaginationLabel: "Escolher um slide do perfil",
          profileNavigationLabel: "Navegação do perfil",
          profilePrevious: "Slide anterior do perfil",
          profileNext: "Próximo slide do perfil",
          profileGo1: "Ir para o slide 1 do perfil",
          profileGo2: "Ir para o slide 2 do perfil",
          profileGo3: "Ir para o slide 3 do perfil",
          profileGo4: "Ir para o slide 4 do perfil",
          profileGo5: "Ir para o slide 5 do perfil",
          profileGo6: "Ir para o slide 6 do perfil",
          profileSlide1Label: "Slide 1 de 5 do perfil: Curiosidade",
          profileSlide1Chapter: "Capítulo 01 / Curiosidade",
          profileSlide1Code: "Observar",
          profileSlide1Title1: "Eu sigo",
          profileSlide1Title2: "a pergunta.",
          profileSlide1Title: "Começo pela pergunta.",
          profileSlide1Body: "A curiosidade vem primeiro. Entendo o que realmente precisa ser construído.",
          profileSlide1Tag1: "Curiosidade",
          profileSlide1Tag2: "Aprendizado",
          profileSlide1Tag3: "Evolução",
          profilePhoto1Alt: "Paisagem monocromática com um portal retangular luminoso entre formações rochosas.",
          profilePhoto1Caption: "Arquivo pessoal / Estudo noturno",
          profilePhoto1Meta: "Luz / Sombra / 01",
          profileSlide2Label: "Slide 2 de 5 do perfil: Estrutura",
          profileSlide2Chapter: "Capítulo 02 / Intenção",
          profileSlide2Code: "Entender",
          profileSlide2Title1: "O problema",
          profileSlide2Title2: "vem primeiro.",
          profileSlide2Title: "Estrutura dá forma às ideias.",
          profileSlide2Body: "Clareza, uso intuitivo e código sustentável funcionam como um sistema.",
          profileSlide2Tag1: "Contexto",
          profileSlide2Tag2: "Necessidade",
          profileSlide2Tag3: "Direção",
          profilePhoto2Alt: "Cubo monumental de concreto iluminado por dentro em uma paisagem com névoa.",
          profilePhoto2Caption: "Arquivo pessoal / Através da camada",
          profilePhoto2Meta: "Contexto / Sinal / 02",
          profileSlide3Label: "Slide 3 de 5 do perfil: Relações",
          profileSlide3Chapter: "Capítulo 03 / Ofício",
          profileSlide3Code: "Conectar",
          profileSlide3Title1: "Interface encontra",
          profileSlide3Title2: "estrutura.",
          profileSlide3Title: "Tudo precisa conversar.",
          profileSlide3Body: "Interface, performance e código confiável seguem na mesma direção.",
          profileLocation: "Brasil / Remoto",
          profileSlide3Tag1: "Design",
          profileSlide3Tag2: "Performance",
          profileSlide3Tag3: "Sistemas",
          profilePhoto3Alt: "Rede molecular abstrata com pontos luminosos sobre um fundo escuro.",
          profilePhoto3Caption: "Arquivo pessoal / Sistema urbano",
          profilePhoto3Meta: "Interface / Estrutura / 03",
          profileSlide4Label: "Slide 4 de 5 do perfil: Ritmo criativo",
          profileSlide4Chapter: "Capítulo 04 / Método",
          profileSlide4Code: "Refinar",
          profileSlide4Title1: "O detalhe sustenta",
          profileSlide4Title2: "o todo.",
          profileSlide4Title: "Ritmo também é ferramenta.",
          profileSlide4Body: "A música me ensinou tempo, contraste e pausa.",
          profileSlide4Tag1: "Clareza",
          profileSlide4Tag2: "Qualidade",
          profileSlide4Tag3: "Continuidade",
          profilePhoto4Alt: "Pintura expressiva de figuras em movimento por uma paisagem vibrante.",
          profilePhoto4Caption: "Arquivo pessoal / Moldura clássica",
          profilePhoto4Meta: "Detalhe / Matéria / 04",
          profileSlide5Label: "Slide 5 de 5 do perfil: Brasil e trabalho remoto",
          profileSlide5Chapter: "Capítulo 05 / Ritmo",
          profileSlide5Code: "Escutar",
          profileSlide5Title1: "Código não é minha",
          profileSlide5Title2: "única linguagem.",
          profileSlide5Title: "Do Brasil para o mundo.",
          profileSlide5Body: "Disponível para equipes remotas, pronto para contribuir e evoluir.",
          profileSlide5Tag1: "Guitarra",
          profileSlide5Tag2: "Voz",
          profileSlide5Tag3: "Spotify",
          profilePhoto5Alt: "Estrutura arquitetônica circular diante de um amplo horizonte oceânico.",
          profilePhoto5Caption: "Arquivo pessoal / Processo de estúdio",
          profilePhoto5Meta: "Voz / Ritmo / 05",
          profileSlide6Label: "Slide 6 de 6 do perfil: Alcance",
          profileSlide6Chapter: "Capítulo 06 / Alcance",
          profileSlide6Code: "Mover",
          profileSlide6Title1: "Feito no Brasil.",
          profileSlide6Title2: "Aberto ao mundo.",
          profileSlide6Body: "No Brasil e disponível remotamente, estou aberto a equipes nacionais e internacionais onde eu possa contribuir, colaborar e continuar evoluindo.",
          profileSlide6Tag1: "Brasil",
          profileSlide6Tag2: "Remoto",
          profileSlide6Tag3: "Aberto",
          profilePhoto6Alt: "Retrato noturno de Thalles Leal com desfoque de movimento, roupa preta e correntes douradas.",
          profilePhoto6Caption: "Arquivo pessoal / Quadro em movimento",
          profilePhoto6Meta: "Brasil / Remoto / 06",
          signalKicker: "Sinal profissional / Em atividade",
          signalTitle1: "Trabalho",
          signalTitle2: "para conferir.",
          signalIntro: "Quatro projetos que mostram minha evolução de interfaces responsivas a produtos web testados e prontos para produção.",
          signalCta: "Ver os 4 projetos",
          signalMapLabel: "Mapa estático de sinal centralizado no Brasil, indicando disponibilidade para trabalho remoto",
          signalMapEyebrow: "Alcance / Remoto",
          signalMapSignal: "Sinal local",
          signalMapLocation: "Brasil / Remoto",
          signalMapTitle: "Aberto a vagas front-end ou full-stack júnior.",
          signalMapNote: "Disponível para trabalho remoto e projetos freelance.",
          signalProjectsLabel: "Projetos em destaque",
          signalEvidence: "Trabalho verificável",
          signalProjectsNote: "Operações, análise financeira privada, saúde e energia solar.",
          signalProjectsAction: "Ir para os projetos selecionados",
          signalCoverageLabel: "Cobertura dos projetos",
          signalCoverageAria: "Capacidades verificadas nos quatro projetos do portfólio",
          signalCoverageReact: "React",
          signalCoverageResponsive: "Interface responsiva",
          signalCoverageTypeScript: "TypeScript",
          signalCoverageTesting: "Testes automatizados",
          signalCoverageLocalFirst: "Offline / local-first",
          signalFlowLabel: "Prática de ponta a ponta",
          signalFlowStatus: "Escopo atual",
          signalFlowDiscovery: "Descoberta",
          signalFlowArchitecture: "Arquitetura",
          signalFlowInterface: "Interface",
          signalFlowPerformance: "Performance",
          signalFlowDeploy: "Deploy",
          signalFlowEvolution: "Evolução",
          signalEducationLabel: "Conclusão prevista",
          signalEducationStatus: "Em andamento",
          signalEducationCopy: "Análise e Desenvolvimento de Sistemas / UNIP",
          signalStackLabel: "Stack principal",
          projectsKicker: "Projetos selecionados / 04 entregas",
          projectsTitle1: "Projetos",
          projectsTitle2: "selecionados.",
          projectsIntro: "Quatro projetos que registram minha evolução de sites responsivos a produtos multi-tenant e local-first com testes automatizados.",
          projectNavigatorLabel: "Navegador de projetos",
          projectNavigatorKicker: "Escolha uma transmissão",
          projectNavigatorAction: "Abrir projeto",
          projectNavigatorHint: "Arraste, use as setas ou escolha um sinal para conhecer um projeto.",
          projectNavigatorPrevious: "Projeto anterior",
          projectNavigatorNext: "Próximo projeto",
          projectNavigatorPagination: "Escolher um projeto",
          projectNavigatorFormat: "Formato",
          projectNavigatorFocus: "Foco",
          projectNavigatorRoute: "Rota",
          nitidoRole: "Projeto autoral front-end / Análise financeira privada e local-first",
          nitidoDescription: "Construí uma PWA responsiva que importa extratos CSV e OFX, processa os dados financeiros no dispositivo e transforma transações em dashboards explicáveis sem exigir cadastro.",
          nitidoResult: "Análise privada com modo offline, 24 testes automatizados, cobertura E2E e CI/CD no Cloudflare Workers",
          goodRole: "Freelancer full-stack / Landing page institucional",
          goodDescription: "Desenvolvi uma landing page responsiva para uma empresa de energia solar, com componentes React reutilizáveis, SEO técnico e deploy automatizado.",
          goodResult: "Landing page publicada com interface adaptada ao mobile",
          voeRole: "Freelancer front-end / Site para saúde",
          voeDescription: "Desenvolvi a interface do site de uma clínica multidisciplinar, organizando conteúdo acessível, navegação responsiva e contato pelo WhatsApp.",
          voeResult: "Site responsivo com caminho direto para contato pelo WhatsApp",
          catalogRole: "Freelancer full-stack / Plataforma de gestão",
          catalogDescription: "Construí uma aplicação para corretores gerenciarem e publicarem máquinas agrícolas, com autenticação, operações CRUD e painel administrativo.",
          catalogResult: "Catálogo com autenticação, banco de dados e painel administrativo",
          workflowRole: "Projeto autoral full-stack / SaaS de gestão operacional",
          workflowDescription: "Construí um SaaS para pequenas agências organizarem clientes, projetos, entregas e tarefas em uma hierarquia operacional consistente.",
          workflowResult: "Aplicação multi-tenant com autorização no servidor, RLS no PostgreSQL, testes automatizados e demo segura somente leitura",
          caseContextLabel: "Contexto",
          caseDecisionLabel: "Decisão de produto",
          caseEvidenceLabel: "Evidência",
          caseInterfaceLabel: "Evidência de interface",
          workflowContext: "Pequenas agências podem perder prazos e aprovações quando o trabalho dos clientes fica espalhado entre ferramentas desconectadas.",
          workflowDecision: "Conectei clientes, projetos, entregas e tarefas em uma única hierarquia e destaquei a próxima decisão, em vez de criar outro dashboard genérico.",
          workflowEvidence: "A demo pública somente leitura permite seguir um sinal crítico até a tarefa bloqueada usando dados seguros e inteiramente fictícios.",
          workflowCaption: "Da central de atenção à tarefa bloqueada, o contexto operacional permanece visível no desktop e no mobile.",
          workflowCoverAlt: "Hierarquia operacional do Workflow convergindo para uma tarefa crítica bloqueada.",
          workflowShotPrimaryAlt: "Painel operacional do Workflow destacando uma landing page bloqueada e a próxima decisão.",
          workflowShotSecondaryAlt: "Detalhe de tarefa do Workflow preservando o contexto de cliente, projeto e próximo passo.",
          workflowShotMobileAlt: "Central de atenção do Workflow adaptada a uma tela mobile.",
          nitidoContext: "Extratos bancários contêm respostas úteis, mas são difíceis de ler e sensíveis demais para enviar a um servidor desconhecido.",
          nitidoDecision: "Criei um fluxo sem cadastro que processa arquivos CSV e OFX no dispositivo e transforma transações brutas em categorias e insights em linguagem direta.",
          nitidoEvidence: "O exemplo integrado transforma 148 transações fictícias em um relatório privado, responsivo e disponível offline.",
          nitidoCaption: "Privacidade faz parte da interface: o produto explica onde o processamento acontece sem complicar a leitura financeira.",
          nitidoCoverAlt: "O Nítido transforma um extrato financeiro privado em informações locais e claras.",
          nitidoShotPrimaryAlt: "Tela inicial do Nítido explicando o processamento financeiro local sem conectar uma conta bancária.",
          nitidoShotSecondaryAlt: "Análise de categorias do Nítido mostrando totais de gastos e barras proporcionais.",
          nitidoShotMobileAlt: "Resumo financeiro do Nítido adaptado a uma tela mobile.",
          metaStack: "Stack",
          metaResult: "Resultado",
          projectAction: "Visitar projeto publicado",
          skillsKicker: "Competências técnicas / Aplicadas em projetos",
          skillsTitle1: "Ferramentas usadas",
          skillsTitle2: "na prática.",
          skillsIntro: "Um inventário visual das tecnologias que uso para projetar, desenvolver, testar e publicar produtos reais.",
          skillsRackLabel: "Tecnologias usadas em projetos publicados",
          skillDomainInterface: "Interface",
          skillDomainData: "Dados",
          skillDomainQuality: "Qualidade",
          skillDomainDelivery: "Entrega",
          skillInterface: "Front-end e produto",
          skillSystems: "Dados e arquitetura",
          skillDelivery: "Entrega e segurança",
          skillCraft: "Qualidade e testes",
          experienceKicker: "Trajetória / Prática + formação",
          experienceTitle1: "Aprendendo ao",
          experienceTitle2: "entregar.",
          experienceLabel: "Experiência",
          freelanceTitle: "Desenvolvedor full-stack",
          freelanceMeta: "Freelance / Atuação atual",
          freelanceBody: "Transformo requisitos em interfaces responsivas e aplicações web; depois versiono, publico e mantenho cada entrega.",
          educationLabel: "Formação",
          educationTitle: "Análise e desenvolvimento de sistemas",
          educationMeta: "Universidade Paulista — UNIP / Cursando",
          educationBody: "Graduação em andamento na Universidade Paulista (UNIP). Conclusão prevista: dezembro de 2026.",
          availabilityStatus: "Aberto a conversas",
          availabilityTitle1: "Aberto a vagas júnior.",
          availabilityTitle2: "Disponível remotamente.",
          availabilityWorkLabel: "Trabalho",
          availabilityWorkValue: "Vaga júnior / Freelance",
          availabilityModeLabel: "Formato",
          availabilityModeValue: "Remoto / Equipes em inglês",
          availabilityPeriodLabel: "Preferência",
          availabilityPeriodValue: "Período noturno",
          contactKicker: "Contato / Começar uma conversa",
          contactTitle1: "Vamos conversar",
          contactTitle2: "sobre o seu",
          contactTitle3: "próximo projeto.",
          contactAction: "Conversar no WhatsApp",
          contactChannelsLabel: "Canais de contato",
          contactSpotifyMeta: "Perfil de artista",
          contactLinkedinMeta: "Perfil profissional",
          contactEmailMeta: "thallestleal@gmail.com · Copiar email",
          contactEmailCopied: "thallestleal@gmail.com · Copiado",
          contactEmailAria: "Copiar endereço de email thallestleal@gmail.com",
          contactEmailStatus: "Email thallestleal@gmail.com copiado para a área de transferência.",
          contactEmailError: "Endereço de email: thallestleal@gmail.com",
          contactDiscordMeta: "@talerich · Copiar usuário",
          contactDiscordCopied: "@talerich · Copiado",
          contactDiscordAria: "Copiar usuário do Discord @talerich",
          contactDiscordStatus: "Usuário do Discord @talerich copiado para a área de transferência.",
          contactDiscordError: "Usuário do Discord: @talerich",
          footerKicker: "Epílogo / Contato",
          footerIndex: "Fim da página",
          footerTitle1: "Obrigado pela",
          footerTitle2: "visita.",
          footerNote: "Veja os projetos acima ou entre em contato para conversar sobre uma vaga júnior ou trabalho freelance.",
          footerBack: "Voltar à órbita",
          footerCopyright: "Brasil / 2026",
          footerLinksLabel: "Links do rodapé",
          openMenu: "Abrir menu de navegação",
          closeMenu: "Fechar menu de navegação",
          switchLanguage: "Switch language to English",
          wordmarkLabel: "Thalles Leal, início",
          primaryNavigation: "Navegação principal",
          menuNavigation: "Navegação do menu",
          siteMenu: "Menu do site"
        }
      };

      var storedLanguage = null;
      try {
        storedLanguage = window.localStorage.getItem("portfolio-language");
      } catch (error) {
        storedLanguage = null;
      }
      var currentLanguage = translations[storedLanguage]
        ? storedLanguage
        : navigator.language && navigator.language.toLowerCase().indexOf("pt") === 0
          ? "pt"
          : "en";

      function deterministicOrder(index, length) {
        return (index * 7 + Math.floor(index / 3) * 3) % Math.max(1, length);
      }

      function buildKineticLabels() {
        document.querySelectorAll(".kinetic-label").forEach(function (label) {
          var text = label.textContent || "";
          label.textContent = "";
          Array.from(text).forEach(function (character, index) {
            var cell = document.createElement("span");
            var top = document.createElement("span");
            var bottom = document.createElement("span");
            cell.className = "char-cell" + (character === " " ? " char-space" : "");
            cell.style.setProperty("--char-order", deterministicOrder(index, text.length));
            top.className = "char-glyph";
            bottom.className = "char-glyph";
            top.textContent = character === " " ? "\u00a0" : character;
            bottom.textContent = character === " " ? "\u00a0" : character;
            bottom.setAttribute("aria-hidden", "true");
            cell.appendChild(top);
            cell.appendChild(bottom);
            label.appendChild(cell);
          });
          label.setAttribute("aria-label", text);
        });
      }

      function setLanguage(language) {
        currentLanguage = translations[language] ? language : "en";
        var values = translations[currentLanguage];
        root.lang = currentLanguage === "pt" ? "pt-BR" : "en";
        root.dataset.lang = currentLanguage;
        document.title = values.documentTitle;
        descriptionMeta.setAttribute("content", values.description);

        document.querySelectorAll("[data-i18n]").forEach(function (element) {
          var key = element.getAttribute("data-i18n");
          if (values[key] !== undefined) element.textContent = values[key];
        });

        document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
          var key = element.getAttribute("data-i18n-html");
          if (values[key] !== undefined) element.innerHTML = values[key];
        });

        document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
          var key = element.getAttribute("data-i18n-alt");
          if (values[key] !== undefined) element.alt = values[key];
        });

        document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
          var key = element.getAttribute("data-i18n-aria-label");
          if (values[key] !== undefined) element.setAttribute("aria-label", values[key]);
        });

        document.querySelector("#skip-link").textContent = values.skipLink;
        document.querySelector(".wordmark").setAttribute("aria-label", values.wordmarkLabel);
        document.querySelector(".desktop-nav").setAttribute("aria-label", values.primaryNavigation);
        document.querySelector("#menu-panel").setAttribute("aria-label", values.siteMenu);
        document.querySelector("#menu-panel nav").setAttribute("aria-label", values.menuNavigation);
        document.querySelector(".footer-socials").setAttribute("aria-label", values.footerLinksLabel);
        document.querySelectorAll("[data-language-toggle]").forEach(function (button) {
          button.setAttribute("aria-label", values.switchLanguage);
        });
        updateMenuLabel();
        buildKineticLabels();
      }

      document.querySelectorAll("[data-language-toggle]").forEach(function (button) {
        button.addEventListener("click", function () {
          var nextLanguage = currentLanguage === "en" ? "pt" : "en";
          setLanguage(nextLanguage);
          try {
            window.localStorage.setItem("portfolio-language", nextLanguage);
          } catch (error) {
            // Language switching still works when storage is unavailable.
          }
        });
      });

      var copyContactButtons = document.querySelectorAll("[data-copy-contact]");
      var copyContactStatus = document.querySelector("[data-copy-status]");
      var copyResetTimers = new WeakMap();

      function copyText(value) {
        if (navigator.clipboard && window.isSecureContext) {
          return navigator.clipboard.writeText(value).then(function () {
            return true;
          }).catch(function () {
            return false;
          });
        }

        return new Promise(function (resolve) {
          var field = document.createElement("textarea");
          field.value = value;
          field.setAttribute("readonly", "");
          field.style.position = "fixed";
          field.style.opacity = "0";
          body.appendChild(field);
          field.select();
          var copied = false;
          try {
            copied = document.execCommand("copy");
          } catch (error) {
            copied = false;
          }
          field.remove();
          resolve(copied);
        });
      }

      copyContactButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var value = button.getAttribute("data-copy-value") || "";
          var metaKey = button.getAttribute("data-copy-meta-key");
          var copiedKey = button.getAttribute("data-copy-copied-key");
          var statusKey = button.getAttribute("data-copy-status-key");
          var errorKey = button.getAttribute("data-copy-error-key");
          var label = button.querySelector(".contact-channel__copy small");
          copyText(value).then(function (copied) {
            var values = translations[currentLanguage];
            window.clearTimeout(copyResetTimers.get(button));
            button.classList.toggle("is-copied", copied);
            if (label) {
              label.textContent = copied ? values[copiedKey] : values[metaKey];
            }
            if (copyContactStatus) {
              copyContactStatus.textContent = copied ? values[statusKey] : values[errorKey];
            }
            copyResetTimers.set(button, window.setTimeout(function () {
              button.classList.remove("is-copied");
              if (label) {
                label.textContent = translations[currentLanguage][metaKey];
              }
            }, 1800));
          });
        });
      });

      var navigationController = null;

      function updateMenuLabel() {
        if (navigationController) navigationController.refresh();
      }

      var reducedMotion = motionQuery.matches;

      var rig = document.querySelector("#orbital-rig");
      var planetCore = document.querySelector("#planet-core");
      var orbitGroup = document.querySelector("#orbit-group");
      var planetCoordinate = document.querySelector(".planet-coordinate");
      var heroElement = document.querySelector("#home");
      var sceneElements = Array.from(document.querySelectorAll("[data-scene]:not([hidden])"));
      var sceneStops = [];
      var coordinateExitStart = 0;
      var coordinateExitEnd = 1;
      var viewportWidth = window.innerWidth;
      var viewportHeight = window.innerHeight;
      var scrollY = window.scrollY;
      var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      var sceneCursor = scrollY + viewportHeight * 0.5;
      var sceneCursorVelocity = 0;
      var sceneMotionReady = false;
      var sceneState = { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, rings: 0.8 };
      var frameId = 0;
      var lastFrame = 0;
      var profilePrologue = document.querySelector(".profile-prologue");
      var profileWave = document.querySelector("#profile-wave");
      var profileWaveSvg = document.querySelector("#profile-wave-svg");
      var profileSection = document.querySelector("#profile-archive:not([hidden])");
      var profileStage = document.querySelector("#profile-stage");
      var profileViewport = document.querySelector("#profile-viewport");
      var profileTrack = profileSection ? document.querySelector("#profile-track") : null;
      var profileSlides = profileTrack ? Array.from(profileTrack.querySelectorAll("[data-profile-slide]")) : [];
      var profileDots = Array.from(document.querySelectorAll("[data-profile-go]"));
      var profilePrevious = document.querySelector("#profile-prev");
      var profileNext = document.querySelector("#profile-next");
      var profileCurrent = document.querySelector("#profile-current");
      var profileBreakpoint = window.matchMedia("(min-width: 801px)");
      var profileTween = null;
      var profilePrologueTween = null;
      var profileWaveController = null;
      var spaceFieldController = null;
      var profileResizeObserver = null;
      var profileScrollFrame = 0;
      var profileRefreshFrame = 0;
      var profileLastTrackWidth = 0;
      var profileActiveIndex = 0;
      var profileTargetIndex = 0;
      var profileNavigationLockUntil = 0;
      var profileDesktopMode = false;
      var signalSection = document.querySelector("#signal");
      var signalMotionController = signalSection
        ? createSignalMotion(signalSection, window.gsap, window.ScrollTrigger)
        : null;
      var projectCoverflowController = null;
      var orbitalSceneController = null;

      function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
      }

      function mix(a, b, progress) {
        return a + (b - a) * progress;
      }

      function smoothstep(progress) {
        return progress * progress * (3 - 2 * progress);
      }

      function setupSkillDust(canvas, host) {
        var context = canvas.getContext("2d", { alpha: true });
        if (!context) return null;

        var particles = [];
        var frame = 0;
        var lastTime = 0;
        var width = 1;
        var height = 1;
        var active = false;
        var resizeObserver = null;

        function randomFactory(seed) {
          return function () {
            seed = (seed * 1664525 + 1013904223) >>> 0;
            return seed / 4294967296;
          };
        }

        function resize() {
          var bounds = host.getBoundingClientRect();
          var nextWidth = Math.max(1, Math.round(bounds.width));
          var nextHeight = Math.max(1, Math.round(bounds.height));
          var ratio = Math.min(window.devicePixelRatio || 1, 2);
          if (nextWidth === width && nextHeight === height && canvas.width === Math.round(width * ratio)) return;

          width = nextWidth;
          height = nextHeight;
          canvas.width = Math.round(width * ratio);
          canvas.height = Math.round(height * ratio);
          context.setTransform(ratio, 0, 0, ratio, 0, 0);

          var random = randomFactory(92821 + width * 7 + height * 13);
          var count = width < 700 ? 48 : Math.min(112, Math.round(width / 15));
          particles = Array.from({ length: count }, function (_, index) {
            return {
              x: random() * width,
              y: random() * height,
              radius: 0.45 + Math.pow(random(), 2.3) * 2.1,
              alpha: 0.08 + random() * 0.28,
              speed: 1.4 + random() * 4.8,
              drift: (random() - 0.5) * 2.2,
              phase: random() * Math.PI * 2,
              pulse: 0.35 + random() * 0.75,
              index: index
            };
          });
          draw(0, true);
        }

        function draw(time, still) {
          var delta = still ? 0 : Math.min((time - (lastTime || time)) / 1000, 0.05);
          lastTime = time;
          context.clearRect(0, 0, width, height);

          particles.forEach(function (particle) {
            if (!still) {
              particle.y -= particle.speed * delta;
              particle.x += particle.drift * delta;
              if (particle.y < -4) particle.y = height + 4;
              if (particle.x < -4) particle.x = width + 4;
              if (particle.x > width + 4) particle.x = -4;
            }
            var shimmer = 0.7 + Math.sin(time * 0.00035 * particle.pulse + particle.phase) * 0.3;
            context.beginPath();
            context.fillStyle = "rgba(208, 225, 236, " + (particle.alpha * shimmer).toFixed(3) + ")";
            context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            context.fill();
          });
        }

        function tick(time) {
          if (!active) {
            frame = 0;
            return;
          }
          draw(time, false);
          frame = window.requestAnimationFrame(tick);
        }

        function setActive(nextActive) {
          active = nextActive;
          if (active && !frame) {
            lastTime = 0;
            frame = window.requestAnimationFrame(tick);
          } else if (!active && frame) {
            window.cancelAnimationFrame(frame);
            frame = 0;
          }
        }

        if ("ResizeObserver" in window) {
          resizeObserver = new ResizeObserver(resize);
          resizeObserver.observe(host);
        } else {
          window.addEventListener("resize", resize, { passive: true });
        }
        resize();

        return {
          setActive: setActive,
          destroy: function () {
            setActive(false);
            if (resizeObserver) resizeObserver.disconnect();
            else window.removeEventListener("resize", resize);
          }
        };
      }

      function setupSpaceFields() {
        var fields = Array.from(document.querySelectorAll("[data-space-field]"));
        if (!fields.length) return null;

        var controllers = fields.map(function (field) {
          var host = field.closest("section") || field.parentElement;
          var objects = Array.from(field.querySelectorAll("[data-space-object]")).map(function (element) {
            return {
              element: element,
              rangeX: Number(element.dataset.rangeX || 20),
              rangeY: Number(element.dataset.rangeY || 14),
              rotate: Number(element.dataset.rotate || 6)
            };
          });
          var video = field.querySelector("[data-space-video]");
          var dustCanvas = field.querySelector("[data-space-dust]");
          var dust = dustCanvas ? setupSkillDust(dustCanvas, host) : null;
          var observer = null;
          var frame = 0;
          var lastTime = 0;
          var visible = true;
          var targetX = 0;
          var targetY = 0;
          var currentX = 0;
          var currentY = 0;
          var velocityX = 0;
          var velocityY = 0;

          function updateMedia() {
            var live = visible && !document.hidden && !reducedMotion;
            field.classList.toggle("is-space-live", live);
            if (dust) dust.setActive(live);
            if (!video) return;
            if (live) {
              var playback = video.play();
              if (playback && typeof playback.catch === "function") playback.catch(function () {});
            } else {
              video.pause();
            }
          }

          function render() {
            objects.forEach(function (object) {
              object.element.style.setProperty("--space-x", (currentX * object.rangeX).toFixed(2) + "px");
              object.element.style.setProperty("--space-y", (currentY * object.rangeY).toFixed(2) + "px");
              object.element.style.setProperty("--space-rotation",
                ((currentX - currentY * 0.45) * object.rotate).toFixed(2) + "deg");
            });
          }

          function tick(time) {
            frame = 0;
            if (!visible || document.hidden || reducedMotion || !finePointer.matches) return;
            var delta = Math.min((time - (lastTime || time)) / 1000, 0.05);
            lastTime = time;
            var stiffness = 64;
            var damping = 16;
            velocityX += (stiffness * (targetX - currentX) - damping * velocityX) * delta;
            velocityY += (stiffness * (targetY - currentY) - damping * velocityY) * delta;
            currentX += velocityX * delta;
            currentY += velocityY * delta;
            render();
            frame = window.requestAnimationFrame(tick);
          }

          function start() {
            updateMedia();
            if (!frame && visible && !document.hidden && !reducedMotion && finePointer.matches) {
              lastTime = 0;
              frame = window.requestAnimationFrame(tick);
            }
          }

          function stop() {
            if (frame) window.cancelAnimationFrame(frame);
            frame = 0;
            updateMedia();
          }

          function onPointerMove(event) {
            if (reducedMotion || !finePointer.matches) return;
            var rect = host.getBoundingClientRect();
            targetX = clamp(((event.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2, -1, 1);
            targetY = clamp(((event.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2, -1, 1);
          }

          function onPointerLeave() {
            targetX = 0;
            targetY = 0;
          }

          host.addEventListener("pointermove", onPointerMove, { passive: true });
          host.addEventListener("pointerleave", onPointerLeave, { passive: true });

          if ("IntersectionObserver" in window) {
            visible = false;
            observer = new IntersectionObserver(function (entries) {
              visible = Boolean(entries[0] && entries[0].isIntersecting);
              if (visible) start(); else stop();
            }, { rootMargin: "12% 0px", threshold: 0.01 });
            observer.observe(host);
          }

          render();
          start();

          return {
            refresh: function () {
              if (reducedMotion) {
                targetX = 0;
                targetY = 0;
                currentX = 0;
                currentY = 0;
                velocityX = 0;
                velocityY = 0;
                render();
                stop();
              } else {
                start();
              }
            },
            visibility: function () {
              if (document.hidden) stop(); else start();
            },
            destroy: function () {
              stop();
              field.classList.remove("is-space-live");
              if (video) video.pause();
              if (dust) dust.destroy();
              if (observer) observer.disconnect();
              host.removeEventListener("pointermove", onPointerMove);
              host.removeEventListener("pointerleave", onPointerLeave);
            }
          };
        });

        function onDocumentVisibility() {
          controllers.forEach(function (controller) { controller.visibility(); });
        }

        document.addEventListener("visibilitychange", onDocumentVisibility);

        return {
          refresh: function () {
            controllers.forEach(function (controller) { controller.refresh(); });
          },
          destroy: function () {
            document.removeEventListener("visibilitychange", onDocumentVisibility);
            controllers.forEach(function (controller) { controller.destroy(); });
          }
        };
      }

      function updateSceneCursor(target, response, deltaTime) {
        var omega = 4.6 / Math.max(0.01, response);
        var displacement = sceneCursor - target;
        var decay = Math.exp(-omega * deltaTime);
        var nextCursor = target + (displacement * (1 + omega * deltaTime) +
          sceneCursorVelocity * deltaTime) * decay;
        sceneCursorVelocity = (sceneCursorVelocity * (1 - omega * deltaTime) -
          displacement * omega * omega * deltaTime) * decay;
        sceneCursor = nextCursor;
      }

      function setProfileActive(index) {
        if (!profileSlides.length) return;
        profileActiveIndex = clamp(Math.round(index), 0, profileSlides.length - 1);
        profileSlides.forEach(function (slide, slideIndex) {
          slide.classList.toggle("is-active", slideIndex === profileActiveIndex);
        });
        profileDots.forEach(function (dot, dotIndex) {
          dot.setAttribute("aria-current", String(dotIndex === profileActiveIndex));
        });
        if (profileCurrent) {
          profileCurrent.textContent = String(profileActiveIndex + 1).padStart(2, "0");
        }
        if (profilePrevious) profilePrevious.disabled = profileActiveIndex === 0;
        if (profileNext) profileNext.disabled = profileActiveIndex === profileSlides.length - 1;
      }

      function getProfileDistance() {
        if (!profileTrack || !profileViewport) return 0;
        return Math.max(0, profileTrack.scrollWidth - profileViewport.clientWidth);
      }

      function getProfileNativeLeft(index) {
        var slide = profileSlides[index];
        if (!slide || !profileTrack || !profileViewport) return 0;
        var maxScroll = Math.max(0, profileTrack.scrollWidth - profileViewport.clientWidth);
        var centered = slide.offsetLeft - (profileViewport.clientWidth - slide.offsetWidth) * 0.5;
        return clamp(centered, 0, maxScroll);
      }

      function updateProfileFromNativeScroll() {
        profileScrollFrame = 0;
        if (!profileViewport || profileDesktopMode || !profileSlides.length) return;
        var viewportRect = profileViewport.getBoundingClientRect();
        var viewportCenter = viewportRect.left + viewportRect.width * 0.5;
        var nearestIndex = 0;
        var nearestDistance = Infinity;
        profileSlides.forEach(function (slide, index) {
          var rect = slide.getBoundingClientRect();
          var distance = Math.abs(rect.left + rect.width * 0.5 - viewportCenter);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });
        setProfileActive(nearestIndex);
        if (Date.now() > profileNavigationLockUntil) profileTargetIndex = nearestIndex;
      }

      function onProfileNativeScroll() {
        if (profileScrollFrame || profileDesktopMode) return;
        profileScrollFrame = window.requestAnimationFrame(updateProfileFromNativeScroll);
      }

      function goToProfile(index) {
        if (!profileSlides.length) return;
        var targetIndex = clamp(Math.round(index), 0, profileSlides.length - 1);
        profileTargetIndex = targetIndex;
        profileNavigationLockUntil = Date.now() + 900;
        setProfileActive(targetIndex);

        if (profileDesktopMode && profileTween && profileTween.scrollTrigger) {
          var trigger = profileTween.scrollTrigger;
          var progress = targetIndex / Math.max(1, profileSlides.length - 1);
          window.scrollTo({
            top: trigger.start + (trigger.end - trigger.start) * progress,
            behavior: "auto"
          });
          return;
        }

        if (profileViewport) {
          profileViewport.scrollTo({
            left: getProfileNativeLeft(targetIndex),
            behavior: reducedMotion ? "auto" : "smooth"
          });
        }
      }

      function destroyProfileDesktop() {
        if (profileTween) {
          if (profileTween.scrollTrigger) profileTween.scrollTrigger.kill(true);
          profileTween.kill();
          profileTween = null;
        }
        if (window.gsap && profileTrack) window.gsap.set(profileTrack, { clearProps: "transform" });
        profileDesktopMode = false;
        root.classList.remove("profile-motion-ready");
      }

      function refreshProfileGeometry() {
        if (profileRefreshFrame) window.cancelAnimationFrame(profileRefreshFrame);
        profileRefreshFrame = window.requestAnimationFrame(function () {
          profileRefreshFrame = 0;
          if (profileDesktopMode && window.ScrollTrigger) {
            window.ScrollTrigger.refresh();
          } else {
            updateProfileFromNativeScroll();
            measureScene();
          }
        });
      }

      function initProfileDesktop() {
        if (!profileSection || !profileStage || !profileTrack || !window.gsap || !window.ScrollTrigger) return;
        destroyProfileDesktop();
        window.gsap.registerPlugin(window.ScrollTrigger);
        profileViewport.scrollLeft = 0;
        profileDesktopMode = true;
        root.classList.add("profile-motion-ready");
        root.classList.remove("profile-native");

        profileTween = window.gsap.to(profileTrack, {
          x: function () { return -getProfileDistance(); },
          ease: "none",
          overwrite: true,
          scrollTrigger: {
            id: "profile-horizontal",
            trigger: profileSection,
            pin: profileStage,
            start: "top top",
            end: function () {
              return "+=" + Math.max(window.innerHeight * 2.15, getProfileDistance() * 1.12);
            },
            scrub: 0.62,
            snap: {
              snapTo: 1 / Math.max(1, profileSlides.length - 1),
              duration: { min: 0.16, max: 0.46 },
              delay: 0.08,
              ease: "power1.inOut"
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
              var nextIndex = Math.round(self.progress * (profileSlides.length - 1));
              setProfileActive(nextIndex);
              if (Date.now() > profileNavigationLockUntil) profileTargetIndex = nextIndex;
            },
            onRefresh: function (self) {
              setProfileActive(self.progress * (profileSlides.length - 1));
              window.requestAnimationFrame(measureScene);
            }
          }
        });
        window.ScrollTrigger.refresh();
      }

      function destroyProfilePrologueMotion() {
        root.classList.remove("prologue-static");
        if (profilePrologueTween) {
          if (profilePrologueTween.scrollTrigger) profilePrologueTween.scrollTrigger.kill(true);
          profilePrologueTween.kill();
          profilePrologueTween = null;
        }
        if (window.gsap) {
          window.gsap.set("[data-prologue-line]", { clearProps: "transform,opacity,filter" });
          window.gsap.set(".profile-prologue-eyebrow", { clearProps: "transform,opacity" });
          window.gsap.set("[data-prologue-context]", { clearProps: "transform,opacity" });
          if (profileWave) window.gsap.set(profileWave, { clearProps: "transform,opacity" });
        }
      }

      function configureProfilePrologueMotion() {
        destroyProfilePrologueMotion();
        if (!profilePrologue || !profileBreakpoint.matches || reducedMotion ||
          !window.gsap || !window.ScrollTrigger) {
          root.classList.add("prologue-static");
          return;
        }

        window.gsap.registerPlugin(window.ScrollTrigger);
        profilePrologueTween = window.gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            id: "profile-prologue-motion",
            trigger: profilePrologue,
            start: "top 55%",
            end: "bottom bottom",
            scrub: 0.64,
            invalidateOnRefresh: true,
            onRefresh: function () { window.requestAnimationFrame(measureScene); }
          }
        });
        profilePrologueTween
          .fromTo(".profile-prologue-eyebrow",
            { yPercent: 70, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.24, ease: "power2.out" }, 0)
          .fromTo("[data-prologue-line]",
            { yPercent: 24, opacity: 0, filter: "blur(12px)" },
            { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.34, stagger: 0.045, ease: "power2.out" }, 0.025)
          .fromTo("[data-prologue-context]",
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }, 0.2)
          .to(".profile-prologue-eyebrow",
            { yPercent: -55, opacity: 0, duration: 0.18, ease: "power2.in" }, 0.78)
          .to("[data-prologue-line]",
            { yPercent: -18, opacity: 0, filter: "blur(8px)", duration: 0.22, stagger: 0.02, ease: "power2.in" }, 0.76)
          .to("[data-prologue-context]",
            { y: -16, opacity: 0, duration: 0.18, ease: "power2.in" }, 0.8)
          .fromTo(profileWave,
            { opacity: 0.42, scaleX: 1, scaleY: 1 },
            { opacity: 0.16, scaleX: 0.82, scaleY: 1.08, transformOrigin: "50% 50%", duration: 1 }, 0);
      }

      function setupProfileWave() {
        if (!profileWave || !profileWaveSvg) return null;
        var namespace = "http://www.w3.org/2000/svg";
        var paths = [];
        var width = 1;
        var height = 1;
        var waveFrame = 0;
        var isVisible = true;
        var waveTime = 0;
        var lastWaveTime = 0;
        var wavePointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, strength: 0, targetStrength: 0 };

        function build() {
          var rect = profileWave.getBoundingClientRect();
          width = Math.max(1, Math.round(rect.width));
          height = Math.max(1, Math.round(rect.height));
          profileWaveSvg.setAttribute("viewBox", "0 0 " + width + " " + height);
          profileWaveSvg.textContent = "";
          paths = [];
          var count = profileBreakpoint.matches ? 40 : 28;
          for (var index = 0; index < count; index += 1) {
            var path = document.createElementNS(namespace, "path");
            var centerDistance = Math.abs((index + 0.5) / count - 0.5) * 2;
            path.dataset.waveIndex = String(index);
            path.style.opacity = String(0.38 + (1 - centerDistance) * 0.5);
            path.style.strokeWidth = String(0.68 + (1 - centerDistance) * 0.32);
            profileWaveSvg.appendChild(path);
            paths.push(path);
          }
          draw();
        }

        function draw() {
          var count = paths.length;
          var pointGap = Math.max(13, height / 50);
          paths.forEach(function (path, lineIndex) {
            var baseX = width * (lineIndex + 0.5) / count;
            var data = "";
            for (var y = -pointGap; y <= height + pointGap; y += pointGap) {
              var normalizedY = y / height;
              var phase = normalizedY * 8.2 + waveTime * 0.0005 + lineIndex * 0.145;
              var x = baseX + Math.sin(phase) * (14 + Math.sin(waveTime * 0.00022 + lineIndex) * 5.5);
              var pointerX = wavePointer.x * width;
              var pointerY = wavePointer.y * height;
              var dx = x - pointerX;
              var dy = y - pointerY;
              var influence = Math.exp(-(dx * dx + dy * dy) / Math.max(1, width * height * 0.034));
              x += (dx / Math.max(42, Math.abs(dx))) * influence * 52 * wavePointer.strength;
              data += (data ? " L " : "M ") + x.toFixed(2) + " " + y.toFixed(2);
            }
            path.setAttribute("d", data);
          });
        }

        function tick(time) {
          waveFrame = 0;
          if (!isVisible || document.hidden || reducedMotion) return;
          var delta = Math.min(34, time - (lastWaveTime || time));
          lastWaveTime = time;
          waveTime += delta;
          wavePointer.x += (wavePointer.tx - wavePointer.x) * 0.075;
          wavePointer.y += (wavePointer.ty - wavePointer.y) * 0.075;
          wavePointer.strength += (wavePointer.targetStrength - wavePointer.strength) * 0.08;
          draw();
          waveFrame = window.requestAnimationFrame(tick);
        }

        function start() {
          if (!waveFrame && isVisible && !document.hidden && !reducedMotion) {
            lastWaveTime = 0;
            waveFrame = window.requestAnimationFrame(tick);
          }
        }

        function stop() {
          if (waveFrame) window.cancelAnimationFrame(waveFrame);
          waveFrame = 0;
        }

        function onMove(event) {
          if (reducedMotion) return;
          var rect = profileWave.getBoundingClientRect();
          wavePointer.tx = clamp((event.clientX - rect.left) / Math.max(1, rect.width), 0, 1);
          wavePointer.ty = clamp((event.clientY - rect.top) / Math.max(1, rect.height), 0, 1);
          wavePointer.targetStrength = 1;
        }

        function onLeave() {
          wavePointer.tx = 0.5;
          wavePointer.ty = 0.5;
          wavePointer.targetStrength = 0;
        }

        var observer = null;
        if ("IntersectionObserver" in window) {
          observer = new IntersectionObserver(function (entries) {
            isVisible = Boolean(entries[0] && entries[0].isIntersecting);
            if (isVisible) start(); else stop();
          }, { rootMargin: "15% 0px" });
          observer.observe(profilePrologue || profileWave);
        }
        profileWave.addEventListener("pointermove", onMove, { passive: true });
        profileWave.addEventListener("pointerleave", onLeave, { passive: true });
        build();
        start();

        return {
          resize: build,
          refresh: function () {
            if (reducedMotion) {
              stop();
              wavePointer.strength = 0;
              draw();
            } else start();
          },
          destroy: function () {
            stop();
            if (observer) observer.disconnect();
            profileWave.removeEventListener("pointermove", onMove);
            profileWave.removeEventListener("pointerleave", onLeave);
          }
        };
      }

      function configureProfileMotion(forceRefresh) {
        if (!profileSlides.length) return;
        var canUseDesktopMotion = profileBreakpoint.matches &&
          !reducedMotion && Boolean(window.gsap && window.ScrollTrigger);

        if (canUseDesktopMotion) {
          root.classList.remove("profile-native");
          if (!profileDesktopMode) initProfileDesktop();
          else if (forceRefresh && window.ScrollTrigger) window.ScrollTrigger.refresh();
        } else {
          var activeIndex = profileActiveIndex;
          destroyProfileDesktop();
          root.classList.add("profile-native");
          window.requestAnimationFrame(function () {
            if (profileViewport) profileViewport.scrollLeft = getProfileNativeLeft(activeIndex);
            updateProfileFromNativeScroll();
            measureScene();
          });
        }
      }

      function onProfileKeydown(event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goToProfile(profileTargetIndex - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goToProfile(profileTargetIndex + 1);
        }
      }

      function setupProfile() {
        if (!profileSlides.length || !profileViewport) return;
        setProfileActive(0);
        profileTargetIndex = 0;
        profileViewport.addEventListener("scroll", onProfileNativeScroll, { passive: true });
        profileViewport.addEventListener("keydown", onProfileKeydown);
        profilePrevious.addEventListener("click", function () {
          goToProfile(profileTargetIndex - 1);
        });
        profileNext.addEventListener("click", function () {
          goToProfile(profileTargetIndex + 1);
        });
        profileDots.forEach(function (dot) {
          dot.addEventListener("click", function () {
            goToProfile(Number(dot.dataset.profileGo));
          });
        });
        profileTrack.querySelectorAll("img").forEach(function (image) {
          if (!image.complete) image.addEventListener("load", refreshProfileGeometry, { once: true });
        });

        if ("ResizeObserver" in window) {
          profileResizeObserver = new ResizeObserver(function () {
            var nextWidth = profileTrack.scrollWidth;
            if (Math.abs(nextWidth - profileLastTrackWidth) < 1) return;
            profileLastTrackWidth = nextWidth;
            refreshProfileGeometry();
          });
          profileResizeObserver.observe(profileTrack);
        }
      }

      function readSceneState(element) {
        return {
          x: Number(element.dataset.sceneX || 0),
          y: Number(element.dataset.sceneY || 0),
          scale: Number(element.dataset.sceneScale || 1),
          opacity: Number(element.dataset.sceneOpacity || 1),
          rotation: Number(element.dataset.sceneRotation || 0),
          rings: Number(element.dataset.sceneRings || 0.6)
        };
      }

      function measureScene() {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
        sceneStops = sceneElements.flatMap(function (element) {
          var rect = element.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return [];
          return [{
            point: rect.top + window.scrollY + rect.height * 0.5,
            state: readSceneState(element)
          }];
        }).sort(function (a, b) {
          return a.point - b.point;
        });

        var heroTop = heroElement.getBoundingClientRect().top + window.scrollY;
        var heroHeight = heroElement.getBoundingClientRect().height;
        coordinateExitStart = heroTop + heroHeight * 0.58;
        coordinateExitEnd = heroTop + heroHeight * 0.94;
      }

      function copySceneState(source) {
        sceneState.x = source.x;
        sceneState.y = source.y;
        sceneState.scale = source.scale;
        sceneState.opacity = source.opacity;
        sceneState.rotation = source.rotation;
        sceneState.rings = source.rings;
        return sceneState;
      }

      function getSceneTangent(before, center, after, key) {
        if (before === center) {
          return (after.state[key] - center.state[key]) /
            Math.max(1, after.point - center.point);
        }
        if (center === after) {
          return (center.state[key] - before.state[key]) /
            Math.max(1, center.point - before.point);
        }
        var incoming = (center.state[key] - before.state[key]) /
          Math.max(1, center.point - before.point);
        var outgoing = (after.state[key] - center.state[key]) /
          Math.max(1, after.point - center.point);
        if (incoming === 0 || outgoing === 0 || incoming * outgoing < 0) return 0;
        return (incoming + outgoing) * 0.5;
      }

      function interpolateSceneProperty(index, key, progress) {
        var current = sceneStops[index];
        var next = sceneStops[index + 1];
        var previous = sceneStops[Math.max(0, index - 1)];
        var following = sceneStops[Math.min(sceneStops.length - 1, index + 2)];
        var span = Math.max(1, next.point - current.point);
        var startTangent = getSceneTangent(previous, current, next, key) * span;
        var endTangent = getSceneTangent(current, next, following, key) * span;
        var squared = progress * progress;
        var cubed = squared * progress;
        return (2 * cubed - 3 * squared + 1) * current.state[key] +
          (cubed - 2 * squared + progress) * startTangent +
          (-2 * cubed + 3 * squared) * next.state[key] +
          (cubed - squared) * endTangent;
      }

      function sampleScene(position) {
        if (!sceneStops.length) {
          return copySceneState({ x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, rings: 0.8 });
        }
        if (position <= sceneStops[0].point) return copySceneState(sceneStops[0].state);
        var lastStop = sceneStops[sceneStops.length - 1];
        if (position >= lastStop.point) return copySceneState(lastStop.state);

        for (var index = 0; index < sceneStops.length - 1; index += 1) {
          var current = sceneStops[index];
          var next = sceneStops[index + 1];
          if (position >= current.point && position <= next.point) {
            var raw = clamp((position - current.point) / (next.point - current.point), 0, 1);
            var x = interpolateSceneProperty(index, "x", raw);
            var y = interpolateSceneProperty(index, "y", raw);
            var deltaX = next.state.x - current.state.x;
            var deltaY = next.state.y - current.state.y;
            var distance = Math.hypot(deltaX, deltaY);
            if (distance > 0.001) {
              var arc = Math.pow(Math.sin(Math.PI * raw), 2) *
                Math.min(4.2, distance * 0.13) * (index % 2 ? -1 : 1);
              x += (-deltaY / distance) * arc;
              y += (deltaX / distance) * arc;
            }

            sceneState.x = x;
            sceneState.y = y;
            sceneState.scale = clamp(interpolateSceneProperty(index, "scale", raw), 0.62, 2.35);
            sceneState.opacity = clamp(interpolateSceneProperty(index, "opacity", raw), 0, 1);
            sceneState.rotation = interpolateSceneProperty(index, "rotation", raw);
            sceneState.rings = clamp(interpolateSceneProperty(index, "rings", raw), 0, 1);
            return sceneState;
          }
        }
        return copySceneState(lastStop.state);
      }

      function renderScene(time) {
        var deltaTime = lastFrame ? clamp((time - lastFrame) / 1000, 1 / 240, 0.05) : 1 / 60;
        var targetCursor = scrollY + viewportHeight * 0.5;

        if (!sceneMotionReady || reducedMotion) {
          sceneCursor = targetCursor;
          sceneCursorVelocity = 0;
          sceneMotionReady = true;
        } else {
          updateSceneCursor(
            targetCursor,
            viewportWidth <= 800 ? 0.28 : 0.36,
            deltaTime
          );
        }

        var state = sampleScene(sceneCursor);
        var mobile = viewportWidth <= 800;
        var visualScrollY = sceneCursor - viewportHeight * 0.5;
        var coordinateExit = smoothstep(clamp(
          (visualScrollY - coordinateExitStart) / Math.max(1, coordinateExitEnd - coordinateExitStart),
          0,
          1
        ));

        planetCoordinate.style.opacity = String(1 - coordinateExit);
        planetCoordinate.style.transform = reducedMotion
          ? "none"
          : "translate3d(" + (coordinateExit * 18).toFixed(2) + "px," +
            (coordinateExit * -5).toFixed(2) + "px,0)";

        if (reducedMotion) {
          rig.style.transform = "translate3d(-50%, -50%, 0) scale(" + (mobile ? 0.74 : 0.82) + ")";
          rig.style.opacity = String(Math.min(state.opacity, mobile ? 0.34 : 0.46));
          orbitGroup.style.opacity = String(Math.min(state.rings, 0.45));
          orbitGroup.style.transform = "rotateX(5deg) rotateY(-7deg)";
          planetCore.style.transform = "translateZ(1px)";
          return;
        }

        var pointerBlend = 1 - Math.exp(-7.5 * deltaTime);
        pointer.x += (pointer.tx - pointer.x) * pointerBlend;
        pointer.y += (pointer.ty - pointer.y) * pointerBlend;

        var mobileFactor = mobile ? 0.34 : 1;
        var x = state.x * viewportWidth * 0.01 * mobileFactor + pointer.x;
        var y = state.y * viewportHeight * 0.01 * (mobile ? 0.45 : 1) + pointer.y;
        var scale = mobile ? mix(0.82, state.scale, 0.42) : state.scale;
        var momentum = clamp(sceneCursorVelocity / Math.max(1, viewportHeight * 2.35), -1, 1);
        var rotation = state.rotation * (mobile ? 0.42 : 1) + momentum * (mobile ? 0.7 : 1.8);
        var momentumScale = 1 + Math.abs(momentum) * (mobile ? 0.004 : 0.01);

        rig.style.transform =
          "translate3d(-50%, -50%, 0) translate3d(" +
          x.toFixed(2) + "px," + y.toFixed(2) + "px,0) scale(" +
          (scale * momentumScale).toFixed(4) + ") rotateX(" +
          (momentum * -1.2).toFixed(3) + "deg) rotateY(" +
          (momentum * 1.8).toFixed(3) + "deg) rotateZ(" +
          rotation.toFixed(3) + "deg)";
        rig.style.opacity = String(state.opacity);
        orbitGroup.style.opacity = String(state.rings);
        orbitGroup.style.transform = "rotateX(" +
          (5 + momentum * 2.2).toFixed(3) + "deg) rotateY(" +
          (-7 + momentum * 3.4).toFixed(3) + "deg) rotateZ(" +
          (visualScrollY * 0.0035).toFixed(3) + "deg)";
        var scrollRotation = visualScrollY * 0.048;
        var ambientRotation = time * 0.0003;
        planetCore.style.transform = "translateZ(1px) rotate(" +
          (scrollRotation + ambientRotation).toFixed(3) + "deg)";
      }

      function frame(time) {
        renderScene(time);
        lastFrame = time;
        frameId = window.requestAnimationFrame(frame);
      }

      function startScene() {
        if (!frameId && !document.hidden) frameId = window.requestAnimationFrame(frame);
      }

      function stopScene() {
        if (frameId) window.cancelAnimationFrame(frameId);
        frameId = 0;
      }

      function onScroll() {
        scrollY = window.scrollY;
      }

      function onPointerMove(event) {
        if (!finePointer.matches || reducedMotion) return;
        pointer.tx = (event.clientX / viewportWidth - 0.5) * 10;
        pointer.ty = (event.clientY / viewportHeight - 0.5) * 7;
      }

      function onPointerLeave() {
        pointer.tx = 0;
        pointer.ty = 0;
      }
      function onResize() {
        if (profileWaveController) profileWaveController.resize();
        configureProfilePrologueMotion();
        configureProfileMotion(true);
      }

      function onMotionChange(event) {
        reducedMotion = event.matches;
        root.classList.toggle("motion-ready", !reducedMotion);
        configureProfilePrologueMotion();
        configureProfileMotion(true);
        if (profileWaveController) profileWaveController.refresh();
        if (spaceFieldController) spaceFieldController.refresh();
        if (signalMotionController) signalMotionController.refresh(reducedMotion);
        if (projectCoverflowController) projectCoverflowController.refresh(reducedMotion);
        if (orbitalSceneController) orbitalSceneController.refresh();
      }

      var revealController = createReveals(root);

      setLanguage(currentLanguage);
      revealController.refresh(reducedMotion);
      import("../../src/modules/navigation").then(function (navigationModule) {
        navigationController = navigationModule.createNavigation(function () {
          return translations[currentLanguage];
        }, motionQuery);
        updateMenuLabel();
        root.dataset.navigationReady = "true";
      });
      import("../../src/modules/project-coverflow").then(function (projectModule) {
        var coverflowRoot = document.querySelector("#project-navigator");
        projectCoverflowController = coverflowRoot
          ? projectModule.createProjectCoverflow(coverflowRoot)
          : null;
        if (projectCoverflowController) projectCoverflowController.refresh(reducedMotion);
      });
      import("../../src/modules/orbital-scene").then(function (orbitalModule) {
        orbitalSceneController = orbitalModule.createOrbitalScene();
        if (orbitalSceneController) orbitalSceneController.start();
      });
      setupProfile();
      if (signalMotionController) signalMotionController.refresh(reducedMotion);
      profileWaveController = setupProfileWave();
      spaceFieldController = setupSpaceFields();
      configureProfilePrologueMotion();
      configureProfileMotion(false);
      window.addEventListener("resize", onResize, { passive: true });

      if (typeof motionQuery.addEventListener === "function") {
        motionQuery.addEventListener("change", onMotionChange);
      } else {
        motionQuery.addListener(onMotionChange);
      }

      window.addEventListener("load", refreshProfileGeometry, { once: true });
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(refreshProfileGeometry);
      }

      window.addEventListener("beforeunload", function () {
        if (orbitalSceneController) orbitalSceneController.destroy();
        if (navigationController) navigationController.destroy();
        destroyProfilePrologueMotion();
        destroyProfileDesktop();
        if (profileWaveController) profileWaveController.destroy();
        if (spaceFieldController) spaceFieldController.destroy();
        if (profileResizeObserver) profileResizeObserver.disconnect();
        if (signalMotionController) signalMotionController.destroy();
        if (projectCoverflowController) projectCoverflowController.destroy();
        if (profileScrollFrame) window.cancelAnimationFrame(profileScrollFrame);
        if (profileRefreshFrame) window.cancelAnimationFrame(profileRefreshFrame);
        revealController.destroy();
        window.removeEventListener("resize", onResize);
        if (profileViewport) {
          profileViewport.removeEventListener("scroll", onProfileNativeScroll);
          profileViewport.removeEventListener("keydown", onProfileKeydown);
        }
      }, { once: true });
    });
    });
})();

export {};
