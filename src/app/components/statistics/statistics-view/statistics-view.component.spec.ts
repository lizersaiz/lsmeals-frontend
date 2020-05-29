import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsView } from './statistics-view.component';

describe('StatisticsView', () => {
  let component: StatisticsView;
  let fixture: ComponentFixture<StatisticsView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
