import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSideComponent } from './navbar-side.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarSideComponent', () => {
  let component: NavbarSideComponent;
  let fixture: ComponentFixture<NavbarSideComponent>;

  let navbarServiceSpy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarSideComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: "NabvarService", useValue: navbarServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSideComponent);
    component = fixture.componentInstance;

    navbarServiceSpy = jasmine.createSpyObj("NabvarService", ["openSelectedOption"])

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
