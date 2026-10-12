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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { OpcoesApi } from '../../../../core/data/opcoes.api';
import { ParametrosLista } from '../../../../core/models/pagina.model';
import { ListaBase } from '../../../../shared/base/lista-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge.component';
import { DisciplinaApi } from '../data/disciplina.api';
import { Disciplina } from '../data/disciplina.model';

@Component({
  selector: 'app-disciplina-lista',
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
    MatSlideToggleModule,
    MatProgressBarModule,
    MatTooltipModule,
    CabecalhoPaginaComponent,
    StatusBadgeComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disciplina-lista.page.html',
})
export default class DisciplinaListaPage extends ListaBase<Disciplina> {
  private readonly api = inject(DisciplinaApi);
  private readonly auth = inject(AuthService);

  readonly colunas = ['sigla', 'descricao', 'curso', 'cargaHoraria', 'docente', 'status', 'acoes'];
  readonly opcoesCursos = toSignal(inject(OpcoesApi).cursos(), { initialValue: [] });
  readonly busca = signal('');
  readonly status = signal('');
  readonly cursoId = signal<number | null>(null);
  readonly minhas = signal(!this.auth.possuiAlgum(['ADMIN']));

  protected buscarPagina(parametros: ParametrosLista) {
    return this.api.listar({
      ...parametros,
      sort: 'sigla',
      busca: this.busca(),
      status: this.status(),
      cursoId: this.cursoId(),
      minhas: this.minhas(),
    });
  }

  protected descrever(disciplina: Disciplina): string {
    return `a disciplina ${disciplina.sigla}`;
  }

  protected inativarItem(disciplina: Disciplina) {
    return this.api.inativar(disciplina.id);
  }

  protected reativarItem(disciplina: Disciplina) {
    return this.api.reativar(disciplina.id);
  }
}
