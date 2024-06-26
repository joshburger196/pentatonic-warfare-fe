import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BeService } from './be-service.service';
import { GameAssets } from '../models/gameAssets';
import { Account } from '../models/account';
import { Musician } from '../models/musician';
import { isValidAccountInfoData, isValidMusicianData } from '../models/BEtypes';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  static runtimeAssets:GameAssets|undefined;
  static runtimeAccount:Account|undefined;
  static runtimeAccountMusicians:Musician[]|undefined;

  constructor(private beService:BeService, private router:Router){}

  private async storeAccountAssets(id:string)
  {
    //Store account details
    this.beService.fetchAccountAssets(id).subscribe(data =>
    {
      LocalStorageService.runtimeAccount=data.account_info;
      LocalStorageService.runtimeAccountMusicians=data.account_musicians;
      
      localStorage.setItem("is_logged","true");
      localStorage.setItem("account_details",JSON.stringify(data.account_info));
      localStorage.setItem("account_musicians",JSON.stringify(data.account_musicians));

      //navigate to battle tab
      this.router.navigate(["/tabs/battle"]);

      /*console.log(`Reading fetched info from localstorage:
      Is logged: ${localStorage.getItem('is_logged')}
      Account Details: ${localStorage.getItem('account_details')}
      Account Musicians: ${localStorage.getItem('account_musicians')}

      Reading from runtime objects:
      Account Details: ${JSON.stringify(LocalStorageService.runtimeAccount)}
      Account Musicias: ${JSON.stringify(LocalStorageService.runtimeAccountMusicians)}`);*/

    })
  }

  private async storeGameAssets()
  {
    this.beService.fetchGameAssets().subscribe(assets=>
    {
      LocalStorageService.runtimeAssets=assets;

      localStorage.setItem("assets",JSON.stringify(assets));
      localStorage.setItem("last_game_assets_query",Date.now().toString());

      /*console.log(`Reading fetched assets:`);
      console.log(localStorage.getItem("assets"));
      console.log(localStorage.getItem("last_game_assets_query"));*/
    })
    
  }

  private areLocalGameAssetsValid():boolean
  {
    var lastQueryStringDate=localStorage.getItem("last_game_assets_query");
    var gameAssetsString=localStorage.getItem("assets");

    //Is localStorage empty?
    if(gameAssetsString==null ||
      lastQueryStringDate==null)
        return false;
    
    //check if date field is valid date
    try
    {
      var lastQueryDate=new Date(lastQueryStringDate);
    }
    catch(err)
    {
      return false;
    }

    //check if the last game data query was more than a week ago
    var sevenDaysAgo=Date.now()-(1000 * 60 * 60 * 24 * 7)
    if(lastQueryDate.getTime() > sevenDaysAgo)
      return false;

    
    //Are asset fields valid?
    try
    {
      var gameAssets=JSON.parse(gameAssetsString);
      LocalStorageService.runtimeAssets=gameAssets;
    }
    catch
    {
      return false
    }

    //if no problem was found then stored assets are valid
    return true;
  }

  private loadAssetsFromLocalStorage()
  {
    //assuming the LocalStorage has valid assets
    LocalStorageService.runtimeAssets=JSON.parse(localStorage.getItem("assets")||"");
  }

  private loadAccountFromLocalStorage()
  {
    //assuming the LocalStorage has valid assets
    LocalStorageService.runtimeAccount=JSON.parse(localStorage.getItem("account_details")||"");
    LocalStorageService.runtimeAccountMusicians=JSON.parse(localStorage.getItem("account_musicians")||"");
  }

  LoginRoutine(id:string)
  {
    //currently I'm going to pretend the local assets are always missing/invalid
    if(this.areLocalGameAssetsValid())
    {
      console.log("Loading assets from LocalStorage")
      this.loadAssetsFromLocalStorage()
    }
    else
    {
      console.log("Fetching assets from BE")
      //fetch assets from BE
      this.storeGameAssets()
    }

    //store data relative to account
    this.storeAccountAssets(id)
    
    
  }

  loadPotentiallyStoredAccount()
  {
    console.log("Checking if an account is stored")
    if(LocalStorageService.isLogged())
    {
      console.log(`Account is stored and will now be loaded
        ${localStorage.getItem("account_details")}
        ${localStorage.getItem("account_musicians")}`)

      LocalStorageService.runtimeAccount=JSON.parse(localStorage.getItem("account_details")||"");
      LocalStorageService.runtimeAccountMusicians=JSON.parse(localStorage.getItem("account_musicians")||"");
    }
    else console.log("account is not stored. I'll do nothing.")
  }

  static isLogged():boolean
  {
    console.log("Hi, I'm debugging the function isLogged()")
    if(localStorage.getItem("is_logged")!="true")
      return false;

    console.log("localStorage('is_logged') is 'true'")

    try
    {
      var account=JSON.parse(localStorage.getItem("account_details")||"");
      var accountMusicians=JSON.parse(localStorage.getItem("account_musicians")||"");
      console.log(`Data read from Local Storage:
        Account: ${JSON.stringify(account)}
        Musicians: ${JSON.stringify(accountMusicians)}`)
    }
    catch
    {
      return false
    }
    console.log(`Validity of the data:
      Account: ${isValidAccountInfoData(account)}
      Musicians: ${Musician.isValidMusicianObj(accountMusicians)}`)

    //last condition, account and accountMusicians must have the right fields
    return isValidAccountInfoData(account) && Musician.isValidMusicianObj(accountMusicians);
  }

  clearLocalStorage()
  {
    localStorage.clear();
    //navigate to battle tab
    this.router.navigate(["login"]);
  }

  logOut()
  {
    localStorage.setItem("is_logged","false");
    LocalStorageService.runtimeAccount=undefined;
    LocalStorageService.runtimeAccountMusicians=undefined;
    localStorage.removeItem("account_details");
    localStorage.removeItem("account_musicians");
    this.router.navigate(["login"]);
  }

  getTechnique(id:string)
  {
    //to implement: [if id is valid tech ID]
    const techToSearch=LocalStorageService.runtimeAssets?.techinques.find(technique=>technique.id===id)
    if(techToSearch!=undefined)
      return techToSearch;
    else
      throw new Error(`Technique with id ${id} not found in runtime assets`);
  }

}

