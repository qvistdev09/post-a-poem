(()=>{var e={281:e=>{const t=e=>{const t=document.createElement("button");return t.innerText=e,t.setAttribute("id",e+"-add"),t.setAttribute("onclick","addWord(this)"),t};function n(e,t){this.paletteDiv=e,this.poemDiv=t}n.prototype.addWord=function(e){e.setAttribute("disabled","true");const t=(e=>{const t=document.createElement("div");t.setAttribute("class","word-div");const n=document.createElement("button");n.setAttribute("onclick","removeWord(this)"),n.setAttribute("id",e+"-rm"),n.setAttribute("class","poem-word"),n.innerText=e;const o=document.createElement("div");return o.setAttribute("class","connector-div"),o.style.width=`${((e,t)=>{const n=Math.floor(101*Math.random())/100;return 4*n<.3?.3:4*n})()}rem`,t.appendChild(o),t.appendChild(n),t})(e.innerText),n=this.poemDiv.getElementsByClassName("poem-row");if(0===n.length){const e=document.createElement("div");e.setAttribute("class","poem-row"),this.poemDiv.appendChild(e),e.appendChild(t)}else{for(let e of n)if(e.children.length<3)return void e.appendChild(t);const e=document.createElement("div");e.setAttribute("class","poem-row"),this.poemDiv.appendChild(e),e.appendChild(t)}},n.prototype.removeWord=function(e){document.getElementById(e.innerText+"-add").removeAttribute("disabled");const t=e.parentElement.parentElement;1===t.children.length?t.parentElement.removeChild(t):t.removeChild(e.parentElement)},n.prototype.generatePalette=function(e){for(let n of e){const e=t(n);this.paletteDiv.appendChild(e)}},n.prototype.submitPoem=function(){const e=[];for(let t of document.getElementsByClassName("poem-word"))e.push(t.innerText);const t=e.join(" ");fetch("/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({poem:t})}).then((()=>{window.location.href="/"}))},e.exports.create=(e,t)=>new n(e,t)},776:e=>{"use strict";e.exports=JSON.parse('["silence","potato","is","justice","would","alarmingly","tremor","warned","in","places"]')}},t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}(()=>{const e=document.getElementById("word-palette"),t=document.getElementById("composed-poem"),o=document.getElementById("submit-poem-btn"),r=n(776),d=n(281).create(e,t);o.addEventListener("click",d.submitPoem),d.generatePalette(r),window.addWord=e=>{d.addWord(e)},window.removeWord=e=>{d.removeWord(e)}})()})();