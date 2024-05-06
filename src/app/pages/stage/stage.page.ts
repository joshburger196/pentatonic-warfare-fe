import { Component, OnInit } from '@angular/core';
import { Effect } from 'src/models/effect';
import { genreId } from 'src/models/genreEnum';
import { Instrument } from 'src/models/instrument';
import { Musician } from 'src/models/musician';
import { Power } from 'src/models/power';
import { Stats } from 'src/models/stats';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.page.html',
  styleUrls: ['./stage.page.scss'],
})
export class StagePage implements OnInit {

  power1:Power=new Power("Pentatonic Solo",genreId.blues,"Basic scales!",10,true,null,null,null,null,null);
  power2:Power=new Power("The 4 Chords",genreId.pop,"CAGED chords!",2,false,Effect.confuseBand,50,null,2,null);
  power3:Power=new Power("Amp Feedback",genreId.metal,"About to get heavy...",2,false,Effect.defDownBand,80,20,2,null);
  power4:Power=new Power("Power Chords",genreId.rock,"Thicken the rythm section!",4,false,null,null,null,null,null)
  powerArray:Power[]=[this.power1,this.power2,this.power3,this.power4];

  stats:Stats=new Stats(20,10,10,100);

  ally1:Musician=new Musician("Ally1",genreId.rock,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)
  ally2:Musician=new Musician("Ally2",genreId.metal,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)
  ally3:Musician=new Musician("Ally3",genreId.rock,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)
  ally4:Musician=new Musician("Ally4",genreId.rock,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)
  
  ownBand:Musician[]=[this.ally1,this.ally2,this.ally3,this.ally4]

  opponent1:Musician=new Musician("Opponent1",genreId.metal,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)
  opponent2:Musician=new Musician("Opponent2",genreId.rock,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)
  opponent3:Musician=new Musician("Opponent3",genreId.metal,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)
  opponent4:Musician=new Musician("Opponent4",genreId.metal,null,Instrument.guitar,null,this.powerArray,this.powerArray,0,1,this.stats,this.stats)

  opponentBand:Musician[]=[this.opponent1,this.opponent2,this.opponent3,this.opponent4]

  constructor() { }

  ngOnInit() {
  }

}
