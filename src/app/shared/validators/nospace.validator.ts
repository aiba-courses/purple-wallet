import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nospaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value ?? '';
    const hasSpaces = /\s/.test(value);
    return hasSpaces ? { noSpaces: 'В тексте не может быть пробелов' } : null;
  };
}
