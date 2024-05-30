import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Musician } from 'src/app/models/musician';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.scss'],
})
export class StatBlockComponent  implements OnInit {
  @Input() musician:Musician|undefined;
  @Input() clickable:boolean=false;
  @Input() disabled:boolean=false;
  @Output("clickEvent") clickEventEmitter=new EventEmitter<Musician>();

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

  onClick()
  {
    if(!this.disabled && this.clickable)
      this.clickEventEmitter.emit();
  }
}
