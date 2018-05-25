import { Component, OnInit,Input,ChangeDetectionStrategy,HostListener,EventEmitter,Output} from '@angular/core';


@Component({
  selector: 'app-saved-list-single',
  templateUrl: './saved-list-single.component.html',
  styleUrls: ['./saved-list-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SavedListSingleComponent implements OnInit {
@Input() item;
@Output() chooseProject = new EventEmitter();
@Output() deleteProject = new EventEmitter();



  constructor() { }

  ngOnInit() {
  }


addProjectToThePanel(){
this.chooseProject.emit(this.item);
}


  deleteDocument(){
  	this.deleteProject.emit(this.item.id);
  }

}
