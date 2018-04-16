import { Component, OnInit,AfterViewInit,Input,
	ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: '[appElementSingle]',
  templateUrl: './element-single.component.html',
  styleUrls: ['./element-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ElementSingleComponent implements OnInit,AfterViewInit {
@Input() element:any;
  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
  	this.cdr.detach();
  }

}
