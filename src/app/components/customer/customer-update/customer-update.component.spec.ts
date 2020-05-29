import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdateComponent } from './customer-update.component';
import { CustomerService } from 'src/app/services/customer.service';

describe('CustomerUpdateComponent', () => {
  let component: CustomerUpdateComponent;
  let fixture: ComponentFixture<CustomerUpdateComponent>;

  let customerServiceSpy: any;

  beforeEach(async(() => {

    customerServiceSpy = jasmine.createSpyObj("CustomerService", ["updatingCustomer", "updateCustomer"]);
    customerServiceSpy.updateCustomer.and.returnValue([]);

    TestBed.configureTestingModule({
      declarations: [
        CustomerUpdateComponent
      ],
      providers: [
        {provide: CustomerService, useValue: customerServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUpdateComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
