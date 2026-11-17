import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuadrinhosService } from '../../core/services/quadrinhos.service';
import { Quadrinho } from '../../core/models/quadrinho.model';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-quadrinhos',
  styleUrl: './quadrinhos.css',
  templateUrl: './quadrinhos.html',
})
export class Quadrinhos {
  private readonly quadrinhosService = inject(QuadrinhosService);

  quadrinhos = signal<Quadrinho[]>([]);
  loading = signal(false);
  errorMessage = '';

  loadQuadrinhos(): void {
    this.loading.set(true);
    this.errorMessage = '';

    this.quadrinhosService.getAll().subscribe({
      next: (quadrinhos) => {
        this.quadrinhos.set(quadrinhos);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar os quadrinhos. ' + error.message;
        this.loading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadQuadrinhos();
  }
  

}
