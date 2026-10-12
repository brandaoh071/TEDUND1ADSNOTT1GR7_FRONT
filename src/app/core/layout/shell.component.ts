import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RotuloPipe } from '../../shared/pipes/rotulo.pipe';
import { montarMenu } from './menu';

@Component({
  selector: 'app-shell',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RotuloPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export default class ShellComponent {
  protected readonly auth = inject(AuthService);
  protected readonly secoes = computed(() => montarMenu(this.auth.perfis()));
  protected readonly celular = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 800px)')
      .pipe(map((estado) => estado.matches)),
    { initialValue: false },
  );
}
