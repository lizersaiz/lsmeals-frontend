import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class InputValidatorService {

  isEmpty(value: any){
      /*
      if(typeof value === "string"){
          if (value === ""){
              return true;
          }
      }
      else  if(typeof value === "number"){
          if (value === un)
      }
      else  if(typeof value === "boolean"){

      }
      */
      if (value === undefined){
          return true;
      }
      return false;
  }

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
}
