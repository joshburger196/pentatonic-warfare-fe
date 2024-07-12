import { Component, OnInit } from '@angular/core';
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

  musicianList:Musician[]=[];

  powerIdArray:string[]=["T100","T101","T102","T103"];

  stats:Stats=new Stats(20,10,10,10,100);


  opponent1:Musician=new Musician("M0000000",genreId.rock,Instrument.guitar,"R000","","opp1","",this.powerIdArray,0,1,this.stats)
  opponent2:Musician=new Musician("M0000001",genreId.rock,Instrument.guitar,"R001","","opp2","",this.powerIdArray,0,1,this.stats)
  opponent3:Musician=new Musician("M0000002",genreId.pop,Instrument.guitar,"R001","","opp3","",this.powerIdArray,0,1,this.stats)
  opponent4:Musician=new Musician("M0000003",genreId.rock,Instrument.guitar,"R001","","opp4","",this.powerIdArray,0,1,this.stats)

  opponentBand:Musician[]=[this.opponent1,this.opponent2,this.opponent3,this.opponent4]

  battle:Battle;

  constructor()
  {
    this.battle=new Battle([],[])
  }

  ngOnInit()
  {
    this.musicianList=LocalStorageService.runtimeAccountMusicians;
    this.battle.band1=[this.musicianList[0],this.musicianList[1],this.musicianList[2],this.musicianList[3]];
    this.battle.band2=this.opponentBand;
  }

}
