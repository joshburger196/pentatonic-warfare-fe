import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StatBlockComponent } from './stat-block.component';
import { GenreChipModule } from '../genre-chip/genre-chip.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreChipModule
  ],
  declarations: [StatBlockComponent],
  exports:[StatBlockComponent]
})
export class StatBlockModule {}
