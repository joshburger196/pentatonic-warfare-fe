import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Musician } from 'src/app/models/musician';
import { getRarity } from 'src/assets/static-data/rarities';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
})
export class StatBlockComponent  implements OnInit {
  @Input() musician:Musician|undefined;
  @Input() clickable:boolean=false;
  @Input() disabled:boolean=false;
  @Output("click") clickEventEmitter=new EventEmitter<Musician>();

  cardClass:string="";

  constructor()
  {}

  ngOnInit() 
  {
    if(this.clickable)
      this.cardClass="clickable";
    if(this.disabled)
      this.cardClass="disabled";
  }

  getRarity(id:string)
  {
    return getRarity(id)
  }

  emitMusician()
  {
    if(!this.disabled && this.clickable)
      this.clickEventEmitter.emit(this.musician);
  }
}
