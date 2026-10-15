import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SolicitacaoDoRelatorio } from '../../core/models/relatorio.model';
import { RotuloPipe } from '../pipes/rotulo.pipe';

@Component({
  selector: 'app-solicitacoes-relatorio',
  imports: [DatePipe, RotuloPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './relatorio.css',
  template: `
    @for (solicitacao of solicitacoes(); track solicitacao.id) {
      <div class="bloco">
        <h4>
          Solicitação nº {{ solicitacao.id }} · semestre {{ solicitacao.semestreReferencia }} ·
          {{ solicitacao.status | rotulo }}
        </h4>
        <dl class="ficha">
          @if (exibirDiscente()) {
            <div>
              <dt>Discente</dt>
              <dd>{{ solicitacao.discenteNome }} ({{ solicitacao.discenteMatricula }})</dd>
            </div>
          }
          <div>
            <dt>Enviada em</dt>
            <dd>{{ solicitacao.dataSolicitacao | date: 'dd/MM/yyyy HH:mm' }}</dd>
          </div>
          <div>
            <dt>Validação</dt>
            <dd>
              @if (solicitacao.dataValidacao) {
                {{ solicitacao.validadoPor }} em
                {{ solicitacao.dataValidacao | date: 'dd/MM/yyyy HH:mm' }}
              } @else {
                Pendente
              }
            </dd>
          </div>
          @if (solicitacao.observacao) {
            <div>
              <dt>Observação</dt>
              <dd>{{ solicitacao.observacao }}</dd>
            </div>
          }
        </dl>
        <table class="tabela-relatorio">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Descrição</th>
              <th>Carga horária</th>
              <th>Prioridade</th>
            </tr>
          </thead>
          <tbody>
            @for (item of solicitacao.itens; track $index) {
              <tr>
                <td>{{ item.sigla ?? '-' }}</td>
                <td>{{ item.descricao ?? '-' }}</td>
                <td>{{ item.cargaHoraria ? item.cargaHoraria + 'h' : '-' }}</td>
                <td>{{ item.prioridade }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @empty {
      <p class="dica">{{ vazio() }}</p>
    }
  `,
})
export class SolicitacoesRelatorioComponent {
  readonly solicitacoes = input.required<SolicitacaoDoRelatorio[]>();
  readonly exibirDiscente = input(false);
  readonly vazio = input('Nenhuma solicitação.');
}
