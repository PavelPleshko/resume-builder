import { Component,AfterViewInit,Input,
	ChangeDetectionStrategy,ChangeDetectorRef,HostListener,Output,EventEmitter } from '@angular/core';

@Component({
  selector: '[appElementSingle]',
  templateUrl: './element-single.component.html',
  styleUrls: ['./element-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ElementSingleComponent implements AfterViewInit {
@Input() element:any;
@Output() chooseElement = new EventEmitter();
  constructor(private cdr:ChangeDetectorRef) { }

@HostListener('click')
chooseElementHandler(){
this.chooseElement.emit(this.element);
}

  ngAfterViewInit(){
  	this.cdr.detach();
  }

}
