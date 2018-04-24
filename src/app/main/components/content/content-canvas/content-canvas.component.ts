import { Component, OnInit,Input,ChangeDetectionStrategy,ElementRef,Renderer2,ChangeDetectorRef,OnChanges} from '@angular/core';
import {ContentService} from '../../../../common/services/content.service';
@Component({
  selector: 'app-content-canvas',
  templateUrl: './content-canvas.component.html',
  styleUrls: ['./content-canvas.component.scss'],
 changeDetection:ChangeDetectionStrategy.OnPush,

})
export class ContentCanvasComponent implements OnInit,OnChanges {
@Input() layout:any;
@Input() massSelectorPosition:any;
@Input() initializeMassControl:boolean=false;

currentRatio=1;
currentWidth:number = 816;
currentHeight:number = 1055;
activeSvg;

get backgroundColor(){
	if(this.layout && this.layout.background){
		return this.layout.background;
	}else{
		return '#ffffff';
	}
}

  constructor(private el:ElementRef,private renderer:Renderer2,
    private cdr:ChangeDetectorRef,private contentService:ContentService){ }

  ngOnInit(){
  	this.getCurrentDimensions();
    let contentEl= document.querySelector('app-content');
    this.renderer.listen(contentEl,'custom-blur',this.removeActiveSvg.bind(this));
  }

  ngOnChanges(changes){
    this.cdr.detectChanges();
  }

getCurrentDimensions(){
	this.currentHeight *= this.currentRatio;
	this.currentWidth *= this.currentRatio;
}

changeActiveSvg(idx){
  this.cancelEditModeOfAssets();
  this.activeSvg=idx;
  let el = this.el.nativeElement.querySelector(`#resizer-${idx}`);
  el.isEditing = true;
  el.canDrag = false;
  el.classList.add('selected');
  el['ResizeableDir'].editMode();
   el['StretchableDir'].editMode();
   el['RotatableDir'].editMode();
   this.contentService.pushSvgActive(el.children[0]);
}

removeActiveSvg(){
let el = this.el.nativeElement.querySelector(`#resizer-${this.activeSvg}`);
if(el){
   el.isEditing = false;
  el.canDrag = true;
  el.classList.remove('selected');
   
   el['StretchableDir'].editMode();
   el['ResizeableDir'].editMode();
   el['RotatableDir'].editMode();
this.contentService.removeSvgActive();
}
this.activeSvg='';
 this.contentService.removeSvgsFromEdit();
  this.cdr.detectChanges();
}


cancelEditModeOfAssets(){
  let els = this.el.nativeElement.querySelectorAll('.selected');
  if(els){
    [].forEach.call(els,(el)=>{
      if(el.isEditing){
          el.isEditing = false;
           el.canDrag = true;
  el.classList.remove('selected');
   
   el['StretchableDir'].editMode();
   el['ResizeableDir'].editMode();
   el['RotatableDir'].editMode();
      }
    

    })
  }
}
}
