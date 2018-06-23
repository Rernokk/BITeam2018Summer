import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatChipsModule,
  MatListModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTabsModule,
  MatMenuModule,
  MatTableModule,
  MatAutocompleteModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatNativeDateModule,
    MatTableModule,
    MatAutocompleteModule
  ]
})

export class MaterialModule { }
