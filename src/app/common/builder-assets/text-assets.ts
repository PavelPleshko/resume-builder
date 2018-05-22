import {ILayoutElement} from '../services/data-manager.service';

export const defaultTextAssets:ILayoutElement[] =[
{id:1,attrs:{x:100,y:100},element:'div',mainStyles:{'font-family':'fantasy','color':'#000000','font-size':'36px'},content:'Add h1 heading'},
{id:2,attrs:{x:100,y:100},element:'div',mainStyles:{'font-family':'fantasy','color':'#000000','font-size':'32px'},content:'Add h2 heading'},
{id:3,attrs:{x:100,y:100},element:'div',mainStyles:{'font-family':'fantasy','color':'#000000','font-size':'28px'},content:'Add h3 heading'},
{id:4,attrs:{x:100,y:100},element:'div',mainStyles:{'font-family':'fantasy','color':'#000000','font-size':'24px'},content:'Add h4 heading'},
{id:5,attrs:{x:100,y:100},element:'div',mainStyles:{'font-family':'fantasy','color':'#000000','font-size':'21px'},content:'Add h5 heading'},
{id:6,attrs:{x:100,y:100},element:'div',mainStyles:{'color':'#000000','font-size':'16px'},content:'Add plain text'},
]; 

export const additionalTextElements:ILayoutElement[]=[
{id:1,attrs:{x:100,y:100},element:'ul',mainStyles:{'color':'#000000','font-size':'16px'},innerAssets:[
{attrs:{},element:'li',list:true,content:'First list element',mainStyles:{'font-size':'inherit'}},
{attrs:{},element:'li',list:true,content:'Second list element',mainStyles:{'font-size':'inherit'}},
{attrs:{},element:'li',list:true,content:'Third list element',mainStyles:{'font-size':'inherit'}}
]},
{id:2,attrs:{x:100,y:100},element:'ol',mainStyles:{'color':'#000000','list-style':'decimal','font-size':'16px'},innerAssets:[
{attrs:{},element:'li',list:true,content:'First list element'},
{attrs:{},element:'li',list:true,content:'Second list element'},
{attrs:{},element:'li',list:true,content:'Third list element'}
]},
{id:3,attrs:{x:100,y:100},element:'ul',mainStyles:{'color':'#000000','list-style':'square','font-size':'16px'},innerAssets:[
{attrs:{},element:'li',list:true,content:'First list element'},
{attrs:{},element:'li',list:true,content:'Second list element'},
{attrs:{},element:'li',list:true,content:'Third list element'}
]},
{id:4,attrs:{x:100,y:100},element:'div',mainStyles:{'color':'#000000','font-size':'16px','width':'200px','height':'70px','text-align':'center','display':'flex','flex-flow':'column nowrap'},innerAssets:[
{attrs:{},element:'span',content:'Heading',mainStyles:{'font-size':'28px','z-index':'1','font-weight':'bold'}},
{attrs:{},element:'span',content:'Subheading',mainStyles:{'font-size':'21px','z-index':'2'}}
]},
{id:5,attrs:{x:100,y:100},element:'div',mainStyles:{'color':'#000000','width':'150px','height':'50px','white-space':'nowrap','display':'flex','flex-flow':'row wrap','align-items':'center','justify-content':'space-between'},innerAssets:[

	{attrs:{},element:'span',mainStyles:{'font-size':'18px','font-weight':'bold','text-transform':'uppercase','min-width':'35%'},content:'Date'},
	{attrs:{},element:'span',mainStyles:{'font-size':'12px','vertical-align':'middle','min-width':'65%','text-align':'right'},content:'12 of March'},
	{attrs:{},element:'span',mainStyles:{'font-size':'18px','font-weight':'bold','text-transform':'uppercase','min-width':'35%'},content:'Topic'},
	{attrs:{},element:'span',mainStyles:{'font-size':'12px','vertical-align':'middle','min-width':'65%','text-align':'right'},content:'Healthy food'}]}

];