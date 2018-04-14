import { Component, OnInit,Input,ChangeDetectionStrategy} from '@angular/core';
@Component({
  selector: 'app-content-canvas',
  templateUrl: './content-canvas.component.html',
  styleUrls: ['./content-canvas.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,

})
export class ContentCanvasComponent implements OnInit {
@Input() layout:any;

currentRatio=1;
currentWidth:number = 816;
currentHeight:number = 1055;


get backgroundColor(){
	if(this.layout && this.layout.background){
		return this.layout.background;
	}else{
		return '#ffffff';
	}
}


  constructor(){ }

  ngOnInit(){
  	this.getCurrentDimensions();
  }

getCurrentDimensions(){
	this.currentHeight *= this.currentRatio;
	this.currentWidth *= this.currentRatio;
}

}
