import { TestBed, async } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Customer } from '../common/customer';
import { Observable } from 'rxjs';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(CustomerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /*
  it('should get customers by http request, getCustomers()', () => {

    let customers = [
      new Customer("firstName", "lastName", "email", "phone", "pass")
    ];
    let customersResponse: any;

    service.getCustomersHttp().subscribe(
      data => customersResponse = data
    );

    const request = httpTestingController.expectOne("http://localhost:8080/api/customers").flush(customers);
    expect(customersResponse).toEqual(customers);
  })
  */
});
