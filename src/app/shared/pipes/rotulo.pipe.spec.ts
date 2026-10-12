import { RotuloPipe } from './rotulo.pipe';

describe('RotuloPipe', () => {
  const pipe = new RotuloPipe();

  it('traduz valores conhecidos', () => {
    expect(pipe.transform('SUSPENSAO_CONTRATUAL')).toBe('Suspensão contratual');
  });

  it('junta listas e mantém valores desconhecidos', () => {
    expect(pipe.transform(['NOTURNO', 'XYZ'])).toBe('Noturno, XYZ');
  });

  it('devolve vazio para nulo', () => {
    expect(pipe.transform(null)).toBe('');
  });
});
