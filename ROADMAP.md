# Roteiro de evolução do portfólio

Este documento é a ordem oficial de evolução do projeto. A sequência foi reduzida para três entregas com alto impacto, evitando uma reconstrução longa e diminuindo o risco de retrabalho.

## Princípios que não devem mudar

- Preservar a identidade orbital, o tom técnico e o hero como principal momento visual.
- Melhorar primeiro aquilo que um recrutador ou cliente consegue perceber.
- Usar conteúdo e evidências reais. Nunca inventar métricas, clientes, resultados ou responsabilidades.
- Cada etapa precisa poder ser publicada separadamente.
- Só iniciar a etapa seguinte quando os critérios de conclusão da atual estiverem atendidos.
- Toda alteração precisa funcionar em desktop e mobile e respeitar `prefers-reduced-motion`.

## Ordem resumida

| Ordem | Entrega | Resultado principal | Participação manual |
| --- | --- | --- | --- |
| 1 | Prova visual e narrativa | Projetos deixam de ser apenas descrições e passam a demonstrar processo, execução e resultado | Alta: fornecer imagens e fatos reais |
| 2 | Base técnica enxuta | Código mais fácil de manter, dependências menores e experiência mais rápida | Baixa: validar aparência e comportamento |
| 3 | Qualidade de produção | SEO, acessibilidade, testes, desempenho e publicação verificáveis | Média: aprovar metadados e conferir a versão publicada |
| 4 | Estudos de caso independentes | Home mais curta e páginas próprias para aprofundar cada projeto | Média: validar narrativa e informações de cada projeto |

---

## Etapa 1 — Prova visual e narrativa

**Objetivo:** transformar `Workflow` e `Nítido` nos dois projetos principais do portfólio, com imagens reais e estudos de caso curtos. Os demais projetos continuam como cards compactos.

### Escopo

- Criar uma apresentação visual forte para os dois projetos principais.
- Mostrar contexto, problema, decisões, implementação e resultado de forma breve.
- Adicionar imagens de desktop e mobile com legendas úteis.
- Explicitar função, tecnologias, responsabilidades e estado de cada projeto.
- Melhorar a hierarquia dos cards sem disputar atenção com a cena orbital.
- Manter a introdução de Projetos como o momento em que o planeta volta a ganhar presença.
- Garantir que o globo não prejudique a leitura dos cards.

### Fora desta etapa

- Migração de framework.
- Animações decorativas novas.
- Blog, CMS, painel administrativo ou sistema de comentários.
- Estudos de caso longos para todos os cinco projetos.

### MANUAL — Thalles, antes de executar

Para cada projeto principal (`Workflow` e `Nítido`), reunir:

- 3 a 6 capturas limpas, preferencialmente incluindo desktop e mobile.
- Uma frase sobre o problema real que o projeto resolve.
- Seu papel e as partes que você implementou pessoalmente.
- Período ou duração aproximada do trabalho.
- Duas ou três decisões técnicas ou visuais importantes.
- Resultado real. Pode ser qualitativo; não crie números caso não existam.
- Links públicos de demonstração e repositório, quando puderem ser divulgados.
- Confirmação de que nomes, marcas e telas podem aparecer no portfólio.

Se ainda não houver métricas, use consequências verificáveis como “fluxo publicado”, “interface responsiva entregue” ou “processo manual substituído”, desde que sejam verdadeiras.

### Prompt de implementação

```text
Quero executar a Etapa 1 do ROADMAP.md deste projeto: Prova visual e narrativa.

Leia completamente o ROADMAP.md e examine o código atual antes de alterar arquivos. Preserve a identidade orbital, o hero e a linguagem visual técnica já existente. Não redesenhe o site do zero.

Transforme Workflow e Nítido nos dois projetos principais, usando somente as imagens e informações reais que forneci. Crie estudos de caso curtos e escaneáveis, com: contexto, problema, meu papel, principais decisões, implementação, tecnologias e resultado. Os outros projetos devem permanecer como cards menores.

Use as capturas reais como evidência visual, com carregamento responsivo, dimensões explícitas, texto alternativo e legendas quando agregarem contexto. Crie uma hierarquia clara entre projeto principal e secundário. Na introdução da seção Projetos, deixe o planeta novamente mais visível; durante os cards, reduza sua interferência para manter contraste e leitura.

Não invente métricas, resultados, clientes, responsabilidades ou links. Se faltar uma informação indispensável, liste exatamente o que falta e implemente tudo o que for seguro sem fabricar conteúdo.

Verifique desktop e mobile, navegação por teclado, contraste, carregamento das imagens e prefers-reduced-motion. Preserve os ajustes existentes do usuário. Ao final, informe arquivos alterados, verificações feitas e qualquer ação manual restante. Não faça commit nem deploy sem minha autorização.
```

### Critérios de conclusão

