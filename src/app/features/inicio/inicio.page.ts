import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { montarMenu } from '../../core/layout/menu';
import { CabecalhoPaginaComponent } from '../../shared/components/cabecalho-pagina.component';

@Component({
  selector: 'app-inicio',
  imports: [MatCardModule, MatIconModule, RouterLink, CabecalhoPaginaComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-cabecalho-pagina [titulo]="'Olá, ' + auth.login()" subtitulo="Escolha uma funcionalidade para começar" />
    <div class="grade">
      @for (item of itens(); track item.rota) {
        <a mat-card class="atalho" [routerLink]="item.rota">
          <mat-icon>{{ item.icone }}</mat-icon>
          <span>{{ item.rotulo }}</span>
        </a>
      }
    </div>
  `,
  styles: `
    .grade {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    .atalho {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      padding: 20px;
      text-decoration: none;
      color: inherit;
    }
  `,
})
export default class InicioPage {
  protected readonly auth = inject(AuthService);
  protected readonly itens = computed(() => montarMenu(this.auth.perfis()).flatMap((secao) => secao.itens));
}
