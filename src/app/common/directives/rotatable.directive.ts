import { Directive, AfterViewInit,HostBinding,Component,Input, ElementRef,Renderer2, OnInit,ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {switchMap,takeUntil,tap,map,filter,throttleTime} from 'rxjs/operators';
import {defer} from 'rxjs/observable/defer';

@Directive({
  selector: '[rotatable]'
})
export class Rotatable implements OnInit,AfterViewInit {
 rotateHandle;
  listeners=[];
  prevX=0;
  prevY=0;
  value:number=0;
  center;
  radiansToDeg:number=57.29577951308232;
  public constructor(private _element: ElementRef, private _renderer: Renderer2,private cdr:ChangeDetectorRef) {

  }

  public ngOnInit(): void {
    this._element.nativeElement['RotatableDir'] = this;
      }

  ngAfterViewInit(){
    this.cdr.detach();
  }

 
  editMode(){
    if(this._element.nativeElement.isEditing){
        this.createHandle(this._element.nativeElement);
        this._renderer.setStyle(this._element.nativeElement,'transform-origin','center center');
      this.startListeners();
      this.cdr.reattach();
      return true;
    }else if(!this._element.nativeElement.isEditing){
      this.stopListeners();
     this.destroyHandle(this._element.nativeElement);
      this.cdr.reattach();
      return false;
    }
  }

  createHandle(parent){
     this.rotateHandle = this._renderer.createElement('div');
      this.rotateHandle.className +='rotate-handle';
     this._renderer.appendChild(parent,this.rotateHandle);
  }

  startListeners(){
    let rotate=fromEvent(this.rotateHandle,'mousedown').pipe(tap(()=>{
      let el:ClientRect = this._element.nativeElement.getBoundingClientRect();
      this.center = {
        x:el.left+(el.width/2),
        y:el.top+(el.height/2)
      };
      this.rotateHandle.className+=' rotating';
    }));
    let mdown = rotate.pipe(tap((e:any)=>{
      this.prevX = e.clientX;
      this.prevY = e.clientY;
    }),switchMap(()=>defer(()=>mouseMove))).subscribe();
    let mouseUp = fromEvent(document,'mouseup').pipe(tap(_=>{
      this.rotateHandle.className = this.rotateHandle.className.replace(' rotating','');
    }));
    let mouseMove = fromEvent(document,'mousemove').pipe(takeUntil(mouseUp),throttleTime(30),tap((e)=>this.onMove(e)));
this.listeners.push(mdown);
  }

    rotator(degrees: number) {
      this.value = degrees;
   this._element.nativeElement.style.transform = `rotate(${this.value}deg)`;
  }

  onMove(event: any) {
   let angle = Math.atan2(event.clientY-this.center.y,event.clientX-this.center.x)-Math.PI/2;
   let degrees = Number((angle*this.radiansToDeg).toFixed(0));
    this.rotator(degrees);  
  }

  destroyHandle(parent){
    this._renderer.removeChild(parent,this.rotateHandle);
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

