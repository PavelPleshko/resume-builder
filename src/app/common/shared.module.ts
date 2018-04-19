import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Draggable } from './directives/draggable.directive';
import { Resizable } from './directives/resizeable.directive';
import { Streachable } from './directives/streachable.directive';
import { Rotatable } from './directives/rotatable.directive';
import { CustomSelectInputComponent } from './components/custom-select-input/custom-select-input.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ColorCircleModule } from 'ngx-color/circle';
import { ColorSketchModule } from 'ngx-color/sketch';
import { CustomColorPickerComponent } from './components/custom-color-picker/custom-color-picker.component';
import {ContentService} from './services/content.service';

@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,NgbModule,ColorCircleModule,ColorSketchModule
  ],
  declarations: [Draggable,Resizable,Streachable,Rotatable,CustomSelectInputComponent,CustomColorPickerComponent],
  exports:[FormsModule,ReactiveFormsModule,Draggable,Resizable,Streachable,Rotatable,
  CustomSelectInputComponent,CustomColorPickerComponent,
  NgbModule,ColorCircleModule,ColorSketchModule]

})
export class SharedModule {
static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ContentService ]
    };
  }
   }
