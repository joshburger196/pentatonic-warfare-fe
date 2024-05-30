import { Component, OnInit } from '@angular/core';
import { BeService } from 'src/app/services/be-service.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: 'account-tab.page.html',
  styleUrls: ['account-tab.page.scss']
})
export class Tab3Page implements OnInit{

  musicianList:any;

  constructor(private beService:BeService) {}

  ngOnInit()
  {
    console.log("I'm calling getAccountMusicians for A000...0");
    this.beService.fetchAccountMusicians('A00000000000');
  }
}
