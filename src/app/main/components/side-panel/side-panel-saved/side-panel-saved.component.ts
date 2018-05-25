import { Component, OnInit } from '@angular/core';
import {DataManagerService} from '../../../../common/services/data-manager.service';

@Component({
  selector: 'app-side-panel-saved',
  templateUrl: './side-panel-saved.component.html',
  styleUrls: ['./side-panel-saved.component.scss']
})
export class SidePanelSavedComponent implements OnInit {
savedDocs:any[];
  constructor(private dataManagerService:DataManagerService) { }

  ngOnInit() {
  //	this.getSavedDocs();
    this.dataManagerService.savedDocsChanged.subscribe((change)=>{
      if(change){
        this.getSavedDocs();
      }
    })
  }


getSavedDocs(){
	let savedDocs;
savedDocs = window.localStorage.getItem('savedDocsResumeBuilder');
if(savedDocs){
	this.savedDocs = JSON.parse(savedDocs);
}
}

onProjectChosen(project){
	this.dataManagerService.changeCurrentProject(project);
}

onProjectDeleted(id){
	this.dataManagerService.deleteSavedDocument(id).then((title)=>{
    alert(`Project ${title} has been deleted`);
  });
  
}

}
