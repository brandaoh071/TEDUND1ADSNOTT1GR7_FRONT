import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { Pagina } from '../../../../core/models/pagina.model';
import { CabecalhoPaginaComponent } from '../../../../shared/components/cabecalho-pagina.component';
import { RotuloPipe } from '../../../../shared/pipes/rotulo.pipe';
import { AuditoriaApi } from '../data/auditoria.api';
import { ACOES_AUDITADAS, ENTIDADES_AUDITADAS, LogAuditoria } from '../data/auditoria.model';

@Component({
  selector: 'app-auditoria',
  imports: [
    FormsModule,
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    CabecalhoPaginaComponent,
    RotuloPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auditoria.page.html',
})
export default class AuditoriaPage implements OnInit {
  private readonly api = inject(AuditoriaApi);

  readonly colunas = ['dataHora', 'usuario', 'perfis', 'acao', 'entidade', 'idRegistro', 'detalhes'];
  readonly acoes = ACOES_AUDITADAS;
  readonly entidades = ENTIDADES_AUDITADAS;
  readonly pagina = signal<Pagina<LogAuditoria> | null>(null);
  readonly carregando = signal(false);
  readonly indice = signal(0);
  readonly tamanho = signal(20);
  readonly usuario = signal('');
  readonly acao = signal('');
  readonly entidade = signal('');
  readonly de = signal('');
  readonly ate = signal('');

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando.set(true);
    this.api
      .listar({
        page: this.indice(),
        size: this.tamanho(),
        usuario: this.usuario(),
        acao: this.acao(),
        entidade: this.entidade(),
        de: this.paraUtc(this.de(), '00:00:00'),
        ate: this.paraUtc(this.ate(), '23:59:59'),
      })
      .pipe(finalize(() => this.carregando.set(false)))
      .subscribe((pagina) => this.pagina.set(pagina));
  }

  filtrar(): void {
    this.indice.set(0);
    this.carregar();
  }

  mudarPagina(evento: PageEvent): void {
    this.indice.set(evento.pageIndex);
    this.tamanho.set(evento.pageSize);
    this.carregar();
  }

  private paraUtc(data: string, hora: string): string | null {
    return data ? new Date(`${data}T${hora}-03:00`).toISOString() : null;
  }
}
