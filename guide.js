window.addEventListener('load', loadUi);
const $ = document.querySelector.bind(document);
//

function loadUi() {  
  let nxtStpBtn = $('#nxtStpBtn');
  let prvStpBtn = $('#prvStpBtn');
  let nxtInnrStpBtn = $('#nxtInnrStpBtn');
  let prvInnrStpBtn = $('#prvInnrStpBtn');
  const ol = $('#statDescCard ol');
  const simOl = $('#simOl');
  const innOl = $('#innOl');
  const dinH3 = $('#dinaDescCard h3');
  const statH3 = $('#statDescCard h3');
  const dinTxt = $('#dinaDescCard text');
  const statTxt = $('#statDescCard text');
  let naviSteps = 0;
  const values = [];

  statTxt.innerText = `Informe nesta fase a formulação matemática
(modelo) do problema que se deseja resolver.
Para tanto, siga as seguintes etapas:`;

  nxtStpBtn.addEventListener('click', () => {
    if (dinH3.innerText == 'Visualização do Modelo com Equações') {
      statH3.innerText = `Método Simplex`;
      statTxt.innerText = `O método simplex tem seu funcionamento baseado na forma tabular da função objetivo e das equações  do modelo. Esta forma é  denominada  'quadro'.
    Seu funcionamento segue as seguintes etapas:`;
      simOl.hidden = false;
      simOl.children;
      simOl.children[0].classList.toggle('markEl');

      moveBottomCard();
      setBottomCard(1);

      setTimeout(function() { 
        nxtInnrStpBtn = $('#nxtInnrStpBtn');
        prvInnrStpBtn = $('#prvInnrStpBtn');
        naviSteps = 0;
        let cursor = 0;
        let holdFor = 0;
        let it = 0;
        //
        nxtInnrStpBtn.addEventListener('click', () => {
          
          if (simOl.children[4].classList.contains('markEl')) {//estando dentro do passo 5:{
            if (innOl.children[1].classList.contains('markEl')) {
              //se estiver em iterações do passo 5.2
              holdFor--;
              setBottomCard(6);
              if (holdFor == 0) {
                // se estiver saindo do passo 2 para o 3
                innOl.children[1].classList.toggle('markEl');
                innOl.children[2].classList.toggle('markEl');
                setBottomCard(7);
              }
            } else if (innOl.children[2].classList.contains('markEl')) {//se saindo do passo 3 para o teste de otimização
              innOl.children[2].classList.toggle('markEl');
              simOl.children[4].classList.toggle('markEl');
              cursor = 1;
              simOl.children[cursor].classList.toggle('markEl');
              it++;
              setBottomCard(2);
            } else { //se estiver indo do primeiro passo do passo 5 para o segundo;
              innOl.children[0].classList.toggle('markEl');
              innOl.children[1].classList.toggle('markEl');
              setBottomCard(6);
            } //}
          } else {
            //para quando estiver fora do passo 5{
            simOl.children[cursor].classList.toggle('markEl');
            cursor++;
            simOl.children[cursor].classList.toggle('markEl');
            setBottomCard(cursor+1,values);      

            if (simOl.children[4].classList.contains('markEl')) {
              //se estiver indo para o primeiro passo do passo 5
              innOl.children[0].classList.toggle('markEl');
              holdFor = values[1];
            }
          }

          if ($('#strtOvrBtn').hidden == false)
            $('#strtOvrBtn').addEventListener('click', loadUi);
        });

        prvInnrStpBtn.addEventListener('click', () => {
          if (simOl.children[4].classList.contains('markEl')) {//se estiver voltando de algum dos passos no passo 5
            if (innOl.children[1].classList.contains('markEl')) {//se estiver voltando de uma das fases do passo 5.2 para a anterior
              if (holdFor == values[1]) {// se estiver voltando do passo 5.2 para o 5.1             
                innOl.children[1].classList.toggle('markEl');
                innOl.children[0].classList.toggle('markEl');
                setBottomCard(5);
              } else holdFor++;
            } else if (innOl.children[2].classList.contains('markEl')) {//se estiver voltando do passo 5.3 para o 2
              setBottomCard(6);
              innOl.children[2].classList.toggle('markEl');
              innOl.children[1].classList.toggle('markEl');
              holdFor = 1;
            } else {//se estiver voltando do passo 5.1 para o passo 4
              innOl.children[0].classList.toggle('markEl');
              simOl.children[cursor].classList.toggle('markEl');
              cursor--;
              simOl.children[cursor].classList.toggle('markEl');
              setBottomCard(4,values);
            }
          } else {//se estiver voltando de algum dos passos externos ao passo 5
            if (simOl.children[1].classList.contains('markEl') && it > 0) {//se estiver voltando do passo 2, após uma iteração, para o passo 3 (nao voltando para o primeiro passo)
              simOl.children[cursor].classList.toggle('markEl');
              cursor = 4;
              simOl.children[cursor].classList.toggle('markEl');
              innOl.children[2].classList.toggle('markEl');
              it--;
              setBottomCard(7);
            } else {
              simOl.children[cursor].classList.toggle('markEl');
              cursor--;
              simOl.children[cursor].classList.toggle('markEl');
              setBottomCard(cursor+1,values);
            }
          }
        });
        //
      }, 1);
    } else if (dinH3.innerText == 'Visualização do Modelo') {
      const a = document.querySelectorAll('.varResBtn--slctd');
      values[0] = parseInt(a[0].value);
      values[1] = parseInt(a[1].value);
      statH3.innerText = `Inserção das Variáveis de Folga`;
      $('#statDescCard').removeChild($('#statDescCard ol'));
      $('#inDesc').innerText = chptr2StatDesc;
      dinH3.innerText = `1ª Restrição`;
      dinTxt.innerText = `A seguir nota-se a inserção da variável de folga F1 para a 1ª restrição`;
    } else {
      ol.children[naviSteps].classList.toggle('markEl');
      if (naviSteps < 4) {
        ol.children[++naviSteps].classList.toggle('markEl');
        dinH3.innerText = $('#statDescCard ol').querySelector(
          '.markEl'
        ).innerText;
      }
      dinTxt.innerText = descContents[naviSteps];
    }
  });

  prvStpBtn.addEventListener('click', () => {
    ol.children[naviSteps].classList.toggle('markEl');
    ol.children[--naviSteps].classList.toggle('markEl');
    dinH3.innerText = $('#statDescCard ol').querySelector('.markEl').innerText;
    dinTxt.innerText = descContents[naviSteps];
  });

  let rests = 1;
  nxtInnrStpBtn.addEventListener('click', () => {
    if (statH3.innerText == 'Método Simplex') {
    } else {
      if (rests < values[1]) {
        dinH3.innerText = `${++rests}ª Restrição`;
        dinTxt.innerText = `A seguir nota-se a inserção da variável de folga F${rests} para a ${rests}ª restrição`;
      } else {
        dinH3.innerText = `Visualização do Modelo com Equações`;
        dinTxt.innerText = `Após a introdução das variáveis de folga, a formulação  matemática do problema fica da seguinte forma:`;
        rests++;
      }
    }
  });

  prvInnrStpBtn.addEventListener('click', () => {
    dinH3.innerText = `${--rests}ª Restrição`;
    dinTxt.innerText = `A seguir nota-se a inserção da variável de folga F${rests} para a ${rests}ª restrição`;
  });

  const descContents = [
    `No Simplex Web, por definição, as variáveis
são nomeadas automaticamente da seguinte maneira: x1, x2, ..`,
    `Defina a Função Objetivo do modelo.
Informe somente os coeficientes de cada variável
sob sua respectiva legenda.
Em Problemas Padrões de Programação Linear,
as variáveis sempre são não negativas (≥0).`,
    `Informe a quantidade de restrições do modelo.`,
    `Defina as restrições do modelo.
Informe para cada restrição somente os coeficientes
de suas variáveis e ao final seu Termo Constante.
Em Problemas Padrões de Programação Linear,
Termos Constantes sempre são não negativos (≥0).`,
    `A formulação matemática do problema fica da seguinte forma:`
  ];

  const chptr2StatDesc = `Antes de dar início ao metodo simplex,
é necessario transformar todas as suas inequações (<=) em equações (=).
Isso é feito por meio da inserção de variáveis de folga. Tais variaveis tem a função de igualar o uso do recurso de cada vínculo (lado direito da desigualdade).
Assim, para cada restrição, adiciona-se uma variável de folga do lado esquerdo da inequação, convertendo-a em equação.

No Simplex Web, por definição, tais variáveis são nomeadas automaticamente da seguinte maneira: F1, F2, ..., Fn`;

  dinTxt.innerText = descContents[0];
}

