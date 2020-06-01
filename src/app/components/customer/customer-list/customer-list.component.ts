import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ModalPopupComponent } from '../../miscelaneous/modal-popup/modal-popup.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @ViewChild(ModalPopupComponent) modalPopupComponent: ModalPopupComponent;

  customers: Customer[] = [];


  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {

    this.listCustomers();
  }

  /**
   * Get the customer list by calling customer service
  */
  listCustomers(){

    this.customerService.getCustomersHttpPaginate(true);
    this.customerService.listedCustomers.subscribe(
      data => {
        this.customers = data
      }
    )
  }

  /**
   * Ask customer service to route to update customer component
   * @param customerId The customer Id
   */
  updateCustomer(customerId: number){

    let url = `customer/update/${customerId}`
    this.customerService.navigate(url);
  }

  /**
   * Delete the customer after user verification through a modal window
   * @param customer The customer
   */
  deleteCustomer(customer: Customer){

    this.modalPopupComponent.openVerticallyCentered(customer).then(
      () => {
        this.customerService.deleteCustomerHttp(customer);
      }
    );
  }
}
