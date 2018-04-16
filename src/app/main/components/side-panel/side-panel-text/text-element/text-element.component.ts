import { Component, OnInit,Input,
	ChangeDetectionStrategy,HostListener,Renderer2,ElementRef,
	Output,EventEmitter } from '@angular/core';
import {ILayoutElement} from '../../../../../common/services/data-manager.service';

@Component({
  selector: '[appTextElement]',
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TextElementComponent implements OnInit {
@Input('element') textElement:ILayoutElement;
@Output() addedElement:EventEmitter<any> = new EventEmitter();
@Input() list:boolean=false;
  constructor(private renderer:Renderer2,private el:ElementRef) { }

@HostListener('click')
addElement(){
this.addedElement.emit(this.textElement);
}
  ngOnInit() {
  	if(this.textElement){
  		this.createElement(this.el.nativeElement,this.textElement);

  	}
  	
  }


createElement(parent,newElement){
  	let el = document.createElement(newElement.element);
  	if((newElement.element=='ul' || newElement.element == 'ol') && !this.list){
  		this.list = true;		
  	}
 if(this.list){el = this.el.nativeElement;}
if(newElement.content){
	  let text = this.renderer.createText(newElement.content);
  this.renderer.appendChild(el,text);
}


  for(var key in newElement.mainStyles){
  	this.renderer.setStyle(this.el.nativeElement,key,newElement.mainStyles[key]);
  }
	if(!this.list){
		this.renderer.appendChild(parent,el);
	}

 }
}
