# Canil Transparente (MVP)

MVP de portal de transparência para o Canil Municipal, criado em resposta às
limitações do site atual: falta de busca/filtros e ausência de histórico
detalhado por animal.

## Funcionalidades

- Busca e filtros (espécie, status de saúde, bairro, ordenação por data)
- Página de detalhe por animal com dados básicos, status de saúde e peso
- Linha do tempo (timeline) com atualizações: recolhimento, internação,
  tratamento, pós-recolhimento, adoção/óbito
- Dados mockados baseados no site real de Jaguarão, prontos para serem
  substituídos por uma API real

## Stack

- Vite + React + TypeScript
- React Router
- CSS puro (sem dependências extras) — fácil de hospedar na Vercel

## Rodando localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

```bash
vercel
```

Basta importar o repositório na Vercel (framework preset: Vite).
Depois, os dados mockados em `src/data/animais.ts` podem ser substituídos
por chamadas a uma API/backend real (Node.js + Prisma, por exemplo).

## Próximos passos sugeridos

1. Substituir dados mockados por uma API real com banco de dados (Postgres + Prisma)
2. Upload de fotos por evento do histórico (não só uma foto única)
3. Painel administrativo para a equipe do Demma cadastrar atualizações
4. Exportação de dados (CSV/PDF) para pedidos via Lei de Acesso à Informação
5. Página de estatísticas públicas (nº de recolhimentos, adoções, óbitos por período)
