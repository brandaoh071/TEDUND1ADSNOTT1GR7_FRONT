import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Perfil } from '../models/dominio.model';
import { Credenciais, Sessao } from './sessao.model';

const CHAVE = 'ted.sessao';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly sessao = signal<Sessao | null>(this.restaurar());

  readonly autenticado = computed(() => this.sessao() !== null);
  readonly login = computed(() => this.sessao()?.login ?? '');
  readonly perfis = computed<Perfil[]>(() => this.sessao()?.perfis ?? []);

  entrar(credenciais: Credenciais): Observable<Sessao> {
    return this.http
      .post<Sessao>(`${environment.apiUrl}/auth/login`, credenciais)
      .pipe(tap((sessao) => this.guardar(sessao)));
  }

  sair(): void {
    this.sessao.set(null);
    this.armazenamento()?.removeItem(CHAVE);
    this.router.navigate(['/login']);
  }

  token(): string | null {
    const atual = this.sessao();
    if (atual && new Date(atual.expiraEm).getTime() <= Date.now()) {
      this.sessao.set(null);
      this.armazenamento()?.removeItem(CHAVE);
      return null;
    }
    return atual?.token ?? null;
  }

  possuiAlgum(perfis: Perfil[]): boolean {
    return perfis.some((perfil) => this.perfis().includes(perfil));
  }

  private guardar(sessao: Sessao): void {
    this.sessao.set(sessao);
    this.armazenamento()?.setItem(CHAVE, JSON.stringify(sessao));
  }

  private restaurar(): Sessao | null {
    try {
      const texto = this.armazenamento()?.getItem(CHAVE);
      if (!texto) {
        return null;
      }
      const sessao = JSON.parse(texto) as Sessao;
      return new Date(sessao.expiraEm).getTime() > Date.now() ? sessao : null;
    } catch {
      return null;
    }
  }

  private armazenamento(): Storage | null {
    return typeof localStorage === 'undefined' ? null : localStorage;
  }
}