function findNgtvs() {
  const objetiva = document.querySelectorAll('Table')[1].querySelectorAll(`tr:last-child td`);
  for (const td of objetiva) if (parseFloat(td.innerText) < 0) return 1;
  return 0;
}

function findMostNegative() {
  const header = document.querySelectorAll('Table')[1].querySelectorAll(`tr:first-child th`);
  for (const th of header) if (th.style.backgroundColor == 'yellow') return th.innerText;
}

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

function moveBottomCard(){
  
  const descTableCard = $('#dinaDescCard').cloneNode(true);
  descTableCard.id = 'descTableCard'
  $('#descCards').removeChild($('#dinaDescCard'));
  document.body.insertBefore(createCustomElement('div', 'descTable',null,['TdCWrppr']), $('#Table'));
  $('#descTable').appendChild(descTableCard);
  $('#descTableCard h3').innerText = null;
  $('#descTableCard text').innerText = null;
}

function toEq(IneqClone){
  const B = IneqClone.cloneNode(true);
  B.removeChild(B.firstElementChild);
  //B.insertBefore(createCustomElement('text', '', '-', ['defMrgnL']), B.firstElementChild);
  for (let c = 0; c < B.childElementCount; c++){
    if (B.children[c].innerText == '+') B.removeChild(B.children[c--]);
    else if (B.children[c].classList.contains('red')) B.children[c].innerText = '-' + B.children[c].innerText;
  }
  B.appendChild(createCustomElement('text', '', '+', ['defMrgnL']));
  B.appendChild(createCustomElement('text', '', 'Z', ['defMrgnL']));
  B.appendChild(createCustomElement('text', '', '=', ['defMrgnL']));
  B.appendChild(createCustomElement('text', '', '0', ['defMrgnL']));
return(B)  
}

