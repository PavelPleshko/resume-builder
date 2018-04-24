import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';



@Injectable()
export class ContentService {
selection:BehaviorSubject<any> = new BehaviorSubject<any>(null);
selectedElement:BehaviorSubject<any> = new BehaviorSubject<any>(null);
editableSvgs:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
activeSvg:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
selectedItemsWrapperPosition:BehaviorSubject<any>=new BehaviorSubject<any>(null);

  constructor() {}

pushIntoSelection(value:any,multi:boolean){
	if(multi){
		this.selection.next(value);
	}else{
		this.selectedElement.next(value);
	}
}

removeFromSelection(multi:boolean){
	if(multi){
		this.selection.next(null);
	}else{
		this.selectedElement.next(null);
	}
}

getSelectedElementVal(multi:boolean){
	let value;
	if(multi){
		value = this.selection.getValue();
	}else{
		value = this.selectedElement.getValue();
	}
	return value;
}

pushSvgsToEdit(svgEls){
	this.editableSvgs.next(svgEls);
}

removeSvgsFromEdit(){
	this.editableSvgs.next(null);
}


pushSvgActive(svg){
	this.activeSvg.next(svg);
}

removeSvgActive(){
	this.activeSvg.next(null);
}

pushSelectionWrapperPosition(pos){
	this.selectedItemsWrapperPosition.next(pos);
}

resetSelectionWrapperPosition(){
	this.selectedItemsWrapperPosition.next(null);
}

getSelectionWrapperPosition(){
	return this.selectedItemsWrapperPosition.getValue();
}



}
