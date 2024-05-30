import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Technique } from 'src/app/models/technique';

@Component({
  selector: 'app-power-block',
  templateUrl: './power-block.component.html',
  styleUrls: ['./power-block.component.scss'],
})
export class PowerBlockComponent  implements OnInit {

  @Input() power:Technique|undefined;
  @Output("click") clickEventEmitter=new EventEmitter<Technique>();

  cardClass:string="";

  constructor() { }

  ngOnInit() {}

  onClick()
  {
    this.clickEventEmitter.emit(this.power)
  }

}
