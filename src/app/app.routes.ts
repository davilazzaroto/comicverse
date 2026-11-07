import { Routes } from '@angular/router';

// Cada rota carrega sua tela sob demanda; caminhos desconhecidos voltam ao início.
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
    title: 'Início | ComicVerse',
  },
  {
    path: 'quadrinhos',
    loadComponent: () =>
      import('./features/quadrinhos/quadrinhos').then((m) => m.Quadrinhos),
    title: 'Catálogo | ComicVerse',
  },
  {
    path: 'quadrinhos/:id',
    loadComponent: () =>
      import('./features/detalhe-quadrinho/detalhe-quadrinho').then(
        (m) => m.DetalheQuadrinho,
      ),
    title: 'Detalhes do quadrinho | ComicVerse',
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then((m) => m.Admin),
    title: 'Admin | ComicVerse',
  },
  {
    path: 'admin/quadrinhos/form/:id',
    loadComponent: () =>
      import('./features/manutencao-quadrinho/manutencao-quadrinho').then(
        (m) => m.ManutencaoQuadrinho,
      ),
    title: 'Editar quadrinho | ComicVerse',
  },
  {
    path: 'sobre',
    loadComponent: () => import('./features/sobre/sobre').then((m) => m.Sobre),
    title: 'Sobre | ComicVerse',
  },
  { path: '**', redirectTo: '' },
];
