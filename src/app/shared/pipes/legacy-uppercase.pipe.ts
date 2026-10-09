import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'legacyuppercase',
})
export class LegacyUppercasePipe implements PipeTransform {
  transform(
    value: string,
    type: 'uppercase' | 'titlecase' = 'uppercase'
  ): string {
    if (typeof value !== 'string') {
      return value;
    } else {
      return type === 'uppercase'
        ? value.toUpperCase()
        : value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
  }
}
