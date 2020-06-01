import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../common/customer';
import { Subject, Observable } from 'rxjs';
import { PaginatorService } from './paginator.service';
import { NavigationService } from './navigation.service';
import { InfoBarService } from './bootstrap/info-bar.service';

@Injectable({
  providedIn: 'root'
})
/**
 * This is the service reference when working with customer entity.
 * Any service not directly related to customer as an Angular component
 * is injected here. Invoque them by calling the methods available
 */
export class CustomerService {


  // Makes the list of customers available for subscription
  listedCustomers: Subject<Customer[]> = new Subject<Customer[]>();

  // for customer list pagination; properties and event to look at
  pageIndex: number;
  pageSize: number;

  pageEvent: any;

  // base url for http requests
  baseUrl = "http://localhost:8080/api/customers"

  constructor(private httpClient: HttpClient,
              private navigationService: NavigationService,
              private paginatorService: PaginatorService,
              private infoBarService: InfoBarService) {

    this.paginatorServiceSubscription();
  }

  /**
   * Subscribe to paginator service for http get requests
   */
  private paginatorServiceSubscription() {

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
   * Makes a http request to back end application, to retrieve a customer
   * @param customerId The customer id
   */
  getCustomerHttp(customerId: number): Observable<Customer> {

    let baseUrlAndPageParams = `${this.baseUrl}/${customerId}`
    return this.httpClient.get<Customer>(baseUrlAndPageParams);
  }

  /**
   * Makes a http request to back end application, given pagination values
   * to retrieve a list of customers
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

  /**
   * Makes a http request to create a customer
   * @param customer The customer to create
   */
  createCustomerHttp(customer: Customer): Observable<Customer> {

    let response: any;
    return this.httpClient.post<Customer>(this.baseUrl,
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
      }
    );
  }

  /**
   * Makes a http request to update a customer
   * @param customer The customer to update
   */
  updateCustomerHttp(customer: Customer): Observable<Customer> {

    const withArgUrl = `${this.baseUrl}/${customer.id}`;

    return this.httpClient.put<Customer>(withArgUrl, customer, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Makes a http request to delete a customer
   * @param customer The customer to delete
   */
  deleteCustomerHttp(customer: Customer) {

    const withArgUrl = `${this.baseUrl}/${customer.id}`

    let response: Customer;
    this.httpClient.delete<Customer>(withArgUrl).subscribe(
      data =>
      {
        response = data;
        this.getCustomersHttpPaginate(true);
      }
    );

    this.displayInfoBar("success", "deleteCustomer");
  }

  /**
   * Asks navigation service to route to a url
   * @param url The url to route to
   */
  navigate(url: string) {

    this.navigationService.routeTo(url);
  }

  /**
   * Asks infobar to get displayed
   * @param messageType The infobar type
   * @param message The message
   */
  displayInfoBar(messageType: string, message: string) {

    if (messageType === "success"){

      this.infoBarService.giveSuccessMessage(message);
    }
  }
}

interface GetResponseCustomerPaginate {

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