function resetBottmCard(){
  
  $('#descTable').innerHTML = null;
  $('#descTable').appendChild(createCustomElement('div','descTableCard','',['bttmCard']));
  $('#descTableCard').appendChild(document.createElement('h3'));
  $('#descTableCard').appendChild(document.createElement('text'));

  $('#descTableCard').classList.remove('dnmcCard');
  $('#descTableCard').classList.add('bttmCard');

}

function getRazoes(n){
  let f = 0;
  let den = num = 0;
  const trs = document.querySelectorAll('Table')[1].querySelectorAll(`tr:not(:first-child):not(:last-child)`)[n];
  const tds = trs.querySelectorAll(`td:not(:first-child)`)
  for (const td of tds){
    if (td.style.backgroundColor == 'yellow'){
        den = parseFloat(td.innerText);
      if (td.style.color == 'red') f++;    
    }
    else if (td.style.backgroundColor == 'burlywood') num = parseFloat(td.innerText);
  }
    const r = `${num}/${den} = ${(num/den).toFixed(2)}`
    if (den <= 0) return (r + ` (desconsiderar)\n`);
    else return ( f? r + ` (Menor)\n` : r+`\n`);
}

function getPos(){
  let j = i = 0;
  const trs = document.querySelectorAll('#Table')[1].querySelectorAll(`tr:not(:first-child):not(:last-child)`);
  for(const tr of trs){
    j=0;
    i++;    
    for(const td of tr.children){
      j++
      if (td.style.color == 'red') return [i+1,j];    
    }
  }
}


