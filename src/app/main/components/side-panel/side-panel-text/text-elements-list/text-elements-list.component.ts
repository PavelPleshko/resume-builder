import { Component, OnInit,Input,ChangeDetectionStrategy,
Output,EventEmitter } from '@angular/core';
import {ILayoutElement} from '../../../../../common/services/data-manager.service';
@Component({
  selector: 'app-text-elements-list',
  templateUrl: './text-elements-list.component.html',
  styleUrls: ['./text-elements-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TextElementsListComponent implements OnInit {
@Input() defaultElements:ILayoutElement[];
@Input() extraElements:ILayoutElement[];
@Output() addElement:EventEmitter<ILayoutElement> = new EventEmitter<ILayoutElement>();
  constructor() { }

  ngOnInit() {
  }

  onAddedElement(el:ILayoutElement){
  	this.addElement.emit(el);
  }

}
