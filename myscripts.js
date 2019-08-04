let columns;
let rows;
let numVar = 1;
let numRes = 1;
let stepIndex = 1;
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
const resTable = document.querySelector('#resTable');
const mdlOvrvw = document.querySelector('#mdlOvrvw')

window.addEventListener('load', updateValues);
window.addEventListener('load', updateObjFnctn);
window.addEventListener('load', updateResTable);
varInput.addEventListener('change', updateValues);
varInput.addEventListener('change', updateObjFnctn);
resInput.addEventListener('change', updateValues);
resInput.addEventListener('change', updateResTable);
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
  if (stepIndex >= 4) nxtStpBtn.disabled = true;
  switch (stepIndex) {
    case 2: //Definindo modelo da função
      toggleElement(varSlct);
      toggleElement(objFnctn);
      break;
    case 3://Definindo numero de restricoes
      toggleElement(objFnctn);
      toggleElement(resSlct);
      break;
    case 4://Definindo numero de restricoes
      toggleElement(resSlct);
      toggleElement(resTable);      
      break;
    case 5: //Visualizando o Modelo
      toggleElement(resTable);
      toggleElement(resSlct);
    break;
    default:
      alert("[...]And I'm Iron Man");
  }
}

function previousStep(){
  
  stepIndex--;
  if (stepIndex == 1) prvStpBtn.disabled = true;
  if (stepIndex < 5) nxtStpBtn.disabled = false;
  switch (stepIndex) {
    case 1: //Definindo numero de variáveis
      toggleElement(objFnctn);
      toggleElement(varSlct);
      break;
    case 2: //Definindo modelo da função
      toggleElement(resSlct);
      toggleElement(objFnctn);
      break;
    case 3: //Definindo modelo da função
      toggleElement(resTable);
      toggleElement(resSlct);
    break;
    case 3: //Visualizando o Modelo
      toggleElement(resTable);
      toggleElement(resSlct);
    break;

    default:
      alert("[...]And I'm Iron Man.");
  }
}

function toggleElement(elmnt){
  elmnt.classList.toggle('hide');
}

function updateObjFnctn(){
  objFnctn.innerHTML= null;
  insertText(objFnctn,'Maximizar Z',[]);
  for (let c=0;c<numVar;c++) {
    insertElement(objFnctn,'input','',['defMrgnL']);
    insertText(objFnctn,'X',[]);
    insertText(objFnctn,c+1,['sub']);    
    if(c!= numVar-1) insertText(objFnctn,'+',['defMrgnL']);
  }
}

function updateResTable(){
  resTable.innerHTML= null;
  for (let d=0;d<numRes;d++) {
    const newDiv = document.createElement('div');
    newDiv.id = 'resRow' + (d+1);
    newDiv.classList.add('fnctnWrppr')
    insertText(newDiv,'Restricao '+(d+1)+':',[]);
    for (let c=0;c<numVar;c++) {
      insertElement(newDiv,'input','',['defMrgnL']);
      insertText(newDiv,'X',[]);
      insertText(newDiv,c+1,['sub']);    
      if(c!= numVar-1) insertText(newDiv,'+',['defMrgnL']);
    }
    insertText(newDiv,'≤',['defMrgnL']);
    insertElement(newDiv,'input','',['defMrgnL']);
    resTable.appendChild(newDiv);
  }
}