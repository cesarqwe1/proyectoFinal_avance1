import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTwodecimal'
})
export class FormatTwodecimalPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value == null || value === '') return '0.00';

    const num = typeof value === 'string' ? parseFloat(value) : value;
    return num.toFixed(2); // fuerza 2 decimales
  }

}
