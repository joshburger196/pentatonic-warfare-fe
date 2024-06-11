import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { menuStatus } from 'src/app/models/menuStatus';
import { Musician } from 'src/app/models/musician';
import { Technique } from 'src/app/models/technique';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
  powers:Technique[]=[];
  selectedPower:Technique|undefined;
  targets:Musician[]=[];
  selectedTarget:Musician|undefined;

  constructor(private localStorageService:LocalStorageService) { }

  ngOnInit() {}

  startTurn()
  {
    this.selfStatus=menuStatus.musicianChoice;
    console.log("Turn started!")
  }

  selectMusician(index:number)
  {
    this.selfStatus=menuStatus.powerChoice;
    this.iSelectedMusician=index;
    this.ownBand[this.iSelectedMusician].knownTechniques.forEach(techID=>
    {
      this.powers.push(this.localStorageService.getTechnique(techID))
    })
    console.log("Musician chosen!")
  }

  selectPower(index:number)
  {
    this.selectedPower=this.powers[index];
    if(this.selectedPower.isSingleTarget)
    {
      this.targets=this.opponentBand;
      this.selfStatus=menuStatus.targetChoice;
    }
    else
      this.excecutePower();
  }

  selectTarget(index:number)
  {
    this.selectedTarget=this.targets[index];
    this.excecutePower();
  }

  excecutePower()
  {
    this.selfStatus=menuStatus.musicianAction;
    //sendMoveToBackend to calculate new battleState
    this.iSelectedMusician;
    this.selectedPower;
    this.selectedTarget;

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
    if(this.selfStatus==menuStatus.powerChoice)
    {
      this.iSelectedMusician=-1;
      this.powers=[];
      this.selfStatus=menuStatus.musicianChoice;
    }
    else if(this.selfStatus==menuStatus.targetChoice)
    {
      this.selectedPower=undefined;
      this.targets=[];
      this.selfStatus=menuStatus.powerChoice;
    }
  }
}
