import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PessoaDoRelatorio } from '../../core/models/relatorio.model';
import { RotuloPipe } from '../pipes/rotulo.pipe';

@Component({
  selector: 'app-pessoas-relatorio',
  imports: [DatePipe, RotuloPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './relatorio.css',
  template: `
    @if (pessoas().length) {
      <div class="tabela-container-relatorio">
        <table class="tabela-relatorio">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nome completo</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>{{ rotuloVinculo() }}</th>
              <th>Cadastro</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            @for (pessoa of pessoas(); track pessoa.id) {
              <tr>
                <td>{{ pessoa.matricula }}</td>
                <td>{{ pessoa.nomeCompleto }}</td>
                <td>{{ pessoa.email }}</td>
                <td>{{ pessoa.telefone }}</td>
                <td>{{ pessoa.vinculo }}</td>
                <td>{{ pessoa.dataCadastro | date: 'dd/MM/yyyy' }}</td>
                <td>{{ pessoa.status | rotulo }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    } @else {
      <p class="dica">{{ vazio() }}</p>
    }
  `,
})
export class PessoasRelatorioComponent {
  readonly pessoas = input.required<PessoaDoRelatorio[]>();
  readonly rotuloVinculo = input('Vínculo');
  readonly vazio = input('Nenhum registro.');
}
