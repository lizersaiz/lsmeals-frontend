import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormValidatorService } from 'src/app/services/forms/form-validator.service';
import { CustomerWriteComponent } from '../customer-write/customer-write.component';

@Component({
  selector: 'app-customer-create',
  templateUrl: '../customer-write/customer-write.component.html',
  styleUrls: ['../customer-write/customer-write.component.css']
})
export class CustomerCreateComponent extends CustomerWriteComponent implements OnInit {


  constructor(public customerService: CustomerService,
              public formValidatorService: FormValidatorService){

    super(customerService, formValidatorService);

    this.operation = "Create"
  }

  ngOnInit(){
  }

  /**
   * Inherits for performing customer create operation,
   * if successful will clean the form and give success message
   */
  writeCustomer(){

    let customer = super.writeCustomer();
    if ( customer ){

      let response: any;
      this.customerService.createCustomerHttp(customer).subscribe(
        data => {
          response = data;
        },
        error => console.log(error),
        () => {
          this.cleanForm();
          this.customerService.displayInfoBar("success", "createCustomer");
        }
      );

      return customer;
    }
  }

  /**
   * Cleans all the controls in the form
   */
  private cleanForm() {

    this.submitEventFired = false;

    this.firstName.setValue("");
    this.firstName.markAsPristine();
    this.firstName.markAsUntouched();

    this.lastName.setValue("");
    this.lastName.markAsPristine();
    this.lastName.markAsUntouched();

    this.phone.setValue("");
    this.phone.markAsPristine();
    this.phone.markAsUntouched();

    this.email.setValue("");
    this.email.markAsPristine();
    this.email.markAsUntouched();

    this.password.setValue("");
    this.password.markAsPristine();
    this.password.markAsUntouched();

    this.repeatPassword.setValue("");
    this.repeatPassword.markAsPristine();
    this.repeatPassword.markAsUntouched();
  }
}
