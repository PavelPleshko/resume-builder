import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkPanelComponent } from './components/work-panel/work-panel.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../common/shared.module';
import { SidePanelModule } from './components/side-panel/side-panel.module';
import { ContentModule } from './components/content/content.module';

@NgModule({
  imports: [
    CommonModule,NgbModule,SharedModule,SidePanelModule,ContentModule
  ],
  declarations: [WorkPanelComponent],
  exports:[WorkPanelComponent,SidePanelModule,ContentModule]
})
export class MainModule { }
