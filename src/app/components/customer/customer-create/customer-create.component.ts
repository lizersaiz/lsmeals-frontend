import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/common/customer';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { InputValidatorService } from 'src/app/services/input-validator-service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerValidationForm: FormGroup;
  get firstName() { return this.customerValidationForm.get('firstName'); }
  get lastName() { return this.customerValidationForm.get('lastName'); }
  get phone() { return this.customerValidationForm.get('phone'); }
  get email() { return this.customerValidationForm.get('email'); }

  get passwordControl() { return this.customerValidationForm.controls['passwordGroup'] }
  get password() { return this.passwordControl.get('password') }
  // retrieved from child component
  passwordIsValid: boolean;
  // warning label for password
  passwordTipIsEnabled: boolean;
  get repeatPassword() { return this.passwordControl.get('repeatPassword') }


  createEventFired: boolean = false;


  constructor(private customerService: CustomerService,
              private inputValidator: InputValidatorService) { }

  ngOnInit(): void {

    // asign a FormGroup with a FormControl element
    // FormControl consists of a key, a default value and a validator
    //
    // * FormGroups with their FormControl elements can be nested within each other

    this.customerValidationForm = new FormGroup({
      'firstName': new FormControl("", Validators.required),
      'lastName': new FormControl("", Validators.required),
      'email': new FormControl("", [Validators.required, Validators.email]),
      'phone': new FormControl(""),
      'passwordGroup': new FormGroup({
        'password': new FormControl("", Validators.required),
        'repeatPassword': new FormControl(""),
      }, this.inputValidator.equalityValidator )
    });
    /*
    this.customerValidationForm.addControl(
      'repeatPassword', new FormControl("", this.inputValidator.equalityValidator(this.password))
    );
    /* FORM BUILDER
    this.passwordForm = this.formBuilder.group({
      password: ["", Validators.required],
      address: this.formBuilder.group({
        city: ["", Validators.required],
        zip: ["", Validators.required],
      })
    });

      FROM INSTANCES
    this.passwordForm = new FromGroup({
      password: new FormControl(""),
      address: new FormGroup({
        city: new FormControl(""),
        zip: new FormControl("")
      })
    })
    */
  }

  /**
   * get validation result from the property that belongs to the form
   * @param property the form´s property
   * @param error the validator
   * @param onSubmit true if the validation is to be done on submit, false otherwise
   */
  validate(property: AbstractControl, error: string, onSubmit?: boolean){

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
          (this.createEventFired)){
          return true;
        }
      }
    }
    return false;
  }

  createCustomer(){

    // flag: submit buttom pressed
    this.createEventFired = true;

    if (this.customerValidationForm.valid && this.passwordIsValid){
      let customer = new Customer(this.firstName.value,
                                  this.lastName.value,
                                  this.email.value,
                                  this.phone.value,
                                  this.password.value);
      this.customerService.createCustomerHttp(customer);
      this.cleanForm();
    }
  }

  private cleanForm() {

    this.firstName.setValue("");
    this.lastName.setValue("");
    this.phone.setValue("");
    this.email.setValue("");
    this.password.setValue("");
    this.repeatPassword.setValue("");
  }

  // get the event emited by child component
  passwordValid(event: any){

    this.passwordIsValid = event;
  }

  // displays error when password not matching AFTER pressing submit button
  passwordNotMatchingEnabled(){

    if (this.passwordControl.invalid && this.createEventFired){
      return true;
    }
  }

  // mouse over event handler
  passwordTipEnabled(value: boolean){

    this.passwordTipIsEnabled = value;
  }
}
