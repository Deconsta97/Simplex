let columns;
let rows;
let numVar = 1;
let numRes = 1;
let stepIndex = 1;

const $ = document.querySelector.bind(document);
const varSlct = $('#varSlct');
const varInput = $('#varInput');
const resSlct = $('#resSlct');
const resInput = $('#resInput');
const updtTblBtn = $('#updtTblBtn');
const clrTblBtn = $('#clrTblBtn');
const nxtStpBtn = $('#nxtStpBtn');
const prvStpBtn = $('#prvStpBtn');
const nxtInnrStpBtn = $('#nxtInnrStpBtn');
const prvInnrStpBtn = $('#prvInnrStpBtn');
const Table = $('#Table');
const objFnctn = $('#objFnctn');
const resTable = $('#resTable');
const mdlOvrvw = $('#mdlOvrvw');
const mdlFnctn = $('#mdlFnctn');
const mdlResTable = $('#mdlResTable');
const fVarIns = $('#fVarIns');

//clrTblBtn.addEventListener('click', clearTable);
prvStpBtn.addEventListener('click', previousStep);
nxtStpBtn.addEventListener('click', nextStep);

function createCustomElement(elementKind, elementid, contentString, classArray){
  const elmnt = document.createElement(elementKind);
  if (elementid != '') elmnt.id = elementid;
  if (contentString != '') elmnt.innerText = contentString;
  if(classArray != ''){
    for (let classElmnt of classArray) {
      elmnt.classList.add(classElmnt);
    }
  }
  return elmnt;
}


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

function nextStep() {
  stepIndex++;
  if (stepIndex > 1) prvStpBtn.disabled = false;
  if (stepIndex >= 6) nxtStpBtn.disabled = true;
  switch (stepIndex) {
    case 2: //Definindo modelo da função
      updateValues();
      updateObjFnctn();
      toggleElements([varSlct, objFnctn]);
      break;
    case 3: //Definindo numero de restricoes
      toggleElements([objFnctn, resSlct]);
      break;
    case 4: //Definindo coeficientes e termos das restricoes
      updateValues();
      updateResTable();
      toggleElements([resSlct, resTable]);
      break;
    case 5: //Visualizando o Modelo
      nxtStpBtn.innerText = 'Próximo Capítulo';
      updateModel();
      toggleElements([resTable, mdlOvrvw]);
      break;
    case 6: //Variaveis de folga
      let r=1;
      nxtStpBtn.innerText = 'Próximo Capítulo';
      nxtStpBtn.disabled = false;
      toggleElements([mdlOvrvw, nxtStpBtn, prvStpBtn, fVarIns, nxtInnrStpBtn, prvInnrStpBtn]); 
      insertEquations();
      updateMdlOvrvw();
      showEquations(r);
      prvInnrStpBtn.addEventListener('click', ()=>{
        nextRes(--r);
        if (r == numRes) toggleElements([mdlOvrvw, fVarIns, nxtStpBtn, nxtInnrStpBtn]);
      });
      nxtInnrStpBtn.addEventListener('click', ()=>{
        nextRes(++r)
        if (r == numRes+1) toggleElements([nxtInnrStpBtn, nxtStpBtn, fVarIns, mdlOvrvw]);
      });     
      break;
      case 7: //Quadro Inicial
      nxtStpBtn.innerText = '🡆';
      prvStpBtn.disabled = true;
      toggleElements([prvStpBtn, prvInnrStpBtn, mdlOvrvw]);
      createTable();
      setHTMLtable();
      break;
    default:
     easter();
  }
}

function previousStep(){  
  stepIndex--;
  if (stepIndex == 1) prvStpBtn.disabled = true;
  if (stepIndex < 5) nxtStpBtn.disabled = false;
  switch (stepIndex) {
    case 1: //Definindo numero de variáveis
    toggleElements([objFnctn, varSlct]);
      break;
    case 2: //Definindo modelo da função
      toggleElements([resSlct, objFnctn]);
      break;
    case 3: //Definindo modelo da função
    toggleElements([resTable, resSlct]);
    break;
    case 4: //Visualizando o Modelo
      nxtStpBtn.innerText = '🡆';
      toggleElements([mdlOvrvw, resTable]);
    break;
    default:
      easter();
  }
}

function toggleElement(object){
  object.classList.toggle('hide');
}

