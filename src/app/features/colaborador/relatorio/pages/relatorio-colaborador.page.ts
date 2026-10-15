import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize } from 'rxjs';
import { RelatorioApi } from '../../../../core/data/relatorio.api';
import { RelatorioColaborador } from '../../../../core/models/relatorio.model';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { RotuloPipe } from '../../../../shared/pipes/rotulo.pipe';
import { EmissaoRelatorioComponent } from '../../../../shared/relatorio/emissao-relatorio.component';
import { PessoasRelatorioComponent } from '../../../../shared/relatorio/pessoas-relatorio.component';
import { SolicitacoesRelatorioComponent } from '../../../../shared/relatorio/solicitacoes-relatorio.component';

@Component({
  selector: 'app-relatorio-colaborador',
  imports: [
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    CabecalhoPaginaComponent,
    EmissaoRelatorioComponent,
    PessoasRelatorioComponent,
    SolicitacoesRelatorioComponent,
    RotuloPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './relatorio-colaborador.page.html',
  styleUrl: '../../../../shared/relatorio/relatorio.css',
})
export default class RelatorioColaboradorPage {
  private readonly api = inject(RelatorioApi);

  readonly carregando = signal(false);
  readonly relatorio = signal<RelatorioColaborador | null>(null);

  emitir(): void {
    this.carregando.set(true);
    this.api
      .colaborador()
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((relatorio) => this.relatorio.set(relatorio));
  }

  imprimir(): void {
    window.print();
  }
}
