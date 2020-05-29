import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/common/customer';
import { InputValidatorService } from 'src/app/services/input-validator-service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customer: Customer = new Customer("", "", "", "", "");

  constructor(private customerService: CustomerService,
              private inputValidatorService: InputValidatorService) { }

  ngOnInit(): void {

    this.populateCustomer();
  }

  populateCustomer(){

    this.customerService.updatingCustomer.subscribe(
      data => {
        this.customer = data;
        this.customer === undefined ? this.customerService.redirectToCreateCustomer() : true;
      }
    )
  }

  updateCustomer(){

    this.customerService.updateCustomerHttp(this.customer);
  }

  checkEmptyFields(): boolean{

    if(this.inputValidatorService.isEmpty(this.customer.firstName) ||
       this.inputValidatorService.isEmpty(this.customer.lastName) ||
       this.inputValidatorService.isEmpty(this.customer.email) ||
       this.inputValidatorService.isEmpty(this.customer.phone)){

      return false;
    }
    return true;
  }
}
