import { Component, OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';

export interface IMenuItem{
	title:string;
	iconName:string;
	link:string;
}
@Component({
  selector: 'app-side-panel-menu',
  templateUrl: './side-panel-menu.component.html',
  styleUrls: ['./side-panel-menu.component.scss']
})
export class SidePanelMenuComponent implements OnInit,AfterViewInit {
menuItems:IMenuItem[];
@ViewChild('active_indicator') active_indicator:ElementRef;
currentActiveIndex:number = 1;
  constructor(private router:Router) { }

  ngOnInit() {
  	this.menuItems = [
  		{title:'saved',iconName:'fa fa-save',link:'saved'},
  		{title:'layouts',iconName:'fa fa-columns',link:''},
  		{title:'elements',iconName:'fa fa-puzzle-piece',link:'elements'},
  		{title:'text',iconName:'fa fa-font',link:'text'},
  		{title:'colors',iconName:'fa fa-adjust',link:'colors'}
  	];
    let routerState = this.router.routerState.snapshot;
    console.log(routerState);
  }

  ngAfterViewInit(){
  	this.changeActiveItem(this.currentActiveIndex);
  }


changeActiveItem(index:number){
let translate = index*100;
this.active_indicator.nativeElement.style.transform = `translate3d(0,${translate}%,0)`;
}
}
