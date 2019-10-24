import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCxTk5Wvvoo4DUypKFQ1CyMSnCXJrXEm7I"
    })
  ],
  exports:[
    AgmCoreModule
  ]
})
export class MapKeyModule { }
