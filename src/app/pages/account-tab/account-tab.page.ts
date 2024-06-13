import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeService } from 'src/app/services/be-service.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LogoutService } from 'src/app/services/logout.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class Tab3Page implements OnInit{

  musicianList:any;

  constructor(private beService:BeService,private router:Router,private logoutService:LogoutService, private localStorageService:LocalStorageService) {}

  ngOnInit()
  {

  }

  clearLocalStorage()
  {
    this.localStorageService.clearLocalStorage();
  }

  logOut()
  {
    this.logoutService.logOut();
  }
}
