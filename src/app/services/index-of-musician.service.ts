import { Injectable } from '@angular/core';
import { Musician } from '../models/musician';

@Injectable({
  providedIn: 'root'
})
export class IndexOfMusicianService {

  constructor() { }

  indexOfMusician(band:Musician[], id:string):number
  {
    for(let i=0;i<band.length;i++)
      if(band[i].id===id)
        return i;
    throw new Error(`Musician with id ${id} not found. Band: ${JSON.stringify(band)}`);
  }
}
