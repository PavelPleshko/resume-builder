export interface IColor{
	id:number;
	hex:string;
	rgb:string;
}

export interface IGradient{
	id:number;
	className:string;
}

export const vividColors:IColor[] =[
{id:1,hex:'#ff5c5c',rgb:'rgb(255,92,92)'},
{id:2,hex:'#ffbd4a',rgb:'rgb(255,189,74)'},
{id:3,hex:'#fff952',rgb:'rgb(255,249,82)'},
{id:4,hex:'#99e265',rgb:'rgb(153,226,101)'},
{id:5,hex:'#35b729',rgb:'rgb(53,183,41)'},
{id:6,hex:'#44d9e6',rgb:'rgb(68,217,230)'},
{id:7,hex:'#2eb2ff',rgb:'rgb(46,178,255)'},
{id:8,hex:'#5271ff',rgb:'rgb(82,113,255)'},
{id:9,hex:'#b760e6',rgb:'rgb(183,96,230)'},
{id:10,hex:'#ff63b1',rgb:'rgb(255,99,177)'}
];

export const poorColors:IColor[]=[
{id:1,hex:'#000000',rgb:'rgb(0,0,0)'},
{id:2,hex:'#666666;',rgb:'rgb(102,102,102)'},
{id:3,hex:'#a8a8a8',rgb:'rgb(168,168,168)'},
{id:4,hex:'#d9d9d9',rgb:'rgb(217,217,217)'},
{id:5,hex:'#ffffff',rgb:'rgb(255,255,255)'},
];

export const gradients:IGradient[]=[
{id:1,className:'virgin-america'},
{id:2,className:'portrait'},
{id:3,className:'turquoise-flow'},
{id:4,className:'vine'},
{id:5,className:'flickr'},
{id:6,className:'instagram'},
{id:7,className:'atlas'}
];