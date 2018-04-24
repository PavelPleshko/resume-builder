import { Component, forwardRef,Input,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CUSTOM_SELECT_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomNumberInputComponent),
  multi: true
};

@Component({
  selector: 'app-custom-number-input',
  templateUrl: './custom-number-input.component.html',
  styleUrls: ['./custom-number-input.component.scss'],
    providers: [CUSTOM_SELECT_ACCESSOR],
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class CustomNumberInputComponent implements ControlValueAccessor{
@Input() label:string = 'Custom number';
value:number;
focused: string;
@Input() step:number = 1;
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

  increment(){
  this.value =Number(this.value) + this.step;
  this.onModelChange(this.value);
  }

  decrement(){
  this.value=Number(this.value) - this.step;
  if(this.value <= 0){
  this.value = 0;
  }
  this.onModelChange(this.value);
  }

}
