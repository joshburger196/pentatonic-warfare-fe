import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GenreChipModule } from '../genre-chip/genre-chip.module';
import { PowerBlockComponent } from './power-block.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreChipModule
  ],
  declarations: [PowerBlockComponent],
  exports:[PowerBlockComponent]
})
export class PowerBlockModule {}
