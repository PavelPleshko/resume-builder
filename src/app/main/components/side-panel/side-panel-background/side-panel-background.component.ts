import { Component, OnInit } from '@angular/core';
import {poorColors,vividColors,gradients} from '../../../../common/styleOptions/default-colors';
import {DataManagerService} from '../../../../common/services/data-manager.service';
import {pluck} from 'rxjs/operators/pluck';

@Component({
  selector: 'app-side-panel-background',
  templateUrl: './side-panel-background.component.html',
  styleUrls: ['./side-panel-background.component.scss']
})
export class SidePanelBackgroundComponent implements OnInit {
vividColors:any;
poorColors:any;
gradientColors:any;

currentBgColor:string;
  constructor(private dataManager:DataManagerService) { }

  ngOnInit() {
  	this.vividColors = vividColors;
  	this.poorColors = poorColors;
  	this.gradientColors = gradients;
  	this.dataManager.data.pipe(pluck('activeLayout')).subscribe((layout:any)=>{
  		if(layout){
  			this.currentBgColor = layout.background;
  		};
  	});
  }


onChooseBgColor(opts:object){
	if(opts && opts['gradient']){
		this.dataManager.changeBgColor(opts['color'].className,true);
	}else{
		this.dataManager.changeBgColor(opts['color'].rgb,false);
	}

}
}
