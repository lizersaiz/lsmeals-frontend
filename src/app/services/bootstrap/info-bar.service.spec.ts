import { TestBed } from '@angular/core/testing';

import { InfoBarService } from './info-bar.service';

describe('InfoBarService', () => {
  let service: InfoBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
