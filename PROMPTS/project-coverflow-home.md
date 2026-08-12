# Prompt — Navegador de projetos da home

Quero implementar a dobra “Navegador de projetos” na home deste portfólio estático.

Leia `ROADMAP.md`, `index.html`, `assets/css/styles.css` e os módulos em `src/` antes de alterar arquivos. O projeto usa Vite e TypeScript, mas não usa React, Tailwind ou shadcn. Não introduza essas ferramentas apenas para este recurso.

Crie um carrossel coverflow 3D acessível para os cinco projetos. Ele deve usar imagens reais quando existirem; quando não houver imagem, usar uma capa gráfica coerente com a identidade orbital e o projeto. A pessoa deve poder:

- arrastar horizontalmente no desktop e no touch;
- navegar com as teclas esquerda e direita;
- usar botões anterior e próximo;
- selecionar um indicador de paginação;
- abrir o projeto publicado pelo card ou por uma chamada explícita;
- acessar futuramente uma página própria de estudo de caso sem precisar redesenhar o componente.

O card central deve ser o foco; os vizinhos precisam recuar em profundidade, inclinar levemente e continuar identificáveis. Não usar loop infinito se ele prejudicar orientação ou acessibilidade. Em mobile, priorize um card central legível e gestos naturais, preservando o scroll vertical da página.

Use `prefers-reduced-motion`: nesse modo, remova perspectiva e transições de deslocamento, mantendo controles e conteúdo. Não use imagens de banco externo, métricas inventadas ou dependências adicionais sem necessidade. Preserve a identidade orbital, contraste alto e navegação por teclado.

Crie uma interface pequena no módulo: inicializar, atualizar e destruir. Verifique `npm run typecheck` e `npm run build`. Ao final, informe os arquivos alterados, o comportamento em desktop/mobile e qualquer ação manual restante. Não faça commit nem deploy.
