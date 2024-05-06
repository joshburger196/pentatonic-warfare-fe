import { Component, Input, OnInit } from '@angular/core';
import { Musician } from 'src/models/musician';

@Component({
  selector: 'app-stat-block',
  templateUrl: './stat-block.component.html',
  styleUrls: ['./stat-block.component.scss'],
})
export class StatBlockComponent  implements OnInit {
  @Input() musician:Musician|undefined;

  constructor() { }

  ngOnInit() {}

}
