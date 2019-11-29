import { TestBed } from '@angular/core/testing';

import { NotificationsHttpService } from './notifications-http.service';

describe('NotificationsHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationsHttpService = TestBed.get(NotificationsHttpService);
    expect(service).toBeTruthy();
  });
});
