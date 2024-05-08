import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BandStatsViewComponent } from './band-stats-view.component';
import { StatBlockModule } from '../stat-block/stat-block.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatBlockModule
  ],
  declarations: [BandStatsViewComponent],
  exports:[BandStatsViewComponent]
})
export class BandStatsViewModule {}
