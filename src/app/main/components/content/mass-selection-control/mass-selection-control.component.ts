import { Component, OnChanges,Input,OnInit,HostBinding,
	ChangeDetectionStrategy,ElementRef } from '@angular/core';
import {ContentService} from '../../../../common/services/content.service';

@Component({
  selector: 'app-mass-selection-control',
  templateUrl: './mass-selection-control.component.html',
  styleUrls: ['./mass-selection-control.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MassSelectionControlComponent implements OnInit{

@HostBinding('attr.class')
get mainClass(){
return 'draggable-control';
}

  constructor(private el:ElementRef,private contentService:ContentService) { }


ngOnInit(){
	this.update();
}


  update(){
  		let pos = this.getPosition();
  		this.contentService.pushSelectionWrapperPosition(pos);
  }

  getPosition(){
	let dims:ClientRect = this.el.nativeElement.getBoundingClientRect();
		  	let pos = {
		  		left:dims.left,
		  		top:dims.top,
		  		width:dims.width,
		  		height:dims.height,
		  		leftRelative:this.el.nativeElement.style.left.replace('px',''),
		  		topRelative:this.el.nativeElement.style.top.replace('px','')
		  	}
		  	return pos;
  }

}
