import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GenreChipModule } from '../genre-chip/genre-chip.module';
import { TechCardComponent } from './tech-card.component';
import { CustomCardModule } from '../custom-card/custom-card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreChipModule,
    CustomCardModule
  ],
  declarations: [TechCardComponent],
  exports:[TechCardComponent]
})
export class TechCardModule {}
