import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StagePageRoutingModule } from './stage-routing.module';

import { StagePage } from './stage.page';
import { StatBlockModule } from 'src/app/components/stat-block/stat-block.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StagePageRoutingModule,
    StatBlockModule
  ],
  declarations: [StagePage]
})
export class StagePageModule {}
