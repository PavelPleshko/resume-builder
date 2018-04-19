import { Component, OnInit,Output,EventEmitter,ChangeDetectionStrategy } from '@angular/core';


export interface IMenuItem{
	id:number;
	title:string;
	image:string;
}

@Component({
  selector: 'app-elements-menu',
  templateUrl: './elements-menu.component.html',
  styleUrls: ['./elements-menu.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ElementsMenuComponent implements OnInit {
activeMenuItem:string='';
menuItems:IMenuItem[];
@Output() elSetChanged = new EventEmitter();
  constructor() { }

  ngOnInit() {
  	this.menuItems = [
  	{id:1,title:'Shapes',image:'el_menu_shapes.png'},
  	{id:2,title:'Lines',image:'el_menu_lines.png'},
  	{id:3,title:'Icons',image:'el_menu_icons.png'}
  	];
  }


onElSetChanged(name){
this.elSetChanged.emit(name);
this.activeMenuItem = name;
}
}
