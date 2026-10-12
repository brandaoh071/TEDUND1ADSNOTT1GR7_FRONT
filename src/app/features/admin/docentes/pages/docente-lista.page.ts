import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { OpcoesApi } from '../../../../core/data/opcoes.api';
import { ParametrosLista } from '../../../../core/models/pagina.model';
import { ListaPessoaBase } from '../../../../shared/base/lista-pessoa-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge.component';
import { DocenteApi } from '../data/docente.api';
import { Docente, MOTIVOS_INATIVACAO_DOCENTE } from '../data/docente.model';

@Component({
  selector: 'app-docente-lista',
  imports: [
    FormsModule,
    RouterLink,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatTooltipModule,
    CabecalhoPaginaComponent,
    StatusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docente-lista.page.html',
})
export default class DocenteListaPage extends ListaPessoaBase<Docente> {
  private readonly api = inject(DocenteApi);
  protected readonly apiDePessoa = this.api;
  protected readonly motivos = MOTIVOS_INATIVACAO_DOCENTE;

  readonly colunas = ['matricula', 'nomeCompleto', 'email', 'centro', 'dataCadastro', 'status', 'acoes'];
  readonly opcoesCentros = toSignal(inject(OpcoesApi).centrosAcademicos(), { initialValue: [] });
  readonly busca = signal('');
  readonly status = signal('');
  readonly centroAcademicoId = signal<number | null>(null);

  protected buscarPagina(parametros: ParametrosLista) {
    return this.api.listar({
      ...parametros,
      sort: 'nomeCompleto',
      busca: this.busca(),
      status: this.status(),
      centroAcademicoId: this.centroAcademicoId(),
    });
  }
}
