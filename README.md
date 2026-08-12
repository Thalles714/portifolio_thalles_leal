# Portfólio — Thalles Leal

Portfólio bilíngue e responsivo, desenvolvido como site estático com Vite e TypeScript.

## Estrutura

```text
.
├── index.html
├── package.json
├── tsconfig.json
├── src/
│   └── main.ts          # ponto único de inicialização
├── assets/
│   ├── css/styles.css
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   │   ├── hero/
│   │   ├── portraits/
│   │   └── process/
│   └── js/
│       ├── lib/
│       │   ├── three.core.min.js
│       │   ├── three.module.js
│       │   └── THREE-LICENSE
│       ├── main.js
│       └── dotted-surface.js
└── robots.txt
```

## Executar localmente

Instale as dependências uma vez:

```powershell
npm install
```

Inicie o ambiente local:

```powershell
npm run dev
```

O endereço exibido no terminal normalmente será `http://localhost:5173`.

## Verificar e gerar

```powershell
npm run typecheck
npm run build
npm run preview
```

O build otimizado é gerado em `dist/`. Abrir o HTML diretamente por `file://` não é mais o fluxo suportado, pois os módulos são processados pelo Vite.

## Publicar

Configure a hospedagem com:

- Comando de build: `npm run build`
- Diretório de saída: `dist`

GSAP é uma dependência versionada do projeto. O Three.js da superfície pontilhada permanece versionado localmente em `assets/js/lib` e é carregado sob demanda. A localização profissional na seção Sinal é uma composição SVG/CSS local: não há mapa remoto, tiles ou chamadas externas.
