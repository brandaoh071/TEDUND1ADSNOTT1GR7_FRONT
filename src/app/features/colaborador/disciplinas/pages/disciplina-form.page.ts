import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { OpcoesApi } from '../../../../core/data/opcoes.api';
import { FormularioBase } from '../../../../shared/base/formulario-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { DisciplinaApi } from '../data/disciplina.api';
import { Disciplina, DisciplinaRequest } from '../data/disciplina.model';

@Component({
  selector: 'app-disciplina-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CabecalhoPaginaComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './disciplina-form.page.html',
})
export default class DisciplinaFormPage extends FormularioBase<Disciplina, DisciplinaRequest> {
  private readonly api = inject(DisciplinaApi);
  private readonly opcoes = inject(OpcoesApi);

  protected readonly rotaLista = '/colaborador/disciplinas';
  protected readonly nomeRegistro = 'Disciplina';

  readonly administrador = inject(AuthService).possuiAlgum(['ADMIN']);
  readonly opcoesCursos = toSignal(this.opcoes.cursos(), { initialValue: [] });
  readonly opcoesDocentes = toSignal(this.administrador ? this.opcoes.docentes() : of([]), { initialValue: [] });
  readonly form = inject(FormBuilder).group({
    sigla: ['', [Validators.required, Validators.maxLength(20)]],
    descricao: ['', [Validators.required, Validators.maxLength(150)]],
    cursoId: [null as number | null, Validators.required],
    cargaHoraria: [null as number | null, [Validators.required, Validators.min(1), Validators.max(1000)]],
    docenteId: [null as number | null],
  });

  protected carregar(id: number) {
    return this.api.buscar(id);
  }

  protected preencher(disciplina: Disciplina): void {
    this.form.patchValue(disciplina);
  }

  protected montarRequisicao(): DisciplinaRequest {
    const valor = this.form.getRawValue();
    return {
      sigla: valor.sigla ?? '',
      descricao: valor.descricao ?? '',
      cursoId: valor.cursoId,
      cargaHoraria: valor.cargaHoraria,
      docenteId: this.administrador ? valor.docenteId : null,
    };
  }

  protected criar(dados: DisciplinaRequest) {
    return this.api.cadastrar(dados);
  }

  protected atualizar(id: number, dados: DisciplinaRequest) {
    return this.api.editar(id, dados);
  }
}
