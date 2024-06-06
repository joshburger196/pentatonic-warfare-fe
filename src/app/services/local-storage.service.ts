import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BeService } from './be-service.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

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

  private storeGameAssets(id:string)
  {
    this.beService.fetchAllTechniques().subscribe(techniques=>
    {
      localStorage.setItem("techniques",JSON.stringify(techniques));
      localStorage.setItem("last-game-assets-query",Date.now().toString());
      this.storeAccountData(id);
      console.log(`Reading fetched assets:`)
    })
    
  }

  private checkLocalGameAssets(id:string)
  {
    //check if all game assets are stored
    if(localStorage.getItem("techniques")===null)
    {
      this.storeGameAssets(id);
    }
    else
    {
      //check if the last game data query was more than a week ago
      const storedDateString=localStorage.getItem("last-game-assets-query")
      if(storedDateString!=null)
      {
        const lastGameAssetsQuery:Date=new Date(storedDateString)
        if(lastGameAssetsQuery.getTime() < Date.now()-(1000 * 60 * 60 * 24 * 7))
          this.storeGameAssets(id)
        else
        {
          this.storeAccountData(id);
        }
      }
    }
  }

  storeAllData(id:string)
  {
    this.checkLocalGameAssets(id)

    //store data relative to account
    

    
    
    //navigate to battle tab
    this.router.navigate(["/tabs/battle"]);
  }
  
  clearLocalStorage()
  {
    localStorage.clear();
    //navigate to battle tab
    this.router.navigate(["login"]);
  }


}

