import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { finalize } from 'rxjs';
import { RelatorioApi } from '../../../../core/data/relatorio.api';
import { Status } from '../../../../core/models/dominio.model';
import { RelatorioDocentes, RelatorioEstrutura } from '../../../../core/models/relatorio.model';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { RotuloPipe } from '../../../../shared/pipes/rotulo.pipe';
import { EmissaoRelatorioComponent } from '../../../../shared/relatorio/emissao-relatorio.component';
import { PessoasRelatorioComponent } from '../../../../shared/relatorio/pessoas-relatorio.component';

@Component({
  selector: 'app-relatorios-admin',
  imports: [
    FormsModule,
    DatePipe,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    CabecalhoPaginaComponent,
    EmissaoRelatorioComponent,
    PessoasRelatorioComponent,
    RotuloPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './relatorios-admin.page.html',
  styleUrl: '../../../../shared/relatorio/relatorio.css',
})
export default class RelatoriosAdminPage {
  private readonly api = inject(RelatorioApi);

  readonly carregando = signal(false);
  readonly filtroStatus = signal<Status | ''>('');
  readonly estrutura = signal<RelatorioEstrutura | null>(null);
  readonly docentes = signal<RelatorioDocentes | null>(null);

  emitirEstrutura(): void {
    this.carregando.set(true);
    this.api
      .estrutura()
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((relatorio) => {
        this.docentes.set(null);
        this.estrutura.set(relatorio);
      });
  }

  emitirDocentes(): void {
    this.carregando.set(true);
    this.api
      .docentes(this.filtroStatus() || null)
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((relatorio) => {
        this.estrutura.set(null);
        this.docentes.set(relatorio);
      });
  }

  imprimir(): void {
    window.print();
  }
}
