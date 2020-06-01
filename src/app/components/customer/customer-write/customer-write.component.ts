import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { FormValidatorService } from 'src/app/services/forms/form-validator.service';
import { Customer } from 'src/app/common/customer';

@Component({
  selector: 'app-customer-write',
  templateUrl: './customer-write.component.html',
  styleUrls: ['./customer-write.component.css']
})
/**
 * Base component for Customer create and update operations.
 * Contains form controls and methods to handle them.
 */
export class CustomerWriteComponent implements OnInit {

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

  operation: string;

  submitEventFired: boolean = false;


  constructor(public customerService: CustomerService,
              public formValidatorService: FormValidatorService) {

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
      }, this.formValidatorService.equalityValidator )
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

  ngOnInit(): void { }

  /**
   * Get validation result from the property that belongs to the form, by calling FormValidatorService
   * @param property the form´s property
   * @param error the validator
   * @param onSubmit true if the validation is to be done on submit, false otherwise
   */
  validate(property: AbstractControl, error: string, onSubmit?: boolean){

    return this.formValidatorService.validate(property, error, this.submitEventFired, onSubmit);
  }

  /**
   * Will build a customer, based on form values
   */
  writeCustomer(){

    // flag: submit buttom pressed
    this.submitEventFired = true;

    if (this.customerValidationForm.valid && this.passwordIsValid){
    let customer = new Customer(this.firstName.value,
                                  this.lastName.value,
                                  this.email.value,
                                  this.phone.value,
                                  this.password.value);
      return customer;
    }
  }

  /**
   * Get the event emited by child component, password validator
   */
  passwordValid(event: any){

    this.passwordIsValid = event;
  }

  /**
   * Displays error when password not matching AFTER pressing submit button
   */
  passwordNotMatchingEnabled(){

    if (this.passwordControl.invalid && this.submitEventFired){
      return true;
    }
  }

  /**
   * Mouse over event handler
   */
  passwordTipEnabled(value: boolean){

    this.passwordTipIsEnabled = value;
  }
}
