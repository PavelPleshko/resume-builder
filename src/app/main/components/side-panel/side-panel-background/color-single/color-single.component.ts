import { Component, OnInit,Input,ChangeDetectionStrategy,
	Output,EventEmitter,AfterViewInit,ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-color-single',
  templateUrl: './color-single.component.html',
  styleUrls: ['./color-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  host:{
  	'(click)':'chooseBgColor()'
  }
})
export class ColorSingleComponent implements OnInit,AfterViewInit{
@Input() color;
@Input() gradient:boolean = false;
@Input() currentBg:string;
@Output() chooseColor = new EventEmitter();

get active(){
	return this.color.hex == this.currentBg || this.color.rgb == this.currentBg;
}


  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  	this.cdr.detach();
  }
  
chooseBgColor(){
this.chooseColor.emit({color:this.color,gradient:this.gradient});
}
}
