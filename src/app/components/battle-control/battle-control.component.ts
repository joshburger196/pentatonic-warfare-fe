import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() ownBand:Musician[]=[];
  @Input() opponentBand:Musician[]=[];

  selfStatus:menuStatus=menuStatus.turnStart;
  iSelectedMusician:number=-1;
  techniques:Technique[]=[];
  selectedTech:Technique|undefined;
  targets:Musician[]=[];
  selectedTarget:Musician|undefined;

  constructor(private localStorageService:LocalStorageService) { }

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
    this.selectedTarget=undefined;
    
    console.log("Turn started!")
  }

  selectMusician(musician:Musician)
  {
    this.selfStatus=menuStatus.techChoice;
    this.iSelectedMusician=this.indexOfMusician(this.ownBand,musician.id);
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
      this.targets=this.opponentBand;
      this.selfStatus=menuStatus.targetChoice;
    }
    else
      this.excecuteTech();
  }

  selectTarget(target:Musician)
  {
    this.selectedTarget=target;
    this.excecuteTech();
  }

  excecuteTech()
  {
    this.selfStatus=menuStatus.musicianAction;

    //Calculate new battleState with BattleService

    this.iSelectedMusician;
    this.selectedTech?.id;
    this.selectedTarget?.id;

    this.ownBand[this.iSelectedMusician].hasAlreadyTakenTurn=true;

    this.nextAction();
  }

  nextAction()
  {

    //Check if there are musicians who haven't acted yet
    var isStillOwnTurn=false;
    this.ownBand.forEach(musician => {
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
    for(var i=0;i<this.ownBand.length;i++)
      this.ownBand[i].hasAlreadyTakenTurn=false;

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

  indexOfMusician(band:Musician[], id:string):number
  {
    for(let i=0;i<band.length;i++)
      if(band[i].id===id)
        return i;
    throw new Error(`Musician with id ${id} not found. Band: ${JSON.stringify(band)}`);
  }
}
