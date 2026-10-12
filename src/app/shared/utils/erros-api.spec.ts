import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { aplicarErrosDaApi } from './erros-api';

describe('aplicarErrosDaApi', () => {
  it('marca no formulário os campos devolvidos pela API', () => {
    const form = new FormGroup({ sigla: new FormControl('x') });
    const erro = new HttpErrorResponse({
      status: 400,
      error: { errors: [{ campo: 'sigla', mensagem: 'não deve estar em branco' }] },
    });
    aplicarErrosDaApi(form, erro);
    expect(form.controls.sigla.errors?.['api']).toBe('não deve estar em branco');
  });

  it('ignora erros que não são de validação', () => {
    const form = new FormGroup({ sigla: new FormControl('x') });
    aplicarErrosDaApi(form, new HttpErrorResponse({ status: 422, error: {} }));
    expect(form.valid).toBe(true);
  });
});
