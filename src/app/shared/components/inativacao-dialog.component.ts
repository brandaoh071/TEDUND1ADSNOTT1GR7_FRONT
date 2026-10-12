import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RotuloPipe } from '../pipes/rotulo.pipe';

export interface DadosInativacao {
  nome: string;
  motivos: string[];
}

export interface Inativacao {
  motivo: string;
  descricao: string | null;
}

@Component({
  selector: 'app-inativacao-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RotuloPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 mat-dialog-title>Inativar {{ dados.nome }}</h2>
    <mat-dialog-content>
      <p>A conta de acesso também será desativada. O motivo fica registrado no histórico.</p>
      <form [formGroup]="form" class="coluna">
        <mat-form-field>
          <mat-label>Motivo</mat-label>
          <mat-select formControlName="motivo">
            @for (motivo of dados.motivos; track motivo) {
              <mat-option [value]="motivo">{{ motivo | rotulo }}</mat-option>
            }
          </mat-select>
          <mat-error>Selecione o motivo</mat-error>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="descricao" rows="3" maxlength="500"></textarea>
          <mat-hint>Obrigatória quando o motivo for "Outro"</mat-hint>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button (click)="confirmar()">Inativar</button>
    </mat-dialog-actions>
  `,
})
export class InativacaoDialogComponent {
  readonly dados = inject<DadosInativacao>(MAT_DIALOG_DATA);
  private readonly ref = inject(MatDialogRef<InativacaoDialogComponent, Inativacao>);
  readonly form = inject(FormBuilder).nonNullable.group({
    motivo: ['', Validators.required],
    descricao: [''],
  });

  confirmar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { motivo, descricao } = this.form.getRawValue();
    this.ref.close({ motivo, descricao: descricao.trim() || null });
  }
}
