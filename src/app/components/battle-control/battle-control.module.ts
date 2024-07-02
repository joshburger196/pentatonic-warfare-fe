import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BattleControlComponent } from './battle-control.component';
import { CaptionComponent } from './caption/caption.component';
import { StatBlockModule } from '../stat-block/stat-block.module';
import { PowerBlockModule } from '../power-block/power-block.module';
import { CustomCardModule } from '../custom-card/custom-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatBlockModule,
    PowerBlockModule,
    CustomCardModule
  ],
  declarations: [BattleControlComponent,CaptionComponent],
  exports:[BattleControlComponent]
})
export class BattleControlModule {}
