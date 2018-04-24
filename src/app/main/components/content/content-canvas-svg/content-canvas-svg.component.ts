import { Component,AfterViewInit, OnInit,Input,ChangeDetectionStrategy,ChangeDetectorRef,HostBinding,
HostListener,ElementRef,Renderer2} from '@angular/core';
import {ContentService} from '../../../../common/services/content.service';

@Component({
  selector: '[appContentSvgAsset]',
  templateUrl: './content-canvas-svg.component.html',
  styleUrls: ['./content-canvas-svg.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class ContentCanvasSvgComponent implements OnInit,AfterViewInit {
@Input() element:any;
@Input() inner:boolean = false;
@Input()
get selected(){
	return this._selected;
}
set selected(val:boolean){
		this._selected = val;
		if(val && !this.inner){
			this.getEditablesAndPushForEdit(this.el.nativeElement);
		}
}
_selected:any = false;
initializedTransformClass:boolean=false;
svgReference:any;
children=[];

@HostBinding('style.position') 
get positionType(){
let pos = 'absolute';
return pos;	
}

@HostBinding('attr.transform')
get transformVal(){
  let transform = this.element.transform;
  if(transform){
    let scale = transform.scale || '';
    let translate = transform.translate || '';
    if(!this.initializedTransformClass){
       this.renderer.addClass(this.el.nativeElement,'transformable');
       this.initializedTransformClass = true;
    }
   
    return `${translate} ${scale}`;
  }
  
}

@HostBinding('attr.fixed')
get fixed(){
  let fixed = this.element.fixed;
  return fixed;
}

@HostBinding('attr.scalableX')
get scalableX(){
  if(this.element.scalable){
     let scale = this.element.scalable.x;
      return scale;
  }
 
}

@HostBinding('attr.scalableY')
get scalableY(){
  if(this.element.scalable){
     let scale = this.element.scalable.y;
      return scale;
  }
 
}



  constructor(private cdr:ChangeDetectorRef,private el:ElementRef,
  	private renderer:Renderer2,private contentService:ContentService) { 
   this.el.nativeElement.canDrag = true;
}

  ngOnInit() {

  	this.createElement(this.el.nativeElement,this.element);
  }

  ngAfterViewInit(){
  	this.cdr.detach();
  }

  updatePosition(){
    this.cdr.markForCheck();
  }

  setStyleAndAttributes(el,attrs){
    for(var key in attrs){
        if(key == 'fill'){
            this.renderer.setStyle(this.svgReference,key,attrs[key]);
        }else{
                this.renderer.setAttribute(this.svgReference,key,attrs[key])
        }
    }
  }

  createElement(parent,child){
  	if(child.element && !child.hasOwnProperty('path') && !child.innerAssets){
  		this.svgReference = document.createElementNS('http://www.w3.org/2000/svg',child.element);
  		this.setStyleAndAttributes(this.svgReference,child.attrs);
  	this.setPosition(child.pos,this.svgReference);
  	this.renderer.appendChild(parent,this.svgReference);
  	}else if(child.hasOwnProperty('path') && !child.hasOwnProperty('element') && !child.innerAssets){
  		this.svgReference = document.createElementNS('http://www.w3.org/2000/svg','path');
  		this.renderer.setAttribute(this.svgReference,'d',child.path);
  		this.setStyleAndAttributes(this.svgReference,child.attrs);
    	this.setPosition(child.pos,this.svgReference);
    	this.renderer.appendChild(parent,this.svgReference);
  	}else{
  		this.svgReference = parent;
      this.setStyleAndAttributes(this.svgReference,child.attrs);
  	}
  	  	if(child.changable){
  		this.renderer.setAttribute(this.svgReference,'changable',child.changable);
  	}
  	this.cdr.markForCheck();
  }

  setPosition(data,el){
  	if(data.x) this.renderer.setAttribute(el,'x',data.x);
  	if(data.y) this.renderer.setAttribute(el,'y',data.y);
  }

getEditablesAndPushForEdit(element){
	let children = this.pushElChildren(element);
	if(element.getAttribute('changable')){
		children.unshift(element);
	}
	this.contentService.pushSvgsToEdit(children);
	this.children=[];
	this.cdr.detectChanges();
}

 pushElChildren(parent){
  	[].forEach.call(parent.children,child=>{
  		if(child.children.length>0){
  			this.pushElChildren(child);
  		}else if(child.getAttribute('changable')){
  			this.children.push(child);
  		}
  	});
  	return this.children;
  }
}
