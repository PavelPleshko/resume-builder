export interface IfontFamily{
	id:number;
	name:string;
	loadable:boolean;
	url:string;
}

export const fontFamily:IfontFamily[] = [
{id:0,name:'system-ui',loadable:false,url:''},
{id:1,name:'cursive',loadable:false,url:''},
{id:2,name:'serif',loadable:false,url:''},
{id:3,name:'sans-serif',loadable:false,url:''},
{id:4,name:'monospace',loadable:false,url:''},
{id:5,name:'fantasy',loadable:false,url:''},
{id:6,name:'Roboto Condensed, sans serif',loadable:false,url:''}
];