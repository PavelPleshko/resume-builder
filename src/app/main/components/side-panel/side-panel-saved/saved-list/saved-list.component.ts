import { Component,Input,ChangeDetectionStrategy,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-saved-list',
  templateUrl: './saved-list.component.html',
  styleUrls: ['./saved-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SavedListComponent {
@Input() items;
@Output() projectDeleted = new EventEmitter();
@Output() projectChosen = new EventEmitter();

  constructor() { }


onChooseProject(project){
this.projectChosen.emit(project);
}

onDeleteProject(id){
		this.projectDeleted.emit(id);
}
}
