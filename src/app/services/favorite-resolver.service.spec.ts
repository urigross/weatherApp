import { TestBed } from '@angular/core/testing';

import { FavoriteResolverService } from './favorite-resolver.service';

describe('FavoriteResolverService', () => {
  let service: FavoriteResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
