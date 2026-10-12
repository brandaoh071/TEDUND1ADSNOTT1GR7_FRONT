import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormularioBase } from '../../../../shared/base/formulario-base';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { IesApi } from '../data/ies.api';
import { Ies, IesRequest, ProReitoria } from '../data/ies.model';

type GrupoProReitoria = FormGroup<{ nome: FormControl<string>; nomeado: FormControl<string> }>;

@Component({
  selector: 'app-ies-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CabecalhoPaginaComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ies-form.page.html',
})
export default class IesFormPage extends FormularioBase<Ies, IesRequest> {
  private readonly api = inject(IesApi);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly rotaLista = '/admin/ies';
  protected readonly nomeRegistro = 'IES';

  readonly form = this.fb.group({
    sigla: ['', [Validators.required, Validators.maxLength(20)]],
    nome: ['', [Validators.required, Validators.maxLength(150)]],
    emailCentral: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
    telefoneCentral: ['', [Validators.required, Validators.maxLength(20)]],
    reitor: ['', [Validators.required, Validators.maxLength(150)]],
    proReitorias: this.fb.array<GrupoProReitoria>([]),
  });

  get proReitorias(): FormArray<GrupoProReitoria> {
    return this.form.controls.proReitorias;
  }

  adicionarProReitoria(dados?: ProReitoria): void {
    this.form.controls.proReitorias.push(this.novaProReitoria(dados));
  }

  removerProReitoria(indice: number): void {
    this.form.controls.proReitorias.removeAt(indice);
  }

  protected carregar(id: number) {
    return this.api.buscar(id);
  }

  protected preencher(ies: Ies): void {
    this.form.patchValue(ies);
    this.form.controls.proReitorias.clear();
    ies.proReitorias.forEach((p) => this.adicionarProReitoria(p));
  }

  protected montarRequisicao(): IesRequest {
    return this.form.getRawValue();
  }

  protected criar(dados: IesRequest) {
    return this.api.cadastrar(dados);
  }

  protected atualizar(id: number, dados: IesRequest) {
    return this.api.editar(id, dados);
  }

  private novaProReitoria(dados?: ProReitoria): GrupoProReitoria {
    return this.fb.group({
      nome: [dados?.nome ?? '', [Validators.required, Validators.maxLength(150)]],
      nomeado: [dados?.nomeado ?? '', [Validators.required, Validators.maxLength(150)]],
    });
  }
}
