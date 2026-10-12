import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { OpcoesApi } from '../../../../core/data/opcoes.api';
import { FormularioBase } from '../../../../shared/base/formulario-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { RotuloPipe } from '../../../../shared/pipes/rotulo.pipe';
import { CursoApi } from '../data/curso.api';
import { Curso, CursoRequest, TURNOS, Turno } from '../data/curso.model';

@Component({
  selector: 'app-curso-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CabecalhoPaginaComponent,
    RotuloPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './curso-form.page.html',
})
export default class CursoFormPage extends FormularioBase<Curso, CursoRequest> {
  private readonly api = inject(CursoApi);

  protected readonly rotaLista = '/admin/cursos';
  protected readonly nomeRegistro = 'Curso';

  readonly turnos = TURNOS;
  readonly opcoesCentros = toSignal(inject(OpcoesApi).centrosAcademicos(), { initialValue: [] });
  readonly form = inject(FormBuilder).group({
    sigla: ['', [Validators.required, Validators.maxLength(20)]],
    descricao: ['', [Validators.required, Validators.maxLength(150)]],
    coordenador: ['', [Validators.required, Validators.maxLength(150)]],
    centroAcademicoId: [null as number | null, Validators.required],
    turnos: [[] as Turno[], Validators.required],
  });

  protected carregar(id: number) {
    return this.api.buscar(id);
  }

  protected preencher(curso: Curso): void {
    this.form.patchValue(curso);
  }

  protected montarRequisicao(): CursoRequest {
    const valor = this.form.getRawValue();
    return {
      sigla: valor.sigla ?? '',
      descricao: valor.descricao ?? '',
      coordenador: valor.coordenador ?? '',
      centroAcademicoId: valor.centroAcademicoId,
      turnos: valor.turnos ?? [],
    };
  }

  protected criar(dados: CursoRequest) {
    return this.api.cadastrar(dados);
  }

  protected atualizar(id: number, dados: CursoRequest) {
    return this.api.editar(id, dados);
  }
}
