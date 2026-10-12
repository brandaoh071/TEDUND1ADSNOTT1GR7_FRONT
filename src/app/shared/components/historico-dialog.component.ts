import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RotuloPipe } from '../pipes/rotulo.pipe';

export interface ItemHistorico {
  id: number;
  motivo: string;
  descricao: string | null;
  dataHora: string;
  registradoPor: string;
}

export interface DadosHistorico {
  nome: string;
  historico: Observable<ItemHistorico[]>;
}

@Component({
  selector: 'app-historico-dialog',
  imports: [MatDialogModule, MatButtonModule, DatePipe, RotuloPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>Histórico de {{ dados.nome }}</h2>
    <mat-dialog-content>
      @if (itens(); as lista) {
        @for (item of lista; track item.id) {
          <div class="item">
            <strong>{{ item.motivo | rotulo }}</strong>
            <span class="meta">{{ item.dataHora | date }} · por {{ item.registradoPor }}</span>
            @if (item.descricao) {
              <p>{{ item.descricao }}</p>
            }
          </div>
        } @empty {
          <p>Nenhuma inativação registrada.</p>
        }
      } @else {
        <p>Carregando...</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fechar</button>
    </mat-dialog-actions>
  `,
  styles: `
    .item {
      padding: 8px 0;
      border-bottom: 1px solid var(--ted-borda);
    }
    .meta {
      display: block;
      font-size: 12px;
      opacity: 0.7;
    }
    p {
      margin: 4px 0 0;
    }
  `,
})
export class HistoricoDialogComponent {
  readonly dados = inject<DadosHistorico>(MAT_DIALOG_DATA);
  readonly itens = toSignal(this.dados.historico);
}
