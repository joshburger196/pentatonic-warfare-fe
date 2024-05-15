import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { menuStatus } from 'src/models/menuStatus';
import { Musician } from 'src/models/musician';
import { Power } from 'src/models/power';

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
  powers:Power[]=[];
  selectedPower:Power|undefined;
  targets:Musician[]=[];
  selectedTarget:Musician|undefined;

  constructor() { }

  ngOnInit() {}

  startTurn()
  {
    this.selfStatus=menuStatus.musicianChoice;
    console.log("Turn started!")
  }

  chooseMusician(index:number)
  {
    this.selfStatus=menuStatus.powerChoice;
    this.iSelectedMusician=index;
    this.powers=this.ownBand[this.iSelectedMusician].knownPowers;
    console.log("Musician chosen!")
  }

  choosePower(index:number)
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

  chooseTarget(index:number)
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
