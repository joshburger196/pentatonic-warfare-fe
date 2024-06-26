import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlSegment, UrlSegmentGroup, UrlTree, createUrlTreeFromSnapshot } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  if(LocalStorageService.isLogged())
    return true;
  else
    return inject(Router).createUrlTree(["login"])
};
