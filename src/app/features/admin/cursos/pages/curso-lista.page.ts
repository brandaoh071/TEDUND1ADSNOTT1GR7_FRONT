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
import { ListaBase } from '../../../../shared/base/lista-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge.component';
import { RotuloPipe } from '../../../../shared/pipes/rotulo.pipe';
import { CursoApi } from '../data/curso.api';
import { Curso } from '../data/curso.model';

@Component({
  selector: 'app-curso-lista',
  imports: [
    FormsModule,
    RouterLink,
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
    RotuloPipe,
    StatusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './curso-lista.page.html',
})
export default class CursoListaPage extends ListaBase<Curso> {
  private readonly api = inject(CursoApi);

  readonly colunas = ['sigla', 'descricao', 'centro', 'turnos', 'coordenador', 'status', 'acoes'];
  readonly opcoesCentros = toSignal(inject(OpcoesApi).centrosAcademicos(), { initialValue: [] });
  readonly busca = signal('');
  readonly status = signal('');
  readonly centroAcademicoId = signal<number | null>(null);

  protected buscarPagina(parametros: ParametrosLista) {
    return this.api.listar({
      ...parametros,
      sort: 'sigla',
      busca: this.busca(),
      status: this.status(),
      centroAcademicoId: this.centroAcademicoId(),
    });
  }

  protected descrever(curso: Curso): string {
    return `o curso ${curso.sigla}`;
  }

  protected inativarItem(curso: Curso) {
    return this.api.inativar(curso.id);
  }

  protected reativarItem(curso: Curso) {
    return this.api.reativar(curso.id);
  }
}
