import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-cabecalho-pagina',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cabecalho">
      <div>
        <h1>{{ titulo() }}</h1>
        @if (subtitulo()) {
          <p>{{ subtitulo() }}</p>
        }
      </div>
      <div class="acoes"><ng-content /></div>
    </div>
  `,
  styles: `
    .cabecalho {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 500;
    }
    p {
      margin: 4px 0 0;
      opacity: 0.7;
    }
    .acoes {
      display: flex;
      gap: 8px;
    }
  `,
})
export class CabecalhoPaginaComponent {
  readonly titulo = input.required<string>();
  readonly subtitulo = input<string>();
}
