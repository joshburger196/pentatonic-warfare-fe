import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Musician } from '../models/musician';
import { isValidMusicianData, isValidTechniqueData, musicianBEType } from '../models/BEtypes';
import { Stats } from '../models/stats';
import { Technique } from '../models/technique';

@Injectable({
  providedIn: 'root'
})
export class BeService {

  fetchedTechniques:Technique[]=[];

  constructor(private http:HttpClient) { }

  fetchAllTechniques()
  {
    console.log("I'm calling the BE ");
    var techList;
    this.http.get(`http://localhost:3000/technique/all`).pipe
    (
      map(data=>this.fetchedTechniques=this.parseTechData(data))
    );
  }

  private parseTechData(data:any):Technique[]
  {
    if(isValidTechniqueData(data))
    {
      var techObj=new Technique(
        data.id,
        data.name,
        data.genre,
        data.description,
        data.damage,
        data.is_single_target==1,
        data.effect,
        data.evolution_of
      );
      return [techObj];
    }
    throw new Error("Invalid Technique Data from Back-end")
  }

  getTechnique(id:string):Technique
  {
    //TO IMPLEMENT: validate id parameter

    var techToGet=this.fetchedTechniques.find(technique => technique.id===id)

    if(techToGet===undefined)
      throw new Error(`Technique with ID ${id} not found`);
    else
      return techToGet;
  }

  fetchAccountMusicians(accountID:string):Observable<Musician[]>
  {
    console.log("I'm calling the BE ");
    var musicianList;
    return this.http.get(`http://localhost:3000/account/musicians/${accountID}`).pipe
    (
      map(data=>this.parseMusicianData(data))
    );
  }

  private parseMusicianData(data:any):Musician[]
  {
    if(isValidMusicianData(data))
    {
      var stats=new Stats(data.hp,data.def,data.atk,data.acc,data.spd);
      var techniques:Technique[]=[];

      //Always only has 4 techniques, the last two are optional.
      techniques.push(this.getTechnique(data.tech_1));
      techniques.push(this.getTechnique(data.tech_2));
      if(data.tech_3!=null)
        techniques.push(this.getTechnique(data.tech_3));
      if(data.tech_4!=null)
        techniques.push(this.getTechnique(data.tech_4));

      var musicianObj=new Musician(
        data.id,
        data.name,
        data.template,
        data.description,
        data.genre,
        data.instrument,
        techniques,
        data.exp,
        data.lvl,
        stats,
        stats
      );
      return [musicianObj];
    }
    throw new Error("Invalid Musician Data from Back-end")
  }


}
