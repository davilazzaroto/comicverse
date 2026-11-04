// Formato comum dos dados de uma obra no catálogo.
export interface Quadrinho {
  id: string;
  titulo: string;
  autor: string;
  editora: string;
  genero: string;
  volume: number;
  dataPublicacao: string;
  disponivel: boolean;
}