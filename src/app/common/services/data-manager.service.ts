import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {mergeObject,doesIdInclude} from '../helpers/functions';


export type TStatus = 'Unsaved changes' | 'All changes saved';

export class ILayoutSvgElement{
	id?:number=null;
	type?:string='';
	pos?:object={};
	attrs:object={};
	name?:string='';
	url?:string='';
	element?:string='';
	path?:string='';
	viewBox?:string='';
	innerAssets?:ILayoutSvgElement[] | any=[];
	changable?:boolean = false;
	stretchable?:boolean = false;
	stretchWhileResize?:boolean = false;
	transform?:string;
	scalable?:object;
	fixed?:boolean;
	standalone?:boolean=false;
}

export class ILayoutElement{
	id?:number;
	attrs:object={};
	element:string;
	content?:string;
	innerAssets?:ILayoutElement[]=[];
	mainStyles?:object={};
	extraStyles?:object={};
	groupedElements?:Array<any>=[];
	grouped?:boolean = false;
	list?:boolean=false;
}

export class ILayout{
	id:string='';
	title:string='Untitled';
	background:string='#ffffff';
	backgroundClass?:string ='';
	image?:string='';
	assets?:Array<ILayoutElement>=[];
	svgAssets?:Array<ILayoutSvgElement>=[];
	updated?:Date=new Date();
}


export interface AppState{
	layouts:ILayout[],
	activeLayout:ILayout,
	activeSetOfElements:any[],
	statusSaved:TStatus
}


@Injectable()
export class DataManagerService {
data:BehaviorSubject<AppState>;
savedDocsChanged:BehaviorSubject<boolean>;
currentIds:any=[];
layoutIds:any=[];

  constructor() { 

  	let data:AppState = {
  		layouts:this.getLayouts(),
  		activeLayout:this.createNewLayout(),
  		activeSetOfElements:[],
  		statusSaved:'All changes saved'
  	}
	this.data = new BehaviorSubject<AppState>(data);
	this.savedDocsChanged = new BehaviorSubject(true);
  }

