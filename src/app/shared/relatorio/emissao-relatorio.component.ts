import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Emissao } from '../../core/models/relatorio.model';
import { RotuloPipe } from '../pipes/rotulo.pipe';

@Component({
  selector: 'app-emissao-relatorio',
  imports: [DatePipe, RotuloPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="emissao">
      <div>
        <h1>{{ emissao().titulo }}</h1>
        <p>Sistema de Controle de Solicitações de Disciplina</p>
      </div>
      <dl>
        <dt>Emitido por</dt>
        <dd>{{ emissao().nomeEmissor }} ({{ emissao().emitidoPor }})</dd>
        <dt>Perfil</dt>
        <dd>{{ emissao().perfilEmissor | rotulo }}</dd>
        <dt>Data de emissão</dt>
        <dd>{{ emissao().dataEmissao | date: 'dd/MM/yyyy HH:mm:ss' }}</dd>
        <dt>Nº da emissão</dt>
        <dd>{{ emissao().id }}</dd>
        @if (emissao().filtroStatus) {
          <dt>Filtro</dt>
          <dd>Somente {{ emissao().filtroStatus | rotulo }}</dd>
        }
      </dl>
    </header>
  `,
  styles: `
    .emissao {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 16px;
      border-bottom: 2px solid var(--ted-primaria);
      padding-bottom: 12px;
    }
    h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 500;
      color: var(--ted-primaria);
    }
    p {
      margin: 4px 0 0;
      opacity: 0.7;
    }
    dl {
      display: grid;
      grid-template-columns: auto auto;
      gap: 2px 12px;
      margin: 0;
      font-size: 13px;
    }
    dt {
      opacity: 0.7;
    }
    dd {
      margin: 0;
    }
  `,
})
export class EmissaoRelatorioComponent {
  readonly emissao = input.required<Emissao>();
}
