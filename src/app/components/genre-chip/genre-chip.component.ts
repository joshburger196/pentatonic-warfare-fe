import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genreClass';
import { genreId } from 'src/app/models/genreEnum';

@Component({
  selector: 'app-genre-chip',
  templateUrl: './genre-chip.component.html',
  styleUrls: ['./genre-chip.component.scss'],
})
export class GenreChipComponent  implements OnInit {
  @Input() chipGenre:string|undefined;
  chipColor:string="";
  textColor:string="#000000";
  chipBorder:string="";

  allGenres:Genre[]=
  [
    new Genre(genreId.metal,"#9e0008",true,[genreId.rock,genreId.pop],[genreId.wild,genreId.stnr]),
    new Genre(genreId.rock,"#ff5100",false,[genreId.wild,genreId.pop],[genreId.metal,genreId.prog]),
    new Genre(genreId.pop,"#d6d6d6",false,[genreId.prog,genreId.jazz],[genreId.pop,genreId.wild]),
    new Genre(genreId.blues,"#002b8f",true,[genreId.stnr,genreId.prog],[genreId.funk,genreId.wild])
  ]

  constructor()
  {
    
  }

  ngOnInit() 
  {
    this.allGenres.forEach((genre)=>
    {
      if(genre.id==this.chipGenre)
      {
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
