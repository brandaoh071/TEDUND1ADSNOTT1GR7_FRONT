import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProblemDetail } from '../../../../core/models/problem-detail.model';
import { NotificacaoService } from '../../../../core/notificacao/notificacao.service';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { SolicitacaoDiscenteApi } from '../data/solicitacao-discente.api';
import { DisciplinaOfertada, ItemEscolhido, SemestreDaSolicitacao } from '../data/solicitacao-discente.model';
import {
  LIMITE_PRIORIDADE_MAXIMA,
  MAXIMO_DISCIPLINAS,
  PRIORIDADES,
  PRIORIDADE_MAXIMA,
  verificarRegras,
} from '../regras/regras-solicitacao';

@Component({
  selector: 'app-nova-solicitacao',
  imports: [
    FormsModule,
    RouterLink,
    MatTableModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    CabecalhoPaginaComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nova-solicitacao.page.html',
  styleUrl: './nova-solicitacao.page.css',
})
export default class NovaSolicitacaoPage implements OnInit {
  private readonly api = inject(SolicitacaoDiscenteApi);
  private readonly router = inject(Router);
  private readonly notificacao = inject(NotificacaoService);

  readonly prioridades = PRIORIDADES;
  readonly maximoDisciplinas = MAXIMO_DISCIPLINAS;
  readonly prioridadeMaxima = PRIORIDADE_MAXIMA;
  readonly limitePrioridadeMaxima = LIMITE_PRIORIDADE_MAXIMA;
  readonly colunas = ['selecionar', 'sigla', 'descricao', 'curso', 'cargaHoraria', 'docente', 'prioridade'];

  readonly semestre = signal<SemestreDaSolicitacao | null>(null);
  readonly disciplinas = signal<DisciplinaOfertada[]>([]);
  readonly carregando = signal(true);
  readonly enviando = signal(false);
  readonly busca = signal('');
  readonly escolhas = signal<Map<number, number>>(new Map());
  readonly violacoesDaApi = signal<string[]>([]);

  readonly disciplinasFiltradas = computed(() => {
    const termo = this.busca().trim().toLowerCase();
    return termo
      ? this.disciplinas().filter((d) => `${d.sigla} ${d.descricao} ${d.cursoSigla}`.toLowerCase().includes(termo))
      : this.disciplinas();
  });
  readonly itens = computed<ItemEscolhido[]>(() =>
    [...this.escolhas()].map(([disciplinaId, prioridade]) => ({ disciplinaId, prioridade })),
  );
  readonly violacoes = computed(() => verificarRegras(this.itens()));
  readonly quantidadeMaximas = computed(() => this.itens().filter((i) => i.prioridade === PRIORIDADE_MAXIMA).length);
  readonly escolhidas = computed(() => {
    const porId = new Map(this.disciplinas().map((d) => [d.id, d]));
    return this.itens()
      .map((item) => ({ ...item, disciplina: porId.get(item.disciplinaId) }))
      .sort((a, b) => b.prioridade - a.prioridade);
  });

  ngOnInit(): void {
    this.api.semestre().subscribe((semestre) => this.semestre.set(semestre));
    this.api
      .disciplinasOfertadas()
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((pagina) => this.disciplinas.set(pagina.conteudo));
  }

  selecionada(id: number): boolean {
    return this.escolhas().has(id);
  }

  prioridadeDe(id: number): number | null {
    return this.escolhas().get(id) ?? null;
  }

  alternar(disciplina: DisciplinaOfertada, marcada: boolean): void {
    this.atualizar((escolhas) => (marcada ? escolhas.set(disciplina.id, 1) : escolhas.delete(disciplina.id)));
  }

  definirPrioridade(id: number, prioridade: number): void {
    this.atualizar((escolhas) => escolhas.set(id, prioridade));
  }

  enviar(): void {
    if (this.violacoes().length > 0) {
      return;
    }
    this.violacoesDaApi.set([]);
    this.enviando.set(true);
    this.api
      .enviar({ itens: this.itens() })
      .pipe(finalize(() => this.enviando.set(false)))
      .subscribe({
        next: () => {
          this.notificacao.sucesso('Solicitação enviada. Status: Aguardando validação.');
          this.router.navigate(['/discente/minhas-solicitacoes']);
        },
        error: (erro: HttpErrorResponse) => this.violacoesDaApi.set((erro.error as ProblemDetail & { violacoes?: string[] })?.violacoes ?? []),
      });
  }

  private atualizar(alteracao: (escolhas: Map<number, number>) => unknown): void {
    const copia = new Map(this.escolhas());
    alteracao(copia);
    this.escolhas.set(copia);
    this.violacoesDaApi.set([]);
  }
}
