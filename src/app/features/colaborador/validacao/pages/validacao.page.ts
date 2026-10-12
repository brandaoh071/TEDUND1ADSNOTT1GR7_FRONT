import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable, filter, finalize, switchMap } from 'rxjs';
import { Pagina } from '../../../../core/models/pagina.model';
import { Solicitacao, StatusSolicitacao } from '../../../../core/models/solicitacao.model';
import { NotificacaoService } from '../../../../core/notificacao/notificacao.service';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { ConfirmacaoService } from '../../../../shared/components/confirmacao.service';
import { ItensSolicitacaoComponent } from '../../../../shared/components/itens-solicitacao.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge.component';
import { ListaEsperaDialogComponent } from '../components/lista-espera-dialog.component';
import { ValidacaoApi } from '../data/validacao.api';

interface AbaDaFila {
  status: StatusSolicitacao;
  rotulo: string;
  podeAprovar: boolean;
  podeEnviarParaEspera: boolean;
}

@Component({
  selector: 'app-validacao',
  imports: [
    DatePipe,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressBarModule,
    CabecalhoPaginaComponent,
    ItensSolicitacaoComponent,
    StatusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './validacao.page.html',
  styleUrl: './validacao.page.css',
})
export default class ValidacaoPage implements OnInit {
  private readonly api = inject(ValidacaoApi);
  private readonly dialog = inject(MatDialog);
  private readonly confirmacao = inject(ConfirmacaoService);
  private readonly notificacao = inject(NotificacaoService);

  readonly abas: AbaDaFila[] = [
    { status: 'AGUARDANDO', rotulo: 'Aguardando', podeAprovar: true, podeEnviarParaEspera: true },
    { status: 'LISTA_ESPERA', rotulo: 'Lista de espera', podeAprovar: true, podeEnviarParaEspera: false },
    { status: 'EM_ANALISE', rotulo: 'Em análise', podeAprovar: false, podeEnviarParaEspera: false },
  ];
  readonly tamanho = 10;
  readonly abaAtual = signal(0);
  readonly indice = signal(0);
  readonly pagina = signal<Pagina<Solicitacao> | null>(null);
  readonly carregando = signal(false);
  readonly aba = computed(() => this.abas[this.abaAtual()]);

  ngOnInit(): void {
    this.carregar();
  }

  trocarAba(indice: number): void {
    this.abaAtual.set(indice);
    this.indice.set(0);
    this.carregar();
  }

  mudarPagina(evento: PageEvent): void {
    this.indice.set(evento.pageIndex);
    this.carregar();
  }

  posicao(indiceNaPagina: number): number {
    return this.indice() * this.tamanho + indiceNaPagina + 1;
  }

  aprovar(solicitacao: Solicitacao): void {
    this.executar(
      this.confirmacao
        .confirmar({
          titulo: 'Aprovar solicitação',
          mensagem: `Aprovar a solicitação de ${solicitacao.discenteNome}? O status passará para "Em análise".`,
          confirmar: 'Aprovar',
        })
        .pipe(
          filter(Boolean),
          switchMap(() => this.api.aprovar(solicitacao.id)),
        ),
      'Solicitação aprovada: status Em análise',
    );
  }

  enviarParaListaDeEspera(solicitacao: Solicitacao): void {
    this.executar(
      this.dialog
        .open(ListaEsperaDialogComponent, { data: solicitacao.discenteNome, width: '480px' })
        .afterClosed()
        .pipe(
          filter((resultado): resultado is { observacao: string | null } => !!resultado),
          switchMap((resultado) => this.api.enviarParaListaDeEspera(solicitacao.id, resultado.observacao)),
        ),
      'Solicitação enviada para a lista de espera',
    );
  }

  private executar(operacao: Observable<Solicitacao>, mensagem: string): void {
    operacao.subscribe(() => {
      this.notificacao.sucesso(mensagem);
      this.carregar();
    });
  }

  private carregar(): void {
    this.carregando.set(true);
    this.api
      .fila(this.aba().status, this.indice(), this.tamanho)
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((pagina) => this.pagina.set(pagina));
  }
}
