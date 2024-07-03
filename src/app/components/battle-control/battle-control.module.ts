import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BattleControlComponent } from './battle-control.component';
import { CaptionComponent } from './caption/caption.component';
import { StatCardModule } from '../stat-card/stat-card.module';
import { CustomCardModule } from '../custom-card/custom-card.module';
import { TechCardModule } from '../tech-card/tech-card.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatCardModule,
    TechCardModule,
    CustomCardModule
  ],
  declarations: [BattleControlComponent,CaptionComponent],
  exports:[BattleControlComponent]
})
export class BattleControlModule {}
