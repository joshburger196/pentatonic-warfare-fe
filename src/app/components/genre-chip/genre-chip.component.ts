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

  allGenres:Genre[]=
  [
    new Genre(genreId.metal,"#9e0008",true,[genreId.rock,genreId.pop],[genreId.hiphop,genreId.psych]),
    new Genre(genreId.rock,"#ff5100",false,[genreId.hiphop,genreId.pop],[genreId.metal,genreId.prog])
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
          this.textColor="#FFFFFF"
      }
      
    })
  }

}
