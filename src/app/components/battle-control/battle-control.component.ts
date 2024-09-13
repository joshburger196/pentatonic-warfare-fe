import { Component, Input, OnInit } from '@angular/core';
import { Battle } from 'src/app/models/battle';
import { menuStatus } from 'src/app/models/menuStatus';
import { Musician } from 'src/app/models/musician';
import { Technique } from 'src/app/models/technique';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { getRarity } from 'src/assets/static-data/rarities';

@Component({
  selector: 'app-battle-control',
  templateUrl: './battle-control.component.html',
  styleUrls: ['./battle-control.component.scss'],
})
export class BattleControlComponent  implements OnInit {
  @Input("battle") battle!:Battle;

  selfStatus:menuStatus=menuStatus.turnStart;

  playerBandId="";
  opponentBandId="";
  
  idSelectedMusician:string="";
  techniques:Technique[]=[];
  selectedTech:Technique|undefined;
  targets:Musician[]=[];
  idSelectedTarget:string="";
  selectedTarget:Musician|undefined;

  resultMsgs:string[]=[];
  iResultMsg:number=0;

  constructor(
  )
  {
    let accountId=LocalStorageService.runtimeAccount?.id
    
    console.log(`I'm battle-control's constructor and the battle object is:
      ${JSON.stringify(this.battle)}`)

    if(this.battle.atkBand.ownerId===accountId)
    {
      this.playerBandId=this.battle.atkBand.id;
      this.opponentBandId=this.battle.defBand.id;
    }

    else if(this.battle.defBand.ownerId===accountId)
    {
      this.playerBandId=this.battle.defBand.id;
      this.opponentBandId=this.battle.atkBand.id;
    } 
  }

  ngOnInit() {}

  getRarity(id:string)
  {
    return getRarity(id);
  }

  startTurn()
  {
    this.selfStatus=menuStatus.musicianChoice;

    //reset all values, just in case
    this.idSelectedMusician="";
    this.techniques=[];
    this.selectedTech=undefined;
    this.targets=[];
    this.idSelectedTarget="";
    this.selectedTarget=undefined;
    this.resultMsgs=[];
    this.iResultMsg=0;
    
    console.log("Turn started!")
  }

  selectMusician(musician:Musician)
  {
    this.selfStatus=menuStatus.techChoice;
    this.idSelectedMusician=musician.id;
    musician.knownTechniques.forEach(techID=>
    {
      this.techniques.push(LocalStorageService.getTechnique(techID))
    })
    console.log("Musician chosen!")
  }

  selectTechnique(technique:Technique)
  {
    this.selectedTech=technique;
    if(this.selectedTech.isOpponentSingleTarget)
    {
      this.targets=this.battle.getMusiciansByBand(this.opponentBandId);
      this.selfStatus=menuStatus.targetChoice;
    }
    else
      this.executeTech();
  }

  selectTarget(target:Musician)
  {
    this.selectedTarget=target;
    this.idSelectedTarget=target.id;
    this.executeTech();
  }

  executeTech()
  {
    //Calculate new battle state with BattleService
    if(this.selectedTech!=undefined)
    {
      /*this.battle
      this.resultMsgs;
      this.iResultMsg=-1;*/
    }

    this.displayResults();
  }

  displayResults()
  {
    if(this.iResultMsg>=this.resultMsgs.length)
      this.nextAction();
    else
    {
      this.selfStatus=menuStatus.displayResults;
      this.iResultMsg++;
    }
  }

  nextAction()
  {

    //Check if there are musicians who haven't acted yet
    /*var isStillOwnRound=false;
    this.battle.band1.forEach(musician => {
      if(!musician.hasAlreadyTakenTurn)
        isStillOwnRound=true;
    });*/

    if(true)
      this.startTurn();
    else
      this.endTurn();
  }

  endTurn()
  {
    //reset turn status for all musicians
    /*for(var i=0;i<this.battle.atkBand.musicians.length;i++)
      this.battle.atkBand.musicians[i].hasAlreadyTakenTurn=false;*/

    this.selfStatus=menuStatus.turnEnd;
  }

  goBack()
  {
    if(this.selfStatus==menuStatus.techChoice)
    {
      this.idSelectedMusician="";
      this.techniques=[];
      this.selfStatus=menuStatus.musicianChoice;
    }
    else if(this.selfStatus==menuStatus.targetChoice)
    {
      this.selectedTech=undefined;
      this.targets=[];
      this.selfStatus=menuStatus.techChoice;
    }
  }
}
