import { Component, Input, OnInit } from '@angular/core';
import { Genre } from 'src/models/genreClass';
import { genreId } from 'src/models/genreEnum';

@Component({
  selector: 'app-genre-chip',
  templateUrl: './genre-chip.component.html',
  styleUrls: ['./genre-chip.component.scss'],
})
export class GenreChipComponent  implements OnInit {
  @Input() chipGenre:genreId|undefined;
  chipColor:string="";
  textColor:string="#000000";
  chipBorder:string="";

  allGenres:Genre[]=
  [
    new Genre(genreId.metal,"#9e0008",true,[genreId.rock,genreId.pop],[genreId.hiphop,genreId.psych]),
    new Genre(genreId.rock,"#ff5100",false,[genreId.hiphop,genreId.pop],[genreId.metal,genreId.prog]),
    new Genre(genreId.pop,"#d6d6d6",false,[genreId.prog,genreId.jazz],[genreId.pop,genreId.hiphop]),
    new Genre(genreId.blues,"#002b8f",true,[genreId.psych,genreId.prog],[genreId.synth,genreId.hiphop])
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
