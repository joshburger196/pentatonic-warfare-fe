import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Power } from 'src/models/power';

@Component({
  selector: 'app-power-block',
  templateUrl: './power-block.component.html',
  styleUrls: ['./power-block.component.scss'],
})
export class PowerBlockComponent  implements OnInit {

  @Input() power:Power|undefined;
  @Output("click") clickEventEmitter=new EventEmitter<Power>();

  cardClass:string="";

  constructor() { }

  ngOnInit() {}

  onClick()
  {
    this.clickEventEmitter.emit(this.power)
  }

}
