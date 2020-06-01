import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormValidatorService {

  equalityValidator(formGroup: FormGroup){

    let password = formGroup.get('password').value;
    let repeatPassword = formGroup.get('repeatPassword').value;

    return password === repeatPassword ?  null : {'equal': {value: true}};
  }

  /**
   * validator function for a control
    equalityValidator(equalityTarget: AbstractControl): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} | null => {
        const equal = (control.value !== equalityTarget.value);
        return equal ? {'equal': {value: true}} : null;
      };
    }
  */

  /**
   * Get validation result from the property that belongs to the form
   * @param property the form´s property
   * @param error the validator
   * @param onSubmit true if the validation is to be done on submit, false otherwise
   * @param submitEventFired tells wether the form has been submited
   */
  validate(property: AbstractControl, error: string, submitEventFired: boolean, onSubmit?: boolean){

    // property.invalid --> generic validator for all validation : true / false
    // no errors, we are OK
    if (property.errors !== null){

      // get the error we are checking, property.errors prioritises required
      // so if it is still required, it will return undefined
      let thisError = property.errors[error];
      if (thisError){

        // display error if user jumps to another input IF we want to check it not on submit (allways) OR
        // display error if the submit buttom was pressed
        if ((property.dirty || property.touched) && !onSubmit ||
          (submitEventFired)){
          return true;
        }
      }
    }
    return false;
  }
}
