import { Component, OnInit,Input,AfterViewInit,
	ViewContainerRef,ViewChild,ChangeDetectionStrategy,
	ChangeDetectorRef,HostBinding} from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {fontFamily} from '../../../../common/styleOptions/font-family';
import {fontSize} from '../../../../common/styleOptions/font-size';
import {ContentService} from '../../../../common/services/content.service';
import {DataManagerService} from '../../../../common/services/data-manager.service';
import {pluck} from 'rxjs/operators/pluck';
import {tap} from 'rxjs/operators/tap';


export const stylesMap ={
fontFamily:{
	title:'fontFamily',
	units:''
},
fontSize:{
  	title:'fontSize',
  	units:'px'
},
textColor:{
  	title:'color',
  	units:''
},
textBold:{
  	title:'fontWeight',
  	units:'',
  	map:{
  		true:'bold',
  		false:''
  	}
},
textItalics:{
    title:'fontStyle',
  	units:'',
  	map:{
  		true:'italic',
  		false:''
  	}
},
textAlign:{
  	title:'textAlign',
  	units:''
},
textUppercase:{
  	title:'textTransform',
  	units:'',
  	map:{
  		true:'uppercase',
  		false:''
  	}
},
letterSpacing:{
    title:'letterSpacing',
  	units:'px'
},
lineHeight:{
  	title:'lineHeight',
  	units:''
}
};


@Component({
  selector: 'app-canvas-work-panel',
  templateUrl: './canvas-work-panel.component.html',
  styleUrls: ['./canvas-work-panel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CanvasWorkPanelComponent implements OnInit,AfterViewInit {
documentStylesForm:FormGroup;
@Input() currentData:any=null;
fontFamilyOptions:any;
fontSizeOptions:any;
@ViewChild('color_picker') color_picker:ViewContainerRef;

@HostBinding('class.panel_visible')
get visible(){
	return this._visible;
};

_visible:boolean = false;
  constructor(private fb:FormBuilder,private cdr:ChangeDetectorRef,
  	private contentService:ContentService,private dataManagerService:DataManagerService) { }

  ngOnInit() {
  	if(!this.currentData){
  		this.assignDefaultopts();
  	}
  	this.fontFamilyOptions = fontFamily;
  	this.fontSizeOptions = fontSize;
  	this.createForm();
  		this.contentService.selectedElement.subscribe((element)=>{
  		console.log(element)
  		if(element){
  			this._visible = true;
  			let data = this.extractDataFromElement(element);
  			this.updateForm(data);
  			this.cdr.markForCheck();
  		}else{
  			this._visible = false;
  			this.color_picker['closeDd']();
  			this.assignDefaultopts();
  			this.updateForm(this.currentData);
  		}
  		
  	})
  	this.documentStylesForm.valueChanges.subscribe((value)=>{
  		 if(value){
     		this.currentData = {...value};
     		this.applyStylesToElement(value);
     		this.cdr.markForCheck();
  		 }
  	})
  
  }

ngAfterViewInit(){
this.cdr.detectChanges();
}


  assignDefaultopts(){
  	this.currentData = {
  		fontFamily:'',
  		fontSize:'',
  		textColor:'#000000',
  		textBold:'',
  		textItalics:'',
  		textAlign:'left',
  		textUppercase:'',
  		letterSpacing:0,
  		lineHeight:1.5
  	}
  }

  createForm(){
  		this.documentStylesForm = this.fb.group({
  		fontFamily:[this.currentData.fontFamily],
  		fontSize:[this.currentData.fontSize],
  		textColor:[this.currentData.textColor],
  		textBold:[this.currentData.textBold],
  		textItalics:[this.currentData.textItalics],
  		textAlign:[this.currentData.textAlign],
  		textUppercase:[this.currentData.textUppercase],
  		letterSpacing:[this.currentData.letterSpacing],
  		lineHeight:[this.currentData.lineHeight]
  	});
  }

  
  extractDataFromElement(el){
  	let data:any = {};
  	data.fontFamily = el.style.fontFamily;
  	data.fontSize = el.style.fontSize.replace('px','');
  	data.textColor = el.style.color;
  	data.textBold = el.style.fontWeight=='bold';
  	data.textItalics = el.style.fontStyle == 'italic';
  	data.textAlign = el.style.textAlign;
  	data.textUppercase = el.style.textTransform == 'uppercase';
  	data.letterSpacing = el.style.letterSpacing;
  	data.lineHeight = el.style.lineHeight || 1.5;
  	return data;
  }

  updateForm(data){
  	this.documentStylesForm.patchValue(data);
  }

  applyStylesToElement(styles:any):void{
  	let el = this.contentService.getSelectedElementVal(false);
  	if(el && styles){
  		styles = this.mapStyleValues(styles);
  		for(var key in styles){
  			let styleVal = styles[key];
  			el.style[key]=styleVal;
  		}
  	}
  }

  mapStyleValues(styles:any):object{
  	let mapped:any={};
  	for(var key in styles){
  		let styleVal = styles[key];
  		if(stylesMap[key].hasOwnProperty('map')){
  			mapped[stylesMap[key].title]=stylesMap[key].map[styles[key]];
  		}else{
  			mapped[stylesMap[key].title] = styles[key]+stylesMap[key].units;
  		}
  	}
  	return mapped;
  }

  deleteSelectedEl():void{
  	let el = this.contentService.getSelectedElementVal(false);
  	let idx = el.id.split('-')[1];
  	if(idx){
  		this.dataManagerService.deleteAssetFromLayout(idx);
  	}
  }

  copySelectedEl():void{
  		let el = this.contentService.getSelectedElementVal(false);
  		let idx = el.id.split('-')[1];
	  	if(idx){
	  		this.dataManagerService.copyAndInsertAssetInLayout(idx);
	  	}
  }
}
