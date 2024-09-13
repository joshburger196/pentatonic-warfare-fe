import { Component, Input, OnInit } from '@angular/core';
import { Band } from 'src/app/models/band';
import { Battle } from 'src/app/models/battle';
import { genreId } from 'src/app/models/genreEnum';
import { Instrument } from 'src/app/models/instrument';
import { Musician } from 'src/app/models/musician';
import { Stats } from 'src/app/models/stats';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.page.html',
  styleUrls: ['./stage.page.scss'],
})
export class StagePage implements OnInit {

  //static declarations for testing
  ownedMusicianList:Musician[]=[];
  powerIdArray:string[]=["T100","T101","T102","T103"];
  stats:Stats=new Stats(20,10,10,10,100);
  opponent1:Musician=new Musician("M00000000000",genreId.rock,Instrument.guitar,"R000","","A00000000000","opp1","",this.powerIdArray,0,1,this.stats)
  opponent2:Musician=new Musician("M00000000001",genreId.rock,Instrument.guitar,"R001","","A00000000000","opp2","",this.powerIdArray,0,1,this.stats)
  opponent3:Musician=new Musician("M00000000002",genreId.pop,Instrument.guitar,"R001","","A00000000000","opp3","",this.powerIdArray,0,1,this.stats)
  opponent4:Musician=new Musician("M00000000003",genreId.rock,Instrument.guitar,"R001","","A00000000000","opp4","",this.powerIdArray,0,1,this.stats)
  opponents:Musician[]=[this.opponent1,this.opponent2,this.opponent3,this.opponent4]
  atkBand:Band|null=null;
  defBand:Band|null=null;

  battle:Battle|null=null;

  constructor(){
    this.ownedMusicianList=LocalStorageService.runtimeAccountMusicians;
    
    this.defBand=new Band("B00000000000","Band0","A00000000000",
      [this.opponents[0].id,this.opponents[1].id,this.opponents[2].id,this.opponents[3].id])

    this.atkBand=new Band("B00000000001","Band1","A00000000001",
      [this.ownedMusicianList[0].id,this.ownedMusicianList[1].id,this.ownedMusicianList[2].id,this.ownedMusicianList[3].id])

    
    this.battle=new Battle(this.atkBand,this.defBand);
    console.log("this.battle in stage comp constr:")
    console.log(this.battle)

  }

  ngOnInit(){}

  getOpponentBand():Musician[]
  {
    let accountId=LocalStorageService.runtimeAccount!.id
    if(accountId!=undefined && this.battle!=null)
      return this.battle.getOpponentsOfOwner(accountId);
    return []
  }

}
