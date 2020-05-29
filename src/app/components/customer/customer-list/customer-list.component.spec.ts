import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { of } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/common/customer';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerServiceSpy: any;

  beforeEach(async(() => {

    customerServiceSpy = jasmine.createSpyObj("CustomerService", ["navigateUpdateCustomer", "getCustomers"])
    customerServiceSpy.getCustomers.and.returnValue(of<GetResponseCustomer>());

    TestBed.configureTestingModule({
      declarations: [
        CustomerListComponent
       ],
      providers: [
        {provide: CustomerService, useValue: customerServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

interface GetResponseCustomer{

  _embedded: {
    customers: Customer[];
  }
}
