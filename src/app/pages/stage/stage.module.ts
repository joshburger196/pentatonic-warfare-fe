import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StagePageRoutingModule } from './stage-routing.module';

import { StagePage } from './stage.page';
import { StatCardModule } from 'src/app/components/stat-card/stat-card.module';
import { StageScreenModule } from 'src/app/components/stage-screen/stage-screen.module';
import { BattleControlModule } from 'src/app/components/battle-control/battle-control.module';
import { BandStatsViewModule } from 'src/app/components/band-stats-view/band-stats-view.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StagePageRoutingModule,
    StatCardModule,
    StageScreenModule,
    BattleControlModule,
    BandStatsViewModule
  ],
  declarations: [StagePage]
})
export class StagePageModule {}
