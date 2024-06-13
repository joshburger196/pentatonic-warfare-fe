import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BeService } from './be-service.service';
import { GameAssets } from '../models/gameAssets';
import { Account } from '../models/account';
import { Musician } from '../models/musician';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  runtimeAssets:GameAssets|undefined;
  runtimeAccount:Account|undefined;
  runtimeAccountMusicians:Musician[]|undefined;

  constructor(private beService:BeService, private router:Router) { }

  private storeAccountAssets(id:string)
  {
    //Store account details
    this.beService.fetchAccountAssets(id).subscribe(data =>
    {
      this.runtimeAccount=data.account_info;
      this.runtimeAccountMusicians=data.account_musicians;
      
      localStorage.setItem("is_logged","true");
      localStorage.setItem("account_details",JSON.stringify(data.account_info));
      localStorage.setItem("account_musicians",JSON.stringify(data.account_musicians));

      console.log(`Reading fetched info from localstorage:
      Is logged: ${localStorage.getItem('is_logged')}
      Account Details: ${localStorage.getItem('account_details')}
      Account Musicians: ${localStorage.getItem('account_musicians')}`);
    })
  }

  private storeGameAssets()
  {
    this.beService.fetchGameAssets().subscribe(assets=>
    {
      this.runtimeAssets=assets;

      localStorage.setItem("assets",JSON.stringify(assets));
      localStorage.setItem("last_game_assets_query",Date.now().toString());

      /*console.log(`Reading fetched assets:`);
      console.log(localStorage.getItem("assets"));
      console.log(localStorage.getItem("last_game_assets_query"));*/
    })
    
  }

  private areLocalGameAssetsValid():Boolean
  {
    //Are asset fields valid?

    //check if the last game data query was more than a week ago

    //if(lastGameAssetsQuery.getTime() < Date.now()-(1000 * 60 * 60 * 24 * 7))
    
    //currently I'm going to pretend the local assets are always missing/invalid
    return false;
  }

  LoginRoutine(id:string)
  {
    //currently I'm going to pretend the local assets are always missing/invalid
    if(this.areLocalGameAssetsValid())
    {
      //this.getGameAssetsFromLocalStorage()
    }
    else
    {
      //fetch assets from BE
      this.storeGameAssets()
    }

    //store data relative to account
    this.storeAccountAssets(id)
    
    //navigate to battle tab
    this.router.navigate(["/tabs/battle"]);
  }
  
  clearLocalStorage()
  {
    localStorage.clear();
    //navigate to battle tab
    this.router.navigate(["login"]);
  }

  getTechnique(id:string)
  {
    //to implement: [if id is valid tech ID]
    const techToSearch=this.runtimeAssets?.techinques.find(technique=>technique.id===id)
    if(techToSearch!=undefined)
      return techToSearch;
    else
      throw new Error(`Technique with id ${id} not found in runtime assets`);
  }

}

