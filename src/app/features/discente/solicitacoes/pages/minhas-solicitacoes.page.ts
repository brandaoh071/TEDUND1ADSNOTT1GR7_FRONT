import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Pagina } from '../../../../core/models/pagina.model';
import { Solicitacao } from '../../../../core/models/solicitacao.model';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { ItensSolicitacaoComponent } from '../../../../shared/components/itens-solicitacao.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge.component';
import { SolicitacaoDiscenteApi } from '../data/solicitacao-discente.api';

@Component({
  selector: 'app-minhas-solicitacoes',
  imports: [
    DatePipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    CabecalhoPaginaComponent,
    ItensSolicitacaoComponent,
    StatusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-cabecalho-pagina titulo="Minhas solicitações" subtitulo="Acompanhe o status de cada solicitação">
      <a mat-flat-button routerLink="/discente/nova-solicitacao"><mat-icon>add</mat-icon> Nova solicitação</a>
    </app-cabecalho-pagina>

    @if (carregando()) {
      <mat-progress-bar mode="indeterminate" />
    }

    <div class="lista">
      @for (solicitacao of pagina()?.conteudo ?? []; track solicitacao.id) {
        <mat-card>
          <mat-card-header>
            <mat-card-title>Semestre {{ solicitacao.semestreReferencia }}</mat-card-title>
            <mat-card-subtitle>
              Solicitação nº {{ solicitacao.id }} · enviada em {{ solicitacao.dataSolicitacao | date }}
            </mat-card-subtitle>
            <span class="espaco"></span>
            <app-status-badge [status]="solicitacao.status" />
          </mat-card-header>
          <mat-card-content>
            <app-itens-solicitacao [itens]="solicitacao.itens" />
            @if (solicitacao.dataValidacao) {
              <p class="validacao">
                Validada por {{ solicitacao.validadoPor }} em {{ solicitacao.dataValidacao | date }}
                @if (solicitacao.observacao) {
                  · {{ solicitacao.observacao }}
                }
              </p>
            }
          </mat-card-content>
        </mat-card>
      } @empty {
        @if (!carregando()) {
          <p class="dica">Você ainda não enviou nenhuma solicitação.</p>
        }
      }
    </div>

    @if ((pagina()?.totalPaginas ?? 0) > 1) {
      <mat-paginator
        [length]="pagina()?.totalElementos ?? 0"
        [pageIndex]="indice()"
        [pageSize]="tamanho"
        [hidePageSize]="true"
        (page)="mudarPagina($event)"
      />
    }
  `,
  styles: `
    .lista {
      display: grid;
      gap: 16px;
    }
    mat-card-header {
      align-items: center;
    }
    .espaco {
      flex: 1;
    }
    .validacao {
      margin: 12px 0 0;
      font-size: 13px;
      opacity: 0.8;
    }
  `,
})
export default class MinhasSolicitacoesPage implements OnInit {
  private readonly api = inject(SolicitacaoDiscenteApi);

  readonly tamanho = 10;
  readonly pagina = signal<Pagina<Solicitacao> | null>(null);
  readonly carregando = signal(false);
  readonly indice = signal(0);

  ngOnInit(): void {
    this.carregar();
  }

  mudarPagina(evento: PageEvent): void {
    this.indice.set(evento.pageIndex);
    this.carregar();
  }

  private carregar(): void {
    this.carregando.set(true);
    this.api
      .minhas(this.indice(), this.tamanho)
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((pagina) => this.pagina.set(pagina));
  }
}
