import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BandStatsViewComponent } from './band-stats-view.component';
import { StatCardModule } from '../stat-card/stat-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatCardModule
  ],
  declarations: [BandStatsViewComponent],
  exports:[BandStatsViewComponent]
})
export class BandStatsViewModule {}
