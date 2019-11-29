import { NgModule } from '@angular/core';
import {MatButtonModule, MatToolbarModule,MatTableModule,MatInputModule, MatSortModule, MatPaginatorModule, MatIconModule, MatTooltipModule, MatCardModule, MatSlideToggleModule, MatListModule, MatMenuModule, MatBadgeModule, MatSpinner, MatProgressSpinnerModule} from '@angular/material'
import {MatFormFieldModule} from '@angular/material/form-field';


const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatCardModule,
  MatListModule,
  MatMenuModule,
  MatBadgeModule,
  MatProgressSpinnerModule,
  MatToolbarModule
]

@NgModule({
  imports: [
  MaterialComponents    
  ],
  exports:[
    MaterialComponents
  ]
})
export class MaterialModule { }
