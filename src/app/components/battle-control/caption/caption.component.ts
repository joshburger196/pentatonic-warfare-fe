import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss'],
})
export class CaptionComponent  implements OnInit {
  @Input() text:string="";
  @Output("click") clickEventEmitter=new EventEmitter<string>();

  constructor() {
    console.log("I'm caption constructor")
  }

  ngOnInit() {}

  onClick()
  {
    console.log("Hello from caption!")
    this.clickEventEmitter.emit("Next!");
  }
}
