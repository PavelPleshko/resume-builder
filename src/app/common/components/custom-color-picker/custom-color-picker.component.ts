import { Component, forwardRef,ChangeDetectionStrategy,Input,ViewChild,ChangeDetectorRef,Output,EventEmitter,OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {DomSanitizer,SafeStyle} from '@angular/platform-browser';
const CUSTOM_SELECT_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomColorPickerComponent),
  multi: true
};
@Component({
  selector: 'app-custom-color-picker',
  templateUrl: './custom-color-picker.component.html',
  styleUrls: ['./custom-color-picker.component.scss'],
  providers: [CUSTOM_SELECT_ACCESSOR],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustomColorPickerComponent implements ControlValueAccessor,OnInit {
@Input() label:string;
@Input() sidePanel:boolean = false;
@ViewChild('dropDown') dropDown;
@Input() value: string='';
focused: string;
currentColor:any={};

@Output() valueChanged = new EventEmitter();
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

ngOnInit(){
  if(this.value){
    this.currentColor.rgb = this.value;
    this.cdr.markForCheck();
  }
}


   handleChange($event) {
    let color = $event.color.rgb;
    let colorStr = `rgba(${color.r},${color.g},${color.b},${color.a})`;
    this.value = colorStr;
    this.currentColor = {hex:$event.color.hex,rgb:colorStr};
    if(this.onModelChange && !this.sidePanel){
       this.onModelChange(this.value);
    }
}

pushColor(dropdownInstance){
  if(this.sidePanel && !dropdownInstance.isOpen() && this.currentColor){
    this.valueChanged.emit(this.currentColor);
    this.currentColor={};
  }
}

closeDd(){
  if(this.dropDown && this.dropDown.isOpen()){
    this.dropDown.close();
    this.currentColor={};
  }
}

}
