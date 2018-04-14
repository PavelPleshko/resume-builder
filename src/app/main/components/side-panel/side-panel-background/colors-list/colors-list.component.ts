import { Component, OnInit,Input,ChangeDetectionStrategy,Output,EventEmitter} from '@angular/core';


@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ColorsListComponent implements OnInit {
@Input() poorColors;
@Input() vividColors;
@Input() gradientColors;
@Output() chooseColor = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  addNewColor(color){
  	color.id = this.vividColors.length+1; 
  	this.vividColors.push(color);
  }

  onChooseColor(event){
  	this.chooseColor.emit(event);
  }

}
