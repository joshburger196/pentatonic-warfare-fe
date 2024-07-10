import { Component, OnInit } from '@angular/core';
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

  ally1:Musician=new Musician("M0000000",genreId.rock,Instrument.guitar,"R000","","Ally1","",this.powerIdArray,0,1,this.stats)
  ally2:Musician=new Musician("M0000001",genreId.metal,Instrument.guitar,"R000","","Ally2","",this.powerIdArray,0,1,this.stats)
  ally3:Musician=new Musician("M0000002",genreId.rock,Instrument.guitar,"R000","","Ally3","",this.powerIdArray,0,1,this.stats)
  ally4:Musician=new Musician("M0000003",genreId.rock,Instrument.guitar,"R000","","Ally4","",this.powerIdArray,0,1,this.stats)
  
  ownBand:Musician[]=[this.ally1,this.ally2,this.ally3,this.ally4]

  opponent1:Musician=new Musician("M0000000",genreId.rock,Instrument.guitar,"R000","","opp1","",this.powerIdArray,0,1,this.stats)
  opponent2:Musician=new Musician("M0000001",genreId.rock,Instrument.guitar,"R001","","opp2","",this.powerIdArray,0,1,this.stats)
  opponent3:Musician=new Musician("M0000002",genreId.rock,Instrument.guitar,"R001","","opp3","",this.powerIdArray,0,1,this.stats)
  opponent4:Musician=new Musician("M0000003",genreId.rock,Instrument.guitar,"R001","","opp4","",this.powerIdArray,0,1,this.stats)

  opponentBand:Musician[]=[this.opponent1,this.opponent2,this.opponent3,this.opponent4]

  battleStateObj={"ownBand":this.ownBand,"opponentBand":this.opponentBand,"turn":"own"};

  constructor()
  {
  }

  ngOnInit()
  {
    this.musicianList=LocalStorageService.runtimeAccountMusicians;
    this.ownBand[0]=this.musicianList[0];
    this.ownBand[1]=this.musicianList[1];
    this.ownBand[2]=this.musicianList[2];
    this.ownBand[3]=this.musicianList[3];
  }

}