function toggleElements(objects){
  for (const object of objects) object.classList.toggle('hide');
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

function getInputsNumbers(parentNode,negate) { 
  let inputValues = [];
  for (let HTMLElmnt of parentNode.querySelectorAll('input')){
    if(HTMLElmnt.value == '') HTMLElmnt.value = 0;
    if(negate) inputValues.push(parseInt(HTMLElmnt.value*-1))
    else inputValues.push(parseInt(HTMLElmnt.value));
  }
  return inputValues;
}

function updateModel(){   
  //FUNCAO OBJETIVO
  mdlFnctn.innerHTML = null;
  let varCffcnts = getInputsNumbers(objFnctn);
  insertText(mdlFnctn,'Maximizar Z =',[]);
  for (let c=0;c<numVar;c++) {
    insertElement(mdlFnctn,'text',varCffcnts[c],['defMrgnL','red','coefMrgnR']);
    insertText(mdlFnctn,'X',[]);
    insertText(mdlFnctn,c+1,['sub']);    
    if(c!= numVar-1) insertText(mdlFnctn,'+',['defMrgnL']);
  }
  //Restricoes OBJETIVO
  mdlResTable.innerHTML = null;
  let resCffcnts = getInputsNumbers(resTable);
  //insertElement(mdlResTable,'div',null,['resTableWrppr']);
  insertText(mdlResTable,'Sujeito a:',['fnctnWrppr']);
  let cursor = 0;
  for (let d=0;d<numRes;d++) {
    const newDiv = document.createElement('div');
    newDiv.id = 'resRow' + (d+1);
    newDiv.classList.add('fnctnWrppr')
    for (let c=0;c<numVar;c++) {
      insertElement(newDiv,'text',resCffcnts[cursor++],['defMrgnL','red','coefMrgnR']);
      insertText(newDiv,'X',[]);
      insertText(newDiv,c+1,['sub']);    
      if(c!= numVar-1) insertText(newDiv,'+',['defMrgnL']);
    }
    insertText(newDiv,'≤',['defMrgnL']);    
    insertElement(newDiv,'text',resCffcnts[cursor++],['defMrgnL','red','coefMrgnR']);
    mdlResTable.appendChild(newDiv);
  }
  const newDiv = document.createElement('div');
    newDiv.classList.add('fnctnWrppr')
    for (let c=0;c<numVar;c++) {
      insertText(newDiv,'X',[]);
      insertText(newDiv,c+1,['sub']);    
      if(c!= numVar-1) insertText(newDiv,',',['comma']);
    }
    insertText(newDiv,'≥ 0',['defMrgnL']);    
    mdlResTable.appendChild(newDiv);
}

function createEquation(HTMLInequation){
  const eq = HTMLInequation.cloneNode(true);
  eq.id = ('E' + HTMLInequation.id);
  const fVarindex = eq.id.slice(eq.id.length-1,eq.id.length);
  eq.removeChild(eq.children[eq.childElementCount-2]);
  
  eq.insertBefore(createCustomElement('text','','+',['defMrgnL']), eq.lastElementChild)
  eq.insertBefore(createCustomElement('text','','F',['defMrgnL']), eq.lastElementChild)
  eq.insertBefore(createCustomElement('text','', fVarindex,['sub']), eq.lastElementChild)
  eq.insertBefore(createCustomElement('text','','=',['defMrgnL']), eq.lastElementChild)
  return(eq);  
}

function insertEquations(){
  fVarIns.appendChild(createCustomElement("text", "", "Restrição Original (Inequação)", []));
  fVarIns.appendChild(createCustomElement("text", "", "Restrição com variável de folga (Equação)", []));
  const ineqs = mdlResTable.querySelectorAll('div[id^=resRow');
  for (const ineq of ineqs){
    fVarIns.insertBefore(ineq, fVarIns.children[1]);
    const eq = createEquation(ineq);
    fVarIns.appendChild(eq);
  }
}

function showEquations(group){
  if(group>numRes) return 0;  
  for (const a of fVarIns.querySelectorAll(`div[id*=resRow`)) if (!(a.classList.contains('hide'))) a.classList.add('hide');
  for (const b of fVarIns.querySelectorAll(`div[id*=resRow${group}`)) toggleElement(b);
}

function nextRes(resCont){
  showEquations(resCont);
  nxtInnrStpBtn.disabled = (resCont == numRes+1)? true : false;
  prvInnrStpBtn.disabled = (resCont == 1)? true : false;
}

function updateMdlOvrvw(){
  const lstRes = mdlResTable.lastElementChild;
  for (const eq of document.querySelectorAll('div[id*=EresRow]')){
    mdlResTable.insertBefore(eq.cloneNode(true), lstRes);
    lstRes.insertBefore(createCustomElement('text','',',', ['comma']),lstRes.lastElementChild);
    lstRes.insertBefore(createCustomElement('text','','F', []),lstRes.lastElementChild);
    lstRes.insertBefore(createCustomElement('text','',eq.id[eq.id.length-1],['sub']),lstRes.lastElementChild);
  }
}

function easter(){
  alert('Oh no! A bug');
  document.body.appendChild(createCustomElement('div', 'easter', '', ['easter']));
  setTimeout(function () {
    document.body.innerHTML = null;
    document.body.classList.toggle('gradient');
  }, 4200);
}

function initJsTable() {
  let i = j = 0;
  let jsTable = [];
  for (i = 0; i < numRes + 1; i++) {
    //inicializando a linha
    jsTable.push([]);
    for (j = 0; j < (numVar+numRes)+2; j++) {
    //inicializando coluna
      jsTable[i].push(0);
    }
    jsTable[i][numVar+i] = 1;
  }
  return(jsTable);
}

function setJsTable(jsTable){
  const values = getInputsNumbers(resTable).concat(getInputsNumbers(objFnctn,1));
  let cursor = 0;
  for (let i = 0; i < numRes + 1; i++) { 
    for (let j = 0; j < (numVar+numRes)+2; j++) {
       if (j < numVar) jsTable[i][j] = values[cursor++];
       if (j == numVar+numRes+1 && i < numRes) jsTable[i][j] = values[cursor++];
    }
  }
  return(jsTable);
}

function toArray(jsTable){
  let newArray = [];
  for(const array of jsTable) newArray = newArray.concat(array);
return(newArray);
}

function setHTMLtable() {
  let cursor = 0;
  let newJsTable = initJsTable();
  newJsTable = setJsTable(newJsTable);
  const valuesArray = toArray(newJsTable);
  const tds = Table.querySelectorAll('td');
  for (const td of tds) if (td.innerHTML == '') td.innerText = valuesArray[cursor++];
}