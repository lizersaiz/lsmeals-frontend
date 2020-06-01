import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMainComponent } from './navbar-main.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from 'src/app/services/navigation.service';

describe('NavbarMainComponent', () => {
  let component: NavbarMainComponent;
  let fixture: ComponentFixture<NavbarMainComponent>;
  let navigationServiceSpy: any;

  beforeEach(async(() => {

    navigationServiceSpy = jasmine.createSpyObj("NavigationService", ['populateNavbar']);
    navigationServiceSpy.populateNavbar.and.returnValue([]);

    TestBed.configureTestingModule({
      declarations: [
        NavbarMainComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers:[
        {provide: NavigationService, useValue: navigationServiceSpy}
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
