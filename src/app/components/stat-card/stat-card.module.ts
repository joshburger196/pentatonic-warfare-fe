import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StatBlockComponent as StatCardComponent } from './stat-card.component';
import { GenreChipModule } from '../genre-chip/genre-chip.module';
import { CustomCardModule } from '../custom-card/custom-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreChipModule,
    CustomCardModule
  ],
  declarations: [StatCardComponent],
  exports:[StatCardComponent]
})
export class StatCardModule {}
