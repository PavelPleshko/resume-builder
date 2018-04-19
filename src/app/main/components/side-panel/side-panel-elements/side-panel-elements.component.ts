import { Component, OnInit} from '@angular/core';
import {svgShapeElements,svgLineElements} from '../../../../common/builder-assets/svg-assets';
import {DataManagerService} from '../../../../common/services/data-manager.service';

@Component({
  selector: 'app-side-panel-elements',
  templateUrl: './side-panel-elements.component.html',
  styleUrls: ['./side-panel-elements.component.scss']
})
export class SidePanelElementsComponent implements OnInit {
  constructor(private dataManager:DataManagerService) { }

  ngOnInit() {
  
  }

onChooseElement(element){
this.dataManager.addNewElement(element,'svg');
}

assignElements(keyword){
	switch (keyword) {
		case "shapes":
			this.dataManager.changeActiveSetOfElements(svgShapeElements);
			break;
		case "lines":
			this.dataManager.changeActiveSetOfElements(svgLineElements);
			break;
	}
}
}
