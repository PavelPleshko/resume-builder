import { Component, OnInit,Input,HostListener,ChangeDetectionStrategy,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-layout-single',
  templateUrl: './layout-single.component.html',
  styleUrls: ['./layout-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LayoutSingleComponent implements OnInit {
@Input() layout;
showImageOverlay:boolean=false;
@Output('chooseTemplate') chooseTemplateEvent= new EventEmitter();
  constructor() { }
@HostListener('mouseenter')
showOverlay(){
	this.showImageOverlay=true;
}
@HostListener('mouseleave')
hideOverlay(){
	this.showImageOverlay=false;
}
  ngOnInit() {
  }

chooseTemplate(){
this.chooseTemplateEvent.next(this.layout.id);
}
}
