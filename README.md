# ComicVerse

Este é meu projeto para a disciplina de Programação Web II. O ComicVerse é uma biblioteca de HQs e mangás, desenvolvida por Davi Antônio Galeano Lazzaroto.

## O que já funciona

O projeto tem telas de início, catálogo, detalhes de uma obra, administração, novo cadastro e sobre. O menu permite navegar entre início, catálogo, sobre e administração.

O catálogo e o painel administrativo estão integrados ao Firebase Realtime Database. As obras podem ser consultadas, cadastradas, editadas e removidas pelo painel de administração.

Na página de detalhes, o quadrinho é carregado dinamicamente pelo parâmetro `id` da rota. A tela também apresenta estados de carregamento, erro e ausência de dados.

O projeto conta com Dark Mode utilizando Angular Signals e variáveis CSS globais. O botão no cabeçalho permite alternar entre os temas claro e escuro, mantendo a preferência do usuário no `localStorage`.

A página Sobre apresenta as informações do projeto e um mapa com a localização da Faculdade FAMPER, em Ampére/PR.

## Tecnologias

- Angular 22
- TypeScript
- Angular Signals
- Angular Router
- Firebase Realtime Database
- CSS Variables

## Como executar

Instale as dependências e inicie o servidor:

```bash
npm install
ng serve
```

Depois, acesse [http://localhost:4200](http://localhost:4200).

Para gerar os arquivos de produção:

```bash
npm run build
```
