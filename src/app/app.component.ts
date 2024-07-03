import { Component, OnInit } from '@angular/core';
import { BeService } from './services/be-service.service';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private lsService:LocalStorageService) {}

  ngOnInit(): void {
    this.lsService.StartupRoutine()
    
  }
}
