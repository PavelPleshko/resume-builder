import { Component, OnInit,Input,AfterViewInit,
	ViewContainerRef,ViewChild,ChangeDetectionStrategy,
	ChangeDetectorRef,HostBinding} from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {fontFamily} from '../../../../common/styleOptions/font-family';
import {fontSize} from '../../../../common/styleOptions/font-size';
import {textDecor} from '../../../../common/styleOptions/text-decoration';
import {ContentService} from '../../../../common/services/content.service';
import {DataManagerService,ILayoutElement} from '../../../../common/services/data-manager.service';
import {pluck} from 'rxjs/operators/pluck';
import {tap} from 'rxjs/operators/tap';
import {merge} from 'rxjs/observable/merge';
import {map} from 'rxjs/operators/map';



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
},
textDecoration:{
    title:'textDecoration',
    units:''
},
zIndex:{
    title:'zIndex',
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
textDecorOptions:any;
currentStyles:any={};
massSelectionActive:boolean = false;
groupingAllowed:boolean = false;
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
    this.textDecorOptions=textDecor;
  	this.createForm();
    let massSelection = this.contentService.selection;
    let singleSelection = this.contentService.selectedElement;
  		let selectionSub = merge(massSelection,singleSelection).pipe(map((val)=>{
        if((val instanceof Array) && val.length<1){
          return null;
        }
        return val;
      })).subscribe((incomingData)=>{
  		if(incomingData){
  			
  			let data={};
        this.massSelectionActive=false;
        this.groupingAllowed = false;
        if(incomingData instanceof Array){
         this.massSelectionActive=true;
           if(incomingData.length < 1) return;
           this._visible = true;
           this.groupingAllowed = incomingData.every((el)=>!el.className.includes('svg-element'));
        }else{
            this._visible = true;
            data = this.extractDataFromElement(incomingData);
            this.updateForm(data);
        }
  			
  			this.cdr.markForCheck();
  		}else{
  			this._visible = false;
  			this.color_picker['closeDd']();
  			this.assignDefaultopts();
  			this.updateForm(this.currentData);
        this.cdr.markForCheck();
  		}
  	})

  	this.documentStylesForm.valueChanges.subscribe((value)=>{
  		 if(value){
     		this.currentData = {...value};
     		this.applyStyles(value);
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
  		lineHeight:1.5,
      textDecoration:'none',
      zIndex:'1'
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
  		lineHeight:[this.currentData.lineHeight],
      textDecoration:[this.currentData.textDecoration],
      zIndex:[this.currentData.zIndex]
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
    data.textDecoration=el.style.textDecoration || 'none';
    data.zIndex = el.style.zIndex || '1';
  	return data;
  }

  updateForm(data){
  	this.documentStylesForm.patchValue(data);
  }

  applyStyles(styles:any):void{
    let selected;
    if(this.massSelectionActive){
      selected = this.contentService.getSelectedElementVal(true);
    }else{
      selected = this.contentService.getSelectedElementVal(false);
    }
  	
  	if(selected && styles){


  		styles = this.mapStyleValues(styles);

      this.currentStyles = Object.assign({},styles);

  		for(var key in styles){
  			let styleVal = styles[key];
        if(selected instanceof Array){
          selected.forEach((el)=>{
            el.style[key]=styleVal;
          })
        }else{
          selected.style[key]=styleVal;
        }
  			
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
      while(!this.doesIdInclude(el.id,'asset')){
           el=el.parentElement;
         }
  		let idx = el.id.split('-')[1];
	  	if(idx){
        let properties:ILayoutElement = new ILayoutElement();
        this.getChildrenData(el,properties);
       console.log(properties);
        properties.mainStyles = this.getElementStyles(el);
        properties.mainStyles['width']=  el.style.width;
         properties.mainStyles['height']=  el.style.height;
       
	  		this.dataManagerService.copyAndInsertAssetInLayout(idx,'default',properties);
	  	}
  }


  groupSelectedEls(){
    if(this.groupingAllowed){
       let elements = this.contentService.getSelectedElementVal(true);
       let groupedElement:ILayoutElement = new ILayoutElement();
       let currentWrapperPosition = this.contentService.getSelectionWrapperPosition();
       groupedElement.attrs['x']=currentWrapperPosition.left;
       groupedElement.attrs['y']=currentWrapperPosition.top;
       groupedElement.mainStyles={
         'width':currentWrapperPosition.width+'px',
         'height':currentWrapperPosition.height+'px'
       }
       if(elements){
         elements = elements.filter((el)=>this.doesIdInclude(el.id,'asset'));
         elements.forEach((element,idx)=>{
           let el = new ILayoutElement();
         
            let dims:ClientRect = element.getBoundingClientRect();

           
         })
       }
    }
   
  }

  doesIdInclude(id:string,searchItem:string){
    return id.includes(searchItem);
  }


  getChildrenData(el,properties){
          if(el.children.length>0){
           let parentContent = el.querySelector('.single-parent-content');
           if(parentContent){
             properties.content = parentContent.textContent;
           }
           [].forEach.call(el.children,(child,idx)=>{
             if(this.doesIdInclude(child.id,'inner')){
               if(child.textContent && child.textContent.length){
                  properties.innerAssets[idx] = new ILayoutElement();
                  properties.innerAssets[idx].mainStyles=this.getElementStyles(child);
                  if(child.children && child.children.length > 0){
                    this.getChildrenData(child,properties.innerAssets[idx]);
                  }
                  properties.innerAssets[idx].content=child.textContent;
               }
             }
           })
         }
         return properties;
  }


  getElementStyles(el){

    let stylesObj={};
    let elStyles = el.style;
    for(var key in stylesMap){
      if(elStyles[stylesMap[key].title]){
        stylesObj[key]=elStyles[stylesMap[key].title];
      }
    }
    console.log(stylesObj);
    return stylesObj;
  }
}
