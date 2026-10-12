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
import { ListaBase } from '../../../../shared/base/lista-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge.component';
import { CentroAcademicoApi } from '../data/centro-academico.api';
import { CentroAcademico } from '../data/centro-academico.model';

@Component({
  selector: 'app-centro-academico-lista',
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
  templateUrl: './centro-academico-lista.page.html',
})
export default class CentroAcademicoListaPage extends ListaBase<CentroAcademico> {
  private readonly api = inject(CentroAcademicoApi);

  readonly colunas = ['nome', 'ies', 'coordenador', 'emailCentral', 'dataCadastro', 'status', 'acoes'];
  readonly opcoesIes = toSignal(inject(OpcoesApi).ies(), { initialValue: [] });
  readonly busca = signal('');
  readonly status = signal('');
  readonly iesId = signal<number | null>(null);

  protected buscarPagina(parametros: ParametrosLista) {
    return this.api.listar({
      ...parametros,
      sort: 'nome',
      busca: this.busca(),
      status: this.status(),
      iesId: this.iesId(),
    });
  }

  protected descrever(ca: CentroAcademico): string {
    return `o centro acadêmico ${ca.nome}`;
  }

  protected inativarItem(ca: CentroAcademico) {
    return this.api.inativar(ca.id);
  }

  protected reativarItem(ca: CentroAcademico) {
    return this.api.reativar(ca.id);
  }
}
