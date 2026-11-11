import { Injectable } from '@angular/core';
import { defer, Observable, of, throwError } from 'rxjs';
import { Quadrinho } from '../models/quadrinho.model';

// Os dados duram somente enquanto a pagina estiver aberta. F5 limpa o acervo.
@Injectable({ providedIn: 'root' })
export class QuadrinhosService {
  private quadrinhos: Quadrinho[] = [];
  private proximoId = 1;

  getAll(): Observable<Quadrinho[]> {
    return defer(() => of(this.quadrinhos.map((quadrinho) => ({ ...quadrinho }))));
  }

  getById(id: string): Observable<Quadrinho | null> {
    return defer(() => {
      const quadrinho = this.quadrinhos.find((item) => item.id === id);
      return quadrinho
        ? of({ ...quadrinho })
        : throwError(() => new Error('Quadrinho nao encontrado.'));
    });
  }

  create(dados: Omit<Quadrinho, 'id'>): Observable<Quadrinho> {
    return defer(() => {
      const quadrinho = { ...dados, id: String(this.proximoId++) };
      this.quadrinhos.push(quadrinho);
      return of({ ...quadrinho });
    });
  }

  update(id: string, dados: Omit<Quadrinho, 'id'>): Observable<Quadrinho> {
    return defer(() => {
      const index = this.quadrinhos.findIndex((item) => item.id === id);
      if (index === -1) {
        return throwError(() => new Error('Quadrinho nao encontrado.'));
      }
      const quadrinho = { ...dados, id };
      this.quadrinhos[index] = quadrinho;
      return of({ ...quadrinho });
    });
  }

  delete(id: string): Observable<void> {
    return defer(() => {
      this.quadrinhos = this.quadrinhos.filter((item) => item.id !== id);
      return of(undefined);
    });
  }
}
