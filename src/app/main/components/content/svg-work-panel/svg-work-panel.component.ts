import { Component, OnInit,Input,ChangeDetectorRef,HostBinding,Renderer2,ChangeDetectionStrategy,AfterViewInit} from '@angular/core';
import {ContentService} from '../../../../common/services/content.service';
import {FormGroup,FormArray,FormBuilder} from '@angular/forms';
import {DataManagerService} from '../../../../common/services/data-manager.service';


export const svgStyles = {
	'zIndex':{
		title:'zIndex',
		units:''
	}
}
@Component({
  selector: 'app-svg-work-panel',
  templateUrl: './svg-work-panel.component.html',
  styleUrls: ['./svg-work-panel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SvgWorkPanelComponent implements OnInit,AfterViewInit {
currentSvgs:any;
currentColors:any = {};
svgForm:FormGroup;
@HostBinding('class.panel_visible')
get visible(){
return this._visible;
}

_visible:boolean = false;

  constructor(private contentService:ContentService,private dataManager:DataManagerService,
  	private cdr:ChangeDetectorRef,private fb:FormBuilder,
  	private renderer:Renderer2) { }

  ngOnInit() {
  	let self = this;
  	this.svgForm = this.fb.group({
  		colors:this.fb.array([]),
  		zIndex:[1]
  	})
  		this.contentService.editableSvgs.subscribe((svgs)=>{
  		if(svgs){
  			this.resetData();
  			setTimeout(()=>{
  				self._visible = true;
  			});
  			this.currentSvgs = svgs;
  			this.extractDataFromSvgs(this.currentSvgs);
  			let styles = this.getStylesFromSelectedEl();

  			this.svgForm.patchValue(styles);			
  		}else{
  			this._visible=false;
  			this.resetData();
  		}		
  	})

  		this.svgForm.get('colors').valueChanges.subscribe((value)=>{
  			if(value.length){
  				this.applyColors(value,this.currentSvgs);
  				this.cdr.detectChanges();
  				this.dataManager.changeSavedStatus(true);
  			}	
  		})
  			this.svgForm.valueChanges.subscribe((value)=>{
  			if(value){
  				this.applyStylesToSelectedEl(value);
  				this.cdr.detectChanges();
  				this.dataManager.changeSavedStatus(true);
  			}	
  		})
			
  }

  ngAfterViewInit(){
  	this.cdr.detach();
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
	this.svgForm.reset();
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

  applyStylesToSelectedEl(styles){
  	let selectedSvg = document.querySelector('.selected');
  	if(selectedSvg){
  		for(var key in styles){
  		if(key != 'colors' && styles[key]){
  			this.renderer.setStyle(selectedSvg,key,styles[key].toString());
  		}
  	}
  	}
  }

  getStylesFromSelectedEl(){
  		let selectedSvg:any = document.querySelector('.selected');
  		let data = {};
  	if(selectedSvg){
  		
  		for(var key in svgStyles){
  			data[svgStyles[key].title]=selectedSvg.style[svgStyles[key].title]
  		}
  	}
  	return data;
  }

  copySelectedEl(){
  	let el:any = this.contentService.activeSvg.getValue();
  	let id = el.getAttribute('id').split('-')[1];
  	let properties:any = {attrs:{},viewBox:null,pos:{height:undefined,width:undefined
  	},innerAssets:[]};
  	if(this.currentSvgs.length>1){
  			this.currentSvgs.forEach((svg,idx)=>{
  		properties.innerAssets[idx]={
  			'attrs':{
  				fill:svg.style.fill || '#000000'
  			}
  		}
  	})
  		}else{
  			properties.attrs['fill']=this.currentSvgs[0].style.fill || '#000000';
  			delete properties.innerAssets;
  		}
  
  	properties.viewBox = el.getAttribute('viewBox');
  	properties.pos['height'] = el.parentElement.style.height.replace('px','');
  	properties.pos['width'] = el.parentElement.style.width.replace('px','');
  	properties.pos['x'] = el.parentElement.style.left.replace('px','');
  	properties.pos['y'] = el.parentElement.style.top.replace('px','');
  	this.dataManager.copyAndInsertAssetInLayout(id,'svg',properties);
 
  }


    deleteSelectedEl():void{
  	let el = this.contentService.activeSvg.getValue();
  	let idx = el['id'].split('-')[1];
  	if(idx){
  		this.dataManager.deleteAssetFromLayout(idx,true);
  	}
  }
}
