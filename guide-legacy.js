window.addEventListener('load', loadUi);

function loadUi(){
console.log('second script done fetching');
const $ = document.querySelector.bind(document);
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
let innSteps = 0;
let pCol = 0;
let glblStps=0;
const values = [];

statTxt.innerText = `Informe nesta fase a formulação matemática
(modelo) do problema que se deseja resolver.
Para tanto, siga as seguintes etapas:`;

nxtStpBtn.addEventListener('click', () => {

  if (dinH3.innerText == 'Visualização do Modelo com Equações') {
    statH3.innerText = `Método Simplex`;
    statTxt.innerText = `O método simplex tem seu funcionamento baseado na forma tabular da função objetivo e das equações  do modelo. Esta forma é  denominada  "quadro".
    Seu funcionamento segue as seguintes etapas:`
    simOl.hidden = false;
    simOl.children
    simOl.children[0].classList.toggle('markEl');

    setTimeout(function() {
       nxtInnrStpBtn = $('#nxtInnrStpBtn');
       prvInnrStpBtn = $('#prvInnrStpBtn');
       naviSteps = 0;
      const totlStps = $('#Table').value;
//
       nxtInnrStpBtn.addEventListener("click", () => {
         debugger
        glblStps++;
         if (naviSteps < 4) {
           simOl.children[naviSteps].classList.toggle("markEl");
           simOl.children[++naviSteps].classList.toggle("markEl");
           if (naviSteps == 3) pCol = getPcol();
           if (naviSteps == 4)
             innOl.children[innSteps].classList.toggle("markEl");
         } else {
           if (innSteps > parseInt(values[1])){
            innOl.children[innSteps].classList.toggle("markEl");
            simOl.children[naviSteps].classList.toggle("markEl");
            naviSteps = 1;
            innSteps = 0;
            simOl.children[naviSteps++].classList.toggle("markEl");
            if(glblStps == totlStps-2){
              simOl.children[1].classList.toggle('markEl');

              $('#strtOvrBtn').addEventListener("click", loadUi);
            }
           }
           else if (innSteps == 0) {
             innOl.children[innSteps++].classList.toggle("markEl");
             innOl.children[innSteps].classList.toggle("markEl");
           } else if (innSteps == parseInt(values[1])) {
            innOl.children[innSteps-1].classList.toggle("markEl");
            innOl.children[innSteps].classList.toggle("markEl");
            innSteps+=2;
           }
           else innSteps++
         }
      });
//
      prvInnrStpBtn.addEventListener("click", () => {
        if(innSteps == 0) {
          simOl.children[naviSteps--].classList.toggle('markEl');
          simOl.children[naviSteps].classList.toggle('markEl');
        }
        else if (innSteps < parseInt(values[1])){ //passo 2

        }
        else{
        }
        glblStps--;
      });
//
  }, 1);

  }
  else if (dinH3.innerText == 'Visualização do Modelo') {
    const a = document.querySelectorAll('.varResBtn--slctd');
    values[0] = a[0].value;
    values[1] = a[1].value;
    statH3.innerText = `Inserção das Variáveis de Folga`;
    $('#statDescCard').removeChild($('#statDescCard ol'));
    $('#inDesc').innerText = chptr2StatDesc;
    dinH3.innerText = `1ª Restrição`
    dinTxt.innerText = `A seguir nota-se a inserção da variável de folga F1 para a 1ª restrição`;
  }
  else{
    ol.children[naviSteps].classList.toggle('markEl');
  if (naviSteps < 4) {
    ol.children[++naviSteps].classList.toggle('markEl');
    dinH3.innerText = $('#statDescCard ol').querySelector('.markEl').innerText;
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
nxtInnrStpBtn.addEventListener("click", () => {
  
  if (statH3.innerText == "Método Simplex") {
    
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

prvInnrStpBtn.addEventListener("click", () => {
  
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


/*
document.querySelector('#inDesc').innerText = `Antes de dar início ao metodo simplex, é necessario transformar todas as suas inequações (<=) em equações (=).
Isso é feito por meio da inserção de variáveis de folga. Tais variaveis tem a função de igualar o uso do recurso de cada vínculo (lado direito da desigualdade).
Assim, para cada restrição, adiciona-se uma variável de folga do lado esquerdo da inequação, convertendo-a em equação.

No Simplex Web, por definição, tais variáveis são nomeadas automaticamente da seguinte maneira: F1, F2, ..., Fn`


function holdFor(){
  const trs = document.querySelectorAll(`Table`)[1].querySelectorAll(`tr:not(:first-child)`);
  for(const)
}
*/

function getPcol(){
  const jSize = parseInt(values[0]) + parseInt(values[1]) + 3;
  const iSize = parseInt(values[1]) + 2;
  const rows = document.querySelectorAll('Table')[1].querySelectorAll(`tr`)
  for (let j = 0; j < jSize; j++){
    for (let i = 0; i < iSize; i++){
      if (rows[j].children[i].style.color == 'red') return(j);
    }
  }
}

}