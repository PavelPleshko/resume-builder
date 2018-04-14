import { Component, OnInit,Input,AfterViewInit,ChangeDetectionStrategy } from '@angular/core';
import {DataManagerService} from '../../../common/services/data-manager.service';
import {pluck,distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-work-panel',
  templateUrl: './work-panel.component.html',
  styleUrls: ['./work-panel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WorkPanelComponent implements OnInit {
@Input() statusSaved:string = 'All changes saved';
documentTitle:string = 'Untitled';
currentTooltipValue:string = 'Click here to change title';
editMode:boolean = false;
  constructor(private dataService:DataManagerService) { }

  ngOnInit() {
  	this.dataService.data.pipe(pluck('documentTitle'),distinctUntilChanged()).subscribe((title:string)=>{
  		this.documentTitle = title;
  	})
  }

enterEditMode(){
	if(!this.editMode){
		this.currentTooltipValue='';
		this.editMode = true;
		
	}

}
exitEditMode(){
	if(this.editMode){
		this.currentTooltipValue = 'Click here to change title';
		this.editMode = false;
	
	}
}

saveTitle(newTitle){
this.exitEditMode();
if(this.documentTitle != newTitle){
	this.dataService.updateTitle(this.documentTitle);
}

}
}
