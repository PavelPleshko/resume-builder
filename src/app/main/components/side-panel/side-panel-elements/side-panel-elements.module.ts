import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import {ElementsListComponent} from './elements-list/elements-list.component';
import {ElementSingleComponent} from './element-single/element-single.component';
import {SidePanelElementsComponent} from './side-panel-elements.component';
import { ElementsMenuComponent } from './elements-menu/elements-menu.component';
import { ElementMenuSingleComponent } from './element-menu-single/element-menu-single.component';

export const ROUTES:Routes = [
{path:'',component:SidePanelElementsComponent}
];

@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(ROUTES)
  ],
  declarations: [SidePanelElementsComponent,ElementsListComponent,ElementSingleComponent, ElementsMenuComponent, ElementMenuSingleComponent],
  exports:[]
})
export class SidePanelElementsModule { }
