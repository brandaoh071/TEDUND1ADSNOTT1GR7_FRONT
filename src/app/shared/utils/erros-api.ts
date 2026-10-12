import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { ProblemDetail } from '../../core/models/problem-detail.model';

export function aplicarErrosDaApi(form: FormGroup, erro: unknown): void {
  if (!(erro instanceof HttpErrorResponse) || erro.status !== 400) {
    return;
  }
  const problema = erro.error as ProblemDetail;
  problema?.errors?.forEach(({ campo, mensagem }) => {
    const controle = form.get(campo.split('[')[0]);
    if (controle) {
      controle.setErrors({ ...controle.errors, api: mensagem });
      controle.markAsTouched();
    }
  });
}
