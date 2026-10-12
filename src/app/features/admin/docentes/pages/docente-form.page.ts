import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
import { DocenteApi } from '../data/docente.api';
import { Docente, DocenteRequest } from '../data/docente.model';

@Component({
  selector: 'app-docente-form',
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
  templateUrl: './docente-form.page.html',
})
export default class DocenteFormPage extends FormularioBase<Docente, DocenteRequest> implements OnInit {
  private readonly api = inject(DocenteApi);

  protected readonly rotaLista = '/admin/docentes';
  protected readonly nomeRegistro = 'Docente';

  readonly opcoesCentros = toSignal(inject(OpcoesApi).centrosAcademicos(), { initialValue: [] });
  readonly form = inject(FormBuilder).group({
    matricula: ['', [Validators.required, Validators.maxLength(30)]],
    nomeCompleto: ['', [Validators.required, Validators.maxLength(150)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    telefone: ['', [Validators.required, Validators.maxLength(20)]],
    centroAcademicoId: [null as number | null, Validators.required],
    senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]],
  });

  override ngOnInit(): void {
    if (this.editando) {
      this.form.controls.matricula.disable();
      this.form.controls.senha.clearValidators();
      this.form.controls.senha.disable();
    }
    super.ngOnInit();
  }

  protected carregar(id: number) {
    return this.api.buscar(id);
  }

  protected preencher(docente: Docente): void {
    this.form.patchValue(docente);
  }

  protected montarRequisicao(): DocenteRequest {
    const valor = this.form.getRawValue();
    return {
      matricula: valor.matricula ?? '',
      nomeCompleto: valor.nomeCompleto ?? '',
      email: valor.email ?? '',
      telefone: valor.telefone ?? '',
      centroAcademicoId: valor.centroAcademicoId,
      senha: this.editando ? null : valor.senha,
    };
  }

  protected criar(dados: DocenteRequest) {
    return this.api.cadastrar(dados);
  }

  protected atualizar(id: number, dados: DocenteRequest) {
    return this.api.editar(id, dados);
  }
}
