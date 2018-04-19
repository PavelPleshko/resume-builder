import {ILayoutSvgElement} from '../services/data-manager.service';

export const svgShapeElements:ILayoutSvgElement[] = [
{id:1,type:'shape',pos:{x:100,y:100,width:200,height:200},attrs:{'fill':'#000000'},name:'circle empty',url:'circle_empty.png',viewBox:'0 0 500 500',path:`M250,500.2c-66.8,0-129.7-26-176.9-73.3C25.8,379.7-0.2,316.8-0.2,250s26-129.7,73.3-176.9
	C120.3,25.8,183.2-0.2,250-0.2s129.7,26,176.9,73.3c47.3,47.3,73.3,110.1,73.3,176.9s-26,129.7-73.3,176.9
	C379.7,474.2,316.8,500.2,250,500.2z M250,14.8c-62.8,0-121.9,24.5-166.3,68.9S14.8,187.2,14.8,250s24.5,121.9,68.9,166.3
	s103.5,68.9,166.3,68.9s121.9-24.5,166.3-68.9s68.9-103.5,68.9-166.3s-24.5-121.9-68.9-166.3S312.8,14.8,250,14.8z`,changable:true},
{id:2,type:'shape',pos:{x:100,y:100,width:200,height:200},attrs:{},name:'circle filled',url:'circle_filled.png',viewBox:'0 0 500 500',innerAssets:[
{pos:{},attrs:{'cx':'250','cy':'250','r':'250','fill':'rgb(127,127,127)'},element:'circle',changable:true},
{pos:{},attrs:{'fill':'#ffffff'},path:`M250,500.5c-66.9,0-129.8-26.1-177.1-73.4C25.6,379.8-0.5,316.9-0.5,250S25.6,120.2,72.9,72.9
	C120.2,25.6,183.1-0.5,250-0.5s129.8,26.1,177.1,73.4c47.3,47.3,73.4,110.2,73.4,177.1s-26.1,129.8-73.4,177.1
	C379.8,474.4,316.9,500.5,250,500.5z M250,14.5c-62.9,0-122,24.5-166.5,69C39,128,14.5,187.1,14.5,250s24.5,122,69,166.5
	c44.5,44.5,103.6,69,166.5,69s122-24.5,166.5-69c44.5-44.5,69-103.6,69-166.5s-24.5-122-69-166.5C372,39,312.9,14.5,250,14.5z`,changable:true}
]},
{id:3,type:'shape',pos:{x:100,y:100,width:200,height:200},name:'circle filled white',url:'circle_filled_white.png',attrs:{'fill':'#000000','cx':'250','cy':'250','r':'250'},element:'circle',viewBox:'0 0 500 500',changable:true},

//triangles
{id:4,type:'shape',pos:{x:100,y:100,width:200,height:200},attrs:{'fill':'#000000'},name:'triangle empty',url:'triangle_empty.png',viewBox:'0 0 500 433',path:`M500,433H0L250,0L500,433z M23.1,419.7h453.8L250,26.7L23.1,419.7z`,changable:true},
{id:5,type:'shape',pos:{x:100,y:100,width:200,height:200},attrs:{},name:'triangle filled',url:'triangle_filled.png',viewBox:'0 0 500 433',innerAssets:[
{pos:{},attrs:{'points':'11.6,426.3 250,13.3 488.4,426.3','fill':'rgb(127,127,127)'},element:'polygon',changable:true},
{pos:{},attrs:{'fill':'#ffffff'},path:`M500,433H0L250,0L500,433z M23.1,419.7h453.8L250,26.7L23.1,419.7z`,changable:true}
]},
{id:6,type:'shape',pos:{x:0,y:0,width:500,height:433},attrs:{'fill':'#000000'},name:'triangle rounded empty',url:'triangle_rounded_empty.png',viewBox:'0 0 500 433',path:`M479.5,433H20.5c-7.4,0-14.1-3.8-17.8-10.3c-3.7-6.4-3.7-14.1,0-20.5L227.5,13c4.7-8.1,13.1-13,22.5-13
		c9.4,0,17.8,4.8,22.5,13l224.8,389.3c3.7,6.4,3.7,14.1,0,20.5C493.5,429.2,486.9,433,479.5,433z M15,409.3c-1.7,2.9-0.6,5.4,0,6.4
		c0.6,1,2.2,3.2,5.5,3.2h458.9c3.3,0,5-2.2,5.5-3.2c0.6-1,1.7-3.5,0-6.4L260.2,20c-2.1-3.7-5.9-5.9-10.2-5.9
		c-4.3,0-8.1,2.2-10.2,5.9L15,409.3z`,changable:true},

{id:7,type:'shape',pos:{x:0,y:0,width:500,height:433},name:'triangle filled white',url:'triangle_filled_white.png',attrs:{'fill':'#000000','points':'0,433 250,0 500,433'},element:'polygon',viewBox:'0 0 500 433',changable:true},
//squares
{id:8,type:'shape',attrs:{},pos:{x:0,y:0,width:400,height:400},changable:true,name:'square empty',url:'square_empty.png',viewBox:'0 0 400 400',stretchable:true,stretchWhileResize:true,innerAssets:[
{pos:{x:'98%',y:'98%'},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:0,y:'2%'},attrs:{'width':'2%','height':'98%'},element:'rect'},
{pos:{y:'98%'},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:'98%',y:'2%'},attrs:{'width':'2%','height':'98%'},element:'rect'},
{pos:{x:'2%',y:'98%'},attrs:{'width':'98%','height':'2%'},element:'rect'},
{pos:{x:'98%'},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:0,y:0},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:'2%',y:0},attrs:{'width':'98%','height':'2%'},element:'rect'}
]},
{id:9,type:'shape',attrs:{},pos:{x:0,y:0,width:400,height:400},changable:true,name:'square filled',url:'square_filled.png',viewBox:'0 0 400 400',stretchable:true,stretchWhileResize:true,innerAssets:[
{pos:{x:'2%',y:'2%'},attrs:{'fill':'rgb(127,127,127)','width':'96%','height':'96%'},element:'rect',changable:true},
{pos:{x:'98%',y:'98%'},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:0,y:'2%'},attrs:{'width':'2%','height':'98%'},element:'rect'},
{pos:{y:'98%'},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:'98%',y:'2%'},attrs:{'width':'2%','height':'98%'},element:'rect'},
{pos:{x:'2%',y:'98%'},attrs:{'width':'98%','height':'2%'},element:'rect'},
{pos:{x:'98%'},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:0,y:0},attrs:{'width':'2%','height':'2%'},element:'rect'},
{pos:{x:'2%',y:0},attrs:{'width':'98%','height':'2%'},element:'rect'}
]},
{id:10,type:'shape',attrs:{},pos:{x:0,y:0,width:200,height:200},name:'square filled white',url:'square_filled_white.png',viewBox:'0 0 200 200',stretchable:true,stretchWhileResize:true,innerAssets:[
{pos:{},attrs:{'width':'100%','height':'100%'},element:'rect',changable:true},
]}
];

export const svgLineElements:ILayoutSvgElement[]=[
{id:1,type:'line',attrs:{},pos:{x:100,y:100,width:400,height:20},name:'line straight',url:'line_straight.png',viewBox:'0 0 400 20',stretchable:true,stretchWhileResize:true,innerAssets:[
{pos:{x:0,y:'50%'},attrs:{'fill':'#000000','width':'100%','height':'10%'},element:'rect',changable:true}
]}

];