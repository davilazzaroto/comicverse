import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuadrinhosService } from '../../core/services/quadrinhos.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-manutencao-quadrinho',
  styleUrl: './manutencao-quadrinho.css',
  templateUrl: './manutencao-quadrinho.html',
})
export class ManutencaoQuadrinho {
  private fb = inject(FormBuilder);
  private quadrinhosService = inject(QuadrinhosService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editingQuadrinhoId: string | null = null;
  loading = false;
  loadingData = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required, Validators.minLength(2)]],
    icone: ['', [Validators.required]],
    editora: ['', [Validators.required, Validators.minLength(2)]],
    genero: ['', [Validators.required, Validators.minLength(2)]],
    ano: ['', [Validators.required]],
    preco: [0, [Validators.required, Validators.min(0)]],
    volume: [0, [Validators.required]],
    dataPublicacao: ['', [Validators.required]],
    disponivel: [true, [Validators.required]],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editingQuadrinhoId = id;
      this.loadQuadrinho(id);
    }
  }
  loadQuadrinho(id: string): void {
    this.loadingData = true;
    this.quadrinhosService.getById(id).subscribe({
      next: (quadrinho) => {
        if (quadrinho) {
          this.form.patchValue({
            titulo: quadrinho.titulo,
            autor: quadrinho.autor,
            icone: quadrinho.icone ?? '',
            editora: quadrinho.editora,
            genero: quadrinho.genero,
            ano: quadrinho.ano ?? '',
            preco: quadrinho.preco ?? 0,
            volume: quadrinho.volume,
            dataPublicacao: quadrinho.dataPublicacao,
            disponivel: quadrinho.disponivel,
          });
        }
        this.loadingData = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar os dados do quadrinho.' + error.message;
        this.loadingData = false;
      },
    });
  }
  submit(): void {
    if (this.loading || this.loadingData) {
      return;
    }
    this.successMessage = '';
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Confira os campos obrigatórios e os tamanhos mínimos informados.';
      return;
    }
    this.loading = true;
    const formValue = this.form.getRawValue();
    const quadrinhoData = {
      titulo: formValue.titulo,
      autor: formValue.autor,
      icone: formValue.icone,
      editora: formValue.editora,
      genero: formValue.genero,
      ano: formValue.ano,
      preco: formValue.preco,
      volume: formValue.volume,
      dataPublicacao: formValue.dataPublicacao,
      disponivel: formValue.disponivel,
    };

    if (this.editingQuadrinhoId !== null) {
      this.quadrinhosService.update(this.editingQuadrinhoId, quadrinhoData).subscribe({
        next: () => {
          this.loading = false;
          this.successMessage = 'Quadrinho atualizado com sucesso.';
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 2000);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'Erro ao atualizar o quadrinho.';
        },
      });
      return;
    }
    this.quadrinhosService.create(quadrinhoData).subscribe({
      next: () => {
        this.loading = false;
        this.successMessage = 'Quadrinho criado com sucesso.';
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Erro ao criar o quadrinho.';
      },
    });
  }
}
