import { Injectable } from '@angular/core';
import { Battle } from '../models/battle';
import { LocalStorageService } from './local-storage.service';
import { Technique } from '../models/technique';
import { Musician } from '../models/musician';
import { getGenre } from 'src/assets/static-data/genres';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor(private lsService:LocalStorageService) { }

  executeTech(
    battle:Battle,
    iSelectedMusician:number,
    techID:string,
    iSelectedTarget:number
  ):{battle:Battle,messages:string[]}
  {

    let attacker:Musician=battle.band1[iSelectedMusician];
    let tech:Technique=this.lsService.getTechnique(techID);
    let defender:Musician=battle.band2[iSelectedMusician];

    //if inflicts damage
    if(tech.damage!=null)
    {
      //damage calculation variables
      let isCritical=false;
      let isEffective=false;
      let isIneffective=false;

      //check if critical or fail
      //probability variables
      let successRoll=Math.random()*100;
      let successThreshold=100/attacker.battleStats.acc;
      let criticalThreshold=100-attacker.battleStats.acc;

      if(successRoll<successThreshold)
      {
        console.log("Failure! o.o")
        return {"battle":battle,"messages":["Failure!"]};
      }

      console.log("Success");
      if(successRoll>=criticalThreshold)
      {
        isCritical=true;
        console.log("Critical success!")
      }

      //check genre effectiveness
      isEffective=this.isGenreEffective(tech.genre,defender.genre);
      isIneffective=this.isGenreIneffective(tech.genre,defender.genre);

      //check atk vs def
      let advantageRatio=attacker.battleStats.atk/defender.battleStats.def

      //spark of randomness
      //(yet to be implemented)
      let accuracyModifier=attacker.battleStats.acc*Math.random()
      
      //inflict damage
      let damageToInflict=tech.damage*advantageRatio
      battle.band2[iSelectedTarget].battleStats.hp-=damageToInflict;
      console.log(`${defender.name} takes ${damageToInflict} damage!`);

      return {"battle":battle,"messages":["Success or critical!",
        "Effective or ineffective!",
        `${defender.name} takes ${damageToInflict} damage!`]};
    }
    return {"battle":battle,"messages":["SKU!"]};
  }

  isGenreEffective(atkGenreId:string,defGenreId:string):boolean
  {
    let atkGenre=getGenre(atkGenreId);
    let effectiveAgainst=atkGenre.effectiveAgainst;
    let isEffective=effectiveAgainst.find(genre=>genre===defGenreId)!=undefined;
    return isEffective;
  }
  isGenreIneffective(atkGenreId:string,defGenreId:string)
  {
    let atkGenre=getGenre(atkGenreId);
    let ineffectiveAgainst=atkGenre.ineffectiveAgainst;
    let isIneffective=ineffectiveAgainst.find(genre=>genre===defGenreId)!=undefined;
    return isIneffective;
  }
}