  createNewLayout(){
  	let layout = new ILayout();
  	layout.id = generateUI(this.layoutIds);
  	return layout;
  }


updateTitle(newTitle){
let data = this.data.getValue();
let newData:AppState= {...data,activeLayout:{...data.activeLayout,title:newTitle}};
this.data.next(newData);
this.changeSavedStatus(true);
}

chooseLayout(id:string){
	let data = this.data.getValue();
	let chosenLayout = this.getLayouts().filter(layout=>layout.id == id)[0];
	let newData:AppState= {...data,activeLayout:chosenLayout};
	this.data.next(newData);
	this.changeSavedStatus(true);
}

createNewDocument(){
let data = this.data.getValue();
let layout = this.createNewLayout();
let newData:AppState = {...data,activeLayout:layout};
this.data.next(newData);
this.changeSavedStatus(true);
}

deleteSavedDocument(id){
	return new Promise((resolve,reject)=>{
		let docsArray = window.localStorage.getItem('savedDocsResumeBuilder');
	if(docsArray){
		let updatedDocsArray = JSON.parse(docsArray);
		let doc = this.findElementInArray(updatedDocsArray,id);
		if(doc){
			updatedDocsArray = [].filter.call(updatedDocsArray,(docSingle:ILayout)=>{
				return docSingle.id != id;
			})
			updatedDocsArray = JSON.stringify(updatedDocsArray);
			window.localStorage.setItem('savedDocsResumeBuilder',updatedDocsArray);
			this.savedDocsChanged.next(true);
			resolve(doc.title);
		}else{
			reject('Document is not found');
		}
	}

	})
	

}
saveCurrentDocument(){
	return new Promise((resolve,reject)=>{
		let currentDoc:AppState = this.data.getValue();
		let dbKey = 'savedDocsResumeBuilder';
		let key = `${currentDoc.activeLayout.title}-${new Date()}`;
		let item = JSON.stringify(currentDoc);
		let items = window.localStorage.getItem(dbKey);
		let date = new Date();	
		let assets = document.querySelectorAll('.text-asset');
		let assetsArr:ILayoutElement[] = [];
		let svgAssets = document.querySelectorAll('.svg-asset');
		let svgAssetsArr:ILayoutSvgElement[] = [];
		
		[].forEach.call(assets,(asset,idx)=>{
			assetsArr[idx] = this.getChildrenData(asset,new ILayoutElement());
			assetsArr[idx].attrs['x'] = asset.style.left.replace('px','');
			assetsArr[idx].attrs['y'] = asset.style.top.replace('px','');
		});

		[].forEach.call(svgAssets,(svgAsset,idx)=>{
			svgAssetsArr[idx] = this.getSvgAssetData(svgAsset,new ILayoutSvgElement());
		})
		currentDoc.activeLayout.assets = assetsArr;
		currentDoc.activeLayout.svgAssets = svgAssetsArr;
		if(items){
		let list = JSON.parse(items);
			let found = list.findIndex((doc)=>{
				return doc.id == currentDoc.activeLayout.id;
			});
			currentDoc.activeLayout.updated = date;
			if(found>=0){
				list.splice(found,1,currentDoc.activeLayout);
			}else{
				list.push(currentDoc.activeLayout);
			}
			list = JSON.stringify(list);
			window.localStorage.setItem(dbKey,list);
		}else{
			currentDoc.activeLayout.updated = date;
			let element = JSON.stringify([currentDoc.activeLayout]);
			window.localStorage.setItem(dbKey,element);
		}
		this.savedDocsChanged.next(true);
		resolve(currentDoc.activeLayout.title);
	});	
}

changeSavedStatus(isChanged:boolean){
	let data = this.data.getValue();
	let status:TStatus;
if(isChanged){
 status = 'Unsaved changes';
}else{
	status='All changes saved';
}
let newData:AppState = {...data,statusSaved:status};
this.data.next(newData);
}

changeCurrentProject(project){
	let data = this.data.getValue();
	let newData:AppState = {...data,activeLayout:project};
	this.data.next(newData);
}




getSvgAssetData(svg,properties:ILayoutSvgElement){
  	properties.viewBox = svg.getAttribute('viewBox');
  	properties.pos['height'] = svg.parentElement.style.height.replace('px','');
  	properties.pos['width'] = svg.parentElement.style.width.replace('px','');
  	properties.pos['x'] = svg.parentElement.style.left.replace('px','');
  	properties.pos['y'] = svg.parentElement.style.top.replace('px','');
  	properties.attrs['z-index'] = svg.parentElement.style.zIndex;
  	properties.attrs['transform'] = svg.parentElement.style.transform;


  	let id = svg.id;
  	if(id){
  		properties.id = id.split('-')[1];
  	}
  	let children = [].filter.call(svg.children,(svg)=>{
  		return svg.tagName != 'comment';
  	})
  	if(children && children.length == 1){
  		if(children[0].getAttribute('changable')){
  			properties.changable = children[0].getAttribute('changable');
  			properties.attrs['fill']=children[0].style.fill;
  		}	
  		  	properties.stretchable = children[0].getAttribute('stretchable');
  			properties.stretchWhileResize = children[0].getAttribute('stretchWhileResize');
  			this.getSvgAssetChildrenData(children[0],properties);
  	}
  	return properties;
}

getSvgAssetChildrenData(child,container:ILayoutSvgElement){
if(child.children && child.children.length == 1 && !child.children[0].getAttribute('standalone')){
	let newChild = child.children[0];
	switch (newChild.tagName.toLowerCase()){
		case "path":
				container.path = newChild.getAttribute('d');
				delete container.element;
			break;
		case "rect":
				container.attrs['width'] = newChild.getAttribute('width');
				container.attrs['height'] = newChild.getAttribute('height');
				container.pos['x'] = newChild.getAttribute('x');
				container.pos['y'] = newChild.getAttribute('y');
				container.element = newChild.tagName.toLowerCase();
			break;
		case "circle":
			container.attrs['cx'] = newChild.getAttribute('cx');
			container.attrs['cy'] = newChild.getAttribute('cy');
			container.attrs['r'] = newChild.getAttribute('r');
			container.element = newChild.tagName.toLowerCase();
			break;
		case "polygon":
			container.attrs['points'] = newChild.getAttribute('points');
			container.element = newChild.tagName.toLowerCase();
			break;
	}
	container.attrs['fill'] = newChild.style.fill;
	container.transform = child.getAttribute('transform');
	container.changable = newChild.getAttribute('changable') || false;	
}else{
  		[].forEach.call(child.children,(child,idx)=>{
  			let newSvgAsset = new ILayoutSvgElement();
  			newSvgAsset.attrs['fill'] = child.style.fill;
  			container.innerAssets[idx]=this.getSvgAssetChildrenData(child,newSvgAsset);
  		}) 	
}
	return container;
}

