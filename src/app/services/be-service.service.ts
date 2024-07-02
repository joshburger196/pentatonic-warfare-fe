import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Musician } from '../models/musician';
import { isValidAccountInfoData, isValidGameAssetsData, isValidLearnableTechData, isValidMusicianData, isValidTechniqueData, isValidTemplateData, musicianBEType } from '../models/BEtypes';
import { Stats } from '../models/stats';
import { Technique } from '../models/technique';
import { Account } from '../models/account';
import { GameAssets } from '../models/gameAssets';
import { MusicianTemplate } from '../models/musicianTemplate';

@Injectable({
  providedIn: 'root'
})
export class BeService {


  constructor(private http:HttpClient){}

  fetchGameAssets():Observable<GameAssets>
  {
    console.log("I'm calling the BE for Game Assets");

    return this.http.get(`http://localhost:3000/assets/`).pipe
    (
      map(data=>{ return this.parseGameAssets(data) })
    );
  }

  private parseGameAssets(data:any):GameAssets
  {
    if(isValidGameAssetsData(data))
      return new GameAssets(
        this.parseTechData(data.techniques),
        this.parseTemplateData(data.musician_templates,data.learnable_techniques))
    else
      throw new Error("Invalid Game Assets from Back-end")
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

  private parseTemplateData(templateData:any,learnableTechData:any):MusicianTemplate[]
  {
    //Parse musician templates first
    if(Array.isArray(templateData))
    {
      var templateArray:MusicianTemplate[]=[];
      templateData.forEach(template=>
      {
        if(isValidTemplateData(template))
        {
          templateArray.push(new MusicianTemplate(
            template.id,
            template.name,
            template.description,
            template.rarity,
            template.genre,
            template.instrument,
            new Stats(template.base_hp,template.base_def,template.base_atk,template.base_acc,template.base_spd),
          ))
        }
        else
          throw new Error("Invalid Musician Templates from Back-end")
      })
    }
    else
      throw new Error("Invalid Musician Templates from Back-end")

    //Once musician templates are all parsed,
    //the learnable techs are parsed and added to the parsed templates

    if(Array.isArray(learnableTechData))
    {
      learnableTechData.forEach(learnableTech=>
      {
        if(isValidLearnableTechData(learnableTech))
        {
          const doesIdCorrespond= (template:MusicianTemplate) => template.id===learnableTech.musician_template_id;

          //find the index of the template which has the same template_id as the learnable tech
          let templateIndex=templateArray.findIndex(doesIdCorrespond);

          if(templateIndex===-1)
            throw new Error(`Learnable Technique ${learnableTech.musician_template_id},${learnableTech.technique_id} has no corresponding template`)
          else
            //add the tech_id to the array of learnable techniques of the template with the found index
            templateArray[templateIndex].learnableTechniques.push(learnableTech.technique_id);
        }
        else
          throw new Error("Invalid Learnable Techniques from Back-end")
      });

      //All is done, return template array
      return templateArray;
    }
    else
      throw new Error("Invalid Learnable Techniques from Back-end")
  }

  fetchAccountAssets(accountID:string):Observable<{"account_info":Account,"account_musicians":Musician[]}>
  {
    console.log("I'm calling the BE for Account Data");
    return this.http.get(`http://localhost:3000/account/${accountID}`).pipe
    (
      map(data=>
      {
        if("account_info" in data && "account_musicians" in data)
          return {"account_info":this.parseAccountInfoData(data.account_info),"account_musicians":this.parseMusicianData(data.account_musicians)}
        else
          throw new Error("Invalid Account data from Back-end. Expected fields 'account_info' and 'account_musicians'.");
      })
    );
  }

  private parseMusicianData(data:any):Musician[]
  {
    //If data is a single musician object:
    if(isValidMusicianData(data))
    {
      var stats=new Stats(data.hp,data.def,data.atk,data.acc,data.spd);
      var techniques:string[]=[];

      //Always only has 4 techniques, the last two are optional.
      techniques.push(data.tech_1);
      techniques.push(data.tech_2);
      if(data.tech_3!=null)
        techniques.push(data.tech_3);
      if(data.tech_4!=null)
        techniques.push(data.tech_4);

      var musicianObj=new Musician(
        data.id,
        data.genre,
        data.instrument,
        data.rarity,
        data.template,
        data.name,
        data.description,
        techniques,
        data.exp,
        data.lvl,
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
          var techniques:string[]=[];

          //Always only has 4 techniques, the last two are optional.
          techniques.push(musData.tech_1);
          techniques.push(musData.tech_2);
          if(musData.tech_3!=null)
            techniques.push(musData.tech_3);
          if(musData.tech_4!=null)
            techniques.push(musData.tech_4);

          var musicianObj=new Musician(
            musData.id,
            musData.genre,
            musData.instrument,
            musData.rarity,
            musData.template,
            musData.name,
            musData.description,
            techniques,
            musData.exp,
            musData.lvl,
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

  private parseAccountInfoData(data:any):Account
  {
    console.log(JSON.stringify(data));
    if(isValidAccountInfoData(data))
      return new Account(data.id,data.name,data.lvl,data.exp);
    throw new Error("Invalid Account Data from Back-end");
  }
}
