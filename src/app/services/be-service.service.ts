import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Musician } from '../models/musician';
import { bandBEType, isValidAccountInfoData, isValidBandData, isValidGameAssetsData, isValidLearnableTechData, isValidMusicianData, isValidTechniqueData, isValidTemplateData, musicianBEType, techniqueBEType, templateBEType } from '../models/BEtypes';
import { Stats } from '../models/stats';
import { Technique } from '../models/technique';
import { Account } from '../models/account';
import { GameAssets } from '../models/gameAssets';
import { MusicianTemplate } from '../models/musicianTemplate';
import { Band } from '../models/band';

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

  private parseSingleTech(tech:techniqueBEType):Technique
  {
    //assumes tech is valid
    return new Technique(
      tech.id,
      tech.name,
      tech.genre,
      tech.instrument,
      tech.description,
      tech.ally_effect,
      tech.ally_effect_intensity,
      tech.is_ally_single_target==1,
      tech.damage,
      tech.opponent_effect,
      tech.opponent_effect_intensity,
      tech.opponent_effect_probability,
      tech.is_opponent_single_target==1,
      tech.evolution_of
    );
  }

  private parseTechData(data:any):Technique[]
  {
    //if data is a single technique object
    if(isValidTechniqueData(data))
    {
      return [this.parseSingleTech(data)];
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
          var techObj=this.parseSingleTech(techData)
          techArray.push(techObj);
        }
        else
          throw new Error("Invalid Technique Data from Back-end")
      })
      return techArray; //RETURN ARRAY OF TECHNIQUES
    }

    //If it's not a tech or an array of techs, something went wrong
    else
      throw new Error("Invalid Technique Data from Back-end")
  }

  private parseSingleTemplate(template:templateBEType):MusicianTemplate
  {
    return new MusicianTemplate(
      template.id,
      template.name,
      template.description,
      template.rarity,
      template.genre,
      template.instrument,
      new Stats(template.base_hp,template.base_def,template.base_atk,template.base_acc,template.base_spd)
    )
  }

  private parseTemplateData(templateData:any,learnableTechData:any):MusicianTemplate[]
  {
    //parses musician templates and learnale techniques into musician template objects
    //therefore 2 db queries are parsed in 1 set of MusicianTemplate objects
    //First the template data is parsed, then the learnableTechnique data

    var templateArray:MusicianTemplate[]=[];

    if(isValidTemplateData(templateData))
    {
      templateArray.push(this.parseSingleTemplate(templateData))
    }

    //If template data is an array
    else if(Array.isArray(templateData))
    {
      templateData.forEach(template=>
      {
        if(isValidTemplateData(template))
        {
          templateArray.push(this.parseSingleTemplate(template))
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

  fetchAccountAssets(accountID:string):Observable<{"account_info":Account,"account_musicians":Musician[],"account_bands":Band[]}>
  {
    console.log("I'm calling the BE for Account Data");
    return this.http.get(`http://localhost:3000/account/${accountID}`).pipe
    (
      map(data=>
      {
        if("account_info" in data && "account_musicians" in data && "account_bands" in data)
          return {"account_info":this.parseAccountInfoData(data.account_info),
                  "account_musicians":this.parseMusicianData(data.account_musicians),
                  "account_bands":this.parseBandData(data.account_bands)}
        else
          throw new Error("Invalid Account data from Back-end. Expected fields 'account_info' and 'account_musicians'.");
      })
    );
  }

  private parseSingleBand(band:bandBEType):Band
  {
    //turn id1 id2 3 4 into mus id array
    var musicianIDArray:string[]=[band.id_mus_1];
    if(band.id_mus_2!=null)
      musicianIDArray.push(band.id_mus_2)
    if(band.id_mus_3!=null)
      musicianIDArray.push(band.id_mus_3)
    if(band.id_mus_4!=null)
      musicianIDArray.push(band.id_mus_4)

    return new Band(
      band.id,
      band.name,
      band.id_owner,
      musicianIDArray
    );
  }

  private parseBandData(data:any):Band[]
  {
    //If data is a single band object:
    if(isValidBandData(data))
      return [this.parseSingleBand(data)]; //RETURN SINGLE BAND
    
    //otherwise... if data is an array...
    else if(Array.isArray(data))
    {
      var bandArray:Band[]=[];
      data.forEach(potentialBand=>
      {
        //if the elements of the array are valid bands...
        if(isValidBandData(potentialBand))
          bandArray.push(this.parseSingleBand(potentialBand));
        else
          throw new Error(`Invalid Band Data from Back-end: ${JSON.stringify(potentialBand)}`)
      });
      return bandArray; //RETURN ARRAY OF Bands

    }
    throw new Error(`Invalid Band Data from Back-end: ${JSON.stringify(data)}`)
  }

  private parseSingleMusician(musician:musicianBEType):Musician
  {
    var stats=new Stats(musician.hp,musician.def,musician.atk,musician.acc,musician.spd);
    var techniques:string[]=[];

    //Always only has 4 techniques, the last two are optional.
    techniques.push(musician.tech_1);
    techniques.push(musician.tech_2);
    if(musician.tech_3!=null)
      techniques.push(musician.tech_3);
    if(musician.tech_4!=null)
      techniques.push(musician.tech_4);

    return new Musician(
      musician.id,
      musician.genre,
      musician.instrument,
      musician.rarity,
      musician.template,
      musician.found_by,
      musician.name,
      musician.description,
      techniques,
      musician.exp,
      musician.lvl,
      stats
    );
  }

  private parseMusicianData(data:any):Musician[]
  {
    //If data is a single musician object:
    if(isValidMusicianData(data))
      return [this.parseSingleMusician(data)]; //RETURN SINGLE MUSICIAN

    //otherwise... if data is an array...
    else if(Array.isArray(data))
    {
      var musicianArray:Musician[]=[];
      data.forEach(potentialMusician=>
      {
        //if the elements of the array are valid musicians...
        if(isValidMusicianData(potentialMusician))
          musicianArray.push(this.parseSingleMusician(potentialMusician));
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
