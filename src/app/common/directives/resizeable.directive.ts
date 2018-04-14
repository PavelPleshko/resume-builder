import { Directive, AfterViewInit,HostBinding,Component, ElementRef,Renderer2, OnInit, OnDestroy,ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {switchMap,takeUntil,tap,throttleTime,delay,map} from 'rxjs/operators';
import {defer} from 'rxjs/observable/defer';
import {merge} from 'rxjs/observable/merge';

@Directive({
  selector: '[resizable]'
})

export class Resizable implements OnInit,AfterViewInit {
  leftTop;
  rightTop;
  leftBottom;
  rightBottom;
  listeners=[];
  px=0;
  py=0;
  resizer:Function;
  elStyle;

  public constructor(private _element: ElementRef, private _renderer: Renderer2,private cdr:ChangeDetectorRef) {

  }

  

  public ngOnInit(): void {
    this.createHandles(this._element.nativeElement);
    this._element.nativeElement['ResizeableDir'] = this;
    this.elStyle = this._element.nativeElement.style;
  }

  ngAfterViewInit(){
     this.cdr.detach();
  }

  @HostBinding('class.editing') _editMode:boolean = false;
  editMode(){
    if(this._element.nativeElement.isEditing){
      this.startListeners();
      this._editMode=true;
      return true;
    }else{
      this.stopListeners();
      this._editMode = false;
      return false;
    }
  }


  createHandles(parent){
     this.leftTop = this._renderer.createElement('div');
      this.leftTop.className+='resize-handle left-top-resize';
     this._renderer.appendChild(parent,this.leftTop);
      this.rightTop = this._renderer.createElement('div');
     this.rightTop.className+='resize-handle right-top-resize';
      this._renderer.appendChild(parent,this.rightTop);
      this.leftBottom = this._renderer.createElement('div');
     this.leftBottom.className+='resize-handle left-bottom-resize';
    this._renderer.appendChild(parent,this.leftBottom);
      this.rightBottom = this._renderer.createElement('div');
     this.rightBottom.className+='resize-handle right-bottom-resize';
     this._renderer.appendChild(parent,this.rightBottom);
  }
  startListeners(){
    let leftTop=fromEvent(this.leftTop,'mousedown').pipe(map(e=>{
      e['resizer'] = 'leftTop';
      return e; 
    }));
    let leftBottom =fromEvent(this.leftBottom,'mousedown').pipe(map(e=>{
      e['resizer'] = 'leftBottom';
      return e; 
    }));;
      let rightBottom =fromEvent(this.rightBottom,'mousedown').pipe(map(e=>{
      e['resizer'] = 'rightBottom';
      return e; 
    }));;
       let rightTop =fromEvent(this.rightTop,'mousedown').pipe(map(e=>{
      e['resizer'] = 'rightTop';
      return e; 
    }));;
    let mdown = merge(leftTop,leftBottom,rightBottom,rightTop).pipe(tap((e:any)=>{
      this.px = e.clientX;
    this.py = e.clientY;
    let resizerName=e.resizer+'Resizer';
      this.resizer=this[resizerName];
    }),switchMap(()=>defer(()=>mouseMove))).subscribe();
    let mouseUp = fromEvent(document,'mouseup');
    let mouseMove = fromEvent(document,'mousemove').pipe(takeUntil(mouseUp),tap((e)=>this.onCornerMove(e)));
this.listeners.push(mdown);
  }

  leftTopResizer(offsetX: number, offsetY: number) {
    this.elStyle.left = (Number(this.elStyle.left.replace('px','')) + offsetX)+'px';
    this.elStyle.top = (Number(this.elStyle.top.replace('px','')) + offsetY)+'px';
    this.elStyle.width = (Number(this.elStyle.width.replace('px','')) - offsetX)+'px';
    this.elStyle.height= (Number(this.elStyle.height.replace('px','')) - offsetY)+'px';
  }

  rightTopResizer(offsetX: number, offsetY: number) {
    this.elStyle.top = (Number(this.elStyle.top.replace('px','')) + offsetY)+'px';
    this.elStyle.width = (Number(this.elStyle.width.replace('px','')) + offsetX)+'px';
    this.elStyle.height= (Number(this.elStyle.height.replace('px','')) - offsetY)+'px';
  }

  leftBottomResizer(offsetX: number, offsetY: number) {
    this.elStyle.left = (Number(this.elStyle.left.replace('px','')) + offsetX)+'px';
    this.elStyle.width = (Number(this.elStyle.width.replace('px','')) - offsetX)+'px';
    this.elStyle.height= (Number(this.elStyle.height.replace('px','')) + offsetY)+'px';
  }

  rightBottomResizer(offsetX: number, offsetY: number) {
    this.elStyle.width = (Number(this.elStyle.width.replace('px','')) + offsetX)+'px';
    this.elStyle.height= (Number(this.elStyle.height.replace('px','')) + offsetY)+'px';
  }

  onCornerMove(event: any) {
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;
    this.resizer(offsetX, offsetY);  
    this.px = event.clientX;
    this.py = event.clientY;
  }




  stopListeners(){
    this.listeners.forEach((listener)=>{
      if(listener){
        listener.unsubscribe();
      }
    })
   this.listeners=[];
  }
}