- [x] Workflow e Nítido têm imagens reais e narrativa completa.
- [x] É possível entender o problema, a contribuição de Thalles e o resultado em menos de um minuto.
- [x] Os demais projetos continuam disponíveis sem competir visualmente com os dois principais.
- [x] O planeta reaparece com intenção na introdução de Projetos, sem ficar atrás dos cards.
- [x] Não existem informações inventadas ou placeholders publicados.
- [x] A seção funciona e permanece legível em mobile e desktop.

---

## Etapa 2 — Base técnica enxuta

**Objetivo:** tornar o projeto mais simples de evoluir e mais leve, sem uma migração grande ou mudança perceptível de identidade.

### Estratégia

Em vez de migrar imediatamente para um framework complexo, manter o site estático e introduzir apenas uma base moderna de desenvolvimento: Vite, TypeScript e módulos pequenos. Isso entrega organização, validação e otimização com menos risco.

### Escopo

- Configurar Vite e TypeScript para desenvolvimento e build.
- Dividir o JavaScript por responsabilidade: cena orbital, navegação, animações e conteúdo dos projetos.
- Separar estilos por componentes ou seções sem alterar o resultado visual aprovado.
- Centralizar os dados dos projetos para evitar conteúdo duplicado no HTML.
- Remover código legado escondido, imagens não utilizadas e dependências sem função relevante.
- Substituir o mapa pesado por uma solução estática leve se ele comunicar apenas “Brasil / remoto”.
- Reduzir famílias e pesos de fontes sem prejudicar a hierarquia visual.
- Manter dependências com versão fixa e carregamento previsível.

### Fora desta etapa

- React, Next.js, Astro, CMS ou banco de dados sem uma necessidade concreta.
- Reescrita completa das animações.
- Mudanças de conteúdo dos estudos de caso já aprovados.

### MANUAL — Thalles

- Comparar a versão anterior e a nova em desktop e celular.
- Confirmar que a identidade visual e o movimento ainda parecem corretos.
- Informar se algum arquivo aparentemente não utilizado precisa ser preservado por outro motivo.

### Prompt de implementação

```text
Quero executar a Etapa 2 do ROADMAP.md deste projeto: Base técnica enxuta.

Leia completamente o ROADMAP.md, inspecione a implementação atual e preserve integralmente o conteúdo e a direção visual aprovados na Etapa 1. Antes de remover arquivos ou dependências, confirme pelo código que não estão sendo usados.

Modernize o projeto estático com Vite e TypeScript, evitando migração para React, Next.js, Astro ou outro framework. Organize o JavaScript em módulos pequenos por responsabilidade, separe os estilos de forma compreensível e centralize os dados dos projetos. Remova o arquivo ou markup legado oculto e recursos realmente sem uso.

Avalie o custo do mapa atual. Se ele servir apenas para indicar Brasil e trabalho remoto, substitua-o por uma representação SVG/CSS leve que preserve a intenção visual. Reduza fontes e dependências desnecessárias e fixe versões das dependências mantidas.

Não altere a estética por conveniência técnica. Preserve a cena orbital, o comportamento de scroll, os estudos de caso e a responsividade. Respeite alterações existentes do usuário e não apague nada sobre o qual não haja evidência suficiente.

Execute build, checagem de tipos e uma verificação funcional das principais interações. Compare a saída antes e depois quando houver dados disponíveis. Ao final, documente como iniciar e gerar o projeto, arquivos alterados, itens removidos e resultados das verificações. Não faça commit nem deploy sem minha autorização.
```

### Critérios de conclusão

- [ ] O projeto inicia e gera uma versão de produção com comandos documentados.
- [ ] TypeScript e build passam sem erros.
- [ ] Conteúdo e experiência visual da Etapa 1 foram preservados.
- [ ] Não existe uma grande área legada oculta sendo carregada no DOM.
- [ ] Dependências, fontes e arquivos sem uso foram removidos com segurança.
- [ ] A estrutura permite localizar rapidamente cena orbital, navegação, animações e projetos.

---

## Etapa 3 — Qualidade de produção

**Objetivo:** demonstrar maturidade profissional com uma versão publicada que seja verificável, acessível, encontrável e resistente a regressões.

### Escopo

- Adicionar testes automáticos dos fluxos essenciais e links principais.
- Validar menu, troca de idioma quando existente, projetos, contato e comportamento responsivo.
- Corrigir problemas de acessibilidade: teclado, foco, semântica, textos alternativos, contraste e movimento reduzido.
- Completar SEO técnico: título, descrição, canonical, Open Graph, Twitter Card, dados estruturados, sitemap e robots.
- Criar uma imagem de compartilhamento consistente com a identidade do site.
- Otimizar imagens, fontes, scripts e carregamento da cena orbital.
- Configurar cabeçalhos de segurança e cache apropriados para a hospedagem.
- Registrar medidas antes/depois e evitar regressões relevantes de desempenho.
- Criar integração contínua para build, tipos e testes.

