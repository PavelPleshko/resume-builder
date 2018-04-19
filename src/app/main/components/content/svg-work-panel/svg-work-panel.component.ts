import { Component, OnInit,Input,ChangeDetectorRef,HostBinding,Renderer2 } from '@angular/core';
import {ContentService} from '../../../../common/services/content.service';
import {FormGroup,FormArray,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-svg-work-panel',
  templateUrl: './svg-work-panel.component.html',
  styleUrls: ['./svg-work-panel.component.scss'],
})
export class SvgWorkPanelComponent implements OnInit {
currentSvgs:any;
currentColors:any = {};
svgForm:FormGroup;

@HostBinding('class.panel_visible')
get visible(){

return this._visible;
}

_visible:boolean = false;

  constructor(private contentService:ContentService,
  	private cdr:ChangeDetectorRef,private fb:FormBuilder,
  	private renderer:Renderer2) { }

  ngOnInit() {
  	let self = this;
  	this.svgForm = this.fb.group({
  		colors:this.fb.array([])
  	})
  		this.contentService.editableSvgs.subscribe((svgs)=>{
  		if(svgs){
  			this.resetData();
  			setTimeout(()=>{
  				self._visible = true;
  			});
  			this.currentSvgs = svgs;
  			this.extractDataFromSvgs(this.currentSvgs);			
  		}else{
  			this._visible=false;
  			this.resetData();
  		}		
  	})

  		this.svgForm.get('colors').valueChanges.subscribe((value)=>{
  			this.applyColors(value,this.currentSvgs);
  		})
			
  }


  extractDataFromSvgs(svgs){

  	[].forEach.call(svgs,(svg,idx)=>{
  		let color = svg.style.fill || '#000000';	
  		this.currentColors[idx]= color;
  		this.addColor(color);
  	})
  }

  resetData(){
  	this.currentColors={};
  	this.currentSvgs=[];
  	let formArr = this.svgForm.get('colors') as FormArray;
  while (0 !== formArr.length) {
    formArr.removeAt(0);
	}
  }

  createColorControl(value?){
  	if(value){
  		return this.fb.control(value);
  	}
  }

  addColor(val){
  	let form = this.svgForm.get('colors') as FormArray;
  	form.push(this.createColorControl(val));
  }

  applyColors(values,svgs){
  	svgs.forEach((svg,idx)=>{
  		svg.style.fill=values[idx];
  	})
  }

}
