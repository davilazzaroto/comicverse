// Formato comum dos dados de uma obra no catálogo.
export interface Quadrinho {
  id: string;
  titulo: string;
  autor: string;
  editora: string;
  genero: string;
  ano: string;
  preco: number;
  volume: number;
  icone : string; 
  dataPublicacao: string;
  disponivel: boolean;
}