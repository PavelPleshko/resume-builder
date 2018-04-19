import { Component, OnInit,ElementRef,Renderer2,ChangeDetectorRef} from '@angular/core';
import {DataManagerService} from '../../../common/services/data-manager.service';
import {ContentService} from '../../../common/services/content.service';
import {pluck,distinctUntilChanged,switchMap,takeUntil,tap,filter,throttleTime} from 'rxjs/operators';
import {ILayout} from '../../../common/services/data-manager.service';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
layout:any;
rect:HTMLElement;
contentCanvas:any;
  px:number=0;
  py:number=0;
  initX:number=0;
  initY:number=0;
  resizer:Function;
  elStyle:any;
  selection:HTMLElement[]=[];
  selectedSvg:Observable<any>;

  constructor(private dataManager:DataManagerService,
    private contentService:ContentService,
    private el:ElementRef,private renderer:Renderer2,
    private cdr:ChangeDetectorRef) { }

  ngOnInit() {
  	this.dataManager.data.pipe(pluck('activeLayout')).subscribe(layout=>{
  		if(layout){
       this.layout =  Object.assign({},layout);
  		}else{
  			this.layout = new ILayout()
  		}
  	})
  	this.startListening();
  }

  startListening(){
  	let mouseup = fromEvent(document,'mouseup').pipe(tap(_=>this.destroyRect()));
  	let mousemove = fromEvent(document,'mousemove').pipe(throttleTime(30),takeUntil(mouseup),tap((e:MouseEvent)=>this.resizeRect(e)),throttleTime(700),
  		tap(()=>this.selectElements()));
	let mousedown = fromEvent(this.el.nativeElement,'mousedown').pipe(filter((e:MouseEvent)=>{
	return hasClass.call(e.target,'main-wrapper');
	}),tap((e)=>{
    this.el.nativeElement.dispatchEvent(new Event('custom-blur'));
		this.removeSelectedClass(this.selection);
		this.selection = [];
		this.createRect(e);
	}),switchMap(()=>mousemove)).subscribe();
  }

  createRect(e){
  	if(!this.rect){
  	this.rect = this.renderer.createElement('div');
  	this.elStyle = this.rect.style;
  	let mouseX = e.clientX,mouseY= e.clientY;
  	this.initX = mouseX;this.initY = mouseY;
  	this.px = this.initX;this.py = this.initY;
  	this.renderer.addClass(this.rect,'selector-marker');
  	this.renderer.setStyle(this.rect,'top',mouseY+'px');
  	this.renderer.setStyle(this.rect,'left',mouseX+'px');
  	this.renderer.appendChild(this.el.nativeElement,this.rect);
  }
  }

  	  resizeRect(event: MouseEvent) {
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;
  if((this.initX<=event.clientX && this.initY <= event.clientY)){
  	this.resizer = this.rightBottomResizer;
  }else if((this.initX<=event.clientX && this.initY >=event.clientY)){
  	this.resizer = this.rightTopResizer;
  }else if((this.initX>=event.clientX && this.initY > event.clientY)){
	this.resizer = this.leftTopResizer;
  }
  else if((this.initX>=event.clientX && this.initY <= event.clientY)){
	this.resizer = this.leftBottomResizer;
  }
    this.px = event.clientX;
    this.py = event.clientY;
  	this.resizer(offsetX, offsetY);  
  }

 rightBottomResizer(offsetX: number, offsetY: number) {
   	this.elStyle.width = (this.px-this.elStyle.left.replace('px','')) +'px';
    this.elStyle.height = (this.py-this.elStyle.top.replace('px','')) +'px';  
  }
  
    leftTopResizer(offsetX: number, offsetY: number) {
    this.elStyle.left =this.px+'px';
    this.elStyle.top = this.py+'px';
    this.elStyle.width = (Number(this.elStyle.width.replace('px','')) - offsetX)+'px';
    this.elStyle.height= (Number(this.elStyle.height.replace('px','')) - offsetY)+'px';
  }

  rightTopResizer(offsetX: number, offsetY: number) {
    this.elStyle.top = this.py +'px';
    this.elStyle.width = (Number(this.elStyle.width.replace('px','')) + offsetX)+'px';
    this.elStyle.height= (Number(this.elStyle.height.replace('px','')) - offsetY)+'px';
  }

  leftBottomResizer(offsetX: number, offsetY: number) {
    this.elStyle.left = this.px+'px';
    this.elStyle.width = (Number(this.elStyle.width.replace('px','')) - offsetX)+'px';
    this.elStyle.height = (this.py-this.elStyle.top.replace('px','')) +'px';
  }

  selectElements(){
  	let selectedElements = [];
  	this.contentCanvas = document.getElementsByClassName('main-wrapper')[0];
  	let kids = this.contentCanvas.children;
  	let rect:ClientRect=this.rect.getBoundingClientRect();
  	[].forEach.call(kids,(kid:HTMLElement)=>{
  		let collidable = kid.getBoundingClientRect();
  	if (rect.left < collidable.left + collidable.width &&
   rect.left + rect.width > collidable.left &&
   rect.top < collidable.top + collidable.height &&
   rect.height + rect.top > collidable.top) {
   this.addSelectedClass(kid);
	selectedElements.push(kid);
}else{
	this.removeSelectedClass(kid);
}
  	})
  	this.selection = selectedElements;
  }


addSelectedClass(arg){
if(arg instanceof Array){
	arg.forEach((kid)=>{
		 kid.classList.add('selected-by-marker')
	})
}else{
	  arg.classList.add('selected-by-marker')
}
}

removeSelectedClass(arg){
	if(arg instanceof Array){
	arg.forEach((kid)=>{
		 kid.classList.remove('selected-by-marker')
	})
}else{
	  arg.classList.remove('selected-by-marker')
}
}
  destroyRect(){
    this.contentService.pushIntoSelection(this.selection,true);
  	this.renderer.removeChild(this.el.nativeElement,this.rect);
  	this.rect = undefined;
  }

}

function hasClass(className){
  return Array.prototype.includes.call(this.classList,className);
}
