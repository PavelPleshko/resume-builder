import { ViewEncapsulation,Component, OnInit,AfterViewInit,Input,HostListener,ChangeDetectionStrategy,HostBinding,ElementRef,Renderer2,ChangeDetectorRef} from '@angular/core';
import {ContentService} from '../../../../common/services/content.service';
import {DataManagerService} from '../../../../common/services/data-manager.service';

@Component({
  selector: '[contentCanvasElement]',
  templateUrl: './content-canvas-element.component.html',
  styleUrls: ['./content-canvas-element.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})
export class ContentCanvasElementComponent implements OnInit,AfterViewInit{
@Input() element:any = null;
@Input() currentRatio:number = 1;
@Input() inner:boolean = false;
@Input() list:boolean = false;
blurListener:any;
  constructor(private el:ElementRef,
  	private contentService:ContentService,
  	private renderer2:Renderer2,
  	private cdr:ChangeDetectorRef,
  	private dataManager:DataManagerService) { 
  this.el.nativeElement.canDrag = true;
}

@HostBinding('style.position') 
get positionType(){
let pos = this.inner ? 'relative':'absolute'
return pos;	
}

_selected:boolean = false;
_hovered:boolean = false;
@HostListener('mouseenter')
onHover(){
	if(!this._hovered && !this._selected){
		this._hovered = true;
		this.el.nativeElement.className += ' hovered';
	}
}

@HostListener('mouseleave')
onUnhover(){
	if(this._hovered && !this._selected){
		this._hovered = false;
		this.el.nativeElement.className = this.el.nativeElement.className.replace(' hovered','');
	}
}
@HostListener('dblclick',['$event'])
onDoubleClick(evt){
	if(!this._selected && !this.inner){
		this._selected = true;
		this.assignDimensions();
		this.el.nativeElement.className = this.el.nativeElement.className.replace(' hovered','');
		this.el.nativeElement.className += ' selected';

		this.el.nativeElement.className = this.el.nativeElement.className.replace('cursor-draggable','');
		this.el.nativeElement.isEditing = true;
		this.el.nativeElement.canDrag = false;
			this.el.nativeElement['ResizeableDir'].editMode();
		this.renderer2.setAttribute(this.el.nativeElement,'contenteditable','true');
		this.el.nativeElement.focus();
	    var caretRange = this.getMouseEventCaretRange(evt);
	    var self = this;
	    this.contentService.pushIntoSelection(this.el.nativeElement,false);
	    setTimeout(function() {
	        self.selectRange(caretRange);
	    }, 10);
	    let contentElement = document.querySelector('app-content');
	    this.blurListener = this.renderer2.listen(contentElement,'custom-blur',this.blurElement.bind(this));
	}
}





ngOnInit(){
	if(this.element){
		this.el.nativeElement.style.left = this.inner ? '' :  this.element.attrs.x+'px';
		this.el.nativeElement.style.top = this.inner ? '' :  this.element.attrs.y+'px';
			this.createElement(this.el.nativeElement,this.element);
	}
}

ngAfterViewInit(){
	this.cdr.detach();
}


updatePosition(id){
	this.element.attrs['y']= this.el.nativeElement.style.top.replace('px','');
	this.element.attrs['x']=this.el.nativeElement.style.left.replace('px','');
}


blurElement(event){
	event.stopPropagation();
	if(this._selected){
		this._selected = false;
		this.el.nativeElement.isEditing = false;
		this.el.nativeElement.canDrag = true;
		this.el.nativeElement['ResizeableDir'].editMode();
		this.el.nativeElement.className += ' cursor-draggable';
		this.el.nativeElement.className = this.el.nativeElement.className.replace('selected','');
		this.renderer2.setAttribute(this.el.nativeElement,'contenteditable','false');
		this.contentService.removeFromSelection(false);
	}
	this.blurListener();
	this.cdr.markForCheck();
}

assignDimensions(){
		let dims:ClientRect = this.el.nativeElement.getBoundingClientRect();
		this.el.nativeElement.style.width = dims.width+'px';
		this.el.nativeElement.style.height = dims.height+'px';
}

  createElement(parent,newElement){
  	let el = document.createElement(newElement.element);
  	if((newElement.element=='ul' || newElement.element == 'ol') && !this.list){
  		this.list = true;		
  	}
 
 if(this.list){el = this.el.nativeElement;}
if(newElement.content){

	  let text = this.renderer2.createText(newElement.content);
  this.renderer2.appendChild(el,text);
}

  for(var key in newElement.mainStyles){
  	this.renderer2.setStyle(this.el.nativeElement,key,newElement.mainStyles[key]);
  }
	if(!this.list){
		this.renderer2.appendChild(parent,el);
	}
 }
  

getMouseEventCaretRange(evt) {
    var range, x = evt.clientX, y = evt.clientY;
    const doc = document as any;
    if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToPoint(x, y);
    }

    else if (typeof doc.createRange != "undefined") {
        if (typeof evt.rangeParent != "undefined") {
            range = doc.createRange();
            range.setStart(evt.rangeParent, evt.rangeOffset);
            range.collapse(true);
        }
        else if (doc.caretPositionFromPoint) {
            var pos = doc.caretPositionFromPoint(x, y);
            range = doc.createRange();
            range.setStart(pos.offsetNode, pos.offset);
            range.collapse(true);
        }
        else if (doc.caretRangeFromPoint) {
            range = doc.caretRangeFromPoint(x, y);
        }
    }
    return range;
}

selectRange(range) {
    if (range) {
        if (typeof range.select != "undefined") {
            range.select();
        } else if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
}


}
