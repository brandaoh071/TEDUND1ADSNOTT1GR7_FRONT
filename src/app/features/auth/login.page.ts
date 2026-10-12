import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="fundo">
      <mat-card class="cartao">
        <mat-card-header>
          <mat-card-title>Sistema de Controle de Solicitações de Disciplina</mat-card-title>
          <mat-card-subtitle>Entre com sua matrícula ou login</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="entrar()" class="coluna">
            <mat-form-field>
              <mat-label>Login</mat-label>
              <input matInput formControlName="login" autocomplete="username" />
              <mat-error>Informe o login</mat-error>
            </mat-form-field>
            <mat-form-field>
              <mat-label>Senha</mat-label>
              <input matInput type="password" formControlName="senha" autocomplete="current-password" />
              <mat-error>Informe a senha</mat-error>
            </mat-form-field>
            @if (erro()) {
              <p class="erro">{{ erro() }}</p>
            }
            <button mat-flat-button type="submit" [disabled]="entrando()">
              {{ entrando() ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </main>
  `,
  styles: `
    .fundo {
      min-height: 100dvh;
      display: grid;
      place-items: center;
      padding: 16px;
      background: var(--ted-fundo-login);
    }
    .cartao {
      width: 100%;
      max-width: 420px;
    }
    form {
      margin-top: 16px;
    }
    .erro {
      color: var(--ted-erro);
      margin: 0 0 12px;
    }
  `,
})
export default class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly entrando = signal(false);
  readonly erro = signal('');
  readonly form = inject(FormBuilder).nonNullable.group({
    login: ['', Validators.required],
    senha: ['', Validators.required],
  });

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.erro.set('');
    this.entrando.set(true);
    this.auth
      .entrar(this.form.getRawValue())
      .pipe(finalize(() => this.entrando.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/inicio']),
        error: (resposta) => {
          if (resposta.status === 401) {
            this.erro.set('Login ou senha inválidos');
          }
        },
      });
  }
}
