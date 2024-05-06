import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GenreChipComponent } from './genre-chip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [GenreChipComponent],
  exports:[GenreChipComponent]
})
export class GenreChipModule {}
