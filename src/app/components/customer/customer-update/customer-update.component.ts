import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/common/customer';
import { FormValidatorService } from 'src/app/services/forms/form-validator.service';
import { CustomerWriteComponent } from '../customer-write/customer-write.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-update',
  templateUrl: '../customer-write/customer-write.component.html',
  styleUrls: ['../customer-write/customer-write.component.css']
})
export class CustomerUpdateComponent extends CustomerWriteComponent implements OnInit {

  updatingCustomer: Customer;

  constructor(public customerService: CustomerService,
              public formValidatorService: FormValidatorService,
              private activatedRoute: ActivatedRoute){

    super(customerService, formValidatorService);

    this.operation = "Update";

  }

  ngOnInit(){

    this.getUpdatingCustomer();
  }

  /**
   * Gets the customer that is going to be updated by retrieving
   * its id from the url, and making Customer Service get it via http
   */
  private getUpdatingCustomer(){

    // obtain customer id from route param and get it via Http
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        let customerId = Number(params.get("customerId"));
        return this.customerService.getCustomerHttp(customerId);
      })
    // subscribe to it and initialise the form values
    ).subscribe(
      data => {
        this.updatingCustomer = data;
        this.initFormValues();
      }
    )
  }

  /**
   * Initialises the form values
   */
  private initFormValues(){

    this.firstName.setValue(this.updatingCustomer.firstName);
    this.lastName.setValue(this.updatingCustomer.lastName);
    this.updatingCustomer.phone !== undefined ? this.phone.setValue(this.updatingCustomer.phone) : this.phone.setValue("");
    this.email.setValue(this.updatingCustomer.email);
    this.password.setValue(this.updatingCustomer.userPass);
  }

  /**
   * Inherits for performing customer update operation,
   * if successful, will redirect to customer list component and
   * display a success message
   */
  writeCustomer(){

    // retrieve the customer built from form controls
    let customer = super.writeCustomer();
    if ( customer ){

      // update the customer
      this.updatingCustomer.firstName = customer.firstName;
      this.updatingCustomer.lastName = customer.lastName;
      this.updatingCustomer.email = customer.email;
      this.updatingCustomer.userPass = customer.userPass;

      // make the http request
      let response: any;
      this.customerService.updateCustomerHttp(this.updatingCustomer).subscribe(
        data => {
          response = data;
          this.customerService.displayInfoBar("success", "updateCustomer");
          this.customerService.navigate("customer/list");
        }
      );

      return customer;
    }
  }
}
