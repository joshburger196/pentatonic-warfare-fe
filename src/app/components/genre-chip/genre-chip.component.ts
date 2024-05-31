import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genreClass';
import { genres } from 'src/assets/static-data/genres';

@Component({
  selector: 'app-genre-chip',
  templateUrl: './genre-chip.component.html',
  styleUrls: ['./genre-chip.component.scss'],
})
export class GenreChipComponent  implements OnInit {
  @Input() genreId:string|undefined;
  chipColor:string="";
  chipText:string="";
  textColor:string="#000000";
  chipBorder:string="";

  constructor(private http:HttpClient){}

  ngOnInit() 
  {
    genres.forEach((genre)=>
    {
      if(genre.id==this.genreId)
      {
        this.chipText=genre.name;
        this.chipColor=genre.color;
        if(genre.isColorDark)
        { 
          this.textColor="#FFFFFF";
          this.chipBorder=" 1px solid lightgrey";
        } 
        else
          this.chipBorder=" 1px solid darkgrey";
      }
    })
  }

}
