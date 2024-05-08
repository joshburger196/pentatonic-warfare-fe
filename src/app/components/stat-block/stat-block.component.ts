import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Musician } from 'src/models/musician';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.scss'],
})
export class StatBlockComponent  implements OnInit {
  @Input() musician:Musician|undefined;
  @Input() clickable:boolean=false;
  @Output("click") clickEventEmitter=new EventEmitter<Musician>();

  cardClass:string="";

  constructor() { }

  ngOnInit() {}

  onClick()
  {
    this.clickEventEmitter.emit();
  }
}
