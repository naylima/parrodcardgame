let qntdCartas = prompt("Com quantas cartas você quer jogar?");

while ( qntdCartas < 4 || qntdCartas > 14 || qntdCartas%2 !== 0) {
    qntdCartas = prompt("Com quantas cartas você quer jogar?");
}

const imagens = [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif"
];
imagens.sort(embaralhar2);


const container = document.querySelector(".container");

let cardHTML = "";

for (let i = 0; i < (qntdCartas/2); i++) {
    cardHTML += `
        <div class="card" data-card="${imagens[i]}">
            <img class="back-img" src="./img/${imagens[i]}">
            <img class="front-img" src="./img/front.png">
        </div>
    `
}

container.innerHTML = cardHTML + cardHTML;

//embaralhar cartas - possui erros!!

function embaralhar2() { 
	return Math.random() - 0.5; 
}

// fim da renderização do HTML

const card = document.querySelectorAll(".card");
let primeiraCarta;
let segundaCarta;
let bloqueio = false;
let contador = 0;
let jogadas = 0;
let tempo = 0;
contarTempo();

// clicar em 2 cartas diferentes

function flipCard () {

    if (bloqueio) return false;
    if (this === primeiraCarta) return;

    this.classList.add("flip");

    if (!primeiraCarta) {
        primeiraCarta = this;
        return false;
      }
    
    segundaCarta = this;

    jogadas++;

    checarCartas();
}

// checando o match entre as duas cartas clicadas através do dataset

function checarCartas() {
    let isMatch = primeiraCarta.dataset.card === segundaCarta.dataset.card;

    if (isMatch) {
        contador++;
    }

    if (contador == (qntdCartas/2)) {
        alert(`Você ganhou em ${jogadas} jogadas e ${tempo} segundos!`);
        let jogarNovamente = prompt("Deseja jogar novamente?");
        if (jogarNovamente == "sim") {
          qntdCartas = prompt("Com quantas cartas você quer jogar?");
          //chamar uma função pra reiniciar o jogo
        }
    }
  
    !isMatch ? unFlipCards() : resetCards(isMatch);
    console.log(isMatch);
  }
  
// desvirando as cartas caso elas não deem mach

  function unFlipCards() {
    bloqueio = true;
    setTimeout(() => {
      primeiraCarta.classList.remove("flip");
      segundaCarta.classList.remove("flip");
      
      resetCards();
    }, 1000);
  }
  
 // resetando as cartas da jogada
  
  function resetCards(isMatch = false) {
    if (isMatch) {
      primeiraCarta.removeEventListener("click", flipCard);
      segundaCarta.removeEventListener("click", flipCard);
    }

    primeiraCarta = null;
    segundaCarta = null;
    bloqueio = false;
    
  }

   // contador de tempo de jogo  
  
  function contarTempo (){

        setInterval( ()=>{
            tempo++;
            document.querySelector(".timer").innerHTML = tempo;
        }, 1000);     
  };

//embaralhando as cartas

  (function embaralhar() {
    card.forEach(card => {
      let ramdomico = Math.floor(Math.random() * qntdCartas);
      card.style.order = ramdomico;
    });
  })();
  
  card.forEach(card => card.addEventListener("click", flipCard));

