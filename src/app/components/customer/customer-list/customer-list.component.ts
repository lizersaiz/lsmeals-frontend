import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ModalPopupComponent } from '../../miscelaneous/modal-popup/modal-popup.component';
import { PaginatorService } from 'src/app/services/paginator.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  @ViewChild(ModalPopupComponent) modalPopupComponent: ModalPopupComponent;

  customers: Customer[] = [];


  constructor(private customerService: CustomerService,
              private paginatorService: PaginatorService) {}

  ngOnInit(): void {

    this.listCustomers();
  }

  listCustomers(){

    this.customerService.getCustomersHttpPaginate(true);
    this.customerService.listedCustomers.subscribe(
      data => {
        this.customers = data
      }
    )
  }

  updateCustomer(customer: Customer){

    this.customerService.navigateToUpdateCustomer(customer);
  }

  deleteCustomer(customer: Customer){

    this.modalPopupComponent.openVerticallyCentered(customer).then(
      () => {
        this.customerService.deleteCustomerHttp(customer);
      }
    );
  }
}
