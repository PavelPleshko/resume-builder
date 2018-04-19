import { Component, OnInit,Input,ChangeDetectionStrategy,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element-menu-single',
  templateUrl: './element-menu-single.component.html',
  styleUrls: ['./element-menu-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ElementMenuSingleComponent implements OnInit {
@Input() element:any;
@Output() elSetChanged = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onChangeSetClick(name){
  	name = name.toLowerCase();
  	this.elSetChanged.emit(name);
  }

}
