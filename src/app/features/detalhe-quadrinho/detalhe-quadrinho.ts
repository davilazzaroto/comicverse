import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Quadrinho } from '../../core/models/quadrinho.model';
import { QuadrinhosService } from '../../core/services/quadrinhos.service';
import { finalize, timeout } from 'rxjs';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-detalhe-quadrinho',
  styleUrl: './detalhe-quadrinho.css',
  templateUrl: './detalhe-quadrinho.html',
})
export class DetalheQuadrinho {
  private readonly route = inject(ActivatedRoute);
  private readonly quadrinhosService = inject(QuadrinhosService);

  quadrinho = signal<Quadrinho | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.loading.set(false);
      this.errorMessage.set('ID do quadrinho não informado.');
      return;
    }

    this.quadrinhosService
      .getById(id)
      .pipe(
        timeout({ first: 15000 }),
        finalize(() => {
          this.loading.set(false);
        }),
      )
      .subscribe({
        next: (quadrinho) => {
          this.quadrinho.set(quadrinho);
        },
        error: (error) => {
          this.errorMessage.set(
            'Erro ao carregar os dados do quadrinho. ' + error.message,
          );
        },
      });
  }
}
