//global
var i = 0;
var j = 0;
var columns;
var rows;
var numVar = 1;
var numRes = 1;
const varInput = document.querySelector("#varInput");
const resInput = document.querySelector("#resInput");
const updtTblBtn = document.querySelector("#updtTblBtn");
const clrTblBtn = document.querySelector("#clrTblBtn");
const Table = document.querySelector("#Table");

//console.log(varInput, resInput);
window.addEventListener("load", updateValues);
varInput.addEventListener("change", updateValues);
resInput.addEventListener("change", updateValues);
updtTblBtn.addEventListener("click", createTable);
clrTblBtn.addEventListener("click", clearTable);



  function insertText(parentObject, contentString, classArray){

  const textElement = document.createElement('text');

  textElement.innerText = contentString;
  if(classArray.length != 0){
    for ( let classElmnt of classArray) {
      textElement.classList.add(classElmnt);
    }
  }
  parentObject.appendChild(textElement);
}

/*
function insertText(parentObject, string){
  const textElement = document.createElement('text');
  textElement.innerText = string;
  parentObject.appendChild(textElement);
}
*/

function updateValues() {
  numVar = varInput.value;
  numRes = resInput.value;

  numVar = parseInt(numVar);
  numRes = parseInt(numRes);
  columns = 3 + numVar + numRes;
  rows = 2 + numRes;
}

function clearTable() {
  Table.innerHTML = null;
}

function createTable() {
  Table.innerHTML = null;
  let ci;
  let cj;
  const newTblElement = document.createElement("table");
  const newTblBody = document.createElement("tbody");

  for (ci = 0; ci < rows; ci++)
    newTblBody.appendChild(document.createElement("tr"));

  for (ci = 0; ci < rows; ci++) {
    for (cj = 0; cj < columns; cj++) {
      if (ci == 0) {
        newTblBody.children[ci].appendChild(document.createElement("th"));
      } else {
        newTblBody.children[ci].appendChild(document.createElement("td"));
      }
      let elmnt = newTblBody.children[ci].children[cj];

      if (ci == 0) {
        if (cj == ci) elmnt.innerText = "Base";
        else if (cj <= numVar){
          insertText(elmnt, 'X',[]);
          insertText(elmnt, cj,['sub']);
        }
        else if (cj <= numVar + numRes){
          //elmnt.innerText = "F" + (cj - numVar);
          insertText(elmnt, 'F',[]);
          insertText(elmnt, (cj-numVar), ['sub']);


        } 
        else if (cj == numVar + numRes + 1) elmnt.innerText = "Z";
        else elmnt.innerText = "=";
        
      }
      else if (cj == 0) {
        if(ci > numRes ) elmnt.innerText = "Obj";
        else elmnt.innerText = "F" + ci;
      }
    }
  }

  newTblElement.appendChild(newTblBody);
  newTblElement.id = "simTbl";
  Table.appendChild(newTblElement);

  // 
}