function setBottomCard(step, values){
  resetBottmCard(step);
  switch (step) {
    case 1: //Definir o quadro Inicial          
      $('#descTableCard h3').innerText = simOl.children[0].innerText;      
      $('#descTableCard text').innerText = `Para ser iniciado, o método simplex precisa de um quadro inicial.
      Tal quadro é formado da seguinte forma:

      Na primeira coluna são expressas as variáveis básicas das equações.
      Seus respectivos valores são indicados explicitamente na última coluna.
      As variáveis ausentes na primeira coluna, são consideradas não básicas e valem 0.
      Nas primeiras linhas (sem contar o cabeçalho) se expressam os coeficientes das equações.
      Na última linha, chamada de linha objetiva, se expressa a função objetivo transformando-a em equação, conforme abaixo:
      
      Antes:`
      let A = $('#mdlFnctn').cloneNode(true);
      A.children[0].innerText = `Z =`;
      A.children[0].classList.toggle('defMrgnL');      
      $('#descTable').appendChild(A);
      $('#descTable').appendChild(toEq(A));
      $('#descTable').insertBefore(createCustomElement('text','','Depois',''), $('#descTable').lastElementChild)

      break;
    case 2: //Aplicar Teste de Otimização
      const ending = (findNgtvs())? `No presente quadro observa-se que a solução encontrada não é ótima, pois existem valores negativos na linha objetiva, sob as colunas das variáveis.
      Tais valores estão destacados em amarelo.` : `No presente quadro observa-se que a solução encontrada é ótima, pois não há valores negativos na linha objetiva, sob as colunas das variáveis.`;

      $('#descTableCard h3').innerText = simOl.children[1].innerText;
      $('#descTableCard text').innerText = `Aqui aplica-se o teste de otimização, que consiste basicamente em verificar se há, na linha objetiva,
      sob as colunas das variáveis, elementos NEGATIVOS:
      - Caso não haja, significa que a solução encontrada é ótima, encerrando-se os cálculos;
      - Caso haja, significa que outra solução fornece um valor maior para z.
      Para encontrá-la, segue-se para a etapa seguinte.
      
      ` + ending;

    break;
    case 3: //Dterminar coluna
      $('#descTableCard h3').innerText = simOl.children[2].innerText;
      $('#descTableCard text').innerText = `Para se obter um maior aumento da função objetivo, aumenta-se o valor de uma variável por vez. Assim, escolhe-se aquela correspondente ao elemento mais NEGATIVO na linha objetiva.
      A coluna que contém tal este elemento (em amarelo) é denominada coluna do pivô.

      No presente quadro observa-se que, por ter o elemento mais negativo, `+ findMostNegative() +` é a variável a ser aumentada, denominada variável de entrada, pois na iteração seguinte ela será uma variável básica.
      Para uma variável ser aumentada outra deve ser diminuída. Assim executa-se a etapa seguinte.      
      
      Nota: Em caso de empate na escolha do elemento mais negativo, pode-se escolher qualquer um.
      No entanto, no Simplex Web, por definição, em caso de empate, o escolhido sempre será o primeiro maior.`
    break;
    case 4: //Determinar linha
      $('#descTableCard h3').innerText = simOl.children[3].innerText;
      $('#descTableCard text').innerText = `A linha do pivô é determinada pela menor das razões dos elementos acima da linha objetiva na coluna mais a direita (destacados em fundo marron)
      pelos respectivos elementos POSITIVOS na coluna do pivô (destacados em fundo amarelo).
      Caso não existam elementos positivos acima da linha objetiva na coluna do pivô,
      não existe solução ótima finita, portanto, encerram-se os cálculos.
      `
      let razoes='';
      setTimeout(function() {
        for (c = 0; c < values[1]; c++) {
          razoes += getRazoes(c);
        }
        const pPos = getPos();
        const vbRow = document.querySelectorAll('Table')[1].querySelector(`tr:nth-child(${pPos[0]}) td:first-child`).innerText;

        $('#descTableCard text').innerText +=`No presente quadro, observam-se as seguintes razões:

        ${razoes}
        
        Portanto, a ${pPos[1]}ª linha é determinada linha do pivô e sua respectiva variável básica ${vbRow} não será mais básica, tornando-se variável de saída.
        Assim, o elemento (destacado em escrita vermelha) que se encontra na intersecção da coluna do pivô (${pPos[1]}ª coluna) com a linha do mesmo (${pPos[0]}ª linha) é denominado pivô.
        Tal procedimento é necessário pois, se não for selecionada a menor das razões, então na próxima iteração (quadro) uma das variáveis se tornará negativa, inviabilizando a solução.
        
        Nota: Em caso de empate na escolha da menor das razões, pode-se escolher qualquer uma. 
        No entanto, no Simplex Web, por definição, em caso de empate, a escolhida definida sempre será àquela localizada mais acima.
        `
        $('#descTable').value = pPos;   
      }, 1);  
    break;   
    
    case 5: //Dividir l pivo
      $('#descTableCard h3').innerText = innOl.children[0].innerText;
      $('#descTableCard text').innerText =`Para se obter um novo quadro, aplica-se uma técnica chamada de eliminação por pivô, dividida em duas fases:

      1: Dividir toda linha do pivô (destacada em azul) pelo valor do pivô, tornando-o igual a 1.`  
      const pPos = $('#descTable').value;
      let tds = document.querySelectorAll('Table')[1].querySelectorAll(`tr td:nth-child(${pPos[1]})`);
      multi=[];
      l=1;
      c=1;
      for (const td of tds){      
        if (td.style.backgroundColor != 'yellow'){
          multi.push([td.innerText,c]);
        }
        c++;
      } 
      $('#descCards').value = multi;
      c=0;
     break;

     case 6: //Add multiplos
      $('#descTableCard h3').innerText = innOl.children[1].innerText;
      $('#descTableCard text').innerText = `2: Zerar todos os elementos da coluna do pivô, com exceção do mesmo, através da adição dos múltiplos apropriados da linha do pivô a todas as outras.
      Assim, para o quadro atual:\n\n`
      multi = $('#descCards').value;
      let r=``;
      for (const t of multi){
        r += `Para cada elemento da ${t[1]}ª linha (em azul), adicionamos a multiplicação por ${(t[0])*-1} do elemento correspondente na linha do pivô (em amarelo)\n`
      }
      $('#descTableCard text').innerText += r;
      //$('#descCards').value ='';     
    break;

    case 7: //Retornar etapa 2
      $('#descTableCard h3').innerText = innOl.children[2].innerText;
      $('#descTableCard text').innerText = `Por fim, troca-se a variável de saída (linha do pivô) pela variável de entrada (coluna do pivô). Formando desta forma o novo quadro.
      Assim, retorna-se para a 2ª etapa: Aplicar teste de otimização.`

    break;
    default:
      easter()
  }
}
console.log('second script done fetching');