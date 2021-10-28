import { TestBed } from '@angular/core/testing';

import { DownloadedfileService } from './downloadedfile.service';

describe('DownloadedfileService', () => {
  let service: DownloadedfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadedfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
