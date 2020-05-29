import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../common/customer';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { InfoBarService } from './bootstrap/info-bar.service';
import { PaginatorService } from './paginator.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  // for customer update component
  updatingCustomer: Subject<Customer> = new Subject<Customer>();

  // for customer list component
  listedCustomers: Subject<Customer[]> = new Subject<Customer[]>();

  // for customer list pagination; properties and event to look at
  pageIndex: number;
  pageSize: number;

  pageEvent: any;

  // base url for http requests
  baseUrl = "http://localhost:8080/api/customers"

  constructor(private httpClient: HttpClient,
              private router: Router,
              private infoBarService: InfoBarService,
              private paginatorService: PaginatorService) {

    // subscribe to paginator service for http requests
    this.paginatorService.pageIndex.subscribe(
      data => {
        this.pageIndex = data;
      }
    )
    this.paginatorService.pageSize.subscribe(
      data => {
        this.pageSize = data;
      }
    )
    this.paginatorService.pageEvent.subscribe(
      () => this.getCustomersHttpPaginate(false)
    )
  }


  /**
   * Makes an http request to back end application, given pagination values
   * @param freshPage Variable used to trick case 0, onInit
   */
  getCustomersHttpPaginate(freshPage: boolean) {

    // if user just entered the form, we want to give it default options
    let thePageIndex = 0;
    let thePageSize = 10;
    if (!freshPage){
      thePageIndex = this.pageIndex;
      thePageSize = this.pageSize;
    }

    let baseUrlAndPageParams = `${this.baseUrl}?page=${thePageIndex}&size=${thePageSize}`
    this.httpClient.get<GetResponseCustomerPaginate>(baseUrlAndPageParams).subscribe(
      (data) =>
        {
          this.listedCustomers.next(data._embedded.customers);
        }
    );
  }

  createCustomerHttp(customer: Customer) {

    let response: any;
    this.httpClient.post<Customer>(this.baseUrl,
      {
        "firstName": customer.firstName,
        "lastName": customer.lastName,
        "email": customer.email,
        "phone": customer.phone,
        "userPass": customer.userPass
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
    }).subscribe(
      (data) => response = data
    );

    this.infoBarService.giveSuccessMessage("createCustomer");
  }

  updateCustomerHttp(customer: Customer){

    const withArgUrl = `${this.baseUrl}/${customer.id}`;

    let response: any;
    this.httpClient.put<Customer>(withArgUrl, customer, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe(
      data => response = data
    );

    this.infoBarService.giveSuccessMessage("updateCustomer");
  }

  deleteCustomerHttp(customer: Customer){

    const withArgUrl = `${this.baseUrl}/${customer.id}`

    let response: Customer;
    this.httpClient.delete<Customer>(withArgUrl).subscribe(
      data =>
      {
        response = data;
        this.getCustomersHttpPaginate(true);
      }
    );

    this.infoBarService.giveSuccessMessage("deleteCustomer");
  }

  /**
   * Makes the redirection to update form
   * @param customer The customer being updated
   */
  navigateToUpdateCustomer(customer: Customer){

    this.updatingCustomer.next(customer);
    this.router.navigateByUrl("/customer/update");
  }

  /**
   * For the case when page is refreshed, it wont contain a customer, so perform redirection to the list
   */
  redirectToCreateCustomer(){

    this.router.navigateByUrl("/customer/list");
  }
}

interface GetResponseCustomer{

  _embedded: {
    customers: Customer[];
  }
}

interface GetResponseCustomerPaginate{

  _embedded: {
    customers: Customer[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
