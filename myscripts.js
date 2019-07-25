var columns;
var rows;
var numVar = 1;
var numRes = 1;
var stepIndex = 1;
const varSlct = document.querySelector('#varSlct');
const varInput = document.querySelector('#varInput');
const resSlct = document.querySelector('#resSlct');
const resInput = document.querySelector('#resInput');
const updtTblBtn = document.querySelector('#updtTblBtn');
const clrTblBtn = document.querySelector('#clrTblBtn');
const nxtStpBtn = document.querySelector('#nxtStpBtn');
const prvStpBtn = document.querySelector('#prvStpBtn');
const Table = document.querySelector('#Table');
const objFnctn = document.querySelector('#objFnctn');


window.addEventListener('load', updateValues);
window.addEventListener('load', updateObjFnctn);
varInput.addEventListener('change', updateValues);
varInput.addEventListener('change', updateObjFnctn);
resInput.addEventListener('change', updateValues);
updtTblBtn.addEventListener('click', createTable);
clrTblBtn.addEventListener('click', clearTable);
prvStpBtn.addEventListener('click', previousStep);
nxtStpBtn.addEventListener('click', nextStep);

function insertText(parentObject, contentString, classArray){
  const textElement = document.createElement('text');

  textElement.innerText = contentString;
  if (classArray.length != 0) {
    for (let classElmnt of classArray) {
      textElement.classList.add(classElmnt);
    }
  }
  parentObject.appendChild(textElement);
}

function insertElement(parentObject, elementKind, contentString, classArray){
  const newElement = document.createElement(elementKind);

  newElement.innerHTML = contentString;
  if (classArray.length != 0) {
    for (let classElmnt of classArray) {
      newElement.classList.add(classElmnt);
    }
  }
  parentObject.appendChild(newElement);
}

function updateValues(){
  numVar = varInput.value;
  numRes = resInput.value;

  numVar = parseInt(numVar);
  numRes = parseInt(numRes);
  columns = 3 + numVar + numRes;
  rows = 2 + numRes;
}

function clearTable(){
  Table.innerHTML = null;
}

function createTable(){
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
        else if (cj <= numVar) {
          insertText(elmnt, "X", []);
          insertText(elmnt, cj, ["sub"]);
        } else if (cj <= numVar + numRes) {
          insertText(elmnt, "F", []);
          insertText(elmnt, cj - numVar, ["sub"]);
        } else if (cj == numVar + numRes + 1) elmnt.innerText = "Z";
        else elmnt.innerText = "=";
      } else if (cj == 0) {
        if (ci > numRes) elmnt.innerText = "Obj";
        else {
          insertText(elmnt, "F", []);
          insertText(elmnt, ci, ["sub"]);
        }
      }
    }
  }
  newTblElement.appendChild(newTblBody);
  newTblElement.id = "simTbl";
  Table.appendChild(newTblElement);
}

function nextStep(){
  stepIndex++;
  if (stepIndex > 1) prvStpBtn.disabled = false;
  switch (stepIndex) {
    case 2: //Definindo modelo da função
    togleElement(varSlct);
    togleElement(objFnctn);
    break;
    default:
      alert("[...]And I'm Iron Man");
  }
}

function previousStep(){
  stepIndex--;
  if (stepIndex == 1) prvStpBtn.disabled = true;
  switch (stepIndex) {
    case 1: //Definindo numero de variáveis
    togleElement(objFnctn);
    togleElement(varSlct);
    break;
    default:
      alert("[...]And I'm Iron Man.");
  }
}

function togleElement(elmnt){
  if (elmnt.style.display != "none") elmnt.style.display = "none";
  else elmnt.style.display = "";
}

function updateObjFnctn(){
  objFnctn.innerHTML='';
  insertText(objFnctn,'Maximizar Z',[]);
  for (let c=0;c<numVar;c++) {
    let inputElmnt = document.createElement('input');
    objFnctn.appendChild(inputElmnt);
    insertText(objFnctn,'X',[]);
    insertText(objFnctn,c+1,['sub']);    
    insertElement(objFnctn,'span','&nbsp&nbsp',[]);
    if(c!= numVar-1) insertText(objFnctn,'+',[]);
  }
}
