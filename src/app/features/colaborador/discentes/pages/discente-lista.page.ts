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
import { DiscenteApi } from '../data/discente.api';
import { Discente, MOTIVOS_INATIVACAO_DISCENTE } from '../data/discente.model';

@Component({
  selector: 'app-discente-lista',
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
  templateUrl: './discente-lista.page.html',
})
export default class DiscenteListaPage extends ListaPessoaBase<Discente> {
  private readonly api = inject(DiscenteApi);
  protected readonly apiDePessoa = this.api;
  protected readonly motivos = MOTIVOS_INATIVACAO_DISCENTE;

  readonly colunas = ['matricula', 'nomeCompleto', 'email', 'curso', 'dataCadastro', 'status', 'acoes'];
  readonly opcoesCursos = toSignal(inject(OpcoesApi).cursos(), { initialValue: [] });
  readonly busca = signal('');
  readonly status = signal('');
  readonly cursoId = signal<number | null>(null);

  protected buscarPagina(parametros: ParametrosLista) {
    return this.api.listar({
      ...parametros,
      sort: 'nomeCompleto',
      busca: this.busca(),
      status: this.status(),
      cursoId: this.cursoId(),
    });
  }
}
