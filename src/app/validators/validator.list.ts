import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidatorList(selectlistnoall: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value === selectlistnoall;
    return forbidden ? { selectlistnoall: { value: control.value } } : null;
  };
}