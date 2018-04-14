import { Component, forwardRef,Input,OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_SELECT_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomSelectInputComponent),
  multi: true
};

@Component({
  selector: 'app-custom-select-input',
  templateUrl: './custom-select-input.component.html',
  styleUrls: ['./custom-select-input.component.scss'],
    providers: [CUSTOM_SELECT_ACCESSOR],
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class CustomSelectInputComponent implements ControlValueAccessor{
@Input() selectList;
@Input() font:boolean = false;
@Input() label:string = 'Custom select';
value: string[] = [];
focused: string;
private onTouch: Function;
private onModelChange: Function;

  constructor(private cdr:ChangeDetectorRef) { }

registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  writeValue(value) {
    this.value = value;
    this.cdr.detectChanges();
}


  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
}

findItemInListById(id:number,list:any){
let item = list.find((singleItem)=>{
	return singleItem.id == id;
});
if(item){
	return item;
}else{
	return '';
}
}

updateValue(id:number){
let item = this.findItemInListById(id,this.selectList);
if(item){
	this.value = item.name;
	this.onModelChange(this.value);
}
this.cdr.detectChanges();

}

}
