import { Directive, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, filter, switchMap } from 'rxjs';
import { Registro } from '../../core/models/dominio.model';
import { HistoricoDialogComponent, ItemHistorico } from '../components/historico-dialog.component';
import { Inativacao, InativacaoDialogComponent } from '../components/inativacao-dialog.component';
import { ListaBase } from './lista-base';

export interface PessoaRegistro extends Registro {
  matricula: string;
  nomeCompleto: string;
}

export interface ApiDePessoa {
  inativar(id: number, corpo: Inativacao): Observable<void>;
  reativar(id: number): Observable<void>;
  historico(id: number): Observable<ItemHistorico[]>;
}

@Directive()
export abstract class ListaPessoaBase<T extends PessoaRegistro> extends ListaBase<T> {
  private readonly dialog = inject(MatDialog);

  protected abstract readonly apiDePessoa: ApiDePessoa;
  protected abstract readonly motivos: string[];

  protected descrever(pessoa: T): string {
    return pessoa.nomeCompleto;
  }

  protected inativarItem(): Observable<unknown> {
    throw new Error('A inativação de pessoas exige motivo');
  }

  protected reativarItem(pessoa: T): Observable<unknown> {
    return this.apiDePessoa.reativar(pessoa.id);
  }

  protected override inativar(pessoa: T): void {
    this.dialog
      .open<InativacaoDialogComponent, unknown, Inativacao>(InativacaoDialogComponent, {
        data: { nome: pessoa.nomeCompleto, motivos: this.motivos },
        width: '480px',
      })
      .afterClosed()
      .pipe(
        filter((resultado): resultado is Inativacao => !!resultado),
        switchMap((resultado) => this.apiDePessoa.inativar(pessoa.id, resultado)),
      )
      .subscribe(() => this.concluir(`${pessoa.nomeCompleto} inativado(a)`));
  }

  verHistorico(pessoa: T): void {
    this.dialog.open(HistoricoDialogComponent, {
      data: { nome: pessoa.nomeCompleto, historico: this.apiDePessoa.historico(pessoa.id) },
      width: '520px',
    });
  }
}
