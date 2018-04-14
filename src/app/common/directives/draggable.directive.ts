import {Directive,OnInit,ElementRef,Input,ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {switchMap,takeUntil,tap,throttleTime,debounceTime} from 'rxjs/operators';
import {defer} from 'rxjs/observable/defer';

@Directive({
	selector:'[ng2-draggable]'
})

export class Draggable implements OnInit{
	topStart:number = 0;
	leftStart:number = 0;
	_allowDrag:boolean = true;
	md:boolean;
	
	constructor(public element:ElementRef,private viewRef:ViewContainerRef){

	}

	ngOnInit(){
		this.startListeners();
	}


startListeners(){
		let mouseUp = fromEvent(document,'mouseup').pipe(tap(()=>{
			let id = this.viewRef['_data'].componentView.component.element.id;
			this.viewRef['_data'].componentView.component.updatePosition(id);
			this.md=false;
		}));
	let mouseMove = fromEvent(document,'mousemove').pipe(takeUntil(mouseUp),throttleTime(50),tap((e)=>this.mouseMoveHandler(e)));
	let mouseDown = fromEvent(this.element.nativeElement,'mousedown').pipe(throttleTime(190),tap((e)=>this.mouseDownHandler(e)),
		switchMap(()=>mouseMove));

mouseDown.subscribe();
}

mouseDownHandler(event){
	this._allowDrag = this.element.nativeElement.canDrag;
		if(event.button === 2){
			return;
		}	
		this.md = true;
		this.topStart = event.clientY - this.element.nativeElement.style.top.replace('px','');
		this.leftStart = event.clientX - this.element.nativeElement.style.left.replace('px','');
}

mouseMoveHandler(event){
	if(this.md && this._allowDrag){
			this.element.nativeElement.style.top = (event.clientY - this.topStart) + 'px';
			this.element.nativeElement.style.left = (event.clientX - this.leftStart) + 'px';
		}
}

	


@Input('ng2-draggable')
set allowDrag(value:boolean){
	
	this._allowDrag = this.element.nativeElement.canDrag;
	this.applyRemoveClass();
}

applyRemoveClass(){
	if(this._allowDrag){
		this.element.nativeElement.className += ' cursor-draggable';
	}else{
		this.element.nativeElement.className = this.element.nativeElement.className.replace(' cursor-draggable','');
	}
}
}