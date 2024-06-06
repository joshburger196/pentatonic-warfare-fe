import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Musician } from '../models/musician';
import { isValidAccountData, isValidMusicianData, isValidTechniqueData, musicianBEType } from '../models/BEtypes';
import { Stats } from '../models/stats';
import { Technique } from '../models/technique';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class BeService {


  constructor(private http:HttpClient) { }

  fetchAllTechniques():Observable<Technique[]>
  {
    console.log("I'm calling the BE ");
    var techList;
    return this.http.get(`http://localhost:3000/assets/techniques`).pipe
    (
      map(data=>{ return this.parseTechData(data) })
    );
  }

  private parseTechData(data:any):Technique[]
  {
    //if data is a single technique object
    if(isValidTechniqueData(data))
    {
      var techObj=new Technique(
        data.id,
        data.name,
        data.genre,
        data.instrument,
        data.description,
        data.damage,
        data.is_single_target==1,
        data.effect,
        data.evolution_of
      );
      return [techObj];
    }
    //Or if data is an array...
    else if(Array.isArray(data))
    {
      var techArray:Technique[]=[];
      data.forEach(potentialTech=>
      {
        //if the elements of the array are valid tech objects
        if(isValidTechniqueData(potentialTech))
        {
          var techData=potentialTech;
          var techObj=new Technique(
            techData.id,
            techData.name,
            techData.genre,
            techData.instrument,
            techData.description,
            techData.damage,
            techData.is_single_target==1,
            techData.effect,
            techData.evolution_of
          );
          techArray.push(techObj);
        }
        else
          throw new Error("Invalid Technique Data from Back-end")
      })
      return techArray; //RETURN ARRAY OF TECHNIQUES
    }
    else
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
    return this.http.get(`http://localhost:3000/account/musicians/${accountID}`).pipe
    (
      map(data=>this.parseMusicianData(data))
    );
  }

  private parseMusicianData(data:any):Musician[]
  {
    //If data is a single musician object:
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
      return [musicianObj]; //RETURN SINGLE MUSICIAN
    }
    //otherwise... if data is an array...
    else if(Array.isArray(data))
    {
      var musicianArray:Musician[]=[];
      data.forEach(potentialMusician=>
      {
        //if the elements of the array are valid musicians...
        if(isValidMusicianData(potentialMusician))
        {
          var musData=potentialMusician;
          var stats=new Stats(musData.hp,musData.def,musData.atk,musData.acc,musData.spd);
          var techniques:Technique[]=[];

          //Always only has 4 techniques, the last two are optional.
          techniques.push(this.getTechnique(musData.tech_1));
          techniques.push(this.getTechnique(musData.tech_2));
          if(musData.tech_3!=null)
            techniques.push(this.getTechnique(musData.tech_3));
          if(musData.tech_4!=null)
            techniques.push(this.getTechnique(musData.tech_4));

          var musicianObj=new Musician(
            musData.id,
            musData.name,
            musData.template,
            musData.description,
            musData.genre,
            musData.instrument,
            techniques,
            musData.exp,
            musData.lvl,
            stats,
            stats
          );
          musicianArray.push(musicianObj);
        }
        else
          throw new Error("Invalid Musician Data from Back-end")
      });
      return musicianArray; //RETURN ARRAY OF MUSICIANS
    }
    throw new Error("Invalid Musician Data from Back-end")
  }

  fetchAccountDetails(accountID:string):Observable<Account>
  {
    console.log("I'm calling the BE ");
    return this.http.get(`http://localhost:3000/account/info/${accountID}`).pipe
    (
      map(data=>this.parseAccountData(data))
    );
  }

  private parseAccountData(data:any):Account
  {
    if(isValidAccountData(data))
      return new Account(data.id,data.name,data.lvl,data.exp);
    throw new Error("Invalid Account Data from Back-end");
  }
}
