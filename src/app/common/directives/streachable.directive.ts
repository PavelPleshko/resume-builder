import { Directive, AfterViewInit,HostBinding,Component,Input, ElementRef,Renderer2, OnInit, OnDestroy,ChangeDetectorRef } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {switchMap,takeUntil,tap,throttleTime,delay,map} from 'rxjs/operators';
import {defer} from 'rxjs/observable/defer';
import {merge} from 'rxjs/observable/merge';

@Directive({
  selector: '[stretchable]'
})

export class Streachable implements OnInit,AfterViewInit {
  left;
  right;
  bottom;
  top;
  listeners:any=[];
  elements:any=[];
  px=0;
  py=0;
  els;
  stretcher:Function;
  @Input() stretchable:boolean;

  public constructor(private _element: ElementRef, private _renderer: Renderer2,private cdr:ChangeDetectorRef) {

  }

  

  public ngOnInit(): void {
    this._element.nativeElement.parentElement['StretchableDir'] = this;
      }

  ngAfterViewInit(){
    this.els = this._element.nativeElement.querySelectorAll('.transformable');
    
    this.cdr.detach();
  }

 
  editMode(){
    if(this._element.nativeElement.parentElement.isEditing && this.stretchable){
        this.createHandles(this._element.nativeElement.parentElement);
      this.startListeners();
      
      this.cdr.reattach();
      return true;
    }else if(!this._element.nativeElement.parentElement.isEditing && this.stretchable){
      this.stopListeners();
     this.destroyHandles(this._element.nativeElement.parentElement);
      this.cdr.reattach();
      return false;
    }
  }


  createHandles(parent){
     this.left = this._renderer.createElement('div');
      this.left.className+='stretch-handle left-stretch';
     this._renderer.appendChild(parent,this.left);
      this.right = this._renderer.createElement('div');
     this.right.className+='stretch-handle right-stretch';
      this._renderer.appendChild(parent,this.right);
       this.bottom = this._renderer.createElement('div');
      this.bottom.className+='stretch-handle bottom-stretch';
     this._renderer.appendChild(parent,this.bottom);
      this.top = this._renderer.createElement('div');
     this.top.className+='stretch-handle top-stretch';
      this._renderer.appendChild(parent,this.top);
      this.elements.push(this.left,this.right,this.top,this.bottom);
  }
  startListeners(){
    let left=fromEvent(this.left,'mousedown').pipe(map(e=>{
      e['stretcher'] = 'left';
      return e; 
    }));
       let right =fromEvent(this.right,'mousedown').pipe(map(e=>{
      e['stretcher'] = 'right';
      return e; 
    }));
        let top=fromEvent(this.top,'mousedown').pipe(map(e=>{
      e['stretcher'] = 'top';
      return e; 
    }));
       let bottom =fromEvent(this.bottom,'mousedown').pipe(map(e=>{
      e['stretcher'] = 'bottom';
      return e; 
    }));
    let mdown = merge(left,right,bottom,top).pipe(tap((e:any)=>{
      this.px = e.clientX;
    this.py = e.clientY;
    let stretcherName=e.stretcher+'Stretcher';
      this.stretcher=this[stretcherName];
    }),switchMap(()=>defer(()=>mouseMove))).subscribe();
    let mouseUp = fromEvent(document,'mouseup');
    let mouseMove = fromEvent(document,'mousemove').pipe(takeUntil(mouseUp),throttleTime(100),tap((e)=>this.onMove(e)));
this.listeners.push(mdown);
  }

  leftStretcher(offsetX: number, offsetY: number) {
   let viewBox = this._element.nativeElement.getAttribute('viewBox').split(' ');
   let width = Number(viewBox[2]) - offsetX;
 //  this.w = width;
   this._element.nativeElement.setAttribute('viewBox',`0 0 ${width} ${viewBox[3]}`);
   this._element.nativeElement.parentElement.style.left = (Number( this._element.nativeElement.parentElement.style.left.replace('px','')) + offsetX)+'px';
    this._element.nativeElement.parentElement.style.width = (Number(this._element.nativeElement.parentElement.style.width.replace('px','')) - offsetX)+'px';
  
  }

  rightStretcher(offsetX: number, offsetY: number) {
  let viewBox = this._element.nativeElement.getAttribute('viewBox').split(' ');
   let width = Number(viewBox[2]) + offsetX;
  
    this._element.nativeElement.parentElement.style.width = (Number(this._element.nativeElement.parentElement.style.width.replace('px','')) + offsetX)+'px';
   this._element.nativeElement.setAttribute('viewBox',`0 0 ${width} ${viewBox[3]}`);
  }

    topStretcher(offsetX: number, offsetY: number) {
   let viewBox = this._element.nativeElement.getAttribute('viewBox').split(' ');
   let height = Number(viewBox[3]) - offsetY;
  
   this._element.nativeElement.parentElement.style.top = (Number( this._element.nativeElement.parentElement.style.top.replace('px','')) + offsetY)+'px';
    this._element.nativeElement.parentElement.style.height = (Number(this._element.nativeElement.parentElement.style.height.replace('px','')) - offsetY)+'px';
   this._element.nativeElement.setAttribute('viewBox',`0 0 ${viewBox[2]} ${height}`);
  }

  bottomStretcher(offsetX: number, offsetY: number) {
  let viewBox = this._element.nativeElement.getAttribute('viewBox').split(' ');
  let height = Number(viewBox[3]) + offsetY;
  
    this._element.nativeElement.parentElement.style.height = (Number(this._element.nativeElement.parentElement.style.height.replace('px','')) + offsetY)+'px';
  this._element.nativeElement.setAttribute('viewBox',`0 0 ${viewBox[2]} ${height}`);
  }


 

  onMove(event: any) {
    let offsetX = event.clientX - this.px;
    let offsetY = event.clientY - this.py;
   
    this.stretcher(offsetX, offsetY); 
  // this.transformElements(offsetX);
    this.px = event.clientX;
    this.py = event.clientY;
  }
w;
x;
bbox;
  transformElements(amount){
   
    if(this.els){
      [].forEach.call(this.els,el=>{
       let regExp = /[-]?\d+(\.\d+)?/g;
       let transform = el.getAttribute('transform').split(')');
        let translate = transform[0].match(regExp);
        let scale =transform[1].match(regExp);
        let tX=Number(translate[0]);
        let tY=Number(translate[1]);
         let sX=Number(scale[0]);
        let sY=Number(scale[1]);
        if(!el.getAttribute('fixed')){
          tX = tX-amount;
        el.setAttribute('transform',`translate(${tX},${tY}) scale(${sX},${sY})`);
        }else if(el.getAttribute('scalableX')){

           
      this.bbox = el.getBBox();
      if(!this.x){
        this.x=this.bbox.x;
      }
     tX=tX+amount;
     let children = el.children;
     [].forEach.call(children,(child)=>{
       let width = child.getAttribute('width');
       let newWidth = Number(width)-amount;
       child.setAttribute('width',newWidth);
     })
    
           el.setAttribute('transform',`translate(${tX},${tY}) scale(${sX},${sY})`);
        }
      
      
    })
  }
}


  destroyHandles(parent){
    this.elements.forEach((element)=>{
      this._renderer.removeChild(parent,element);
    })
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

