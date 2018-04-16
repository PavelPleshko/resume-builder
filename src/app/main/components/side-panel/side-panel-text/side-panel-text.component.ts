import { Component, OnInit } from '@angular/core';
import {defaultTextAssets,additionalTextElements} from '../../../../common/builder-assets/text-assets';
import {ILayoutElement,DataManagerService} from '../../../../common/services/data-manager.service';

@Component({
  selector: 'app-side-panel-text',
  templateUrl: './side-panel-text.component.html',
  styleUrls: ['./side-panel-text.component.scss']
})
export class SidePanelTextComponent implements OnInit {
defaultElements:ILayoutElement[];
extraElements:ILayoutElement[];
  constructor(private dataManager:DataManagerService) { }

  ngOnInit() {
  	this.defaultElements = defaultTextAssets;
  	this.extraElements = additionalTextElements;
  }


onAddElement(element:ILayoutElement){
this.dataManager.addNewElement(element);
}
}
