import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
})
export class CustomCardComponent  implements OnInit {
  /*
    this component is used to represent a musician, a technique, an account,
    or any other thing imaginable with the same sort of layout and form
  */

  @Input() id:string=""; //returned by events, used to discern different custom cards in a list
  @Input() title:string=""; //Written in bold, right column, top row
  @Input() genre:string=""; //Determines colour of optional genre chip on the right of the title
  @Input() imgUrl:string=""; //Determines optional img in the left column of the card
  @Input() clickable:boolean=false; //Activates click animations
  @Input() disabled:boolean=false;  //Styled to look uninteractable (grey or transparent)
  @Input() borderColor:string=""; //Sets border colour in css, used to express rarity
  @Input() width:string="16rem"; //Sets width. Can be useful to suit different pages and layouts
  @Input("max-width") maxWidth:string=""; //Sets max width. Can be useful to suit different pages and layouts

  @Output("click") idEmitter=new EventEmitter<String>();

  constructor() { }

  ngOnInit() {}

  clickEvent()
  {
    this.idEmitter.emit(this.id);
  }


}
