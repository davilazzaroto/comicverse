import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuadrinhosService } from '../../core/services/quadrinhos.service';

@Component({
  imports: [RouterLink, ReactiveFormsModule],
  selector: 'app-manutencao-quadrinho',
  styleUrl: './manutencao-quadrinho.css',
  templateUrl: './manutencao-quadrinho.html',
})
export class ManutencaoQuadrinho {
  private fb = inject(FormBuilder);
  private quadrinhosService = inject(QuadrinhosService);
  private route = inject(ActivatedRoute);
  private router = inject(RouterLink);

  editingQuadrinhoId: string | null = null;
  loading = false;
  loadingData = false;
  successMessage = '';
  errorMessage = '';

  form = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    autor: ['', [Validators.required, Validators.minLength(15)]],
    icone: ['', [Validators.required]],
    editora: ['', [Validators.required, Validators.minLength(20)]],
    genero: ['', [Validators.required, Validators.minLength(15)]],
    ano: ['', [Validators.required]],
    preco: [0, [Validators.required, Validators.min(0)]],
    volume: [0],
    dataPublicacao: [''],
    disponivel: [true],
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
            icone: quadrinho.icone,
            editora: quadrinho.editora,
            genero: quadrinho.genero,
            ano: quadrinho.ano,
            preco: quadrinho.preco,
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
    this.successMessage = '';
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
      
    }
  }
}
