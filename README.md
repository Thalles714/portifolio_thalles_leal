# Portfólio — Thalles Leal

Portfólio estático bilíngue, responsivo e pronto para publicação. Não há etapa de build nem dependências locais obrigatórias.

## Estrutura

```text
.
├── index.html
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

Na raiz do projeto:

```powershell
python -m http.server 4173
```

Abra `http://localhost:4173`.

Também é possível abrir `index.html` diretamente pelo protocolo `file://`. Nesse modo de prévia, somente a superfície do rodapé usa o mesmo módulo Three.js hospedado no CDN do arquivo de referência, pois navegadores bloqueiam módulos JavaScript locais sob `file://`.

## Publicar

O diretório raiz é a pasta de publicação. O projeto pode ser enviado diretamente para Vercel, Netlify, Cloudflare Pages ou GitHub Pages, sem comando de build.

As animações auxiliares usam GSAP e MapLibre GL via CDN, com efeitos alternativos quando essas bibliotecas não estão disponíveis. Em servidor ou deploy, o Three.js da superfície pontilhada está versionado localmente em `assets/js/lib`. A importação remota equivalente ao molde é usada apenas na prévia direta por `file://`.
