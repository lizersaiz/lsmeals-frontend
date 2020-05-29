import { TestBed } from '@angular/core/testing';

import { NabvarService } from './nabvar.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NabvarService', () => {
  let service: NabvarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations:[],
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(NabvarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
