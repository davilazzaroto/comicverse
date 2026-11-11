import { DatePipe } from '@angular/common';
import { Component, inject,signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { QuadrinhosService } from '../../core/services/quadrinhos.service';
import { Quadrinho } from '../../core/models/quadrinho.model';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin {
  private readonly quadrinhosService = inject(QuadrinhosService);
  private router = inject(Router);

  quadrinhos = signal<Quadrinho[]>([]);
  loading = signal(false);
  errorMessage = '';
  sucessMessage = '';

  loadQuadrinhos(): void {
    this.loading.set(true);
    this.errorMessage = '';

    this.quadrinhosService.getAll().subscribe({
      next: (quadrinhos) => {
        this.quadrinhos.set(quadrinhos);
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar os quadrinhos.' + error.message;
        this.loading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadQuadrinhos();
  }

  edit(id: string): void {
    this.router.navigate(['/admin/quadrinhos/form', id]);
  }

  remove(id: string): void {
    const confirmDelete = confirm('Tem certeza que deseja remover este quadrinho?');
    if (!confirmDelete) {
      return;
    }
    this.quadrinhosService.delete(id).subscribe({
      next: () => {
        this.sucessMessage = 'Quadrinho removido com sucesso.';
        this.loadQuadrinhos();
        setTimeout(() => {
          this.sucessMessage = '';
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao remover o quadrinho.' + error.message;
      },
    });
  }
}
