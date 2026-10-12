import { Pipe, PipeTransform } from '@angular/core';
import { ROTULOS } from './rotulos';

@Pipe({ name: 'rotulo' })
export class RotuloPipe implements PipeTransform {
  transform(valor: string | string[] | null | undefined): string {
    if (valor === null || valor === undefined) {
      return '';
    }
    const valores = Array.isArray(valor) ? valor : [valor];
    return valores.map((v) => ROTULOS[v] ?? v).join(', ');
  }
}
