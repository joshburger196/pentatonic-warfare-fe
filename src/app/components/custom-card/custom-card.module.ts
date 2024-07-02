import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomCardComponent } from './custom-card.component';
import { GenreChipModule } from '../genre-chip/genre-chip.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    GenreChipModule
  ],
  declarations: [CustomCardComponent],
  exports:[CustomCardComponent]
})
export class CustomCardModule {}
