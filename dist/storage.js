import {restore,serialize,cleanConfig} from './engine.js';
const prefix='four.v1.';
export const defaults={theme:'dark',sound:true,volume:.35,speed:'normal',preview:true,winLine:true,confirmRestart:true,reduced:globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches??false,contrast:false,markers:true,keyboard:true};
export let storageOK=true;
export function read(key,fallback){try{const s=localStorage.getItem(prefix+key);return s?JSON.parse(s):fallback;}catch{return fallback;}}
export function write(key,value){try{localStorage.setItem(prefix+key,JSON.stringify(value));return true;}catch{storageOK=false;return false;}}
export function remove(key){try{localStorage.removeItem(prefix+key);}catch{storageOK=false;}}
export function getSettings(){const raw=read('settings',{}),s={...defaults};if(!raw||typeof raw!=='object')return s;for(const key of Object.keys(defaults)){if(typeof defaults[key]==='boolean'&&typeof raw[key]==='boolean')s[key]=raw[key];}if(['dark','light','neon'].includes(raw.theme))s.theme=raw.theme;if(['slow','normal','fast'].includes(raw.speed))s.speed=raw.speed;if(Number.isFinite(raw.volume))s.volume=Math.max(0,Math.min(1,raw.volume));return s;}
export function getMatch(){return restore(read('match',null));}
export function saveMatch(m){write('match',serialize(m));}
export function getConfig(){return cleanConfig(read('config',{})??{});}
export function getEvents(){const raw=read('events',[]);if(!Array.isArray(raw))return [];const seen=new Set();return raw.filter(e=>{if(!e||typeof e.id!=='string'||seen.has(e.id)||typeof e.matchId!=='string'||!['red','yellow',null].includes(e.color)||!Number.isInteger(e.moves)||e.moves<7||e.moves>42||typeof e.matchComplete!=='boolean'||!Number.isFinite(e.time))return false;seen.add(e.id);return true;}).sort((a,b)=>a.time-b.time);}
