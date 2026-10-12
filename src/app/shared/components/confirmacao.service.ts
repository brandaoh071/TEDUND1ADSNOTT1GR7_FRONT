import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { ConfirmacaoDialogComponent, DadosConfirmacao } from './confirmacao-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmacaoService {
  private readonly dialog = inject(MatDialog);

  confirmar(dados: DadosConfirmacao): Observable<boolean> {
    return this.dialog
      .open(ConfirmacaoDialogComponent, { data: dados, width: '420px' })
      .afterClosed()
      .pipe(map((resposta) => resposta === true));
  }
}
