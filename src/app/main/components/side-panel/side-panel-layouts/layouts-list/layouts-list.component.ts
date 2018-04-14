import { Component,Input,ChangeDetectionStrategy,EventEmitter,Output } from '@angular/core';
import {listAnimationStagger} from '../../../../../common/animations';

@Component({
  selector: 'app-layouts-list',
  templateUrl: './layouts-list.component.html',
  styleUrls: ['./layouts-list.component.scss'],
  animations:[listAnimationStagger],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LayoutsListComponent {
@Input() layouts:any;
@Output() chooseTemplate:EventEmitter<string> = new EventEmitter();
  constructor() { }

onChooseTemplate(templateId:string){
this.chooseTemplate.next(templateId);
}

}
