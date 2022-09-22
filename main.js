(()=>{"use strict";function e(e){return{length:e,hitAreas:[],Sunk:!1,start:[],orientation:null,hit:function(e){this.hitAreas.push(e),this.isSunk()},isSunk:function(){return this.hitAreas.length==this.length?this.sunk=!0:this.sunk=!1},isAreaHit:function(e){return!!this.hitAreas.includes(e)}}}function t(t){return{name:t,enemy:null,board:{board:[],newboard:function(){return this.board=new Array(100).fill(0)},placeShip:function(t,n,r,o){let a=e(t.length);if(a.start.push(n),a.start.push(r),a.orientation=o,"vertical"==o)for(let e=0;e<t.length;e++)this.board[10*(r+e)+n]=a;else for(let e=0;e<t.length;e++)this.board[10*r+n+e]=a;return this.board},receiveAttack:function(e,t){let n=this.board[10*t+e],r=10*t+e;return 0!=n&&"object"!=typeof n?null:(0==n?this.board[r]="M":this.board[r].hitAreas.push(r),n)},allSunk:function(){let e=[];for(let t=0;t<this.board.length;t++)"object"==typeof this.board[t]&&0==this.board[t].isSunk()&&e.push(this.board[t]);return 0==e.length},checkIfFit(e,t,n,r){let o=t+10*n;if("vertical"==r){if(10*n+10*e.length>100)return!1;for(let t=0;t<e.length;t++)if("object"==typeof this.board[o+10*t])return!1}else if("horizontal"==r){if(t+e.length>10)return!1;for(let r=0;r<e.length;r++)if("object"==typeof this.board[t+r+10*n])return!1}return!0}},ships:[[e(5),1],[e(4),1],[e(3),1],[e(3),1],[e(2),1]],attack:function(e,t){this.enemy.board.receiveAttack(e,t)},autoPlay:function(){let e=parseInt(10*Math.random()),t=parseInt(10*Math.random()),n=10*t+e,r=this.enemy.board.board[n];0!=r&&"object"!=typeof r&&this.autoPlay(),"object"==typeof r&&(this.enemy.board.receiveAttack(e,t),this.autoTargetNearby(e,t)),"M"!=r&&this.enemy.board.receiveAttack(e,t)},removeShip:function(e){for(let t=0;t<this.board.board.length;t++)0!=this.board.board[t]&&this.board.board[t].start[0]===e.start[0]&&this.board.board[t].start[1]===e.start[1]&&(this.board.board[t]=0)},randomizeBoard:function(){for(;this.ships.length>0;){let e=this.ships.shift();for(let t=0;t<e[1];t++){let n=parseInt(10*Math.random()),r=parseInt(10*Math.random()),o=parseInt(2*Math.random());o=1==o?"vertical":"horizontal",1==this.board.checkIfFit(e[0],n,r,o)?this.board.placeShip(e[0],n,r,o):t--}}},autoTargetNearby:function(e,t){let n=parseInt(2*Math.random()),r=e,o=t;0==n?e+1>10?r=e-1:e-1<0?r=e+1:(n=parseInt(2*Math.random()),r=0==n?e-1:e+1):t+1>10?o=t-1:t-1<0?o=t+1:(n=parseInt(2*Math.random()),o=0==n?t-1:t+1);let a=this.enemy.board.board[r+10*o];"object"==typeof a?(this.enemy.board.receiveAttack(r,o),this.autoTargetNearby(r,o)):"X"==a||"M"==a?this.autoTargetNearby(r,o):this.enemy.board.receiveAttack(r,o)}}}const n=document.getElementsByTagName("button")[0],r=document.getElementsByTagName("button")[1];document.getElementsByTagName("footer")[0],document.createElement("img");let o=document.getElementById("gameContainer"),a=0;function i(e){a=0;let n=t();n.name=prompt("Enter Player 1 Name :","Player 1"),n.board.newboard();let r=t();r.name="CPU",r.board.newboard(),n.randomizeBoard(),r.randomizeBoard(),n.enemy=r,r.enemy=n,d(n,r,e)}function d(e,t,n,r=1){if(1==function(e,t){return 1==e.board.allSunk()?(u(t),!0):1==t.board.allSunk()&&(u(e),!0)}(e,t))return;o.innerHTML="";let i=document.createElement("div");i.classList.add("board");for(let t=0;t<e.board.board.length;t++){let n=e.board.board[t],r=document.createElement("div");r.setAttribute("id",t),r.classList.add("dropzone"),r.setAttribute("draggable",!1),"M"==n?r.style.backgroundColor="gray":"object"==typeof n&&(r.style.backgroundColor="cornflowerblue",0==a&&(r.setAttribute("draggable",!0),r.classList.add("playerDrag")),1==n.isAreaHit(t)&&(r.style.backgroundColor="orange"),1==n.isSunk()&&(r.style.backgroundColor="red")),i.appendChild(r)}if(0==a&&2==n){let t=document.getElementById("switch"),n=document.getElementById("start");null==t&&null==n&&function(e){let t=document.createElement("button");t.id="switch",t.textContent="Ready!";let n=document.getElementsByTagName("footer")[0];document.body.insertBefore(t,n),t.addEventListener("click",(async()=>{document.body.removeChild(t),c(),await s(5e3);let n=document.getElementById("loadtext");document.body.removeChild(n),d(e.enemy,e,2),function(e){let t=document.getElementById("switch");document.body.removeChild(t);let n=document.createElement("button");n.id="start",n.textContent="Start!";let r=document.getElementsByTagName("footer")[0];document.body.insertBefore(n,r),n.addEventListener("click",(async()=>{a++,document.body.removeChild(n),c(),await s(5e3);let t=document.getElementById("loadtext");document.body.removeChild(t),d(e.enemy,e,2)}))}(e.enemy)}))}(e)}o.appendChild(i),function(e,t){const n=document.querySelectorAll(".playerDrag");let r=document.querySelectorAll(".dropzone"),o=null,a=0;n.forEach((t=>{t.addEventListener("dragstart",(()=>{a=t.getAttribute("id"),o=e.board.board[a]}))})),r.forEach((e=>{e.addEventListener("dragover",(e=>{e.preventDefault()}))})),r.forEach((n=>{n.addEventListener("drop",(r=>{if("object"==typeof e.board.board[a]){r.preventDefault(),a=n.getAttribute("id"),e.removeShip(o);let i=a%10,l=parseInt(a/10);1==e.board.checkIfFit(o,i,l,o.orientation)?(e.board.placeShip(o,i,l,o.orientation),d(e,e.enemy,t)):(i=o.start[0],l=o.start[1],e.board.placeShip(o,i,l,o.orientation),d(e,e.enemy,t))}}))}))}(e,n),function(e,t){document.querySelectorAll(".playerDrag").forEach((n=>{n.addEventListener("click",(()=>{let r=n.getAttribute("id"),o=e.board.board[r],a=o.start[0],i=o.start[1],l=null;l="vertical"==e.board.board[r].orientation?"horizontal":"vertical",e.removeShip(o),1==e.board.checkIfFit(o,a,i,l)?(o.orientation=l,e.board.placeShip(o,a,i,l)):e.board.placeShip(o,a,i,o.orientation),d(e,e.enemy,t)}))}))}(e,n),0==a&&2==n||function(e,t,n,r=1){let a=document.createElement("div");a.classList.add("board");for(let r=0;r<e.board.board.length;r++){let o=e.board.board[r],i=document.createElement("div");"M"==o?i.style.backgroundColor="gray":"object"==typeof o?(1==o.isAreaHit(r)&&(i.style.backgroundColor="orange"),1==o.isSunk()?i.style.backgroundColor="red":l(i,r,t,e,n)):l(i,r,t,e,n),i.classList.add("target"),a.appendChild(i)}o.appendChild(a)}(t,e,n,r)}function l(e,t,n,r,o){e.addEventListener("click",(()=>{a++,async function(e,t,n,r,o){let a=t%10,i=parseInt(t/10);if(n.attack(a,i),1==o)"M"==r.board.board[t]&&function(e){e.autoPlay()}(r),d(n,r,o);else if("M"==r.board.board[t]){d(n,r,o,0),await s(1e3),c(),await s(5e3);let e=document.getElementById("loadtext");document.body.removeChild(e),d(r,n,o)}else d(n,r,o)}(0,t,n,r,o)}))}function c(){o.innerHTML="";let e=document.createElement("div"),t=document.createElement("div"),n=document.getElementsByTagName("footer")[0];e.classList.add("loader"),t.textContent="Pass the device!",t.setAttribute("id","loadtext"),o.appendChild(e),document.body.insertBefore(t,n)}function s(e){return new Promise((t=>setTimeout(t,e)))}function u(e){o.innerHTML="";let t=document.createElement("p");t.textContent=`${e.name} Wins!`,o.appendChild(t)}n.addEventListener("click",(()=>{i(1)})),r.addEventListener("click",(()=>{i(2)}))})();