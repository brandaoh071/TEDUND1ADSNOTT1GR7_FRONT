import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ItemSolicitacao } from '../../core/models/solicitacao.model';

@Component({
  selector: 'app-itens-solicitacao',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="itens">
      @for (item of itens(); track item.disciplinaId) {
        <li>
          <span class="prioridade" [class.maxima]="item.prioridade === 5" [title]="'Prioridade ' + item.prioridade">
            {{ item.prioridade }}
          </span>
          <span><strong>{{ item.sigla }}</strong> · {{ item.descricao }}</span>
          <span class="carga">{{ item.cargaHoraria }} h</span>
        </li>
      }
    </ul>
  `,
  styles: `
    .itens {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li {
      display: grid;
      grid-template-columns: 28px 1fr auto;
      gap: 8px;
      align-items: center;
      padding: 4px 0;
    }
    .prioridade {
      display: grid;
      place-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-size: 12px;
      font-weight: 500;
      background: var(--ted-neutro-fundo);
    }
    .prioridade.maxima {
      background: var(--ted-primaria);
      color: #fff;
    }
    .carga {
      opacity: 0.7;
      font-size: 13px;
    }
  `,
})
export class ItensSolicitacaoComponent {
  readonly itens = input.required<ItemSolicitacao[]>();
}
