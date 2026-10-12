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
import { CentroAcademicoApi } from '../data/centro-academico.api';
import { CentroAcademico, CentroAcademicoRequest } from '../data/centro-academico.model';

@Component({
  selector: 'app-centro-academico-form',
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
  templateUrl: './centro-academico-form.page.html',
})
export default class CentroAcademicoFormPage extends FormularioBase<CentroAcademico, CentroAcademicoRequest> {
  private readonly api = inject(CentroAcademicoApi);

  protected readonly rotaLista = '/admin/centros-academicos';
  protected readonly nomeRegistro = 'Centro acadêmico';

  readonly opcoesIes = toSignal(inject(OpcoesApi).ies(), { initialValue: [] });
  readonly form = inject(FormBuilder).group({
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    emailCentral: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    telefoneCentral: ['', [Validators.required, Validators.maxLength(20)]],
    coordenador: ['', [Validators.required, Validators.maxLength(150)]],
    iesId: [null as number | null, Validators.required],
  });

  protected carregar(id: number) {
    return this.api.buscar(id);
  }

  protected preencher(ca: CentroAcademico): void {
    this.form.patchValue(ca);
  }

  protected montarRequisicao(): CentroAcademicoRequest {
    const valor = this.form.getRawValue();
    return {
      nome: valor.nome ?? '',
      emailCentral: valor.emailCentral ?? '',
      telefoneCentral: valor.telefoneCentral ?? '',
      coordenador: valor.coordenador ?? '',
      iesId: valor.iesId,
    };
  }

  protected criar(dados: CentroAcademicoRequest) {
    return this.api.cadastrar(dados);
  }

  protected atualizar(id: number, dados: CentroAcademicoRequest) {
    return this.api.editar(id, dados);
  }
}
