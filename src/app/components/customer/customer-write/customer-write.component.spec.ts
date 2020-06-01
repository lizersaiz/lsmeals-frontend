import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerWriteComponent } from './customer-write.component';

describe('CustomerWriteComponent', () => {
  let component: CustomerWriteComponent;
  let fixture: ComponentFixture<CustomerWriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerWriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