### Fora desta etapa

- Otimização para uma nota artificial ignorando a experiência visual.
- Analytics, cookies ou ferramentas de rastreamento sem objetivo definido.
- Cadastro em serviços pagos.

### MANUAL — Thalles

- Aprovar título, descrição e imagem usados ao compartilhar o portfólio.
- Confirmar telefone, e-mail, LinkedIn, GitHub e disponibilidade profissional.
- Autorizar o deploy quando a prévia estiver validada.
- Depois do deploy, abrir o site no próprio celular e testar projetos e contato.
- Se desejar domínio próprio ou ferramentas externas, configurar as contas e o DNS; isso não é obrigatório para concluir a etapa.

### Prompt de implementação

```text
Quero executar a Etapa 3 do ROADMAP.md deste projeto: Qualidade de produção.

Leia completamente o ROADMAP.md e trate as Etapas 1 e 2 como comportamento já aprovado. Faça primeiro uma auditoria mensurável da versão atual e depois implemente as melhorias, sem enfraquecer a identidade visual ou remover a cena orbital do hero.

Adicione testes automatizados para os fluxos essenciais em desktop e mobile: carregamento da página, navegação, menu, projetos e estudos de caso, links externos, contato e troca de idioma se ela existir. Inclua build, tipos e testes na integração contínua.

Revise acessibilidade, semântica, teclado, foco visível, textos alternativos, contraste e prefers-reduced-motion. Complete SEO técnico com canonical, Open Graph, Twitter Card, JSON-LD adequado ao portfólio, sitemap e robots. Prepare uma imagem de compartilhamento coerente com a direção visual, mas peça minha aprovação antes de considerá-la final.

Otimize imagens, fontes, scripts e o carregamento da cena 3D. Configure cache e cabeçalhos de segurança compatíveis com a hospedagem atual. Não adicione analytics, cookies ou serviços pagos.

Execute build, checagem de tipos, testes e auditoria de desempenho. Compare os resultados antes e depois, explique concessões necessárias e deixe uma lista curta das verificações manuais de publicação. Não faça commit nem deploy sem minha autorização.
```

### Critérios de conclusão

- [ ] Build, tipos e testes passam automaticamente.
- [ ] Fluxos principais foram testados em desktop e mobile.
- [ ] Navegação por teclado, foco e movimento reduzido funcionam corretamente.
- [ ] Metadados sociais, canonical, dados estruturados, sitemap e robots estão válidos.
- [ ] Imagens e recursos pesados têm estratégia de carregamento adequada.
- [ ] Cache e cabeçalhos de segurança estão configurados.
- [ ] A versão publicada foi conferida manualmente em um celular real.

---

## Etapa 4 — Estudos de caso independentes

**Objetivo:** reduzir o comprimento da home e dar a cada projeto espaço próprio para explicar problema, decisões, execução e resultado.

### Estratégia

- Manter na home uma apresentação compacta dos cinco projetos.
- Usar o navegador coverflow já implementado como modelo da dobra de projetos: arraste, teclado, paginação e link direto para cada projeto publicado.
- Destacar imagem, função, principal resultado e uma chamada clara para cada estudo de caso.
- Criar primeiro páginas próprias para Workflow e Nítido, reaproveitando o conteúdo e as evidências já verificadas.
- Adicionar os outros projetos quando houver material suficiente, sem publicar páginas vazias.
- Preservar a identidade orbital na home e usar uma direção mais focada no produto dentro dos estudos de caso.

### MANUAL — Thalles

- Confirmar contexto, período, responsabilidades e resultados antes da publicação de cada página.
- Fornecer novas imagens somente quando as capturas existentes não demonstrarem uma etapa importante.
- Validar se nomes e marcas de clientes podem permanecer públicos.

### Critérios de conclusão

- [x] Modelo de dobra coverflow criado na home; prompt reutilizável salvo em `PROMPTS/project-coverflow-home.md`.
- [ ] A home apresenta os projetos de maneira mais curta e escaneável.
- [ ] Workflow e Nítido possuem URLs próprias e navegação de retorno clara.
- [ ] Cada estudo de caso diferencia contribuição, decisões técnicas e resultado.
- [ ] Metadados e imagem de compartilhamento são específicos por projeto.
- [ ] Nenhuma página contém métricas ou informações não verificadas.

---

## Acompanhamento

Atualizar somente esta seção ao concluir cada entrega:

- [x] Etapa 1 — Prova visual e narrativa
- [ ] Etapa 2 — Base técnica enxuta *(em andamento)*
- [ ] Etapa 3 — Qualidade de produção
- [ ] Etapa 4 — Estudos de caso independentes

**Próxima ação:** concluir a migração incremental da Etapa 2 e validar a aparência antes de avançar.
