import { Component, OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';

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
    {title:'layouts',iconName:'fa fa-columns',link:''},
  		{title:'saved',iconName:'fa fa-save',link:'saved'},
  		
  		{title:'elements',iconName:'fa fa-puzzle-piece',link:'elements'},
  		{title:'text',iconName:'fa fa-font',link:'text'},
  		{title:'colors',iconName:'fa fa-adjust',link:'colors'}
  	];
    this.router.events.pipe(take(1)).subscribe((event:any)=>{
      let activeTabIdx = this.determineActiveTab(event.url);
      this.changeActiveItem(activeTabIdx);
    });
  }

  ngAfterViewInit(){
  	this.changeActiveItem(this.currentActiveIndex);
  }

  determineActiveTab(url){
    let newUrl = url.replace('/','');
    let indexActive=0;
    [].forEach.call(this.menuItems,(item,idx)=>{
      if(item.link == newUrl){
        indexActive = idx;
      }
    })
    return indexActive;
  }


changeActiveItem(index:number){
let translate = index*100;
this.active_indicator.nativeElement.style.transform = `translate3d(0,${translate}%,0)`;
}
}
