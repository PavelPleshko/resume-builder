import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


export interface ILayoutSvgElement{
	id?:number;
	type?:string;
	pos?:object;
	attrs:object;
	name?:string;
	url?:string;
	element?:string;
	path?:string;
	viewBox?:string;
	innerAssets?:ILayoutSvgElement[] | any;
	changable?:boolean;
	stretchable?:boolean;
	stretchWhileResize?:boolean;
}

export interface ILayoutElement{
	id?:number;
	attrs:object;
	element:string;
	content?:string;
	innerAssets?:ILayoutElement[];
	mainStyles?:object;
	extraStyles?:object;
}

export class ILayout{
	id:string='';
	title:string='Untitled';
	background:string='#ffffff';
	backgroundClass?:string ='';
	image?:string='';
	assets?:Array<ILayoutElement>=[];
	svgAssets?:Array<ILayoutSvgElement>=[];
}


export interface AppState{
	documentTitle:string,
	layouts:ILayout[],
	activeLayout:ILayout,
	activeSetOfElements:any[]
}


@Injectable()
export class DataManagerService {
data:BehaviorSubject<AppState>;
currentIds:any=[];

  constructor() { 
  	let data:AppState = {
  		documentTitle:'Untitled',
  		layouts:this.getLayouts(),
  		activeLayout:new ILayout(),
  		activeSetOfElements:[]
  	}
	this.data = new BehaviorSubject<AppState>(data);
  }


updateTitle(newTitle){
let data = this.data.getValue();
let newData:AppState= {...data,documentTitle:newTitle};
this.data.next(newData);
}

chooseLayout(id:string){
	let data = this.data.getValue();
	let chosenLayout = this.getLayouts().filter(layout=>layout.id == id)[0];
	let newData:AppState= {...data,activeLayout:chosenLayout};
	this.data.next(newData);
}

getLayouts():ILayout[]{
	return [
	{id:'1',title:'centered',background:'#ffffff',image:'/assets/layouts/centered.svg',assets:[]},

	{id:'2',title:'bold',background:'#ffffff',image:'/assets/layouts/bold.svg',svgAssets:[],assets:[

	{id:1,attrs:{x:81,y:34},element:'span',mainStyles:{'font-size':'36px','color':'#009191','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'},
	content:'Jessica '},
	{id:2,attrs:{x:210,y:34},element:'span',content:'Claire',
	mainStyles:{'color':'#3f3f40','font-size':'36px','font-family':'Roboto Condensed,sans-serif','text-transform':'uppercase'}},

	{id:3,attrs:{x:543,y:38},element:'span',content:'H: 508-278-2542  ',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:4,attrs:{x:637,y:37},element:'span',content:'|',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:5,attrs:{x:650,y:38},element:'span',content:'C: 781-669-5989',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:6,attrs:{x:520,y:55},element:'span',content:'123 Main Street, San Francisco, CA 94122 ',mainStyles:{'color':'#6c6e70','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
	{id:7,attrs:{x:613,y:75},element:'span',content:'jessica.claire@live.com ',mainStyles:{'color':'#00ACEC','font-size':'13px','font-family':'Roboto Condensed,sans-serif'}},
		
		{id:8,attrs:{x:83,y:110},mainStyles:{background:'#000000',width:'650px','min-height':'1px'},element:'div',
		innerAssets:[{attrs:{},mainStyles:{background:'#000000',width:'100%','height':'100%'},element:'div'}]},

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

	{id:'3',title:'charismatic',background:'#ffffff',image:'/assets/layouts/charismatic.svg',assets:[]},
	{id:'4',title:'professional',background:'#ffffff',image:'/assets/layouts/professional.svg',assets:[]}
	];
}


deleteAssetFromLayout(index:any,svg?:boolean):void{
	let data = this.data.getValue();
	let activeLayout = data.activeLayout;
	let assets =svg ? 'svgAssets' : 'assets';
	console.log(index);
	let newAssets = activeLayout[assets].filter((asset)=>asset.id != index);
	this.currentIds = this.currentIds.filter((id)=>id != index);
	let newData:AppState= {...data,activeLayout:{...activeLayout,[assets]:newAssets}};
	this.data.next(newData);
}

copyAndInsertAssetInLayout(index:any):void{
	let newAsset:ILayoutElement;
	let data = this.data.getValue();
	let activeLayout = data.activeLayout;
	let assets = activeLayout.assets;
	let assetToCopy = assets.find((asset)=>asset.id == index);
	if(assetToCopy){
		newAsset = Object.assign({},assetToCopy);		
		newAsset.id = this.generateUI(this.currentIds);
		newAsset.attrs['x'] =Number(newAsset.attrs['x'])+10;
		newAsset.attrs['y'] =Number(newAsset.attrs['y'])+10;
		activeLayout.assets = assets.concat(newAsset)
		let newData:AppState= {...data,activeLayout:activeLayout};
		this.data.next(newData);
	}else{
		return;
	}
	
}

changeBgColor(value:string,isGradient:boolean):void{
let data = this.data.getValue();
let activeLayout = data.activeLayout;
this.resetBackground(activeLayout);
let propertyToChange = isGradient ? 'backgroundClass' : 'background';
activeLayout[propertyToChange] = value;
let newData:AppState= {...data,activeLayout:activeLayout};
		this.data.next(newData);
}

resetBackground(layout:ILayout){
layout.background='';
layout.backgroundClass='';
}

addNewElement(element:ILayoutElement,type?:string){
	console.log(element);
	let property;
	if(!type || type == 'standard'){
		property = 'assets';
	}else if(type=='svg'){
		property = 'svgAssets';
	}
let data = this.data.getValue();
let activeLayout = data.activeLayout;
let assets = activeLayout[property];
element.id=this.generateUI(this.currentIds);
console.log(element);
let newAssets = assets.concat(element)
		let newData:AppState= {...data,activeLayout:{...activeLayout,[property]:newAssets}};
		console.log(newData);
		this.data.next(newData);
}

changeActiveSetOfElements(els){
	let data = this.data.getValue();
	let newData:AppState= {...data,activeSetOfElements:els};
	this.data.next(newData);
}



generateUI(currentIds){
  var text = "",
      possible = "ABCDEF",
  possibleNums = "0123456789";
  for( var i=0; i < 2; i++ ){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  for( var j=0; j < 3; j++ ){
    text += possibleNums.charAt(Math.floor(Math.random() * 10));
  }
  console.log(text);
return currentIds.indexOf(text)<0 ? (currentIds.push(text),text) : this.generateUI(currentIds);
}
}
