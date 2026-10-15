import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize } from 'rxjs';
import { RelatorioApi } from '../../../../core/data/relatorio.api';
import { RelatorioDiscente } from '../../../../core/models/relatorio.model';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { RotuloPipe } from '../../../../shared/pipes/rotulo.pipe';
import { EmissaoRelatorioComponent } from '../../../../shared/relatorio/emissao-relatorio.component';
import { SolicitacoesRelatorioComponent } from '../../../../shared/relatorio/solicitacoes-relatorio.component';

@Component({
  selector: 'app-relatorio-discente',
  imports: [
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    CabecalhoPaginaComponent,
    EmissaoRelatorioComponent,
    SolicitacoesRelatorioComponent,
    RotuloPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nao-imprimir">
      <app-cabecalho-pagina
        titulo="Meu relatório"
        subtitulo="RF018 · Seus dados cadastrais e suas solicitações"
      >
        <button mat-flat-button (click)="emitir()" [disabled]="carregando()">
          <mat-icon>description</mat-icon> Emitir relatório
        </button>
        @if (relatorio()) {
          <button mat-stroked-button (click)="imprimir()">
            <mat-icon>print</mat-icon> Imprimir / salvar PDF
          </button>
        }
      </app-cabecalho-pagina>
      @if (carregando()) {
        <mat-progress-bar mode="indeterminate" />
      }
    </div>

    @if (relatorio(); as relatorio) {
      <section class="relatorio">
        <app-emissao-relatorio [emissao]="relatorio.emissao" />
        <h2>Dados cadastrais</h2>
        <dl class="ficha">
          <div>
            <dt>Matrícula</dt>
            <dd>{{ relatorio.discente.matricula }}</dd>
          </div>
          <div>
            <dt>Nome completo</dt>
            <dd>{{ relatorio.discente.nomeCompleto }}</dd>
          </div>
          <div>
            <dt>E-mail</dt>
            <dd>{{ relatorio.discente.email }}</dd>
          </div>
          <div>
            <dt>Telefone</dt>
            <dd>{{ relatorio.discente.telefone }}</dd>
          </div>
          <div>
            <dt>Curso</dt>
            <dd>{{ relatorio.discente.vinculo }}</dd>
          </div>
          <div>
            <dt>Cadastro</dt>
            <dd>{{ relatorio.discente.dataCadastro | date: 'dd/MM/yyyy' }}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{{ relatorio.discente.status | rotulo }}</dd>
          </div>
        </dl>
        <h2>Solicitações ({{ relatorio.solicitacoes.length }})</h2>
        <app-solicitacoes-relatorio
          [solicitacoes]="relatorio.solicitacoes"
          vazio="Você ainda não fez solicitações."
        />
      </section>
    }
  `,
  styleUrl: '../../../../shared/relatorio/relatorio.css',
})
export default class RelatorioDiscentePage {
  private readonly api = inject(RelatorioApi);

  readonly carregando = signal(false);
  readonly relatorio = signal<RelatorioDiscente | null>(null);

  emitir(): void {
    this.carregando.set(true);
    this.api
      .discente()
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((relatorio) => this.relatorio.set(relatorio));
  }

  imprimir(): void {
    window.print();
  }
}
