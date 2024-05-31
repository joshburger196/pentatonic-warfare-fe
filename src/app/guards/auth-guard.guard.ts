import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlSegment, UrlSegmentGroup, UrlTree, createUrlTreeFromSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem("isLogged")==="true")
    return true;
  else
    return inject(Router).createUrlTree(["login"])
};
