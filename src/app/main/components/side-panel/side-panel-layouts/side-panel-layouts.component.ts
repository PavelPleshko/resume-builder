import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import {pluck,distinctUntilChanged} from 'rxjs/operators';
import {DataManagerService,AppState} from '../../../../common/services/data-manager.service';
@Component({
  selector: 'app-side-panel-layouts',
  templateUrl: './side-panel-layouts.component.html',
  styleUrls: ['./side-panel-layouts.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SidePanelLayoutsComponent implements OnInit {
layouts;
  constructor(private dataManager:DataManagerService) { }

  ngOnInit() {
  	 	this.dataManager.data.pipe(pluck('layouts'),distinctUntilChanged()).subscribe((layouts)=>{
  		this.layouts=layouts;
  	})
  }

  onChooseTemplate(templateId:string){
    if(!templateId) return;
    this.dataManager.chooseLayout(templateId);
  }

}
