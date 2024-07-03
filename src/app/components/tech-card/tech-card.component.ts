import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Technique } from 'src/app/models/technique';

@Component({
  selector: 'app-tech-card',
  templateUrl: './tech-card.component.html',
  styleUrls: ['./tech-card.component.scss'],
})
export class TechCardComponent  implements OnInit {

  @Input() technique:Technique|undefined;
  @Output("click") clickEventEmitter=new EventEmitter<Technique>();

  cardClass:string="";

  constructor() { }

  ngOnInit() {}

  emitTech()
  {
    this.clickEventEmitter.emit(this.technique)
  }

}
