# Sandman — site Rodow

Landing page (`index.html`) e Política de Privacidade (`politica-de-privacidade.html`) em
HTML, CSS e JavaScript puros, sem build.

## Estrutura

```
Sandman/
├─ index.html
├─ politica-de-privacidade.html
├─ css/
│  ├─ tokens.css       # cores, fontes, raios, medidas (fonte única)
│  ├─ base.css         # reset, container, acessibilidade
│  ├─ components.css   # logo, header, botões, footer, toast
│  ├─ landing.css      # seções da landing
│  └─ policy.css       # layout e texto da política
├─ js/
│  ├─ main.js          # entrada da landing
│  ├─ policy.js        # entrada da política
│  └─ modules/         # menu, toast, accordion, toc
├─ assets/favicon.svg
├─ .vscode/            # configurações e extensões recomendadas
└─ .editorconfig, .prettierrc, package.json, vercel.json
```

## Rodar no VS Code

1. Abra a pasta `Sandman` no VS Code e instale as extensões recomendadas.
2. Clique em **Go Live** (Live Server) ou rode `npm run dev` (http://localhost:5500).

> Abra por servidor local: os scripts usam ES Modules, que o navegador bloqueia em `file://`.

## Qualidade de código

```bash
npm install
npm run format        # formata tudo com Prettier
npm run format:check
```

## Deploy

- **Vercel:** importe a pasta. O `vercel.json` ativa `cleanUrls` (`/politica-de-privacidade`).
- **Netlify:** arraste a pasta ou conecte o repositório. As URLs sem `.html` já funcionam.

## Antes de publicar

- [ ] Links oficiais das lojas (CTA hoje abre um toast de aviso)
- [ ] E-mail oficial de privacidade (hoje provisório) e dados do responsável (razão social/CNPJ)
- [ ] Remover a nota final e os avisos "provisório" da política
- [ ] Revisão jurídica da política (LGPD)
- [ ] Imagem final do hero (hoje Unsplash) e `og-image.png` (1200×630)
- [ ] Descomentar `canonical` e `og:image` com o domínio real
- [ ] Serviços de terceiros reais citados na política

## Extras adicionados (não existiam nos HTMLs originais)

Link "Política de privacidade" no rodapé da landing, `description`/Open Graph da landing, skip link,
destaque da seção ativa no índice da política e animação do FAQ.
