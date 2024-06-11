import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BeService } from './be-service.service';
import { Technique } from '../models/technique';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  allTechniques:Technique[]=[];

  constructor(private beService:BeService, private router:Router) { }

  private storeAccountData(id:string)
  {
    //Store account details
    this.beService.fetchAccountDetails(id).subscribe(account =>
    {
      localStorage.setItem("isLogged","true");
      localStorage.setItem("account-object",JSON.stringify(account));

      console.log(`Reading fetched info from localstorage:
      ${localStorage.getItem('account-object')}`);
    })

    //Store account musicians
    this.beService.fetchAccountMusicians(id).subscribe(musicians =>
    {
      localStorage.setItem("owned-musicians",JSON.stringify(musicians));

      console.log(`Reading fetched info from localstorage:
      ${localStorage.getItem('owned-musicians')}`);

    })
  }

  private storeGameAssets()
  {
    this.beService.fetchGameAssets().subscribe(assets=>
    {
      this.allTechniques=assets.techinques;

      localStorage.setItem("techniques",JSON.stringify(assets.techinques));
      localStorage.setItem("last-game-assets-query",Date.now().toString());

      console.log(`Reading fetched assets:`);
      console.log(localStorage.getItem("techniques"));
      console.log(localStorage.getItem("last-game-assets-query"));
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
    if(!this.areLocalGameAssetsValid())
    {
      //fetch assets from BE
      this.storeGameAssets()
    }

    //store data relative to account
    //this.storeAccountData(id)
    
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
    const techToSearch=this.allTechniques.find(technique=>technique.id===id)
    if(techToSearch!=undefined)
      return techToSearch;
    else
      throw new Error(`Technique with id ${id} not found in local storage`);
  }

}

