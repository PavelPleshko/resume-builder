import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-panel-saved',
  templateUrl: './side-panel-saved.component.html',
  styleUrls: ['./side-panel-saved.component.scss']
})
export class SidePanelSavedComponent implements OnInit {
savedDocs:any[];
  constructor() { }

  ngOnInit() {
  	this.getSavedDocs();
  }


getSavedDocs(){
	let savedDocs;
savedDocs = window.localStorage.getItem('savedDocsResumeBuilder');
if(savedDocs){
	this.savedDocs = JSON.parse(savedDocs);
}
console.log(this.savedDocs);
}
}
