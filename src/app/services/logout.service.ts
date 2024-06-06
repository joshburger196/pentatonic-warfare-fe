import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router:Router) { }

  logOut()
  {
    localStorage.setItem("isLogged","false");
    localStorage.removeItem("account-object");
    this.router.navigate(["login"]);
  }
}
