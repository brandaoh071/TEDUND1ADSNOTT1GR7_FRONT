import { Directive, OnInit, inject, input, numberAttribute, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { NotificacaoService } from '../../core/notificacao/notificacao.service';
import { aplicarErrosDaApi } from '../utils/erros-api';

@Directive()
export abstract class FormularioBase<T, R> implements OnInit {
  protected readonly router = inject(Router);
  protected readonly notificacao = inject(NotificacaoService);

  readonly id = input(undefined, { transform: (valor: unknown) => (valor ? numberAttribute(valor) : undefined) });
  readonly salvando = signal(false);

  abstract readonly form: FormGroup;
  protected abstract readonly rotaLista: string;
  protected abstract readonly nomeRegistro: string;

  protected abstract carregar(id: number): Observable<T>;

  protected abstract preencher(registro: T): void;

  protected abstract montarRequisicao(): R;

  protected abstract criar(dados: R): Observable<T>;

  protected abstract atualizar(id: number, dados: R): Observable<T>;

  get editando(): boolean {
    return this.id() !== undefined;
  }

  ngOnInit(): void {
    const id = this.id();
    if (id !== undefined) {
      this.carregar(id).subscribe((registro) => this.preencher(registro));
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const id = this.id();
    const dados = this.montarRequisicao();
    const operacao = id === undefined ? this.criar(dados) : this.atualizar(id, dados);
    this.salvando.set(true);
    operacao.pipe(finalize(() => this.salvando.set(false))).subscribe({
      next: () => {
        this.notificacao.sucesso(`${this.nomeRegistro} ${id === undefined ? 'cadastrado(a)' : 'atualizado(a)'} com sucesso`);
        this.router.navigateByUrl(this.rotaLista);
      },
      error: (erro) => aplicarErrosDaApi(this.form, erro),
    });
  }

  cancelar(): void {
    this.router.navigateByUrl(this.rotaLista);
  }
}
