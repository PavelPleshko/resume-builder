import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SidePanelComponent} from './side-panel.component';
import { SidePanelMenuComponent } from './side-panel-menu/side-panel-menu.component';
import { SidePanelLayoutsComponent } from './side-panel-layouts/side-panel-layouts.component';
import { SidePanelSavedComponent } from './side-panel-saved/side-panel-saved.component';
import { SidePanelBackgroundComponent } from './side-panel-background/side-panel-background.component';
import {RouterModule,Routes} from '@angular/router';
import { SidePanelTextComponent } from './side-panel-text/side-panel-text.component';
import { LayoutsListComponent } from './side-panel-layouts/layouts-list/layouts-list.component';
import { LayoutSingleComponent } from './side-panel-layouts/layout-single/layout-single.component';
import { ColorsListComponent } from './side-panel-background/colors-list/colors-list.component';
import { ColorSingleComponent } from './side-panel-background/color-single/color-single.component';
import {SharedModule} from '../../../common/shared.module';
import { TextElementsListComponent } from './side-panel-text/text-elements-list/text-elements-list.component';
import { TextElementComponent } from './side-panel-text/text-element/text-element.component';
import { SavedListComponent } from './side-panel-saved/saved-list/saved-list.component';
import { SavedListSingleComponent } from './side-panel-saved/saved-list-single/saved-list-single.component';




const Routes:Routes = [
{path:'',pathMatch:'full',component:SidePanelLayoutsComponent},
{path:'elements',loadChildren:'./side-panel-elements/side-panel-elements.module#SidePanelElementsModule'},
{path:'text',component:SidePanelTextComponent},
{path:'colors',component:SidePanelBackgroundComponent},
{path:'saved',component:SidePanelSavedComponent}
];

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(Routes),SharedModule
  ],
  declarations: [SidePanelComponent, SidePanelMenuComponent,
   SidePanelLayoutsComponent,
   SidePanelSavedComponent, SidePanelBackgroundComponent,
    SidePanelTextComponent, LayoutsListComponent,
     LayoutSingleComponent, ColorsListComponent,
      ColorSingleComponent,
      TextElementsListComponent,
      TextElementComponent,
      SavedListComponent,
      SavedListSingleComponent
      ],
  exports:[SidePanelComponent],
})
export class SidePanelModule { }