  getChildrenData(el,properties,groupedEl?){
          if(el.children && el.children.length>0){
           let parentContent = el.querySelector('.single-parent-content');
           if(parentContent){
             properties.content = parentContent.textContent;
             if(parentContent.tagName){
                 properties.element = parentContent.tagName.toLowerCase();
             }
             properties.mainStyles = this.getElementStyles(parentContent.parentElement,groupedEl);
           }else{
             properties.mainStyles = this.getElementStyles(el,groupedEl);
           }
           [].forEach.call(el.children,(child,idx)=>{
             if(doesIdInclude(child.id,'inner')){
               if(child.textContent && child.textContent.length){
                  properties.innerAssets[idx] = new ILayoutElement();
                  properties.innerAssets[idx].mainStyles=this.getElementStyles(child,groupedEl);
                  properties.innerAssets[idx].element = child.getAttribute('list-element') == 'true' ? 'li' : child.tagName.toLowerCase();

                  properties.innerAssets[idx].list = child.getAttribute('list-element') == 'true' ? true : false;
                  properties.innerAssets[idx].content=child.textContent;
                  if(child.children && child.children.length > 0){
                    this.getChildrenData(child,properties.innerAssets[idx],groupedEl);
                  }
                  
               }
             }
           })
         }
         return properties;
  }

