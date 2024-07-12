import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Battle } from 'src/app/models/battle';
import { menuStatus } from 'src/app/models/menuStatus';
import { Musician } from 'src/app/models/musician';
import { Technique } from 'src/app/models/technique';
import { BattleService } from 'src/app/services/battle-service.service';
import { IndexOfMusicianService } from 'src/app/services/index-of-musician.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { getRarity } from 'src/assets/static-data/rarities';

@Component({
  selector: 'app-battle-control',
  templateUrl: './battle-control.component.html',
  styleUrls: ['./battle-control.component.scss'],
})
export class BattleControlComponent  implements OnInit {
  @Input() battle:Battle=new Battle([],[]);

  selfStatus:menuStatus=menuStatus.turnStart;
  iSelectedMusician:number=-1;
  techniques:Technique[]=[];
  selectedTech:Technique|undefined;
  targets:Musician[]=[];
  iSelectedTarget:number=-1;
  selectedTarget:Musician|undefined;

  constructor(
    private localStorageService:LocalStorageService,
    private battleService:BattleService,
    private iomService:IndexOfMusicianService
  ) { }

  ngOnInit() {}

  getRarity(id:string)
  {
    return getRarity(id);
  }

  startTurn()
  {
    this.selfStatus=menuStatus.musicianChoice;

    //reset all values, just in case
    this.iSelectedMusician=-1;
    this.techniques=[];
    this.selectedTech=undefined;
    this.targets=[];
    this.iSelectedTarget=-1;
    this.selectedTarget=undefined;
    
    console.log("Turn started!")
  }

  selectMusician(musician:Musician)
  {
    this.selfStatus=menuStatus.techChoice;
    this.iSelectedMusician=this.iomService.indexOfMusician(this.battle.band1,musician.id);
    musician.knownTechniques.forEach(techID=>
    {
      this.techniques.push(this.localStorageService.getTechnique(techID))
    })
    console.log("Musician chosen!")
  }

  selectTechnique(technique:Technique)
  {
    this.selectedTech=technique;
    if(this.selectedTech.isOpponentSingleTarget)
    {
      this.targets=this.battle.band2;
      this.selfStatus=menuStatus.targetChoice;
    }
    else
      this.executeTech();
  }

  selectTarget(target:Musician)
  {
    this.selectedTarget=target;
    this.iSelectedTarget=this.iomService.indexOfMusician(this.targets,target.id);
    this.executeTech();
  }

  executeTech()
  {
    this.selfStatus=menuStatus.musicianAction;

    //Calculate new battleState with BattleService
    if(this.selectedTech!=undefined)
      this.battleService.executeTech(this.battle,this.iSelectedMusician,this.selectedTech.id,this.iSelectedTarget);

    this.battle.band1[this.iSelectedMusician].hasAlreadyTakenTurn=true;

    this.nextAction();
  }

  nextAction()
  {

    //Check if there are musicians who haven't acted yet
    var isStillOwnTurn=false;
    this.battle.band1.forEach(musician => {
      if(!musician.hasAlreadyTakenTurn)
        isStillOwnTurn=true;
    });

    if(isStillOwnTurn)
      this.startTurn();
    else
      this.endTurn();
  }

  endTurn()
  {
    //reset turn status for all musicians
    for(var i=0;i<this.battle.band1.length;i++)
      this.battle.band1[i].hasAlreadyTakenTurn=false;

    this.selfStatus=menuStatus.turnEnd;
  }

  goBack()
  {
    if(this.selfStatus==menuStatus.techChoice)
    {
      this.iSelectedMusician=-1;
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
