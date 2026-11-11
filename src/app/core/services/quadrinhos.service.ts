import { inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { Quadrinho } from '../models/quadrinho.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// Ponto central para ler e manter quadrinhos; a integração com API e Firebase
// ainda será feita em aula.
type FirebaseQuadrinho = Omit<Quadrinho, 'id'> & { id?: string };

@Injectable({ providedIn: 'root' })
export class QuadrinhosService {
  private http = inject(HttpClient);
  private apiUrl = 'https://comicverse-80371-default-rtdb.firebaseio.com/quadrinhos';
  private sufix = '.json';

  getAll(): Observable<Quadrinho[]> {
    return this.http.get<Record<string, FirebaseQuadrinho>>(this.apiUrl + this.sufix).pipe(
      map((response) => {
        if (!response) {
          return [];
        }
        return Object.entries(response).map(([id, quadrinho]) => {
          const { id: _ignoredId, ...quadrinhoData } = quadrinho;
          return { id, ...quadrinhoData } as Quadrinho;
        });
      }),
    );
  }
  getById(id: string): Observable<Quadrinho | null> {
    return this.http.get<FirebaseQuadrinho>(`${this.apiUrl}/${id}${this.sufix}`).pipe(
      map((response) => {
        if (!response) {
          throw new Error(`Quadrinho com ID ${id} não encontrado.`);
        }
        const { id: _ignoredId, ...quadrinhoData } = response;
        return { id, ...quadrinhoData };
      }),
    );
  }

  create(quadrinho: Omit<Quadrinho, 'id'>): Observable<Quadrinho> {
    return this.http.post<{ name: string }>(this.apiUrl + this.sufix, quadrinho).pipe(
      map((response) => ({
        id: response.name,
        ...quadrinho,
      })),
    );
  }
  update(id: string, quadrinho: Omit<Quadrinho, 'id'>): Observable<Quadrinho> {
    return this.http
      .put<Omit<Quadrinho, 'id'>>(`${this.apiUrl}/${id}${this.sufix}`, quadrinho)
      .pipe(map((reponse) => ({ id, ...quadrinho })));
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}${this.sufix}`);
  }
}
