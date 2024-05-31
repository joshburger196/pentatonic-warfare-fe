import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  validateForm()
  {
    console.log("Validating form!");
    //check inputs before sending to BE
    this.validateCredentials();
  }

  validateCredentials()
  {
    //spinny circle
    console.log("Validating credentials!");
    //send to BE for checking
    this.onLoginSuccess();
  }

  onLoginSuccess()
  {
    //call account and musicians data
    console.log("Success! Calling all needed data and navigating to battle tab!");
    //if localstorage empty or if last update older than a month,
    //then load techs, temps and learnable techs

    localStorage.setItem("isLogged","true");

    //navigate to battle tab
    this.router.navigate(["/tabs/battle"]);
  }

  onLoginFailure(){}
}
