import { Directive, OnInit, inject, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, filter, finalize, switchMap } from 'rxjs';
import { Registro } from '../../core/models/dominio.model';
import { Pagina, ParametrosLista } from '../../core/models/pagina.model';
import { NotificacaoService } from '../../core/notificacao/notificacao.service';
import { ConfirmacaoService } from '../components/confirmacao.service';

@Directive()
export abstract class ListaBase<T extends Registro> implements OnInit {
  protected readonly confirmacao = inject(ConfirmacaoService);
  protected readonly notificacao = inject(NotificacaoService);

  readonly pagina = signal<Pagina<T> | null>(null);
  readonly carregando = signal(false);
  readonly indice = signal(0);
  readonly tamanho = signal(10);

  protected abstract buscarPagina(parametros: ParametrosLista): Observable<Pagina<T>>;

  protected abstract descrever(item: T): string;

  protected abstract inativarItem(item: T): Observable<unknown>;

  protected abstract reativarItem(item: T): Observable<unknown>;

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.buscarPagina({ page: this.indice(), size: this.tamanho() })
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((pagina) => this.pagina.set(pagina));
  }

  filtrar(): void {
    this.indice.set(0);
    this.carregar();
  }

  mudarPagina(evento: PageEvent): void {
    this.indice.set(evento.pageIndex);
    this.tamanho.set(evento.pageSize);
    this.carregar();
  }

  alternarStatus(item: T): void {
    if (item.status === 'ATIVO') {
      this.inativar(item);
      return;
    }
    this.confirmacao
      .confirmar({ titulo: 'Reativar', mensagem: `Deseja reativar ${this.descrever(item)}?`, confirmar: 'Reativar' })
      .pipe(
        filter(Boolean),
        switchMap(() => this.reativarItem(item)),
      )
      .subscribe(() => this.concluir(`${this.descrever(item)} reativado(a)`));
  }

  protected inativar(item: T): void {
    this.confirmacao
      .confirmar({
        titulo: 'Inativar',
        mensagem: `Deseja inativar ${this.descrever(item)}? O registro não será excluído e poderá ser reativado.`,
        confirmar: 'Inativar',
      })
      .pipe(
        filter(Boolean),
        switchMap(() => this.inativarItem(item)),
      )
      .subscribe(() => this.concluir(`${this.descrever(item)} inativado(a)`));
  }

  protected concluir(mensagem: string): void {
    this.notificacao.sucesso(mensagem);
    this.carregar();
  }
}
