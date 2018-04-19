import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ContentComponent} from './content.component';
import { ContentCanvasComponent } from './content-canvas/content-canvas.component';
import { ContentCanvasElementComponent } from './content-canvas-element/content-canvas-element.component';
import {SharedModule} from '../../../common/shared.module';
import { CanvasWorkPanelComponent } from './canvas-work-panel/canvas-work-panel.component';
import { NgxSliderMobyModule } from 'ngx-slider-moby/slider';
import { ContentCanvasSvgComponent } from './content-canvas-svg/content-canvas-svg.component';
import { SvgWorkPanelComponent } from './svg-work-panel/svg-work-panel.component';
@NgModule({
  imports: [
    CommonModule,SharedModule.forRoot(),NgxSliderMobyModule
  ],
  declarations: [ContentComponent, ContentCanvasComponent, ContentCanvasElementComponent, CanvasWorkPanelComponent, ContentCanvasSvgComponent, SvgWorkPanelComponent],
  exports:[ContentComponent]
})
export class ContentModule { }
