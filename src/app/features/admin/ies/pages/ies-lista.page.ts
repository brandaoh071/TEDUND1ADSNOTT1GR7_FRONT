import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { ParametrosLista } from '../../../../core/models/pagina.model';
import { ListaBase } from '../../../../shared/base/lista-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge.component';
import { IesApi } from '../data/ies.api';
import { Ies } from '../data/ies.model';

@Component({
  selector: 'app-ies-lista',
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
  templateUrl: './ies-lista.page.html',
})
export default class IesListaPage extends ListaBase<Ies> {
  private readonly api = inject(IesApi);

  readonly colunas = ['sigla', 'nome', 'reitor', 'proReitorias', 'dataCadastro', 'status', 'acoes'];
  readonly busca = signal('');
  readonly status = signal('');

  protected buscarPagina(parametros: ParametrosLista) {
    return this.api.listar({ ...parametros, sort: 'sigla', busca: this.busca(), status: this.status() });
  }

  protected descrever(ies: Ies): string {
    return `a IES ${ies.sigla}`;
  }

  protected inativarItem(ies: Ies) {
    return this.api.inativar(ies.id);
  }

  protected reativarItem(ies: Ies) {
    return this.api.reativar(ies.id);
  }
}
