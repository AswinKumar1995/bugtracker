import { TestBed } from '@angular/core/testing';

import { CommentHttpService } from './comment-http.service';

describe('CommentHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommentHttpService = TestBed.get(CommentHttpService);
    expect(service).toBeTruthy();
  });
});
