import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-lista-espera-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>Enviar para a lista de espera</h2>
    <mat-dialog-content>
      <p>A solicitação de {{ nome }} irá para a lista de espera.</p>
      <mat-form-field class="campo">
        <mat-label>Observação (opcional)</mat-label>
        <textarea matInput [formControl]="observacao" rows="3" maxlength="500"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button (click)="confirmar()">Enviar para a lista de espera</button>
    </mat-dialog-actions>
  `,
  styles: `
    .campo {
      width: 100%;
    }
  `,
})
export class ListaEsperaDialogComponent {
  readonly nome = inject<string>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<ListaEsperaDialogComponent, { observacao: string | null }>);
  readonly observacao = new FormControl('', { nonNullable: true, validators: Validators.maxLength(500) });

  confirmar(): void {
    this.ref.close({ observacao: this.observacao.value.trim() || null });
  }
}