  getElementStyles(el,groupedEl?){
    let stylesObj={};
    let elStyles = el.style;
    for(var key in elStyles){
      if(elStyles[key] && elStyles[key].length>0 && key !='length' && key != 'top' && key != 'left' && key != 'cssText'){
        stylesObj[key]=elStyles[key];
      }
    }
    if(groupedEl){
      let left = groupedEl.attrs['x'];
      let top = groupedEl.attrs['y'];
      let elDims:ClientRect = el.getBoundingClientRect();
      let parElDims:ClientRect = el.parentElement.getBoundingClientRect();
      let translate,trX,trY;
    
      if(el.tagName != 'LI' && el.getAttribute('translatable') == 'true'){
         trX= (elDims.left-parElDims.left)-left;
         trY= (elDims.top-parElDims.top)-top;
         translate = `translateX(${trX}px) translateY(${trY}px)`;
         stylesObj['transform'] = translate;
      }
    }
    return stylesObj;
  }


getLayouts():ILayout[]{
	return [
	{id:'1',title:'bold',background:'#ffffff',image:'/assets/layouts/bold.svg',svgAssets:[],assets:[

	{id:1,attrs:{x:81,y:34},element:'span',mainStyles:{'font-size':'36px','color':'#009191','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'},
	content:'Jessica '},
	{id:2,attrs:{x:210,y:34},element:'span',content:'Claire',
	mainStyles:{'color':'#3f3f40','font-size':'36px','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'}},

	{id:3,attrs:{x:543,y:38},element:'span',content:'H: 508-278-2542  ',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:4,attrs:{x:637,y:37},element:'span',content:'|',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:5,attrs:{x:650,y:38},element:'span',content:'C: 781-669-5989',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:6,attrs:{x:520,y:55},element:'span',content:'123 Main Street, San Francisco, CA 94122 ',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:7,attrs:{x:613,y:75},element:'span',content:'jessica.claire@live.com ',mainStyles:{'color':'#00ACEC','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
		
		{id:8,attrs:{x:83,y:110},mainStyles:{background:'#000000',width:'650px','min-height':'3px'},element:'div'
		},

	{id:9,attrs:{x:81,y:125},mainStyles:{'color':'#b7b7b7','font-size':'16px','font-weight':'bold','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'},element:'span',content:'Professional'},
	{id:10,attrs:{x:81,y:149},mainStyles:{'color':'#b7b7b7','font-size':'16px','font-weight':'bold','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'},element:'span',content:'Summary'},

	
		{id:11,attrs:{x:229,y:126},element:'div',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'65%'},content:`Successful sales professional with 10+ years experience in large-scale food and retail environments. 
		Implement cost control measures to ensure operations remain within company targets. Maximize bottom-line performance through P&L, merchandising, staff management, loss control and inventory management initiatives.`},


	{id:12,attrs:{x:82,y:213},element:'span',mainStyles:{'color':'#b7b7b7','font-size':'16px','font-weight':'bold','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'},content:'Skills'},

	
		{id:13,attrs:{x:229,y:213},mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},element:'span',content:'Executive team leadership'},
		{id:14,attrs:{x:229,y:229},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Inventory report generation'},
		{id:15,attrs:{x:229,y:244},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Client/Vendor relations'},
		{id:16,attrs:{x:229,y:260},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Market analysis'},

	
		{id:17,attrs:{x:482,y:213},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Budgeting and finance'},
		{id:18,attrs:{x:482,y:229},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Project management'},
		{id:19,attrs:{x:482,y:244},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Team liaison'},
		{id:20,attrs:{x:482,y:260},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Strong verbal communication'},

	{id:21,attrs:{x:82,y:306},element:'span',mainStyles:{'color':'#b7b7b7','font-size':'16px','font-weight':'bold','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'},content:'Work history'},
	{id:22,attrs:{x:228,y:303},element:'span',mainStyles:{'font-size':'13px','font-weight':'bold','font-family':'Roboto Condensed,sans-serif'},content:'District Manager'},
	{id:23,attrs:{x:338,y:303},element:'span',mainStyles:{'font-size':'13px','font-style':'italic','font-family':'Roboto Condensed,sans-serif'},content:'Verizon Wireless'},
	{id:24,attrs:{x:228,y:321},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'San Francisco, CA'},
	{id:25,attrs:{x:342,y:321},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'September 2009 to Current'},

	{id:26,attrs:{x:235,y:345},element:'ul',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},
	innerAssets:[
		{attrs:{},mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},element:'li',content:'Directed recruitment/training/staff development initiatives to maximize productivity and revenue potential through development of a sales team.'},
		{attrs:{},mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},element:'li',content:'Successfully increased employee retention by created a positive work environment in 18 stores.'},
		{attrs:{},mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},element:'li',content:'Administered daily operations to ensure policies were adhered to and understood by sales staff.'},
		{attrs:{},mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},element:'li',content:'Cultivated strong business relationships with customers to drive business development.'},
		{attrs:{},mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},element:'li',content:'Planned and executed floor merchandising initiatives in collaboration with merchandise management.'},
		{attrs:{},mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},element:'li',content:'Ensure store is prepared for internal audits through analysis/preparation of quality assurance and Inventory statistics.'},
		]},


	{id:27,attrs:{x:228,y:568},element:'span',mainStyles:{'font-size':'13px','font-weight':'bold','font-family':'Roboto Condensed,sans-serif'},content:'Operations manager'},
	{id:28,attrs:{x:370,y:568},element:'span',mainStyles:{'font-size':'13px','font-style':'italic','font-family':'Roboto Condensed,sans-serif'},content:'Walgreens, Inc '},
	{id:29,attrs:{x:228,y:588},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'San Francisco, CA'},
	{id:30,attrs:{x:342,y:588},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'August 1997 to September 2009'},

	{id:31,attrs:{x:235,y:610},element:'ul',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},
	innerAssets:[
		{attrs:{},element:'li',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},content:'Oversaw opening/closing operations for a $4 million annual revenue store in compliance with current company policies/procedures.'},
		{attrs:{},element:'li',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},content:'Managed operational costs by spearheading inventory control and leading shipping department activities as well as setting wage targets.'},
		{attrs:{},element:'li',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif','width':'85%'},content:'Administered financial processes including accounts payable/accounts receivable, managing an accounting office and updating customer service files.'},
		]},

	{id:32,attrs:{x:81,y:745},element:'span',mainStyles:{'color':'#b7b7b7','font-size':'16px','font-weight':'bold','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'},content:'Education'},

	
		{id:33,attrs:{x:229,y:741},element:'span',mainStyles:{'font-weight':'bold','font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Master of Business Administration'},
		{id:34,attrs:{x:418,y:741},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'- Operations Management Speech and Communication,'},
		{id:35,attrs:{x:229,y:760},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Sociology and Psychology'},
		{id:36,attrs:{x:388,y:760},element:'span',mainStyles:{'font-style':'italic','font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'San Francisco State University'},
		{id:37,attrs:{x:228,y:779},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'San Francisco, CA'},
		{id:38,attrs:{x:344,y:779},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'2009'},
		{id:39,attrs:{x:228,y:799},element:'span',mainStyles:{'font-size':'13px','font-family':'Roboto Condensed,sans-serif'},content:'Coursework include: Speech and Communication, Sociology and Psychology'},
	]},
	];
}


deleteAssetFromLayout(index:any,svg?:boolean):void{
	let data = this.data.getValue();
	let activeLayout = data.activeLayout;
	let assets =svg ? 'svgAssets' : 'assets';
	let newAssets = activeLayout[assets].filter((asset)=>asset.id != index);
	this.currentIds = this.currentIds.filter((id)=>id != index);
	let newData:AppState= {...data,activeLayout:{...activeLayout,[assets]:newAssets}};
	this.data.next(newData);
	this.changeSavedStatus(true);
}

copyAndInsertAssetInLayout(index:any,type:string,properties?:any):void{
	let newAsset:ILayoutElement | any;
	let assets:string;
	let attrs:string;
	let data = this.data.getValue();
	let activeLayout = data.activeLayout;
	assets = type == 'svg' ? 'svgAssets' : 'assets';
	attrs = type == 'svg' ? 'pos' : 'attrs';
	let assetToCopy = activeLayout[assets].find((asset)=>asset.id == index);

	if(assetToCopy){
		newAsset = copy(assetToCopy);
		if(properties){
			newAsset = this.mergeRecursive(newAsset,properties);		
		}
		
		newAsset.id = generateUI(this.currentIds);
		newAsset[attrs]['x'] =Number(newAsset[attrs]['x'])+10;
		newAsset[attrs]['y'] =Number(newAsset[attrs]['y'])+10;
		activeLayout[assets] = [...activeLayout[assets],newAsset];
		let newData:AppState= {...data,activeLayout:activeLayout};
		this.data.next(newData);
		this.changeSavedStatus(true);
	}else{
		return;
	}
}


mergeRecursive(mainObj,props?){
	let newObj:any = {};
	if(props){
		newObj = mergeObject(mainObj,props,null);
		if(mainObj.innerAssets && mainObj.innerAssets.length){
		mainObj.innerAssets.forEach((asset,idx)=>{
			newObj.innerAssets[idx]=this.mergeRecursive(asset,props.innerAssets[idx]);
		})
	}
	}else{
		newObj = mainObj;
	}
	
	
	return newObj;
}

changeBgColor(value:string,isGradient:boolean):void{
let data = this.data.getValue();
let activeLayout = data.activeLayout;
this.resetBackground(activeLayout);
let propertyToChange = isGradient ? 'backgroundClass' : 'background';
activeLayout[propertyToChange] = value;
let newData:AppState= {...data,activeLayout:activeLayout};
		this.data.next(newData);
		this.changeSavedStatus(true);
}

resetBackground(layout:ILayout){
layout.background='';
layout.backgroundClass='';
}

addNewElement(element:ILayoutElement,type?:string,grouping?:boolean){
	let property;
	if(!type || type == 'standard'){
		property = 'assets';
	}else if(type=='svg'){
		property = 'svgAssets';
	}
let data = this.data.getValue();
let activeLayout = data.activeLayout;
let assets = activeLayout[property];
element.id=generateUI(this.currentIds);
let newAssets = assets.concat(element)
		let newData:AppState= {...data,activeLayout:{...activeLayout,[property]:newAssets}};
		this.data.next(newData);
		if(!grouping){
			this.changeSavedStatus(true);
		}
		
}

changeActiveSetOfElements(els){
	let data = this.data.getValue();
	let newData:AppState= {...data,activeSetOfElements:els};
	this.data.next(newData);
}

groupElements(groupedElement,assetsToDelete){
	let data = this.data.getValue();
	let activeLayout = data.activeLayout;

	assetsToDelete.forEach(id=>{
		activeLayout.assets = activeLayout.assets.filter((asset)=>asset.id != id);
	})
	this.addNewElement(groupedElement,'standard',true);
	this.changeSavedStatus(true);
}


ungroupElements(asset:ILayoutElement){
if(asset && asset.groupedElements){
	this.deleteAssetFromLayout(asset.id,false);
	let elementsToAdd = asset.groupedElements;

	elementsToAdd.forEach(element=>{
		this.addNewElement(element,'standard',true);
	})
	this.changeSavedStatus(true);
}
}


findElementInArray(array,elId){
	return array.filter((asset)=>asset.id==elId)[0]
}

findAsset(id){
	let assets = this.data.getValue().activeLayout.assets;
	let asset = this.findElementInArray(assets,id);
	return asset;
}


}

function generateUI(currentIds){
  var text = "",
      possible = "ABCDEF",
  possibleNums = "0123456789";
  for( var i=0; i < 2; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  for( var j=0; j < 3; j++ ){
    text += possibleNums.charAt(Math.floor(Math.random() * 10));
  }
return currentIds.indexOf(text)<0 ? (currentIds.push(text),text) : generateUI(currentIds);
}


function copy(aObject) {
  var bObject, v, k;
  bObject = Array.isArray(aObject) ? [] : {};
  for (k in aObject) {
    v = aObject[k];
    bObject[k] = (typeof v === "object") ? copy(v) : v;
  }
  return bObject;
}