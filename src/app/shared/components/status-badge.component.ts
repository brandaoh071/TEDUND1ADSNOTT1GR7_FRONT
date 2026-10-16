import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RotuloPipe } from '../pipes/rotulo.pipe';

@Component({
  selector: 'app-status-badge',
  imports: [RotuloPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge" [class]="'badge ' + status().toLowerCase()">{{ status() | rotulo }}</span>`,
  styles: `
    .badge {
      display: inline-block;
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
      background: var(--ted-neutro-fundo);
      color: var(--ted-neutro-texto);
    }
    .ativo,
    .matriculada {
      background: var(--ted-sucesso-fundo);
      color: var(--ted-sucesso-texto);
    }
    .aguardando {
      background: var(--ted-info-fundo);
      color: var(--ted-info-texto);
    }
    .lista_espera {
      background: var(--ted-alerta-fundo);
      color: var(--ted-alerta-texto);
    }
  `,
})
export class StatusBadgeComponent {
  readonly status = input.required<string>();
}
