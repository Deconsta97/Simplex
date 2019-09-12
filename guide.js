window.addEventListener('load', loadUi);
//

function loadUi() {
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

      setTimeout(function() { 
        nxtInnrStpBtn = $('#nxtInnrStpBtn');
        prvInnrStpBtn = $('#prvInnrStpBtn');
        naviSteps = 0;
        let cursor = 0;
        let holdFor = 0;
        let it = 0;
        //
        nxtInnrStpBtn.addEventListener('click', () => {
          if (simOl.children[4].classList.contains('markEl')) {
            //estando dentro do passo 5:{
            if (innOl.children[1].classList.contains('markEl')) {
              //se estiver no passo 2
              holdFor--;
              if (holdFor == 0) {
                // se estiver saindo do passo 2 para o 3
                innOl.children[1].classList.toggle('markEl');
                innOl.children[2].classList.toggle('markEl');
              }
            } else if (innOl.children[2].classList.contains('markEl')) {
              //se saindo do passo 3
              innOl.children[2].classList.toggle('markEl');
              simOl.children[4].classList.toggle('markEl');
              cursor = 1;
              simOl.children[cursor].classList.toggle('markEl');
              it++;
            } else {
              //se estiver saindo do primeiro passo do passo 5 para o segundo;
              innOl.children[0].classList.toggle('markEl');
              innOl.children[1].classList.toggle('markEl');
            } //}
          } else {
            //para quando estiver fora do passo 5{
            simOl.children[cursor].classList.toggle('markEl');
            cursor++;
            simOl.children[cursor].classList.toggle('markEl');

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
          if (simOl.children[4].classList.contains('markEl')) {
            //se estiver voltando de algum dos passos no passo 5

            if (innOl.children[1].classList.contains('markEl')) {
              //se estiver voltando de uma das fases do passo 5.2 para a anterior
              if (holdFor == values[1]) {
                // se estiver voltando do passo 2 para o 1
                innOl.children[1].classList.toggle('markEl');
                innOl.children[0].classList.toggle('markEl');
              } else holdFor++;
            } else if (innOl.children[2].classList.contains('markEl')) {
              //se estiver voltando do passo 5.3 para o 2
              innOl.children[2].classList.toggle('markEl');
              innOl.children[1].classList.toggle('markEl');
              holdFor = 1;
            } else {
              //se estiver voltando do passo 5.1 para o passo 4 ( innOl.children[0].classList.contains('markEl') )
              innOl.children[0].classList.toggle('markEl');
              simOl.children[cursor].classList.toggle('markEl');
              cursor--;
              simOl.children[cursor].classList.toggle('markEl');
            }
          } else {
            if (simOl.children[1].classList.contains('markEl') && it > 0) {
              //se estiver voltando do passo 2 após uma iteração para o passo 3
              simOl.children[cursor].classList.toggle('markEl');
              cursor = 4;
              simOl.children[cursor].classList.toggle('markEl');
              innOl.children[2].classList.toggle('markEl');
              it--;
            } else {
              simOl.children[cursor].classList.toggle('markEl');
              cursor--;
              simOl.children[cursor].classList.toggle('markEl');
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
}

function findNgtvs() {
  const objetiva = document
    .querySelectorAll('Table')[1]
    .querySelectorAll(`tr:last-child td`);
  for (const td of objetiva) if (parseFloat(td.innerText) < 0) return 1;
  return 0;
}
