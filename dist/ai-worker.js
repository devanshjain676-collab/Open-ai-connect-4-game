import {chooseMove} from './ai.js';
self.onmessage=e=>{try{const {board,player,difficulty,id}=e.data;self.postMessage({id,col:chooseMove(board,player,difficulty)});}catch{self.postMessage({id:e.data.id,error:true});}};
