import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMainComponent } from './navbar-main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NabvarService } from 'src/app/services/nabvar.service';

describe('NavbarMainComponent', () => {
  let component: NavbarMainComponent;
  let fixture: ComponentFixture<NavbarMainComponent>;
  let navbarServiceSpy: any;

  beforeEach(async(() => {

    navbarServiceSpy = jasmine.createSpyObj("NabvarService", ['populateNavbar']);
    navbarServiceSpy.populateNavbar.and.returnValue([]);

    TestBed.configureTestingModule({
      declarations: [
        NavbarMainComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers:[
        {provide: NabvarService, useValue: navbarServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(NavbarMainComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
