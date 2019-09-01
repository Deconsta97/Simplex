window.addEventListener('load', () => {
  const bodyInitStt = document.body.innerHTML;
  Simplex(bodyInitStt);
});

function Simplex(BodyInitialState){
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
  const strtOvrdBtn = $('#strtOvrBtn');

  strtOvrdBtn.addEventListener('click', () => {
    document.body.innerHTML='';
    document.body.innerHTML = BodyInitialState;
    Simplex(BodyInitialState);
  });

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
    if (stepIndex >= 8) nxtStpBtn.disabled = true;
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
        nxtStpBtn.innerText = "Próximo Capítulo";
        updateModel();
        toggleElements([resTable, mdlOvrvw]);
        break;
      case 6: //Variaveis de folga
        let r = 1;
        nxtStpBtn.innerText = "Próximo Capítulo";
        nxtStpBtn.disabled = false;
        toggleElements([mdlOvrvw, nxtStpBtn, prvStpBtn, fVarIns, nxtInnrStpBtn, prvInnrStpBtn]);
        insertEquations();
        updateMdlOvrvw();
        showEquations(r);
        prvInnrStpBtn.addEventListener("click", () => {
          nextRes(--r);
          if (r == numRes) toggleElements([mdlOvrvw, fVarIns, nxtStpBtn, nxtInnrStpBtn]);
        });
        nxtInnrStpBtn.addEventListener("click", () => {
          nextRes(++r);
          if (r == numRes + 1) toggleElements([nxtInnrStpBtn, nxtStpBtn, fVarIns, mdlOvrvw]);
        });
        break;
      case 7: //Quadro Inicial
        toggleElements([mdlOvrvw, nxtStpBtn,nxtInnrStpBtn]);
        createTable();
        setHTMLtable();
        
        const HTMLbtns = document.querySelector('.buttonWrppr');
        
        nxt = nxtInnrStpBtn.cloneNode(true);
        HTMLbtns.removeChild(nxtInnrStpBtn);
        HTMLbtns.insertBefore(nxt,HTMLbtns.firstChild);
        nxt.disabled = false;

        prv = prvInnrStpBtn.cloneNode(true);
        HTMLbtns.removeChild(prvInnrStpBtn);
        HTMLbtns.insertBefore(prv,HTMLbtns.firstChild);
        prv.disabled = true;

        const stepsHistory = [];//historico de quadros
        const TblMap = mapHTMLtable(Table);//mapear tabela
        stepsHistory.push(Table.cloneNode(true));
        let ngtvs = negatives(Table.querySelectorAll(`tr:last-child td:not(:first-child)`));
        
        //if (!ngtvs) break;
        while(ngtvs.length != 0){
          //
          highLight(ngtvs, 'yellow');
          stepsHistory.push(Table.cloneNode(true));
          highLight(ngtvs, 'yellow');
          //
          let lowest = lwst(ngtvs);
          let p = findOnMap(lowest, TblMap);
          highLightJ(p, TblMap, 'yellow');
          stepsHistory.push(Table.cloneNode(true));
          highLightJ(p, TblMap, 'yellow');
          //
          const vCol = document.querySelectorAll(`Table tr:not(:first-child):not(:last-child) td:nth-child(${p[1]+1})`);
          const lCol = document.querySelectorAll('Table tr:not(:first-child):not(:last-child) td:last-child');
          highLight(vCol,'yellow');
          highLight(lCol,'burlywood');
          lowest = lwstQuotnt(lCol,vCol);
          lowest.style.color = 'red';
          stepsHistory.push(Table.cloneNode(true));
          lowest.style.color = '';
          highLight(vCol,'yellow');
          highLight(lCol,'burlywood');
          //
          p = findOnMap(lowest, TblMap);//posicao do pivot
          const v = lowest.innerText;
          const pivotLine = Table.querySelectorAll(`tr:nth-child(${p[0]+1}) td:not(:first-child)`);
          for (el of pivotLine) el.innerText = parseFloat(((parseFloat(el.innerText/v)).toFixed(4)));
          highLight(pivotLine, 'yellow');
          stepsHistory.push(Table.cloneNode(true));
          //highLight(pivotLine, 'yellow');
          //#0000ff85
          //
          const newCol = Table.querySelectorAll(`tr:not(:first-child):not(:nth-child(${p[0]+1})`);
          for (const tr of newCol){
            const tds = tr.querySelectorAll(`td:not(:first-child)`);
            const eCCPVal = (tds[p[1]-1].innerText)*-1;
            let cursr = 0;
            highLight(tds, '#0000ff85');
            for(const td of tds){
              td.innerText = parseFloat((parseFloat(td.innerText) + eCCPVal*parseFloat(pivotLine[cursr++].innerText)).toFixed(4));
            }
            stepsHistory.push(Table.cloneNode(true));
            highLight(tds, '#0000ff85');         
          }
          highLight(pivotLine, 'yellow');
          TblMap[p[0]][0].innerText = TblMap[0][p[1]].innerText; 
          stepsHistory.push(Table.cloneNode(true));
          ngtvs = negatives(Table.querySelectorAll(`tr:last-child td:not(:first-child)`))
        }

        let cursor = 0;
          const Body = document.body;
          const btns = document.querySelector('.buttonWrppr');
          Body.insertBefore(stepsHistory[cursor], btns); 
          nxt.addEventListener('click',() =>{
            Body.removeChild(Body.querySelectorAll('#Table')[1]);
            Body.insertBefore(stepsHistory[++cursor], btns);
            nxt.disabled = (cursor == stepsHistory.length-1)? true : false;
            prv.disabled = (cursor <= 0)? true : false;
             
            if(nxt.disabled) toggleElement(strtOvrdBtn);
          });

          prv.addEventListener('click',() =>{
           
            Body.removeChild(Body.querySelectorAll('#Table')[1]);
            Body.insertBefore(stepsHistory[--cursor], btns);
            nxt.disabled = (cursor == stepsHistory.length-1)? true : false;
            prv.disabled = (cursor <= 0)? true : false;

            strtOvrdBtn.classList.add('hide');
          });     
        toggleElements([Table]);
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
        easter()
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

  function mapHTMLtable(Tbl){
    const tBody = Tbl.children[0].children[0].children;
    let HTMLtableMap = [];
    let i = 0;
    for (const tr of tBody) {
      HTMLtableMap.push([]);
      for (const td of tr.children) {
        HTMLtableMap[i].push(td);//td.innerText
      }
      i++;
    }
    return(HTMLtableMap);
  }

  function negatives(objLine){
    const ngtvsArray = []
    for (const val of objLine ){
      const n = parseFloat(val.innerText);
      if(n < 0) ngtvsArray.push(val);
    }
    return ngtvsArray;
  }

  function highLight(elements, color) {
    for (const el of elements) {
      if (el.style.backgroundColor == '') el.style.backgroundColor = color;
      else el.style.backgroundColor = '';
    }
  }

  function highLightJ(ColumnIndex, mappedHTMLtable, color) {
    for (let i = 0; i < rows; i++) {
      highLight([mappedHTMLtable[i][ColumnIndex[1]]], color);
    }
  }

  function highLightI(ColumnIndex, mappedHTMLtable) {
    for (let j = 0; j < columns; j++) {
      highLight([mappedHTMLtable[ColumnIndex[0]][j]]); 
    }
  }

  function lwst(array){
    let elVal = [0,999];
    for(const el of array){
      if ( parseFloat(el.innerText) < elVal[1]){
        elVal[0] = el;
        elVal[1] = parseFloat(el.innerText);
      }
    }
    return elVal[0];
  }

  function lwstQuotnt(numArray, DenArray){
    let elVal = [0,0];
    lwstQ = 999;
    for(let c = 0; c < numArray.length; c++){
      if ( DenArray[c].innerText > 0 && numArray[c].innerText/DenArray[c].innerText < lwstQ){
        lwstQ = numArray[c].innerText/DenArray[c].innerText;
        elVal[0] = DenArray[c];
        elVal[1] = parseFloat(DenArray[c].innerText);
      }
    }
    return elVal[0];
  }


  function findOnMap(element, mappedHTMLtable){
    const pos = [0, 0];
    for (const els of mappedHTMLtable){
      for (const el of els){
        if (element === el) return pos;
        pos[1]++;
      }
      pos[0]++;
      pos[1]=0;
    }
  }

}